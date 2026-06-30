# Progress Tracker

## Current Phase

Foundations fixed. Ready to build core features.

## What's Built

- Full natal chart wheel (ZoomableWheel) with sub-tabs: Planets · Houses ·
  Aspects · Organs · Fixed Stars
- Per-placement detail screens for planets, houses, aspects, fixed stars
- 5-stage event logger: what happened → sphere → rhythm → placement → saved
  with celestial stamp
- Biography timeline: Steiner 7-year phases + major transits on one timeline
  with auto-expand to current phase
- Medical astrology (Organs tab): hermetic planet→organ→sign readings
- HD Centres tab on Self/Body
- Explore: live sky, biography arc, transit essays (Jupiter Return, Chiron
  Return, Uranus Opposition)
- Auth: Supabase anon session, email upgrade, account deletion
- Settings: edit birth data, calibration summary, data export/clear
- Sync stubs: events, traits, journey, calibrations, feedback, preferences,
  votes (src/lib/sync.ts)

## Today Tab — Current State (needs work)

Today shows the **day-of-week sphere** only (Saturn = Saturday, etc.).
This is static and has nothing to do with the user's natal chart.

The spec requires a **live transit stack** against the user's natal chart.
`calculateTransits()` exists in `src/lib/transits.ts` and is used on the
Self page — it just isn't wired to Today yet.

## Next Up (in order)

1. **Live transit stack on Today** — Replace sphere-of-the-day with
   `calculateTransits(chart).slice(0, 3)`. Render each transit as a card
   with the 4-part voice arc (observation · meaning · shadow · soul question).
   Keep the sphere-of-the-day as a secondary card below.

2. **Resonance votes per card** — After each Today card: warm · quiet ·
   stirring · flat. Store in localStorage under `STORAGE_KEYS.VOTES` keyed
   by `{date}:{cardId}`. This is the app's only success metric.

3. **Two Winds daily card** — A card showing today's sphere's luciferic vs.
   ahrimanic pole as a polarity check-in. Data is already in
   `src/content/spheres.ts` (`sphere.luciferic`, `sphere.ahrimanic`).

4. **Today's Question card** — A daily soul question pulled from the strongest
   active transit's placement content.

## Open Questions

- Should Today's transit hero card show the exact time the transit perfects,
  or just "active this week"?
- Resonance votes: per-session (forget next day) or persistent across days?

## Architecture Decisions

- Chart is always calculated locally; astronomy-engine runs client-side.
- localStorage is the source of truth; Supabase is a sync mirror.
- All displayed strings must live in src/i18n/ar.ts before use.
