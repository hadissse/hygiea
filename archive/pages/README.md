# Archived pages

Pages removed from the live app (no inbound navigation links) but kept for
future use. To restore one, move it back under `src/app/` (paths below),
remove its entry from `ARCHIVED_REDIRECTS` in `src/middleware.ts`, and re-add
any nav link / sitemap entry.

| Folder | Original route | Original path |
|---|---|---|
| `quiz/` | /quiz | `src/app/quiz/` |
| `evening/` | /evening | `src/app/evening/` |
| `traits/` | /traits | `src/app/(app)/traits/` |
| `journey-1/` | /journey-1 | `src/app/(app)/journey-1/` |
| `journey-lunar/` | /journey-lunar | `src/app/(app)/journey-lunar/` |
| `library/` | /library | `src/app/(app)/library/` (nav buttons commented out in `TabBar.tsx` / `Sidebar.tsx`) |
| `explore-calendar/` | /explore/calendar | `src/app/explore/calendar/` |
| `self-wheel/` | /self/wheel | `src/app/self/wheel/` |
| `self-positions/` | /self/positions | `src/app/self/positions/` |
| `self-planetary-speed/` | /self/planetary-speed | `src/app/self/planetary-speed/` |

Note: the quiz completion redirect was fixed from the dead `/welcome` route to
`/onboarding` while archived.
