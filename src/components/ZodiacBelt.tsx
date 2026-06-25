'use client';

import { useState } from 'react';
import type { AstralChart } from '@/lib/chartCalculator';
import type { FixedStarData } from '@/content/reportData';

interface FixedStarWithLongitude extends FixedStarData {
  longitude: number;
}

interface Props {
  chart: AstralChart;
  fixedStars: FixedStarWithLongitude[];
}

const ZODIAC_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

const ZODIAC_GLYPHS = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];

const PLANET_KEYS = [
  { key: 'sun',      label: 'Sun',     glyph: '☉' },
  { key: 'moon',     label: 'Moon',    glyph: '☽' },
  { key: 'mercury',  label: 'Mercury', glyph: '☿' },
  { key: 'venus',    label: 'Venus',   glyph: '♀' },
  { key: 'mars',     label: 'Mars',    glyph: '♂' },
  { key: 'jupiter',  label: 'Jupiter', glyph: '♃' },
  { key: 'saturn',   label: 'Saturn',  glyph: '♄' },
  { key: 'uranus',   label: 'Uranus',  glyph: '♅' },
  { key: 'neptune',  label: 'Neptune', glyph: '♆' },
  { key: 'pluto',    label: 'Pluto',   glyph: '♇' },
] as const;

function parseTropicalDegree(td: string): number {
  // Format: "7 Taurus 40" → parse degree within sign + sign offset
  const parts = td.trim().split(/\s+/);
  if (parts.length < 2) return 0;
  const deg = parseInt(parts[0], 10) || 0;
  const signStr = parts[1] ?? '';
  const min = parts.length >= 3 ? parseInt(parts[2], 10) : 0;
  const signIdx = ZODIAC_SIGNS.findIndex(s => s.toLowerCase() === signStr.toLowerCase());
  if (signIdx < 0) return deg + min / 60;
  return signIdx * 30 + deg + min / 60;
}

function isConjunct(lon1: number, lon2: number, orb = 2): boolean {
  const diff = Math.abs(((lon1 - lon2 + 540) % 360) - 180);
  return diff <= orb;
}

export function ZodiacBelt({ chart, fixedStars }: Props) {
  const [selectedStar, setSelectedStar] = useState<FixedStarWithLongitude | null>(null);

  // Resolve star longitudes from tropical_degree if longitude is 0
  const starsWithLon = fixedStars.map(s => ({
    ...s,
    longitude: s.longitude !== 0 ? s.longitude : parseTropicalDegree(s.tropical_degree),
  }));

  // Gather planet longitudes
  const planetPositions = PLANET_KEYS.map(p => ({
    ...p,
    longitude: (chart[p.key] as { longitude: number }).longitude,
  }));

  // Stars conjunct any planet (within 2°)
  const conjunctStars = starsWithLon.filter(star =>
    planetPositions.some(p => isConjunct(p.longitude, star.longitude))
  );

  // Group planets by sign
  const bySign: Record<string, typeof planetPositions> = {};
  for (const p of planetPositions) {
    const signIdx = Math.floor(((p.longitude % 360) + 360) % 360 / 30);
    const sign = ZODIAC_SIGNS[signIdx] ?? 'Aries';
    if (!bySign[sign]) bySign[sign] = [];
    bySign[sign].push(p);
  }

  return (
    <div className="space-y-4">
      {/* Sign grid */}
      <div className="grid grid-cols-6 gap-1.5">
        {ZODIAC_SIGNS.map((sign, i) => {
          const planetsHere = bySign[sign] ?? [];
          const starsHere = conjunctStars.filter(s => {
            const idx = Math.floor(((s.longitude % 360) + 360) % 360 / 30);
            return ZODIAC_SIGNS[idx] === sign;
          });

          return (
            <div
              key={sign}
              className={`rounded-[10px] border p-2 text-center ${
                planetsHere.length > 0
                  ? 'border-[#C9922A40] bg-[#C9922A06]'
                  : 'border-[#E5E1D8] bg-white'
              }`}
            >
              <p className="text-base leading-none mb-1">{ZODIAC_GLYPHS[i]}</p>
              <p className="text-[9px] text-ink-muted font-ui leading-none mb-1.5">
                {sign.slice(0, 3)}
              </p>
              {planetsHere.length > 0 && (
                <div className="flex flex-wrap gap-0.5 justify-center">
                  {planetsHere.map(p => (
                    <span key={p.key} className="text-[11px] leading-none">{p.glyph}</span>
                  ))}
                </div>
              )}
              {starsHere.length > 0 && (
                <div className="flex flex-wrap gap-0.5 justify-center mt-0.5">
                  {starsHere.map(star => (
                    <button
                      key={star.star_name}
                      onClick={() => setSelectedStar(selectedStar?.star_name === star.star_name ? null : star)}
                      className="text-[10px] leading-none text-[#C9922A] hover:scale-110 transition-transform"
                      title={star.star_name}
                    >
                      ★
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected star detail */}
      {selectedStar && (
        <div className="rounded-[14px] border border-[#C9922A40] bg-[#C9922A06] p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[13px] font-semibold text-ink font-ui">{selectedStar.star_name}</p>
              <p className="text-[11px] text-ink-muted font-ui">
                {selectedStar.bayer_designation} · {selectedStar.constellation_name} · {selectedStar.tropical_degree}
              </p>
            </div>
            <button
              onClick={() => setSelectedStar(null)}
              className="text-ink-muted text-sm hover:text-ink"
            >
              ✕
            </button>
          </div>
          {selectedStar.interpretation_en && (
            <p className="text-sm leading-relaxed text-ink font-ui">{selectedStar.interpretation_en}</p>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-4 text-[11px] text-ink-muted font-ui">
        <span>☉ planets</span>
        <span className="text-[#C9922A]">★ fixed stars within 2°</span>
      </div>
    </div>
  );
}
