<div align="center">
  <img src="https://raw.githubusercontent.com/JhoanGon/magary/main/projects/demo-app/public/assets/magary_logo.webp" alt="Magary Logo" width="120" />
  <h1>Magary Ecosystem</h1>
  <p><strong>A Modern, Standalone-First Angular UI Library Monorepo</strong></p>

  [![npm version](https://badge.fury.io/js/ng-magary.svg)](https://badge.fury.io/js/ng-magary)
  [![Angular Compatibility](https://img.shields.io/badge/Angular-v17_|_v18_|_v19_|_v20_|_v21-dd0031.svg?logo=angular)](https://angular.dev)
  [![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
  [![Build Status](https://img.shields.io/badge/CI-Passing-success.svg)](#)
</div>

---

Welcome to the Magary Monorepo. This repository hosts exactly the core logic, UI tooling, and documentation app for the `ng-magary` Angular Ecosystem.

## 📂 Workspace Structure

- 📦 `projects/ng-magary`: The standalone UI library published to NPM as `ng-magary`.
- 🚀 `projects/demo-app`: The interactive Documentation/Demo application used for QA and visual validation (Hosted at [magary.pages.dev](https://magary.pages.dev)).
- 🛠️ `projects/magary-mcp`: MCP helper tooling for component discovery and automated workflows.

## ⚡ Quick Start

Get the monorepo up and running in seconds:

```bash
pnpm install
pnpm run build
```

## 🛠️ Daily Workflow Commands

We strictly follow quality gates. These are your everyday tools:

```bash
pnpm run build:lib          # Compiles ng-magary for production
pnpm run build:demo         # Compiles the demo app
pnpm run test:unit          # Runs all Jasmine/Karma tests
pnpm run test:visual:smoke  # Validates component rendering rules
pnpm run test:a11y:smoke    # Checks accessibility compliance (ARIA/WAI)
```

### 🛡️ Consumer Compatibility Matrix

We test against Angular setups 17 through 21:

```bash
pnpm run build:lib
pnpm run check:consumer-matrix
```

### ✅ Full Quality Gate

Before opening a PR or pushing to main, run the almighty all-in-one check:

```bash
pnpm run qa:all
```

## 📚 Library Consumer Docs (For NPM)

The official NPM consumer guide (which explains how to install and setup the library in an external project) is maintained in:

👉 `projects/ng-magary/README.md`

*(This file is automatically packaged as the root README inside `dist/ng-magary` during publish).* 

## 📜 Release Notes & Documentation

- `CHANGELOG.md` (Version history)
- `docs/MIGRATION_COMPATIBILITY.md`
- `docs/RECIPE_ECOMMERCE.md`
- `docs/RECIPE_LOGISTICS.md`
- `docs/RECIPE_DASHBOARD.md`

## ⚖️ Third-Party Compliance

Any heavy-lifting logic derived from open source must be tracked:

- `THIRD_PARTY_NOTICES.md`
- `third_party/licenses/`

To validate licenses compliance locally:

```bash
pnpm run check:third-party
```

## 🎨 Tooltip Global Styles

Components like `magaryTooltip` render overlays at the `document.body` level to escape stacking contexts. Because of this, consumers **must** load its global styles in their root sass/css:

```scss
@use 'ng-magary/styles/tooltip.scss';
```

---
<p align="center">
  Built with 💙 for Angular 
</p>
