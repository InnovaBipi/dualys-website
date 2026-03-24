---
id: TASK-150
title: "Actualizar metadata.ts (organization schema, dirección real)"
status: done
priority: P1
type: feature
phase: 5
estimate: M
depends_on: [TASK-100]
briefing_ref: "Secciones 1-4, 8.8 del briefing"
files:
  - src/lib/seo/metadata.ts
---

## Descripcion
Actualizar los schemas JSON-LD de organización con el nuevo posicionamiento, dirección real y descripción de servicios.

## Cambios
- Organization description: "consultora estratégica especializada en facilitar la entrada de empresas industriales, tecnológicas y de software en la cadena de suministro del sector defensa"
- Address: Camí Can Ametller 36 Planta Baixa, 08195 Sant Cugat del Vallès, Barcelona, España
- Email: info@dualys.eu
- knowsAbout: actualizar con verticales de defensa
- Considerar añadir ConsultingService schema

## Criterios de aceptacion
- [ ] Organization schema actualizado
- [ ] Dirección real en schema
- [ ] Descripción refleja nuevo posicionamiento
- [ ] JSON-LD válido (verificar con /seo-validate-structured)
