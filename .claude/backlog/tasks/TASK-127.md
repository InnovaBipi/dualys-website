---
id: TASK-127
title: "Ensamblar homepage con 7 secciones"
status: done
priority: P0
type: feature
phase: 2
estimate: S
depends_on: [TASK-120, TASK-121, TASK-122, TASK-123, TASK-124, TASK-125, TASK-126]
briefing_ref: "Sección 8.1 del briefing"
files:
  - src/app/[locale]/page.tsx
---

## Descripcion
Actualizar la homepage para montar las 7 secciones en orden, reemplazando las 4 secciones actuales.

## Orden de secciones
1. HeroSection (reescrito)
2. ContextSection (nuevo)
3. AudienceSection (nuevo)
4. KeyMessagesSection (nuevo)
5. VerticalsSection (nuevo)
6. TeamTrustSection (nuevo)
7. CTASection (reescrito)

## Secciones a eliminar del homepage
- CapabilitiesSection (reemplazada por AudienceSection + VerticalsSection)
- AboutSection (reemplazada por TeamTrustSection)

## Criterios de aceptacion
- [ ] 7 secciones renderizan en orden correcto
- [ ] Imports actualizados (eliminar CapabilitiesSection, AboutSection)
- [ ] JSON-LD schemas actualizados (organization description)
- [ ] Scroll flow natural entre secciones
- [ ] Performance mantenida (LCP < 2.5s)
