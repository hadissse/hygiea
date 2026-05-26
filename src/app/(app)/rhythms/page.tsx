'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCosmicStamp, type CosmicStamp } from '@/lib/cosmicStamp';
import { getCosmicYear, getSeasonDescription, type CosmicYear } from '@/lib/cosmicYear';

const SEASON_LABELS = {
  spring: 'Spring · Easter to St John\'s',
  summer: 'Summer · St John\'s to Michaelmas',
  autumn: 'Autumn · Michaelmas to Holy Nights',
  winter: 'Winter · Holy Nights to Easter',
};

const SEASON_BG = {
  spring: 'rgba(201,168,76,0.08)',
  summer: 'rgba(46,80,128,0.08)',
  autumn: 'rgba(139,46,46,0.08)',
  winter: 'rgba(30,58,95,0.1)',
};

const SEASON_COLOR = {
  spring: 'var(--color-gold-soft)',
  summer: 'var(--color-cosmic-blue-soft)',
  autumn: 'var(--color-iron-red)',
  winter: 'var(--color-cosmic-blue)',
};

function YearArc({ cosmic }: { cosmic: CosmicYear }) {
  // Visual arc showing the 4 quadrants, today's position
  const totalDays = 365;
  const thresholds = [
    { label: 'Easter', date: cosmic.thresholdDates.easter },
    { label: "St John's", date: cosmic.thresholdDates.stJohns },
    { label: 'Michaelmas', date: cosmic.thresholdDates.michaelmas },
    { label: 'Holy Nights', date: cosmic.thresholdDates.christmas },
  ];

  const now = new Date();
  const yearStart = new Date(now.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((now.getTime() - yearStart.getTime()) / 86400000);
  const todayPercent = (dayOfYear / totalDays) * 100;

  return (
    <div className="mb-6">
      {/* Arc track */}
      <div className="relative h-2 rounded-full mb-3" style={{ background: 'rgba(28,25,23,0.08)' }}>
        {/* Seasonal segments */}
        {['spring', 'summer', 'autumn', 'winter'].map((s, i) => (
          <div
            key={s}
            className="absolute top-0 h-full rounded-full opacity-40"
            style={{
              left: `${i * 25}%`,
              width: '25%',
              background: SEASON_COLOR[s as keyof typeof SEASON_COLOR],
            }}
          />
        ))}
        {/* Today marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2"
          style={{
            left: `${Math.min(todayPercent, 97)}%`,
            background: 'var(--color-ink)',
            borderColor: 'var(--color-cream)',
          }}
        />
      </div>
      {/* Threshold labels */}
      <div className="flex justify-between text-[9px] text-ink-muted">
        {thresholds.map((t) => (
          <div key={t.label} className="text-center">
            <div>{t.label}</div>
            <div style={{ opacity: 0.6 }}>
              {t.date.toLocaleDateString('en', { month: 'short', day: 'numeric' })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RhythmsPage() {
  const [stamp, setStamp] = useState<CosmicStamp | null>(null);
  const [cosmic, setCosmic] = useState<CosmicYear | null>(null);

  useEffect(() => {
    setStamp(getCosmicStamp());
    setCosmic(getCosmicYear());
  }, []);

  if (!cosmic || !stamp) return null;

  const seasonBg = SEASON_BG[cosmic.quadrant];
  const seasonColor = SEASON_COLOR[cosmic.quadrant];

  return (
    <div className="pb-28 px-5 pt-6 max-w-[430px] mx-auto">
      <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-1">
        Rhythms
      </div>
      <h1 className="font-serif text-[1.75rem] text-ink leading-tight mb-5">
        The Cosmic Year
      </h1>

      {/* Year arc */}
      {cosmic && <YearArc cosmic={cosmic} />}

      {/* Current season */}
      <div
        className="rounded-[18px] p-4 mb-4"
        style={{ background: seasonBg }}
      >
        <div
          className="text-[10px] font-medium tracking-widest uppercase mb-1"
          style={{ color: seasonColor }}
        >
          {SEASON_LABELS[cosmic.quadrant]}
        </div>
        <div className="font-serif text-base text-ink mb-1">
          Week {cosmic.weekInSeason} of the {cosmic.quadrant} · {cosmic.pole === 'outbreath' ? 'Outbreath' : 'Inbreath'}
        </div>
        <p className="text-sm text-ink-muted leading-[1.6]">
          {getSeasonDescription(cosmic.quadrant)}
        </p>
      </div>

      {/* Next threshold */}
      <div
        className="rounded-[18px] p-4 mb-4"
        style={{ background: 'rgba(28,25,23,0.04)' }}
      >
        <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-1">
          Next threshold
        </div>
        <div className="font-serif text-base text-ink">
          {cosmic.nextThresholdLabel}
        </div>
        <div className="text-sm text-ink-muted mt-0.5">
          {cosmic.nextThresholdDate.toLocaleDateString('en', { day: 'numeric', month: 'long' })} · {cosmic.daysToNextThreshold} days from now
        </div>
      </div>

      {/* Day ruler */}
      <div
        className="rounded-[18px] p-4 mb-4"
        style={{ background: 'rgba(28,25,23,0.04)' }}
      >
        <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-1">
          Today
        </div>
        <div className="font-serif text-base text-ink">{stamp.dayRuler}</div>
        <div className="text-sm text-ink-muted mt-0.5">
          {stamp.moonPhase} · {stamp.sunPosition}
        </div>
      </div>

      {/* Michaelmas */}
      {cosmic.isMichaelmasSeason && (
        <Link href="/michael" className="block mb-4">
          <div
            className="rounded-[18px] p-4"
            style={{ background: 'var(--color-iron-red)', color: 'var(--color-cream)' }}
          >
            <div
              className="text-[10px] font-medium tracking-widest uppercase mb-1"
              style={{ color: 'rgba(245,242,234,0.6)' }}
            >
              Seasonal surface
            </div>
            <div className="font-serif text-base mb-0.5">Michael's Season</div>
            <div className="text-sm" style={{ color: 'rgba(245,242,234,0.7)' }}>
              The iron threshold · Aug 15 – Nov 11
            </div>
            <div
              className="text-xs font-medium mt-2"
              style={{ color: 'rgba(245,242,234,0.8)' }}
            >
              Enter →
            </div>
          </div>
        </Link>
      )}

      {/* Transits link */}
      <Link href="/explore/great-transits" className="block mb-4">
        <div
          className="rounded-[18px] p-4"
          style={{ background: 'rgba(28,25,23,0.04)' }}
        >
          <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-1">
            Biographical
          </div>
          <div className="font-serif text-base text-ink">Great Transits</div>
          <div className="text-sm text-ink-muted mt-0.5">
            Jupiter return · Saturn opposition · Uranus opposition
          </div>
          <div className="text-xs font-medium mt-2" style={{ color: 'var(--color-cosmic-blue)' }}>
            Open →
          </div>
        </div>
      </Link>

      {/* Constitution link — biographical phase */}
      <Link href="/constitution" className="block">
        <div
          className="rounded-[18px] p-4"
          style={{ background: 'rgba(30,58,95,0.06)' }}
        >
          <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-1">
            Biographical arc
          </div>
          <div className="font-serif text-base text-ink">Seven-Year Phases</div>
          <div className="text-sm text-ink-muted mt-0.5">Your current phase and what it calls for</div>
          <div className="text-xs font-medium mt-2" style={{ color: 'var(--color-cosmic-blue)' }}>
            Open →
          </div>
        </div>
      </Link>
    </div>
  );
}
