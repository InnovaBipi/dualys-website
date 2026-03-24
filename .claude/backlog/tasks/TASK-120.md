---
id: TASK-120
title: "Reescribir HeroSection con nuevo posicionamiento"
status: done
priority: P0
type: feature
phase: 2
estimate: M
depends_on: [TASK-103]
briefing_ref: "Sección 8.1, Sección 1 del briefing"
files:
  - src/components/sections/HeroSection.tsx
---

## Descripcion
Reescribir completamente el hero de la homepage con el nuevo posicionamiento del briefing.

## Copy ES del briefing (p.12)
- **H1**: "Tu empresa tiene lo que el sector defensa necesita. Nosotros te ayudamos a llegar hasta allí."
- **Subtítulo**: "DUALYS es el puente entre la capacidad industrial y tecnológica de las empresas españolas, y con énfasis inicialmente en las catalanas y los mercados duales europeos. Aceleramos tu entrada al sector defensa con criterio, metodología y red de contactos real."
- **CTA principal**: "Solicita tu diagnóstico →" → link a /contact
- **CTA secundario**: "Conoce nuestra metodología →" → link a /metodologia
- **Nota contextual**: "Europa ha comprometido +800.000 M€ en defensa hasta 2030. El momento de posicionarse es ahora."

## Detalles técnicos
- Mantener animaciones framer-motion existentes
- Mantener brand colors (bg-primary, text-white, accent para CTAs)
- Usar useTranslations('hero') — actualizar keys
- Nota contextual: badge o texto pequeño sobre el H1

## Criterios de aceptacion
- [ ] H1 muestra copy exacto del briefing
- [ ] 2 CTAs con destinos correctos
- [ ] Nota contextual visible
- [ ] Responsive (desktop + mobile)
- [ ] Animaciones mantienen calidad actual
- [ ] Funciona en 4 idiomas
