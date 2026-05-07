# Release Candidate — 0.0.24

## Metadata

- **Version:** `0.0.24`
- **Type:** `MINOR`
- **Status:** `RC — non-build validation passed`
- **Owner:** `Maintainer`
- **Validator:** `Pending assignment`
- **Date:** `2026-05-06`

## Scope

This release packages the accepted minimal scope for `0.0.24`:
1. Governance documentation suite (added and closed).
2. Functional slice: async state handling for `DataView`, `OrderList`, `PickList`, `Tree`.

No staged Data slice files under `projects/ng-magary/src/lib/Data/{dataview,orderlist,picklist,tree}` were modified during RC preparation.

## Changes Since 0.0.23

### Added
- Governance documentation:
  - `docs/SEMVER_POLICY.md` — SemVer 2.0 policy with deprecation rules
  - `docs/RELEASE_WORKFLOW.md` — End-to-end release process
  - `docs/RELEASE_CANDIDATE_CHECKLIST.md` — Reusable release checklist
- API contract CI gate (`check:api-contract`) for detecting unannounced public API changes

### Changed
- Data components (`DataView`, `OrderList`, `PickList`, `Tree`) — functional slice with typed events and consistent async state handling

### Deprecated
- *(none in this release)*

### Fixed
- *(none reported in this release)*

## Migration Notes

**No breaking changes.** Consumers on `0.0.23` can upgrade without code changes.
See `docs/MIGRATION_COMPATIBILITY.md` for the `0.0.23 → 0.0.24` migration note.

## Quality Gates

Gates listed below reflejan el estado actual del RC. Los comandos no-build ya fueron validados; los pasos de build/publish siguen pendientes antes de publicar.

| Gate | Command | Status |
|------|---------|--------|
| API contract | `pnpm run check:api-contract` | ✅ Passed |
| No any | `pnpm run check:no-any` | ✅ Passed |
| Lint | `pnpm run lint` | ✅ Passed |
| Build lib | `pnpm run build:lib` | ⬜ Not run |
| Build demo | `pnpm run build:demo` | ⬜ Not run |
| Demo budgets | `pnpm run check:demo-budgets` | ⬜ Not run |
| Unit tests | `pnpm run test:unit` | ✅ Passed |
| Visual smoke | `pnpm run test:visual:smoke` | ✅ Passed |
| A11y smoke | `pnpm run test:a11y:smoke` | ✅ Passed |
| Consumer matrix | `pnpm run check:consumer-matrix` | ✅ Passed |

## Governance Checklist

See `docs/releases/0.0.24-checklist.md` for the filled release checklist with owner/validator/status fields.

## SemVer Justification

Per `docs/SEMVER_POLICY.md`:
- **MINOR** is correct: new governance docs and backward-compatible async state handling for Data components.
- No public API was removed or renamed.
- No deprecations were introduced.

## Release Decision

This RC passed the non-build validation gates and is ready for final publish validation. Before promotion to `Published`, the remaining operational steps are build verification, validator assignment, final approval, tag, and publish.

## References

- `docs/SEMVER_POLICY.md`
- `docs/RELEASE_WORKFLOW.md`
- `docs/RELEASE_CANDIDATE_CHECKLIST.md`
- `docs/MIGRATION_COMPATIBILITY.md`
- `docs/releases/0.0.24-checklist.md`
- `CHANGELOG.md`
