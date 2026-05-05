<div align="center">
  <img src="https://raw.githubusercontent.com/JhoanGon/magary/main/projects/demo-app/public/assets/magary_logo.webp" alt="Magary Logo" width="120" />
  <h1>Magary Ecosystem</h1>
  <p><strong>A modern, standalone-first Angular UI library monorepo</strong></p>

  [![npm version](https://badge.fury.io/js/ng-magary.svg)](https://badge.fury.io/js/ng-magary)
  [![Angular Compatibility](https://img.shields.io/badge/Angular-v17_|_v18_|_v19_|_v20_|_v21-dd0031.svg?logo=angular)](https://angular.dev)
  [![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
  [![Build Status](https://img.shields.io/badge/CI-Passing-success.svg)](#)
  [![Sponsor](https://img.shields.io/badge/Sponsor-GitHub-ea4aaa?style=flat&logo=github)](https://github.com/sponsors/JhoanGon)
  [![BuyMeACoffee](https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=flat&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/praiddev)
</div>

---

Welcome to the Magary monorepo. This repository contains the `ng-magary` UI library, the demo/documentation app, and supporting tooling around the ecosystem.

The public `ng-magary` surface is standalone-only for modern Angular consumers (17+), including the demo and setup documentation.

## Workspace structure

- `projects/ng-magary`: Angular UI library published to npm as `ng-magary`.
- `projects/demo-app`: Documentation and demo application used for QA, accessibility, and visual validation.
- `projects/magary-mcp`: MCP helper tooling for component discovery and AI-assisted workflows.

## Quick start

```bash
pnpm install
pnpm run build
```

## Daily workflow commands

```bash
pnpm run build:lib          # Build ng-magary for production
pnpm run build:demo         # Build the demo app
pnpm run lint               # Lint TypeScript and Angular templates
pnpm run test:unit          # Run all unit tests with Angular + Vitest
pnpm run test:unit:ci       # Run the CI unit gate with warning checks
pnpm run test:visual:smoke  # Validate critical visual flows with Playwright
pnpm run test:a11y:smoke    # Validate accessibility smoke flows with Playwright + AXE
```

## Consumer compatibility matrix

The library is tested against Angular 17 through 21.

```bash
pnpm run build:lib
pnpm run check:consumer-matrix
```

## Full quality gate

Before opening a PR or pushing to `main`, run:

```bash
pnpm run qa:all
```

## Library consumer docs

The npm consumer guide for installing and using the library lives in:

`projects/ng-magary/README.md`

That file is packaged as the root README inside `dist/ng-magary` during publish.

## Release notes and documentation

- `CHANGELOG.md`
- `docs/MIGRATION_COMPATIBILITY.md`
- `docs/RECIPE_ECOMMERCE.md`
- `docs/RECIPE_LOGISTICS.md`
- `docs/RECIPE_DASHBOARD.md`

## Third-party compliance

Third-party notices and license copies live in:

- `THIRD_PARTY_NOTICES.md`
- `third_party/licenses/`

Validation command:

```bash
pnpm run check:third-party
```

## Tooltip global styles

Components like `magaryTooltip` render overlays at the `document.body` level to escape stacking contexts. Consumers must load the tooltip stylesheet in their global styles:

```scss
@use 'ng-magary/styles/tooltip.scss';
```

---

<p align="center">
  Built for Angular
</p>
