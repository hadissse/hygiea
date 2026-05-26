// AI synthesis layer — Phase 6.
// Privacy constraints enforced here at the function boundary:
//   - No journal text, no reflection text, no Rückschau entries are ever sent.
//   - Only structural context (constitution, barometer state, exercise cycle, season) is sent.
//   - Output is marked with ◇ glyph and stored in localStorage only.
//   - Supabase logs only a context hash + created_at; the text itself never reaches the server.
//   - User must explicitly opt in. Default: off.

import type { BarometerState } from './barometer';
import type { SeasonQuadrant } from './cosmicYear';

const OPT_IN_KEY = 'hygiea.ai_synthesis_enabled';
const CACHE_KEY  = 'hygiea.synthesis_cache.v1';

export interface SynthesisInput {
  constitutionTemperament: string | null;
  constitutionPhase: number | null;
  barometer: BarometerState | null;
  exerciseName: string | null;
  season: SeasonQuadrant | null;
  dayRuler: string | null;
  moonPhase: string | null;
}

export interface SynthesisOutput {
  orientation: string;
  aiMarker: '◇';
  deletable: true;
  generatedAt: string;
  contextHash: string;
}

// ── Opt-in gate ───────────────────────────────────────────────────────────────

export function isSynthesisEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  try { return localStorage.getItem(OPT_IN_KEY) === 'true'; } catch { return false; }
}

export function enableSynthesis(): void {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(OPT_IN_KEY, 'true'); } catch {}
}

export function disableSynthesis(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(OPT_IN_KEY, 'false');
    localStorage.removeItem(CACHE_KEY);
  } catch {}
}

// ── Cache check ───────────────────────────────────────────────────────────────

function loadCachedSynthesis(): SynthesisOutput | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw) as SynthesisOutput;
    // Only valid if generated today
    const today = new Date().toISOString().slice(0, 10);
    if (!cached.generatedAt.startsWith(today)) return null;
    return cached;
  } catch { return null; }
}

function saveCachedSynthesis(output: SynthesisOutput): void {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(output)); } catch {}
}

// ── Context hash (no personal text) ──────────────────────────────────────────

function hashContext(input: SynthesisInput): string {
  const str = [
    input.constitutionTemperament ?? '',
    String(input.constitutionPhase ?? 0),
    input.barometer ?? '',
    input.exerciseName ?? '',
    input.season ?? '',
    input.dayRuler ?? '',
    new Date().toISOString().slice(0, 10),
  ].join('|');
  // Simple deterministic hash — not cryptographic, just for dedup logging
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h).toString(16);
}

// ── Orientation prompt builder ────────────────────────────────────────────────

function buildPrompt(input: SynthesisInput): string {
  const parts: string[] = [
    'You are writing a single paragraph of spiritual orientation — one to three sentences only.',
    'The tone is sober, warm, and phenomenological. No sentimentality, no affirmations, no exhortation.',
    'Write as if addressing a serious practitioner who does not need encouragement, only clarity.',
    'Do not mention the AI, do not apologise, do not explain your method.',
    '',
    'Context (structural only — no personal reflections):',
  ];
  if (input.constitutionTemperament) parts.push(`- Temperament: ${input.constitutionTemperament}`);
  if (input.constitutionPhase) parts.push(`- Biographical phase: ${input.constitutionPhase} (${biographicalPhaseName(input.constitutionPhase)})`);
  if (input.barometer) parts.push(`- Soul barometer: ${input.barometer.replace(/_/g, ' ')}`);
  if (input.exerciseName) parts.push(`- Today's exercise: ${input.exerciseName}`);
  if (input.season) parts.push(`- Season: ${input.season}`);
  if (input.dayRuler) parts.push(`- Day ruler: ${input.dayRuler}`);
  if (input.moonPhase) parts.push(`- Moon phase: ${input.moonPhase}`);
  parts.push('', 'Write the orientation paragraph now:');
  return parts.join('\n');
}

function biographicalPhaseName(phase: number): string {
  const names: Record<number, string> = {
    1: '0–7, physical body',    2: '7–14, etheric body',   3: '14–21, astral body',
    4: '21–28, sentient soul',  5: '28–35, intellectual soul', 6: '35–42, consciousness soul',
    7: '42–49, spirit self',    8: '49–56, life spirit',   9: '56–63, spirit human',
    10: '63+, years of grace',
  };
  return names[phase] ?? 'adult phase';
}

// ── Main synthesis function ───────────────────────────────────────────────────

export async function synthesize(input: SynthesisInput): Promise<SynthesisOutput | null> {
  if (!isSynthesisEnabled()) return null;

  // Return cached output if already generated today
  const cached = loadCachedSynthesis();
  if (cached) return cached;

  const contextHash = hashContext(input);

  try {
    const response = await fetch('/api/synthesis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Send only structural context — never journal, reflection, or Rückschau text
      body: JSON.stringify({ prompt: buildPrompt(input), contextHash }),
    });

    if (!response.ok) return null;

    const data = await response.json() as { text?: string };
    if (!data.text) return null;

    const output: SynthesisOutput = {
      orientation: data.text.trim(),
      aiMarker: '◇',
      deletable: true,
      generatedAt: new Date().toISOString(),
      contextHash,
    };

    saveCachedSynthesis(output);
    return output;
  } catch {
    return null;
  }
}

// ── Delete synthesis output ───────────────────────────────────────────────────

export function deleteSynthesis(): void {
  if (typeof window === 'undefined') return;
  try { localStorage.removeItem(CACHE_KEY); } catch {}
}

export function loadSynthesis(): SynthesisOutput | null {
  return loadCachedSynthesis();
}
