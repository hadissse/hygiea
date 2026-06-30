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

## Today Tab — Current State

Today is a **live transit instrument**. The static sphere-of-the-day is gone.

### What's on Today now (src/app/(app)/today/page.tsx)

- **Transit Hero Card** — strongest active transit from `calculateTransits(chart)`,
  moon transits filtered out. Shows: transit label + orb, aspect feel, natal
  placement reading (truncated/expandable), soul question (aphorism), resonance votes.
- **Mini Transit Cards** — up to 2 secondary active transits below the hero.
- **Two Winds Card** — today's sphere's luciferic (coral) vs. ahrimanic (blue)
  polarity check-in. Resonance votes attached.
- **Body Card** — planet organ and daily practice. Resonance votes attached.
- **Graceful fallback** — CTA to set up chart if no natal data; "quiet sky" message
  if no active transits.

### Resonance Votes

Stored in localStorage under `hygiea.vote.{cardId}.{date}`.
Four options: Warm · Quiet · Stirring · Flat.
VOTES_PREFIX added to STORAGE_KEYS.

## Next Up

No immediate feature tasks. Today page is feature-complete for the v1 reading
experience. Possible next directions:

- Weekly or lunar-cycle view (rhythm layer)
- Transit notification / push reminder at dawn
- Calibration from resonance votes (feedback loop)

## Architecture Decisions

- Chart is always calculated locally; astronomy-engine runs client-side.
- localStorage is the source of truth; Supabase is a sync mirror.
- All displayed strings must live in src/i18n/ar.ts before use.
