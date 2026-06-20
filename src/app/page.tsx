'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const CHART_KEY = 'hygiea.chart.v1';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    async function redirect() {
      // Chart already in localStorage → go to today page
      try {
        if (localStorage.getItem(CHART_KEY)) {
          router.replace('/today');
          return;
        }
      } catch {}

      // No chart — go to onboarding to create one
      router.replace('/onboarding');
    }

    redirect();
  }, [router]);

  return (
    <div
      className="min-h-dvh flex items-center justify-center"
      style={{ background: '#F5F2EA' }}
    >
      <div
        className="w-2 h-2 rounded-full animate-pulse"
        style={{ background: '#C9A84C' }}
      />
    </div>
  );
}
