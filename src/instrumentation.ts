// Server-side Sentry intentionally disabled to keep the Cloudflare Worker
// bundle under the 3 MiB limit (the Sentry Node SDK + OpenTelemetry add ~250KB).
// Client-side error reporting still works via sentry.client.config.ts.
export async function register() {}
