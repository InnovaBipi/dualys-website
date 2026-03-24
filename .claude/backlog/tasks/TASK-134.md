---
id: TASK-134
title: "Crear página /recursos (blog con categorías)"
status: backlog
priority: P2
type: page
phase: 3
estimate: M
depends_on: [TASK-103, TASK-110]
briefing_ref: "Sección 8.7 del briefing"
files:
  - src/app/[locale]/recursos/page.tsx
---

## Descripcion
Renombrar y reestructurar la página de News como Recursos/Insights con categorías de contenido definidas por el briefing.

## Categorías del briefing (p.16)
1. **Análisis de mercado**: contexto europeo y español de inversión en defensa, programas y oportunidades por sector
2. **Guías y tutoriales**: "¿Qué es el RID?", "¿Qué certifica PECAL/AQAP?", "¿Qué es el EN9100?", "Qué son los export controls"
3. **Casos de transición dual-use**: ejemplos europeos de empresas que han transicionado
4. **Opinión y tendencias**: artículos de análisis firmados por el equipo fundador

## Nota del briefing
"Se recomienda publicar al menos 5-8 artículos base antes de salir en vivo."

## Criterios de aceptacion
- [ ] Página en /[locale]/recursos
- [ ] Categorías filtrable
- [ ] Empty state profesional (sin artículos aún)
- [ ] Redirect de /news → /recursos
- [ ] SEO metadata
- [ ] 4 idiomas
