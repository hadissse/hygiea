# UI Context

## Theme

Light mode only. No dark mode. Warm cream background with ink typography.
The visual language is quiet and contemplative — natural materials, soft
borders, no shadows except on elevated modals.

## Colors (Tailwind tokens from globals.css)

| Role              | Token            | Hex       |
|-------------------|------------------|-----------|
| Page background   | `bg-cream`       | `#FAFAF7` |
| Surface           | `bg-cream-soft`  | `#F5F2EA` |
| Muted surface     | `bg-sand`        | `#EDE9E0` |
| Primary text      | `text-ink`       | `#1C1917` |
| Soft text         | `text-ink-soft`  | `#292524` |
| Muted text        | `text-ink-muted` | `#78716C` |
| Primary accent    | `text-coral`     | `#E9785E` |
| Soft accent       | `coral-soft`     | `#F3B8A6` |
| Gold              | `text-gold`      | `#C9A84C` |
| Amber             | `text-amber`     | `#D4A04C` |
| Silver            | `text-silver`    | `#A8B4C0` |
| Lake blue         | `text-lake`      | `#7E97B8` |
| Sage green        | `text-sage`      | `#8FA084` |
| Midnight (cards)  | `bg-midnight`    | `#0F1228` |
| Border            | `border-rule-soft` | `#E5E1D8` |

Hardcoded hex values are acceptable inside complex visual components (planet
cards, chart wheel, biography timeline) where the colour is data-driven.
Prefer Tailwind tokens for all structural and layout elements.

## Typography

All fonts use DM Sans. `font-serif` is aliased to DM Sans (not a serif font —
the alias is a design-system convention for larger display text). Inter is used
for mono/tabular numbers only.

| Role         | Class         | Font    |
|--------------|---------------|---------|
| Display / hero | `font-serif`  | DM Sans |
| Body copy    | `font-sans`   | DM Sans |
| Labels/UI    | `font-ui`     | Inter   |
| Numbers/mono | `font-mono`   | Inter   |

Tracking conventions: section labels use `tracking-widest` + `text-[10px]` +
`font-semibold` + `uppercase`. Never use all-caps on body copy.

## Border Radius

| Context             | Value   | Tailwind         |
|---------------------|---------|------------------|
| Chips / small UI    | 14px    | `rounded-[14px]` |
| Cards / panels      | 18px    | `rounded-[18px]` |
| Modals / overlays   | 22px    | `rounded-[22px]` |
| Buttons             | 26px    | `rounded-[26px]` or `rounded-full` |

## Component Library

No external component library. All components are built from scratch in
`src/components/`. Core primitives:

- `<Card>` — white rounded card with `border-rule-soft`
- `<Chip>` — active/inactive toggle pill
- `<Headline>` — display heading
- `<Body>` — body copy with optional `muted` prop
- `<FrameworkLabel>` — small kicker label for hermetic framework attribution

Icons are planet and zodiac glyphs rendered via CSS `mask-image` with
`/svg/*.svg` files. No Lucide or icon font. SVG glyphs sit in `public/svg/`.

## Layout Patterns

- **Mobile shell**: `max-w-[540px] mx-auto`, full-bleed cream background.
- **App shell** (`(app)/layout.tsx`): top bar (48px) + bottom nav on mobile;
  left sidebar on `md+`.
- **Two-column desktop**: `md:flex-row` split (50/50 or 40/60) on Today and
  detail pages.
- **Card grids**: `grid grid-cols-2 md:grid-cols-3 gap-3` for planet and
  placement cards.
- **Full-bleed overlays** (Log, Onboarding): fixed GIF background + frosted
  cream card floated in center, `max-w-[540px]`.

## Planet & Zodiac Glyphs

All rendered via CSS mask pattern:
```css
WebkitMaskImage: `url('/svg/${key}.svg')`
maskImage: `url('/svg/${key}.svg')`
WebkitMaskSize: 'contain'
background: <color>
```
No `<img>` tags for glyphs except where a photo texture is intentional
(planet card photo backgrounds in `public/media/`).
