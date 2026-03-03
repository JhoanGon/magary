import { Component, inject } from '@angular/core';
import { MagaryCard } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { DemoI18nService } from '../../../i18n/demo-i18n.service';

@Component({
  selector: 'app-installation',
  standalone: true,
  imports: [MagaryCard, Highlight],
  templateUrl: './installation.html',
  styleUrl: './installation.scss',
})
export class Installation {
  public readonly i18n = inject(DemoI18nService);

  readonly installCommandNpm =
    'npm install ng-magary @angular/cdk @angular/animations @atlaskit/pragmatic-drag-and-drop gridstack lucide-angular lucide';
  readonly installCommandPnpm =
    'pnpm add ng-magary @angular/cdk @angular/animations @atlaskit/pragmatic-drag-and-drop gridstack lucide-angular lucide';

  readonly appConfigIcons = `// app.config.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { LucideAngularModule, icons, LucideIconData } from 'lucide-angular';

const kebabCase = (value: string) =>
  value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const lucideIcons = Object.entries(icons).reduce(
  (acc, [key, icon]) => {
    acc[key] = icon;
    acc[kebabCase(key)] = icon;
    return acc;
  },
  {} as Record<string, LucideIconData>,
);

export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(LucideAngularModule.pick(lucideIcons))],
};`;

  readonly appConfigAnimations = `// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimationsAsync()],
};`;
  readonly setupStyles = `// src/styles.scss
@use "ng-magary/styles/magary-core.scss";
@use "ng-magary/styles/tooltip.scss";`;

  get tooltipStyles(): string {
    return `/* ${this.i18n.translateDocs('installation.tooltipComment')} */
@use "ng-magary/styles/tooltip.scss";`;
  }

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
