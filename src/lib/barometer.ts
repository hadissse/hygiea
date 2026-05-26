import { getSupabase } from './supabase';
import { getUser } from './auth';

export type BarometerState =
  | 'hardened_ahrimanic'
  | 'tilting_ahrimanic'
  | 'centered'
  | 'tilting_luciferic'
  | 'dispersed_luciferic';

export interface BarometerReading {
  state: BarometerState;
  direction: string;
  guardian?: string;
  date: string; // ISO date string YYYY-MM-DD
}

export interface BarometerInputs {
  lastRuckschauQuality?: 'contracted' | 'scattered' | 'balanced';
  transitQuality?: 'heavy' | 'light' | 'neutral';
  exercisesCompletedToday?: boolean;
  constitutionTemperament?: string;
}

interface StateConfig {
  direction: string;
  guardian?: string;
}

const STATE_CONFIG: Record<BarometerState, StateConfig> = {
  hardened_ahrimanic: {
    direction: 'Loosen what has crystallised. Let warmth enter.',
    guardian:
      'You have contracted around something that once protected you. Notice where rigidity has replaced discernment. The practice today is not effort but softening.',
  },
  tilting_ahrimanic: {
    direction: 'Bring movement to what has stiffened. A small gesture of warmth will do.',
  },
  centered: {
    direction: 'You stand at the threshold. Receive what the day brings.',
  },
  tilting_luciferic: {
    direction: 'Draw inward. Not all that rises needs expression today.',
  },
  dispersed_luciferic: {
    direction: 'Return to the ground. Something essential has scattered.',
    guardian:
      'You are reaching beyond your own centre. The practice today is contraction, not expansion — one breath, one task, one word at a time.',
  },
};

export function calculateBarometer(inputs: BarometerInputs): BarometerReading {
  // Simple scoring: -2 (ahrimanic) to +2 (luciferic)
  let score = 0;

  if (inputs.lastRuckschauQuality === 'contracted') score -= 1;
  if (inputs.lastRuckschauQuality === 'scattered') score += 1;

  if (inputs.transitQuality === 'heavy') score -= 1;
  if (inputs.transitQuality === 'light') score += 1;

  if (inputs.exercisesCompletedToday) score = Math.max(score - 0.5, score); // completion grounds slightly

  // Temperament bias (subtle)
  if (inputs.constitutionTemperament === 'melancholic') score -= 0.5;
  if (inputs.constitutionTemperament === 'sanguine') score += 0.5;

  let state: BarometerState;
  if (score <= -2) state = 'hardened_ahrimanic';
  else if (score < 0) state = 'tilting_ahrimanic';
  else if (score === 0) state = 'centered';
  else if (score < 2) state = 'tilting_luciferic';
  else state = 'dispersed_luciferic';

  const config = STATE_CONFIG[state];
  const today = new Date().toISOString().split('T')[0];

  return {
    state,
    direction: config.direction,
    guardian: config.guardian,
    date: today,
  };
}

const BAROMETER_KEY = 'hygiea.barometer.v1';

export function saveBarometer(reading: BarometerReading): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(BAROMETER_KEY, JSON.stringify(reading));
  } catch {}

  // Fire-and-forget Supabase sync
  syncBarometerRemote(reading);
}

export function loadBarometer(): BarometerReading | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(BAROMETER_KEY);
    if (!raw) return null;
    const reading = JSON.parse(raw) as BarometerReading;
    // Only return if it's from today
    const today = new Date().toISOString().split('T')[0];
    return reading.date === today ? reading : null;
  } catch {
    return null;
  }
}

async function syncBarometerRemote(reading: BarometerReading): Promise<void> {
  const sb = getSupabase();
  const user = await getUser();
  if (!sb || !user) return;

  try {
    await sb.from('soul_barometer').upsert(
      {
        user_id: user.id,
        date: reading.date,
        reading: reading.state,
        signals: { direction: reading.direction },
      },
      { onConflict: 'user_id,date' },
    );
  } catch (e) {
    if (process.env.NODE_ENV === 'development') console.error('syncBarometer:', e);
  }
}

export function getStateLabel(state: BarometerState): string {
  const labels: Record<BarometerState, string> = {
    hardened_ahrimanic: 'Contracted',
    tilting_ahrimanic: 'Leaning inward',
    centered: 'Centred',
    tilting_luciferic: 'Leaning outward',
    dispersed_luciferic: 'Scattered',
  };
  return labels[state];
}

export function getStatePosition(state: BarometerState): number {
  const positions: Record<BarometerState, number> = {
    hardened_ahrimanic: 0,
    tilting_ahrimanic: 1,
    centered: 2,
    tilting_luciferic: 3,
    dispersed_luciferic: 4,
  };
  return positions[state];
}
