# Hygiea — Pending Tasks

Last updated: 2026-06-27

---

## DONE THIS SESSION ✅

- Cosmic Orrery at `/orrery` — 3D R3F planetary system, 7 planets, star field, info panel
- `/self/layers` — Framer Motion spring animations, pulsing glow ellipses
- `/self/anatomy` — Framer Motion drawer, expanding glow ring on active hotspot
- `/hierarchy` — Celestial Hierarchies, 9 angelic orders, scroll-driven whileInView
- `/journey` — River of Light, 7 scroll-snap soul sections
- `/constellations` — Zodiac 12-sign grid with bottom info panel
- Sidebar nav: Orrery, Hierarchy, Stars, Journey links added
- Cosmic CSS tokens in `globals.css`
- Fix Supabase env var: `PUBLISHABLE_KEY` → `ANON_KEY` (was breaking Vercel/production)
- Mobile header scroll-hide (hides past 60px on scroll down)
- Desktop sticky title bar in app layout
- Events page: proper empty state with CTA
- Explore page: wider desktop layout
- P1 — Appwrite sync stubs fully implemented (`src/lib/sync.ts`): events, traits, journey, calibrations, transit feedback, preferences, votes
- P2 — 3 locked "Soon" cards on Self page unlocked → /journey, /explore, /log
- P3 — Biography section (6 chapters with chart labels) added to bottom of Self page
- Content hub: books moved to `reports system/books/`, `books-index.json` created, `karma_lectures.json` in content-db, `export_hygiea.js` script written
- `APPWRITE_HARDENING.md` — production security checklist
- `DEPLOY.md` + `deploy/nginx.conf` + `deploy/ecosystem.config.js` — full VPS deployment guide

---

## Priority 1: Deploy to Hetzner VPS 🚀

**Guide**: `DEPLOY.md`  
**Config files**: `deploy/nginx.conf`, `deploy/ecosystem.config.js`

Steps remaining (done on the server, not in code):
- [ ] Create Hetzner CX22 server
- [ ] Point DNS records to server IP
- [ ] Transfer Appwrite Docker + change secrets (see `APPWRITE_HARDENING.md`)
- [ ] `git clone` + `npm run build` + PM2 for Hygiea
- [ ] `rsync` + Python venv + PM2 for Reports
- [ ] Nginx config + Certbot SSL
- [ ] Appwrite console: create project, collections, add platform

---

## Priority 2: Appwrite Production Hardening

See `APPWRITE_HARDENING.md` for full checklist. Key items:
- Change `_APP_OPENSSL_KEY_V1` from default (use `openssl rand -hex 32`)
- Change `_APP_DB_PASS` and `_APP_DB_ROOT_PASS`
- Set `_APP_DOMAIN` to actual domain
- Set `_APP_OPTIONS_FORCE_HTTPS=enabled`
- Set `_APP_CONSOLE_WHITELIST_EMAILS=hadievet123@gmail.com`

---

## Priority 3: Visual Brief — Still Pending

From the "Living Scientific-Spiritual Instrument" brief, 3 concepts not yet built:

| # | Concept | What it needs |
|---|---|---|
| 2 | **Glass Sphere Navigation** | Replace sidebar/menus with floating 3D glass spheres (R3F) |
| 8 | **Infinite Zoom Interface** | Figma-style zoom: Universe → Galaxy → Planetary → Human → Heart |
| 9 | **Sacred Geometry UI** | Flower of Life / Metatron grid as page structure (SVG) |

Constellation Painting (#6) is done as a grid — the "draw lines on click" version is still pending.

---

## Priority 4: Self Page "Soon" Features (deeper implementation)

The 3 cards were unlocked but link to existing pages. Full implementations:

| Feature | What's needed |
|---|---|
| **Soul Journey** (→ /journey) | ✅ Page exists |
| **Reading Transits** (→ /explore) | `/learn` still redirects to `/today` — needs real article content |
| **Evening Review** (→ /log) | Works but could have a dedicated 3-prompt reflection form |

---

## Priority 5: Design & UX Gaps (remaining)

| Gap | Fix |
|---|---|
| Most pages single-column on desktop | Add `md:grid-cols-3` or `md:max-w-3xl mx-auto` to Spheres list, Biography, Learn pages |
| `/explore` and `/explore/depth` old design | Apply DM Sans + cosmic design language |
| No Learn article content | `/learn/[id]` pages exist but content is sparse |

---

## Priority 6: Code Cleanup (remaining)

| Issue | File | Fix |
|---|---|---|
| `DAY_PLANETS` color map duplicated in 3+ files | `today/page.tsx`, `NatalChartWheel.tsx` | Extract to `src/lib/planets.ts` |
| `localStorage` keys hardcoded in 20+ files | various | Use `STORAGE_KEYS` from `src/lib/storageKeys.ts` |

---

## Content Hub — Workflow Reminder

When you edit `reports system/content-db/spheres.csv` or `fixed_stars.csv`:
```bash
node "/Users/hadi/Downloads/reports system/scripts/export_hygiea.js"
```
This regenerates `hygiea-v2/src/content/reportData/spheres.ts` and `fixedStars.ts`.

**Do not edit `placements.ts` via the export script** — it has 12 named exports that require the manual `_build_spheres.py` process.
