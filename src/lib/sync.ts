import type { LoggedEvent } from './events';
import type { TraitProfile } from './traitEngine';
import { createClient } from '@/utils/supabase/client';

const CHART_KEY = 'hygiea.primary-chart.v1';
const BIRTH_KEY = 'hygiea.birth-data';
const FIRST_NAME_KEY = 'hygiea.first-name';
const LAST_NAME_KEY = 'hygiea.last-name';
const USER_NAME_KEY = 'hygiea.user-name';

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

// ─── Deferred sync targets (journal, quiz, journey, …) — still local-only ────

export async function syncEvent(event: LoggedEvent): Promise<void> {}
export async function loadRemoteEvents(): Promise<LoggedEvent[]> { return []; }
export async function syncQuiz(): Promise<void> {}
export async function loadRemoteQuiz(): Promise<boolean> { return false; }
export async function syncJourney(weekStart: string, state: object): Promise<void> {}
export async function loadRemoteJourney(weekStart: string): Promise<object | null> { return null; }
export async function syncTraits(profile: TraitProfile): Promise<void> {}
export async function loadRemoteTraits(): Promise<boolean> { return false; }
export async function syncCalibration(calType: string, calKey: string, value: string): Promise<void> {}
export async function loadRemoteCalibrations(): Promise<boolean> { return false; }

export interface TransitFeedback {
  transitId: string;
  transitType: 'great' | 'live' | 'essay';
  rating?: number;
  reflection?: string;
}

export async function syncTransitFeedback(fb: TransitFeedback): Promise<void> {}
export async function loadRemoteTransitFeedback(): Promise<Record<string, TransitFeedback>> { return {}; }
export async function syncPreferences(): Promise<void> {}
export async function loadRemotePreferences(): Promise<boolean> { return false; }
export async function syncVote(args: { cardId: string; vote: string; note?: string; transitPlanet?: string; natalPlanet?: string }): Promise<void> {}
