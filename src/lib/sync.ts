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

// ─── Deferred sync targets (still local-only stubs) ──────────────────────────

export async function syncEvent(_event: LoggedEvent): Promise<void> {}
export async function loadRemoteEvents(): Promise<LoggedEvent[]> { return []; }
export async function syncQuiz(): Promise<void> {}
export async function loadRemoteQuiz(): Promise<boolean> { return false; }
export async function syncJourney(_weekStart: string, _state: object): Promise<void> {}
export async function loadRemoteJourney(_weekStart: string): Promise<object | null> { return null; }
export async function syncTraits(_profile: TraitProfile): Promise<void> {}
export async function loadRemoteTraits(): Promise<boolean> { return false; }
export async function syncCalibration(_calType: string, _calKey: string, _value: string): Promise<void> {}
export async function loadRemoteCalibrations(): Promise<boolean> { return false; }

export interface TransitFeedback {
  transitId: string;
  transitType: 'great' | 'live' | 'essay';
  rating?: number;
  reflection?: string;
}

export async function syncTransitFeedback(_fb: TransitFeedback): Promise<void> {}
export async function loadRemoteTransitFeedback(): Promise<Record<string, TransitFeedback>> { return {}; }
export async function syncPreferences(): Promise<void> {}
export async function loadRemotePreferences(): Promise<boolean> { return false; }
export async function syncVote(_args: { cardId: string; vote: string; note?: string; transitPlanet?: string; natalPlanet?: string }): Promise<void> {}
