# Architecture

## Stack

| Layer       | Technology                          | Role                                          |
|-------------|-------------------------------------|-----------------------------------------------|
| Framework   | Next.js 15 (App Router, TypeScript) | Routing, SSR shell, API routes                |
| UI          | Tailwind CSS 4 + custom components  | Styling; no external component library        |
| Auth        | Supabase (anon + email)             | Anonymous sessions; account deletion endpoint |
| Sync        | Appwrite (stubs in src/lib/sync.ts) | Secondary sync target; not yet in production  |
| Chart math  | astronomy-engine                    | Local, offline natal + transit calculation    |
| Ephemeris   | sweph                               | Swiss Ephemeris bindings for precision data   |
| 3D          | React Three Fiber + Drei            | Orrery and cosmic visualization pages         |
| Animation   | Framer Motion                       | Transition and gesture animations             |
| Analytics   | PostHog + Sentry                    | Usage events and error tracking               |

## System Boundaries

- `src/app/` — Next.js App Router pages and API routes
- `src/app/(app)/` — Authenticated app shell (top bar + sidebar nav)
- `src/components/` — Shared UI components (Card, Chip, Headline, Body, etc.)
- `src/lib/` — Business logic: chart calculation, transits, events, sync, traits, cosmic stamp
- `src/content/` — Static content data: spheres, placements, fixed stars, courses
- `src/i18n/` — Localisation strings (`ar.ts` is the source of truth for all displayed text)

## Storage Model

- **localStorage (primary)**: chart data, birth data, events, calibration state,
  resonance votes, preferences. This is the live source of truth for all user data.
- **Supabase (sync mirror)**: events, traits, journey, calibrations, transit
  feedback, preferences, votes — synced on reconnect via `src/lib/sync.ts`.
- **Appwrite (secondary sync)**: stubs implemented; not active in production.

## Auth and Access Model

- Every user gets an anonymous Supabase session on first load.
- The user can optionally upgrade to email auth in Settings.
- Account deletion is handled by a Supabase edge function that clears all
  user rows and deletes the auth account.
- No server ever receives natal chart data — calculation is 100% local.

## Invariants

1. Chart calculation is always local — `astronomy-engine` runs client-side,
   never in an API route.
2. `localStorage` is the source of truth. Supabase and Appwrite are sync
   mirrors; never block on them.
3. All displayed text must have an entry in `src/i18n/ar.ts` before use.
4. No predictive language. Voice is always observational — "Mars is..." not
   "You will...".
5. Today's transit cards are calculated live against the user's natal chart —
   never hardcoded or static.
