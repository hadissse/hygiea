# Hygiea — What Matters Next

Last updated: 2026-06-30

---

## 1. Live Transit Stack on Today

**What**: Replace the static sphere-of-the-day (day-of-week planet) with
real transits calculated against the user's natal chart. Render the top 3
active transits as cards with the 4-part voice arc.

**Why it matters**: This is the core daily hook. Right now Today is just
"it's Tuesday so Mars." That's nothing. The instrument must read *your* sky.

**Files**: `src/app/(app)/today/page.tsx`, `src/lib/transits.ts`
`calculateTransits(chart)` already works — just not wired to Today.

---

## 2. Resonance Votes Per Card

**What**: After each Today card, show 4 choices: warm · quiet · stirring · flat.
Store per-card per-day in localStorage under `STORAGE_KEYS.VOTES`.

**Why it matters**: The only user signal the app has. Without it there's no
feedback loop at all.

---

## 3. Two Winds Daily Card

**What**: A card on Today showing today's sphere's Luciferic vs. Ahrimanic
pole as a polarity check-in. "Today's wind is blowing Luciferic — here's
what that means."

**Why it matters**: The most original idea in the app. No other astrology
app has this. The content already exists in `src/content/spheres.ts`
(`sphere.luciferic`, `sphere.ahrimanic`).

---

## 4. Today's Question Card

**What**: Pull the soul question from the strongest active transit's
placement content and surface it as a final card on Today.

---

## Done (don't revisit)

- Natal chart wheel with sub-tabs (Planets, Houses, Aspects, Organs, Fixed Stars)
- 5-stage event logger with celestial stamp
- Biography timeline (Steiner phases + great transits, auto-expands to now)
- Explore pages, transit essays
- Auth, settings, sync stubs
- Context files (this session)
