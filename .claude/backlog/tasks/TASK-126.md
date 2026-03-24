---
id: TASK-126
title: "Reescribir CTASection (fondo oscuro, nuevo copy)"
status: done
priority: P0
type: feature
phase: 2
estimate: S
depends_on: [TASK-103]
briefing_ref: "Sección 8.1 Sección 7 del briefing"
files:
  - src/components/sections/CTASection.tsx
---

## Descripcion
Reescribir la sección CTA final del homepage con fondo oscuro y nuevo copy.

## Copy
- **Headline**: "Construir capacidades duales para la industria." (decisión tomada: usar propuesta de valor principal)
- **Subtítulo**: "En 2 sesiones te damos un diagnóstico claro, un mapa de oportunidades y un plan de acción."
- **CTA primario**: "Solicita tu diagnóstico →" → /contact
- **CTA secundario**: "Habla con nosotros →" → /contact

## Diseño
- Fondo oscuro (bg-primary-950 o bg-primary-900)
- Texto blanco
- CTAs con accent color
- Mantener Container wrapper

## Criterios de aceptacion
- [ ] Fondo oscuro implementado
- [ ] Headline y subtítulo del briefing
- [ ] 2 CTAs funcionales
- [ ] 4 idiomas
