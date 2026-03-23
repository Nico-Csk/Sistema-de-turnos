---
name: booking-logic
description: Business rules for the appointment booking system. Use when implementing scheduling, availability calculation, or appointment management logic.
---

# Booking Logic — Reglas de Negocio

## Use this skill when
- Calculating available time slots
- Creating, modifying, or cancelling appointments
- Implementing the booking wizard
- Building the admin agenda view

## Do not use this skill when
- Working on static pages or styling

## Business Rules

1. **Horario por defecto:**
   - Lunes a Viernes: 09:00 – 19:00
   - Sábado: 09:00 – 14:00
   - Domingo: CERRADO
   - Cada estilista puede tener horarios personalizados que sobreescriben estos.

2. **Buffer entre turnos:** 10 minutos entre cada turno (configurable en Settings).

3. **Cálculo de disponibilidad:**
   - Slot disponible = horario del estilista - turnos confirmados existentes - buffer - días cerrados
   - Un slot solo se muestra si queda tiempo suficiente para el servicio + buffer antes del cierre.
   - Si el cliente elige "Sin preferencia" de estilista, mostrar la unión de slots de todos los estilistas activos.

4. **Reserva sin solapamiento:**
   - Antes de confirmar un turno, verificar atómicamente que el slot sigue libre (race condition).
   - Usar transacción de Prisma: verificar disponibilidad + crear turno en una sola operación.

5. **Estados del turno:**
   - `confirmed` → estado inicial al reservar
   - `completed` → el admin lo marca cuando terminó el servicio
   - `cancelled` → el admin cancela (no se elimina, se marca)
   - `no_show` → el admin marca si el cliente no se presentó

6. **Restricciones de reserva:**
   - No se puede reservar en el pasado.
   - No se puede reservar con menos de 1 hora de anticipación.
   - No se puede reservar a más de 30 días en el futuro.
   - Un mismo número de teléfono no puede tener más de 2 turnos activos simultáneamente.

7. **Cancelación:**
   - Solo desde el panel admin.
   - Un turno cancelado libera el slot para nuevas reservas.

8. **WhatsApp link:**
   - Formato: `https://wa.me/54XXXXXXXXXX?text=MENSAJE_ENCODED`
   - Limpiar el número de teléfono: quitar espacios, guiones, paréntesis. Si empieza con 0, reemplazar por 54. Si empieza con 15, anteponer 549.