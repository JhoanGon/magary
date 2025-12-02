import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryThemeService, Theme } from 'ng-magary';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="theme-options">
      <button
        *ngFor="let theme of themes"
        class="theme-btn"
        [class.active]="themeService.currentTheme() === theme.id"
        [style.background-color]="theme.color"
        [title]="theme.label"
        (click)="setTheme(theme.id)"
      >
        <i
          *ngIf="themeService.currentTheme() === theme.id"
          class="fas fa-check"
        ></i>
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .theme-options {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        background: var(--surface-100);
        padding: 0.25rem;
        border-radius: 2rem;
        border: 1px solid var(--surface-200);
      }

      .theme-btn {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        border: 1px solid rgba(0, 0, 0, 0.1); /* Add subtle border */
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s;
        color: white; /* Default color */
        font-size: 0.75rem;
        padding: 0;
      }

      /* Fix contrast for light button */
      .theme-btn[title='Light'] {
        color: #1e293b;
      }

      .theme-btn:hover {
        transform: scale(1.1);
      }

      .theme-btn.active {
        transform: scale(1.1);
        box-shadow:
          0 0 0 2px var(--surface-0),
          0 0 0 4px var(--primary-500);
      }
    `,
  ],
})
export class ThemeSwitcherComponent {
  themeService = inject(MagaryThemeService);

  constructor() {
    console.log('ThemeSwitcherComponent initialized');
  }

  themes: { id: Theme; label: string; color: string }[] = [
    { id: 'light', label: 'Light', color: '#ffffff' },
    { id: 'dark', label: 'Dark', color: '#1e293b' },
    { id: 'purple', label: 'Purple', color: '#9333ea' },
    { id: 'green', label: 'Green', color: '#16a34a' },
  ];

  setTheme(theme: Theme) {
    this.themeService.setTheme(theme);
  }
}
