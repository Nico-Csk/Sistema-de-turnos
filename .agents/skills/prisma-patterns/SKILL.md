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