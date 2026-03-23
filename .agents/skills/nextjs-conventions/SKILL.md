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