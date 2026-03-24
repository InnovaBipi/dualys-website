---
id: TASK-141
title: "Eliminar /about/team y /about/partners"
status: done
priority: P1
type: refactor
phase: 4
estimate: S
depends_on: [TASK-133]
briefing_ref: "Sección 7 del briefing"
files:
  - src/app/[locale]/about/team/page.tsx
  - src/app/[locale]/about/partners/page.tsx
  - src/app/[locale]/about/page.tsx
---

## Descripcion
Eliminar las sub-páginas de About (team, partners) y la página overview. Reemplazadas por /nosotros.

## Criterios de aceptacion
- [ ] Directorios eliminados
- [ ] Sin imports rotos
- [ ] Redirects configurados (TASK-142)
