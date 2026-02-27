import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Highlight } from 'ngx-highlightjs';
import { MagaryTab, MagaryTabs } from 'ng-magary';
import { DemoI18nService } from '../../../i18n/demo-i18n.service';

@Component({
  selector: 'app-view-theming',
  standalone: true,
  imports: [CommonModule, Highlight, MagaryTabs, MagaryTab, LucideAngularModule],
  templateUrl: './view-theming.html',
  styleUrl: './view-theming.scss',
})
export class ViewTheming {
  public readonly i18n = inject(DemoI18nService);

  readonly usageExample = `
import { Component, inject } from '@angular/core';
import { MagaryThemeService } from 'ng-magary';

@Component({ ... })
export class AppComponent {
  themeService = inject(MagaryThemeService);

  // Switch to dark theme
  switchToDark() {
    this.themeService.setTheme('dark');
  }

  // Toggle between available themes
  toggleTheme() {
    this.themeService.toggleTheme();
  }

  // Set a specific theme
  // 'light', 'dark', or your custom theme name (for example: 'purple')
  setPurpleTheme() {
    this.themeService.setTheme('purple');
  }
}`;

  readonly cssExample = `
// In your global styles.scss

/* "Purple" theme definition */
[data-theme="purple"] {
  // Surfaces
  --surface-0: #2d1b4e;
  --surface-50: #1a102e;
  --surface-100: #2d1b4e;

  // Text
  --text-primary: #f3e8ff;
  --text-secondary: #d8b4fe;

  // Primary accents
  --primary-500: #a855f7;
  --primary-600: #9333ea;

  // Optional custom gradient
  --gradient-text: linear-gradient(135deg, #a855f7, #ec4899);
}`;

  readonly htmlExample = `
<!-- In your template (app.component.html) -->
<div class="theme-controls">
  <!-- Toggle theme button -->
  <magary-button
    label="Toggle Theme"
    (click)="toggleTheme()">
  </magary-button>

  <!-- Specific theme button -->
  <magary-button
    label="Purple Theme"
    severity="help"
    (click)="setPurpleTheme()">
  </magary-button>
</div>`;
}
