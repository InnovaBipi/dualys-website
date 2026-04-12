---
id: TASK-202
title: "Reescribir Button component con sistema Figma"
status: done
priority: P0
type: feature
phase: 10
estimate: L
depends_on:
  - TASK-200
figma_ref: "DUALYS > button component set (node 7038:53671)"
files:
  - src/components/ui/button.tsx
---

## Descripcion

Rewrite the button component to match the Figma design system. Currently has 7 CVA variants. New system: 4 types (primary/secondary/tertiary/ghost) x 2 sizes (sm/md) x 2 modes (light/dark) with icon support.

## Figma specs

Primary:
- bg #4F61E7, text #FFFFFF, radius 8px

Secondary:
- border #4F61E7, text #4F61E7, transparent bg

Tertiary:
- no border, text #4F61E7

Ghost:
- text #555D78 (neutral07)

Sizes:
- sm: h33, font 14px Inter 500, padding 12px
- md: h39, font 16px Inter 500, padding 16px

States:
- Hover/pressed/disabled states for each variant

## Criterios de aceptacion

- [ ] All button usages across the site work with new variants
- [ ] No TypeScript errors
- [ ] Visual match with Figma
- [ ] 4 types: primary, secondary, tertiary, ghost
- [ ] 2 sizes: sm, md
- [ ] 2 modes: light, dark
- [ ] Icon support (left/right)
- [ ] Hover, pressed, and disabled states implemented
