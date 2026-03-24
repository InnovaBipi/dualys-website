---
id: TASK-130
title: "Crear página /servicios (programa enigmático)"
status: done
priority: P0
type: page
phase: 3
estimate: L
depends_on: [TASK-103, TASK-110]
briefing_ref: "Sección 5, 8.2 del briefing"
files:
  - src/app/[locale]/servicios/page.tsx
---

## Descripcion
Nueva página que presenta el programa completo de acompañamiento de DUALYS. IMPORTANTE: comunicar de forma enigmática — revelar suficiente para intrigar pero no para replicar.

## Copy ES del briefing (p.8, 13)
- Introducción: "Aceleramos tu entrada al mercado de defensa con un programa estructurado, probado y orientado a resultados."
- Presentar como "Programa FFD (FIT FOR DEFENSE)" o "La Ruta Dual Use"
- Solo "por encima" de la metodología
- Sin detallar fases completas

## Estructura recomendada
1. Hero con introducción
2. Nombre del programa (FFD / La Ruta Dual Use)
3. Beneficios clave (sin revelar proceso)
4. Para quién es (3 perfiles)
5. CTA: "Solicita tu diagnóstico →"

## ADVERTENCIA del briefing
> "ATENCIÓN: Los servicios de DUALYS se estructuran en varios servicios estratégicos que conforman el proceso de acompañamiento completo de una empresa. Esta metodología es un activo estratégico y diferencial versus la competencia de otras consultoras que van apareciendo y debe comunicarse de forma enigmática en la web."

## Criterios de aceptacion
- [ ] Página renderiza en /[locale]/servicios
- [ ] Copy enigmático — no revela proceso completo
- [ ] Nombre del programa visible (FFD o La Ruta Dual Use)
- [ ] CTA a contacto
- [ ] SEO metadata + JSON-LD
- [ ] Breadcrumbs
- [ ] 4 idiomas
