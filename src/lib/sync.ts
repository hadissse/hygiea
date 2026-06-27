import type { LoggedEvent } from './events';
import type { TraitProfile } from './traitEngine';
import { getAccount, getDatabases } from '@/utils/appwrite/client';
import { ID, Query } from 'appwrite';

const CHART_KEY = 'hygiea.primary-chart.v1';
const BIRTH_KEY = 'hygiea.birth-data';
const FIRST_NAME_KEY = 'hygiea.first-name';
const LAST_NAME_KEY = 'hygiea.last-name';
const USER_NAME_KEY = 'hygiea.user-name';

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const CHARTS_COL = 'charts';
const PROFILES_COL = 'profiles';
const EVENTS_COL = 'events';
const CALIBRATIONS_COL = 'calibrations';
const TRAITS_COL = 'traits';
const JOURNEY_COL = 'journey_progress';
const TRANSIT_FB_COL = 'transit_feedback';
const PREFERENCES_COL = 'preferences';
const VOTES_COL = 'votes';

async function getUserId(): Promise<string | null> {
  try {
    const account = getAccount();
    const user = await account.get();
    return user.$id;
  } catch {
    return null;
  }
}

// ─── Chart: localStorage ⇄ charts collection ─────────────────────────────────

export async function syncChart(): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const userId = await getUserId();
    if (!userId) return;
    const birthRaw = localStorage.getItem(BIRTH_KEY);
    const chartRaw = localStorage.getItem(CHART_KEY);
    if (!birthRaw || !chartRaw) return;

    const db = getDatabases();
    const existing = await db.listDocuments(DB_ID, CHARTS_COL, [
      Query.equal('user_id', userId),
      Query.equal('label', 'natal'),
    ]);

    const payload = {
      user_id: userId,
      label: 'natal',
      birth_data: birthRaw,
      chart_json: chartRaw,
    };

    if (existing.total > 0) {
      await db.updateDocument(DB_ID, CHARTS_COL, existing.documents[0].$id, payload);
    } else {
      await db.createDocument(DB_ID, CHARTS_COL, ID.unique(), payload);
    }
  } catch {
    // fire-and-forget
  }
}

export async function loadRemoteChart(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  try {
    const userId = await getUserId();
    if (!userId) return false;

    const db = getDatabases();
    const result = await db.listDocuments(DB_ID, CHARTS_COL, [
      Query.equal('user_id', userId),
      Query.equal('label', 'natal'),
    ]);

    if (result.total === 0) return false;
    const doc = result.documents[0];

    localStorage.setItem(CHART_KEY, doc.chart_json);
    if (doc.birth_data) {
      localStorage.setItem(BIRTH_KEY, doc.birth_data);
      const bd = JSON.parse(doc.birth_data) as { name?: string };
      if (bd.name && !localStorage.getItem(USER_NAME_KEY)) {
        localStorage.setItem(USER_NAME_KEY, bd.name);
      }
    }
    return true;
  } catch {
    return false;
  }
}

// ─── Profile: localStorage ⇄ profiles collection ─────────────────────────────

export async function syncProfile(): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const userId = await getUserId();
    if (!userId) return;
    const firstName = localStorage.getItem(FIRST_NAME_KEY) || '';
    const lastName = localStorage.getItem(LAST_NAME_KEY) || '';
    const displayName =
      [firstName, lastName].filter(Boolean).join(' ') ||
      localStorage.getItem(USER_NAME_KEY) ||
      '';
    if (!firstName && !lastName && !displayName) return;

    const db = getDatabases();
    const existing = await db.listDocuments(DB_ID, PROFILES_COL, [
      Query.equal('user_id', userId),
    ]);

    const payload = {
      user_id: userId,
      first_name: firstName || null,
      last_name: lastName || null,
      display_name: displayName || null,
    };

    if (existing.total > 0) {
      await db.updateDocument(DB_ID, PROFILES_COL, existing.documents[0].$id, payload);
    } else {
      await db.createDocument(DB_ID, PROFILES_COL, ID.unique(), payload);
    }
  } catch {
    // fire-and-forget
  }
}

export async function loadRemoteProfile(): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const userId = await getUserId();
    if (!userId) return;

    const db = getDatabases();
    const result = await db.listDocuments(DB_ID, PROFILES_COL, [
      Query.equal('user_id', userId),
    ]);

    if (result.total === 0) return;
    const doc = result.documents[0];
    if (doc.first_name) localStorage.setItem(FIRST_NAME_KEY, doc.first_name);
    if (doc.last_name) localStorage.setItem(LAST_NAME_KEY, doc.last_name);
    if (doc.display_name && !localStorage.getItem(USER_NAME_KEY)) {
      localStorage.setItem(USER_NAME_KEY, doc.display_name);
    }
  } catch {
    // fire-and-forget
  }
}

// ─── Aggregate helpers ────────────────────────────────────────────────────────

export async function syncAllLocalData(): Promise<void> {
  await Promise.all([syncChart(), syncProfile()]);
}

export async function loadAllRemote(): Promise<{ hasChart: boolean }> {
  if (typeof window === 'undefined') return { hasChart: false };
  await loadRemoteProfile();
  if (localStorage.getItem(CHART_KEY)) return { hasChart: true };
  const hasChart = await loadRemoteChart();
  return { hasChart };
}

// ─── Events: localStorage ⇄ events collection ────────────────────────────────

export async function syncEvent(event: LoggedEvent): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const userId = await getUserId();
    if (!userId) return;
    const ev = event as unknown as Record<string, unknown>;
    const eventId = ev.id as string | undefined ?? String(ev.timestamp ?? '');
    if (!eventId) return;
    const db = getDatabases();
    const existing = await db.listDocuments(DB_ID, EVENTS_COL, [
      Query.equal('user_id', userId),
      Query.equal('event_id', eventId),
    ]);
    const payload = { user_id: userId, event_id: eventId, event_json: JSON.stringify(event) };
    if (existing.total > 0) {
      await db.updateDocument(DB_ID, EVENTS_COL, existing.documents[0].$id, payload);
    } else {
      await db.createDocument(DB_ID, EVENTS_COL, ID.unique(), payload);
    }
  } catch {
    // fire-and-forget
  }
}

export async function loadRemoteEvents(): Promise<LoggedEvent[]> {
  if (typeof window === 'undefined') return [];
  try {
    const userId = await getUserId();
    if (!userId) return [];
    const db = getDatabases();
    const result = await db.listDocuments(DB_ID, EVENTS_COL, [
      Query.equal('user_id', userId),
      Query.limit(500),
    ]);
    if (result.total === 0) return [];
    const events = result.documents.map(d => JSON.parse(d.event_json) as LoggedEvent);
    localStorage.setItem('hygiea.events', JSON.stringify(events));
    return events;
  } catch {
    return [];
  }
}

// ─── Quiz / Traits: localStorage ⇄ traits collection ─────────────────────────

export async function syncQuiz(): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const userId = await getUserId();
    if (!userId) return;
    const traitsRaw = localStorage.getItem('hygiea.traits');
    if (!traitsRaw) return;
    const db = getDatabases();
    const existing = await db.listDocuments(DB_ID, TRAITS_COL, [
      Query.equal('user_id', userId),
    ]);
    const payload = { user_id: userId, traits_json: traitsRaw };
    if (existing.total > 0) {
      await db.updateDocument(DB_ID, TRAITS_COL, existing.documents[0].$id, payload);
    } else {
      await db.createDocument(DB_ID, TRAITS_COL, ID.unique(), payload);
    }
  } catch {
    // fire-and-forget
  }
}

export async function loadRemoteQuiz(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  try {
    const userId = await getUserId();
    if (!userId) return false;
    const db = getDatabases();
    const result = await db.listDocuments(DB_ID, TRAITS_COL, [
      Query.equal('user_id', userId),
    ]);
    if (result.total === 0) return false;
    localStorage.setItem('hygiea.traits', result.documents[0].traits_json);
    return true;
  } catch {
    return false;
  }
}

export async function syncTraits(profile: TraitProfile): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const userId = await getUserId();
    if (!userId) return;
    const db = getDatabases();
    const existing = await db.listDocuments(DB_ID, TRAITS_COL, [
      Query.equal('user_id', userId),
    ]);
    const payload = { user_id: userId, traits_json: JSON.stringify(profile) };
    if (existing.total > 0) {
      await db.updateDocument(DB_ID, TRAITS_COL, existing.documents[0].$id, payload);
    } else {
      await db.createDocument(DB_ID, TRAITS_COL, ID.unique(), payload);
    }
  } catch {
    // fire-and-forget
  }
}

export async function loadRemoteTraits(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  try {
    const userId = await getUserId();
    if (!userId) return false;
    const db = getDatabases();
    const result = await db.listDocuments(DB_ID, TRAITS_COL, [
      Query.equal('user_id', userId),
    ]);
    if (result.total === 0) return false;
    localStorage.setItem('hygiea.traits', result.documents[0].traits_json);
    return true;
  } catch {
    return false;
  }
}

// ─── Journey: localStorage ⇄ journey_progress collection ─────────────────────

export async function syncJourney(weekStart: string, state: object): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const userId = await getUserId();
    if (!userId) return;
    const db = getDatabases();
    const existing = await db.listDocuments(DB_ID, JOURNEY_COL, [
      Query.equal('user_id', userId),
      Query.equal('week_start', weekStart),
    ]);
    const payload = { user_id: userId, week_start: weekStart, state_json: JSON.stringify(state) };
    if (existing.total > 0) {
      await db.updateDocument(DB_ID, JOURNEY_COL, existing.documents[0].$id, payload);
    } else {
      await db.createDocument(DB_ID, JOURNEY_COL, ID.unique(), payload);
    }
  } catch {
    // fire-and-forget
  }
}

export async function loadRemoteJourney(weekStart: string): Promise<object | null> {
  if (typeof window === 'undefined') return null;
  try {
    const userId = await getUserId();
    if (!userId) return null;
    const db = getDatabases();
    const result = await db.listDocuments(DB_ID, JOURNEY_COL, [
      Query.equal('user_id', userId),
      Query.equal('week_start', weekStart),
    ]);
    if (result.total === 0) return null;
    const stateJson = result.documents[0].state_json as string;
    localStorage.setItem(`hygiea.journey.${weekStart}`, stateJson);
    return JSON.parse(stateJson) as object;
  } catch {
    return null;
  }
}

// ─── Calibrations: localStorage ⇄ calibrations collection ────────────────────

export async function syncCalibration(calType: string, calKey: string, value: string): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const userId = await getUserId();
    if (!userId) return;
    // Collect all calibration keys from localStorage into a single blob
    const blob: Record<string, string> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k?.startsWith('hygiea.calibration.')) {
        blob[k] = localStorage.getItem(k)!;
      }
    }
    // Ensure the current value is reflected
    blob[`hygiea.calibration.${calType}.${calKey}`] = value;
    const db = getDatabases();
    const existing = await db.listDocuments(DB_ID, CALIBRATIONS_COL, [
      Query.equal('user_id', userId),
    ]);
    const payload = { user_id: userId, calibrations_json: JSON.stringify(blob) };
    if (existing.total > 0) {
      await db.updateDocument(DB_ID, CALIBRATIONS_COL, existing.documents[0].$id, payload);
    } else {
      await db.createDocument(DB_ID, CALIBRATIONS_COL, ID.unique(), payload);
    }
  } catch {
    // fire-and-forget
  }
}

export async function loadRemoteCalibrations(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  try {
    const userId = await getUserId();
    if (!userId) return false;
    const db = getDatabases();
    const result = await db.listDocuments(DB_ID, CALIBRATIONS_COL, [
      Query.equal('user_id', userId),
    ]);
    if (result.total === 0) return false;
    const blob = JSON.parse(result.documents[0].calibrations_json) as Record<string, string>;
    for (const [k, v] of Object.entries(blob)) {
      localStorage.setItem(k, v);
    }
    return true;
  } catch {
    return false;
  }
}

// ─── Transit feedback ─────────────────────────────────────────────────────────

export interface TransitFeedback {
  transitId: string;
  transitType: 'great' | 'live' | 'essay';
  rating?: number;
  reflection?: string;
}

export async function syncTransitFeedback(fb: TransitFeedback): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const userId = await getUserId();
    if (!userId) return;
    const db = getDatabases();
    const existing = await db.listDocuments(DB_ID, TRANSIT_FB_COL, [
      Query.equal('user_id', userId),
      Query.equal('transit_id', fb.transitId),
    ]);
    const payload = { user_id: userId, transit_id: fb.transitId, fb_json: JSON.stringify(fb) };
    if (existing.total > 0) {
      await db.updateDocument(DB_ID, TRANSIT_FB_COL, existing.documents[0].$id, payload);
    } else {
      await db.createDocument(DB_ID, TRANSIT_FB_COL, ID.unique(), payload);
    }
    // Keep localStorage in sync
    const stored: Record<string, TransitFeedback> = JSON.parse(
      localStorage.getItem('hygiea.transit-fb') ?? '{}'
    );
    stored[fb.transitId] = fb;
    localStorage.setItem('hygiea.transit-fb', JSON.stringify(stored));
  } catch {
    // fire-and-forget
  }
}

export async function loadRemoteTransitFeedback(): Promise<Record<string, TransitFeedback>> {
  if (typeof window === 'undefined') return {};
  try {
    const userId = await getUserId();
    if (!userId) return {};
    const db = getDatabases();
    const result = await db.listDocuments(DB_ID, TRANSIT_FB_COL, [
      Query.equal('user_id', userId),
      Query.limit(500),
    ]);
    if (result.total === 0) return {};
    const record: Record<string, TransitFeedback> = {};
    for (const doc of result.documents) {
      const fb = JSON.parse(doc.fb_json) as TransitFeedback;
      record[fb.transitId] = fb;
    }
    localStorage.setItem('hygiea.transit-fb', JSON.stringify(record));
    return record;
  } catch {
    return {};
  }
}

// ─── Preferences: localStorage ⇄ preferences collection ──────────────────────

const PREF_KEYS = [
  'hygiea.language',
  'hygiea.theme',
  'hygiea.notifications',
  'hygiea.timezone',
  'hygiea.onboarding-complete',
  'hygiea.units',
];

export async function syncPreferences(): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const userId = await getUserId();
    if (!userId) return;
    const blob: Record<string, string> = {};
    for (const k of PREF_KEYS) {
      const v = localStorage.getItem(k);
      if (v !== null) blob[k] = v;
    }
    if (Object.keys(blob).length === 0) return;
    const db = getDatabases();
    const existing = await db.listDocuments(DB_ID, PREFERENCES_COL, [
      Query.equal('user_id', userId),
    ]);
    const payload = { user_id: userId, prefs_json: JSON.stringify(blob) };
    if (existing.total > 0) {
      await db.updateDocument(DB_ID, PREFERENCES_COL, existing.documents[0].$id, payload);
    } else {
      await db.createDocument(DB_ID, PREFERENCES_COL, ID.unique(), payload);
    }
  } catch {
    // fire-and-forget
  }
}

export async function loadRemotePreferences(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  try {
    const userId = await getUserId();
    if (!userId) return false;
    const db = getDatabases();
    const result = await db.listDocuments(DB_ID, PREFERENCES_COL, [
      Query.equal('user_id', userId),
    ]);
    if (result.total === 0) return false;
    const blob = JSON.parse(result.documents[0].prefs_json) as Record<string, string>;
    for (const [k, v] of Object.entries(blob)) {
      localStorage.setItem(k, v);
    }
    return true;
  } catch {
    return false;
  }
}

// ─── Votes: localStorage ⇄ votes collection ───────────────────────────────────

export async function syncVote(args: { cardId: string; vote: string; note?: string; transitPlanet?: string; natalPlanet?: string }): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const userId = await getUserId();
    if (!userId) return;
    const db = getDatabases();
    const existing = await db.listDocuments(DB_ID, VOTES_COL, [
      Query.equal('user_id', userId),
      Query.equal('card_id', args.cardId),
    ]);
    const payload = {
      user_id: userId,
      card_id: args.cardId,
      vote: args.vote,
      note: args.note ?? null,
      transit_planet: args.transitPlanet ?? null,
      natal_planet: args.natalPlanet ?? null,
    };
    if (existing.total > 0) {
      await db.updateDocument(DB_ID, VOTES_COL, existing.documents[0].$id, payload);
    } else {
      await db.createDocument(DB_ID, VOTES_COL, ID.unique(), payload);
    }
    // Keep localStorage in sync
    const votes: Record<string, { vote: string; note?: string }> = JSON.parse(
      localStorage.getItem('hygiea.votes') ?? '{}'
    );
    votes[args.cardId] = { vote: args.vote, ...(args.note ? { note: args.note } : {}) };
    localStorage.setItem('hygiea.votes', JSON.stringify(votes));
  } catch {
    // fire-and-forget
  }
}
