'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  loadNotificationPrefs,
  saveNotificationPrefs,
  requestNotificationPermission,
  registerServiceWorker,
  notificationsSupported,
  notificationPermission,
  subscribeToPush,
  unsubscribeFromPush,
  type NotificationPrefs,
} from '@/lib/notifications';

export default function NotificationsPage() {
  const [prefs, setPrefs] = useState<NotificationPrefs | null>(null);
  const [permission, setPermission] = useState<string>('default');
  const [supported, setSupported] = useState(true);
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    setSupported(notificationsSupported());
    setPermission(notificationPermission());
    setPrefs(loadNotificationPrefs());
  }, []);

  async function handleEnable() {
    setRequesting(true);
    await registerServiceWorker();
    const granted = await requestNotificationPermission();
    if (granted && prefs) {
      const updated = { ...prefs, enabled: true };
      setPrefs(updated);
      saveNotificationPrefs(updated);
      await subscribeToPush();
    }
    setPermission(notificationPermission());
    setRequesting(false);
  }

  async function handleDisable() {
    if (!prefs) return;
    const updated = { ...prefs, enabled: false };
    setPrefs(updated);
    saveNotificationPrefs(updated);
    await unsubscribeFromPush();
  }

  function toggleType(key: 'dawn' | 'midday' | 'dusk' | 'seasonal') {
    if (!prefs) return;
    const updated = { ...prefs, [key]: !prefs[key] };
    setPrefs(updated);
    saveNotificationPrefs(updated);
  }

  if (!prefs) return null;

  return (
    <div className="pb-28 max-w-[430px] mx-auto">
      <div className="px-5 pt-6 pb-4">
        <Link href="/settings" className="text-xs text-ink-muted">← Settings</Link>
        <h1 className="font-serif text-[1.5rem] text-ink leading-tight mt-3">Notifications</h1>
        <p className="text-sm text-ink-muted mt-1 leading-[1.65]">
          Rhythm-only — no engagement notifications. Hygiea sends reminders at diurnal thresholds only.
        </p>
      </div>

      <div className="px-5 space-y-3">
        {!supported && (
          <div className="rounded-[14px] p-4" style={{ background: 'rgba(139,46,46,0.08)' }}>
            <p className="text-sm text-ink-muted">Notifications are not supported on this device.</p>
          </div>
        )}

        {supported && permission === 'denied' && (
          <div className="rounded-[14px] p-4" style={{ background: 'rgba(139,46,46,0.08)' }}>
            <p className="text-sm text-ink-muted">Notifications have been denied. Enable them in your browser settings to proceed.</p>
          </div>
        )}

        {/* Master toggle */}
        <div
          className="rounded-[16px] p-4 flex items-center justify-between"
          style={{ background: 'rgba(28,25,23,0.04)' }}
        >
          <div>
            <div className="text-sm font-medium text-ink">Rhythm notifications</div>
            <div className="text-xs text-ink-muted">
              {prefs.enabled ? 'On' : 'Off'} — fires at dawn, midday (if exercise not done), and dusk
            </div>
          </div>
          <button
            onClick={prefs.enabled ? handleDisable : handleEnable}
            disabled={requesting || !supported || permission === 'denied'}
            className="w-11 h-6 rounded-full transition-all relative disabled:opacity-40"
            style={{ background: prefs.enabled ? 'var(--color-cosmic-blue)' : 'rgba(28,25,23,0.15)' }}
          >
            <div
              className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all"
              style={{ left: prefs.enabled ? '22px' : '2px' }}
            />
          </button>
        </div>

        {prefs.enabled && (
          <div className="rounded-[16px] overflow-hidden" style={{ background: 'rgba(28,25,23,0.04)' }}>
            {(
              [
                { key: 'dawn' as const,     label: 'Dawn reminder',      desc: '6–9am — threshold entry' },
                { key: 'midday' as const,   label: 'Midday practice',    desc: '11am–1pm — only if exercise not logged' },
                { key: 'dusk' as const,     label: 'Dusk — Rückschau',   desc: '7–9pm — evening review' },
                { key: 'seasonal' as const, label: 'Seasonal thresholds', desc: 'St John\'s, Michaelmas, Christmas, Epiphany' },
              ] as const
            ).map(({ key, label, desc }, i, arr) => (
              <div key={key}>
                <div className="px-4 py-3.5 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-ink">{label}</div>
                    <div className="text-xs text-ink-muted">{desc}</div>
                  </div>
                  <button
                    onClick={() => toggleType(key)}
                    className="w-10 h-5 rounded-full transition-all relative flex-shrink-0"
                    style={{ background: prefs[key] ? 'var(--color-cosmic-blue)' : 'rgba(28,25,23,0.15)' }}
                  >
                    <div
                      className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all"
                      style={{ left: prefs[key] ? '19px' : '2px' }}
                    />
                  </button>
                </div>
                {i < arr.length - 1 && (
                  <div className="mx-4" style={{ borderTop: '1px solid var(--color-rule-soft)' }} />
                )}
              </div>
            ))}
          </div>
        )}

        <div className="rounded-[14px] p-4" style={{ background: 'rgba(28,25,23,0.04)' }}>
          <p className="text-xs text-ink-muted leading-[1.65]">
            These notifications fire at natural daily thresholds and seasonal events. There are no re-engagement notifications, no streak reminders, and no arbitrary timing. The practice is here when you are.
          </p>
        </div>
      </div>
    </div>
  );
}
