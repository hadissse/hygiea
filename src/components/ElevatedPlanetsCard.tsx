'use client';

import type { AstralChart } from '@/lib/chartCalculator';

interface Props {
  chart: AstralChart;
}

const ANGULAR_HOUSES = new Set([1, 4, 7, 10]);
const HOUSE_NAMES: Record<number, string> = {
  1: '1st House (ASC)',
  4: '4th House (IC)',
  7: '7th House (DSC)',
  10: '10th House (MC)',
};

const PLANET_KEYS = [
  { key: 'sun',      label: 'Sun',      glyph: '☉' },
  { key: 'moon',     label: 'Moon',     glyph: '☽' },
  { key: 'mercury',  label: 'Mercury',  glyph: '☿' },
  { key: 'venus',    label: 'Venus',    glyph: '♀' },
  { key: 'mars',     label: 'Mars',     glyph: '♂' },
  { key: 'jupiter',  label: 'Jupiter',  glyph: '♃' },
  { key: 'saturn',   label: 'Saturn',   glyph: '♄' },
  { key: 'uranus',   label: 'Uranus',   glyph: '♅' },
  { key: 'neptune',  label: 'Neptune',  glyph: '♆' },
  { key: 'pluto',    label: 'Pluto',    glyph: '♇' },
] as const;

function getHouseForLongitude(houses: AstralChart['houses'], longitude: number): number {
  if (!houses || houses.length === 0) return 1;
  const lon = ((longitude % 360) + 360) % 360;
  for (let i = 0; i < 12; i++) {
    const thisStart = ((houses[i].cusp % 360) + 360) % 360;
    const nextStart = ((houses[(i + 1) % 12].cusp % 360) + 360) % 360;
    if (nextStart > thisStart) {
      if (lon >= thisStart && lon < nextStart) return i + 1;
    } else {
      if (lon >= thisStart || lon < nextStart) return i + 1;
    }
  }
  return 1;
}

const ANGULAR_DESCRIPTIONS: Record<number, string> = {
  1: 'Planets on the Ascendant are immediately visible in the person\'s outer manner and physical presence. They are constitutionally "first" — strongly coloring the soul\'s vehicle of entry into life.',
  4: 'Planets at the IC are rooted in the foundations of soul life — the home, ancestry, and the private interior. They operate with quiet depth and often become visible only across decades.',
  7: 'Planets on the Descendant speak to the soul\'s orientation toward the other — what is projected, what is sought in relationship, and what the soul must consciously integrate from its opposite.',
  10: 'Planets at the Midheaven are elevated toward the public sphere. They carry vocational and spiritual prominence, shaping how the soul is called to act in the world.',
};

export function ElevatedPlanetsCard({ chart }: Props) {
  const elevated = PLANET_KEYS
    .map(p => ({
      ...p,
      longitude: (chart[p.key] as { longitude: number; sign: string }).longitude,
      sign: (chart[p.key] as { sign: string }).sign,
      house: getHouseForLongitude(chart.houses, (chart[p.key] as { longitude: number }).longitude),
    }))
    .filter(p => ANGULAR_HOUSES.has(p.house));

  if (elevated.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-sm text-ink-muted font-ui">
          No planets are currently in angular houses (1st, 4th, 7th, or 10th).
        </p>
        <p className="text-[11px] text-ink-muted font-ui mt-2">
          This is uncommon — consider recalculating with a precise birth time.
        </p>
      </div>
    );
  }

  // Group by house
  const byHouse: Record<number, typeof elevated> = {};
  for (const p of elevated) {
    if (!byHouse[p.house]) byHouse[p.house] = [];
    byHouse[p.house].push(p);
  }

  return (
    <div className="space-y-4">
      {Object.entries(byHouse)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([houseStr, planets]) => {
          const house = Number(houseStr);
          return (
            <div key={house} className="rounded-[14px] border border-[#E5E1D8] bg-[#FAF6EF] p-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-ink-muted font-ui">
                  {HOUSE_NAMES[house]}
                </span>
                <div className="flex items-center gap-1.5 ml-auto">
                  {planets.map(p => (
                    <span key={p.key} className="text-base leading-none">{p.glyph}</span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {planets.map(p => (
                  <div
                    key={p.key}
                    className="bg-white rounded-[10px] border border-[#E5E1D8] px-3 py-2 flex items-center gap-2"
                  >
                    <span className="text-base leading-none">{p.glyph}</span>
                    <div>
                      <p className="text-[13px] font-semibold text-ink font-ui">{p.label}</p>
                      <p className="text-[11px] text-ink-muted font-ui">in {p.sign}</p>
                    </div>
                  </div>
                ))}
              </div>

              {ANGULAR_DESCRIPTIONS[house] && (
                <p className="text-sm leading-relaxed text-ink font-ui">
                  {ANGULAR_DESCRIPTIONS[house]}
                </p>
              )}
            </div>
          );
        })}

      <p className="text-[11px] text-ink-muted font-ui">
        Angular planets are constitutionally elevated — they carry particular prominence in the biography.
      </p>
    </div>
  );
}
