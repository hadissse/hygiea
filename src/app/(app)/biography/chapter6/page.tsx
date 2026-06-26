'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  PLANET_IN_SIGN_MAP,
  PLANET_IN_HOUSE_MAP,
  SPHERE_BY_PLANET,
  type PlacementContent,
  type SphereData,
} from '@/content/reportData';

// ── Types ─────────────────────────────────────────────────────────────────────

interface PlanetPosition {
  name: string;
  glyph: string;
  longitude: number;
  latitude: number;
  sign: string;
  signNumber: number;
  degree: number;
  minute: number;
  retrograde?: boolean;
}

interface HousePosition {
  num: number;
  cusp: number;
  sign: string;
  signNumber: number;
  degree: number;
  minute: number;
}

interface AstralChart {
  asc: number;
  mc: number;
  sun: PlanetPosition;
  moon: PlanetPosition;
  mercury: PlanetPosition;
  venus: PlanetPosition;
  mars: PlanetPosition;
  jupiter: PlanetPosition;
  saturn: PlanetPosition;
  uranus: PlanetPosition;
  neptune: PlanetPosition;
  pluto: PlanetPosition;
  chiron: PlanetPosition;
  northNode: PlanetPosition;
  southNode: PlanetPosition;
  houses: HousePosition[];
}

interface BirthData {
  name?: string;
  year?: number;
  month?: number;
  day?: number;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const SIGN_NAMES = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

const PLANET_KEYS = [
  'sun', 'moon', 'mercury', 'venus', 'mars',
  'jupiter', 'saturn', 'uranus', 'neptune', 'pluto',
  'chiron', 'northNode', 'southNode',
] as const;

type PlanetKey = typeof PLANET_KEYS[number];

const TRINE_ORBS = 8; // degrees

// Galactic Center: ~27° Sagittarius = longitude ~267°
const GALACTIC_CENTER_LON = 267;
const GC_ORB = 2;

// ── Helpers ───────────────────────────────────────────────────────────────────

function getPlanetHouseNum(planet: PlanetPosition, chart: AstralChart): number {
  const asc = chart.asc;
  const diff = ((planet.longitude - asc) % 360 + 360) % 360;
  return Math.floor(diff / 30) + 1;
}

function normalizePlanetName(key: PlanetKey): string {
  const map: Record<PlanetKey, string> = {
    sun: 'Sun', moon: 'Moon', mercury: 'Mercury', venus: 'Venus',
    mars: 'Mars', jupiter: 'Jupiter', saturn: 'Saturn', uranus: 'Uranus',
    neptune: 'Neptune', pluto: 'Pluto', chiron: 'Chiron',
    northNode: 'North Node', southNode: 'South Node',
  };
  return map[key];
}

function getLookupKey(planet: string, sign: string): string {
  return `${planet}-${sign}`;
}

function getHouseLookupKey(planet: string, house: number): string {
  return `${planet}-${house}`;
}

/** Check if a planet is within GC_ORB degrees of the Galactic Center */
function isNearGalacticCenter(planet: PlanetPosition): boolean {
  const diff = Math.abs(planet.longitude - GALACTIC_CENTER_LON);
  const normalized = diff > 180 ? 360 - diff : diff;
  return normalized <= GC_ORB;
}

/** Detect trines (120° aspects) between two planets, given orb tolerance */
function hasTrine(a: PlanetPosition, b: PlanetPosition, orbDeg: number = TRINE_ORBS): boolean {
  const diff = Math.abs(a.longitude - b.longitude);
  const normalized = diff > 180 ? 360 - diff : diff;
  const orb = Math.abs(normalized - 120);
  return orb <= orbDeg;
}

/** Find all trine pairs in the chart */
function findTrines(chart: AstralChart): Array<[PlanetKey, PlanetKey]> {
  const pairs: Array<[PlanetKey, PlanetKey]> = [];
  for (let i = 0; i < PLANET_KEYS.length; i++) {
    for (let j = i + 1; j < PLANET_KEYS.length; j++) {
      const a = chart[PLANET_KEYS[i]];
      const b = chart[PLANET_KEYS[j]];
      if (a && b && hasTrine(a, b)) {
        pairs.push([PLANET_KEYS[i], PLANET_KEYS[j]]);
      }
    }
  }
  return pairs;
}

/** Detect the dominant house by planet concentration */
function getDominantHouse(chart: AstralChart): { house: number; planets: string[] } | null {
  const houseCounts: Record<number, string[]> = {};
  for (const key of PLANET_KEYS) {
    const planet = chart[key];
    if (!planet) continue;
    const h = getPlanetHouseNum(planet, chart);
    if (!houseCounts[h]) houseCounts[h] = [];
    houseCounts[h].push(normalizePlanetName(key));
  }
  let maxHouse = 0;
  let maxCount = 0;
  for (const [h, planets] of Object.entries(houseCounts)) {
    if (planets.length > maxCount) {
      maxCount = planets.length;
      maxHouse = Number(h);
    }
  }
  if (maxCount < 2) return null;
  return { house: maxHouse, planets: houseCounts[maxHouse] };
}

/** Detect primary stellium by sign concentration */
function getPrimaryStellium(chart: AstralChart): { sign: string; planets: string[] } | null {
  const signCounts: Record<string, string[]> = {};
  for (const key of PLANET_KEYS) {
    const planet = chart[key];
    if (!planet) continue;
    const sign = planet.sign;
    if (!signCounts[sign]) signCounts[sign] = [];
    signCounts[sign].push(normalizePlanetName(key));
  }
  let maxSign = '';
  let maxCount = 0;
  for (const [sign, planets] of Object.entries(signCounts)) {
    if (planets.length > maxCount) {
      maxCount = planets.length;
      maxSign = sign;
    }
  }
  if (maxCount < 3) return null;
  return { sign: maxSign, planets: signCounts[maxSign] };
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionCard({ title, subtitle, children }: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-[18px] border border-[#E5E1D8] mb-6 overflow-hidden">
      <div className="px-6 pt-6 pb-4 border-b border-[#E5E1D8]">
        <h2 className="text-xl font-prose font-semibold text-ink leading-tight">{title}</h2>
        {subtitle && (
          <p className="text-sm text-ink-muted mt-1 italic">{subtitle}</p>
        )}
      </div>
      <div className="px-6 py-5 space-y-6">{children}</div>
    </div>
  );
}

function InterpBlock({ label, content }: { label: string; content: PlacementContent | null | undefined }) {
  if (!content) return null;
  return (
    <div className="space-y-4">
      <p className="text-xs uppercase tracking-widest text-ink-muted font-ui">{label}</p>
      {content.traditional_en && (
        <div>
          <p className="text-[11px] uppercase tracking-wider text-ink-muted font-ui mb-2">Traditional</p>
          <p className="text-ink leading-relaxed text-sm">{content.traditional_en}</p>
        </div>
      )}
      {content.evolutionary_en && (
        <div>
          <p className="text-[11px] uppercase tracking-wider text-ink-muted font-ui mb-2">Evolutionary</p>
          <p className="text-ink leading-relaxed text-sm">{content.evolutionary_en}</p>
        </div>
      )}
      {content.developmental_en && (
        <div>
          <p className="text-[11px] uppercase tracking-wider text-ink-muted font-ui mb-2">Developmental</p>
          <p className="text-ink leading-relaxed text-sm">{content.developmental_en}</p>
        </div>
      )}
      {content.aphorism_en && (
        <p className="text-sm text-ink-muted italic border-l-2 border-[#E5E1D8] pl-4 mt-2">
          &ldquo;{content.aphorism_en}&rdquo;
        </p>
      )}
    </div>
  );
}

function SphereBlock({ label, sphere }: { label: string; sphere: SphereData | null | undefined }) {
  if (!sphere) return null;
  return (
    <div className="space-y-3">
      <p className="text-xs uppercase tracking-widest text-ink-muted font-ui">{label}</p>
      <div className="bg-[#F8F5EF] rounded-[14px] p-4">
        <p className="font-prose font-semibold text-ink text-base">{sphere.sphere_name}</p>
        <p className="text-xs text-ink-muted italic mt-0.5 mb-3">{sphere.sphere_epithet}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs mb-3">
          {sphere.hierarchy && (
            <div className="bg-white rounded-lg p-2 border border-[#E5E1D8]">
              <p className="text-[10px] uppercase tracking-wider text-ink-muted mb-0.5">Hierarchy</p>
              <p className="font-medium text-ink">{sphere.hierarchy}</p>
              {sphere.hierarchy_sub && <p className="text-ink-muted">{sphere.hierarchy_sub}</p>}
            </div>
          )}
          {sphere.body_member && (
            <div className="bg-white rounded-lg p-2 border border-[#E5E1D8]">
              <p className="text-[10px] uppercase tracking-wider text-ink-muted mb-0.5">Body Member</p>
              <p className="font-medium text-ink">{sphere.body_member}</p>
              {sphere.body_member_sub && <p className="text-ink-muted">{sphere.body_member_sub}</p>}
            </div>
          )}
          {sphere.organ && (
            <div className="bg-white rounded-lg p-2 border border-[#E5E1D8]">
              <p className="text-[10px] uppercase tracking-wider text-ink-muted mb-0.5">Organ · Metal</p>
              <p className="font-medium text-ink">{sphere.organ}</p>
              {sphere.metal && <p className="text-ink-muted">{sphere.metal}</p>}
            </div>
          )}
        </div>
        {sphere.sphere_narrative && (
          <p className="text-sm text-ink leading-relaxed">{sphere.sphere_narrative}</p>
        )}
      </div>
      {(sphere.luciferic || sphere.ahrimanic) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sphere.luciferic && (
            <div className="bg-amber-50 border border-amber-100 rounded-[12px] p-3 text-xs">
              <p className="text-[10px] uppercase tracking-wider text-amber-600 mb-1">Luciferic pole</p>
              <p className="text-ink-muted leading-relaxed">{sphere.luciferic}</p>
            </div>
          )}
          {sphere.ahrimanic && (
            <div className="bg-slate-50 border border-slate-100 rounded-[12px] p-3 text-xs">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Ahrimanic pole</p>
              <p className="text-ink-muted leading-relaxed">{sphere.ahrimanic}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function GiftCard({ title, planet, planetName, signContent, houseContent, sphereData, extra }: {
  title: string;
  planet?: PlanetPosition;
  planetName?: string;
  signContent?: PlacementContent | null;
  houseContent?: PlacementContent | null;
  sphereData?: SphereData | null;
  extra?: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-[18px] border border-[#E5E1D8] p-5 flex flex-col gap-4">
      <div>
        <p className="text-[10px] uppercase tracking-widest text-ink-muted font-ui mb-1">{title}</p>
        {planet && planetName && (
          <p className="font-prose font-semibold text-ink text-base">
            {planetName} in {planet.sign}
            {planet.retrograde && <span className="text-[#C4A24D] ml-1 text-sm">℞</span>}
          </p>
        )}
        {extra}
      </div>
      {sphereData && (
        <div className="bg-[#F8F5EF] rounded-[12px] p-3">
          <p className="text-xs font-medium text-ink">{sphereData.sphere_name}</p>
          <p className="text-[11px] text-ink-muted italic">{sphereData.sphere_epithet}</p>
          {sphereData.sphere_narrative && (
            <p className="text-xs text-ink-muted leading-relaxed mt-2">{sphereData.sphere_narrative}</p>
          )}
        </div>
      )}
      {signContent && (
        <div className="space-y-3">
          {signContent.traditional_en && (
            <div>
              <p className="text-[10px] uppercase tracking-wider text-ink-muted mb-1">Traditional</p>
              <p className="text-xs text-ink leading-relaxed">{signContent.traditional_en}</p>
            </div>
          )}
          {signContent.evolutionary_en && (
            <div>
              <p className="text-[10px] uppercase tracking-wider text-ink-muted mb-1">Evolutionary</p>
              <p className="text-xs text-ink leading-relaxed">{signContent.evolutionary_en}</p>
            </div>
          )}
          {signContent.developmental_en && (
            <div>
              <p className="text-[10px] uppercase tracking-wider text-ink-muted mb-1">Developmental</p>
              <p className="text-xs text-ink leading-relaxed">{signContent.developmental_en}</p>
            </div>
          )}
          {signContent.aphorism_en && (
            <p className="text-xs text-ink-muted italic border-l-2 border-[#E5E1D8] pl-3">
              &ldquo;{signContent.aphorism_en}&rdquo;
            </p>
          )}
        </div>
      )}
      {houseContent && (
        <div className="space-y-3 border-t border-[#E5E1D8] pt-4">
          <p className="text-[10px] uppercase tracking-widest text-ink-muted">House Arena</p>
          {houseContent.traditional_en && (
            <p className="text-xs text-ink leading-relaxed">{houseContent.traditional_en}</p>
          )}
          {houseContent.evolutionary_en && (
            <p className="text-xs text-ink leading-relaxed">{houseContent.evolutionary_en}</p>
          )}
          {houseContent.developmental_en && (
            <p className="text-xs text-ink leading-relaxed">{houseContent.developmental_en}</p>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function Chapter6Page() {
  const [chart, setChart] = useState<AstralChart | null>(null);
  const [birthData, setBirthData] = useState<BirthData | null>(null);

  useEffect(() => {
    try {
      const rawChart = localStorage.getItem('hygiea.primary-chart.v1');
      if (rawChart) setChart(JSON.parse(rawChart));
      const rawBirth = localStorage.getItem('hygiea.birth-data');
      if (rawBirth) setBirthData(JSON.parse(rawBirth));
    } catch {
      // localStorage unavailable or corrupt
    }
  }, []);

  // ── Derive all content ──────────────────────────────────────────────────────

  // Sun
  const sunSignContent = chart
    ? PLANET_IN_SIGN_MAP[getLookupKey('Sun', chart.sun.sign)] ?? null
    : null;
  const sunHouseNum = chart ? getPlanetHouseNum(chart.sun, chart) : null;
  const sunHouseContent = chart && sunHouseNum
    ? PLANET_IN_HOUSE_MAP[getHouseLookupKey('Sun', sunHouseNum)] ?? null
    : null;
  const sunSphere = SPHERE_BY_PLANET['Sun'] ?? null;

  // Moon
  const moonSignContent = chart
    ? PLANET_IN_SIGN_MAP[getLookupKey('Moon', chart.moon.sign)] ?? null
    : null;
  const moonHouseNum = chart ? getPlanetHouseNum(chart.moon, chart) : null;
  const moonHouseContent = chart && moonHouseNum
    ? PLANET_IN_HOUSE_MAP[getHouseLookupKey('Moon', moonHouseNum)] ?? null
    : null;

  // Chiron
  const chironSignContent = chart
    ? PLANET_IN_SIGN_MAP[getLookupKey('Chiron', chart.chiron.sign)] ?? null
    : null;
  const chironHouseNum = chart ? getPlanetHouseNum(chart.chiron, chart) : null;
  const chironHouseContent = chart && chironHouseNum
    ? PLANET_IN_HOUSE_MAP[getHouseLookupKey('Chiron', chironHouseNum)] ?? null
    : null;

  // North Node
  const nnSignContent = chart
    ? PLANET_IN_SIGN_MAP[getLookupKey('northNode', chart.northNode.sign)] ?? null
    : null;
  const nnHouseNum = chart ? getPlanetHouseNum(chart.northNode, chart) : null;
  const nnHouseContent = chart && nnHouseNum
    ? PLANET_IN_HOUSE_MAP[getHouseLookupKey('northNode', nnHouseNum)] ?? null
    : null;

  // Galactic Center contacts
  const gcPlanets: string[] = chart
    ? PLANET_KEYS.filter(k => {
        const p = chart[k];
        return p && isNearGalacticCenter(p);
      }).map(k => normalizePlanetName(k))
    : [];

  // Jupiter
  const jupiterSignContent = chart
    ? PLANET_IN_SIGN_MAP[getLookupKey('Jupiter', chart.jupiter.sign)] ?? null
    : null;
  const jupiterSphere = SPHERE_BY_PLANET['Jupiter'] ?? null;

  // Venus
  const venusSignContent = chart
    ? PLANET_IN_SIGN_MAP[getLookupKey('Venus', chart.venus.sign)] ?? null
    : null;
  const venusSphere = SPHERE_BY_PLANET['Venus'] ?? null;

  // Saturn
  const saturnSignContent = chart
    ? PLANET_IN_SIGN_MAP[getLookupKey('Saturn', chart.saturn.sign)] ?? null
    : null;
  const saturnHouseNum = chart ? getPlanetHouseNum(chart.saturn, chart) : null;
  const saturnHouseContent = chart && saturnHouseNum
    ? PLANET_IN_HOUSE_MAP[getHouseLookupKey('Saturn', saturnHouseNum)] ?? null
    : null;
  const saturnSphere = SPHERE_BY_PLANET['Saturn'] ?? null;

  // Trines
  const trines = chart ? findTrines(chart) : [];

  // Stellium / dominant house
  const stellium = chart ? getPrimaryStellium(chart) : null;
  const dominantHouse = chart ? getDominantHouse(chart) : null;

  // ── No chart yet ───────────────────────────────────────────────────────────

  if (!chart) {
    return (
      <div className="px-5 pt-8 pb-32 max-w-3xl bg-[#FAF6EF] min-h-screen">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/biography/chapter5" className="text-ink-muted text-sm hover:text-ink transition-colors">
            ← Chapter 5
          </Link>
        </div>
        <div className="bg-white rounded-[18px] border border-[#E5E1D8] p-8 text-center">
          <p className="text-2xl font-prose font-semibold text-ink mb-3">Chapter VI</p>
          <p className="text-lg font-prose text-ink-muted mb-6">The I&apos;s Mission</p>
          <p className="text-sm text-ink-muted">
            No birth chart found. Please complete the chart calculation first.
          </p>
          <Link
            href="/self"
            className="inline-block mt-4 px-6 py-2.5 bg-midnight text-white rounded-[26px] text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Set Up Chart
          </Link>
        </div>
      </div>
    );
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="px-5 pt-8 pb-32 max-w-3xl bg-[#FAF6EF] min-h-screen">

      {/* Navigation */}
      <div className="flex items-center gap-3 mb-2">
        <Link href="/biography/chapter5" className="text-ink-muted text-sm hover:text-ink transition-colors">
          ← Chapter 5
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-ink-muted font-ui mb-1">Chapter VI</p>
        <h1 className="text-3xl font-prose font-semibold text-ink leading-tight mb-2">
          The I&apos;s Mission
        </h1>
        {birthData?.name && (
          <p className="text-ink-muted font-ui text-sm">{birthData.name}</p>
        )}
        <p className="text-sm text-ink-muted mt-3 leading-relaxed max-w-xl">
          The culminating synthesis of the cosmological biography. This chapter reads the chart as a
          mission document — tracing the outer work the I has come to perform, the inner development it
          must undergo, the cosmic contribution it carries, and the soul gifts it offers the world.
        </p>
      </div>

      {/* ── Section 1: Outer Mission ──────────────────────────────────────────── */}
      <SectionCard
        title="Outer Mission"
        subtitle={`Sun in ${chart.sun.sign}${sunHouseNum ? ` · House ${sunHouseNum}` : ''} — the visible domain of the I`}
      >
        <p className="text-sm text-ink-muted leading-relaxed">
          The outer mission is the territory in which the I performs its most visible work in the world.
          It is shaped by the Sun&apos;s sign — which gives the quality and coloring of solar expression —
          and by the Sun&apos;s house, which names the arena of life in which that expression is meant to
          manifest.
        </p>

        <SphereBlock
          label="The Sun Sphere — Realm of the I · Organizer of Individuality"
          sphere={sunSphere}
        />

        {sunSignContent && (
          <InterpBlock
            label={`Sun in ${chart.sun.sign} — Sign Interpretation`}
            content={sunSignContent}
          />
        )}

        {sunHouseContent && sunHouseNum && (
          <InterpBlock
            label={`Sun in House ${sunHouseNum} — House Arena`}
            content={sunHouseContent}
          />
        )}

        {!sunSignContent && !sunHouseContent && (
          <p className="text-sm text-ink-muted italic">
            Interpretation content not found for Sun in {chart.sun.sign}.
          </p>
        )}
      </SectionCard>

      {/* ── Section 2: Inner Mission ──────────────────────────────────────────── */}
      <SectionCard
        title="Inner Mission"
        subtitle={`Moon in ${chart.moon.sign}${moonHouseNum ? ` · House ${moonHouseNum}` : ''} · Chiron in ${chart.chiron.sign} — the developmental demand`}
      >
        <p className="text-sm text-ink-muted leading-relaxed">
          The inner mission is what must be developed, healed, and integrated on the inside — the
          psychological and soul-level work that runs parallel to the outer. It is carried primarily by
          the Moon (which shapes the emotional body, the instinctive life, and the pattern of receiving)
          and by Chiron (which marks the ancient wound that, when consciously entered, becomes the
          soul&apos;s deepest teaching).
        </p>

        {moonSignContent && (
          <InterpBlock
            label={`Moon in ${chart.moon.sign} — Sign Interpretation`}
            content={moonSignContent}
          />
        )}

        {moonHouseContent && moonHouseNum && (
          <InterpBlock
            label={`Moon in House ${moonHouseNum} — House Arena`}
            content={moonHouseContent}
          />
        )}

        {chironSignContent && (
          <InterpBlock
            label={`Chiron in ${chart.chiron.sign} — The Ancient Wound`}
            content={chironSignContent}
          />
        )}

        {chironHouseContent && chironHouseNum && (
          <InterpBlock
            label={`Chiron in House ${chironHouseNum} — House Arena`}
            content={chironHouseContent}
          />
        )}

        {!moonSignContent && !moonHouseContent && !chironSignContent && (
          <p className="text-sm text-ink-muted italic">
            Interpretation content not found for the inner mission configuration.
          </p>
        )}
      </SectionCard>

      {/* ── Section 3: Cosmic Mission ─────────────────────────────────────────── */}
      <SectionCard
        title="Cosmic Mission"
        subtitle={`North Node in ${chart.northNode.sign}${nnHouseNum ? ` · House ${nnHouseNum}` : ''}${gcPlanets.length > 0 ? ` · Galactic Center contact: ${gcPlanets.join(', ')}` : ''}`}
      >
        <p className="text-sm text-ink-muted leading-relaxed">
          The cosmic mission is the contribution this soul makes to the larger arc of human evolution —
          what it has come to add to the collective. This is read through the North Node (the soul&apos;s
          evolutionary frontier, the direction of growth) and amplified by any planet within 2° of the
          Galactic Center at 27° Sagittarius, which activates a direct transmission from the center of
          the galaxy.
        </p>

        {nnSignContent && (
          <InterpBlock
            label={`North Node in ${chart.northNode.sign} — Evolutionary Frontier`}
            content={nnSignContent}
          />
        )}

        {nnHouseContent && nnHouseNum && (
          <InterpBlock
            label={`North Node in House ${nnHouseNum} — House Arena`}
            content={nnHouseContent}
          />
        )}

        {gcPlanets.length > 0 && (
          <div className="bg-[#F8F5EF] rounded-[14px] p-5 border border-[#E5E1D8]">
            <p className="text-xs uppercase tracking-widest text-ink-muted font-ui mb-2">
              Galactic Center Contact — 27° Sagittarius
            </p>
            <p className="font-prose font-semibold text-ink mb-2">
              {gcPlanets.join(', ')} within {GC_ORB}° of the Galactic Center
            </p>
            <p className="text-sm text-ink leading-relaxed">
              A planet conjunct the Galactic Center at 27° Sagittarius carries a rare quality of
              transmission — an orientation beyond personal and collective history toward the originating
              source. This placement tends to generate ideas, impulses, or perceptions that arrive from
              a frequency the surrounding culture has not yet formulated, and to endow the native with a
              mission that feels, at depth, cosmically rather than personally assigned. The challenge is
              learning to inhabit this frequency without either inflating it into messianism or
              dissipating it through failure to ground it in ordinary work.
            </p>
          </div>
        )}

        {!nnSignContent && !nnHouseContent && gcPlanets.length === 0 && (
          <p className="text-sm text-ink-muted italic">
            Interpretation content not found for the cosmic mission configuration.
          </p>
        )}
      </SectionCard>

      {/* ── Section 4: The Soul Gifts ─────────────────────────────────────────── */}
      <SectionCard
        title="The Soul Gifts"
        subtitle="Jupiter · Venus · Trine configurations — the gifts this soul offers"
      >
        <p className="text-sm text-ink-muted leading-relaxed">
          Soul gifts are not achievements but native endowments — capacities the soul has accumulated
          over many lives and brings into this incarnation as freely available resources. Jupiter carries
          the gifts of wisdom, understanding, and expansive generosity. Venus carries the gifts of
          beauty, relation, love, and the capacity to harmonize. Trine aspects mark talents so naturally
          available they often go unrecognized.
        </p>

        <SphereBlock
          label="Jupiter Sphere — Realm of Wisdom · Freedom-making Force"
          sphere={jupiterSphere}
        />

        {jupiterSignContent && (
          <InterpBlock
            label={`Jupiter in ${chart.jupiter.sign} — Gift of Wisdom`}
            content={jupiterSignContent}
          />
        )}

        <SphereBlock
          label="Venus Sphere — Realm of Love · Destiny-determining Force"
          sphere={venusSphere}
        />

        {venusSignContent && (
          <InterpBlock
            label={`Venus in ${chart.venus.sign} — Gift of Love and Beauty`}
            content={venusSignContent}
          />
        )}

        {trines.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-ink-muted font-ui">
              Trine Configurations — Innate Talents
            </p>
            <p className="text-sm text-ink-muted leading-relaxed">
              The following trine aspects reveal areas where natural gifts flow without effort. These
              are capacities already developed across prior lifetimes, now available as free resources
              in this one.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {trines.map(([a, b], i) => {
                const pA = chart[a];
                const pB = chart[b];
                const sphereA = SPHERE_BY_PLANET[normalizePlanetName(a)];
                const sphereB = SPHERE_BY_PLANET[normalizePlanetName(b)];
                return (
                  <div key={i} className="bg-[#F8F5EF] rounded-[14px] p-4 border border-[#E5E1D8]">
                    <p className="font-prose font-semibold text-ink text-sm mb-1">
                      {normalizePlanetName(a)} △ {normalizePlanetName(b)}
                    </p>
                    <p className="text-xs text-ink-muted italic mb-2">
                      {pA.sign} trine {pB.sign}
                    </p>
                    {sphereA && (
                      <p className="text-[11px] text-ink-muted leading-relaxed mb-1">
                        <span className="font-medium">{normalizePlanetName(a)}:</span>{' '}
                        {sphereA.sphere_epithet}
                      </p>
                    )}
                    {sphereB && (
                      <p className="text-[11px] text-ink-muted leading-relaxed">
                        <span className="font-medium">{normalizePlanetName(b)}:</span>{' '}
                        {sphereB.sphere_epithet}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {!jupiterSignContent && !venusSignContent && trines.length === 0 && (
          <p className="text-sm text-ink-muted italic">
            Interpretation content not found for the soul gifts configuration.
          </p>
        )}
      </SectionCard>

      {/* ── Section 5: The Four Gifts (2×2 grid) ─────────────────────────────── */}
      <div className="mb-6">
        <div className="mb-4">
          <p className="text-xs uppercase tracking-widest text-ink-muted font-ui mb-1">Section V</p>
          <h2 className="text-xl font-prose font-semibold text-ink leading-tight">The Four Gifts</h2>
          <p className="text-sm text-ink-muted mt-1 italic">
            The primary gift quadrant — Sun, Saturn, Chiron, and primary configuration
          </p>
        </div>
        <p className="text-sm text-ink-muted leading-relaxed mb-5">
          The four gifts synthesize the biography into its most essential offering. The upper left is
          the primary solar gift — the signature of who this person is at their most expressed. The
          upper right is the Saturnine gift, hard-won through karmic testing. The lower left is the
          Chironic gift — the healing capacity born from wound. The lower right is the gift encoded in
          the dominant configuration (stellium or house concentration).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Top-left: Sun gift */}
          <GiftCard
            title="Primary Gift — Sun Configuration"
            planet={chart.sun}
            planetName="Sun"
            signContent={sunSignContent}
            houseContent={sunHouseContent}
            sphereData={sunSphere}
          />

          {/* Top-right: Saturn gift */}
          <GiftCard
            title="Karmic Gift — Saturn"
            planet={chart.saturn}
            planetName="Saturn"
            signContent={saturnSignContent}
            houseContent={saturnHouseContent}
            sphereData={saturnSphere}
          />

          {/* Bottom-left: Chiron gift */}
          <GiftCard
            title="Wound-born Gift — Chiron"
            planet={chart.chiron}
            planetName="Chiron"
            signContent={chironSignContent}
            houseContent={chironHouseContent}
          />

          {/* Bottom-right: Stellium or dominant house gift */}
          {stellium ? (
            <GiftCard
              title={`Concentrated Gift — Stellium in ${stellium.sign}`}
              extra={
                <div className="mt-1">
                  <p className="text-xs text-ink-muted">
                    {stellium.planets.join(' · ')}
                  </p>
                  <p className="text-sm text-ink leading-relaxed mt-2">
                    A stellium of {stellium.planets.length} planets in {stellium.sign} concentrates
                    a dense cluster of soul-forces into a single sign, creating a point of unusually
                    focused expression. This is not fragmentation but intensity — a region of the
                    biography where multiple spheres of life converge and reinforce one another. The
                    gift of the stellium is the gift of depth: the capacity to work a single domain with
                    accumulated force, to bring multiple dimensions of the self to bear on one essential
                    task.
                  </p>
                  {PLANET_IN_SIGN_MAP[getLookupKey('Sun', stellium.sign)] && (
                    <div className="mt-3">
                      <p className="text-[10px] uppercase tracking-wider text-ink-muted mb-1">
                        {stellium.sign} — Sign Field
                      </p>
                      {(() => {
                        const c = PLANET_IN_SIGN_MAP[getLookupKey('Sun', stellium.sign)];
                        return c ? (
                          <p className="text-xs text-ink-muted leading-relaxed">
                            {c.traditional_en}
                          </p>
                        ) : null;
                      })()}
                    </div>
                  )}
                </div>
              }
            />
          ) : dominantHouse ? (
            <GiftCard
              title={`Concentrated Gift — House ${dominantHouse.house}`}
              extra={
                <div className="mt-1">
                  <p className="text-xs text-ink-muted">
                    {dominantHouse.planets.join(' · ')}
                  </p>
                  <p className="text-sm text-ink leading-relaxed mt-2">
                    A concentration of {dominantHouse.planets.length} planets in House {dominantHouse.house}{' '}
                    focuses a significant portion of the biographical energy into a single arena of
                    lived experience. This house becomes the primary theater in which the I&apos;s forces
                    are deployed — the arena of life in which the soul&apos;s accumulated resources
                    converge and find their most concentrated expression. The gift encoded here is not
                    spread thin across many domains but worked deeply in one.
                  </p>
                  {PLANET_IN_HOUSE_MAP[getHouseLookupKey('Sun', dominantHouse.house)] && (
                    <div className="mt-3">
                      {(() => {
                        const c = PLANET_IN_HOUSE_MAP[getHouseLookupKey('Sun', dominantHouse.house)];
                        return c ? (
                          <>
                            <p className="text-[10px] uppercase tracking-wider text-ink-muted mb-1">
                              House {dominantHouse.house} — Arena
                            </p>
                            <p className="text-xs text-ink-muted leading-relaxed">
                              {c.traditional_en}
                            </p>
                          </>
                        ) : null;
                      })()}
                    </div>
                  )}
                </div>
              }
            />
          ) : (
            <div className="bg-white rounded-[18px] border border-[#E5E1D8] p-5">
              <p className="text-[10px] uppercase tracking-widest text-ink-muted font-ui mb-1">
                Concentrated Gift — Configuration
              </p>
              <p className="text-sm text-ink leading-relaxed">
                No dominant stellium or house concentration detected. The gifts of this chart are
                distributed across multiple spheres — a breadth of endowment rather than a single
                intense focal point. Read the Jupiter, Venus, and trine configurations in the Soul
                Gifts section above for the complete gift map.
              </p>
            </div>
          )}

        </div>
      </div>

      {/* ── Navigation footer ─────────────────────────────────────────────────── */}
      <div className="bg-white rounded-[18px] border border-[#E5E1D8] p-5 flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
        <div className="flex flex-col gap-2">
          <Link
            href="/biography/chapter5"
            className="text-sm text-midnight hover:underline font-medium"
          >
            ← Chapter 5: Aspects &amp; Configurations
          </Link>
          <Link
            href="/biography"
            className="text-sm text-ink-muted hover:text-ink transition-colors"
          >
            Back to Biography Overview
          </Link>
        </div>
        <Link
          href="/reports/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-midnight text-white rounded-[26px] text-sm font-semibold hover:opacity-90 transition-opacity shrink-0"
        >
          Practitioner Notes Version →
        </Link>
      </div>

    </div>
  );
}
