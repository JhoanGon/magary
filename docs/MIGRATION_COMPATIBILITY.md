# Migration and Compatibility Guide

Date: `2026-02-27`
Target package: `ng-magary@0.0.11`

## Compatibility Matrix

| Area | Supported / Verified | Evidence |
| --- | --- | --- |
| Angular consumer majors | `17`, `18`, `19`, `20`, `21` | `tools/ci/check-consumer-matrix.mjs`, `.github/workflows/consumer-compat.yml` |
| Consumer matrix Node | `20` | `.github/workflows/consumer-compat.yml` |
| Main CI Node | `22` | `.github/workflows/ci.yml` |
| Package manager | `pnpm@9` (workspace CI) | `.github/workflows/ci.yml`, `.github/workflows/consumer-compat.yml` |

## Mandatory Setup

1. Install peer dependencies:
```bash
pnpm add ng-magary @angular/cdk @angular/animations gridstack lucide-angular lucide
```

2. Enable animations provider:
```ts
import { provideAnimations } from '@angular/platform-browser/animations';
```

3. Register Lucide icon provider in your app config/module.

4. Load tooltip global styles:
```scss
@use 'ng-magary/styles/tooltip.scss';
```

## Migration by Version

### From <= `0.0.10` to `0.0.11`

Expected impact:
- No intentional public API breaking changes.
- CI and QA gates are stricter (coverage + visual + a11y verification).

Recommended consumer actions:
1. Rebuild and run strict type checks in your app.
2. Revalidate overlays and keyboard flow (`Escape`, focus return).
3. Revalidate forms that use input/select/cascade-select components.
4. Run accessibility scan on pages that embed Magary components.

### From older pre-signal releases to current line

Expected impact:
- Internal implementation moved to Angular signal-style inputs/outputs.
- Public behavior remains stable, but consumers should retest wrappers/adapters.

Recommended consumer actions:
1. Remove assumptions tied to legacy decorator internals.
2. Validate event payload typings in your wrappers.
3. Validate templates under `strictTemplates: true`.

## API Migration Notes

- Avoid `any` in component integration wrappers/events.
- Keep public payloads typed in consumer-facing APIs.
- Do not depend on internal class names for behavior; use documented inputs/outputs.

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

Local command:
```bash
pnpm run build:lib
pnpm run check:consumer-matrix
```

CI workflow:
- `.github/workflows/consumer-compat.yml`
