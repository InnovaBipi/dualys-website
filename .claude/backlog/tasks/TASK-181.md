---
id: TASK-181
title: "Eliminar translation keys y componentes deprecados"
status: backlog
priority: P2
type: refactor
phase: 8
estimate: M
depends_on: [TASK-140, TASK-141]
briefing_ref: ""
files:
  - src/messages/es.json
  - src/messages/ca.json
  - src/messages/en.json
  - src/messages/fr.json
  - src/components/sections/CapabilitiesSection.tsx
  - src/components/sections/AboutSection.tsx
  - src/components/content/CapabilityCard.tsx
---

## Descripcion
Limpieza final: eliminar translation keys antiguas y componentes que ya no se usan.

## Keys a eliminar
- capabilities.* (reemplazado por servicios/sectores)
- about.mission, about.vision, about.values (reemplazado por nosotros)

## Componentes a evaluar
- CapabilitiesSection.tsx — ¿se reusa en algún sitio?
- AboutSection.tsx — ¿se reusa?
- CapabilityCard.tsx — ¿se reusa?

## Criterios de aceptacion
- [ ] Keys antiguas eliminadas
- [ ] Componentes no usados eliminados
- [ ] Build pasa sin errores
- [ ] No hay imports rotos
