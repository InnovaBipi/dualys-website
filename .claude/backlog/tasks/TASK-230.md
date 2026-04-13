---
id: TASK-230
title: "Redisenar Metodologia con timeline horizontal"
status: done
priority: P1
type: feature
phase: 13
estimate: L
depends_on:
  - TASK-200
  - TASK-202
figma_ref: "DUALYS - DISSENY > metodologia (node 7084:51165)"
files:
  - src/app/[locale]/metodologia/page.tsx
---

## Descripcion

Major redesign of methodology page. Dark hero with "Programa Fit For Defense" title. 4-step horizontal timeline: Diagnosi -> Adaptacio -> Oportunitats -> Connexio. Each step has title + description. Connected by dots/line.

## Figma specs

- Dark hero section with "Programa Fit For Defense" title
- 4-step horizontal timeline:
  1. Diagnosi
  2. Adaptacio
  3. Oportunitats
  4. Connexio
- Each step: title + description text
- Steps connected by dots/line visual element

## Criterios de aceptacion

- [ ] Timeline matches Figma design
- [ ] Responsive: horizontal on desktop, vertical on mobile
- [ ] All 4 languages render correctly
- [ ] Dark hero section with correct title
- [ ] Timeline steps connected visually
- [ ] Each step has title and description
