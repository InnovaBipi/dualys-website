---
id: TASK-140
title: "Eliminar /capabilities/* (4 sub-páginas)"
status: backlog
priority: P1
type: refactor
phase: 4
estimate: M
depends_on: [TASK-127, TASK-130]
briefing_ref: "Sección 7 del briefing"
files:
  - src/app/[locale]/capabilities/defense/page.tsx
  - src/app/[locale]/capabilities/cybersecurity/page.tsx
  - src/app/[locale]/capabilities/biosecurity/page.tsx
  - src/app/[locale]/capabilities/dual-use/page.tsx
  - src/app/[locale]/capabilities/page.tsx
---

## Descripcion
Eliminar las 4 sub-páginas de capabilities y la página overview. Estas son reemplazadas por /servicios y /sectores.

## Criterios de aceptacion
- [ ] Directorios eliminados
- [ ] Sin imports rotos a componentes eliminados
- [ ] Redirects configurados (TASK-142)
- [ ] Build pasa sin errores
