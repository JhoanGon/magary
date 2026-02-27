import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MagaryCard, MagaryButton } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [MagaryCard, Highlight, MagaryButton, LucideAngularModule],
  templateUrl: './setup.html',
  styleUrl: './setup.scss',
})
export class Setup {
  private _router = inject(Router);

  navigateToTheming() {
    this._router.navigate(['/theming']);
  }

  navigateToRoute(route: string) {
    this._router.navigateByUrl(route);
  }

  readonly iconInstall = `npm install lucide-angular lucide`;
  readonly angularJsonConfig = `// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { LucideIconProvider, LUCIDE_ICONS, icons } from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    // ...
    { provide: LUCIDE_ICONS, useValue: new LucideIconProvider(icons) }
  ]
};`;
  readonly moduleConfig = `// app.module.ts (Modules)
import { NgModule } from '@angular/core';
import { LucideIconProvider, LUCIDE_ICONS, icons } from 'lucide-angular';

@NgModule({
  providers: [
    { provide: LUCIDE_ICONS, useValue: new LucideIconProvider(icons) }
  ]
})
export class AppModule { }`;

  readonly animationsConfig = `// app.config.ts (Standalone)
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    // otros providers...
  ]
};`;
  readonly moduleAnimationsConfig = `// app.module.ts (Modules / Angular 14-16)
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserAnimationsModule
  ]
})
export class AppModule { }`;

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
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LucideIconProvider, LUCIDE_ICONS, icons } from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    { provide: LUCIDE_ICONS, useValue: new LucideIconProvider(icons) }
  ]
};`;

  readonly integrationForms = `// reactive-form bridge for Magary controls
this.form = this.fb.group({
  city: [''],
  notes: ['']
});

// template
<magary-select
  [options]="cities"
  [value]="form.controls.city.value ?? ''"
  (valueChange)="form.controls.city.setValue($event)"
></magary-select>

<magary-input
  [value]="form.controls.notes.value ?? ''"
  (valueChange)="form.controls.notes.setValue($event)"
></magary-input>`;

  readonly integrationOverlay = `// overlay + feedback integration
confirmService.confirm({
  message: 'Delete item?',
  accept: () => toastService.add({
    type: 'success',
    title: 'Done',
    message: 'Item removed'
  })
});`;
}
