'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signOut } from '@/lib/auth';
import { getSupabase } from '@/lib/supabase';
import { isSynthesisEnabled, enableSynthesis, disableSynthesis } from '@/lib/synthesis';

const SETTINGS_LINKS = [
  { label: 'Notifications',        href: '/settings/notifications' },
  { label: 'Practice settings',    href: '/settings/practice' },
  { label: 'Data sovereignty',     href: '/settings/data' },
  { label: 'Privacy policy',       href: '/settings/privacy' },
  { label: 'About Hygiea',        href: '/settings/about' },
];

export default function SettingsPage() {
  const router = useRouter();
  const [aiEnabled, setAiEnabled] = useState(false);
  const [showAiOffer, setShowAiOffer] = useState(false);

  useEffect(() => {
    setAiEnabled(isSynthesisEnabled());
    // Show AI offer if user has been in the app 7+ days (threshold crossed 7+ times)
    try {
      const raw = localStorage.getItem('hygiea.threshold.count');
      const count = raw ? parseInt(raw, 10) : 0;
      setShowAiOffer(count >= 7 && !isSynthesisEnabled());
    } catch {}
  }, []);

  function toggleAI() {
    if (aiEnabled) {
      disableSynthesis();
      setAiEnabled(false);
    } else {
      enableSynthesis();
      setAiEnabled(true);
      setShowAiOffer(false);
    }
  }

  async function handleSignOut() {
    await signOut();
    clearHygieaStorage();
    router.push('/welcome');
  }

  async function handleDeleteAccount() {
    if (!window.confirm('This will permanently delete your account and all cloud data. Local data will also be cleared. Continue?')) return;
    try {
      const sb = getSupabase();
      if (sb) await sb.functions.invoke('delete-account');
    } catch {}
    clearHygieaStorage();
    router.push('/welcome');
  }

  function clearHygieaStorage() {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('hygiea.')) keys.push(k);
    }
    keys.forEach((k) => localStorage.removeItem(k));
  }

  return (
    <div className="pb-28 max-w-[430px] mx-auto">
      <div className="px-5 pt-6 pb-4">
        <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-1">
          Settings
        </div>
        <h1 className="font-serif text-[1.75rem] text-ink leading-tight">Hygiea</h1>
      </div>

      <div className="px-5 space-y-2">
        {/* Navigation links */}
        <div className="rounded-[16px] overflow-hidden" style={{ background: 'rgba(28,25,23,0.04)' }}>
          {SETTINGS_LINKS.map((item, i) => (
            <div key={item.href}>
              <Link
                href={item.href}
                className="flex items-center justify-between px-4 py-3.5"
              >
                <span className="text-sm text-ink">{item.label}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink-muted opacity-40">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Link>
              {i < SETTINGS_LINKS.length - 1 && (
                <div className="mx-4" style={{ borderTop: '1px solid var(--color-rule-soft)' }} />
              )}
            </div>
          ))}
        </div>

        {/* AI synthesis */}
        {showAiOffer && (
          <div className="rounded-[16px] p-4" style={{ background: 'rgba(90,62,122,0.08)', border: '1px solid rgba(90,62,122,0.15)' }}>
            <div className="text-[10px] font-medium tracking-widest uppercase mb-1" style={{ color: '#5A3E7A' }}>
              ◇ AI orientation — opt in
            </div>
            <p className="text-sm text-ink-soft leading-[1.65] mb-3">
              Once per day, Hygiea can generate a single paragraph of orientation — weaving your constitution, barometer state, exercise, and season into a brief compass for the day. No journal text, no reflections, no Rückschau entries ever reach the AI. The output is marked ◇ and deletable at any time.
            </p>
            <button
              onClick={toggleAI}
              className="text-sm font-medium px-4 py-2 rounded-[10px]"
              style={{ background: '#5A3E7A', color: 'white' }}
            >
              Enable ◇ orientation
            </button>
          </div>
        )}

        {!showAiOffer && (
          <div
            className="rounded-[16px] p-4 flex items-center justify-between"
            style={{ background: 'rgba(28,25,23,0.04)' }}
          >
            <div>
              <div className="text-[10px] font-medium tracking-widest uppercase mb-0.5" style={{ color: '#5A3E7A' }}>
                ◇ AI orientation
              </div>
              <div className="text-sm text-ink-muted">
                {aiEnabled ? 'On — one paragraph per day' : 'Off'}
              </div>
            </div>
            <button
              onClick={toggleAI}
              className="w-11 h-6 rounded-full transition-all relative"
              style={{ background: aiEnabled ? '#5A3E7A' : 'rgba(28,25,23,0.15)' }}
            >
              <div
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all"
                style={{ left: aiEnabled ? '22px' : '2px' }}
              />
            </button>
          </div>
        )}

        {/* Sign out */}
        <button
          onClick={handleSignOut}
          className="w-full rounded-[16px] px-4 py-3.5 flex items-center justify-between"
          style={{ background: 'rgba(28,25,23,0.04)' }}
        >
          <span className="text-sm" style={{ color: '#8B2E2E' }}>Sign out</span>
        </button>

        {/* Delete account */}
        <button
          onClick={handleDeleteAccount}
          className="w-full rounded-[16px] px-4 py-3.5 flex items-center justify-between"
          style={{ background: 'rgba(28,25,23,0.04)' }}
        >
          <span className="text-sm text-ink-muted">Delete account</span>
        </button>

        <div className="pt-2 text-center text-xs text-ink-muted/50">
          Hygiea · spirit-soul hygiene · v0.1
        </div>
      </div>
    </div>
  );
}
