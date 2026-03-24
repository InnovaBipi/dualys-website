---
id: TASK-180
title: "Actualizar tests E2E para nueva navegación y páginas"
status: backlog
priority: P1
type: testing
phase: 8
estimate: L
depends_on: [TASK-127, TASK-130, TASK-131, TASK-132, TASK-133, TASK-142]
briefing_ref: ""
files:
  - e2e/journeys/primary-conversion.spec.ts
  - e2e/journeys/capability-deep-dive.spec.ts
  - e2e/journeys/institutional-inquiry.spec.ts
  - e2e/journeys/mobile-quick-contact.spec.ts
  - e2e/audits/navigation.spec.ts
---

## Descripcion
Actualizar todos los tests E2E existentes y crear nuevos para las nuevas páginas y flujos de navegación.

## Tests a actualizar
- primary-conversion: nueva ruta Home → Servicios → Contact
- capability-deep-dive: cambiar a Servicios/Sectores deep dive
- navigation: nueva estructura de nav

## Tests nuevos
- servicios page loads in 4 languages
- sectores page loads in 4 languages
- metodologia page loads
- nosotros page loads
- redirects (old routes → new routes)

## Criterios de aceptacion
- [ ] Tests existentes actualizados
- [ ] Tests nuevos para páginas nuevas
- [ ] Tests de redirects
- [ ] Todos pasan en CI
