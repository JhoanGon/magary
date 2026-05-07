# Release Workflow — ng-magary

## Overview

This document defines the end-to-end process for publishing a release of `ng-magary`. It complements:
- `docs/SEMVER_POLICY.md` — versioning rules
- `docs/RELEASE_CANDIDATE_CHECKLIST.md` — per-release checklist
- `docs/MIGRATION_COMPATIBILITY.md` — migration guide
- `CHANGELOG.md` — release history

## Release Lifecycle

```
[Plan] → [Branch] → [Implement] → [RC] → [Validate] → [Publish] → [Tag]
```

### 1. Plan

- Determine the release type (`PATCH`, `MINOR`, `MAJOR`) per `SEMVER_POLICY.md`.
- Assign a release owner (`@responsable`).
- Create or update the release tracking entry in `RELEASE_CANDIDATE_CHECKLIST.md`.

### 2. Branch

- Create a release branch: `release/X.Y.Z` from `main`.
- All release-specific changes (version bumps, changelog entries) go on this branch.

### 3. Implement

- Apply planned changes.
- Update `CHANGELOG.md` with the new version entry.
- Update `projects/ng-magary/package.json` version.
- Run `pnpm run build:lib` to verify build.

### 4. Release Candidate

- Create an RC tag: `vX.Y.Z-rc.1`.
- Run the full quality gate suite (see checklist).
- If gates fail: fix on the release branch, create `rc.2`, repeat.

### 5. Validate

- Execute all gates in `RELEASE_CANDIDATE_CHECKLIST.md`.
- Verify consumer compatibility matrix (`check:consumer-matrix`).
- Confirm migration guide is up to date if there are deprecations or breaking changes.

### 6. Publish

- Merge release branch to `main`.
- Tag final version: `vX.Y.Z`.
- Publish package to registry.
- Create GitHub Release with notes from `CHANGELOG.md`.

### 7. Tag and Close

- Mark checklist as `Publicado`.
- Update `ROADMAP.md` or `CONSUMO_MASIVO_ROADMAP.md` to reflect the new version.
- Close the release tracking issue/PR.

## Hotfix Path

For urgent fixes on a published version:

1. Branch from the published tag: `hotfix/X.Y.Z+1`.
2. Apply the fix, bump PATCH version.
3. Run quality gates (minimum: `build:lib`, `test:unit`, `check:api-contract`).
4. Merge to `main` and backport to any active release branches.
5. Publish as `X.Y.(Z+1)`.

## Ownership

| Role | Responsibility |
|------|---------------|
| Release Owner | Drives the release end-to-end, owns checklist completion |
| Reviewer | Validates API changes, changelog accuracy, and migration notes |
| Maintainer | Approves final merge and publish |
