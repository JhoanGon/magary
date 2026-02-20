import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MagaryThemeService } from './theme.service';

describe('MagaryThemeService behavior', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.removeAttribute('data-theme');

    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockReturnValue({
        matches: false,
        media: '(prefers-color-scheme: dark)',
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }),
    );

    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    });
  });

  afterEach(() => {
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
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockReturnValue({
        matches: true,
        media: '(prefers-color-scheme: dark)',
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }),
    );

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
});
