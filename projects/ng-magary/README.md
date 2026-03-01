<div align="center">
  <img src="https://raw.githubusercontent.com/JhoanGon/magary/main/projects/demo-app/public/assets/magary_logo.webp" alt="Magary Logo" width="120" />
  <h1>ng-magary</h1>
  <p><strong>Librería de Componentes UI Premium y Modernos para Angular (Standalone-First)</strong></p>

  [![npm version](https://badge.fury.io/js/ng-magary.svg)](https://badge.fury.io/js/ng-magary)
  [![Angular Compatibility](https://img.shields.io/badge/Angular-v17_|_v18_|_v19_|_v20_|_v21-dd0031.svg?logo=angular)](https://angular.dev)
  [![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
  [![Sponsor](https://img.shields.io/badge/Sponsor-GitHub-ea4aaa?style=flat&logo=github)](https://github.com/sponsors/JhoanGon)
  [![BuyMeACoffee](https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=flat&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/praiddev)
</div>

---

`ng-magary` es un ecosistema avanzado de componentes de interfaz de usuario diseñado estrictamente bajo el paradigma **Standalone** de Angular moderno. Pensado para ofrecer estética Premium (Glassmorphism, animaciones fluidas) y rendimiento inquebrantable desde el primer bit.

✨ **Documentación Interactiva & Demo Completa:**  
👉 [magary.pages.dev](https://magary.pages.dev)

## 🌟 Características Destacadas (Key Features)

*   🚀 **Standalone First**: Integración arquitectónica directa sin la verbosidad de los viejos `NgModules`. Solo importas lo que necesitas donde lo necesitas.
*   🎨 **Soporte Nativo de Temas CSS**: No requiere motores de preprocesamiento acoplados (Tailwind o pesados toolkits). Variables CSS puras que habilitan Glassmorphism y Dark Mode.
*   📱 **Mobile-Ready**: Diseños altamente elásticos (Overflows controlados, Touch Actions, Dynamic Viewports).
*   ♿ **Accesibilidad de Grado (a11y)**: Navegabilidad por teclado, roles ARIA transparentes, atributos de pantalla nativos.
*   ⚡ **Rendimiento**: Soporte de ChangeDetection `OnPush` estricto en el 100% de la arquitectura.

---

## 📦 Instalación

Requiere `peerDependencies` fundamentales para la física (Drag & Drop de Atlassian), animaciones e Iconografía.

### 🔹 Usando npm:
```bash
npm install ng-magary @angular/cdk @angular/animations @atlaskit/pragmatic-drag-and-drop lucide lucide-angular gridstack
```

### 🔹 Usando pnpm (Recomendado):
```bash
pnpm add ng-magary @angular/cdk @angular/animations @atlaskit/pragmatic-drag-and-drop lucide lucide-angular gridstack
```

---

## ⚙️ Configuración Mínima

Para que los componentes brillen con todo su potencial, debes dotar a tu aplicación Angular con el proveedor de Animaciones y los íconos globales de Lucide.

En tu `app.config.ts` o arranque de `main.ts`:

```typescript
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LucideAngularModule, icons } from 'lucide-angular';

// Helper para convertir el formato de los íconos
const kebabCase = (value: string) => value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

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
    provideAnimations(), // <<-- Requerido para transiciones fluidas de Magary
    importProvidersFrom(LucideAngularModule.pick(lucideIcons)) // <<-- Requerido para renderizar íconos
  ],
};
```

---

## 💻 Uso Básico

`ng-magary` elimina la grasa. Puedes usar un componente directamente inyectándolo en el array `imports`.

```typescript
import { Component } from '@angular/core';
import { MagaryButton, MagaryCard } from 'ng-magary';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [MagaryButton, MagaryCard],
  template: `
    <magary-card [width]="'400px'" [shadow]="4" [backgroundColor]="'var(--surface-0)'">
      <h2 style="margin:0; padding-bottom: 1rem;">Mi Primer Card</h2>
      <p style="color: var(--text-secondary);">El diseño es automático.</p>
      
      <div style="margin-top: 1.5rem; display: flex; gap: 0.5rem">
          <magary-button label="Aceptar" severity="info" />
          <magary-button label="Cancelar" variant="outlined" severity="secondary" />
      </div>
    </magary-card>
  `,
})
export class HomeComponent {}
```

---

## 🎨 Estilos Globales & Consideraciones

1.  **Exposición CSS:** `ng-magary` prioriza variables en el `:host` y hojas propias en cada componente. **NO** existen pesados imports legacy obligatorios (No busques importar `.css` desde `node_modules`). ¡Todo fluye a través de tus Variables Roots en `styles.scss`!
2.  **Tooltips (Overlays Especiales):** Para componentes flotantes globales de capa alta, como `magaryTooltip`, se requiere cargar sus CSS rules en el `styles.scss` raíz de tu aplicación:

```scss
/* src/styles.scss de tu app consumidora Angular */
@use 'ng-magary/styles/tooltip.scss';
```

## ⚖️ Licencias y Cumplimiento de Terceros

`ng-magary` es de código abierto. Hacemos uso y rendimos homenaje a maravillas arquitectónicas Open Source como `@atlaskit/pragmatic-drag-and-drop` y `gridstack`. Puedes encontrar las atribuciones de licencia explícitas en el repositorio original.

¡Construido con dedicación para acelerar tus Frontends! 🚀