---
name: ui-spanish
description: Spanish language and localization rules for the UI. Use when creating any user-facing text, labels, messages, or notifications.
---

# UI en Español — Reglas de Localización

## Use this skill when
- Writing any user-facing text (labels, buttons, messages, placeholders)
- Creating email templates
- Writing error or success messages

## Do not use this skill when
- Writing code comments (use English)
- Naming variables or functions (use English)

## Rules

1. **Toda la UI en español rioplatense** — Usar "vos" en lugar de "tú". Ejemplo: "Elegí tu horario" no "Elige tu horario".
2. **Código en inglés** — Variables, funciones, componentes y comentarios siempre en inglés.
3. **Formato de fecha** — `DD/MM/AAAA` y hora en formato 24h: `14:30` no `2:30 PM`.
4. **Moneda** — Pesos argentinos con formato: `$5.000` (punto como separador de miles, sin decimales).
5. **Mensajes de error amigables** — Nunca mostrar errores técnicos al usuario. Usar mensajes como "Hubo un problema, intentá de nuevo" en vez de "Internal Server Error".
6. **Botones de acción** — Usar verbos en infinitivo o imperativo voseante: "Reservar", "Cancelar", "Confirmá tu turno".
7. **Días de la semana** — En español y minúscula: lunes, martes, miércoles...
8. **Terminología consistente:**
   - Appointment → "Turno" (nunca "cita")
   - Stylist → "Estilista"
   - Booking → "Reserva"
   - Dashboard → "Panel"
   - Schedule → "Agenda"
   - No-show → "Ausencia"
9. **Placeholders** — Deben ser claros: "Ej: Juan Pérez", "Ej: 11 2345-6789".
10. **Textos de email** — Tono cálido y profesional, sin emojis.