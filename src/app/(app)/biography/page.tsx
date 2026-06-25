'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ZoomableWheel } from '@/components/ZoomableWheel';
import type { AstralChart } from '@/lib/chartCalculator';

interface BirthData {
  name?: string;
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  place?: string;
  lat?: number;
  lng?: number;
  utcOffsetHours?: number;
}

const CHAPTER_META = [
  {
    num: 1,
    title: 'The Arc',
    subtitle: 'Body, Soul & Spirit Constitution',
    href: '/biography/chapter1',
    planets: ['sun', 'moon', 'asc'] as const,
    label: (chart: AstralChart) =>
      `Sun in ${chart.sun.sign} · Moon in ${chart.moon.sign} · ASC ${signFromLongitude(chart.asc)}`,
  },
  {
    num: 2,
    title: 'The Seven Spheres',
    subtitle: 'Classical Planetary Forces',
    href: '/biography/chapter2',
    label: (chart: AstralChart) =>
      `Sun ${chart.sun.sign} · Moon ${chart.moon.sign} · Mercury ${chart.mercury.sign} · Venus ${chart.venus.sign} · Mars ${chart.mars.sign} · Jupiter ${chart.jupiter.sign} · Saturn ${chart.saturn.sign}`,
  },
  {
    num: 3,
    title: 'The Outer Spheres',
    subtitle: 'Uranus, Neptune & Pluto',
    href: '/biography/chapter3',
    label: (chart: AstralChart) =>
      `Uranus in ${chart.uranus.sign} · Neptune in ${chart.neptune.sign} · Pluto in ${chart.pluto.sign}`,
  },
  {
    num: 4,
    title: 'The Nodal Axis & Sacred Wound',
    subtitle: 'North Node, South Node & Chiron',
    href: '/biography/chapter4',
    label: (chart: AstralChart) =>
      `North Node ${chart.northNode.sign} · South Node ${chart.southNode.sign} · Chiron ${chart.chiron.sign}`,
  },
  {
    num: 5,
    title: 'Aspects & Configurations',
    subtitle: 'Planetary Relationships',
    href: '/biography/chapter5',
    label: (chart: AstralChart) =>
      `Sun ${chart.sun.sign} · Moon ${chart.moon.sign} · Dominant themes emerging from aspect patterns`,
  },
  {
    num: 6,
    title: "The I's Mission",
    subtitle: 'Purpose, Vocation & Destiny',
    href: '/biography/chapter6',
    label: (chart: AstralChart) =>
      `MC ${signFromLongitude(chart.mc)} · Sun ${chart.sun.sign} · North Node ${chart.northNode.sign}`,
  },
] as const;

const ZODIAC_NAMES = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

function signFromLongitude(lon: number): string {
  const idx = Math.floor(((lon % 360) + 360) % 360 / 30);
  return ZODIAC_NAMES[idx] ?? '';
}

function formatBirthDate(bd: BirthData): string {
  if (!bd.year || !bd.month || !bd.day) return '';
  const d = new Date(bd.year, bd.month - 1, bd.day);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatBirthTime(bd: BirthData): string {
  if (bd.hour == null || bd.minute == null) return '';
  const h = String(bd.hour).padStart(2, '0');
  const m = String(bd.minute).padStart(2, '0');
  return `${h}:${m}`;
}

const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI'] as const;

export default function BiographyPage() {
  const [chart, setChart] = useState<AstralChart | null>(null);
  const [birthData, setBirthData] = useState<BirthData | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('hygiea.primary-chart.v1');
      if (raw) setChart(JSON.parse(raw) as AstralChart);
    } catch {
      // ignore
    }
    try {
      const raw = localStorage.getItem('hygiea.birth-data');
      if (raw) setBirthData(JSON.parse(raw) as BirthData);
    } catch {
      // ignore
    }
  }, []);

  const name = birthData?.name ?? 'Your Chart';

  return (
    <div className="min-h-screen bg-[#FAF6EF] pb-16">
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="px-5 pt-8 pb-4">
        <p className="text-[11px] font-semibold tracking-widest text-ink-muted uppercase mb-1">
          Cosmological Biography
        </p>
        <h1 className="font-serif text-3xl text-ink leading-tight">{name}</h1>
        {birthData && (
          <p className="text-sm text-ink-muted mt-1">
            {formatBirthDate(birthData)}
            {formatBirthTime(birthData) && <> · {formatBirthTime(birthData)}</>}
            {birthData.place && <> · {birthData.place}</>}
          </p>
        )}
      </div>

      {/* ── Natal Chart Wheel ──────────────────────────────────────────────── */}
      {chart && (
        <div className="px-2 mb-6 flex justify-center">
          <ZoomableWheel size={380} tone="paper" chart={chart} showHouses />
        </div>
      )}

      {!chart && (
        <div
          className="mx-5 mb-6 bg-white rounded-[18px] border border-[#E5E1D8] flex items-center justify-center"
          style={{ height: 320 }}
        >
          <p className="text-sm text-ink-muted text-center px-8">
            No natal chart found.{' '}
            <Link href="/settings" className="underline text-ink">
              Set up your birth data
            </Link>{' '}
            to generate your biography.
          </p>
        </div>
      )}

      {/* ── Chapter Cards ─────────────────────────────────────────────────── */}
      <div className="px-5 space-y-3">
        <p className="text-[11px] font-semibold tracking-widest text-ink-muted uppercase mb-3">
          Six Chapters
        </p>

        {CHAPTER_META.map((ch) => (
          <Link key={ch.num} href={ch.href} className="block group">
            <div className="bg-white rounded-[18px] border border-[#E5E1D8] px-5 py-4 transition-shadow group-hover:shadow-md">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-semibold tracking-widest text-ink-muted uppercase font-mono">
                      {ROMAN[ch.num]}
                    </span>
                    <h2 className="font-serif text-[17px] text-ink leading-tight">{ch.title}</h2>
                  </div>
                  <p className="text-[12px] text-ink-muted mb-2">{ch.subtitle}</p>
                  {chart && (
                    <p className="text-[11px] text-ink-muted leading-relaxed line-clamp-2">
                      {ch.label(chart)}
                    </p>
                  )}
                </div>
                <div className="shrink-0 text-ink-muted text-lg mt-0.5 group-hover:translate-x-0.5 transition-transform">
                  →
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Practitioner Report Link ───────────────────────────────────────── */}
      <div className="px-5 mt-8">
        <div className="bg-white rounded-[18px] border border-[#E5E1D8] px-5 py-5">
          <h3 className="font-serif text-[17px] text-ink mb-1">Request a Full Report</h3>
          <p className="text-[13px] text-ink-muted mb-4 leading-relaxed">
            Work with a practitioner to receive a written cosmological biography with
            personalised commentary on your natal chart.
          </p>
          <Link
            href="/reports/new"
            className="inline-flex items-center gap-2 bg-ink text-cream text-[13px] font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
          >
            Begin Report
          </Link>
        </div>
      </div>
    </div>
  );
}
