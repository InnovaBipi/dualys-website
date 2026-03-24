---
id: TASK-142
title: "Configurar redirects 301 (old → new routes)"
status: backlog
priority: P0
type: infrastructure
phase: 4
estimate: M
depends_on: [TASK-130, TASK-131, TASK-133, TASK-134]
briefing_ref: "Sección 7 del briefing"
files:
  - next.config.ts
---

## Descripcion
Configurar redirects permanentes (301) para preservar SEO link juice de las rutas antiguas.

## Redirects
| Ruta antigua | Ruta nueva |
|---|---|
| /about | /nosotros |
| /about/team | /nosotros |
| /about/partners | /nosotros |
| /capabilities | /servicios |
| /capabilities/defense | /servicios |
| /capabilities/cybersecurity | /servicios |
| /capabilities/biosecurity | /servicios |
| /capabilities/dual-use | /servicios |
| /sectors | /sectores |
| /news | /recursos |

Todas las variantes con prefijo de locale deben redirigir correctamente.

## Criterios de aceptacion
- [ ] Todos los redirects funcionan (301)
- [ ] Funcionan con y sin prefijo de locale
- [ ] Build pasa
- [ ] Verificado manualmente en dev server
