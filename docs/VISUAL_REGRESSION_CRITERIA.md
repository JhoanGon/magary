# Visual Regression Criteria

## Scope
- This gate validates baseline screenshots for key demo areas:
- `forms` (Input, Button, Cascade Select)
- `overlay` (Dialog, ConfirmDialog, Tooltip, OverlayPanel)
- `data` (Table, Tree, DataView, Pick List, Order List, Timeline, Organization Chart)
- `menu` (Panel Menu, Sidebar)
- `panel` (TabView, Card)
- Breakpoints required in every visual baseline:
- `mobile-375`
- `tablet-768`
- `desktop-1280`

## Commands
- Validate visual baseline:
- `pnpm run test:visual:regression`
- Update baseline when changes are intentional:
- `pnpm run test:visual:regression:update`

## Approval Rules
- `PASS` when `test:visual:regression` returns `0` failures.
- Any diff is treated as `FAIL` until triaged.
- A diff can be approved only if all conditions are met:
- the visual change is intentional and expected
- product/design owner confirms the new UI
- baseline is updated with `test:visual:regression:update`
- regression validation is run again and passes
- If diff is not intentional, fix code and rerun `test:visual:regression` without updating snapshots.

## CI/Local Notes
- Playwright baseline comparison uses project defaults in `e2e/playwright/playwright.config.ts`.
- Snapshot artifacts are generated under `e2e/playwright/snapshots/`.
- Failure diagnostics are available under `e2e/playwright/test-results/`.
