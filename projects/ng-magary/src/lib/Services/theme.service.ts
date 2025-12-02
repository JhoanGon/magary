import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark' | 'purple' | 'green';

@Injectable({
  providedIn: 'root',
})
export class MagaryThemeService {
  private readonly platformId = inject(PLATFORM_ID);

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
        localStorage.setItem('magary-theme', theme);
      }
    });
  }

  private initializeTheme() {
    // 1. Check local storage
    const savedTheme = localStorage.getItem('magary-theme') as Theme;
    if (savedTheme) {
      this.currentTheme.set(savedTheme);
      return;
    }

    // 2. Check system preference
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    this.currentTheme.set(prefersDark ? 'dark' : 'light');
  }

  private applyTheme(theme: Theme) {
    const body = document.body;
    body.setAttribute('data-theme', theme);
  }

  toggleTheme() {
    const themes: Theme[] = ['light', 'dark', 'purple', 'green'];
    const currentIndex = themes.indexOf(this.currentTheme());
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    this.setTheme(nextTheme);
  }

  setTheme(theme: Theme) {
    this.currentTheme.set(theme);
  }
}
