---
id: TASK-171
title: "Tracking de conversión"
status: done
priority: P2
type: feature
phase: 7
estimate: S
depends_on: [TASK-170]
briefing_ref: "Sección 2.2 del briefing"
files:
  - src/app/api/contact/route.ts
---

## Descripcion
Implementar tracking de conversiones para medir KPIs del briefing.

## KPIs del briefing (p.3)
- Leads generados / mes
- Tasa de conversión web (visitas → lead): objetivo >2% en 6 meses
- Tráfico orgánico: objetivo >500/mes en 12 meses
- Tasa de rebote: objetivo <55%
- Tiempo en página: objetivo >2 min en páginas clave

## Criterios de aceptacion
- [ ] Evento de conversión en form submit
- [ ] Analytics preparado (Google Analytics o similar)
- [ ] Métricas básicas configuradas
