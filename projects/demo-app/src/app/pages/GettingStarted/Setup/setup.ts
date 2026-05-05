import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MagaryCard, MagaryButton } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { LucideAngularModule } from 'lucide-angular';
import { DemoI18nService } from '../../../i18n/demo-i18n.service';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [MagaryCard, Highlight, MagaryButton, LucideAngularModule],
  templateUrl: './setup.html',
  styleUrl: './setup.scss',
})
export class Setup {
  private readonly router = inject(Router);
  public readonly i18n = inject(DemoI18nService);

  navigateToTheming() {
    this.router.navigate(['/theming']);
  }

  navigateToRoute(route: string) {
    this.router.navigateByUrl(route);
  }

  readonly iconInstall = `npm install lucide-angular lucide`;
  readonly angularJsonConfig = `// app.config.ts
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
  providers: [
    importProvidersFrom(LucideAngularModule.pick(lucideIcons))
  ]
};`;

  readonly animationsConfig = `// app.config.ts
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    // other providers...
  ]
};`;

  readonly cssVariables = `:root {
  /* Primary Palette */
  --primary-500: #06b6d4;
  --primary-600: #0891b2;
  /* ... */

  /* Surface Palette */
  --surface-0: #ffffff;
  --surface-900: #0f172a;
  /* ... */

  /* Semantic Colors */
  --success: #10b981;
  --danger: #ef4444;
  /* ... */
}`;

  readonly integrationStandalone = `// app.config.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
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
  providers: [
    provideAnimationsAsync(),
    importProvidersFrom(LucideAngularModule.pick(lucideIcons))
  ]
};`;

  readonly integrationForms = `// CVA-first integration for Magary controls
this.form = this.fb.group({
  name: [''],
  accepted: [false],
  notifications: [false]
});

// template
<form [formGroup]="form">
  <magary-input formControlName="name"></magary-input>
  <magary-checkbox formControlName="accepted"></magary-checkbox>
  <magary-switch formControlName="notifications"></magary-switch>
</form>`;

  readonly integrationOverlay = `// overlay + feedback integration
private readonly confirmService = inject(MagaryConfirmationService);
private readonly toastService = inject(MagaryToastService);

confirmService.confirm({
  message: 'Delete item?',
  accept: () => toastService.add({
    type: 'success',
    title: 'Done',
    message: 'Item removed'
  })
});`;
}
