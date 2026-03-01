import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryCard, MagaryButton, MagaryThemeService } from 'ng-magary';

@Component({
  selector: 'app-themes-gallery',
  standalone: true,
  imports: [CommonModule, MagaryCard, MagaryButton],
  templateUrl: './themes-gallery.html',
  styleUrl: './themes-gallery.scss',
})
export default class ThemesGallery {
  private readonly themeService = inject(MagaryThemeService);

  readonly premiumThemes = [
    {
      id: 'dark',
      name: 'Dark Default',
      description: 'The standard dark mode with deep cool slate grays and blue cyan accents.',
    },
    {
      id: 'neo',
      name: 'Neo Brutalist',
      description: 'Bold, typography-driven theme with high contrast flat design and deep shadows.',
    },
    {
      id: 'cyberpunk',
      name: 'Cyberpunk Pink',
      description: 'High-octane neon pink and cyan over a pitch-black background.',
    },
    {
      id: 'cotton',
      name: 'Cotton Candy',
      description: 'Soft pastels, heavily rounded corners, and gentle drop shadows.',
    },
    {
      id: 'liquid',
      name: 'Liquid Obsidian',
      description: 'Premium dark mode with deep organic shapes, neon glows, and dark glass elements.',
    },
    {
      id: 'midnight',
      name: 'Midnight Ocean',
      description: 'A deep space and oceanic inspired dark theme optimal for dashboards.',
    },
    {
      id: 'purple',
      name: 'Amethyst',
      description: 'Clean bright purple variation with glassmorphic accents.',
    },
    {
      id: 'green',
      name: 'Forest',
      description: 'A soothing emerald green theme ideal for health and finance tools.',
    }
  ];

  previewTheme(themeId: string) {
    this.themeService.setTheme(themeId as any);
  }
}
