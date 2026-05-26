'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabase } from '@/lib/supabase';
import { loadAllRemote } from '@/lib/sync';

const CHART_KEY = 'hygiea.primary-chart.v1';
const THRESHOLD_KEY = 'hygiea.threshold.date';

function todayISO(): string {
  return new Date().toISOString().split('T')[0];
}

function hasThresholdCrossedToday(): boolean {
  try {
    return localStorage.getItem(THRESHOLD_KEY) === todayISO();
  } catch {
    return false;
  }
}

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    async function redirect() {
      // Fast path: chart in localStorage
      try {
        if (localStorage.getItem(CHART_KEY)) {
          // Already crossed threshold today → go straight to app
          if (hasThresholdCrossedToday()) {
            router.replace('/today');
          } else {
            // First entry of the day → cross the Threshold
            router.replace('/threshold');
          }
          return;
        }
      } catch {}

      // No local chart — check Supabase session
      const sb = getSupabase();
      if (!sb) {
        router.replace('/welcome');
        return;
      }

      const { data } = await sb.auth.getSession();
      if (!data.session) {
        router.replace('/welcome');
        return;
      }

      // Logged in but no local chart → restore from Supabase
      const { hasChart } = await loadAllRemote();
      if (!hasChart) {
        router.replace('/onboarding');
        return;
      }

      // Chart restored — go through Threshold
      if (hasThresholdCrossedToday()) {
        router.replace('/today');
      } else {
        router.replace('/threshold');
      }
    }

    redirect();
  }, [router]);

  return (
    <div
      className="min-h-dvh flex items-center justify-center"
      style={{ background: 'var(--color-cream)' }}
    >
      <div
        className="w-2 h-2 rounded-full animate-pulse"
        style={{ background: 'var(--color-gold-soft)' }}
      />
    </div>
  );
}
