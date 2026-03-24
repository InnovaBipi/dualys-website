---
id: TASK-170
title: "Implementar API route de contacto"
status: done
priority: P1
type: feature
phase: 7
estimate: L
depends_on: [TASK-135]
briefing_ref: "Sección 9 del briefing"
files:
  - src/app/api/contact/route.ts
---

## Descripcion
Crear API route handler para procesar el formulario de contacto con los nuevos campos.

## Requisitos
- Server-side Zod validation (nombre, empresa, email, sector, reto)
- Enviar email a info@dualys.eu
- Email de confirmación al usuario
- Rate limiting
- CSRF protection
- Honeypot field para spam

## Flujo de conversión (briefing p.18)
1. Captación: visitante llega por SEO/referral
2. Cualificación: formulario recoge datos + email confirmación automático
3. Contacto: equipo DUALYS contacta en 48h

## Criterios de aceptacion
- [ ] API route funcional
- [ ] Validación server-side
- [ ] Email enviado correctamente
- [ ] Rate limiting activo
- [ ] Honeypot anti-spam
- [ ] Respuesta JSON con status
