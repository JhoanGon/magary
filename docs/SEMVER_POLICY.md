# SemVer Policy — ng-magary

## Versioning Scheme

`ng-magary` follows **Semantic Versioning 2.0.0** (`MAJOR.MINOR.PATCH`).

| Segment | When to bump | Examples |
|---------|-------------|----------|
| `MAJOR` | Breaking change in public API or behavior | Remove `@Input`, rename event, change default behavior |
| `MINOR` | New feature, deprecation, or backward-compatible API addition | New `@Input`, new component, `@deprecated` annotation |
| `PATCH` | Bug fix, docs, CI, or internal refactor with no observable change | Fix memory leak, correct typo, tighten CI threshold |

## Decision Rules

Use the table in `docs/RELEASE_CANDIDATE_CHECKLIST.md` (§ Reglas de decision rapida) for quick classification.

## Deprecation Policy

1. **Announce** deprecation in `CHANGELOG.md` with `@deprecated` JSDoc on the symbol.
2. **Support** the deprecated symbol for at least **1 MINOR** release.
3. **Remove** in a subsequent MAJOR release, with migration steps in `docs/MIGRATION_COMPATIBILITY.md`.
4. **Never** remove a public API without a deprecation cycle unless it is a security fix (document rationale in changelog).

## Pre-1.0 Stability

While the package is at `0.x.y`:
- MINOR releases **may** include breaking changes, but the deprecation policy above still applies.
- PATCH releases must remain backward-compatible.
- The goal is to reach `1.0.0` only when the public API is considered stable enough for a long-term contract.

## Changelog

Every release must have a corresponding entry in `CHANGELOG.md` with:
- Version number and date
- Type (`PATCH`, `MINOR`, `MAJOR`)
- Categorized changes (Added, Changed, Deprecated, Removed, Fixed, Security)
- Migration notes if applicable

## Enforcement

- CI gate `check:api-contract` detects unannounced public API changes.
- PRs that change the public API without a matching changelog entry or deprecation annotation will fail review.
