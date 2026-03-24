---
id: TASK-121
title: "Crear ContextSection ('Por qué ahora') — datos mercado defensa"
status: done
priority: P0
type: feature
phase: 2
estimate: M
depends_on: [TASK-103]
briefing_ref: "Sección 8.1, Sección 2 del briefing"
files:
  - src/components/sections/ContextSection.tsx
---

## Descripcion
Nueva sección del homepage: bloque narrativo corto (3-4 párrafos) con datos del mercado europeo y español de defensa. Mensaje: la inversión es real, la decisión estratégica está tomada, y quien no se posicione ahora quedará fuera.

## Copy ES del briefing (p.12)
"Europa vive una transformación estructural en materia de defensa. El Readiness Europe 2030 moviliza hasta 800.000 millones de euros en compras y proyectos orientados a reforzar la Base Tecnológica e Industrial de Defensa Europea (BTID). En España, el Plan Industrial de Seguridad y Defensa ya está activo con 44.000 millones de euros de dotación para los próximos años y la política de alcanzar y mantener el 2% del PIB en inversión defensiva.

España dispone de un ecosistema industrial y tecnológico de primer nivel: empresas líderes en automoción, aeronáutica, composites, electrónica, inteligencia artificial, robótica y ciberseguridad. Capacidades que el sector defensa necesita, ahora mismo, para construir cadenas de suministro más resilientes y de origen europeo.

El problema no es la falta de potencial. La mayoría de pymes y empresas tecnológicas catalanas no conocen los mecanismos de entrada, las certificaciones necesarias ni los circuitos del mercado de defensa. Eso es exactamente lo que DUALYS resuelve."

## Diseño
- Fondo blanco, texto negro (seguir distribución cromática 40/40/20)
- Cifras destacadas visualmente (800.000M€, 44.000M€, 2% PIB)
- Puede incluir datos en formato card/badge para impacto visual
- Container estándar, mismo patrón que AboutSection

## Criterios de aceptacion
- [ ] 3 párrafos narrativos del briefing
- [ ] Cifras destacadas visualmente
- [ ] Responsive
- [ ] 4 idiomas
- [ ] Animación fade-in al scroll
