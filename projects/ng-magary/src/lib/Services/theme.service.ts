import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark' | 'purple' | 'green' | 'neo' | 'midnight' | 'cyberpunk' | 'cotton' | 'liquid';
const SUPPORTED_THEMES: Theme[] = ['light', 'dark', 'purple', 'green', 'neo', 'midnight', 'cyberpunk', 'cotton', 'liquid'];

@Injectable({
  providedIn: 'root',
})
export class MagaryThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);

  // Signal to track current theme
  readonly currentTheme = signal<Theme>('light');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeTheme();
    }

    // Effect to apply theme whenever signal changes
    effect(() => {
      const theme = this.currentTheme();
      if (isPlatformBrowser(this.platformId)) {
        this.applyTheme(theme);
        try {
          this.document.defaultView?.localStorage?.setItem('magary-theme', theme);
        } catch {
          // Ignore storage access errors (private mode / blocked storage)
        }
      }
    });
  }

  private initializeTheme() {
    const view = this.document.defaultView;

    // 1. Check local storage
    try {
      const savedTheme = view?.localStorage?.getItem('magary-theme') ?? null;
      if (this.isTheme(savedTheme)) {
        this.currentTheme.set(savedTheme);
        return;
      }
    } catch {
      // Ignore storage access errors and continue with system preference
    }

    // 2. Check system preference
    const prefersDark =
      view?.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    this.currentTheme.set(prefersDark ? 'dark' : 'light');
  }

  private applyTheme(theme: Theme) {
    const body = this.document.body;
    body.setAttribute('data-theme', theme);
  }

  toggleTheme() {
    const currentIndex = SUPPORTED_THEMES.indexOf(this.currentTheme());
    const nextTheme =
      SUPPORTED_THEMES[(currentIndex + 1) % SUPPORTED_THEMES.length];
    this.setTheme(nextTheme);
  }

  setTheme(theme: Theme) {
    this.currentTheme.set(theme);
  }

  private isTheme(value: string | null): value is Theme {
    return !!value && SUPPORTED_THEMES.includes(value as Theme);
  }
}
