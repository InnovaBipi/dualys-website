---
id: TASK-131
title: "Crear página /sectores (10 verticales defensa con perfiles empresa)"
status: done
priority: P0
type: page
phase: 3
estimate: L
depends_on: [TASK-103, TASK-110]
briefing_ref: "Sección 6, 8.3 del briefing"
files:
  - src/app/[locale]/sectores/page.tsx
---

## Descripcion
Página que explica en qué áreas del sector defensa puede posicionarse una empresa cliente y qué capacidades industriales o tecnológicas son transferibles. Debe hablarle directamente al visitante según su sector de origen.

## Estructura del briefing (p.13-14)
1. Introducción: mensaje sobre la dualidad civil-militar
2. Mapa visual de verticales (excluido armamento/munición)
3. Sección "De dónde vienes, a dónde puedes ir": conexiones explícitas entre sector de origen y vertical de defensa

## 9 Verticales de defensa (del briefing p.9-10)

| Vertical | Perfil empresa fit | Capacidades transferibles |
|----------|-------------------|--------------------------|
| Vehículos terrestres | Fabricantes componentes mecánicos, Tier 1/2/3 auto | Piezas estructurales, hidráulicos, electrónica embarcada |
| Naval | Construcción naval, composites, navegación | Componentes estructurales, drones superficie (USV) |
| Aeronáutica militar | Tier 1/2 aeronáutica civil (AS9100) | Sistemas control de vuelo, mantenimiento predictivo |
| Aeroespacial/New Space | Materiales ultra-ligeros, electrónica alta precisión | Nanosatélites, antenas desplegables, fibra de carbono |
| Comunicaciones (C4ISR) | Telecomunicaciones, software comunicaciones | Radios tácticas, terminales satélites, consolas de mando |
| Ciberdefensa | Software seguridad, hardware encriptación | Módulos cifrado, firewalls, análisis forense digital |
| UAV/UGV/USV | Robótica, visión artificial, IA aplicada | Plataformas UAV, robots terrestres, control autónomo |
| Simulación/Gaming | Software simulación, VR/AR, digital twins | Simuladores de vuelo, formación VR/AR, motores 3D |
| Sector auxiliar | Textil técnico, mecanizado CNC, plásticos | Textil ignífugo, protección, estructuras blindadas |

## Criterios de aceptacion
- [ ] 9 verticales con icono + descripción + perfil empresa + capacidades
- [ ] Sin referencias a armamento/munición
- [ ] Sección "de dónde vienes → a dónde puedes ir"
- [ ] CTA por vertical o general
- [ ] SEO metadata + JSON-LD
- [ ] 4 idiomas
