import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MagaryThemeService } from './theme.service';

describe('MagaryThemeService behavior', () => {
  const flushEffects = () => {
    const maybeTestBed = TestBed as unknown as {
      flushEffects?: () => void;
    };
    maybeTestBed.flushEffects?.();
  };

  const createMatchMedia = (matches = false) =>
    vi.fn().mockReturnValue({
      matches,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });

  beforeEach(() => {
    localStorage.clear();
    document.body.removeAttribute('data-theme');

    vi.stubGlobal('matchMedia', createMatchMedia(false));

    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    TestBed.resetTestingModule();
  });

  it('uses stored theme when localStorage contains a valid value', () => {
    localStorage.setItem('magary-theme', 'purple');

    const service = TestBed.inject(MagaryThemeService);

    expect(service.currentTheme()).toBe('purple');
  });

  it('falls back to system preference when stored theme is invalid', () => {
    localStorage.setItem('magary-theme', 'invalid-theme');
    vi.stubGlobal('matchMedia', createMatchMedia(true));

    const service = TestBed.inject(MagaryThemeService);

    expect(service.currentTheme()).toBe('dark');
  });

  it('setTheme updates the current theme signal', () => {
    const service = TestBed.inject(MagaryThemeService);

    service.setTheme('green');

    expect(service.currentTheme()).toBe('green');
  });

  it('toggleTheme cycles through supported themes', () => {
    const service = TestBed.inject(MagaryThemeService);

    service.setTheme('green');
    service.toggleTheme();

    expect(service.currentTheme()).toBe('light');
  });

  it('applies theme on body and persists changes in storage', () => {
    const service = TestBed.inject(MagaryThemeService);

    service.setTheme('dark');
    flushEffects();

    expect(document.body.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('magary-theme')).toBe('dark');
  });

  it('ignores localStorage read/write errors in browser mode', () => {
    const getItemSpy = vi
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation(() => {
        throw new Error('blocked read');
      });
    const setItemSpy = vi
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation(() => {
        throw new Error('blocked write');
      });

    const service = TestBed.inject(MagaryThemeService);
    service.setTheme('purple');
    flushEffects();

    expect(service.currentTheme()).toBe('purple');
    expect(document.body.getAttribute('data-theme')).toBe('purple');
    expect(getItemSpy).toHaveBeenCalled();
    expect(setItemSpy).toHaveBeenCalled();
  });

  it('does not initialize browser-specific side effects on server platform', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    });

    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    const service = TestBed.inject(MagaryThemeService);

    expect(service.currentTheme()).toBe('light');
    expect(document.body.getAttribute('data-theme')).toBeNull();
    expect(setItemSpy).not.toHaveBeenCalled();
  });
});
