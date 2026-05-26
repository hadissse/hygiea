import { EXERCISES, type Exercise } from '@/content/exercises';
import { getSupabase } from './supabase';
import { getUser } from './auth';

export interface ExerciseDay {
  weekStart: string;   // ISO date of Monday
  dayIndex: number;    // 0–5 (0=Monday … 5=Saturday); day 6 (Sunday) is rest
  exerciseId: number;  // 1–6
  completed: boolean;
  reflection: string;
}

export interface TodayExercise {
  exercise: Exercise;
  dayInCycle: number;  // 0–5
  weekStart: string;
  isRestDay: boolean;
}

// Get Monday of the week containing the given date
function getWeekStart(date: Date = new Date()): string {
  const d = new Date(date);
  const day = d.getDay(); // 0=Sun
  const diff = day === 0 ? -6 : 1 - day; // shift to Monday
  d.setDate(d.getDate() + diff);
  return d.toISOString().split('T')[0];
}

// day 0=Mon … 5=Sat → exercise 1–6; Sunday = rest
function dayIndexToExerciseId(dayIndex: number): number {
  return dayIndex + 1; // 0→1, 1→2, …, 5→6
}

export function getTodayExercise(date: Date = new Date()): TodayExercise {
  const weekStart = getWeekStart(date);
  const dow = date.getDay(); // 0=Sun
  const dayIndex = dow === 0 ? -1 : dow - 1; // Sun → -1 (rest day); Mon=0…Sat=5

  if (dayIndex === -1 || dayIndex === 6) {
    // Sunday — rest day; show exercise 6 (Harmony) as reflection prompt
    const exercise = EXERCISES.find((e) => e.id === 6)!;
    return { exercise, dayInCycle: 6, weekStart, isRestDay: true };
  }

  const exerciseId = dayIndexToExerciseId(dayIndex);
  const exercise = EXERCISES.find((e) => e.id === exerciseId)!;
  return { exercise, dayInCycle: dayIndex, weekStart, isRestDay: false };
}

const PROGRESS_KEY = 'hygiea.exercise-progress.v1';

export function loadExerciseProgress(weekStart: string): ExerciseDay[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return [];
    const all = JSON.parse(raw) as Record<string, ExerciseDay[]>;
    return all[weekStart] ?? [];
  } catch {
    return [];
  }
}

export function markExerciseComplete(
  weekStart: string,
  dayIndex: number,
  reflection = '',
): void {
  if (typeof window === 'undefined') return;

  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    const all: Record<string, ExerciseDay[]> = raw ? JSON.parse(raw) : {};
    const week = all[weekStart] ?? [];

    const existing = week.findIndex((d) => d.dayIndex === dayIndex);
    const entry: ExerciseDay = {
      weekStart,
      dayIndex,
      exerciseId: dayIndexToExerciseId(dayIndex),
      completed: true,
      reflection,
    };

    if (existing >= 0) week[existing] = entry;
    else week.push(entry);

    all[weekStart] = week;
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(all));
  } catch {}

  // Fire-and-forget sync
  syncExerciseRemote(weekStart, dayIndex, reflection);
}

export function isTodayComplete(): boolean {
  const { weekStart, dayInCycle, isRestDay } = getTodayExercise();
  if (isRestDay) return false;
  const progress = loadExerciseProgress(weekStart);
  return progress.some((d) => d.dayIndex === dayInCycle && d.completed);
}

async function syncExerciseRemote(
  weekStart: string,
  dayIndex: number,
  reflection: string,
): Promise<void> {
  const sb = getSupabase();
  const user = await getUser();
  if (!sb || !user) return;

  try {
    await sb.from('exercise_progress').upsert(
      {
        user_id: user.id,
        week_start: weekStart,
        day_index: dayIndex,
        exercise_id: dayIndexToExerciseId(dayIndex),
        completed: true,
        reflection,
      },
      { onConflict: 'user_id,week_start,day_index' },
    );
  } catch (e) {
    if (process.env.NODE_ENV === 'development') console.error('syncExercise:', e);
  }
}
