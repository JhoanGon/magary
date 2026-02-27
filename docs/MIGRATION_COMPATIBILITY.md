# Migration and Compatibility Guide

Date: `2026-02-26`

## Supported Versions
- Angular: `^17 || ^18 || ^19 || ^20 || ^21`
- Node: align with Angular LTS/runtime requirement.

## Mandatory Setup
1. Install peer dependencies:
```bash
pnpm add ng-magary @angular/cdk @angular/animations gridstack lucide-angular lucide
```

2. Enable animations provider:
```ts
import { provideAnimations } from '@angular/platform-browser/animations';
```

3. Register Lucide icons provider in app config.

4. Tooltip global style import:
```scss
@use 'ng-magary/styles/tooltip.scss';
```

## API Migration Notes
- Legacy decorators (`@Input`, `@Output`) are migrating to signal API (`input()`, `output()`).
- Public event payloads must remain typed. Avoid `output<any>()`.
- Do not reintroduce legacy decorator syntax in new code.

## Compatibility Checklist for Consumer Teams
- Run your app with `strictTemplates: true`.
- Validate routes that use overlays with keyboard (`Escape`, focus return).
- Validate select/input/table forms with a11y scanner.
- Validate global styles do not override Magary component tokens unexpectedly.

## Release Safety Checklist
- `pnpm run check:api-contract`
- `pnpm run check:no-any`
- `pnpm run lint`
- `pnpm run build:lib`
- `pnpm run build:demo`
- `pnpm run test:unit:ci`
- `pnpm run test:visual:smoke`
- `pnpm run test:a11y:smoke`

## Consumer Matrix Smoke
- Local command:
```bash
pnpm run build:lib
pnpm run check:consumer-matrix
```
- CI workflow: `.github/workflows/consumer-compat.yml`
