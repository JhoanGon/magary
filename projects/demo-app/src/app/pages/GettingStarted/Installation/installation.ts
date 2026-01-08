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
  readonly installCommand =
    'npm install ng-magary @angular/cdk gridstack lucide-angular';
  readonly stylesImport = `@import 'ng-magary/styles/theme.css';
@import 'ng-magary/styles/core.css';`;
  readonly componentImport = `import { MagaryCard, MagaryButton } from 'ng-magary';

@Component({
  // ...
  imports: [MagaryCard, MagaryButton],
  // ...
})
export class MyComponent {}`;
  readonly iconsConfig = `// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { LucideIconProvider, LUCIDE_ICONS, icons } from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    // ...
    { provide: LUCIDE_ICONS, useValue: new LucideIconProvider(icons) }
  ]
};`;
}
