import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Suspense } from "react";
import { PostHogProvider } from "@/components/PostHogProvider";
import { AuthProvider } from "@/components/AuthProvider";

const SITE_URL = "https://hygiea.app";
const SITE_NAME = "Hygiea";
const SITE_DESC =
  "Hygiea — A spiritual-hygiene daily practice app. Know your planetary spheres, organs, and cosmic constitution.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hygiea — Your spheres. Your practice.",
    template: "%s | Hygiea",
  },
  description: SITE_DESC,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE_NAME,
  },
  formatDetection: { telephone: false },
  keywords: [
    "spiritual hygiene",
    "planetary spheres",
    "astrology",
    "natal chart",
    "daily practice",
    "cosmic constitution",
    "Hygiea",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Hygiea — Your spheres. Your practice.",
    description: SITE_DESC,
    images: [
      {
        url: "/icons/icon-512.png",
        width: 512,
        height: 512,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Hygiea — Your spheres. Your practice.",
    description: SITE_DESC,
    images: ["/icons/icon-512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FAFAF7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Hygiea",
              alternateName: "Hygiea",
              url: "https://hygiea.app",
              description: SITE_DESC,
              applicationCategory: "LifestyleApplication",
              operatingSystem: "Web",
              inLanguage: "ar",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              image: "https://hygiea.app/icons/icon-512.png",
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();});`,
          }}
        />
      </head>
      <body className="min-h-dvh flex flex-col bg-cream text-ink">
        <Suspense>
          <PostHogProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </PostHogProvider>
        </Suspense>
      </body>
    </html>
  );
}
