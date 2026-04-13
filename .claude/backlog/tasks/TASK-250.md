---
id: TASK-250
title: "Validacion SEO completa post-redesign"
status: done
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

Run full SEO validation suite. Verify no URLs changed. All meta tags, hreflang, JSON-LD schemas intact. Run /seo-validate-meta, /seo-validate-hreflang, /seo-validate-structured.

## Figma specs

N/A - Testing task.

## Criterios de aceptacion

- [ ] All SEO validators pass (/seo-validate-meta, /seo-validate-hreflang, /seo-validate-structured)
- [ ] No ranking-impacting changes
- [ ] All URLs remain unchanged
- [ ] Meta tags present and correct for all pages
- [ ] hreflang tags correct for all 4 languages
- [ ] JSON-LD schemas valid
