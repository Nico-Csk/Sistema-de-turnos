# Guía Completa: Setup de Proyecto en Antigravity para Sistema de Peluquería

> Este documento contiene TODO lo que necesitás para configurar Antigravity de forma profesional antes de empezar. Seguí los pasos en orden.

---

## Paso 1 — Crear la estructura del proyecto

Abrí una terminal y ejecutá:

```bash
mkdir salon-booking && cd salon-booking
git init
mkdir -p .agents/skills/nextjs-conventions
mkdir -p .agents/skills/prisma-patterns
mkdir -p .agents/skills/ui-spanish
mkdir -p .agents/skills/booking-logic
```

---

## Paso 2 — Instalar Skills de la comunidad (recomendadas)

Estas skills enseñan al agente las mejores prácticas de las tecnologías que vas a usar:

```bash
# Next.js App Router best practices
npx @rmyndharis/antigravity-skills install nextjs-app-router-patterns

# TypeScript strict patterns
npx @rmyndharis/antigravity-skills install typescript-pro

# General code quality
npx @rmyndharis/antigravity-skills install code-review
```

---

## Paso 3 — Crear Skills personalizadas del proyecto

Creá los siguientes archivos dentro de tu proyecto:

### Skill 1: Convenciones Next.js del proyecto

**Archivo:** `.agents/skills/nextjs-conventions/SKILL.md`

```markdown
---
name: nextjs-conventions
description: Enforce project-specific Next.js conventions. Use when creating pages, components, API routes, or layouts for this salon booking app.
---

# Next.js Project Conventions

## Use this skill when
- Creating new pages, layouts, or components
- Setting up API routes
- Organizing imports or file structure

## Do not use this skill when
- Working on database schema or migrations
- Writing pure utility functions with no Next.js dependency

## Rules

1. **App Router only** — Never use Pages Router patterns.
2. **Server Components by default** — Only add 'use client' when the component needs useState, useEffect, or event handlers.
3. **File naming** — Use kebab-case for files (e.g., `booking-wizard.tsx`), PascalCase for component exports.
4. **Route groups** — Use `(public)` for client-facing pages and `(admin)` for the dashboard.
5. **API routes** — Place under `app/api/` following RESTful conventions: `app/api/appointments/route.ts` for collection, `app/api/appointments/[id]/route.ts` for single resource.
6. **Error handling** — Every page must have a companion `error.tsx` and every async page a `loading.tsx`.
7. **Metadata** — Export metadata from every page.tsx for SEO.
8. **Imports order** — React/Next → third-party → local components → local utils → types.
9. **Server Actions** — Prefer Server Actions over API routes for form submissions in the admin panel.
10. **Timezone** — All date operations must use `America/Argentina/Buenos_Aires`. Never use local browser time for storing appointments.
```

### Skill 2: Patrones de Prisma

**Archivo:** `.agents/skills/prisma-patterns/SKILL.md`

```markdown
---
name: prisma-patterns
description: Prisma ORM conventions for the salon database. Use when creating or modifying models, writing queries, or setting up seeds.
---

# Prisma Patterns for Salon Booking

## Use this skill when
- Defining or modifying database models
- Writing Prisma queries in API routes or Server Actions
- Creating seed data

## Do not use this skill when
- Working on frontend-only components

## Rules

1. **IDs** — Use `cuid()` for all primary keys.
2. **Timestamps** — Every model must include `createdAt DateTime @default(now())` and `updatedAt DateTime @updatedAt`.
3. **Soft delete** — Use `active Boolean @default(true)` instead of hard deletes for Stylists and Services.
4. **Enums as strings** — Store appointment status as String, not enum, for flexibility: "confirmed", "completed", "cancelled", "no_show".
5. **Relations** — Always define both sides of a relation explicitly.
6. **Indexes** — Add `@@index` on frequently queried fields: `Appointment.date`, `Appointment.stylistId`, `Appointment.status`.
7. **Validation** — Never trust client data. Validate with Zod before any Prisma operation.
8. **Transactions** — Use `prisma.$transaction()` when creating an appointment (check availability + create atomically).
9. **Query optimization** — Always use `select` or `include` to fetch only needed fields. Never use `findMany()` without a `where` clause in production code.
10. **Seed script** — Must be idempotent (use `upsert` instead of `create`).
```

### Skill 3: Interfaz en Español

**Archivo:** `.agents/skills/ui-spanish/SKILL.md`

```markdown
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
```

### Skill 4: Lógica de Reservas

**Archivo:** `.agents/skills/booking-logic/SKILL.md`

```markdown
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
```

---

## Paso 4 — Crear archivo de reglas del agente

**Archivo:** `.agents/settings.json`

```json
{
  "agentMode": "auto",
  "defaultModel": "gemini-3-pro",
  "codeStyle": {
    "language": "typescript",
    "formatter": "prettier",
    "linter": "eslint"
  }
}
```

---

## Paso 5 — El Prompt Principal

Abrí Antigravity en **Planning Mode**, y pegá este prompt:

---

```
Necesito que crees un sistema web completo de gestión de turnos para una peluquería argentina. El sistema tiene dos caras: una página pública de reservas para los clientes y un panel de administración para el equipo (2-3 estilistas).

Antes de empezar, leé las skills del proyecto en .agents/skills/ para entender las convenciones, reglas de negocio y patrones que debés seguir estrictamente.

STACK TECNOLÓGICO:
- Next.js 14+ (App Router, Server Components por defecto)
- TypeScript strict
- PostgreSQL + Prisma ORM
- NextAuth.js (email/password para admin)
- Tailwind CSS + shadcn/ui
- Zod para validación
- Sonner para notificaciones toast
- date-fns con locale es para fechas
- Resend para emails transaccionales
- Zona horaria: America/Argentina/Buenos_Aires
- Idioma de la UI: Español rioplatense

MÓDULO 1 — PÁGINA PÚBLICA DE RESERVAS:

Wizard de reserva en 4 pasos:
1. Elegir servicio (lista con nombre, duración y precio)
2. Elegir estilista (o "Sin preferencia")
3. Elegir fecha y hora (calendario visual, solo slots disponibles)
4. Datos del cliente (nombre, teléfono/WhatsApp, email opcional, notas)

Servicios iniciales (configurables desde admin):
- Corte caballero (30 min — $5.000)
- Corte dama (45 min — $7.000)
- Corte infantil (20 min — $3.500)
- Barba (20 min — $2.500)
- Corte + Barba (45 min — $6.500)

Tras confirmar: pantalla de éxito con resumen + opción de agregar a Google Calendar (.ics).

Diseño: moderno, mobile-first, paleta oscura con acentos dorados/cobrizos. Hero section con nombre de la peluquería y CTA.

MÓDULO 2 — PANEL ADMIN (protegido con login):

Dashboard:
- Turnos del día en timeline visual
- Contadores: hoy, semana, mes
- Próximo turno con countdown
- Ingresos estimados día/semana/mes

Agenda:
- Vistas diaria, semanal, mensual
- Filtro por estilista
- Click en slot vacío = crear turno manual
- Click en turno = ver/editar/cancelar/completar/marcar ausencia
- Drag & drop para reprogramar
- Colores por estado: confirmado (azul), completado (verde), cancelado (rojo), ausencia (gris)

CRUD de Servicios: nombre, duración, precio, activo/inactivo
CRUD de Estilistas: nombre, email, teléfono, horario semanal, foto

Reportes:
- Gráfico turnos por período (recharts)
- Gráfico ingresos por período
- Servicio más pedido
- Estilista con más turnos
- Tasa de cancelación y ausencias
- Filtro por fechas + exportar CSV

Configuración:
- Nombre del salón
- Horarios generales
- Días feriados/cierre extraordinario
- Buffer entre turnos (default 10 min)

MÓDULO 3 — NOTIFICACIONES:

- Email de confirmación al reservar (con resumen)
- Email de recordatorio 24h antes
- Botón WhatsApp en cada turno del admin con mensaje pre-armado

MODELO DE DATOS (usar como base en schema.prisma):

model Stylist {
  id        String   @id @default(cuid())
  name      String
  email     String?
  phone     String?
  photoUrl  String?
  active    Boolean  @default(true)
  schedule  Json
  appointments Appointment[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Service {
  id        String   @id @default(cuid())
  name      String
  duration  Int
  price     Float
  active    Boolean  @default(true)
  appointments Appointment[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Appointment {
  id          String   @id @default(cuid())
  date        DateTime
  endTime     DateTime
  status      String   @default("confirmed")
  clientName  String
  clientPhone String
  clientEmail String?
  notes       String?
  stylist     Stylist  @relation(fields: [stylistId], references: [id])
  stylistId   String
  service     Service  @relation(fields: [serviceId], references: [id])
  serviceId   String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([date])
  @@index([stylistId])
  @@index([status])
}

model ClosedDay {
  id     String   @id @default(cuid())
  date   DateTime @unique
  reason String?
}

model Settings {
  id              String @id @default("main")
  salonName       String @default("Tu Peluquería")
  bufferMinutes   Int    @default(10)
  defaultSchedule Json
}

ESTRUCTURA DE CARPETAS:
/app
  /(public)/page.tsx, /reservar/page.tsx, /confirmacion/page.tsx
  /(admin)/admin/page.tsx, agenda, servicios, estilistas, reportes, config, login
/components/ui, /booking, /admin
/lib/db.ts, auth.ts, email.ts, whatsapp.ts, availability.ts, utils.ts
/prisma/schema.prisma, seed.ts

ORDEN DE IMPLEMENTACIÓN:
1. Schema Prisma + seed + conexión DB
2. Página pública de reservas (flujo completo)
3. Panel admin: agenda + dashboard
4. CRUD servicios y estilistas
5. Reportes y métricas
6. Emails + WhatsApp links
7. Pulido UI + loading states + error handling

SEED DATA:
- 3 estilistas con horarios variados
- 5 servicios activos
- 15 turnos de ejemplo (pasados, hoy y futuros, varios estados)
- Settings iniciales

REQUISITOS EXTRA:
- README.md completo con instrucciones de instalación
- .env.example con todas las variables documentadas
- Validación Zod en todos los formularios y API routes
- Loading skeletons en todas las páginas async
- Responsive: mobile-first, funcional en 375px+
- SEO básico en páginas públicas
- Todos los componentes con TypeScript strict (no any)
```

---

## Paso 6 — Tips para trabajar con el agente

1. **Revisá el plan:** Antigravity va a generar un Implementation Plan y un Task List. Leelos antes de aprobar.

2. **Pedí que testee:** Después de cada módulo, decile: "Levantá la app en el browser y verificá que funcione."

3. **Iterá por módulo:** Si algo no te gusta, dejá un comentario en el artefacto. No rehagas todo.

4. **Guardá progreso:** Pedile que haga commits después de cada módulo: "Hacé un commit con el módulo de reservas completado."

5. **Si se traba:** Decile exactamente qué error ves. Copiá el error del terminal o del browser.

---

## Resumen de archivos a crear

| Archivo | Propósito |
|---------|-----------|
| `.agents/skills/nextjs-conventions/SKILL.md` | Convenciones Next.js del proyecto |
| `.agents/skills/prisma-patterns/SKILL.md` | Patrones de base de datos |
| `.agents/skills/ui-spanish/SKILL.md` | Reglas de localización al español |
| `.agents/skills/booking-logic/SKILL.md` | Reglas de negocio de turnos |
| `.agents/settings.json` | Configuración del agente |

Estas 4 skills cubren los pilares del proyecto: arquitectura, datos, idioma y negocio. El agente las va a cargar automáticamente cuando detecte que son relevantes para la tarea que le pediste.
