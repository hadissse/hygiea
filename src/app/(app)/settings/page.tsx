'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/components/AuthProvider';
import { syncProfile } from '@/lib/sync';
import { STORAGE_KEYS } from '@/lib/storageKeys';

function ExternalIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink-muted opacity-40 shrink-0">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-semibold text-ink-muted tracking-wider uppercase px-5 mt-6 mb-2">{children}</p>;
}

function EditRow({
  label, value, type = 'text', masked, actionLabel = 'Edit', hint, onSave,
}: {
  label: string; value: string; type?: string; masked?: boolean;
  actionLabel?: string; hint?: string;
  onSave?: (v: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (editing) inputRef.current?.focus(); }, [editing]);
  useEffect(() => { setDraft(value); }, [value]);

  const save = () => { onSave?.(draft); setEditing(false); };

  return (
    <div className="py-4 flex items-start justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-semibold text-ink">{label}</div>
        {editing ? (
          <input
            ref={inputRef} type={type} value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') save(); if (e.key === 'Escape') setEditing(false); }}
            className="mt-1.5 w-full text-sm text-ink bg-cream-soft border border-coral/40 rounded-[10px] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-coral/20"
          />
        ) : (
          <div className="text-sm text-ink-muted mt-0.5 truncate" dir={type === 'email' ? 'ltr' : undefined}>
            {masked ? '••••••••••' : (value || '—')}
          </div>
        )}
        {hint && !editing && <div className="text-[11px] text-ink-muted mt-0.5 opacity-70">{hint}</div>}
      </div>
      {editing ? (
        <div className="flex gap-2 shrink-0 pt-1">
          <button onClick={save} className="px-4 py-1.5 rounded-full bg-ink text-cream text-xs font-medium">Save</button>
          <button onClick={() => { setDraft(value); setEditing(false); }} className="px-3 py-1.5 rounded-full bg-cream-soft text-ink-muted text-xs">Cancel</button>
        </div>
      ) : (
        <button
          onClick={() => setEditing(true)}
          className="shrink-0 px-4 py-1.5 rounded-full bg-cream-soft border border-rule-soft text-[13px] font-medium text-ink hover:bg-white transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

function DeleteModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 backdrop-blur-sm px-6">
      <div className="bg-white rounded-[24px] p-6 max-w-[340px] w-full shadow-xl">
        <h2 className="font-serif text-xl text-ink mb-2">Delete account?</h2>
        <p className="text-sm text-ink-muted leading-[1.7] mb-6">
          Your account and all data will be permanently deleted within 30 days. This cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onConfirm} className="flex-1 py-3 rounded-[14px] bg-red-500 text-white font-medium text-sm">Delete account</button>
          <button onClick={onCancel} className="flex-1 py-3 rounded-[14px] bg-cream-soft text-ink font-medium text-sm">Cancel</button>
        </div>
      </div>
    </div>
  );
}

function clearLocalData() {
  const keys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i); if (k?.startsWith('hygiea.')) keys.push(k);
  }
  keys.forEach(k => localStorage.removeItem(k));
}

export default function SettingsPage() {
  const router = useRouter();
  const { user } = useUser();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [copyDone, setCopyDone] = useState(false);

  useEffect(() => {
    setFirstName(localStorage.getItem(STORAGE_KEYS.FIRST_NAME) || '');
    setLastName(localStorage.getItem(STORAGE_KEYS.LAST_NAME) || '');
  }, []);

  const persist = (key: string, val: string) => {
    localStorage.setItem(key, val);
    syncProfile();
  };

  const handleSignOut = async () => {
    clearLocalData();
    router.push('/');
    router.refresh();
  };

  const handleDeleteAccount = async () => {
    clearLocalData();
    router.push('/');
    router.refresh();
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('info@hygiea.shop').then(() => {
      setCopyDone(true);
      setTimeout(() => setCopyDone(false), 2000);
    });
  };

  const displayName = [firstName, lastName].filter(Boolean).join(' ') || 'Hygiea member';

  return (
    <div className="pb-16 md:max-w-xl md:mx-auto">
      {showDeleteModal && (
        <DeleteModal onConfirm={handleDeleteAccount} onCancel={() => setShowDeleteModal(false)} />
      )}

      {/* ── Profile hero ── */}
      <div className="mx-5 mt-6 rounded-[20px] bg-cream-soft border border-rule-soft p-6 flex flex-col items-center gap-3 text-center">
        <div className="w-16 h-16 rounded-full overflow-hidden shadow-sm border border-rule-soft bg-midnight flex items-center justify-center">
          <span className="text-2xl text-white">☽</span>
        </div>
        <div>
          <div className="font-serif text-2xl text-ink">{displayName}</div>
          <div className="text-[13px] text-ink-muted mt-0.5">Account &amp; settings</div>
        </div>
      </div>

      {/* ── Personal info ── */}
      <SectionLabel>Personal information</SectionLabel>
      <div className="mx-5 bg-white rounded-[20px] border border-rule-soft divide-y divide-rule-soft overflow-hidden">
        <div className="px-5">
          <EditRow
            label="First name"
            value={firstName}
            onSave={v => { setFirstName(v); persist(STORAGE_KEYS.FIRST_NAME, v); }}
          />
        </div>
        <div className="px-5">
          <EditRow
            label="Last name"
            value={lastName}
            onSave={v => { setLastName(v); persist(STORAGE_KEYS.LAST_NAME, v); }}
          />
        </div>
        <div className="px-5">
          <div className="py-4 flex items-center justify-between gap-4">
            <div>
              <div className="text-[13px] font-semibold text-ink">Birth data</div>
              <div className="text-sm text-ink-muted mt-0.5">Date · Time · Place</div>
            </div>
            <Link
              href="/settings/edit-birth"
              className="shrink-0 px-4 py-1.5 rounded-full bg-cream-soft border border-rule-soft text-[13px] font-medium text-ink hover:bg-white transition-colors"
            >
              Edit
            </Link>
          </div>
        </div>
      </div>

      {/* ── Account & security ── */}
      <SectionLabel>Account &amp; security</SectionLabel>
      <div className="mx-5 bg-white rounded-[20px] border border-rule-soft divide-y divide-rule-soft overflow-hidden">
        <div className="px-5">
          <div className="py-4">
            <div className="text-[13px] font-semibold text-ink">Email</div>
            <div className="text-sm text-ink-muted mt-0.5 truncate" dir="ltr">
              {user?.email || '—'}
            </div>
            <div className="text-[11px] text-ink-muted mt-0.5 opacity-70">Your registered email</div>
          </div>
        </div>
        <div className="px-5">
          <div className="py-4 flex items-center justify-between gap-4">
            <div>
              <div className="text-[13px] font-semibold text-ink">Password</div>
              <div className="text-sm text-ink-muted mt-0.5">••••••••••</div>
            </div>
            <Link href="/reset-password" className="shrink-0 text-sm text-coral font-medium">
              Change
            </Link>
          </div>
        </div>
      </div>

      {/* ── Legal & support ── */}
      <SectionLabel>Support &amp; legal</SectionLabel>
      <div className="mx-5 bg-white rounded-[20px] border border-rule-soft divide-y divide-rule-soft overflow-hidden">
        <Link href="/privacy-policy" target="_blank" className="flex items-center justify-between px-5 py-4 hover:bg-cream-soft/50 transition-colors">
          <span className="text-sm text-ink">Privacy policy</span>
          <ExternalIcon />
        </Link>
        <Link href="/terms-and-conditions" target="_blank" className="flex items-center justify-between px-5 py-4 hover:bg-cream-soft/50 transition-colors">
          <span className="text-sm text-ink">Terms &amp; conditions</span>
          <ExternalIcon />
        </Link>
        <button
          onClick={handleCopyEmail}
          className="w-full flex items-center justify-between px-5 py-4 hover:bg-cream-soft/50 transition-colors text-left"
        >
          <div>
            <div className="text-sm text-ink">Contact us</div>
            <div className="text-[12px] text-ink-muted mt-0.5" dir="ltr">info@hygiea.shop</div>
          </div>
          <div className="shrink-0 text-[11px] text-coral font-medium">
            {copyDone ? 'Copied ✓' : 'Copy'}
          </div>
        </button>
      </div>

      {/* ── Danger zone ── */}
      <SectionLabel>Account actions</SectionLabel>
      <div className="mx-5 flex gap-3">
        <button
          onClick={handleSignOut}
          className="flex-1 py-3 rounded-[14px] bg-white border border-rule-soft text-sm font-medium text-ink hover:bg-cream-soft transition-colors"
        >
          Sign out
        </button>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="flex-1 py-3 rounded-[14px] bg-white border border-rule-soft text-sm font-medium text-red-400 hover:bg-red-50 transition-colors"
        >
          Delete account
        </button>
      </div>

      <p className="text-center text-[11px] text-ink-muted mt-8 pb-4">
        © 2026 Hygiea
      </p>
    </div>
  );
}
