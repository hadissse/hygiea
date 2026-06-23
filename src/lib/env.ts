/**
 * Warns about missing optional environment variables in development.
 * Required vars are guaranteed by next.config.ts; only optionals need runtime checks.
 * Call once at app startup (e.g., in layout.tsx or instrumentation.ts).
 */
export function warnMissingEnv(): void {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    const optional: [string, string][] = [
      ['NEXT_PUBLIC_OPENCAGE_KEY', 'geocoding will fall back to Open-Meteo (no API key needed)'],
      ['NEXT_PUBLIC_SENTRY_DSN', 'error tracking is disabled'],
    ]
    for (const [key, note] of optional) {
      if (!process.env[key]) {
        console.warn(`[env] ${key} is not set — ${note}`)
      }
    }
  }
}
