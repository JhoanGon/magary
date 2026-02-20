# ng-magary

Libreria de componentes UI para Angular (standalone-first).

## Compatibilidad

- Angular: `^17 || ^18 || ^19 || ^20 || ^21`
- Requiere peer dependencies:
  - `@angular/cdk`
  - `@angular/animations`
  - `lucide-angular`
  - `lucide`
  - `gridstack`

## Instalacion

### npm

```bash
npm install ng-magary @angular/cdk @angular/animations gridstack lucide-angular lucide
```

### pnpm

```bash
pnpm add ng-magary @angular/cdk @angular/animations gridstack lucide-angular lucide
```

## Configuracion minima recomendada

### 1) Animaciones Angular

```ts
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations()],
};
```

### 2) Lucide icons

```ts
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
  {} as Record<string, unknown>,
);

export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(LucideAngularModule.pick(lucideIcons))],
};
```

## Uso basico (standalone)

```ts
import { Component } from '@angular/core';
import { MagaryButton, MagaryCard } from 'ng-magary';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [MagaryButton, MagaryCard],
  template: `
    <magary-card>
      <h2 slot="header">Demo</h2>
      <magary-button label="Accion" />
    </magary-card>
  `,
})
export class HomeComponent {}
```

## Estilos globales

### Importante

`ng-magary` no expone `theme.css` ni `core.css`.

No agregues imports legacy como estos:

```scss
@import 'ng-magary/styles/theme.css';
@import 'ng-magary/styles/core.css';
```

### Caso especial: Tooltip

`magaryTooltip` renderiza overlays con clases globales. Agrega en tu `styles.scss`:

```scss
.magary-tooltip {
  position: absolute;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  background: #111827;
  color: #ffffff;
  font-size: 0.875rem;
  pointer-events: none;
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.magary-tooltip.magary-tooltip-visible {
  opacity: 1;
}
```

## Desarrollo de la libreria

```bash
pnpm run build:lib
pnpm run test:ng-magary
pnpm run lint
```
