'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Chip } from '@/components/Chip';
import { Card } from '@/components/Card';
import { Headline } from '@/components/Headline';
import { Body } from '@/components/Body';
import { Meta } from '@/components/Meta';
import { ZoomableWheel } from '@/components/ZoomableWheel';
import { AstralChart } from '@/lib/chartCalculator';
import { SIGN_SLUGS, getPlacementContent } from '@/content/placements';
import { loadEvents, STREAM_AR, STREAM_GLYPH, type LoggedEvent } from '@/lib/events';
import { calculateTransits, orbLabel, formatExactDate, type Transit } from '@/lib/transits';
import { loadTraits, calculateTraits } from '@/lib/traitEngine';
import { NatalChartSetupForm } from '@/components/onboarding/NatalChartSetupForm';
import { TransitHeroCard } from '@/components/TransitHeroCard';
import { FrameworkLabel } from '@/components/FrameworkLabel';
import {
  ELEMENT_MEANING,
  MINERAL_MEANING,
  ORGAN_SIGNAL,
  HD_CENTRE_MEANING,
  ORGAN_SIGN_READING,
  ELEMENT_AR_ORGAN,
  HOUSE_THEME_SHORT,
} from '@/content/traitsMeaning';
import type { HousePosition } from '@/lib/chartCalculator';
import { planetSvgKey } from '@/lib/planetMeta';
import { FIXED_STARS, findStarConjunctions, starLongitudeAtJD, fixedStarSlug, type StarConjunction } from '@/content/fixedStars';
import { UNIFIED_TIMELINE, type UnifiedTimelineItem } from '@/app/explore/biographyData';
import { CalendarMonthView } from '@/app/explore/CalendarMonthView';

const ZODIAC_SIGNS_EN = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
function toAr(n: number | string): string {
  return String(n);
}

function lonToSignDeg(lon: number): string {
  const n = ((lon % 360) + 360) % 360;
  const sign = Math.floor(n / 30);
  const deg = Math.floor(n % 30);
  return `${deg}° ${ZODIAC_SIGNS_EN[sign]}`;
}

const chartSubtabs = [
  { key: 'planets', label: 'Planets' },
  { key: 'houses', label: 'Houses' },
  { key: 'aspects', label: 'Aspects' },
  { key: 'organs', label: 'Organs' },
  { key: 'stars', label: 'Fixed Stars' },
] as const;

const ZODIAC_SVG_KEYS = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sag', 'cap', 'aqua', 'pisces'];
const ZODIAC_NAMES_EN = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

function formatPosition(planet: any): string {
  return `${planet.sign} ⁦${toAr(planet.degree)}°⁩`;
}

const PLANET_DISPLAY_AR: Record<string, string> = {
  sun: 'Sun', moon: 'Moon', mercury: 'Mercury', venus: 'Venus', mars: 'Mars',
  jupiter: 'Jupiter', saturn: 'Saturn', uranus: 'Uranus', neptune: 'Neptune', pluto: 'Pluto',
  chiron: 'Chiron', northNode: 'North Node', southNode: 'South Node',
};

function transformChartToPlanets(chart: AstralChart | null): any[] {
  if (!chart) return [];

  const planetKeys: (keyof AstralChart)[] = ['saturn', 'northNode', 'southNode', 'jupiter', 'mars', 'venus', 'mercury', 'uranus', 'neptune', 'pluto'];

  return planetKeys.map((key) => {
    const planet = chart[key];
    if (typeof planet === 'object' && planet !== null && 'name' in planet) {
      // North Node always moves retrograde by definition
      const retrograde = key === 'northNode' ? true : !!(planet as any).retrograde;
      return {
        name: PLANET_DISPLAY_AR[key as string] ?? planet.name,
        position: formatPosition(planet),
        key,
        svgKey: planetSvgKey(key as string),
        retrograde,
      };
    }
    return null;
  }).filter(Boolean);
}

function transformChartToSigns(chart: AstralChart | null): any[] {
  if (!chart) return [];

  const elements = ['Fire', 'Earth', 'Air', 'Water'];
  const houseNames = ['1st · Ascendant', '2nd', '3rd', '4th', '5th', '6th', '7th · Descendant', '8th', '9th', '10th · Midheaven', '11th', '12th'];

  return ZODIAC_NAMES_EN.map((name, idx) => ({
    name,
    svgKey: ZODIAC_SVG_KEYS[idx],
    house: houseNames[idx],
    element: elements[idx % 4],
  }));
}

function transformChartToHouses(chart: AstralChart | null): any[] {
  if (!chart || !chart.houses) return [];
  
  const houseThemes = [
    'Self · Body',
    'Resources · Values',
    'Mind · Communication',
    'Roots · Home',
    'Creativity · Pleasure',
    'Work · Daily Practice',
    'Other · Partnership',
    'Depth · Shared',
    'Horizon · Meaning',
    'Career · Legacy',
    'Community · Dreams',
    'Retreat · Unconscious',
  ];

  const houseNumbers = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

  return chart.houses.map((house, idx) => ({
    num: houseNumbers[idx],
    theme: houseThemes[idx],
    cusp: `${house.sign} ⁦${toAr(house.degree)}°⁩`,
  }));
}

function calculateAspects(chart: AstralChart | null): any[] {
  if (!chart) return [];
  
  const aspects = [];
  const planetList = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto', 'northNode', 'southNode'];
  
  const aspectTypes = [
    { angle: 0,   name: 'Conjunction', symbol: '☌', orb: 8, color: '#5C5C7A' },
    { angle: 60,  name: 'Sextile',     symbol: '⚹', orb: 6, color: '#4A7FB5' },
    { angle: 90,  name: 'Square',      symbol: '▫', orb: 8, color: '#C0392B' },
    { angle: 120, name: 'Trine',       symbol: '△', orb: 8, color: '#27AE60' },
    { angle: 180, name: 'Opposition',  symbol: '☍', orb: 8, color: '#C0392B' },
  ];
  
  for (let i = 0; i < planetList.length; i++) {
    for (let j = i + 1; j < planetList.length; j++) {
      const p1Key = planetList[i] as keyof AstralChart;
      const p2Key = planetList[j] as keyof AstralChart;
      const p1 = chart[p1Key];
      const p2 = chart[p2Key];
      
      if (typeof p1 === 'object' && p1 !== null && 'longitude' in p1 && 
          typeof p2 === 'object' && p2 !== null && 'longitude' in p2) {
        const diff = Math.abs((p1.longitude - p2.longitude + 180) % 360 - 180);
        
        for (const aspectType of aspectTypes) {
          const orb = Math.abs(diff - aspectType.angle);
          if (orb <= aspectType.orb) {
            aspects.push({
              aspect: `${p1.name} ${aspectType.symbol} ${p2.name}`,
              orb: `${toAr(orb.toFixed(0))}°`,
              orbDeg: orb,
              type: aspectType.name,
              color: aspectType.color,
              slug: `${planetList[i]}-${planetList[j]}`,
            });
          }
        }
      }
    }
  }
  
  return aspects.sort((a, b) => a.orbDeg - b.orbDeg);
}

// Three-card voice intro: shows the user's Sun + Rising + Moon
// with one line of meaning pulled from placements.ts. First-impression
// surface for a newcomer who would otherwise face only a wheel of symbols.
function ChartVoiceIntro({ chart }: { chart: AstralChart }) {
  const sunSlug = SIGN_SLUGS[chart.sun.signNumber];
  const moonSlug = SIGN_SLUGS[chart.moon.signNumber];
  const risingSignNumber = Math.floor((chart.asc % 360) / 30);
  const risingSlug = SIGN_SLUGS[risingSignNumber];
  const risingName = ZODIAC_NAMES_EN[risingSignNumber];

  const sunVoice = getPlacementContent('planet', `sun:${sunSlug}`);
  const moonVoice = getPlacementContent('planet', `moon:${moonSlug}`);
  // Rising has no planet entry — fall back to the sign's own essence.
  const risingVoice = getPlacementContent('sign', risingSlug);

  const items: Array<{ label: string; signName: string; svgKey: string; meaning: string | undefined; bg: string; accent: string }> = [
    {
      label: 'Your Sun',
      signName: chart.sun.sign,
      svgKey: 'sun',
      meaning: sunVoice?.evolutionary,
      bg: 'linear-gradient(135deg, #F8D6BE 0%, #F0C0A0 100%)',
      accent: '#9A3F30',
    },
    {
      label: 'Your Ascendant',
      signName: risingName,
      svgKey: risingSlug,
      meaning: risingVoice?.evolutionary,
      bg: 'linear-gradient(135deg, #D8DFC8 0%, #B8C4A8 100%)',
      accent: '#475A3F',
    },
    {
      label: 'Your Moon',
      signName: chart.moon.sign,
      svgKey: 'moon',
      meaning: moonVoice?.evolutionary,
      bg: 'linear-gradient(135deg, #C2D3E2 0%, #A8C0D6 100%)',
      accent: '#33485F',
    },
  ];

  return (
    <div className="px-5 flex flex-col gap-3">
      {items.map((it) => (
        <Link
          key={it.label}
          href={it.svgKey === 'sun' || it.svgKey === 'moon' ? `/self/planet/${it.svgKey}` : `/self/sign/${it.svgKey}`}
          className="block"
        >
          <div className="relative rounded-[20px] overflow-hidden p-5" style={{ background: it.bg }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex-shrink-0 rounded-full bg-white/60 flex items-center justify-center">
                <div
                  className="w-7 h-7"
                  style={{
                    WebkitMaskImage: `url('/svg/${it.svgKey}.svg')`,
                    maskImage: `url('/svg/${it.svgKey}.svg')`,
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                    background: it.accent,
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-semibold tracking-wider mb-1" style={{ color: it.accent }}>
                  {it.label} · {it.signName}
                </div>
                <div className="font-serif text-[15px] text-ink leading-[1.55]">
                  {it.meaning ?? 'Placement reading coming soon.'}
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}



function FixedStarsView({ chart, onNavigate }: { chart: AstralChart | null; onNavigate: () => void }) {
  const [filter, setFilter] = useState<'active' | 'all'>('active');
  const [conjunctions, setConjunctions] = useState<StarConjunction[]>([]);

  useEffect(() => {
    if (!chart) return;
    const jd = typeof (chart as any).timestamp === 'number' ? (chart as any).timestamp + 2451545.0 : 2451545.0;
    setConjunctions(findStarConjunctions(chart as unknown as Record<string, { longitude: number; name: string }>, jd, 3));
  }, [chart]);

  const activeStarKeys = new Set(conjunctions.map((c) => c.star.name));
  const visibleStars = filter === 'active' && conjunctions.length > 0
    ? FIXED_STARS.filter((s) => activeStarKeys.has(s.name))
    : FIXED_STARS;

  return (
    <div className="flex flex-col gap-3 px-5 pb-6">
      {/* Filter chips */}
      <div className="flex gap-2 pt-1">
        {([['active', 'In my chart'], ['all', 'All']] as const).map(([k, label]) => (
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
        <p className="text-sm text-ink-muted">Load your chart to see conjunctions.</p>
      )}
      {filter === 'active' && chart && conjunctions.length === 0 && (
        <p className="text-sm text-ink-muted">No conjunctions within the standard orb for this chart.</p>
      )}

      {visibleStars.map((star) => {
        const conj = conjunctions.filter((c) => c.star.name === star.name);
        const isActive = conj.length > 0;
        const jd = chart && typeof (chart as any).timestamp === 'number' ? (chart as any).timestamp + 2451545.0 : 2451545.0;
        const currentLon = starLongitudeAtJD(star, jd);
        const slug = fixedStarSlug(star.name);

        return (
          <Link
            key={star.name}
            href={`/self/fixed-stars/${slug}`}
            className="block"
            onClick={onNavigate}
          >
            <div
              className="bg-white rounded-[14px] p-3.5 flex flex-col gap-2"
              style={{ border: isActive ? '1.5px solid #E9785E' : '1px solid #E8E2D2' }}
            >
              <div className="flex gap-3.5 items-start">
                <div className="w-9 h-9 rounded-full bg-cream-soft flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[15px]" style={{ color: isActive ? '#E9785E' : '#5C5C7A' }}>✦</span>
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
              {conj.length > 0 && (
                <div className="flex flex-col gap-1 pt-1 border-t border-rule-soft">
                  {conj.map((c) => (
                    <div key={c.planet} className="flex justify-between items-center">
                      <span className="text-xs text-coral font-semibold">Conjunct {c.planet}</span>
                      <span className="text-[11px] text-ink-muted">orb {c.orb}°</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Link>
        );
      })}

    </div>
  );
}

const ELEMENT_COLORS: Record<string, string> = {
  fire: '#E9785E', earth: '#BDAA82', air: '#C2D3E2', water: '#7E97B8',
};
const ELEMENT_AR: Record<string, string> = {
  fire: 'نار', earth: 'تراب', air: 'هواء', water: 'ماء',
};

const EN_MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function ChartView({ chart }: { chart: AstralChart | null }) {
  const [activeSubtab, setActiveSubtab] = useState<string>('planets');
  const [transits, setTransits] = useState<Transit[]>([]);
  const [aspectFilter, setAspectFilter] = useState<string>('All');
  const [birthData, setBirthData] = useState<{ name?: string; year?: number; month?: number; day?: number; hour?: number; minute?: number; timeUnknown?: boolean } | null>(null);

  const [notedTransitKeys, setNotedTransitKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem('hygiea.birth-data');
      if (raw) setBirthData(JSON.parse(raw));
    } catch { /* localStorage unavailable */ }
  }, []);

  const planets = transformChartToPlanets(chart);
  const signs = transformChartToSigns(chart);
  const houses = chart ? transformChartToHouses(chart) : [];
  const aspects = calculateAspects(chart);

  // Build set of transit keys that have at least one logged note
  useEffect(() => {
    const events = loadEvents();
    const keys = new Set(
      events
        .filter((e) => e.placement?.type === 'aspect' && e.placement.key)
        .map((e) => e.placement!.key)
    );
    setNotedTransitKeys(keys);
  }, []);

  // Restore subtab when navigating back from a detail page
  useEffect(() => {
    const saved = sessionStorage.getItem('hygiea.self.subtab');
    if (saved) {
      sessionStorage.removeItem('hygiea.self.subtab');
      setActiveSubtab(saved);
    }
  }, []);

  // Save scroll + subtab before leaving to a detail page
  const saveNavState = () => {
    sessionStorage.setItem('hygiea.self.scrollY', String(window.scrollY));
    sessionStorage.setItem('hygiea.self.subtab', activeSubtab);
  };

  useEffect(() => {
    if (chart) setTransits(calculateTransits(chart).slice(0, 8));
  }, [chart]);

  if (!chart) {
    return (
      <div className="px-5 py-12 text-center">
        <Body muted>Complete your chart setup first.</Body>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Sub-tabs + fixed stars link */}
      <div className="px-5 pt-6 flex items-center justify-between">
        <div className="overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {chartSubtabs.map((tab) => (
              <Chip
                key={tab.key}
                active={activeSubtab === tab.key}
                onClick={() => setActiveSubtab(tab.key)}
              >
                {tab.label}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      {/* Chart wheel + compact planet grid */}
      {activeSubtab === 'planets' && (() => {
        const angleLon = (lon: number) => {
          const norm = ((lon % 360) + 360) % 360;
          return `${Math.floor(norm % 30)}° ${ZODIAC_NAMES_EN[Math.floor(norm / 30)]}`;
        };
        const angleSign = (lon: number) => ZODIAC_SVG_KEYS[Math.floor(((lon % 360) + 360) % 360 / 30)];
        const risingIdx = Math.floor(((chart.asc % 360) + 360) % 360 / 30);
        const maskStyle = (svgKey: string) => ({
          WebkitMaskImage: `url('/svg/${svgKey}.svg')`,
          maskImage: `url('/svg/${svgKey}.svg')`,
          WebkitMaskSize: 'contain', maskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center', maskPosition: 'center',
          background: '#E9785E',
        });
        const gridItems = [
          { key: 'sun',       name: 'Sun',        svgKey: 'sun',                      pos: formatPosition(chart.sun),       href: '/self/planet/sun',       rx: false },
          { key: 'moon',      name: 'Moon',         svgKey: 'moon',                     pos: formatPosition(chart.moon),      href: '/self/planet/moon',      rx: false },
          { key: 'mercury',   name: 'Mercury',         svgKey: 'mercury',                  pos: formatPosition(chart.mercury),   href: '/self/planet/mercury',   rx: !!chart.mercury.retrograde },
          { key: 'venus',     name: 'Venus',        svgKey: 'venus',                    pos: formatPosition(chart.venus),     href: '/self/planet/venus',     rx: !!chart.venus.retrograde },
          { key: 'mars',      name: 'Mars',        svgKey: 'mars',                     pos: formatPosition(chart.mars),      href: '/self/planet/mars',      rx: !!chart.mars.retrograde },
          { key: 'jupiter',   name: 'Jupiter',       svgKey: 'jupiter',                  pos: formatPosition(chart.jupiter),   href: '/self/planet/jupiter',   rx: !!chart.jupiter.retrograde },
          { key: 'saturn',    name: 'Saturn',           svgKey: 'saturn',                   pos: formatPosition(chart.saturn),    href: '/self/planet/saturn',    rx: !!chart.saturn.retrograde },
          { key: 'uranus',    name: 'Uranus',       svgKey: 'uranus',                   pos: formatPosition(chart.uranus),    href: '/self/planet/uranus',    rx: !!chart.uranus.retrograde },
          { key: 'neptune',   name: 'Neptune',         svgKey: 'neptune',                  pos: formatPosition(chart.neptune),   href: '/self/planet/neptune',   rx: !!chart.neptune.retrograde },
          { key: 'pluto',     name: 'Pluto',         svgKey: 'pluto',                    pos: formatPosition(chart.pluto),     href: '/self/planet/pluto',     rx: !!chart.pluto.retrograde },
          { key: 'northNode', name: 'North Node',    svgKey: planetSvgKey('northNode'),  pos: formatPosition(chart.northNode), href: '/self/planet/northNode', rx: true },
          { key: 'southNode', name: 'South Node',    svgKey: planetSvgKey('southNode'),  pos: formatPosition(chart.southNode), href: '/self/planet/southNode', rx: false },
          ...(!birthData?.timeUnknown ? [
            { key: 'ac', name: 'Ascendant (AC)',      svgKey: ZODIAC_SVG_KEYS[risingIdx],       pos: angleLon(chart.asc),              href: '/self/house/1',  rx: false },
            { key: 'ic', name: 'IC',             svgKey: angleSign(chart.houses[3].cusp),  pos: angleLon(chart.houses[3].cusp),   href: '/self/house/4',  rx: false },
            { key: 'dc', name: 'DC',             svgKey: angleSign(chart.houses[6].cusp),  pos: angleLon(chart.houses[6].cusp),   href: '/self/house/7',  rx: false },
            { key: 'mc', name: 'MC',             svgKey: angleSign(chart.mc),              pos: angleLon(chart.mc),               href: '/self/house/10', rx: false },
          ] : []),
        ];
        // Birth info header
        const bd = birthData;
        const dateStr = bd?.year ? `${bd.day ?? 0} ${EN_MONTHS[(bd.month ?? 1) - 1]} ${bd.year}` : '';
        const timeStr = bd && !bd.timeUnknown && bd.hour !== undefined
          ? `${String(bd.hour).padStart(2,'0')}:${String(bd.minute ?? 0).padStart(2,'0')}`
          : '';
        return (
          <>
            {/* Birth info */}
            {bd?.name && (
              <div className="px-5 pt-2 pb-1 flex items-center justify-between">
                <div>
                  <div className="font-serif text-lg text-ink">{bd.name}</div>
                  <div className="text-[11px] text-ink-muted mt-0.5">
                    {dateStr}{timeStr ? ` · ${timeStr}` : ''}
                  </div>
                </div>
                <Link href="/settings/edit-birth" className="text-[11px] text-ink-muted underline underline-offset-2">
                  Edit
                </Link>
              </div>
            )}
            <div className="w-full pt-2">
              <ZoomableWheel size={9999} tone="paper" chart={chart} showHouses={!birthData?.timeUnknown} />
            </div>
            <div className="px-5 pb-6">
              {/* Modality + Element summary — 2 columns */}
              {(() => {
                const SIGN_ELEMENT: Record<number, string> = { 0:'Fire',3:'Water',1:'Earth',2:'Air',4:'Fire',5:'Earth',6:'Air',7:'Water',8:'Fire',9:'Earth',10:'Air',11:'Water' };
                const SIGN_MODALITY: Record<number, string> = { 0:'Cardinal',1:'Fixed',2:'Mutable',3:'Cardinal',4:'Fixed',5:'Mutable',6:'Cardinal',7:'Fixed',8:'Mutable',9:'Cardinal',10:'Fixed',11:'Mutable' };
                const ELEM_COLOR: Record<string, string> = { 'Fire':'#E9785E','Earth':'#BDAA82','Air':'#C2D3E2','Water':'#7E97B8' };
                const MODAL_COLOR: Record<string, string> = { 'Cardinal':'#E9785E','Fixed':'#7E97B8','Mutable':'#8FA084' };
                const pKeys = ['sun','moon','mercury','venus','mars','jupiter','saturn','uranus','neptune','pluto'] as const;
                const elemCount: Record<string,number> = {};
                const modCount: Record<string,number> = {};
                for (const k of pKeys) {
                  const p = (chart as any)[k];
                  if (!p) continue;
                  const signIdx = Math.floor(((p.longitude % 360) + 360) % 360 / 30);
                  const el = SIGN_ELEMENT[signIdx]; const mo = SIGN_MODALITY[signIdx];
                  elemCount[el] = (elemCount[el] ?? 0) + 1;
                  modCount[mo] = (modCount[mo] ?? 0) + 1;
                }
                const sortedElem = Object.entries(elemCount).sort((a,b)=>b[1]-a[1]);
                const sortedMod = Object.entries(modCount).sort((a,b)=>b[1]-a[1]);
                return (
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="rounded-[14px] p-3" style={{ background: '#F5F2EA', border: '1px solid #E5E1D8' }}>
                      <div className="text-[10px] font-semibold tracking-wider text-ink-muted mb-2">ELEMENTS</div>
                      <div className="flex flex-col gap-1.5">
                        {sortedElem.map(([el, cnt]) => (
                          <div key={el} className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5">
                              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: ELEM_COLOR[el] }} />
                              <span className="text-[12px] text-ink font-medium">{el}</span>
                            </div>
                            <span className="text-[11px] text-ink-muted font-mono">{toAr(cnt)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-[14px] p-3" style={{ background: '#F5F2EA', border: '1px solid #E5E1D8' }}>
                      <div className="text-[10px] font-semibold tracking-wider text-ink-muted mb-2">MODALITIES</div>
                      <div className="flex flex-col gap-1.5">
                        {sortedMod.map(([mo, cnt]) => (
                          <div key={mo} className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5">
                              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: MODAL_COLOR[mo] }} />
                              <span className="text-[12px] text-ink font-medium">{mo}</span>
                            </div>
                            <span className="text-[11px] text-ink-muted font-mono">{toAr(cnt)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
              <div className="text-[11px] font-semibold tracking-wider text-ink-muted mb-3">PLANET POSITIONS</div>
              {/* Planet cards with photo backgrounds */}
              {(() => {
                // Image backgrounds for all planets that have a photo
                const IMG: Record<string, string> = {
                  sun:       '/media/sun.JPG',
                  moon:      '/media/moon.JPG',
                  mercury:   '/media/mercury.JPG',
                  venus:     '/media/venus.JPG',
                  mars:      '/media/mars.JPG',
                  jupiter:   '/media/jup.JPG',
                  saturn:    '/media/saturn.JPG',
                  uranus:    '/media/uranus.JPG',
                  neptune:   '/media/neptune.JPG',
                  pluto:     '/media/pluto.JPG',
                  northNode: '/media/north node.JPG',
                  southNode: '/media/south node.JPG',
                };
                // Gradient fallback for angles (no photo available)
                const GRAD: Record<string, string> = {
                  ac: 'linear-gradient(140deg, #F5C0B0 0%, #D06050 100%)',
                  ic: 'linear-gradient(140deg, #B0D8F8 0%, #5090C0 100%)',
                  dc: 'linear-gradient(140deg, #C08080 0%, #802020 100%)',
                  mc: 'linear-gradient(140deg, #6080C0 0%, #203070 100%)',
                };

                const iconStyle = (svgKey: string, color: string) => ({
                  WebkitMaskImage: `url('/svg/${svgKey}.svg')`,
                  maskImage: `url('/svg/${svgKey}.svg')`,
                  WebkitMaskSize: 'contain', maskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center', maskPosition: 'center',
                  background: color,
                });

                return (
                  // Single unified grid — all cards same size, same gap
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {gridItems.map(item => {
                      const img = IMG[item.key];
                      const grad = GRAD[item.key] ?? 'linear-gradient(140deg, #E8E2D8 0%, #C0B8A8 100%)';

                      return (
                        <Link key={item.key} href={item.href} onClick={saveNavState} className="block">
                          <div
                            className="rounded-[18px] aspect-square flex flex-col justify-end p-4 relative overflow-hidden"
                            style={img ? undefined : { background: grad }}
                          >
                            {/* Photo background for planets */}
                            {img && (
                              <>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover" />
                                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)' }} />
                              </>
                            )}
                            {/* Planet icon */}
                            <div
                              className="absolute top-3 left-3 w-7 h-7 opacity-55 z-10"
                              style={iconStyle(item.svgKey, 'rgba(255,255,255,0.85)')}
                            />
                            <div className="relative z-10 font-serif text-[16px] text-white leading-snug drop-shadow-sm">
                              {item.name}{item.rx ? ' ℞' : ''}
                            </div>
                            <div className="relative z-10 text-[11px] text-white/70 mt-0.5 drop-shadow-sm">{item.pos}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          </>
        );
      })()}

      {/* Signs list */}
      {activeSubtab === 'signs' && (
        <div className="px-5 pb-6 flex flex-col gap-3">
          {signs.map((sign, idx) => (
            <Link key={sign.name} href={`/self/sign/${SIGN_SLUGS[idx]}`} className="block" onClick={saveNavState}>
              <Card>
                <div className="flex gap-3 items-center">
                  <div className="w-11 h-11 rounded-full bg-cream-soft flex items-center justify-center shrink-0">
                    <div
                      className="w-6 h-6"
                      style={{
                        WebkitMaskImage: `url('/svg/${sign.svgKey}.svg')`,
                        maskImage: `url('/svg/${sign.svgKey}.svg')`,
                        WebkitMaskSize: 'contain',
                        maskSize: 'contain',
                        WebkitMaskRepeat: 'no-repeat',
                        maskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'center',
                        maskPosition: 'center',
                        background: '#5C5C7A',
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-serif text-base text-ink">{sign.name}</div>
                    <div className="text-xs text-ink-muted mt-1">{sign.house} · {sign.element}</div>
                  </div>
                  <div className="text-lg text-ink-muted">‹</div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Houses list */}
      {activeSubtab === 'houses' && (
        <div className="px-5 pb-6 flex flex-col gap-3">
          {houses.map((house, idx) => (
            <Link key={house.num} href={`/self/house/${idx + 1}`} className="block" onClick={saveNavState}>
              <Card>
                <div className="flex gap-3 items-start">
                  <div className="font-serif text-lg text-coral w-12">{house.num}</div>
                  <div className="flex-1">
                    <div className="text-sm text-ink">{house.theme}</div>
                  </div>
                  <div className="text-xs text-ink-muted font-mono">{house.cusp}</div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Aspects list */}
      {activeSubtab === 'aspects' && (
        <>
          <div className="px-5 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {[
              { label: 'All',    color: null },
              { label: 'تربيع',   color: '#C0392B' },
              { label: 'اقتران',  color: '#5C5C7A' },
              { label: 'سُداس',   color: '#4A7FB5' },
              { label: 'تثليث',   color: '#27AE60' },
              { label: 'تقابل',   color: '#C0392B' },
            ].map(({ label, color }) => (
              <button
                key={label}
                onClick={() => setAspectFilter(label)}
                className="px-3.5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors shrink-0"
                style={{
                  background: aspectFilter === label ? (color ?? '#171B3A') : '#fff',
                  color: aspectFilter === label ? '#F5F2EA' : '#171B3A',
                  border: `1px solid ${aspectFilter === label ? (color ?? '#171B3A') : '#E5E1D8'}`,
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="px-5 pb-6 flex flex-col gap-3 mt-1">
            {(() => {
              const ASPECT_ORDER: Record<string, number> = {
                'تربيع': 1, 'اقتران': 2, 'سُداس': 3, 'تثليث': 4, 'تقابل': 5,
              };
              const filtered = aspects
                .filter((a) => aspectFilter === 'All' || a.type === aspectFilter)
                .sort((a, b) => (ASPECT_ORDER[a.type] ?? 99) - (ASPECT_ORDER[b.type] ?? 99));
              return filtered.length > 0 ? (
                filtered.map((aspect) => (
                  <Link
                    key={aspect.aspect}
                    href={`/self/aspect/${aspect.slug}`}
                    className="block"
                    onClick={saveNavState}
                  >
                    <Card>
                      <div className="flex items-center gap-3">
                        {/* Aspect symbol badge */}
                        {(() => {
                          const sym = aspect.aspect.match(/[☌⚹▫△☍]/)?.[0] ?? '·';
                          return (
                            <div
                              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-[16px] font-serif"
                              style={{ background: `${aspect.color}18`, color: aspect.color, border: `1.5px solid ${aspect.color}40` }}
                            >
                              {sym}
                            </div>
                          );
                        })()}
                        <div className="flex-1 min-w-0">
                          <div className="font-serif text-base text-ink">{aspect.aspect}</div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[12px] font-medium" style={{ color: aspect.color }}>{aspect.type}</span>
                            <span className="text-[11px] text-ink-muted font-mono">{aspect.orb}</span>
                          </div>
                        </div>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink-muted opacity-30 shrink-0 rotate-180">
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </div>
                    </Card>
                  </Link>
                ))
              ) : (
                <div className="text-center py-8 text-ink-muted text-sm">لا توجد جوانب في هذا التصفية</div>
              );
            })()}
          </div>
        </>
      )}

      {/* Active Transits list */}
      {/* Organs — medical astrology */}
      {activeSubtab === 'organs' && (() => {
        const traits = chart ? calculateTraits(chart) : loadTraits();
        if (!traits) return (
          <div className="px-5 py-12 text-center flex flex-col gap-3">
            <Body muted>أكمل إدراج بياناتك أولًا لتظهر قراءة الأعضاء.</Body>
            <Link href="/onboarding" className="text-coral text-sm font-medium">ابدأ الإدراج ←</Link>
          </div>
        );
        const PLANET_COLOR: Record<string, string> = {
          sun: '#FFC78A', moon: '#C2D3E2', mercury: '#C9D2BE',
          venus: '#F8D6BE', mars: '#E9785E', jupiter: '#9C8AB8', saturn: '#5A3E7A',
        };
        return (
          <div className="px-5 pb-6 flex flex-col gap-3 mt-4">
            <FrameworkLabel label="طبّ نجومي · قراءة هرمسية" />
            <p className="text-xs text-ink-muted leading-[1.7] -mt-1">
              كلّ كوكبٍ يحكم عضوًا. برجُه في خريطتك يُلوِّن طريقةَ تعبير ذلك العضو عن صحّته.
            </p>
            {traits.organs.map((o) => {
              const planetKey = (o as any).planetKey ?? o.planet;
              const signNumber = (o as any).signNumber ?? 0;
              const signKey = `${planetKey}:${signNumber}`;
              const signReading = ORGAN_SIGN_READING[signKey];
              const elementLabel = (o as any).element ? ELEMENT_AR_ORGAN[(o as any).element as 'fire'|'earth'|'air'|'water'] : undefined;
              const houseLabel = (o as any).houseNum ? HOUSE_THEME_SHORT[(o as any).houseNum as number] : undefined;
              const accentColor = PLANET_COLOR[planetKey] ?? '#E5E1D8';
              return (
                <Card key={planetKey}>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center mt-0.5" style={{ background: `${accentColor}30`, border: `1.5px solid ${accentColor}` }}>
                        <div className="w-4 h-4" style={{
                          WebkitMaskImage: `url('/svg/${planetKey}.svg')`, maskImage: `url('/svg/${planetKey}.svg')`,
                          WebkitMaskSize: 'contain', maskSize: 'contain', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
                          WebkitMaskPosition: 'center', maskPosition: 'center', background: accentColor,
                        }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-serif text-base text-ink">{o.organ}</div>
                        <div className="flex flex-wrap items-center gap-1.5 mt-1">
                          <span className="text-xs font-medium text-ink-muted">{o.planet}</span>
                          <span className="text-ink-muted opacity-40 text-xs">·</span>
                          <span className="text-xs font-semibold" style={{ color: accentColor }}>{(o as any).sign ?? ''}</span>
                          {(o as any).retrograde && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cream-soft text-ink-muted font-mono">℞</span>}
                          {elementLabel && <><span className="text-ink-muted opacity-40 text-xs">·</span><span className="text-[11px] text-ink-muted">{elementLabel}</span></>}
                          {houseLabel && <><span className="text-ink-muted opacity-40 text-xs">·</span><span className="text-[11px] text-ink-muted">بيت {houseLabel}</span></>}
                        </div>
                      </div>
                    </div>
                    {signReading ? (
                      <div className="text-sm text-ink leading-[1.8] px-3 py-2.5 rounded-[12px]" style={{ background: `${accentColor}14` }}>{signReading}</div>
                    ) : ORGAN_SIGNAL[o.organ] ? (
                      <div className="text-sm text-ink-muted leading-[1.7]">{ORGAN_SIGNAL[o.organ]}</div>
                    ) : null}
                  </div>
                </Card>
              );
            })}
          </div>
        );
      })()}

      {/* Fixed Stars */}
      {activeSubtab === 'stars' && <FixedStarsView chart={chart} onNavigate={saveNavState} />}

    </div>
  );
}

const organs = [
  { name: 'القلب · Sun', status: 'مفتوح ومُضخِّم', color: '#FFC78A' },
  { name: 'الدماغ · Moon', status: 'انعكاسٌ هادئ', color: '#C2D3E2' },
  { name: 'الرئتان · Mercury', status: 'يقظ ومتسائل', color: '#C9D2BE' },
  { name: 'الكليتان · Venus', status: 'تليّن وتتوازن', color: '#F8D6BE' },
  { name: 'المرارة · Mars', status: 'حدّةٌ تحتاج اتجاهًا', color: '#E9785E' },
  { name: 'الكبد · Jupiter', status: 'سعةٌ تطلب حدًّا', color: '#9C8AB8' },
  { name: 'الطحال · Saturn', status: 'تأمّلٌ بطيء', color: '#5A3E7A' },
];

const elements = [
  { name: 'نار', planets: 'Sun · Mars · Jupiter', theme: 'حرارةٌ تتقدّم', color: '#E9785E', pct: 42 },
  { name: 'هواء', planets: 'Mercury · Venus · Saturn', theme: 'فكرٌ يتحرّك', color: '#C2D3E2', pct: 28 },
  { name: 'ماء', planets: 'Moon · Neptune · Pluto', theme: 'شعورٌ يتلقّى', color: '#7E97B8', pct: 18 },
  { name: 'تراب', planets: 'Uranus', theme: 'بنيةٌ تستقرّ', color: '#BDAA82', pct: 12 },
];

function BodyView() {
  const [activeBodyTab, setActiveBodyTab] = useState<string>('organs');
  const traits = loadTraits();

  if (!traits) {
    return (
      <div className="px-5 py-12 text-center flex flex-col gap-3">
        <Body muted>أكمل إدراج بياناتك أولًا لتظهر سماتك.</Body>
        <Link href="/onboarding" className="text-coral text-sm font-medium">ابدأ الإدراج ←</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Sub-tabs */}
      <div className="px-5 pt-2 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {([['organs', 'الأعضاء'], ['hd', 'مراكز HD']] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveBodyTab(key)}
            className={`px-3.5 py-2 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
              activeBodyTab === key ? 'bg-ink text-cream' : 'bg-white text-ink border border-rule-soft'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Elements tab */}
      {activeBodyTab === 'elements' && (
        <div className="px-5 pb-6 flex flex-col gap-3">
          <div
            className="rounded-[18px] p-4 mb-1"
            style={{ background: ELEMENT_COLORS[traits.elements.dominant] + '22' }}
          >
            <div className="text-[11px] font-semibold tracking-wider text-ink-muted mb-2">
              عنصرك السائد · {ELEMENT_AR[traits.elements.dominant]}
            </div>
            <div className="font-serif text-[15px] text-ink leading-[1.75] mb-2">
              {ELEMENT_MEANING[traits.elements.dominant].essence}
            </div>
            <Body muted>{ELEMENT_MEANING[traits.elements.dominant].lesson}</Body>
          </div>
          {(['fire', 'earth', 'air', 'water'] as const).map((el) => (
            <Card key={el}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-serif text-base text-ink">{ELEMENT_AR[el]}</div>
                  <div className="text-xs text-ink-muted mt-1">{traits.elements[el]}%</div>
                </div>
                <div className="w-10 h-10 rounded-full" style={{ backgroundColor: ELEMENT_COLORS[el] }} />
              </div>
              <div className="h-1.5 bg-rule-soft rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${traits.elements[el]}%`, backgroundColor: ELEMENT_COLORS[el] }}
                />
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Minerals tab */}
      {activeBodyTab === 'minerals' && (
        <div className="px-5 pb-6 flex flex-col gap-3">
          <FrameworkLabel label="قراءة هرمسية تقليدية" />
          {traits.minerals.map((m) => (
            <Card key={m.planet}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full shrink-0 mt-0.5" style={{ backgroundColor: m.color }} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-ink-muted">{m.planet}</div>
                  <div className="font-serif text-base text-ink mt-0.5">{m.mineral}</div>
                  {MINERAL_MEANING[m.mineral] && (
                    <div className="text-sm text-ink-muted mt-2 leading-[1.7]">
                      {MINERAL_MEANING[m.mineral]}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Organs tab */}
      {activeBodyTab === 'organs' && (
        <div className="px-5 pb-6 flex flex-col gap-3">
          <FrameworkLabel label="طبّ نجومي · قراءة هرمسية" />
          <p className="text-xs text-ink-muted leading-[1.7] -mt-1">
            كلّ كوكبٍ يحكم عضوًا. برجُه في خريطتك يُلوِّن طريقةَ تعبير ذلك العضو عن صحّته.
          </p>
          {traits.organs.map((o) => {
            // Safe fallbacks for old localStorage data that may lack the new fields
            const planetKey = o.planetKey ?? o.organ;
            const signNumber = o.signNumber ?? 0;
            const signKey = `${planetKey}:${signNumber}`;
            const signReading = ORGAN_SIGN_READING[signKey];
            const elementLabel = o.element ? ELEMENT_AR_ORGAN[o.element] : undefined;
            const houseLabel = o.houseNum ? HOUSE_THEME_SHORT[o.houseNum] : undefined;
            // Accent colour per planet
            const PLANET_COLOR: Record<string, string> = {
              sun: '#FFC78A', moon: '#C2D3E2', mercury: '#C9D2BE',
              venus: '#F8D6BE', mars: '#E9785E', jupiter: '#9C8AB8', saturn: '#5A3E7A',
            };
            const accentColor = PLANET_COLOR[planetKey] ?? '#E5E1D8';
            return (
              <Card key={planetKey}>
                <div className="flex flex-col gap-3">
                  {/* Header row */}
                  <div className="flex items-start gap-3">
                    {/* Planet dot */}
                    <div
                      className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center mt-0.5"
                      style={{ background: `${accentColor}30`, border: `1.5px solid ${accentColor}` }}
                    >
                      <div
                        className="w-4 h-4"
                        style={{
                          WebkitMaskImage: `url('/svg/${planetKey}.svg')`,
                          maskImage: `url('/svg/${planetKey}.svg')`,
                          WebkitMaskSize: 'contain', maskSize: 'contain',
                          WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
                          WebkitMaskPosition: 'center', maskPosition: 'center',
                          background: accentColor,
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-serif text-base text-ink">{o.organ}</div>
                      <div className="flex flex-wrap items-center gap-1.5 mt-1">
                        <span className="text-xs font-medium text-ink-muted">{o.planet}</span>
                        <span className="text-ink-muted opacity-40 text-xs">·</span>
                        <span className="text-xs font-semibold" style={{ color: accentColor }}>{o.sign}</span>
                        {o.retrograde && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cream-soft text-ink-muted font-mono">℞</span>
                        )}
                        <span className="text-ink-muted opacity-40 text-xs">·</span>
                        <span className="text-[11px] text-ink-muted">{elementLabel}</span>
                        {houseLabel && (
                          <>
                            <span className="text-ink-muted opacity-40 text-xs">·</span>
                            <span className="text-[11px] text-ink-muted">بيت {houseLabel}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Sign-specific reading */}
                  {signReading ? (
                    <div
                      className="text-sm text-ink leading-[1.8] px-3 py-2.5 rounded-[12px]"
                      style={{ background: `${accentColor}14` }}
                    >
                      {signReading}
                    </div>
                  ) : ORGAN_SIGNAL[o.organ] ? (
                    <div className="text-sm text-ink-muted leading-[1.7]">
                      {ORGAN_SIGNAL[o.organ]}
                    </div>
                  ) : null}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* HD Centres tab */}
      {activeBodyTab === 'hd' && (
        <div className="px-5 pb-6 flex flex-col gap-3">
          <FrameworkLabel label="قراءة تصميم إنساني (Human Design)" />
          <div className="text-xs text-ink-muted mb-1 leading-[1.7]">
            المراكز المُعرَّفة تحمل طاقة ثابتة — غير المُعرَّفة مرنة ومتأثّرة بالمحيط.
          </div>
          {traits.hdCentres.map((c) => {
            const meaning = HD_CENTRE_MEANING[c.name];
            return (
              <Card key={c.name}>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-serif text-base text-ink">{c.name}</div>
                      <div className="text-xs text-ink-muted mt-1">{c.keywords}</div>
                    </div>
                    <span
                      className="text-xs font-medium px-2.5 py-1 rounded-full shrink-0"
                      style={{
                        background: c.defined ? '#E9785E' : '#F0F0F0',
                        color: c.defined ? '#FFFFFF' : '#5C5C7A',
                      }}
                    >
                      {c.defined ? 'مُعرَّف' : 'مفتوح'}
                    </span>
                  </div>
                  {meaning && (
                    <div className="text-sm text-ink-muted leading-[1.7]">
                      {c.defined ? meaning.defined : meaning.open}
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

// UNIFIED_TIMELINE is imported from biographyData

function toArabicNumStr(n: number): string {
  return String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[+d]);
}

const TRANSIT_ESSAY_LINKS = [
  { slug: 'jupiter-return', svgKey: 'jupiter', title: 'عودة المشتري', sub: 'كل ١٢ عامًا · التوسع والأفق', color: '#9C8AB8', readTime: '٦ دقائق' },
  { slug: 'chiron-return', svgKey: 'chiron',   title: 'عودة كيرون',  sub: 'حول سن الخمسين · الجرح والشفاء', color: '#A8A8A8', readTime: '٧ دقائق' },
  { slug: 'uranus-opposition', svgKey: 'uranus', title: 'تقابل أورانوس', sub: 'حول سن ٤٢ · صحوة منتصف العمر', color: '#7E97B8', readTime: '٧ دقائق' },
];

// ── Planet colour map for timeline dots ──────────────────────────────────
const PLANET_COLOR: Record<string, string> = {
  moon: '#8FA8C8', mercury: '#6BAD9B', venus: '#C08ABF', sun: '#D4A843',
  mars: '#C87070', jupiter: '#9C8AB8', saturn: '#7E97B8', uranus: '#7EC8C8',
  neptune: '#6B8ABF', pluto: '#8A7070', chiron: '#A8A8A8',
};

function itemStatus(
  item: UnifiedTimelineItem,
  currentAge: number | null,
): 'past' | 'current' | 'upcoming' {
  if (currentAge === null) return 'upcoming';
  if (item.type === 'phase') {
    if (currentAge >= item.age[1]) return 'past';
    if (currentAge >= item.age[0]) return 'current';
    return 'upcoming';
  }
  // transit: active window ~= age[0]–age[1]
  if (currentAge > item.age[1]) return 'past';
  if (currentAge >= item.age[0]) return 'current';
  return 'upcoming';
}

function UnifiedBiographyView() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [birthYear, setBirthYear] = useState<number | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('hygiea.birth-data');
      if (raw) setBirthYear(JSON.parse(raw).year ?? null);
    } catch {}
  }, []);

  const currentAge = birthYear ? new Date().getFullYear() - birthYear : null;

  // Auto-expand the current or next item
  useEffect(() => {
    if (expandedIdx !== null) return;
    const idx = UNIFIED_TIMELINE.findIndex(item => itemStatus(item, currentAge) === 'current');
    if (idx >= 0) {
      setExpandedIdx(idx);
    } else {
      const nextIdx = UNIFIED_TIMELINE.findIndex(item => itemStatus(item, currentAge) === 'upcoming');
      if (nextIdx >= 0) setExpandedIdx(nextIdx);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAge]);

  // Current phase for top summary card
  const currentPhaseItem = UNIFIED_TIMELINE.find(
    item => item.type === 'phase' && itemStatus(item, currentAge) === 'current'
  );
  const phaseProgress = currentPhaseItem && currentAge !== null
    ? (currentAge - currentPhaseItem.age[0]) / (currentPhaseItem.age[1] - currentPhaseItem.age[0])
    : null;

  const maskStyle = (key: string, color: string) => ({
    WebkitMaskImage: `url('/svg/${key}.svg')`, maskImage: `url('/svg/${key}.svg')`,
    WebkitMaskSize: 'contain', maskSize: 'contain',
    WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center', maskPosition: 'center',
    background: color,
  });

  return (
    <div className="px-5 pb-10 flex flex-col gap-4">
      {/* Section header */}
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className="text-coral text-xs font-semibold tracking-wider">✦</span>
          <span className="text-[11px] text-ink-muted font-semibold tracking-wider">السيرة البانورامية</span>
        </div>
        <p className="text-xs text-ink-muted leading-[1.6] mt-1">
          مراحل شتاينر السبعينية والعبورات الكونية الكبرى — خطٌّ زمني واحد عبر حياتك.
        </p>
      </div>

      <FrameworkLabel label="قراءة العلم الروحاني" />

      {/* Current phase summary card */}
      {currentAge !== null && currentPhaseItem && phaseProgress !== null ? (
        <div className="bg-white rounded-[18px] p-4 border border-rule-soft">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <div className="text-[11px] text-ink-muted font-semibold tracking-wider mb-0.5">عمرك الآن</div>
              <div className="font-serif text-3xl text-ink">
                {toArabicNumStr(currentAge)}{' '}
                <span className="text-base text-ink-muted font-sans">سنة</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-ink-muted font-semibold tracking-wider mb-0.5">المرحلة</div>
              <div className="font-serif text-xl text-coral">{currentPhaseItem.planet}</div>
            </div>
          </div>
          <div className="relative h-6 flex items-center mb-1">
            <div className="absolute inset-x-0 h-1 rounded-full bg-cream-soft" />
            <div
              className="absolute h-1 rounded-full bg-coral"
              style={{ width: `${phaseProgress * 100}%` }}
            />
            <div
              className="absolute w-2.5 h-2.5 rounded-full bg-coral border-2 border-white shadow-sm"
              style={{ left: `calc(${phaseProgress * 100}% - 5px)` }}
            />
            <div className="absolute left-0 top-5 text-[10px] text-ink-muted font-mono">
              {toArabicNumStr(currentPhaseItem.age[0])}
            </div>
            <div className="absolute right-0 top-5 text-[10px] text-ink-muted font-mono">
              {toArabicNumStr(currentPhaseItem.age[1])}
            </div>
          </div>
          <div className="mt-5 text-[11px] text-ink-muted text-center">
            {currentPhaseItem.name} · {currentPhaseItem.theme}
          </div>
        </div>
      ) : currentAge === null ? (
        <div className="bg-cream-soft rounded-[14px] p-4 text-sm text-ink-muted text-center">
          أدخل بيانات ميلادك لحساب مرحلتك في الخطّ الزمني.
        </div>
      ) : null}

      {/* Unified chronological timeline */}
      <div className="font-serif text-base text-ink mb-1">الخطّ الزمني</div>
      <div className="flex flex-col gap-0">
        {UNIFIED_TIMELINE.map((item, idx) => {
          const status = itemStatus(item, currentAge);
          const isExpanded = expandedIdx === idx;
          const dotColor = status === 'current'
            ? '#E9785E'
            : status === 'past'
            ? '#C0B89A'
            : PLANET_COLOR[item.svgKey] ?? '#9A9482';

          const isPhase = item.type === 'phase';
          const cardBg = status === 'current'
            ? 'bg-white border-coral/40 shadow-sm'
            : status === 'past'
            ? 'bg-white border-rule-soft opacity-60'
            : 'bg-white border-rule-soft';

          // Personal year calculation
          const personalYear = birthYear ? birthYear + Math.round(item.sortAge) : null;

          return (
            <div key={idx} className="flex gap-0">
              {/* Left: vertical timeline line + dot */}
              <div className="flex flex-col items-center" style={{ width: 36, flexShrink: 0 }}>
                {/* top connector */}
                <div
                  className="w-px flex-1"
                  style={{
                    background: idx === 0 ? 'transparent' : '#E8E2D2',
                    minHeight: 10,
                  }}
                />
                {/* dot */}
                <div
                  className="rounded-full flex items-center justify-center shrink-0"
                  style={{
                    width: isPhase ? 28 : 22,
                    height: isPhase ? 28 : 22,
                    background: status === 'current' ? '#FFF0EC' : '#F5F2EC',
                    border: status === 'current' ? '1.5px solid #E9785E' : '1px solid #E8E2D2',
                    boxShadow: status === 'current' ? '0 0 0 3px rgba(233,120,94,0.12)' : 'none',
                  }}
                >
                  <div
                    style={maskStyle(item.svgKey, dotColor)}
                    className={isPhase ? 'w-3.5 h-3.5' : 'w-3 h-3'}
                  />
                </div>
                {/* bottom connector */}
                <div
                  className="w-px flex-1"
                  style={{
                    background: idx === UNIFIED_TIMELINE.length - 1 ? 'transparent' : '#E8E2D2',
                    minHeight: 10,
                  }}
                />
              </div>

              {/* Right: card */}
              <div className="flex-1 pb-2 pt-1">
                <button
                  onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                  className={`w-full text-right rounded-[14px] p-3.5 border transition-all ${cardBg}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 text-right">
                      <div className="flex items-center gap-1.5 justify-end mb-0.5">
                        {/* type badge */}
                        <span
                          className="text-[9px] font-semibold tracking-wide px-1.5 py-0.5 rounded-full"
                          style={{
                            background: isPhase ? '#F0EDE6' : '#EEF2F8',
                            color: isPhase ? '#9A8A6A' : '#5A7A9A',
                          }}
                        >
                          {isPhase ? 'مرحلة' : 'عبور'}
                        </span>
                      </div>
                      <div className="font-serif text-sm text-ink leading-[1.3]">{item.name}</div>
                      <div className="text-[11px] text-ink-muted mt-0.5">
                        {item.ageLabel}
                        {personalYear ? ` · ~${toArabicNumStr(personalYear)}` : ''}
                        {' · '}{item.planet}
                      </div>
                      {!isExpanded && (
                        <div className="text-[11px] text-ink-muted mt-0.5 leading-[1.5] line-clamp-1">
                          {item.theme}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      {status === 'current' && (
                        <div
                          className="text-[10px] font-bold tracking-wide text-coral px-2 py-0.5 rounded-full"
                          style={{ background: 'rgba(233,120,94,0.10)' }}
                        >
                          أنت هنا
                        </div>
                      )}
                      {status === 'past' && (
                        <div className="text-[10px] text-ink-muted font-semibold">مضى</div>
                      )}
                      {status === 'upcoming' && (
                        <div className="text-[10px] text-ink-muted font-semibold">قادم</div>
                      )}
                      <span className="text-ink-muted text-xs">{isExpanded ? '›' : '‹'}</span>
                    </div>
                  </div>

                  {/* Expanded body */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-rule-soft text-right">
                      {status === 'current' && (
                        <div className="text-[11px] text-coral font-semibold mb-1.5">أنت في هذه المرحلة الآن</div>
                      )}
                      <p className="text-[13px] text-ink leading-[1.9]">{item.body}</p>
                      {item.prompt && (
                        <div className="mt-3.5 p-3 bg-cream-soft rounded-xl" style={{ borderInlineStart: '3px solid #E9785E' }}>
                          <div className="text-[10px] text-coral font-bold tracking-wide mb-1">Reflect</div>
                          <div className="text-[13px] text-ink leading-[1.8] font-serif">{item.prompt}</div>
                        </div>
                      )}
                    </div>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer: essay links */}
      <div className="mt-2">
        <div className="text-[11px] text-ink-muted font-bold tracking-wide mb-2.5">مقالات استبطانية</div>
        <div className="flex flex-col gap-2">
          {TRANSIT_ESSAY_LINKS.map((e) => (
            <Link key={e.slug} href={`/explore/transits/${e.slug}`}
              className="bg-white rounded-[14px] px-3.5 py-3 grid items-center gap-3 no-underline"
              style={{ border: '1px solid #E8E2D2', gridTemplateColumns: '36px 1fr auto' }}>
              <div className="w-8 h-8 rounded-2xl flex items-center justify-center shrink-0" style={{ background: e.color }}>
                <div className="w-5 h-5" style={maskStyle(e.svgKey, '#FFFFFF')} />
              </div>
              <div>
                <div className="font-serif text-[14.5px] text-ink leading-[1.3]">{e.title}</div>
                <div className="text-[11px] text-ink-muted mt-0.5">{e.sub}</div>
              </div>
              <div className="text-[10px] text-ink-muted font-mono whitespace-nowrap">{e.readTime}</div>
            </Link>
          ))}
        </div>
      </div>

      <div className="text-center text-[11px] text-ink-muted pt-1 pb-2">
        ٧٠ سنة · مراحل وعبورات · سَكنٌ كوكبيّ لكل فصل
      </div>
    </div>
  );
}


function SavedView() {
  const [events, setEvents] = useState<LoggedEvent[]>([]);

  useEffect(() => {
    setEvents(loadEvents());
  }, []);

  if (events.length === 0) {
    return (
      <div className="px-5 py-12 text-center flex flex-col gap-3">
        <Body muted>لم تسجّل أحداثًا بعد.</Body>
        <Link href="/log" className="text-coral text-sm font-medium">سجّل لحظتك الأولى ←</Link>
      </div>
    );
  }

  const fmt = (iso: string) =>
    new Intl.DateTimeFormat('ar', { day: 'numeric', month: 'long' }).format(new Date(iso));

  return (
    <div className="px-5 pb-6 flex flex-col gap-3">
      {events.map((event) => (
        <Link key={event.id} href={`/event/${event.id}`} className="block">
          <Card>
            <div className="flex justify-between items-start mb-2 gap-3">
              <div className="font-serif text-base text-ink">{event.text}</div>
              <div className="text-xs text-coral font-medium whitespace-nowrap">{fmt(event.date)}</div>
            </div>
            <div className="flex gap-1.5 flex-wrap mt-3 items-center">
              {event.stream && (
                <div className="bg-cream-soft rounded-full px-2.5 py-1 text-xs text-ink-muted">
                  {STREAM_GLYPH[event.stream]} {STREAM_AR[event.stream]}
                </div>
              )}
              {event.placement && (
                <div className="bg-cream-soft rounded-full px-2.5 py-1 text-xs text-ink-muted">
                  {event.placement.label}
                </div>
              )}
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}

// First-run walkthrough: three personalized screens pulled from the user's
// actual chart + placements.ts. Replaces the old generic "this is a natal
// chart" intro with something that names *this* person — Sun, Rising, Moon.
interface IntroStep {
  label: string;     // small kicker — "شمسك"
  signName: string;  // Arabic sign name
  svgKey: string;    // which SVG glyph to render
  title: string;     // "Your sun's path"
  body: string;      // one-line meaning from placements.ts
  accent: string;
}

function buildIntroSteps(chart: AstralChart): IntroStep[] {
  const sunSlug = SIGN_SLUGS[chart.sun.signNumber];
  const moonSlug = SIGN_SLUGS[chart.moon.signNumber];
  const risingSignNumber = Math.floor((chart.asc % 360) / 30);
  const risingSlug = SIGN_SLUGS[risingSignNumber];

  const sunVoice = getPlacementContent('planet', `sun:${sunSlug}`);
  const moonVoice = getPlacementContent('planet', `moon:${moonSlug}`);
  const risingVoice = getPlacementContent('sign', risingSlug);

  return [
    {
      label: 'Your Sun',
      signName: chart.sun.sign,
      svgKey: 'sun',
      title: "Your sun's path",
      body: sunVoice?.evolutionary ?? 'Your light takes shape in its own unique way.',
      accent: '#E9785E',
    },
    {
      label: 'Your Ascendant',
      signName: ZODIAC_NAMES_EN[risingSignNumber],
      svgKey: risingSlug,
      title: 'Your ascendant',
      body: risingVoice?.evolutionary ?? 'The face the world meets first.',
      accent: '#8FA084',
    },
    {
      label: 'Your Moon',
      signName: chart.moon.sign,
      svgKey: 'moon',
      title: 'Your moon',
      body: moonVoice?.evolutionary ?? 'What stirs beneath the surface has its own rhythm.',
      accent: '#7E97B8',
    },
  ];
}

function ChartIntroOverlay({ chart, onDone }: { chart: AstralChart; onDone: () => void }) {
  const [step, setStep] = useState(0);
  const steps = buildIntroSteps(chart);
  const current = steps[step];

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else onDone();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end" style={{ background: 'rgba(15,18,40,0.72)', backdropFilter: 'blur(2px)' }}>
      <div
        className="bg-cream max-w-[430px] mx-auto w-full rounded-t-[28px] px-6 pt-6 pb-10"
        style={{ boxShadow: '0 -8px 40px rgba(0,0,0,0.2)' }}
      >
        {/* Progress dots */}
        <div className="flex gap-1.5 mb-6 justify-center">
          {steps.map((_, i) => (
            <div
              key={i}
              className="h-1 rounded-full transition-all"
              style={{ width: i === step ? 24 : 6, background: i <= step ? current.accent : '#E8E2D2' }}
            />
          ))}
        </div>

        <div className="flex justify-center mb-3">
        </div>

        {/* Sign glyph in a circle */}
        <div className="flex justify-center mb-5">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: current.accent + '22' }}
          >
            <div
              className="w-11 h-11"
              style={{
                WebkitMaskImage: `url('/svg/${current.svgKey}.svg')`,
                maskImage: `url('/svg/${current.svgKey}.svg')`,
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                background: current.accent,
              }}
            />
          </div>
        </div>

        <div className="text-center text-[11px] font-semibold tracking-wider mb-1.5" style={{ color: current.accent }}>
          {current.label} · {current.signName}
        </div>
        <div className="font-serif text-2xl text-ink text-center mb-3 leading-snug">{current.title}</div>
        <div className="font-serif text-[15px] text-ink-muted leading-[1.8] text-center">{current.body}</div>

        <button
          onClick={next}
          className="mt-7 w-full h-[50px] rounded-[25px] bg-ink text-cream text-base font-medium"
        >
          {step < steps.length - 1 ? 'تابع' : 'ادخل خريطتك'}
        </button>
        <button onClick={onDone} className="mt-3 w-full text-center text-sm text-ink-muted py-2">
          تخطّى
        </button>
      </div>
    </div>
  );
}

// ── Active Transits — standalone top-level view ───────────────────────────────
function ActiveTransitsView({ chart, onNavigate }: { chart: AstralChart | null; onNavigate: () => void }) {
  const [transits, setTransits] = useState<Transit[]>([]);
  const [notedTransitKeys, setNotedTransitKeys] = useState<Set<string>>(new Set());
  const [aspectFilter, setAspectFilter] = useState<string>('All');

  useEffect(() => {
    if (!chart) return;
    setTransits(calculateTransits(chart));
    const events = loadEvents();
    const keys = new Set(
      events
        .filter(e => e.placement?.type === 'aspect' && e.placement.key)
        .map(e => e.placement!.key)
    );
    setNotedTransitKeys(keys);
  }, [chart]);

  const ASPECT_FILTERS = [
    { label: 'All', name: null },
    { label: 'اقتران', name: 'اقتران', color: '#5C5C7A' },
    { label: 'سُداس', name: 'سُداس', color: '#4A7FB5' },
    { label: 'تربيع', name: 'تربيع', color: '#C0392B' },
    { label: 'تثليث', name: 'تثليث', color: '#27AE60' },
    { label: 'تقابل', name: 'تقابل', color: '#C0392B' },
  ];

  const filtered = transits.filter(t =>
    aspectFilter === 'All' || t.aspectName === aspectFilter
  );

  if (!chart) {
    return (
      <div className="px-5 pt-8 text-center text-sm text-ink-muted">
        أضف خريطتك أولًا لعرض العبورات.
      </div>
    );
  }

  return (
    <div className="px-5 pt-6 pb-8">
      <Headline>العبورات</Headline>
      <p className="text-sm text-ink-muted mt-1 mb-4">ما يلامس خريطتك الآن، مرتّبًا بالقرب.</p>

      {/* Transit hero — same card from Today page, now lives here */}
      <div className="mb-5 -mx-5">
        <TransitHeroCard />
      </div>

      <div className="text-[11px] font-semibold tracking-wider text-ink-muted mb-2">العبورات على خريطتك</div>

      {/* Aspect filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-3" style={{ scrollbarWidth: 'none' }}>
        {ASPECT_FILTERS.map(f => (
          <button
            key={f.label}
            onClick={() => setAspectFilter(f.label)}
            className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors shrink-0"
            style={{
              background: aspectFilter === f.label ? (f.color ?? '#171B3A') : '#fff',
              color: aspectFilter === f.label ? '#F5F2EA' : '#171B3A',
              border: `1px solid ${aspectFilter === f.label ? (f.color ?? '#171B3A') : '#E8E2D8'}`,
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-ink-muted text-center py-6">
          {transits.length === 0 ? 'لا توجد عبورات نشطة ضمن المدى الآن.' : 'لا عبورات بهذا النوع حالياً.'}
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((t) => {
            const transitSlug = `${t.transitKey}-${t.natalKey}`;
            const isNoted = notedTransitKeys.has(transitSlug);
            return (
              <Link key={t.id} href={`/self/aspect/${transitSlug}`} className="block" onClick={onNavigate}>
                <div className="bg-white rounded-[20px] border border-rule-soft p-4 flex flex-col items-center text-center gap-3 hover:shadow-sm transition-shadow">
                  {/* Colored orb with symbol */}
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-[26px] font-serif shrink-0"
                    style={{
                      background: `radial-gradient(circle at 35% 35%, ${t.aspectColor}55, ${t.aspectColor}CC)`,
                      color: '#fff',
                      boxShadow: `0 4px 16px ${t.aspectColor}30`,
                    }}
                  >
                    {t.aspectSymbol}
                  </div>

                  {/* Planet names */}
                  <div className="flex-1">
                    <div className="font-serif text-[15px] text-ink leading-snug">
                      {t.transitName}
                    </div>
                    <div className="font-serif text-[13px] text-ink-muted leading-snug mt-0.5">
                      {t.natalName}
                    </div>
                  </div>

                  {/* Aspect + orb */}
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-[12px] font-semibold" style={{ color: t.aspectColor }}>
                      {t.aspectName}
                    </span>
                    <span className="text-[11px] text-ink-muted">{orbLabel(t.orb)}</span>
                  </div>

                  {/* Exact hit date */}
                  {t.exactDate && (
                    <div className="text-[11px] text-ink-muted bg-cream-soft rounded-full px-2.5 py-1">
                      {formatExactDate(t.exactDate)}
                    </div>
                  )}

                  {isNoted && (
                    <div className="flex items-center gap-1 text-[10px] font-semibold text-[#8FA084]">
                      <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="5.5" stroke="#8FA084" />
                        <path d="M3.5 6l1.8 1.8L8.5 4.5" stroke="#8FA084" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      مُدوَّن
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SelfPageInner() {
  const searchParams = useSearchParams();
  const [mainTab, setMainTab] = useState<string>(searchParams.get('tab') ?? 'chart');
  const [chart, setChart] = useState<AstralChart | null>(null);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('hygiea.primary-chart.v1');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setChart(parsed);
        if (!localStorage.getItem('hygiea.chart-guide-seen')) {
          setShowGuide(true);
        }
      } catch (e) {
        console.error('Failed to parse chart from localStorage:', e);
      }
    }
    const savedY = sessionStorage.getItem('hygiea.self.scrollY');
    if (savedY) {
      sessionStorage.removeItem('hygiea.self.scrollY');
      requestAnimationFrame(() => window.scrollTo({ top: parseInt(savedY, 10), behavior: 'instant' }));
    }
  }, []);

  const dismissGuide = () => {
    localStorage.setItem('hygiea.chart-guide-seen', '1');
    setShowGuide(false);
  };

  return (
    <div className="pb-32">
      {showGuide && chart && <ChartIntroOverlay chart={chart} onDone={dismissGuide} />}
      <div className="pt-0">
        {/* Main tabs — sticky header with underline style (Image #20) */}
        <div className="sticky top-0 z-40 bg-cream/95 backdrop-blur-xl border-b border-rule-soft">
          <div className="flex items-baseline justify-between px-5 pt-5 pb-0">
            <div className="font-serif text-[28px] text-ink -tracking-[0.5px]">أنت</div>
            <Link href="/journey-2" className="text-[13px] text-coral font-medium">
              سجلّاتك
            </Link>
          </div>
          <div className="flex gap-0 overflow-x-auto px-5 mt-2" style={{ scrollbarWidth: 'none' }}>
            {[
              { key: 'chart',   label: 'الخريطة' },
              { key: 'active',  label: 'العبورات' },
              ...(chart ? [{ key: 'transits', label: 'السيرة' }] : []),
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setMainTab(tab.key)}
                className="relative px-4 pb-3 pt-1 text-[14px] font-medium whitespace-nowrap transition-colors shrink-0"
                style={{ color: mainTab === tab.key ? '#171B3A' : '#5C5C7A' }}
              >
                {tab.label}
                {mainTab === tab.key && (
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-ink rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {mainTab === 'chart' && (
          <>
            {!chart ? (
              <NatalChartSetupForm onComplete={(newChart) => setChart(newChart)} />
            ) : (
              <>
                <ChartView chart={chart} />
                {/* Journey 1 entry — coming soon, locked, moved to end of page */}
                <div className="px-5 mt-6">
                  <div className="flex items-center justify-between py-3 px-4 rounded-[18px] bg-ink text-cream opacity-70 cursor-default">
                    <div>
                      <div className="font-serif text-base">الرحلة الأسبوعية</div>
                      <div className="text-xs text-cream/60 mt-0.5">معالجة شخصية · خطوة يومية</div>
                    </div>
                    <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)' }}>قريبًا</span>
                  </div>
                </div>

                {/* Teaching + Evening reflection — moved from the Today page */}
                <div className="px-5 mt-6 grid grid-cols-2 gap-3">
                  {/* Teaching */}
                  <div className="block cursor-default">
                    <div className="relative w-full aspect-square overflow-hidden rounded-[20px] opacity-70" style={{ background: '#0F1228' }}>
                      <img src="/media/blob-purple.webp" alt="" loading="lazy" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0) 42%, rgba(0,0,0,0.74) 100%)' }} />
                      <div className="absolute inset-0 flex flex-col justify-between p-5">
                        <div className="flex items-center justify-between">
                          <div className="text-[11px] text-cream/60 font-semibold tracking-wider">تعلّم</div>
                          <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)' }}>قريبًا</span>
                        </div>
                        <div>
                          <div className="font-serif text-xl text-cream leading-snug">كيف تقرأ عبورك اليومي؟</div>
                          <div className="text-xs text-cream/70 mt-1.5">ربط السماء بلحظتك الحياتية</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Evening reflection */}
                  <div className="block cursor-default">
                    <div className="relative w-full aspect-square overflow-hidden rounded-[20px] opacity-70" style={{ background: '#0F1228' }}>
                      <img src="/media/moon-flames.webp" alt="" loading="lazy" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0) 42%, rgba(0,0,0,0.74) 100%)' }} />
                      <div className="absolute inset-0 flex flex-col justify-between p-5">
                        <div className="flex items-center justify-between">
                          <div className="text-[11px] text-cream/60 font-semibold tracking-wider">قبل النوم</div>
                          <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)' }}>قريبًا</span>
                        </div>
                        <div>
                          <div className="font-serif text-xl text-cream leading-snug">المراجعة المسائية</div>
                          <div className="text-xs text-cream/70 mt-1.5">ثلاث لحظات من يومك</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* تقويم العبورات — moved from the Today page */}
                <div className="px-5 mt-8">
                  <div className="mb-4">
                    <h2 className="font-serif text-2xl text-ink -tracking-[0.5px]">تقويم العبورات</h2>
                    <p className="text-sm text-ink-muted mt-1">الأحداث الكونية الجماعية للشهر.</p>
                  </div>
                  <CalendarMonthView />
                </div>
              </>
            )}
          </>
        )}

        {mainTab === 'active' && (
          <ActiveTransitsView chart={chart} onNavigate={() => {
            const el = document.documentElement;
            sessionStorage.setItem('hygiea.self.scrollY', String(el.scrollTop || window.scrollY));
          }} />
        )}

        {mainTab === 'transits' && (
          <>
            {!chart ? (
              <div className="px-5 pt-10 text-center text-sm text-ink-muted">
                أدخل بيانات مولدك أولاً لعرض السيرة البانورامية.
              </div>
            ) : (
              <>
                <div className="px-5 mb-4">
                  <Headline>السيرة البانورامية</Headline>
                </div>
                <UnifiedBiographyView />
              </>
            )}
          </>
        )}

        {mainTab === 'saved' && (
          <>
            <div className="px-5 mb-6">
              <Headline>ما حفظت</Headline>
            </div>
            <SavedView />
          </>
        )}

      </div>
    </div>
  );
}

export default function SelfPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-cream" />}>
      <SelfPageInner />
    </Suspense>
  );
}
