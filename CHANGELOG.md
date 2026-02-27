# Changelog

All notable changes to this workspace are documented in this file.

## [0.0.11] - 2026-02-27

### CI and Compatibility
- Split CI into staged fail-fast jobs: `gates -> build -> unit -> e2e`.
- Added consistent failure reports and stage/version artifacts in CI workflows.
- Verified consumer compatibility matrix for Angular `17, 18, 19, 20, 21`.

### Quality Gates
- Added critical coverage gate with enforced thresholds:
- lines `>= 90%`
- branches `>= 85%`
- Added coverage threshold checker: `tools/ci/check-coverage-thresholds.mjs`.
- Added critical coverage config: `tools/ci/coverage-critical.config.json`.

### Testing
- Expanded unit coverage for critical library and demo areas:
- `theme.service`, `tab`, `button`, `layout`, `pwa.service`, `theme-switcher`.
- Expanded E2E smoke coverage:
- desktop and mobile critical flows
- explicit `loading/error/disabled` state checks
- Expanded A11y smoke coverage:
- Axe severe/critical scans
- keyboard-only navigation checks
- focus visibility checks
- ARIA semantics and contrast checks on critical controls

### Documentation
- Updated migration and compatibility guide with versioned migration path.
- Added visual regression approval criteria.
- Added integration examples section in demo setup page.

### Notes for Consumers
- No intentional public API break was introduced in this release line.
- Consumers should still run their own app-level smoke and accessibility checks
  after upgrading.
