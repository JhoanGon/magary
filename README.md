# Magary Workspace

Monorepo de Magary UI con tres proyectos principales:

- `projects/ng-magary`: libreria Angular publicada como `ng-magary`.
- `projects/demo-app`: app demo/documentacion visual.
- `projects/magary-mcp`: servidor MCP para discovery de componentes.

## Documentacion publica de la libreria

La guia para consumidores del paquete esta en:

- `projects/ng-magary/README.md`

Ese archivo es el que termina en `dist/ng-magary/README.md` al publicar npm.

## Desarrollo local

```bash
pnpm install
pnpm run build
```

## Calidad (estado recomendado para PR)

```bash
pnpm run lint
pnpm run build:lib
pnpm run build:demo
pnpm run test:unit
pnpm run test:visual
```

Comando consolidado:

```bash
pnpm run qa:all
```

## Nota importante sobre estilos

`ng-magary` no publica archivos globales `theme.css` ni `core.css`.

- Los estilos de componentes vienen encapsulados en la libreria.
- `Tooltip` usa clases globales (`.magary-tooltip`) y requiere estilos globales en la app consumidora.

Para configuracion MCP y clientes IDE:

- `docs/MCP_SETUP.md`
