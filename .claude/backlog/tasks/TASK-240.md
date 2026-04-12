---
id: TASK-240
title: "Exportar imagenes del Figma"
status: done
priority: P0
type: infrastructure
phase: 14
estimate: M
depends_on: []
figma_ref: ""
files:
  - public/images/
---

## Descripcion

Use Figma API image export endpoint to download all images used in the DUALYS design. Save optimized versions in public/images/. Hero backgrounds, vertical thumbnails, audience cards. Use Next.js Image component for optimization.

## Figma specs

Images to export:
- Hero background (aerial view of industrial facility)
- Vertical thumbnail images (10 verticals)
- Audience card images (3 cards)
- Any other section-specific images from the design

## Criterios de aceptacion

- [ ] All images exported and saved in public/images/
- [ ] WebP format where possible
- [ ] Proper sizing for responsive use
- [ ] Images named descriptively and consistently
- [ ] Next.js Image component compatible
