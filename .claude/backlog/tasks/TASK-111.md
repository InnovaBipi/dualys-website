---
id: TASK-111
title: "Reescribir Footer.tsx (dirección real, quitar trust falsos)"
status: done
priority: P1
type: feature
phase: 1
estimate: M
depends_on: [TASK-103]
briefing_ref: "Sección 8.8, 10 del briefing"
files:
  - src/components/layout/Footer.tsx
---

## Descripcion
Actualizar el footer con información real y eliminar claims de trust no verificados.

## Cambios requeridos
1. **Eliminar trust signals falsos**: "EU Security Standards", "ISO 27001", "NATO Compatible" — no están verificados (briefing p.19)
2. **Añadir dirección real**: Camí Can Ametller 36 Planta Baixa, 08195 Sant Cugat del Vallès (Barcelona)
3. **Añadir email real**: info@dualys.eu
4. **Actualizar descripción**: Cambiar "Protegiendo la democracia con tecnologías de disuasión dual" por nueva propuesta de valor
5. **Actualizar quick links**: Reflejar nueva navegación (Servicios, Sectores, Metodología, Nosotros, Recursos)
6. **Actualizar legal links**: Mantener Privacy, Terms, Cookies

## Criterios de aceptacion
- [ ] Sin trust signals inventados
- [ ] Dirección física presente
- [ ] Email info@dualys.eu presente
- [ ] Quick links reflejan nueva navegación
- [ ] Descripción actualizada con nuevo posicionamiento
- [ ] Funciona en 4 idiomas
