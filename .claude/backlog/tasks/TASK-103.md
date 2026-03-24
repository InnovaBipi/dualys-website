---
id: TASK-103
title: "Crear estructura de traducciones para todo el contenido nuevo (4 idiomas)"
status: done
priority: P0
type: content
phase: 0
estimate: XL
depends_on: []
briefing_ref: "Sección 8 del briefing (todas las páginas)"
files:
  - src/messages/es.json
  - src/messages/ca.json
  - src/messages/en.json
  - src/messages/fr.json
---

## Descripcion
TAREA CRÍTICA — bloquea casi todas las demás. Reestructurar los archivos de traducción JSON con todo el contenido nuevo del briefing.

El briefing proporciona copy completo en español. Los otros 3 idiomas (CA, EN, FR) necesitan traducción.

## Estructura de keys nuevas

### Nuevas top-level keys
- `homepage.context` — Sección "Por qué ahora"
- `homepage.audience` — Sección "Para quién es DUALYS" (3 cards)
- `homepage.messages` — 5 mensajes clave
- `homepage.verticals` — Resumen visual verticales
- `homepage.team` — Bloque equipo fundador
- `servicios.*` — Página de servicios
- `sectores.*` — 10 verticales de defensa
- `metodologia.*` — Programa FFD
- `nosotros.*` — Narrativa empresa + perfiles
- `recursos.*` — Blog/insights categorías

### Keys a modificar
- `hero.*` — Nuevo H1, subtítulo, CTAs
- `cta.*` — Nuevo copy CTA final
- `nav.*` — Nueva navegación
- `footer.*` — Dirección, descripción
- `metadata.*` — Nuevos títulos/descripciones SEO
- `contact.*` — Nuevos campos formulario

### Keys a deprecar (no eliminar aún)
- `capabilities.*` — Reemplazado por servicios/sectores
- `about.*` — Reemplazado por nosotros

## Copy ES del briefing (Hero)
- H1: "Tu empresa tiene lo que el sector defensa necesita. Nosotros te ayudamos a llegar hasta allí."
- Subtítulo: "DUALYS es el puente entre la capacidad industrial y tecnológica de las empresas españolas, y con énfasis inicialmente en las catalanas y los mercados duales europeos. Aceleramos tu entrada al sector defensa con criterio, metodología y red de contactos real."
- CTA1: "Solicita tu diagnóstico →"
- CTA2: "Conoce nuestra metodología →"
- Nota: "Europa ha comprometido +800.000 M€ en defensa hasta 2030. El momento de posicionarse es ahora."

## Criterios de aceptacion
- [ ] ES: Todo el copy del briefing implementado literalmente
- [ ] CA: Traducción completa y natural
- [ ] EN: Traducción completa y profesional
- [ ] FR: Traducción completa y profesional
- [ ] Nuevas keys de navegación funcionan
- [ ] Keys antiguas mantenidas (marcadas deprecated en comentarios)
- [ ] Sin strings hardcodeados en componentes
