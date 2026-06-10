# Brievify

> **Brief it. Build it. Sell it.**

El **v0 para tiendas Shopify**: un builder de e-commerce que funciona por chat en lenguaje natural. Describís lo que querés, Brievify construye la página con secciones de alta conversión, y el resultado se muestra en un **live preview en tiempo real** al lado del chat. Sin código, sin diseñador, sin consultor CRO.

## Stack

- **Next.js 15** (App Router) + TypeScript estricto
- **Tailwind CSS v4** — tokens 100% en CSS via `@theme inline` (sin `tailwind.config.ts`)
- **Clerk** — auth (pendiente de conectar)
- **Supabase** — Postgres + RLS + Storage (schema en `supabase/schema.sql`)
- **Anthropic API** — chat con Claude, tool use + streaming (tools en `src/lib/ai/tools.ts`)
- **Shopify Admin API** — OAuth + Themes API (pendiente de conectar)
- **Mercado Pago** — suscripciones (pendiente)
- **Vercel** — deploy

## Estado actual (v0.1)

Cubre los pasos 1, 2, 6 y 7 del plan de implementación del proyecto:

- ✅ Setup: Next 15 + Tailwind v4 con el design system de Brievify
- ✅ Landing page completa (hero con floating elements, problem, how it works, features bento, pricing, FAQ, CTA final, footer)
- ✅ Dashboard shell: sidebar + split screen chat (40%) / live preview (60%)
- ✅ Chat con Claude (claude-sonnet-4-6): streaming, tools build_section / update_section / reorder_sections / build_full_page
- ✅ Librería de 12 secciones CRO (`src/lib/sections/library.ts`) + renderer JSON → HTML (`renderer.ts`)
- ✅ Integración real de Claude (Fase 8): route handler con streaming + tool use, el chat construye en el preview en tiempo real
- ⏳ Clerk, Supabase, Shopify OAuth, Mercado Pago

## Desarrollo

Para que el chat construya de verdad, configurá `ANTHROPIC_API_KEY` en `.env.local`.

```bash
npm install
cp .env.example .env.local   # completar las keys
npm run dev
```

- Landing: `http://localhost:3000`
- Builder (mock): `http://localhost:3000/dashboard`

## Estructura

```
src/
  app/
    (marketing)/    # Landing
    (app)/          # Dashboard, onboarding, brand kit, páginas
  components/
    ui/ brand/ chat/ builder/ layout/ landing/
  lib/
    ai/             # tools.ts, system-prompt.ts, client.ts
    sections/       # library.ts (12 secciones CRO), renderer.ts
    shopify/ supabase/
  hooks/            # useBuilder (chat con streaming + estado del preview)
  types/
supabase/schema.sql     # Schema de la base de datos
```

## Regla de oro

**Ningún cambio se aplica a la tienda real sin que el usuario vea el live preview y apruebe explícitamente con el botón "Publicar".** Claude siempre construye y propone — nunca publica directamente.
