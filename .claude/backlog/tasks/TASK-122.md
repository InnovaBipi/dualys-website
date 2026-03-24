---
id: TASK-122
title: "Crear AudienceSection ('Para quién es DUALYS') — 3 cards"
status: done
priority: P0
type: feature
phase: 2
estimate: M
depends_on: [TASK-103]
briefing_ref: "Sección 8.1, Sección 3 del briefing"
files:
  - src/components/sections/AudienceSection.tsx
---

## Descripcion
Nueva sección del homepage: 3 bloques visuales (cards) dirigidos a los tres perfiles de cliente, con un CTA en cada uno.

## Copy ES del briefing (p.12-13)

### Card 1: PARA INDUSTRIALES
"Fabricantes de componentes, manufactura de precisión, automoción, aeronáutica, composites, electrónica industrial."
CTA: "Ver cómo trabajamos con industriales →"

### Card 2: PARA TECNOLOGÍA Y SOFTWARE
"Empresas de IA, robótica, ciberseguridad, comunicaciones, simulación, digital twins, drones, IoT."
CTA: "Ver cómo trabajamos con empresas tech →"

### Card 3: PARA GRANDES PRIMES
"Empresas del sector defensa que necesitan ampliar su cadena de suministro con capacidad local cualificada."
CTA: "Hablemos →"

## Diseño
- Usar card-grid / card-equal patterns existentes
- Iconos para cada tipo de empresa (Lucide icons)
- Seguir patrón de CapabilitiesSection como referencia
- Brand colors: cards con borde accent o fondo neutral-50

## Criterios de aceptacion
- [ ] 3 cards con copy exacto del briefing
- [ ] CTA en cada card
- [ ] Card-grid responsive (3 cols desktop, 1 col mobile)
- [ ] 4 idiomas
- [ ] Iconos apropiados (no militaristas)
