---
id: TASK-221
title: "Redisenar AudienceSection con imagen cards"
status: done
priority: P1
type: feature
phase: 12
estimate: M
depends_on:
  - TASK-200
figma_ref: "DUALYS - DISSENY > inici > A qui ens dirigim"
files:
  - src/components/sections/AudienceSection.tsx
---

## Descripcion

Update audience section with image-based cards instead of icon-only. "A qui ens dirigim" title. 3 cards for target audiences with images. Export card images from Figma.

## Figma specs

- Title: "A qui ens dirigim"
- 3 audience cards with background images
- Cards for: industriales, tech/software, primes/integradores

## Criterios de aceptacion

- [ ] Cards match Figma design
- [ ] Images optimized (WebP, lazy load)
- [ ] Responsive grid
- [ ] All 4 languages render correctly
- [ ] Card images exported from Figma and saved in public/images/
