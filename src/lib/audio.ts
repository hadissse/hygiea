// Bowl tone audio — Web Audio API, no external library.
// Off by default. Single toggle stored in localStorage.
// Fires at: threshold crossing, Rückschau completion, seasonal threshold days.
// Total synthesized sound — no audio files fetched.

const AUDIO_KEY = 'hygiea.audio_enabled';

export function isAudioEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  try { return localStorage.getItem(AUDIO_KEY) === 'true'; } catch { return false; }
}

export function setAudioEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(AUDIO_KEY, enabled ? 'true' : 'false'); } catch {}
}

// Returns or creates the shared AudioContext.
// Browsers require a user gesture before context can start; callers should invoke
// this from inside click/touch handlers.
let _ctx: AudioContext | null = null;
function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    if (!_ctx) _ctx = new AudioContext();
    if (_ctx.state === 'suspended') _ctx.resume();
    return _ctx;
  } catch {
    return null;
  }
}

// Synthesise a bowl-like tone using two oscillators + gain envelope.
// frequency: fundamental (Hz), e.g. 432
// attackTime: envelope attack (s)
// decayTime: envelope decay/release (s)
function playBowlTone(
  frequency: number,
  attackTime: number,
  decayTime: number,
  volume = 0.18,
): void {
  const ctx = getContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Master gain
  const master = ctx.createGain();
  master.gain.setValueAtTime(0, now);
  master.gain.linearRampToValueAtTime(volume, now + attackTime);
  master.gain.exponentialRampToValueAtTime(0.0001, now + attackTime + decayTime);
  master.connect(ctx.destination);

  // Fundamental oscillator
  const osc1 = ctx.createOscillator();
  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(frequency, now);
  osc1.connect(master);
  osc1.start(now);
  osc1.stop(now + attackTime + decayTime + 0.1);

  // Slight harmonic shimmer (5th above, quieter)
  const shimmerGain = ctx.createGain();
  shimmerGain.gain.setValueAtTime(0.08, now);
  shimmerGain.connect(master);

  const osc2 = ctx.createOscillator();
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(frequency * 1.5, now);
  osc2.connect(shimmerGain);
  osc2.start(now);
  osc2.stop(now + attackTime + decayTime + 0.1);

  // High partial (2nd harmonic) for brightness
  const highGain = ctx.createGain();
  highGain.gain.setValueAtTime(0.04, now);
  highGain.connect(master);

  const osc3 = ctx.createOscillator();
  osc3.type = 'sine';
  osc3.frequency.setValueAtTime(frequency * 2, now);
  osc3.connect(highGain);
  osc3.start(now);
  osc3.stop(now + attackTime + decayTime * 0.5 + 0.1);
}

// ── Public API ───────────────────────────────────────────────────────────────

export function playThresholdTone(): void {
  if (!isAudioEnabled()) return;
  // Single clear bowl strike — D natural (432 Hz tuning)
  playBowlTone(288, 0.02, 4.0, 0.2);
}

export function playRuckschauComplete(): void {
  if (!isAudioEnabled()) return;
  // Softer, lower, longer decay — evening close
  playBowlTone(216, 0.04, 6.0, 0.15);
}

export function playSeasonalThreshold(): void {
  if (!isAudioEnabled()) return;
  // Two bowls in sequence — a minor third apart
  playBowlTone(288, 0.02, 3.5, 0.18);
  setTimeout(() => playBowlTone(345.6, 0.02, 5.0, 0.14), 800);
}

export function playExerciseComplete(): void {
  if (!isAudioEnabled()) return;
  // Short, bright — acknowledgement without fanfare
  playBowlTone(432, 0.01, 1.8, 0.12);
}
