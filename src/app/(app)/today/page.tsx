'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCosmicStamp, type CosmicStamp } from '@/lib/cosmicStamp';
import { loadBarometer, type BarometerReading, getStateLabel, getStatePosition } from '@/lib/barometer';
import { getTodayExercise, isTodayComplete, type TodayExercise } from '@/lib/exerciseCycle';

// ─── Soul Quality picker ──────────────────────────────────────────────────────
const SOUL_QUALITIES = [
  { id: 'clarity',     label: 'Clarity',     member: 'Thinking soul' },
  { id: 'warmth',      label: 'Warmth',      member: 'Feeling soul' },
  { id: 'resolve',     label: 'Resolve',     member: 'Willing soul' },
  { id: 'openness',    label: 'Openness',    member: 'Consciousness soul' },
  { id: 'equanimity',  label: 'Equanimity',  member: 'Balance' },
  { id: 'positivity',  label: 'Positivity',  member: 'Etheric radiance' },
];

const QUALITY_KEY = 'hygiea.today-quality.v1';

function todayISO() {
  return new Date().toISOString().split('T')[0];
}

function getDayGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning.';
  if (h < 17) return 'Good afternoon.';
  return 'Good evening.';
}

// ─── Barometer arc ────────────────────────────────────────────────────────────

function BarometerWidget({ reading }: { reading: BarometerReading | null }) {
  const pos = reading ? getStatePosition(reading.state) : 2;
  const label = reading ? getStateLabel(reading.state) : 'Not yet read';
  const direction = reading?.direction ?? 'Complete your Rückschau to calibrate.';

  const dots = [0, 1, 2, 3, 4];
  const colors = ['#8B2E2E', '#C47A5A', '#C9A84C', '#7E9AB0', '#1E3A5F'];
  const bgColors = ['rgba(139,46,46,0.08)', 'rgba(196,122,90,0.08)', 'rgba(201,168,76,0.08)', 'rgba(126,154,176,0.08)', 'rgba(30,58,95,0.08)'];

  return (
    <div
      className="rounded-[18px] p-4"
      style={{ background: bgColors[pos] }}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-0.5">
            Soul Barometer
          </div>
          <div className="font-serif text-base text-ink">{label}</div>
        </div>
        <div className="flex gap-1.5">
          {dots.map((i) => (
            <div
              key={i}
              className="rounded-full transition-all"
              style={{
                width: i === pos ? 10 : 6,
                height: i === pos ? 10 : 6,
                background: i === pos ? colors[pos] : 'rgba(28,25,23,0.15)',
              }}
            />
          ))}
        </div>
      </div>
      <p className="text-sm text-ink-soft leading-[1.6]">{direction}</p>
      {reading?.guardian && (
        <p className="text-xs text-ink-muted mt-2 leading-[1.6] italic">{reading.guardian}</p>
      )}
    </div>
  );
}

// ─── Exercise strip ────────────────────────────────────────────────────────────

function ExerciseStrip({ todayEx, complete }: { todayEx: TodayExercise; complete: boolean }) {
  return (
    <Link href="/today/exercise" className="block">
      <div
        className="rounded-[18px] p-4 flex items-start gap-3"
        style={{
          background: complete
            ? 'rgba(201,168,76,0.1)'
            : 'rgba(30,58,95,0.06)',
          border: complete ? '1px solid rgba(201,168,76,0.3)' : '1px solid transparent',
        }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-serif text-sm font-medium"
          style={{
            background: complete ? 'var(--color-gold-soft)' : 'var(--color-cosmic-blue)',
            color: 'white',
          }}
        >
          {todayEx.isRestDay ? '○' : todayEx.exercise.id}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-0.5">
            {todayEx.isRestDay ? 'Rest — Harmony' : `Exercise ${todayEx.exercise.id} · Through the day`}
          </div>
          <div className="font-serif text-base text-ink">{todayEx.exercise.name}</div>
          <div className="text-sm text-ink-muted mt-1 leading-[1.55]">{todayEx.exercise.dayCompass}</div>
          {!complete && (
            <div className="text-xs font-medium mt-2" style={{ color: 'var(--color-cosmic-blue)' }}>
              Open practice →
            </div>
          )}
          {complete && (
            <div className="text-xs font-medium mt-2" style={{ color: 'var(--color-gold-soft)' }}>
              ✓ Practice complete
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TodayPage() {
  const [stamp, setStamp] = useState<CosmicStamp | null>(null);
  const [barometer, setBarometer] = useState<BarometerReading | null>(null);
  const [todayEx, setTodayEx] = useState<TodayExercise | null>(null);
  const [exerciseComplete, setExerciseComplete] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState<string | null>(null);

  useEffect(() => {
    setStamp(getCosmicStamp());
    setBarometer(loadBarometer());
    const te = getTodayExercise();
    setTodayEx(te);
    setExerciseComplete(isTodayComplete());

    // Load today's quality
    try {
      const raw = localStorage.getItem(QUALITY_KEY);
      if (raw) {
        const { date, quality } = JSON.parse(raw);
        if (date === todayISO()) setSelectedQuality(quality);
      }
    } catch {}
  }, []);

  function setQuality(id: string) {
    setSelectedQuality(id);
    try {
      localStorage.setItem(QUALITY_KEY, JSON.stringify({ date: todayISO(), quality: id }));
    } catch {}
  }

  const greeting = getDayGreeting();

  return (
    <div className="pb-28 flex flex-col">

      {/* ── Morning header ── */}
      <div
        className="px-5 pt-6 pb-5"
        style={{ background: 'linear-gradient(180deg, rgba(30,58,95,0.05) 0%, transparent 100%)' }}
      >
        <div className="text-[11px] text-ink-muted font-medium tracking-widest uppercase mb-1">
          {stamp ? stamp.dayRuler : '—'}
        </div>
        <h1 className="font-serif text-[2rem] text-ink leading-tight">{greeting}</h1>
        {stamp && (
          <div className="mt-2 text-sm text-ink-muted">
            {stamp.moonPhase} · {stamp.sunPosition}
          </div>
        )}
      </div>

      <div className="px-5 flex flex-col gap-4 mt-2">

        {/* ── Soul Barometer ── */}
        <BarometerWidget reading={barometer} />

        {/* ── Divider ── */}
        <div
          className="text-[10px] font-medium tracking-widest uppercase text-ink-muted/60 pt-1"
        >
          Today's practice
        </div>

        {/* ── Exercise of the day ── */}
        {todayEx && (
          <ExerciseStrip todayEx={todayEx} complete={exerciseComplete} />
        )}

        {/* ── Soul quality morning pick ── */}
        <div>
          <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-2.5">
            Quality of soul — this morning
          </div>
          <div className="flex flex-wrap gap-2">
            {SOUL_QUALITIES.map((q) => {
              const sel = selectedQuality === q.id;
              return (
                <button
                  key={q.id}
                  onClick={() => setQuality(q.id)}
                  className="px-3.5 py-1.5 rounded-full text-sm transition-all"
                  style={{
                    background: sel ? 'var(--color-cosmic-blue)' : 'rgba(28,25,23,0.06)',
                    color: sel ? 'white' : 'var(--color-ink)',
                    border: sel ? 'none' : '1px solid var(--color-rule-soft)',
                  }}
                >
                  {q.label}
                </button>
              );
            })}
          </div>
          {selectedQuality && (
            <div className="text-xs text-ink-muted mt-2">
              {SOUL_QUALITIES.find((q) => q.id === selectedQuality)?.member}
            </div>
          )}
        </div>

        {/* ── Divider ── */}
        <div className="border-t" style={{ borderColor: 'var(--color-rule-soft)' }} />

        {/* ── Chart — your constitution ── */}
        <Link href="/constitution" className="block">
          <div
            className="rounded-[18px] p-4"
            style={{ background: 'rgba(30,58,95,0.05)' }}
          >
            <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-1">
              Your constitution
            </div>
            <div className="font-serif text-base text-ink">Natal chart & spirit-soul profile</div>
            <div className="text-sm text-ink-muted mt-1">
              Temperament · Biographical phase · Ninefold being
            </div>
            <div className="text-xs font-medium mt-2.5" style={{ color: 'var(--color-cosmic-blue)' }}>
              Open →
            </div>
          </div>
        </Link>

        {/* ── Log a moment ── */}
        <Link href="/log" className="block">
          <div
            className="rounded-[18px] p-4 flex items-center gap-3"
            style={{ background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.2)' }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--color-gold-soft)' }}
            >
              <span className="text-white text-base leading-none">+</span>
            </div>
            <div>
              <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-0.5">
                Event log
              </div>
              <div className="font-serif text-base text-ink">Note a moment</div>
            </div>
          </div>
        </Link>

        {/* ── Divider ── */}
        <div className="border-t" style={{ borderColor: 'var(--color-rule-soft)' }} />

        {/* ── Evening — The Rückschau ── */}
        <Link href="/evening" className="block">
          <div
            className="rounded-[18px] p-4"
            style={{ background: '#1C1917', color: 'var(--color-cream)' }}
          >
            <div
              className="text-[10px] font-medium tracking-widest uppercase mb-1"
              style={{ color: 'rgba(245,242,234,0.5)' }}
            >
              Evening · The Rückschau
            </div>
            <div className="font-serif text-base" style={{ color: 'var(--color-cream)' }}>
              Walk the day in reverse.
            </div>
            <div className="text-sm mt-1" style={{ color: 'rgba(245,242,234,0.6)' }}>
              Five steps. Four minutes. A gentle backward review.
            </div>
            <div
              className="text-xs font-medium mt-2.5"
              style={{ color: 'var(--color-gold-soft)' }}
            >
              Begin when ready →
            </div>
          </div>
        </Link>

      </div>
    </div>
  );
}
