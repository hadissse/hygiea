'use client';

// NEVER_AI — All Rückschau prompts and content are human-authored.

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabase } from '@/lib/supabase';
import { getUser } from '@/lib/auth';
import { calculateBarometer, saveBarometer, type BarometerInputs } from '@/lib/barometer';
import { isTodayComplete } from '@/lib/exerciseCycle';

type StreamKey = 'thinking' | 'feeling' | 'willing';

const STREAMS: { key: StreamKey; label: string }[] = [
  { key: 'thinking', label: 'Thinking' },
  { key: 'feeling',  label: 'Feeling' },
  { key: 'willing',  label: 'Willing' },
];

interface RuckschauStep {
  prompt: string;
  subtext: string;
}

const STEPS: RuckschauStep[] = [
  {
    prompt: 'The last moments before now.',
    subtext: 'What did you just come from? Name what you were doing, without interpretation.',
  },
  {
    prompt: 'Mid-evening — something you said or heard.',
    subtext: 'One exchange, one impression. What passed between you and the world?',
  },
  {
    prompt: 'The afternoon — what occupied your hands or your attention.',
    subtext: 'Not what you felt — what you did. What was the activity of the afternoon?',
  },
  {
    prompt: 'The midday threshold.',
    subtext: 'What shifted between morning and afternoon? Note the moment of transition, however small.',
  },
  {
    prompt: 'The first waking hour.',
    subtext: 'What met you when the day began? The first thought, the first weight, the first ease.',
  },
];

function NightStars() {
  return (
    <div className="absolute top-0 inset-x-0 h-[200px] overflow-hidden pointer-events-none" aria-hidden>
      {Array.from({ length: 20 }).map((_, i) => {
        const x = (i * 37) % 380;
        const y = ((i * 53) % 150) + 20;
        const s = (i % 3) + 1;
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{ left: x, top: y, width: s, height: s, background: 'rgba(255,255,255,0.6)' }}
          />
        );
      })}
    </div>
  );
}

export default function EveningPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [entries, setEntries] = useState<string[]>(['', '', '', '', '']);
  const [streams, setStreams] = useState<(StreamKey | null)[]>([null, null, null, null, null]);
  const [done, setDone] = useState(false);

  const setEntry = (v: string) =>
    setEntries((prev) => prev.map((e, i) => (i === step ? v : e)));
  const setStream = (k: StreamKey) =>
    setStreams((prev) => prev.map((s, i) => (i === step ? k : s)));

  async function handleComplete() {
    const today = new Date().toISOString().split('T')[0];

    // Save Rückschau to Supabase
    const sb = getSupabase();
    const user = await getUser();
    if (sb && user) {
      const reverseEntries = entries
        .map((text, i) => ({
          stepIndex: i,
          text: text.trim(),
          stream: streams[i],
          prompt: STEPS[i].prompt,
        }))
        .filter((e) => e.text.length > 0);

      try {
        await sb.from('ruckschau').upsert(
          {
            user_id: user.id,
            date: today,
            reverse_entries: reverseEntries,
            witness_note: null,
          },
          { onConflict: 'user_id,date' },
        );
      } catch (e) {
        if (process.env.NODE_ENV === 'development') console.error('saveRuckschau:', e);
      }
    }

    // Recalculate barometer
    const inputs: BarometerInputs = {
      exercisesCompletedToday: isTodayComplete(),
      lastRuckschauQuality: inferQuality(entries, streams),
    };
    const reading = calculateBarometer(inputs);
    saveBarometer(reading);

    setDone(true);
  }

  function next() {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  }

  return (
    <div
      className="relative min-h-dvh max-w-[430px] mx-auto w-full"
      style={{ background: '#1C1917' }}
    >
      <NightStars />

      <div className="relative px-5 pt-5 pb-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.back()}
            aria-label="Close"
            className="p-1"
            style={{ color: 'rgba(245,242,234,0.7)' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M6 6l12 12M18 6l-12 12" />
            </svg>
          </button>

          <div className="text-[10px] font-medium tracking-widest uppercase" style={{ color: 'var(--color-gold-soft)' }}>
            The Rückschau
          </div>

          {/* Progress dots */}
          <div className="flex gap-1.5 ml-auto">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all"
                style={{
                  width: i === step ? 8 : 5,
                  height: i === step ? 8 : 5,
                  background: i < step ? 'var(--color-gold-soft)' : i === step ? 'var(--color-cream)' : 'rgba(245,242,234,0.2)',
                }}
              />
            ))}
          </div>
        </div>

        {!done ? (
          <>
            {/* Step indicator */}
            <div
              className="text-[10px] font-medium tracking-widest uppercase mb-4"
              style={{ color: 'rgba(245,242,234,0.45)' }}
            >
              Step {step + 1} of {STEPS.length} · Walking backward
            </div>

            {/* Prompt */}
            <h2 className="font-serif text-[1.5rem] leading-[1.4] mb-2" style={{ color: 'var(--color-cream)' }}>
              {STEPS[step].prompt}
            </h2>
            <p className="text-sm leading-[1.7] mb-6" style={{ color: 'rgba(245,242,234,0.6)' }}>
              {STEPS[step].subtext}
            </p>

            {/* Witness instruction */}
            <p className="text-xs italic mb-4" style={{ color: 'rgba(245,242,234,0.35)' }}>
              Name what you noticed — not what it means.
            </p>

            {/* Entry field */}
            <div
              className="rounded-[16px] p-4 mb-4"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              <textarea
                value={entries[step]}
                onChange={(e) => setEntry(e.target.value)}
                autoFocus
                placeholder="One or two lines is enough."
                className="w-full bg-transparent font-serif text-[1.05rem] leading-[1.75] focus:outline-none resize-none placeholder:text-cream/30"
                style={{ color: 'var(--color-cream)', minHeight: 80 }}
                rows={3}
              />
            </div>

            {/* Stream selector */}
            <div className="flex gap-2 mb-8">
              {STREAMS.map((s) => {
                const sel = streams[step] === s.key;
                return (
                  <button
                    key={s.key}
                    onClick={() => setStream(s.key)}
                    className="flex-1 py-2 rounded-full text-sm transition-all"
                    style={{
                      background: sel ? 'rgba(245,242,234,0.15)' : 'rgba(255,255,255,0.05)',
                      color: sel ? 'var(--color-cream)' : 'rgba(245,242,234,0.45)',
                      border: sel ? '1px solid rgba(245,242,234,0.3)' : '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>

            {/* Next */}
            <button
              onClick={next}
              className="w-full h-[52px] rounded-[26px] font-medium text-base transition-colors"
              style={{
                background: 'var(--color-cream)',
                color: 'var(--color-ink)',
                opacity: 1,
              }}
            >
              {step < STEPS.length - 1 ? 'Continue backward' : 'Complete the Rückschau'}
            </button>

            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="w-full mt-3 text-sm"
                style={{ color: 'rgba(245,242,234,0.4)' }}
              >
                ← Go back one step
              </button>
            )}
          </>
        ) : (
          /* Completion */
          <div className="mt-12 text-center px-4">
            <div
              className="mx-auto w-[90px] h-[90px] rounded-full mb-8"
              style={{ background: 'radial-gradient(circle at 35% 35%, rgba(201,168,76,0.4), rgba(30,58,95,0.6))' }}
            />
            <h2 className="font-serif text-[1.75rem] leading-[1.4] mb-3" style={{ color: 'var(--color-cream)' }}>
              The day is complete.
            </h2>
            <p className="text-sm leading-[1.7] mb-8" style={{ color: 'rgba(245,242,234,0.6)' }}>
              You have walked backward through what was. The Barometer has been updated. Rest now.
            </p>
            <button
              onClick={() => router.push('/today')}
              className="w-full h-[52px] rounded-[26px] font-medium text-base"
              style={{ background: 'var(--color-cream)', color: 'var(--color-ink)' }}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function inferQuality(
  entries: string[],
  streams: (StreamKey | null)[],
): BarometerInputs['lastRuckschauQuality'] {
  const filled = entries.filter((e) => e.trim().length > 0).length;
  // If mostly willing/thinking → contracted; mostly feeling → scattered; mix → balanced
  const feelingCount = streams.filter((s) => s === 'feeling').length;
  const thinkingCount = streams.filter((s) => s === 'thinking' || s === 'willing').length;

  if (filled < 2) return 'balanced';
  if (feelingCount > thinkingCount + 1) return 'scattered';
  if (thinkingCount > feelingCount + 1) return 'contracted';
  return 'balanced';
}
