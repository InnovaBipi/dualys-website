---
id: TASK-232
title: "Redisenar pagina detalle de vertical"
status: backlog
priority: P1
type: feature
phase: 13
estimate: L
depends_on:
  - TASK-200
  - TASK-202
figma_ref: "DUALYS - DISSENY > vertical-vehiclesterrestres (node 7077:51096)"
files:
  - src/app/[locale]/sectores/[slug]/page.tsx
  - src/components/content/SubcategoryCard.tsx
---

## Descripcion

Redesign vertical detail page. Hero with background image + title overlay. Subcategory cards with text-only + left accent border (remove icons). New "Mes verticals" section at bottom with 3 cross-link image cards to other verticals.

## Figma specs

- Hero with background image and title overlay
- Subcategory cards: text-only with left accent border (no icons)
- "Mes verticals" section at bottom: 3 cross-link image cards to other verticals

## Criterios de aceptacion

- [ ] Hero image works with title overlay
- [ ] Subcategory cards match Figma (text-only, left accent border)
- [ ] Cross-links navigate correctly to other verticals
- [ ] Responsive layout
- [ ] All 4 languages render correctly
- [ ] "Mes verticals" shows 3 related verticals
