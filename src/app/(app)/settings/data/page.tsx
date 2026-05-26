'use client';

// Task #34: Data sovereignty — export, wipe, copy explaining local-first storage.

import { useState } from 'react';
import Link from 'next/link';
import { signOut } from '@/lib/auth';
import { getSupabase } from '@/lib/supabase';
import { getUser } from '@/lib/auth';

function collectHygieaData(): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith('hygiea.')) {
      try { out[k] = JSON.parse(localStorage.getItem(k) || ''); } catch { out[k] = localStorage.getItem(k); }
    }
  }
  return out;
}

export default function DataPage() {
  const [exported, setExported] = useState(false);
  const [wiping, setWiping] = useState(false);
  const [wiped, setWiped] = useState(false);

  function handleExport() {
    const data = collectHygieaData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hygiea-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setExported(true);
  }

  async function handleWipeCloud() {
    if (!window.confirm('This will delete all your cloud data (Supabase sync). Your local data remains. Continue?')) return;
    setWiping(true);
    try {
      const sb = getSupabase();
      const user = await getUser();
      if (sb && user) {
        const tables = ['soul_barometer', 'ruckschau', 'exercise_progress', 'constitution', 'goethean_entries', 'foundation_arc', 'ai_synthesis_log'];
        for (const table of tables) {
          await sb.from(table).delete().eq('user_id', user.id);
        }
      }
    } catch {}
    setWiping(false);
    setWiped(true);
  }

  function handleWipeLocal() {
    if (!window.confirm('This will clear all local data on this device. You will be signed out. Continue?')) return;
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('hygiea.')) keys.push(k);
    }
    keys.forEach((k) => localStorage.removeItem(k));
    signOut();
    window.location.href = '/welcome';
  }

  return (
    <div className="pb-28 max-w-[430px] mx-auto">
      <div className="px-5 pt-6 pb-4">
        <Link href="/settings" className="text-xs text-ink-muted">← Settings</Link>
        <h1 className="font-serif text-[1.5rem] text-ink leading-tight mt-3">Data sovereignty</h1>
      </div>

      <div className="px-5 space-y-4">
        {/* Philosophy */}
        <div className="rounded-[16px] p-4" style={{ background: 'rgba(201,168,76,0.08)' }}>
          <div className="text-[10px] font-medium tracking-widest uppercase mb-2" style={{ color: 'var(--color-gold-soft)' }}>
            Your data is yours
          </div>
          <p className="text-sm text-ink-soft leading-[1.65]">
            Everything you write in Hygiea is inscribed on this device first, and only here, until you choose to sync. Supabase cloud sync is optional and additive. Your journal reflections and Rückschau entries never leave your device in any form that connects them to AI processing.
          </p>
        </div>

        {/* Export */}
        <div className="rounded-[16px] p-4" style={{ background: 'rgba(28,25,23,0.04)' }}>
          <div className="text-[10px] font-medium tracking-widest uppercase mb-1">Export all data</div>
          <p className="text-xs text-ink-muted leading-[1.6] mb-3">
            Download a complete JSON export of all your Hygiea local data. Includes chart, barometer history, exercise progress, Rückschau entries, and all preferences.
          </p>
          <button
            onClick={handleExport}
            className="px-4 py-2 rounded-[10px] text-sm font-medium"
            style={{ background: 'var(--color-cosmic-blue)', color: 'white' }}
          >
            {exported ? 'Downloaded' : 'Export to JSON'}
          </button>
        </div>

        {/* Wipe cloud */}
        <div className="rounded-[16px] p-4" style={{ background: 'rgba(28,25,23,0.04)' }}>
          <div className="text-[10px] font-medium tracking-widest uppercase mb-1">Wipe cloud sync</div>
          <p className="text-xs text-ink-muted leading-[1.6] mb-3">
            Delete all data from Supabase cloud storage. Your device data is not affected.
          </p>
          <button
            onClick={handleWipeCloud}
            disabled={wiping || wiped}
            className="px-4 py-2 rounded-[10px] text-sm font-medium disabled:opacity-50"
            style={{ background: 'rgba(139,46,46,0.12)', color: '#8B2E2E' }}
          >
            {wiped ? 'Cloud data wiped' : wiping ? 'Wiping…' : 'Wipe cloud data'}
          </button>
        </div>

        {/* Wipe local */}
        <div className="rounded-[16px] p-4" style={{ background: 'rgba(28,25,23,0.04)' }}>
          <div className="text-[10px] font-medium tracking-widest uppercase mb-1">Clear this device</div>
          <p className="text-xs text-ink-muted leading-[1.6] mb-3">
            Remove all Hygiea data from this device. You will be signed out. This cannot be undone — export first if you want a backup.
          </p>
          <button
            onClick={handleWipeLocal}
            className="px-4 py-2 rounded-[10px] text-sm font-medium"
            style={{ background: 'rgba(139,46,46,0.12)', color: '#8B2E2E' }}
          >
            Clear device data
          </button>
        </div>
      </div>
    </div>
  );
}
