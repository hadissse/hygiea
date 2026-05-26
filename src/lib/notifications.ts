// Rhythm-aware notifications only.
// Fires at diurnal thresholds (dawn, dusk) and seasonal events.
// No streak notifications, no re-engagement, no arbitrary reminders.

import { getUser } from './auth';
import { isTodayComplete } from './exerciseCycle';

const PREFS_KEY = 'hygiea.notifications.v2';

export interface NotificationPrefs {
  enabled: boolean;
  dawn: boolean;     // morning threshold reminder
  midday: boolean;   // exercise prompt (only if not logged)
  dusk: boolean;     // Rückschau reminder
  seasonal: boolean; // seasonal threshold announcements
  lastShown: Record<string, string>; // { dawn: 'YYYY-MM-DD', dusk: ..., ... }
}

const DEFAULT_PREFS: NotificationPrefs = {
  enabled: false,
  dawn: true,
  midday: true,
  dusk: true,
  seasonal: true,
  lastShown: {},
};

export function loadNotificationPrefs(): NotificationPrefs {
  if (typeof window === 'undefined') return DEFAULT_PREFS;
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (!raw) return DEFAULT_PREFS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PREFS, ...parsed, lastShown: parsed.lastShown ?? {} };
  } catch {
    return DEFAULT_PREFS;
  }
}

export function saveNotificationPrefs(prefs: NotificationPrefs): void {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(PREFS_KEY, JSON.stringify(prefs)); } catch {}
}

export function notificationsSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window && 'serviceWorker' in navigator;
}

export function notificationPermission(): NotificationPermission | 'unsupported' {
  if (!notificationsSupported()) return 'unsupported';
  return Notification.permission;
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (!notificationsSupported()) return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;
  const result = await Notification.requestPermission();
  return result === 'granted';
}

export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!notificationsSupported()) return null;
  try {
    return await navigator.serviceWorker.register('/sw.js');
  } catch {
    return null;
  }
}

async function showNotification(title: string, body: string, url: string): Promise<void> {
  if (Notification.permission !== 'granted') return;
  try {
    const reg = await navigator.serviceWorker.getRegistration('/sw.js');
    if (reg?.active) {
      reg.active.postMessage({ type: 'SHOW_NOTIFICATION', title, body, url });
    } else {
      new Notification(title, { body });
    }
  } catch {}
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function hasShownToday(prefs: NotificationPrefs, type: string): boolean {
  return prefs.lastShown[type] === todayKey();
}

function markShown(prefs: NotificationPrefs, type: string): NotificationPrefs {
  return { ...prefs, lastShown: { ...prefs.lastShown, [type]: todayKey() } };
}

// Seasonal thresholds — fixed dates (approximate; Easter is computed at New Year)
const SEASONAL_THRESHOLDS: Array<{ month: number; day: number; name: string; message: string; url: string }> = [
  { month: 6,  day: 24, name: 'stjohns',    message: "St John's Day — the peak of summer. The earth's soul reaches its outermost breath.", url: '/rhythms' },
  { month: 9,  day: 29, name: 'michaelmas', message: "Michaelmas — the iron threshold. The season of courage and honest self-reckoning opens.", url: '/michael' },
  { month: 12, day: 25, name: 'christmas',  message: "Christmas — the dark turning. In the longest night, the inner sun is reborn.", url: '/rhythms' },
  { month: 1,  day: 6,  name: 'epiphany',   message: "Epiphany — the Holy Nights close. What was received in the dark now becomes intention.", url: '/rhythms' },
];

// Check and fire rhythm notifications on app load.
// Called once per session from root layout or Today page.
export async function checkRhythmNotifications(): Promise<void> {
  if (typeof window === 'undefined' || Notification.permission !== 'granted') return;
  const prefs = loadNotificationPrefs();
  if (!prefs.enabled) return;

  const now = new Date();
  const hour = now.getHours();
  let updated = prefs;

  // Dawn: 6–9am — morning threshold entry
  if (prefs.dawn && hour >= 6 && hour < 9 && !hasShownToday(prefs, 'dawn')) {
    await showNotification(
      'Your threshold is open.',
      'The morning practice awaits — take one breath and begin.',
      '/threshold',
    );
    updated = markShown(updated, 'dawn');
  }

  // Midday: 11am–1pm — exercise prompt if not logged
  if (prefs.midday && hour >= 11 && hour < 13 && !hasShownToday(prefs, 'midday')) {
    const done = isTodayComplete();
    if (!done) {
      await showNotification(
        'The practice is here.',
        'Your six-exercise turn for today is still open.',
        '/today',
      );
    }
    updated = markShown(updated, 'midday');
  }

  // Dusk: 7–9pm — Rückschau reminder
  if (prefs.dusk && hour >= 19 && hour < 21 && !hasShownToday(prefs, 'dusk')) {
    await showNotification(
      'The Rückschau opens.',
      'An hour of evening remains — the backward walk through your day.',
      '/evening',
    );
    updated = markShown(updated, 'dusk');
  }

  // Seasonal thresholds — fire on the day
  if (prefs.seasonal) {
    const month = now.getMonth() + 1;
    const day = now.getDate();
    for (const threshold of SEASONAL_THRESHOLDS) {
      if (threshold.month === month && threshold.day === day && !hasShownToday(prefs, threshold.name)) {
        await showNotification('Threshold', threshold.message, threshold.url);
        updated = markShown(updated, threshold.name);
        break;
      }
    }
  }

  if (updated !== prefs) {
    saveNotificationPrefs(updated);
  }
}

// ─── VAPID push subscription ──────────────────────────────────────────────────

function urlBase64ToUint8Array(base64String: string): ArrayBuffer {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(base64);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
  return arr.buffer as ArrayBuffer;
}

export async function subscribeToPush(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  if (!vapidPublicKey) return false;
  try {
    const reg = await navigator.serviceWorker.ready;
    const existing = await reg.pushManager.getSubscription();
    if (existing) await existing.unsubscribe();
    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
    });
    const json = sub.toJSON();
    const user = await getUser();
    if (!user) return false;
    await fetch('/api/push/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.id,
        endpoint: json.endpoint,
        p256dh: (json.keys as Record<string, string>).p256dh,
        auth: (json.keys as Record<string, string>).auth,
        enabled: true,
      }),
    });
    return true;
  } catch (e) {
    if (process.env.NODE_ENV === 'development') console.error('subscribeToPush:', e);
    return false;
  }
}

export async function unsubscribeFromPush(): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const reg = await navigator.serviceWorker.getRegistration('/sw.js');
    if (!reg) return;
    const sub = await reg.pushManager.getSubscription();
    if (!sub) return;
    const endpoint = sub.toJSON().endpoint;
    await sub.unsubscribe();
    const user = await getUser();
    if (!user) return;
    await fetch('/api/push/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, endpoint, enabled: false }),
    });
  } catch (e) {
    if (process.env.NODE_ENV === 'development') console.error('unsubscribeFromPush:', e);
  }
}
