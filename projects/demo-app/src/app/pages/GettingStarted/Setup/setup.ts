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
  readonly iconInstall = `npm install lucide-angular lucide`;
  readonly angularJsonConfig = `// app.config.ts (Standalone)
import { LucideAngularModule, Home, User, Settings } from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(LucideAngularModule.pick({ Home, User, Settings }))
  ]
};`;
  readonly moduleConfig = `// app.module.ts (Modules / Angular 14-16)
import { NgModule } from '@angular/core';
import { LucideAngularModule, Home, User, Settings } from 'lucide-angular';

@NgModule({
  imports: [
    LucideAngularModule.pick({ Home, User, Settings })
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
}
