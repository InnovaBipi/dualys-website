---
id: TASK-110
title: "Reescribir Header.tsx con nueva navegación (6 items)"
status: done
priority: P0
type: feature
phase: 1
estimate: L
depends_on: [TASK-103]
briefing_ref: "Sección 7.1 del briefing"
files:
  - src/components/layout/Header.tsx
---

## Descripcion
Reestructurar la navegación principal del header según el briefing. Máximo 6 items + Contacto como CTA button.

## Nueva navegación
1. **Inicio** → /
2. **Servicios** → /servicios (puede tener dropdown)
3. **Sectores** → /sectores
4. **Metodología** → /metodologia
5. **Nosotros** → /nosotros
6. **Recursos** → /recursos
+ **Solicita tu diagnóstico →** (CTA button) → /contact

## Detalles técnicos
- Mantener light header theme (fondo blanco, logo negro)
- Mantener sticky behavior
- Actualizar mobile menu con mismos items
- Language switcher se mantiene
- Usar translation keys de `nav.*`

## Criterios de aceptacion
- [ ] 6 items de navegación + CTA button
- [ ] Funciona en 4 idiomas
- [ ] Mobile menu actualizado
- [ ] Links apuntan a rutas correctas
- [ ] CTA button dice "Solicita tu diagnóstico" (no "Contáctenos")
- [ ] Dropdown en Servicios si aplica
