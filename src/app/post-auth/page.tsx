'use client';

// Landing pad after OAuth / email-confirmation callbacks. The callback is a
// server route, but pulling account data needs the browser client and
// localStorage — so it redirects here, we sync, then route.

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loadAllRemote } from '@/lib/sync';

export default function PostAuthPage() {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    loadAllRemote().then(({ hasChart }) => {
      if (cancelled) return;
      router.replace(hasChart ? '/' : '/onboarding');
      router.refresh();
    });
    return () => { cancelled = true; };
  }, [router]);

  return (
    <div className="min-h-dvh bg-cream flex items-center justify-center" dir="rtl">
      <p className="text-sm text-ink-muted animate-pulse">جاري تجهيز حسابك...</p>
    </div>
  );
}
