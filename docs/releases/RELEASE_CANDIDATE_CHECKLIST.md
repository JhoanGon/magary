# Release Candidate Checklist

**Objetivo:** ejecutar un release de `ng-magary` con trazabilidad, criterios claros y cero ambigüedad operativa.

**Usar junto con:**
- `docs/SEMVER_POLICY.md`
- `docs/MIGRATION_COMPATIBILITY.md`
- `CHANGELOG.md`

---

## Quick path

1. Definir la versión y su tipo SemVer (`PATCH`, `MINOR`, `MAJOR`).
2. Ejecutar todos los gates de calidad y compatibilidad.
3. Publicar solo si changelog, migración y ownership están completos.

---

## Datos del release

- **Fecha:** `YYYY-MM-DD`
- **Paquete:** `ng-magary`
- **Versión:** `X.Y.Z`
- **Tipo SemVer:** `PATCH | MINOR | MAJOR`
- **Owner del release:** `@responsable`
- **Estado:** `Borrador | RC | Publicado`

---

## Reglas de decisión rápida

| Si el cambio es... | Entonces es... | Requiere además... |
|---|---|---|
| Fix sin cambio de contrato público | `PATCH` | Changelog + checklist |
| API nueva o deprecación compatible | `MINOR` | Changelog + nota de deprecación |
| Breaking change o retiro de API | `MAJOR` | Changelog + migración + RC |

---

## Packaging

- [ ] Versión actualizada en `projects/ng-magary/package.json`.
- [ ] Si aplica, versión raíz alineada en `package.json`.
- [ ] `dist/ng-magary/package.json` verificado antes de publicar.
- [ ] Tag/version name preparado para GitHub Release o publish.

---

## Quality Gates

- [ ] `pnpm run check:api-contract`
- [ ] `pnpm run check:no-any`
- [ ] `pnpm run lint`
- [ ] `pnpm run build:lib`
- [ ] `pnpm run build:demo`
- [ ] `pnpm run check:demo-budgets`
- [ ] `pnpm run test:unit`
- [ ] `pnpm run test:visual:smoke`
- [ ] `pnpm run test:a11y:smoke`
- [ ] `pnpm run check:consumer-matrix`

---

## Documentación obligatoria

- [ ] `CHANGELOG.md` actualizado con la entrada de `X.Y.Z`.
- [ ] Tipo SemVer declarado explícitamente en el changelog.
- [ ] Si hay deprecaciones: nota agregada en `CHANGELOG.md` y `docs/MIGRATION_COMPATIBILITY.md`.
- [ ] Si hay breaking changes: guía de migración actualizada en `docs/MIGRATION_COMPATIBILITY.md`.
- [ ] Si aplica, evidencia o resumen del release enlazado desde la release note.

---

## Gobernanza del release

- [ ] El owner del release está asignado.
- [ ] El tipo SemVer está justificado contra `docs/SEMVER_POLICY.md`.
- [ ] No hay breaking change sin guía de migración.
- [ ] No hay retiro de API sin aviso previo de deprecación.
- [ ] GitHub Release / release notes preparadas.
- [ ] Aprobación final registrada antes de publicar.

---

## Requisitos adicionales por tipo

### Si es `PATCH`
- [ ] Confirmado que no cambia contrato público ni comportamiento observable.

### Si es `MINOR`
- [ ] Nueva API o deprecación documentada.
- [ ] Compatibilidad hacia atrás validada.

### Si es `MAJOR`
- [ ] Release Candidate creado antes del release final.
- [ ] Guía de migración validada paso a paso.
- [ ] Lista de breaking changes revisada y cerrada.

---

## Cierre

- [ ] Publish ejecutado correctamente.
- [ ] Tag final creado.
- [ ] Release notes publicadas.
- [ ] Estado final marcado como `Publicado`.

---

## Resultado esperado

Al cerrar esta checklist, el release debe poder responder sin ambigüedad:

- qué versión salió,
- por qué es `PATCH`, `MINOR` o `MAJOR`,
- qué cambió,
- si alguien debe migrar,
- y quién aprobó/publicó.
