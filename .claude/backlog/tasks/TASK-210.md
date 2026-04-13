---
id: TASK-210
title: "Redisenar Footer segun Figma"
status: done
priority: P1
type: feature
phase: 11
estimate: M
depends_on:
  - TASK-200
figma_ref: "DUALYS > footer component (node 7105:52160)"
files:
  - src/components/layout/Footer.tsx
---

## Descripcion

Redesign the footer component to match Figma layout. New layout: 4 columns (Navegacio, Contacte, Logo+description, Legal). Bottom row with legal links and copyright.

## Figma specs

Layout:
- 4-column grid: Navegacio, Contacte, Logo+description, Legal
- Bottom row with legal links and copyright text

## Criterios de aceptacion

- [ ] Footer matches Figma design
- [ ] All 4 languages render correctly
- [ ] All links work
- [ ] 4-column layout on desktop
- [ ] Responsive collapse on mobile
- [ ] Legal links and copyright in bottom row
