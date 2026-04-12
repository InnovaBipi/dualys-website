---
id: TASK-223
title: "Redisenar VerticalsSection con imagen cards"
status: backlog
priority: P1
type: feature
phase: 12
estimate: L
depends_on:
  - TASK-200
figma_ref: "DUALYS - DISSENY > inici > Verticals de defensa"
files:
  - src/components/sections/VerticalsSection.tsx
---

## Descripcion

Replace icon-based vertical cards with image cards. 10 cards in 5x2 grid with photo backgrounds and text overlay. Export vertical images from Figma. Each card links to vertical detail page.

## Figma specs

- 10 vertical cards in 5x2 grid
- Photo background per card with text overlay
- Each card links to its vertical detail page

## Criterios de aceptacion

- [ ] Image cards match Figma design
- [ ] Links work and navigate to correct vertical detail pages
- [ ] Responsive grid (adapts to mobile)
- [ ] Images optimized (WebP, lazy load)
- [ ] All 4 languages render correctly
- [ ] 10 cards displayed in 5x2 grid on desktop
