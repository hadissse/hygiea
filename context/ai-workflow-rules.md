# AI Workflow Rules

## Approach

Build incrementally. Context files define what to build and how. Always
implement against the specs — do not infer or invent behavior.

## Scoping Rules

- Work on one feature unit at a time.
- Prefer small, verifiable changes over large speculative rewrites.
- Do not combine unrelated system boundaries in a single step.
- A change is too broad if it can't be verified end to end quickly — split it.

## When to Split Work

Split if the step combines:
- UI changes and data/storage changes
- Multiple unrelated routes or components
- Behavior not clearly defined in the context files

## Handling Missing Requirements

- Do not invent behavior not defined in the context files.
- If a requirement is ambiguous, resolve it in the relevant context file
  before implementing.
- If a requirement is missing, add it as an open question in
  `progress-tracker.md` before continuing.

## Protected Files

Do not modify without explicit instruction:
- `src/content/placements.ts` — built via `_build_spheres.py`, has 12 named
  exports that require the manual process
- `public/svg/*.svg` — glyph assets, do not regenerate

## Keeping Docs in Sync

Update the relevant context file whenever implementation changes:
- Stack or storage model → `architecture.md`
- UI conventions → `ui-context.md`
- Code rules → `code-standards.md`
- Feature scope → `project-overview.md`
- Always update `progress-tracker.md` after every meaningful change

## Before Moving to the Next Unit

1. The current unit works end to end within its defined scope.
2. No invariant defined in `architecture.md` was violated.
3. `progress-tracker.md` reflects the completed work.
4. `npm run build` passes.
