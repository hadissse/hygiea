# Hygiea

## Overview

Hygiea is a daily-use mobile-first web app that turns the natal chart into a
living instrument of self-knowledge. It is built for seekers who want to study
Western astrology as a discipline of spiritual science — not as fortune-telling.

Every sign, house, planet, aspect, transit, and fixed star is a tappable detail
screen with a four-part voice arc (observation · meaning · shadow · soul
question), a daily practice prompt, a calibration toggle, and an event-logger
affordance.

The app is local-first. The chart is calculated offline from astronomy-engine.
Nothing is sent to a server during chart calculation or reading.

## Core User Flow

1. User completes 60-second onboarding: name → birth date → birth time (with
   "don't know" branch) → birth place. Chart is calculated locally.
2. User lands on **Today** and reads a live transit stack: the day's strongest
   transit against their natal chart, followed by Body · Two Winds ·
   Today's Question · Learning cards.
3. User taps the ✦ log icon and records a moment in under 30 seconds —
   what happened, which sphere it touched, rhythm polarity, tagged placement.
4. User taps into **Self → Chart** to explore their chart — every placement
   is a detail screen.
5. Over weeks the user returns daily. Logged events surface in Self/Saved as
   a personal timeline and in Explore/Biography as dots on the life arc.

## Tabs

### Today
- Live transit hero card: strongest transit vs. natal chart, 4-part voice arc
- Body card: today's sphere's organ and daily practice
- Two Winds card: Luciferic vs. Ahrimanic pole polarity check-in
- Today's Question card: soul question for the day
- Per-card resonance vote (warm · quiet · stirring · flat)

### Self
- Chart wheel with sub-tabs: Planets · Houses · Aspects · Organs · Fixed Stars
- Per-placement detail screens (4-part voice arc + practice prompt + event logger)
- Fixed stars with Arabic-tradition naming (al-Sufi lineage)
- Organs tab: medical astrology (hermetic planet→organ→sign reading)
- HD Centres tab: Human Design centre definitions
- Biography: Steiner 7-year phases + great transits on one timeline
- Saved: user's full life-event timeline

### Explore
- Live sky: tonight's planetary positions
- Biography arc: 7-year phases + landmark transits with prose + soul questions
- Transit essays: contemplative long-reads (Jupiter Return, Chiron Return, etc.)

### Log (global ✦ button)
- 5-stage flow: what happened → sphere → rhythm polarity → placement → save
- Auto-stamps each event with day ruler, moon phase, sun degree

### Settings
- Edit birth data, re-calculate chart
- Calibration summary
- Data: export, clear, account deletion

## Scope

### In scope
- Local-first with anonymous Supabase auth; sync on reconnect
- Tropical Western chart math (Sun–Pluto, Chiron, Lilith, ASC, MC)
- Fixed stars with Arabic-tradition naming and precession-aware positioning
- Three main tabs (Today · Self · Explore) plus Log and Settings
- Tier-gating (Open vs Deep) on outer planets, transit calendar, lifetime arc top-3
- Event logger with sphere / rhythm / placement tagging
- Content corpus in English for all bound surfaces

### Out of scope (post-launch)
- Multi-chart / synastry
- Human Design content beyond centre definitions
- In-app payment / IAP
- Sidereal / Vedic / Hellenistic chart modes
- Predictive language ("you will", "ستحصل")

## Success Criteria
1. Natal chart calculates in under 800 ms with no network connection.
2. User can log a life event in under 30 seconds with offline persistence.
3. Today tab opens in under 1 second on subsequent launches.
4. Every shipped text string passes review for voice consistency — no
   predictive language, no generic horoscope copy.
