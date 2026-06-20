import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL: 'https://hslrzpgjnsgylmyjcpqs.supabase.co',
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
      'sb_publishable_AhRZTClN3XNE59yF9OEBxg_UZVYHNuJ',
    NEXT_PUBLIC_TURNSTILE_SITE_KEY:
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '0x4AAAAAAADZm32ijpTAk7MWU',
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://accounts.google.com https://static.cloudflareinsights.com https://www.googletagmanager.com https://*.sentry.io",
              "frame-src 'self' https://challenges.cloudflare.com https://accounts.google.com",
              "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://challenges.cloudflare.com https://accounts.google.com https://api.opencagedata.com https://geocoding-api.open-meteo.com https://cloudflareinsights.com https://*.cloudflareinsights.com https://*.sentry.io https://us.i.posthog.com https://us-assets.i.posthog.com https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com",
              "img-src 'self' data: blob: https://*.googleusercontent.com https://lh3.googleusercontent.com https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "default-src 'self'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "worker-src 'self' blob:",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
