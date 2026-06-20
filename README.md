# سُكون · Sukoon

An Arabic-first astrology web app. **No login required** — enter your birth details and generate your natal chart instantly.

**Live:** https://sukoon.arabic-astro.com

## Features

- 📍 Instant natal chart generation (no account needed)
- 📱 Mobile-first, RTL-optimized design  
- 🌍 Auto-detect location or enter manually
- 📊 Daily transits, great transits, journey tracking
- 🎯 Personality traits and insights based on your chart

## Stack

- **Frontend:** Next.js 15 · React 19 · TypeScript · Tailwind CSS 4
- **Astronomy:** astronomy-engine (accurate ephemeris)
- **Storage:** localStorage (data stays on device)
- **Analytics:** PostHog + Sentry
- **Deploy:** Cloudflare Workers

## Getting Started

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Building & Deploying

```bash
npm run build:cf
npm run deploy
```

## No Login

Users enter birth date, time (optional), and location. Chart is generated instantly. No email, password, or account creation needed. All data stays on the device.

## Project Structure

```
src/
  ├── app/
  │   ├── (app)/          # Main app (today, explore, self)
  │   ├── onboarding/     # Birth chart setup
  │   └── page.tsx        # Home (redirects or charts)
  ├── components/         # UI components
  └── lib/
      ├── chartCalculator.ts
      ├── traitEngine.ts
      ├── transits.ts
      └── sync.ts
```

## Design

- **Max width:** 430px (mobile), 900px (desktop)
- **Colors:** Cream (#F5F2EA), Coral (#E9785E), Ink (#171B3A)
- **Typography:** IBM Plex Sans Arabic, serif headings
- **RTL:** Full support, auto-handled

© 2026 Arabic Astrology Academy Inc.
