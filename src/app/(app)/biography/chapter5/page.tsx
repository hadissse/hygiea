'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AspectGridSvg, type AspectEntry } from '@/components/AspectGridSvg';
import {
  PLANET_IN_SIGN_MAP,
  PLANET_IN_HOUSE_MAP,
  SPHERE_BY_PLANET,
  FIXED_STARS,
  FIXED_STARS_BY_SIGN,
  ASPECTS,
  EARTH_STARS,
  type PlacementContent,
  type FixedStarData,
} from '@/content/reportData';
import type { AstralChart, HousePosition } from '@/lib/chartCalculator';

// ─── aspect calculation ─────────────────────────────────────────────────────

const ASPECT_DEFINITIONS: { type: string; angle: number; orb: number }[] = [
  { type: 'conjunction', angle: 0,   orb: 8 },
  { type: 'opposition',  angle: 180, orb: 8 },
  { type: 'trine',       angle: 120, orb: 8 },
  { type: 'square',      angle: 90,  orb: 7 },
  { type: 'sextile',     angle: 60,  orb: 5 },
  { type: 'quincunx',    angle: 150, orb: 3 },
];

interface PlanetNode {
  key: string;
  label: string;
  glyph: string;
  longitude: number;
}

function angularDist(a: number, b: number): number {
  const raw = Math.abs(((a - b + 360) % 360));
  return raw > 180 ? 360 - raw : raw;
}

function calculateAspects(planets: PlanetNode[]): AspectEntry[] {
  const found: AspectEntry[] = [];
  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const dist = angularDist(planets[i].longitude, planets[j].longitude);
      for (const def of ASPECT_DEFINITIONS) {
        const orb = Math.abs(dist - def.angle);
        if (orb <= def.orb) {
          found.push({
            p1: planets[i].key,
            p2: planets[j].key,
            type: def.type as AspectEntry['type'],
            orb,
          });
          break;
        }
      }
    }
  }
  return found;
}

// ─── fixed stars ────────────────────────────────────────────────────────────

const SIGN_INDEX: Record<string, number> = {
  Aries: 0, Taurus: 1, Gemini: 2, Cancer: 3, Leo: 4, Virgo: 5,
  Libra: 6, Scorpio: 7, Sagittarius: 8, Capricorn: 9, Aquarius: 10, Pisces: 11,
};

function parseTropicalDegree(td: string): number | null {
  if (!td) return null;
  // Format: "7 Taurus 40" => degree, sign, minute
  const parts = td.trim().split(/\s+/);
  if (parts.length < 2) return null;
  const deg = parseFloat(parts[0]);
  const sign = parts[1];
  const min = parts.length >= 3 ? parseFloat(parts[2]) : 0;
  const signIdx = SIGN_INDEX[sign];
  if (signIdx === undefined || isNaN(deg)) return null;
  return signIdx * 30 + deg + min / 60;
}

interface StarConjunction {
  star: FixedStarData;
  planetKey: string;
  planetLabel: string;
  orb: number;
}

function findStarConjunctions(planets: PlanetNode[], orbDeg = 2): StarConjunction[] {
  const conj: StarConjunction[] = [];
  for (const star of FIXED_STARS) {
    const starLon = parseTropicalDegree(star.tropical_degree);
    if (starLon === null) continue;
    for (const planet of planets) {
      const orb = angularDist(planet.longitude, starLon);
      if (orb <= orbDeg) {
        conj.push({ star, planetKey: planet.key, planetLabel: planet.label, orb });
      }
    }
  }
  return conj;
}

// ─── stellium detection ─────────────────────────────────────────────────────

function detectStelliums(planets: PlanetNode[], chart: AstralChart): string[] {
  // Group planets by sign
  const bySign: Record<string, string[]> = {};
  for (const p of planets) {
    // Find sign from longitude
    const lon = ((p.longitude % 360) + 360) % 360;
    const signIdx = Math.floor(lon / 30);
    const SIGNS = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
    const sign = SIGNS[signIdx];
    if (!bySign[sign]) bySign[sign] = [];
    bySign[sign].push(p.label);
  }
  // Group by house
  const byHouse: Record<number, string[]> = {};
  for (const p of planets) {
    const houseNum = getPlanetHouseNum(p.longitude, chart.houses);
    if (!byHouse[houseNum]) byHouse[houseNum] = [];
    byHouse[houseNum].push(p.label);
  }

  const results: string[] = [];
  for (const [sign, ps] of Object.entries(bySign)) {
    if (ps.length >= 3) {
      results.push(`Stellium in ${sign}: ${ps.join(', ')}`);
    }
  }
  for (const [house, ps] of Object.entries(byHouse)) {
    if (ps.length >= 3) {
      results.push(`Stellium in House ${house}: ${ps.join(', ')}`);
    }
  }
  return results;
}

function getPlanetHouseNum(longitude: number, houses: HousePosition[]): number {
  if (!houses || houses.length < 12) return 1;
  for (let i = 0; i < 12; i++) {
    const curr = ((houses[i].cusp % 360) + 360) % 360;
    const next = ((houses[(i + 1) % 12].cusp % 360) + 360) % 360;
    const lon = ((longitude % 360) + 360) % 360;
    if (next > curr) {
      if (lon >= curr && lon < next) return houses[i].num;
    } else {
      if (lon >= curr || lon < next) return houses[i].num;
    }
  }
  return 1;
}

// ─── content lookup for aspects ─────────────────────────────────────────────

const PLANET_KEY_TO_CONTENT: Record<string, string> = {
  northNode: 'north_node',
  southNode: 'south_node',
  sun: 'sun', moon: 'moon', mercury: 'mercury', venus: 'venus', mars: 'mars',
  jupiter: 'jupiter', saturn: 'saturn', uranus: 'uranus', neptune: 'neptune',
  pluto: 'pluto', chiron: 'chiron',
};

function lookupAspectContent(planet1: string, planet2: string, aspectType: string): PlacementContent | null {
  const p1 = PLANET_KEY_TO_CONTENT[planet1] ?? planet1.toLowerCase();
  const p2 = PLANET_KEY_TO_CONTENT[planet2] ?? planet2.toLowerCase();

  // Try both orderings
  const candidates = [
    `${p1}-${p2}`,
    `${p2}-${p1}`,
  ];

  for (const planetPair of candidates) {
    const found = ASPECTS.find(a => a.planet === planetPair && a.sign === aspectType);
    if (found) return found;
  }
  return null;
}

// ─── sub-components ─────────────────────────────────────────────────────────

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-[18px] border border-[#E5E1D8] p-6 space-y-4">
      <h2 className="font-prose text-ink text-lg leading-snug">{title}</h2>
      {children}
    </div>
  );
}

function PlacementBlock({ content }: { content: PlacementContent }) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-widest text-ink-muted font-ui mb-1">Traditional</p>
        <p className="font-prose text-ink leading-relaxed text-[15px]">{content.traditional_en}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest text-ink-muted font-ui mb-1">Evolutionary</p>
        <p className="font-prose text-ink leading-relaxed text-[15px]">{content.evolutionary_en}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest text-ink-muted font-ui mb-1">Developmental</p>
        <p className="font-prose text-ink leading-relaxed text-[15px]">{content.developmental_en}</p>
      </div>
      {content.aphorism_en && (
        <blockquote className="border-l-2 border-[#C8B9A2] pl-4 italic font-prose text-ink-muted text-[14px] leading-relaxed">
          {content.aphorism_en}
        </blockquote>
      )}
    </div>
  );
}

const ASPECT_TYPE_LABELS: Record<string, string> = {
  conjunction: 'Conjunction ☌ (0°)',
  opposition:  'Opposition ☍ (180°)',
  trine:       'Trine △ (120°)',
  square:      'Square □ (90°)',
  sextile:     'Sextile ⚹ (60°)',
  quincunx:    'Quincunx ⚻ (150°)',
};

const PLANET_DISPLAY_LABELS: Record<string, string> = {
  sun: 'Sun', moon: 'Moon', mercury: 'Mercury', venus: 'Venus', mars: 'Mars',
  jupiter: 'Jupiter', saturn: 'Saturn', uranus: 'Uranus', neptune: 'Neptune',
  pluto: 'Pluto', chiron: 'Chiron', northNode: 'North Node', southNode: 'South Node',
};

const PLANET_GLYPHS_MAP: Record<string, string> = {
  sun: '☉', moon: '☽', mercury: '☿', venus: '♀', mars: '♂',
  jupiter: '♃', saturn: '♄', uranus: '♅', neptune: '♆', pluto: '♇',
  chiron: '⚷', northNode: '☊', southNode: '☋',
};

// ─── main page ──────────────────────────────────────────────────────────────

export default function Chapter5Page() {
  const [chart, setChart] = useState<AstralChart | null>(null);
  const [birthData, setBirthData] = useState<{ name?: string } | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('hygiea.primary-chart.v1');
      if (raw) setChart(JSON.parse(raw));
    } catch {}
    try {
      const raw = localStorage.getItem('hygiea.birth-data');
      if (raw) setBirthData(JSON.parse(raw));
    } catch {}
  }, []);

  if (!chart) {
    return (
      <main className="min-h-dvh bg-[#FAF6EF] flex items-center justify-center">
        <p className="text-ink-muted font-prose text-sm">No chart data found. Please set up your natal chart first.</p>
      </main>
    );
  }

  // Build planets list
  const PLANET_KEYS: (keyof AstralChart)[] = [
    'sun', 'moon', 'mercury', 'venus', 'mars',
    'jupiter', 'saturn', 'uranus', 'neptune', 'pluto',
    'chiron', 'northNode', 'southNode',
  ];

  const planetNodes: PlanetNode[] = PLANET_KEYS
    .map((k) => {
      const p = chart[k];
      if (!p || typeof p !== 'object' || !('longitude' in p)) return null;
      const pp = p as { longitude: number };
      return {
        key: k as string,
        label: PLANET_DISPLAY_LABELS[k as string] ?? String(k),
        glyph: PLANET_GLYPHS_MAP[k as string] ?? '?',
        longitude: pp.longitude,
      };
    })
    .filter(Boolean) as PlanetNode[];

  const detectedAspects = calculateAspects(planetNodes);
  const starConjunctions = findStarConjunctions(planetNodes, 2);
  const stelliums = detectStelliums(planetNodes, chart);

  const name = birthData?.name ?? 'This Soul';

  return (
    <main className="min-h-dvh bg-[#FAF6EF] pb-24">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E1D8] px-5 pt-10 pb-6">
        <p className="text-xs uppercase tracking-widest text-ink-muted font-ui mb-1">Chapter Five</p>
        <h1 className="font-prose text-ink text-2xl leading-tight">Aspects &amp; Configurations</h1>
        <p className="text-sm text-ink-muted font-ui mt-1">{name} · Planetary Dialogue</p>
      </div>

      <div className="px-4 py-6 space-y-5 max-w-2xl mx-auto">
        {/* Aspect Grid */}
        <SectionCard title="Aspect Grid">
          <p className="text-sm text-ink-muted font-prose leading-relaxed">
            The aspect grid maps the angular relationships between natal planets. Each cell shows
            the major aspect (if any) formed between the planet in that row and the planet in that
            column. Only the lower triangle is read, moving from conjunction at the tightest orb
            down to quincunx. The orbs used are: conjunction/opposition/trine 8°, square 7°,
            sextile 5°, quincunx 3°.
          </p>
          <AspectGridSvg planets={planetNodes.map(n => n.key)} aspects={detectedAspects} />
          <p className="text-xs text-ink-muted font-ui">
            {detectedAspects.length} major aspect{detectedAspects.length !== 1 ? 's' : ''} detected
          </p>
        </SectionCard>

        {/* Stellium */}
        {stelliums.length > 0 && (
          <SectionCard title="Stellium Configurations">
            <p className="text-sm font-prose text-ink-muted leading-relaxed">
              A stellium — three or more planets in the same sign or house — concentrates solar-system
              energy into a single zone, creating an area of intense developmental focus. The stellium
              is not a burden but a concentration: the soul elected to work deeply in this territory.
            </p>
            <ul className="space-y-2">
              {stelliums.map((s, i) => (
                <li key={i} className="bg-[#FAF6EF] rounded-xl p-4 border border-[#E5E1D8]">
                  <p className="font-prose text-ink text-[15px]">{s}</p>
                </li>
              ))}
            </ul>
          </SectionCard>
        )}

        {/* Aspects detail */}
        {detectedAspects.length === 0 ? (
          <SectionCard title="No Major Aspects Detected">
            <p className="text-sm text-ink-muted font-prose">
              No major aspects within the standard orbs were found in this chart.
            </p>
          </SectionCard>
        ) : (
          <SectionCard title="Major Aspects — Detailed Interpretations">
            <p className="text-sm text-ink-muted font-prose leading-relaxed mb-2">
              Each aspect below represents an ongoing dialogue between two planetary principles in the
              soul's architecture. Traditional, evolutionary, and developmental readings are provided
              where content is available.
            </p>
            <div className="space-y-6">
              {detectedAspects.map((asp, i) => {
                const content = lookupAspectContent(asp.p1, asp.p2, asp.type);
                const p1Label = PLANET_DISPLAY_LABELS[asp.p1] ?? asp.p1;
                const p2Label = PLANET_DISPLAY_LABELS[asp.p2] ?? asp.p2;
                const p1Glyph = PLANET_GLYPHS_MAP[asp.p1] ?? '';
                const p2Glyph = PLANET_GLYPHS_MAP[asp.p2] ?? '';
                const aspectLabel = ASPECT_TYPE_LABELS[asp.type] ?? asp.type;

                return (
                  <div key={i} className="border-t border-[#E5E1D8] pt-5 first:border-0 first:pt-0">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-prose text-ink">{p1Glyph} {p1Label}</span>
                      <span className="text-sm text-ink-muted font-ui">—</span>
                      <span className="text-sm font-ui text-ink-muted">{aspectLabel}</span>
                      <span className="text-sm text-ink-muted font-ui">—</span>
                      <span className="text-lg font-prose text-ink">{p2Glyph} {p2Label}</span>
                      <span className="ml-auto text-xs text-ink-muted font-ui">orb {asp.orb.toFixed(1)}°</span>
                    </div>

                    {content ? (
                      <PlacementBlock content={content} />
                    ) : (
                      <p className="text-sm text-ink-muted font-prose italic">
                        No specific interpretation available for {p1Label} {asp.type} {p2Label}. The
                        aspect is active in the chart — its meaning emerges from the synthesis of both
                        planetary principles across the angle indicated.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </SectionCard>
        )}

        {/* Fixed Stars */}
        <SectionCard title="Fixed Star Conjunctions">
          <p className="text-sm text-ink-muted font-prose leading-relaxed">
            Fixed stars are not fixed — they precess slowly through the zodiac — but their association
            with specific qualities of fate and genius has been tracked across millennia. When a natal
            planet falls within 2° of a major star's ecliptic longitude, the star's nature blends with
            the planet's function. The conjunction is considered the primary contact.
          </p>

          {starConjunctions.length === 0 ? (
            <p className="text-sm text-ink-muted font-prose italic">
              No major fixed star conjunctions within 2° were found in this chart.
            </p>
          ) : (
            <div className="space-y-5">
              {starConjunctions.map((sc, i) => (
                <div key={i} className="border-t border-[#E5E1D8] pt-5 first:border-0 first:pt-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="font-prose text-ink text-[15px] font-medium">
                        {sc.star.star_name}
                        {sc.star.bayer_designation && (
                          <span className="text-ink-muted font-ui text-xs ml-2">
                            {sc.star.bayer_designation}
                          </span>
                        )}
                      </p>
                      <p className="text-xs font-ui text-ink-muted">
                        {sc.star.constellation_name} · {sc.star.tropical_degree} · magnitude {sc.star.magnitude}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-ui text-ink-muted">conjunct</p>
                      <p className="font-prose text-ink text-sm">
                        {PLANET_GLYPHS_MAP[sc.planetKey] ?? ''} {sc.planetLabel}
                      </p>
                      <p className="text-xs text-ink-muted font-ui">orb {sc.orb.toFixed(2)}°</p>
                    </div>
                  </div>
                  <p className="font-prose text-ink leading-relaxed text-[15px]">
                    {sc.star.interpretation_en}
                  </p>
                </div>
              ))}
            </div>
          )}
        </SectionCard>

        {/* Earth Stars */}
        <SectionCard title="Earth Stars — Fixed Stars Beyond the Zodiac">
          <p className="text-sm text-ink-muted font-prose leading-relaxed">
            Earth Stars are fixed stars outside the ecliptic belt — polar stars, galactic center, and Cherubic stars.
            Their influence is not of fate but of cosmic orientation: the pre-incarnational intentions that precede the zodiacal arc.
          </p>

          {(() => {
            const earthStarContacts = EARTH_STARS.flatMap((s) => {
              const contacts = planetNodes.filter((planet) => {
                const diff = Math.abs(((planet.longitude - s.longitude + 360) % 360));
                const dist = diff > 180 ? 360 - diff : diff;
                return dist <= 3;
              });
              return contacts.map((planet) => {
                const diff = Math.abs(((planet.longitude - s.longitude + 360) % 360));
                const orb = diff > 180 ? 360 - diff : diff;
                return { star: s, planet, orb };
              });
            });

            if (earthStarContacts.length === 0) {
              return (
                <p className="text-sm text-ink-muted font-prose italic">
                  No Earth Star contacts within 3°.
                </p>
              );
            }

            return (
              <div className="space-y-5">
                {earthStarContacts.map((ec, i) => (
                  <div key={i} className="border-t border-[#E5E1D8] pt-5 first:border-0 first:pt-0">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <p className="font-prose text-ink text-[15px] font-medium">
                          {ec.star.name}
                        </p>
                        <p className="text-xs font-ui text-ink-muted">
                          {ec.star.constellation}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {ec.star.type && (
                          <span className="text-[10px] uppercase tracking-widest font-ui px-2 py-0.5 rounded-full bg-[#FAF6EF] border border-[#E5E1D8] text-ink-muted">
                            {ec.star.type}
                          </span>
                        )}
                        <div className="text-right">
                          <p className="text-xs font-ui text-ink-muted">conjunct</p>
                          <p className="font-prose text-ink text-sm">
                            {PLANET_GLYPHS_MAP[ec.planet.key] ?? ''} {ec.planet.label}
                          </p>
                          <p className="text-xs text-ink-muted font-ui">orb {ec.orb.toFixed(2)}°</p>
                        </div>
                      </div>
                    </div>
                    {ec.star.bodyConnection && (
                      <div className="mb-2">
                        <p className="text-[10px] uppercase tracking-widest text-ink-muted font-ui mb-0.5">Body Connection</p>
                        <p className="font-prose text-ink text-[14px] leading-relaxed">{ec.star.bodyConnection}</p>
                      </div>
                    )}
                    {ec.star.earthConnection && (
                      <div className="mb-2">
                        <p className="text-[10px] uppercase tracking-widest text-ink-muted font-ui mb-0.5">Earth Connection</p>
                        <p className="font-prose text-ink text-[14px] leading-relaxed">{ec.star.earthConnection}</p>
                      </div>
                    )}
                    {ec.star.interpretation_en && (
                      <p className="font-prose text-ink leading-relaxed text-[15px] mt-2">
                        {ec.star.interpretation_en}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            );
          })()}
        </SectionCard>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-2">
          <Link
            href="/biography/chapter4"
            className="flex items-center gap-2 text-sm text-ink-muted font-ui hover:text-ink transition-colors"
          >
            ← Chapter 4
          </Link>
          <Link
            href="/biography/chapter6"
            className="flex items-center gap-2 text-sm text-ink font-ui font-medium hover:text-ink-muted transition-colors"
          >
            Chapter 6 →
          </Link>
        </div>
      </div>
    </main>
  );
}
