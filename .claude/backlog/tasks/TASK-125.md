---
id: TASK-125
title: "Crear TeamTrustSection (equipo anónimo, 4 perfiles fundadores)"
status: done
priority: P1
type: feature
phase: 2
estimate: S
depends_on: [TASK-103]
briefing_ref: "Sección 8.1 Sección 6, 8.6 del briefing"
files:
  - src/components/sections/TeamTrustSection.tsx
---

## Descripcion
Bloque de confianza en el homepage con descripción de la combinación de perfiles del equipo fundador. Sin nombres, sin fotos.

## Copy ES del briefing (p.13)
"El equipo fundador de DUALYS combina perfiles que raramente se encuentran juntos: experiencia directiva en instituciones de seguridad y defensa, trayectoria política al más alto nivel con profundo conocimiento del ecosistema empresarial español y énfasis en el catalán, expertise técnico y comercial en proyectos industriales y de defensa de ámbito internacional, y capacidad para articular ecosistemas de innovación y cadenas de valor complejas. Juntos, cubrimos los cuatro ejes que requiere una transición dual-use exitosa: el conocimiento del sector, el desarrollo comercial, el acceso institucional y la capacidad ejecutiva."

## Diseño
- Bloque compacto, puede ser fondo neutral-50 o accent-50
- Texto narrativo (no cards individuales — los nombres no están)
- Referencia a 4 ejes: sector, comercial, institucional, ejecutiva
- Link "Conoce al equipo →" a /nosotros

## Criterios de aceptacion
- [ ] Copy narrativo del briefing
- [ ] Sin nombres ni fotos
- [ ] Link a /nosotros
- [ ] 4 idiomas
