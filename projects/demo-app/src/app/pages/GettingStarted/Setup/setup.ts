import { Component } from '@angular/core';
import { MagaryCard } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [MagaryCard, Highlight],
  templateUrl: './setup.html',
  styleUrl: './setup.scss',
})
export class Setup {
  readonly iconInstall = `npm install @fortawesome/fontawesome-free`;
  readonly angularJsonConfig = `"styles": [
  "src/styles.scss",
  "node_modules/@fortawesome/fontawesome-free/css/all.min.css"
]`;

  readonly animationsConfig = `import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    // otros providers...
  ]
};`;

  readonly cssVariables = `:root {
  /* Vibrant Primary Palette (Cyan/Blue) */
  --primary-50: #ecfeff;
  --primary-100: #cffafe;
  --primary-200: #a5f3fc;
  --primary-300: #67e8f9;
  --primary-400: #22d3ee;
  --primary-500: #06b6d4;
  --primary-600: #0891b2;
  --primary-700: #0e7490;
  --primary-800: #155e75;
  --primary-900: #164e63;

  /* Accent Palette (Violet/Fuchsia) */
  --accent-50: #fdf4ff;
  --accent-100: #fae8ff;
  --accent-200: #f5d0fe;
  --accent-300: #f0abfc;
  --accent-400: #e879f9;
  --accent-500: #d946ef;
  --accent-600: #c026d3;
  --accent-700: #a21caf;
  --accent-800: #86198f;
  --accent-900: #701a75;

  /* Surfaces & Text */
  --surface-0: #ffffff;
  --surface-50: #f8fafc;
  --surface-100: #f1f5f9;
  --surface-200: #e2e8f0;
  --surface-300: #cbd5e1;
  --surface-400: #94a3b8;
  --surface-500: #64748b;
  --surface-600: #475569;
  --surface-700: #334155;
  --surface-800: #1e293b;
  --surface-900: #0f172a;

  --text-primary: var(--surface-900);
  --text-secondary: var(--surface-600);
  --text-tertiary: var(--surface-400);

  /* Semantic */
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
  --info: #3b82f6;
  --help: #8b5cf6;

  /* Glassmorphism */
  --glass-bg: rgba(255, 255, 255, 0.85);
  --glass-border: 1px solid rgb(219 217 217 / 85%);
  --glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
  --backdrop-blur: blur(16px);
  --magary-dialog-mask-bg: rgba(0, 0, 0, 0.32);

  /* Layout */
  --font-family: "Inter", system-ui, -apple-system, sans-serif;
  --border-radius: 1.25rem;
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.02);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 12px 24px -4px rgba(0, 0, 0, 0.08);
}`;
}
