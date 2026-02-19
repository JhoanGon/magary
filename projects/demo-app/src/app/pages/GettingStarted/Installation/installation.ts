import { Component } from '@angular/core';
import { MagaryCard } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-installation',
  standalone: true,
  imports: [MagaryCard, Highlight],
  templateUrl: './installation.html',
  styleUrl: './installation.scss',
})
export class Installation {
  readonly installCommandNpm =
    'npm install ng-magary @angular/cdk gridstack lucide-angular lucide';
  readonly installCommandPnpm =
    'pnpm add ng-magary @angular/cdk gridstack lucide-angular lucide';

  readonly appConfigIcons = `// app.config.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { LucideAngularModule, icons } from 'lucide-angular';

const kebabCase = (value: string) =>
  value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const lucideIcons = Object.entries(icons).reduce(
  (acc, [key, icon]) => {
    acc[key] = icon;
    acc[kebabCase(key)] = icon;
    return acc;
  },
  {} as Record<string, any>,
);

export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(LucideAngularModule.pick(lucideIcons))],
};`;

  readonly appConfigAnimations = `// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations()],
};`;

  readonly tooltipStyles = `/* styles.scss (solo si usas magaryTooltip) */
.magary-tooltip {
  position: absolute;
  padding: 0.5rem 0.75rem;
  background: var(--surface-900);
  color: var(--surface-0);
  border-radius: var(--border-radius);
  font-size: 0.875rem;
  font-weight: 500;
  box-shadow: var(--shadow-md);
  pointer-events: none;
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
  white-space: nowrap;
}

.magary-tooltip.magary-tooltip-visible {
  opacity: 1;
}`;

  readonly componentImport = `import { Component } from '@angular/core';
import { MagaryCard, MagaryButton } from 'ng-magary';

@Component({
  standalone: true,
  // ...
  imports: [MagaryCard, MagaryButton],
  // ...
})
export class MyComponent {}`;
}
