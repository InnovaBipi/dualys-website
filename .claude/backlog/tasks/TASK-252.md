---
id: TASK-252
title: "Validacion performance Lighthouse 95+"
status: backlog
priority: P0
type: testing
phase: 15
estimate: M
depends_on:
  - TASK-232
figma_ref: ""
files: []
---

## Descripcion

Run Lighthouse on all pages. Verify LCP < 2.5s (especially with new hero images), INP < 200ms, CLS < 0.1. Optimize images if needed.

## Figma specs

N/A - Testing task.

## Criterios de aceptacion

- [ ] Lighthouse 95+ on all pages
- [ ] Core Web Vitals in green:
  - LCP < 2.5s
  - INP < 200ms
  - CLS < 0.1
- [ ] Hero images optimized for performance
- [ ] No performance regressions from redesign
