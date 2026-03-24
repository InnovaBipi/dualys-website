---
id: TASK-102
title: "Actualizar sitemap.ts con nuevas rutas"
status: done
priority: P0
type: infrastructure
phase: 0
estimate: XS
depends_on: [TASK-101]
briefing_ref: "Sección 7 del briefing"
files:
  - src/app/sitemap.ts
---

## Descripcion
Actualizar el sitemap XML generado dinámicamente para reflejar las nuevas rutas.

## Cambios
- Eliminar rutas /capabilities/*, /about/team, /about/partners
- Añadir /servicios, /metodologia
- Renombrar /sectors → /sectores, /news → /recursos, /about → /nosotros
- Ajustar prioridades: homepage 1.0, servicios 0.95, sectores 0.9, metodologia 0.85, etc.

## Criterios de aceptacion
- [ ] Sitemap genera todas las nuevas rutas
- [ ] Sitemap no contiene rutas eliminadas
- [ ] Prioridades asignadas correctamente
- [ ] Todas las rutas generadas para 4 idiomas
