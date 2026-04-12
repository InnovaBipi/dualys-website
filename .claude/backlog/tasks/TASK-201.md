---
id: TASK-201
title: "Actualizar brand-color-validator con nuevos hex"
status: done
priority: P0
type: infrastructure
phase: 10
estimate: S
depends_on:
  - TASK-200
figma_ref: ""
files:
  - .claude/hooks/brand-color-validator.js
  - .claude/skills/brand-guidelines/SKILL.md
---

## Descripcion

Update the brand color validator hook to accept the new blue-tinted neutral hex values and updated accent shades. Update the brand guidelines skill document.

## Figma specs

N/A - This task updates tooling to match the new Figma color tokens defined in TASK-200.

## Criterios de aceptacion

- [ ] Validator does not flag new Figma colors
- [ ] Old pure gray hex still flagged
- [ ] Brand guidelines skill updated with new color values
- [ ] Hook correctly validates all new accent and neutral shades
