'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { AstralChart } from '@/lib/chartCalculator';
import { FIXED_STARS, findStarConjunctions, starLongitudeAtJD, fixedStarSlug, type StarConjunction } from '@/content/fixedStars';
import { FrameworkLabel } from '@/components/FrameworkLabel';
import { STORAGE_KEYS } from '@/lib/storageKeys';

const ZODIAC_SIGNS_AR = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];


function lonToSignDeg(lon: number): string {
  const n = ((lon % 360) + 360) % 360;
  const sign = Math.floor(n / 30);
  const deg = Math.floor(n % 30);
  return `${ZODIAC_SIGNS_AR[sign]} ${deg}°`;
}

type FilterKey = 'active' | 'all';

export default function FixedStarsPage() {
  const [chart, setChart] = useState<AstralChart | null>(null);
  const [filter, setFilter] = useState<FilterKey>('active');
  const [conjunctions, setConjunctions] = useState<StarConjunction[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CHART);
      if (raw) {
        const parsed: AstralChart = JSON.parse(raw);
        setChart(parsed);
        const jd = typeof parsed.timestamp === 'number' ? parsed.timestamp + 2451545.0 : 2451545.0;
        setConjunctions(findStarConjunctions(parsed as unknown as Record<string, { longitude: number; name: string }>, jd, 3));
      }
    } catch {
      // no chart
    }
  }, []);

  const activeStarKeys = new Set(conjunctions.map((c) => c.star.name));

  const visibleStars = filter === 'active' && conjunctions.length > 0
    ? FIXED_STARS.filter((s) => activeStarKeys.has(s.name))
    : FIXED_STARS;

  return (
    <div className="max-w-[430px] mx-auto w-full pb-28" dir="ltr">
      <div className="px-5 pt-6 pb-3">
        <h1 className="font-serif text-2xl text-ink">Fixed Stars</h1>
        <p className="text-[13px] text-ink-muted mt-1.5 leading-[1.7]">
          Fixed stars precess ~1° every 72 years.
        </p>
      </div>

      <div className="flex gap-2 px-5 pt-1 pb-3">
        {([['active', 'Active in My Chart'], ['all', 'All']] as [FilterKey, string][]).map(([k, label]) => (
          <button
            key={k}
            onClick={() => setFilter(k)}
            className="px-3.5 py-2 rounded-full text-xs font-medium transition-colors"
            style={{
              background: filter === k ? '#171B3A' : '#fff',
              border: filter === k ? 'none' : '1px solid #E8E2D2',
              color: filter === k ? '#fff' : '#171B3A',
            }}
          >
            {label}
            {k === 'active' && conjunctions.length > 0 && (
              <span className="mr-1 opacity-60">({conjunctions.length})</span>
            )}
          </button>
        ))}
      </div>

      {filter === 'active' && conjunctions.length === 0 && !chart && (
        <p className="text-sm text-ink-muted px-5">Load your chart to see conjunctions.</p>
      )}

      {filter === 'active' && chart && conjunctions.length === 0 && (
        <p className="text-sm text-ink-muted px-5">No conjunctions within the standard orb for this chart.</p>
      )}

      <div className="px-5 flex flex-col gap-2">
        {visibleStars.map((star) => {
          const conj = conjunctions.filter((c) => c.star.name === star.name);
          const isActive = conj.length > 0;
          const jd = chart && typeof chart.timestamp === 'number' ? chart.timestamp + 2451545.0 : 2451545.0;
          const currentLon = starLongitudeAtJD(star, jd);
          const slug = fixedStarSlug(star.name);

          return (
            <Link
              key={star.name}
              href={`/self/fixed-stars/${slug}`}
              className="block"
            >
            <div
              className="bg-white rounded-[14px] p-3.5 flex flex-col gap-2"
              style={{ border: isActive ? '1.5px solid #E9785E' : '1px solid #E8E2D2' }}
            >
              <div className="flex gap-3.5 items-start">
                <div className="w-9 h-9 rounded-full bg-cream-soft flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[15px]" style={{ color: isActive ? '#E9785E' : '#5C5C7A' }}>
                    ✦
                  </span>
                </div>
                <div className="flex-1">
                  <div className="font-serif text-base text-ink font-medium">{star.name}</div>
                  <div className="text-[11px] text-ink-muted mt-0.5">
                    <span>{star.bayerDesignation}</span>
                    <span className="mx-1 opacity-40">·</span>
                    {star.name}
                    <span className="mx-1 opacity-40">·</span>
                    {star.bayerDesignation}
                  </div>
                </div>
                <div className="text-end shrink-0">
                  <div className="text-xs text-ink font-serif">{lonToSignDeg(currentLon)}</div>
                  <div className="text-[10px] text-ink-muted mt-0.5">mag {star.magnitude.toFixed(1)}</div>
                </div>
              </div>

              {/* Conjunctions with natal planets */}
              {conj.length > 0 && (
                <div className="flex flex-col gap-1 pt-1 border-t border-rule-soft">
                  {conj.map((c) => (
                    <div key={c.planet} className="flex justify-between items-center">
                      <span className="text-xs text-coral font-semibold">
                        Conjunct {c.planet}
                      </span>
                      <span className="text-[11px] text-ink-muted">
                        orb {c.orb}°
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            </Link>
          );
        })}
      </div>

<Link href="/self" className="flex items-center gap-2 px-5 pb-6 text-sm text-coral font-medium">
        Back to Chart ›
      </Link>
    </div>
  );
}
