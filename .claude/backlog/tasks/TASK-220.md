---
id: TASK-220
title: "Redisenar HeroSection con imagen de fondo"
status: done
priority: P0
type: feature
phase: 12
estimate: L
depends_on:
  - TASK-200
  - TASK-202
figma_ref: "DUALYS - DISSENY > inici > hero section"
files:
  - src/components/sections/HeroSection.tsx
---

## Descripcion

Complete redesign of hero section. Add full-width background image (aerial view of industrial facility). Headline and CTAs overlaid on image. Export image from Figma API. Stats (800.000M, 44.000M, 2%PIB) integrated below or within hero.

## Figma specs

- Full-width background image (aerial view of industrial facility)
- Headline text overlaid on image
- 2 CTA buttons overlaid on image
- Stats row: 800.000M, 44.000M, 2%PIB

## Criterios de aceptacion

- [ ] Hero has background image
- [ ] Text readable over image (contrast, overlay)
- [ ] Responsive across breakpoints
- [ ] Performance: LCP < 2.5s with optimized image
- [ ] Stats visible and correctly formatted
- [ ] CTAs functional and styled per new Button component
