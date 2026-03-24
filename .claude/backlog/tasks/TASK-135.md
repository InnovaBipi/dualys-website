---
id: TASK-135
title: "Actualizar /contact (dirección, campos nuevos formulario)"
status: done
priority: P1
type: feature
phase: 3
estimate: M
depends_on: [TASK-103]
briefing_ref: "Sección 8.8, 9 del briefing"
files:
  - src/app/[locale]/contact/page.tsx
  - src/components/forms/ContactForm.tsx
---

## Descripcion
Actualizar la página de contacto con dirección física real, nuevos campos de formulario y estrategia de conversión del briefing.

## Datos de contacto (briefing p.16)
- **Email**: info@dualys.eu
- **Dirección**: Camí Can Ametller 36 Planta Baixa, 08195 Sant Cugat del Vallès (Barcelona)

## Campos del formulario (briefing p.18)
- Nombre (text)
- Empresa (text)
- Email (email)
- Sector (dropdown: Industrial/Manufactura, Tecnología/Software, Defensa/Primes, Otro)
- Descripción del reto (textarea) — "breve descripción del reto"
- Casilla RGPD con enlace a política de privacidad

## Campos a eliminar
- "Asunto" (subject) — reemplazado por sector dropdown
- "Organización" → renombrar a "Empresa"

## Reducción de fricciones (briefing p.18)
- No pedir más datos de los necesarios
- En móvil: CTA sticky visible
- No forzar registro

## Criterios de aceptacion
- [ ] Dirección física visible
- [ ] Email visible
- [ ] Formulario con campos nuevos (sector dropdown, reto)
- [ ] Casilla RGPD con link a privacy
- [ ] Zod schema actualizado
- [ ] Responsive (CTA visible en móvil)
- [ ] 4 idiomas
