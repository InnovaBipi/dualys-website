---
id: TASK-124
title: "Crear VerticalsSection (resumen visual de 10 verticales defensa)"
status: done
priority: P1
type: feature
phase: 2
estimate: M
depends_on: [TASK-103]
briefing_ref: "Sección 6, 8.1 Sección 5 del briefing"
files:
  - src/components/sections/VerticalsSection.tsx
---

## Descripcion
Nueva sección del homepage: resumen visual de las verticales o capacidades que pueden encajar en el sector defensa (excluido armamento/munición), con icono, nombre y línea descriptiva.

## Verticales del briefing (p.9-10)
1. Vehículos (plataformas) terrestres
2. Sector naval
3. Aeronáutica militar
4. Aeroespacial y New Space
5. Comunicaciones (C4ISR)
6. Ciberdefensa y encriptación
7. Vehículos no tripulados y robótica (UAV/UGV/USV)
8. Simulación y gaming / entrenamiento
9. Sector auxiliar (protección y componentes)

## Diseño
- Grid de iconos con nombre y descripción corta
- Iconos de Lucide React (NO iconos de armas o munición)
- CTA: "Descubre en qué vertical encaja tu empresa →" → link a /sectores
- Fondo blanco o neutral-50

## Criterios de aceptacion
- [ ] 9 verticales con icono + nombre + descripción
- [ ] Sin iconos de armas/munición
- [ ] CTA link a /sectores
- [ ] Grid responsive
- [ ] 4 idiomas
