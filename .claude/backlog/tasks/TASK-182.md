---
id: TASK-182
title: "Auditoría de validación de marca"
status: backlog
priority: P2
type: testing
phase: 8
estimate: S
depends_on: []
briefing_ref: ""
files: []
---

## Descripcion
Ejecutar /audit completo para verificar que todos los nuevos componentes cumplen con las brand guidelines.

## Verificaciones
- Brand color validator no detecta violaciones
- Todos los nuevos componentes usan primary-*, accent-*, neutral-*
- No hay hex hardcodeados no permitidos
- Distribución cromática 40/40/20 respetada visualmente

## Criterios de aceptacion
- [ ] /audit ejecutado sin errores
- [ ] Sin brand color violations
- [ ] Todos los componentes nuevos verificados
