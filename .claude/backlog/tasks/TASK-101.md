---
id: TASK-101
title: "Actualizar route-registry.yaml con nueva navegación"
status: done
priority: P0
type: infrastructure
phase: 0
estimate: M
depends_on: []
briefing_ref: "Sección 7 del briefing"
files:
  - route-registry.yaml
  - cta-registry.yaml
---

## Descripcion
Redefinir la estructura de rutas del sitio según el nuevo sitemap del briefing. Actualizar registros de rutas y CTAs.

## Cambios en rutas

### Eliminar
- /capabilities (y 4 sub-rutas: defense, cybersecurity, biosecurity, dual-use)
- /about/team
- /about/partners

### Añadir
- /servicios (nuevo)
- /metodologia (nuevo)
- /recursos (renombrar desde /news)

### Modificar
- /about → /nosotros
- /sectors → /sectores
- /news → /recursos

### Nueva navegación (max 6 items)
1. Inicio
2. Servicios
3. Sectores
4. Metodología
5. Nosotros
6. Recursos / Insights
+ Contacto (como CTA button)

## Actualizar CTA registry
- CTA primario: "Solicita tu diagnóstico →" → /contact
- CTA secundario: "Habla con nosotros →" → /contact
- CTA metodología: "Conoce nuestra metodología →" → /metodologia

## Criterios de aceptacion
- [ ] route-registry.yaml refleja nueva estructura
- [ ] Idiomas corregidos a 4 (no 6)
- [ ] cta-registry.yaml con nuevos CTAs
- [ ] Sin referencias a rutas eliminadas
