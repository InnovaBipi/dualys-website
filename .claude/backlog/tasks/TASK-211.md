---
id: TASK-211
title: "Actualizar Header segun Figma"
status: done
priority: P1
type: feature
phase: 11
estimate: M
depends_on:
  - TASK-200
  - TASK-202
figma_ref: "DUALYS > inici header area"
files:
  - src/components/layout/Header.tsx
---

## Descripcion

Update header navigation and styling to match Figma. Visible nav items: Inici, Sectors, Metodologia, Recursos + language switcher + CTA button. Check if mobile menu needs updates.

## Figma specs

Nav items:
- Inici, Sectors, Metodologia, Recursos
- Language switcher
- CTA button (uses new Button component from TASK-202)

## Criterios de aceptacion

- [ ] Header matches Figma
- [ ] Mobile menu works
- [ ] All nav links functional
- [ ] Language switcher present and working
- [ ] CTA button styled per new Button component
- [ ] All 4 languages render correctly
