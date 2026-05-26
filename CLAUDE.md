@AGENTS.md

# Hygiea

English-first spiritual-hygiene app forked from Sukoon. See `HYGIEA_GRAND_PLAN.md` for the full roadmap.

## Current phase
Phase 0 — Foundation (complete). Phase 1 — Daily Loop is next.

## Key facts
- localStorage prefix: `hygiea.` (not `sukoon.`)
- Fonts: EB Garamond (prose), Inter (UI) — loaded in `layout.tsx`
- Colors: defined in `src/theme/tokens.ts` and `src/app/globals.css` — use CSS vars (`--color-cosmic-blue`, etc.)
- i18n: `src/i18n/en.ts` is the default locale; `ar.ts` is kept for Phase 8 back-port
- Schema: `src/lib/schema.sql` — Sukoon base tables + Hygiea additive tables (soul_barometer, ruckschau, exercise_progress, calendar_soul_log, constitution, goethean_entries, foundation_arc, ai_synthesis_log)
- The AI synthesis layer (Phase 6) must never receive journal text, Rückschau text, or reflections

## Governing constraints (non-negotiable)
1. Heart-thinking rule: verses, exercises, interpretations, moral guidance are human-authored forever
2. Local-first: data lives on-device first; cloud sync is opt-in
3. No infinite scroll, no streaks, no engagement hooks
4. Rhythm over notification: notifications fire at diurnal/seasonal thresholds only
5. The Threshold: a deliberate entry experience precedes all content
