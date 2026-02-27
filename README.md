# Magary Workspace

Monorepo for the Magary Angular ecosystem.

## Projects

- `projects/ng-magary`: Angular UI library published as `ng-magary`.
- `projects/demo-app`: documentation/demo application used for QA and visual validation.
- `projects/magary-mcp`: MCP helper tooling for component discovery workflows.

## Quick Start

```bash
pnpm install
pnpm run build
```

## Daily Commands

```bash
pnpm run build:lib
pnpm run build:demo
pnpm run test:unit
pnpm run test:visual:smoke
pnpm run test:a11y:smoke
```

Consumer compatibility smoke (Angular 17/19/21):

```bash
pnpm run build:lib
pnpm run check:consumer-matrix
```

Full quality gate:

```bash
pnpm run qa:all
```

## Library Consumer Docs

The npm consumer guide is maintained in:

- `projects/ng-magary/README.md`

This is the README shipped in `dist/ng-magary` during publish.

## Release Notes

- `CHANGELOG.md`
- `docs/MIGRATION_COMPATIBILITY.md`
- `docs/RECIPE_ECOMMERCE.md`
- `docs/RECIPE_LOGISTICS.md`
- `docs/RECIPE_DASHBOARD.md`

## Tooltip Global Styles

`magaryTooltip` renders overlays in `document.body`, so consumers must load global styles:

```scss
@use 'ng-magary/styles/tooltip.scss';
```
