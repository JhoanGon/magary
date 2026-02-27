import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PwaService } from './pwa.service';

type EventMap = Record<string, EventListener>;

describe('PwaService behavior', () => {
  const listeners: EventMap = {};

  const setUserAgent = (value: string) => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value,
      configurable: true,
    });
  };

  const createMediaQueryList = (matches: boolean) => ({
    matches,
    media: '(display-mode: standalone)',
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  });

  const configure = (platform: 'browser' | 'server' = 'browser') => {
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: platform }],
    });
    return TestBed.inject(PwaService);
  };

  beforeEach(() => {
    Object.keys(listeners).forEach((key) => delete listeners[key]);
    vi.restoreAllMocks();
    TestBed.resetTestingModule();

    vi.spyOn(window, 'addEventListener').mockImplementation(
      ((type: string, listener: EventListenerOrEventListenerObject) => {
        const callback =
          typeof listener === 'function'
            ? listener
            : listener.handleEvent.bind(listener);
        listeners[type] = callback;
      }) as typeof window.addEventListener,
    );

    vi.stubGlobal('matchMedia', vi.fn(() => createMediaQueryList(false)));
    setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
    vi.stubGlobal('alert', vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    TestBed.resetTestingModule();
  });

  it('does not register browser listeners on server platform', () => {
    const service = configure('server');

    expect(service.installable()).toBe(false);
    expect(Object.keys(listeners)).toHaveLength(0);
  });

  it('marks installable on iOS when app is not standalone', () => {
    vi.stubGlobal('matchMedia', vi.fn(() => createMediaQueryList(false)));
    setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)');

    const service = configure('browser');

    expect(service.isIos()).toBe(true);
    expect(service.installable()).toBe(true);
  });

  it('tracks beforeinstallprompt and clears state on appinstalled', () => {
    const service = configure('browser');
    const prompt = vi.fn().mockResolvedValue(undefined);
    const event = {
      preventDefault: vi.fn(),
      prompt,
      userChoice: Promise.resolve({ outcome: 'dismissed' as const }),
      platforms: ['web'],
    } as unknown as Event;

    expect(listeners['beforeinstallprompt']).toBeTypeOf('function');
    listeners['beforeinstallprompt'](event);
    expect(service.installable()).toBe(true);

    expect(listeners['appinstalled']).toBeTypeOf('function');
    listeners['appinstalled'](new Event('appinstalled'));
    expect(service.installable()).toBe(false);
  });

  it('shows iOS install instructions instead of deferred prompt', () => {
    setUserAgent('Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X)');
    const service = configure('browser');

    service.install();

    expect(globalThis.alert).toHaveBeenCalled();
  });

  it('prompts installation and handles accepted outcome', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const service = configure('browser');
    const prompt = vi.fn().mockResolvedValue(undefined);
    const event = {
      preventDefault: vi.fn(),
      prompt,
      userChoice: Promise.resolve({ outcome: 'accepted' as const }),
      platforms: ['web'],
    } as unknown as Event;

    listeners['beforeinstallprompt'](event);
    service.install();
    await Promise.resolve();

    expect(prompt).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith('User accepted the install prompt');
    expect(service.installable()).toBe(false);
  });

  it('handles dismissed install outcome', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const service = configure('browser');
    const prompt = vi.fn().mockResolvedValue(undefined);
    const event = {
      preventDefault: vi.fn(),
      prompt,
      userChoice: Promise.resolve({ outcome: 'dismissed' as const }),
      platforms: ['web'],
    } as unknown as Event;

    listeners['beforeinstallprompt'](event);
    service.install();
    await Promise.resolve();

    expect(prompt).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith('User dismissed the install prompt');
    expect(service.installable()).toBe(false);
  });
});
