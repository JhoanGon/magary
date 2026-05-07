# Migration and Compatibility Guide

Date: `2026-05-06`
Target package: `ng-magary@0.0.24`

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
pnpm add ng-magary @angular/cdk @angular/animations @atlaskit/pragmatic-drag-and-drop gridstack lucide-angular lucide
```

2. Enable animations provider:
```ts
import { provideAnimations } from '@angular/platform-browser/animations';
```

3. Register the Lucide icon provider in your standalone `app.config.ts`.

4. Load tooltip global styles:
```scss
@use 'ng-magary/styles/tooltip.scss';
```

## Migration by Version

### From `0.0.23` to `0.0.24`

Expected impact:
- **No breaking changes.** Public API contract is unchanged.
- Governance documentation added (`SEMVER_POLICY.md`, `RELEASE_WORKFLOW.md`, `RELEASE_CANDIDATE_CHECKLIST.md`).
- Data components (`DataView`, `OrderList`, `PickList`, `Tree`) received async state handling improvements — behavior is backward-compatible.

Recommended consumer actions:
1. No migration required. Upgrade and run your existing test suite.
2. If you use Data components, verify async loading/error states render as expected.

### From `<= 0.0.10` to `0.0.11`

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
- `pnpm run check:third-party`
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
