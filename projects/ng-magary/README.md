<div align="center">
  <img src="https://raw.githubusercontent.com/JhoanGon/magary/main/projects/demo-app/public/assets/magary_logo.webp" alt="Magary Logo" width="120" />
  <h1>ng-magary</h1>
  <p><strong>Libreria moderna de componentes UI para Angular, con enfoque standalone-first</strong></p>

  [![npm version](https://badge.fury.io/js/ng-magary.svg)](https://badge.fury.io/js/ng-magary)
  [![Angular Compatibility](https://img.shields.io/badge/Angular-v17_|_v18_|_v19_|_v20_|_v21-dd0031.svg?logo=angular)](https://angular.dev)
  [![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
  [![Sponsor](https://img.shields.io/badge/Sponsor-GitHub-ea4aaa?style=flat&logo=github)](https://github.com/sponsors/JhoanGon)
  [![BuyMeACoffee](https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=flat&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/praiddev)
</div>

---

`ng-magary` es una libreria de componentes para Angular pensada para trabajar con componentes standalone, temas CSS modernos y una experiencia visual cuidada.

La API root de `ng-magary` esta congelada como contrato intencional: componentes standalone, servicios y tipos publicos con naming consistente para aplicaciones Angular 17+ basadas en `app.config.ts`.

Demo interactiva:

[magary.pages.dev](https://magary.pages.dev)

## Caracteristicas principales

- Componentes standalone listos para importar donde se necesitan.
- Temas basados en CSS variables.
- Componentes preparados para flujos responsive.
- Cobertura de accesibilidad en flujos criticos.
- Compatibilidad declarada con Angular 17 a 21.

## Instalacion

Instala la libreria junto con sus peer dependencies:

### npm

```bash
npm install ng-magary @angular/cdk @angular/animations @atlaskit/pragmatic-drag-and-drop lucide lucide-angular gridstack
```

### pnpm

```bash
pnpm add ng-magary @angular/cdk @angular/animations @atlaskit/pragmatic-drag-and-drop lucide lucide-angular gridstack
```

## Configuracion minima

Debes registrar animaciones de Angular y el set de iconos de Lucide en el arranque de tu aplicacion:

```typescript
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
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
  providers: [
    provideAnimations(),
    importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
  ],
};
```

## Uso basico

```typescript
import { Component } from '@angular/core';
import { MagaryButton, MagaryCard } from 'ng-magary';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [MagaryButton, MagaryCard],
  template: `
    <magary-card [width]="'400px'" [shadow]="4" [backgroundColor]="'var(--surface-0)'">
      <h2 style="margin: 0; padding-bottom: 1rem;">Mi primer card</h2>
      <p style="color: var(--text-secondary);">El diseno base ya viene resuelto.</p>

      <div style="margin-top: 1.5rem; display: flex; gap: 0.5rem">
        <magary-button label="Aceptar" severity="info" />
        <magary-button label="Cancelar" variant="outlined" severity="secondary" />
      </div>
    </magary-card>
  `,
})
export class HomeComponent {}
```

## Servicios y tipos publicos

Cuando consumas overlays o mensajeria desde el root entrypoint, usa los tipos publicos prefijados:

```typescript
import {
  MagaryConfirmDialog,
  MagaryConfirmationService,
  MagaryToast,
  MagaryToastService,
  type MagaryConfirmation,
  type MagaryToastMessage,
} from 'ng-magary';

const toast: MagaryToastMessage = {
  type: 'success',
  title: 'Saved',
  message: 'The record was stored successfully.',
};

const confirmation: MagaryConfirmation = {
  header: 'Delete record',
  message: 'Do you want to continue?',
};
```

## Estilos globales y consideraciones

- La libreria expone estilos por componente y usa CSS variables para personalizacion.
- Para overlays globales como `magaryTooltip`, debes cargar el stylesheet compartido en los estilos raiz de tu app:

```scss
@use 'ng-magary/styles/tooltip.scss';
```

## Licencias y terceros

Las atribuciones y licencias de dependencias de terceros estan documentadas en el repositorio principal:

- `THIRD_PARTY_NOTICES.md`
- `third_party/licenses/`

---

Construido para acelerar frontends en Angular.
