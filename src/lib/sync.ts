import type { LoggedEvent } from './events';
import type { CosmicStamp } from './cosmicStamp';
import type { TraitProfile } from './traitEngine';
import { createClient } from '@/utils/supabase/client';
import { STORAGE_KEYS } from './storageKeys';

const CHART_KEY = STORAGE_KEYS.CHART;
const BIRTH_KEY = STORAGE_KEYS.BIRTH_DATA;
const FIRST_NAME_KEY = STORAGE_KEYS.FIRST_NAME;
const LAST_NAME_KEY = STORAGE_KEYS.LAST_NAME;
const USER_NAME_KEY = STORAGE_KEYS.USER_NAME;

// Primary natal chart row in public.charts — upserted on (user_id, label).
const NATAL_LABEL = 'natal';

async function getUserId(): Promise<string | null> {
  try {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    return data.user?.id ?? null;
  } catch {
    return null;
  }
}

// ─── Chart: localStorage ⇄ public.charts ─────────────────────────────────────

export async function syncChart(): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const userId = await getUserId();
    if (!userId) return;
    const birthRaw = localStorage.getItem(BIRTH_KEY);
    const chartRaw = localStorage.getItem(CHART_KEY);
    if (!birthRaw || !chartRaw) return;
    const supabase = createClient();
    await supabase.from('charts').upsert(
      {
        user_id: userId,
        label: NATAL_LABEL,
        birth_data: JSON.parse(birthRaw),
        chart_json: JSON.parse(chartRaw),
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,label' }
    );
  } catch {
    // fire-and-forget — local data is the working copy
  }
}

export async function loadRemoteChart(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  try {
    const userId = await getUserId();
    if (!userId) return false;
    const supabase = createClient();
    const { data } = await supabase
      .from('charts')
      .select('birth_data, chart_json')
      .eq('user_id', userId)
      .eq('label', NATAL_LABEL)
      .maybeSingle();
    if (!data?.chart_json) return false;
    localStorage.setItem(CHART_KEY, JSON.stringify(data.chart_json));
    if (data.birth_data) {
      localStorage.setItem(BIRTH_KEY, JSON.stringify(data.birth_data));
      const name = (data.birth_data as { name?: string }).name;
      if (name && !localStorage.getItem(USER_NAME_KEY)) {
        localStorage.setItem(USER_NAME_KEY, name);
      }
    }
    return true;
  } catch {
    return false;
  }
}

// ─── Profile: localStorage ⇄ public.profiles ─────────────────────────────────

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
    const supabase = createClient();
    await supabase.from('profiles').upsert({
      id: userId,
      first_name: firstName || null,
      last_name: lastName || null,
      display_name: displayName || null,
      updated_at: new Date().toISOString(),
    });
  } catch {
    // fire-and-forget
  }
}

export async function loadRemoteProfile(): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const userId = await getUserId();
    if (!userId) return;
    const supabase = createClient();
    const { data } = await supabase
      .from('profiles')
      .select('first_name, last_name, display_name')
      .eq('id', userId)
      .maybeSingle();
    if (!data) return;
    if (data.first_name) localStorage.setItem(FIRST_NAME_KEY, data.first_name);
    if (data.last_name) localStorage.setItem(LAST_NAME_KEY, data.last_name);
    if (data.display_name && !localStorage.getItem(USER_NAME_KEY)) {
      localStorage.setItem(USER_NAME_KEY, data.display_name);
    }
  } catch {
    // fire-and-forget
  }
}

// ─── Aggregate helpers ───────────────────────────────────────────────────────

/** Push local profile + chart to the account (post-onboarding, post-edit). */
export async function syncAllLocalData(): Promise<void> {
  await Promise.all([syncChart(), syncProfile()]);
}

/**
 * Pull account data into localStorage (sign-in on a new device).
 * Local data wins when present — remote only fills the gaps.
 */
export async function loadAllRemote(): Promise<{ hasChart: boolean }> {
  if (typeof window === 'undefined') return { hasChart: false };
  await loadRemoteProfile();
  if (localStorage.getItem(CHART_KEY)) return { hasChart: true };
  const hasChart = await loadRemoteChart();
  return { hasChart };
}

// ─── Events: localStorage ⇄ public.events ────────────────────────────────────

export async function syncEvent(event: LoggedEvent): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const userId = await getUserId();
    if (!userId) return;
    const supabase = createClient();
    await supabase.from('events').insert({
      user_id: userId,
      note: event.text,
      mood: event.stream ?? null,
      energy: event.rhythm !== null ? String(event.rhythm) : null,
      placement_key: event.placement?.key ?? null,
      tags: event.placement ? [event.placement.type, event.placement.label] : [],
      extra: { localId: event.id, stamp: event.stamp, placement: event.placement },
      created_at: event.date,
    });
  } catch {
    // fire-and-forget
  }
}

export async function loadRemoteEvents(): Promise<LoggedEvent[]> {
  if (typeof window === 'undefined') return [];
  try {
    const userId = await getUserId();
    if (!userId) return [];
    const supabase = createClient();
    const { data } = await supabase
      .from('events')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (!data) return [];
    return data.map((row) => {
      const extra = row.extra as { localId?: string; stamp?: CosmicStamp; placement?: LoggedEvent['placement'] } | null;
      return {
        id: extra?.localId ?? row.id,
        text: row.note ?? '',
        date: row.created_at,
        stream: (row.mood as LoggedEvent['stream']) ?? null,
        rhythm: row.energy !== null ? Number(row.energy) : null,
        placement: extra?.placement ?? null,
        stamp: extra?.stamp ?? { dayRuler: '', moonPhase: '', sunPosition: '' } as CosmicStamp,
      };
    });
  } catch {
    return [];
  }
}

// ─── Deferred sync targets (quiz, journey, …) — still local-only ─────────────

function warnStub(name: string) {
  if (process.env.NODE_ENV === 'development') {
    console.warn(`[sync] ${name} is not yet implemented — data stays local only`);
  }
}

export async function syncQuiz(): Promise<void> { warnStub('syncQuiz'); }
export async function loadRemoteQuiz(): Promise<boolean> { warnStub('loadRemoteQuiz'); return false; }
export async function syncJourney(weekStart: string, state: object): Promise<void> { warnStub('syncJourney'); void weekStart; void state; }
export async function loadRemoteJourney(weekStart: string): Promise<object | null> { warnStub('loadRemoteJourney'); void weekStart; return null; }
export async function syncTraits(profile: TraitProfile): Promise<void> { warnStub('syncTraits'); void profile; }
export async function loadRemoteTraits(): Promise<boolean> { warnStub('loadRemoteTraits'); return false; }
export async function syncCalibration(calType: string, calKey: string, value: string): Promise<void> { warnStub('syncCalibration'); void calType; void calKey; void value; }
export async function loadRemoteCalibrations(): Promise<boolean> { warnStub('loadRemoteCalibrations'); return false; }

export interface TransitFeedback {
  transitId: string;
  transitType: 'great' | 'live' | 'essay';
  rating?: number;
  reflection?: string;
}

export async function syncTransitFeedback(fb: TransitFeedback): Promise<void> { warnStub('syncTransitFeedback'); void fb; }
export async function loadRemoteTransitFeedback(): Promise<Record<string, TransitFeedback>> { warnStub('loadRemoteTransitFeedback'); return {}; }
export async function syncPreferences(): Promise<void> { warnStub('syncPreferences'); }
export async function loadRemotePreferences(): Promise<boolean> { warnStub('loadRemotePreferences'); return false; }
export async function syncVote(args: { cardId: string; vote: string; note?: string; transitPlanet?: string; natalPlanet?: string }): Promise<void> { warnStub('syncVote'); void args; }
