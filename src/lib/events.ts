import type { CosmicStamp } from './cosmicStamp';
import { STORAGE_KEYS } from './storageKeys';

export type StreamKey = 'thinking' | 'feeling' | 'willing';

export interface LoggedEvent {
  id: string;
  text: string;
  date: string; // ISO
  stream: StreamKey | null;
  rhythm: number | null; // 0 (حرارة/expansion) … 100 (حديد/contraction)
  placement: { type: string; key: string; label: string } | null;
  stamp: CosmicStamp;
}

const STORAGE_KEY = STORAGE_KEYS.EVENTS;

export const STREAM_AR: Record<StreamKey, string> = {
  thinking: 'Thinking',
  feeling: 'Feeling',
  willing: 'Willing',
};

export const STREAM_GLYPH: Record<StreamKey, string> = {
  thinking: '◎',
  feeling: '◌',
  willing: '◆',
};

export function loadEvents(): LoggedEvent[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LoggedEvent[]) : [];
  } catch {
    return [];
  }
}

const MAX_EVENTS = 200;

export function saveEvent(event: LoggedEvent): void {
  if (typeof window === 'undefined') return;
  const events = loadEvents();
  events.unshift(event);
  const toSave = events.slice(0, MAX_EVENTS);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (e) {
    if (e instanceof DOMException && e.name === 'QuotaExceededError') {
      // Storage full — prune to 100 oldest and retry once
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave.slice(0, 100)));
      } catch {
        // Give up — storage is critically full
      }
    }
  }
}

export function getEvent(id: string): LoggedEvent | null {
  return loadEvents().find((e) => e.id === id) ?? null;
}
