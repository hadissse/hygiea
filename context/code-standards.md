# Code Standards

## General

- Keep modules small and single-purpose.
- Fix root causes — do not layer workarounds.
- Do not mix unrelated concerns in one component or route.
- No comments unless the WHY is non-obvious. No docstrings.
- No feature flags or backward-compat shims — just change the code.

## TypeScript

- Strict mode throughout.
- Avoid `any`. Use explicit interfaces or narrowly scoped types.
- Validate unknown external input (localStorage reads, API responses)
  at the boundary before trusting it. Wrap in try/catch.

## Next.js

- Default to `'use client'` for all app-shell pages — they all read
  from localStorage which requires the browser.
- API routes live in `src/app/api/` and handle a single responsibility.
- Do not do chart calculation in API routes. It must run client-side.

## Styling

- Use Tailwind tokens for structural elements. Hardcoded hex is acceptable
  inside data-driven visual components (chart wheel, planet cards, timeline).
- Follow the border-radius scale from ui-context.md.
- No inline `style={{ color: 'red' }}` for structural chrome — use tokens.

## localStorage

- All localStorage access must be inside `useEffect`. Never access it at
  module level or during render.
- Use `STORAGE_KEYS` from `src/lib/storageKeys.ts` — never hardcode key strings.
- Wrap every `JSON.parse` from localStorage in try/catch.

## Chart & Transits

- Chart calculation always happens client-side via astronomy-engine.
- `src/lib/chartCalculator.ts` is the single source of truth for natal data.
- `src/lib/transits.ts` calculates current transits against the natal chart.
- Never send raw birth data to an API route.

## Content

- Sphere data lives in `src/content/spheres.ts`.
- Placement content (planet-in-sign, sign-in-house readings) lives in
  `src/content/placements.ts`.
- Fixed star data in `src/content/fixedStars.ts`.
- Static content is never fetched at runtime — it is imported directly.

## File Organization

- `src/app/` — pages and API routes only; no business logic
- `src/lib/` — all business logic (chart, transits, events, traits, sync)
- `src/content/` — static data (spheres, placements, fixed stars, courses)
- `src/components/` — shared UI primitives and feature components
- `src/i18n/` — all user-facing strings
- `public/svg/` — planet and zodiac glyph SVGs
- `public/media/` — planet photo textures
