---
id: TASK-112
title: "Verificar middleware.ts para nuevas rutas"
status: done
priority: P0
type: infrastructure
phase: 1
estimate: XS
depends_on: [TASK-101]
briefing_ref: "Sección 7 del briefing"
files:
  - src/middleware.ts
---

## Descripcion
Verificar que el middleware de i18n routing funciona correctamente con las nuevas rutas. No debería necesitar cambios estructurales (usa wildcard matcher) pero hay que confirmar.

## Criterios de aceptacion
- [ ] Nuevas rutas (/servicios, /metodologia, /recursos) funcionan con prefijo de locale
- [ ] Redirect de locale por defecto funciona
- [ ] No hay conflictos con rutas antiguas
