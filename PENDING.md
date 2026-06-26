# Hygiea — Pending Tasks

## Priority 1: Data Sync (Appwrite backend)
The schema is fully defined (6 collections) but only `charts` + `profiles` sync. Everything else is a stub in `src/lib/sync.ts`.

| Task | Collection | File |
|---|---|---|
| Sync events to Appwrite | `events` | `src/lib/sync.ts:163` |
| Sync calibrations (fixed star resonance) | `calibrations` | `src/lib/sync.ts:175` |
| Sync traits (quiz answers) | `traits` | `src/lib/sync.ts:179` |
| Sync journey progress | `journey_progress` | `src/lib/sync.ts:183` |
| Sync transit feedback / votes | — | `src/lib/sync.ts:187` |

All 5 functions exist as empty stubs — need to implement using the same pattern as `syncChart()`.

---

## Priority 2: Locked UI Features (3 "Soon" cards on Self page)
All in `src/app/(app)/self/page.tsx`:

| Feature | What it needs |
|---|---|
| **Weekly Journey** (line 1749) | A proper journey/practice flow — daily prompts tied to the active sphere |
| **How to read your daily transit** (line 1772) | A learn article or interactive walkthrough page at `/learn/[id]` |
| **Evening Review** (line 1789) | Reflection form that saves 3 moments of the day to events |

`/learn` currently just redirects to `/today` — needs real content.

---

## Priority 3: Biography → Self Integration
Six biography chapters (`/biography/chapter1–6`) are a separate nav item. The user wants them embedded as categories within `/self` so the whole "Know Yourself" journey lives in one place.

**Approach:**
- Remove Biography from sidebar/tabbar nav
- Add a "Biography" section inside `/self` page (after the chart) with 6 chapter cards
- Each card shows dynamic labels from the chart (e.g. "Sun in Gemini · Moon in Scorpio")
- Clicking navigates to the existing `/biography/chapter[n]` pages (no content change needed)

---

## Priority 4: Arabic Content Still Untranslated
`src/app/self/fixed-stars/[star]/FixedStarDetail.tsx` — the `STAR_CONTENT` data object (lines 16–185) contains 20 fixed stars × 5 fields each, all in Arabic. This is the only remaining Arabic content block.

**Options:** Translate manually, or use an AI batch-translation script.

---

## Priority 5: Design & UX Gaps

| Gap | Location | Fix |
|---|---|---|
| Content fills only ~40% of desktop width on most pages | Spheres list, Events, Biography | Add `md:grid-cols-2` or `max-w-3xl mx-auto` where appropriate |
| No empty state design for Events | `/events` | Add a proper illustrated empty state (currently just "◌") |
| `/explore` and `/explore/depth` have old design | those pages | Apply DM Sans + cosmic design language |
| Sidebar has no active state for Explore/Learn routes | `Sidebar.tsx` | Add those routes to `primaryNav` or secondary nav |
| No desktop header (page title) on most pages | shell layout | Add sticky title bar on md+ |

---

## Priority 6: Performance & Code Quality

| Issue | File | Fix |
|---|---|---|
| `DAY_PLANETS` color map duplicated in 3+ files | `today/page.tsx`, `NatalChartWheel.tsx`, others | Extract to `src/lib/planets.ts` |
| `toAr()` / `toArabicDigits()` still defined in 6 files | various | Delete all — they just return `String(n)` now |
| `localStorage` keys hardcoded in 20+ files | various | Use `STORAGE_KEYS` from `src/lib/storageKeys.ts` |
| `SukoonWheel.tsx` / `SukoonIcon.tsx` naming | `src/components/v2/` | Rename to HygieaWheel / HygieaIcon |

---

## Priority 7: Appwrite Self-Hosted Setup
The Appwrite instance at `/Users/hadi/Downloads/appwrite` is running with default credentials. Before going live:

- Change `_APP_OPENSSL_KEY_V1` from `your-secret-key`
- Set `_APP_DOMAIN` from `localhost` to actual domain
- Set `_APP_DB_PASS` / `_APP_DB_ROOT_PASS` from defaults
- Enable HTTPS (`_APP_OPTIONS_FORCE_HTTPS=enabled`)
- Set `_APP_CONSOLE_WHITELIST_EMAILS` to restrict console access
