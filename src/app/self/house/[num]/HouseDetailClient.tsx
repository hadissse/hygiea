'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { AstralChart } from '@/lib/chartCalculator';
import { getCurrentSky } from '@/lib/currentSky';
import { planetSvgKey } from '@/lib/planetMeta';
import { PLANET_IN_HOUSE } from '@/content/planetInHouseData';
import { STORAGE_KEYS } from '@/lib/storageKeys';

const ZODIAC_AR = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

const ZODIAC_SVG_KEYS = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sag', 'cap', 'aqua', 'pisces',
];

function norm360(d: number): number {
  return ((d % 360) + 360) % 360;
}

function lonToSignDeg(lon: number): string {
  const n = norm360(lon);
  const sign = Math.floor(n / 30);
  const deg = Math.floor(n % 30);
  return `${ZODIAC_AR[sign]} ${deg}°`;
}

// ── House metadata ─────────────────────────────────────────────────────────────

const HOUSE_ORDINALS_AR = [
  'House I', 'House II', 'House III', 'House IV', 'House V', 'House VI',
  'House VII', 'House VIII', 'House IX', 'House X', 'House XI', 'House XII',
];

const HOUSE_NAMES_AR = [
  'First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth',
  'Seventh', 'Eighth', 'Ninth', 'Tenth', 'Eleventh', 'Twelfth',
];

const HOUSE_THEMES_SHORT = [
  'Self · Body',
  'Resources · Field',
  'Mind · Near',
  'Roots · Hearth',
  'Creativity · Spark',
  'Work · Daily',
  'Other · Mirror',
  'Depth · Shared',
  'Meaning · Far',
  'Summit · Vocation',
  'Community · Future',
  'Retreat · Dissolution',
];

const HOUSE_FULL_DESCRIPTIONS: string[] = [
  'The First House is the threshold of the self — the first face you present to the world, the body you inhabit in this life. Carrying the ascendant, this house reveals the spontaneous impression you leave on those who meet you for the first time. Here lives the path you begin every journey with: how you introduce yourself and how you choose to appear. Your mode of living and your mirror to existence.',
  'The Second House asks: what do you truly possess? — not money alone, but the values you will not compromise, and the reserves you draw from. Here your relationship to entitlement and material security takes shape, along with what you offer the world through the resources of your hands, voice, and mind. What gives you a sense of safety? And what can you give without exhaustion?',
  'The Third House is your mind in daily motion — the living curiosity that asks, learns, and moves. Siblings, neighbors, and all who inhabit your near circle belong to its orbit. Here communication is woven: the written and spoken word, the sent message, the circulating idea. Short journeys and passing conversations may carry more revelation than you expect.',
  'The Fourth House is the deepest dwelling of the soul — the hidden root from which all branches spring. Family, emotional inheritance, and the inner homeland all flow from here. What do you carry from your childhood? And what foundation are you building on? At the end of a life, this house reveals where you return when everything else has tired.',
  'The Fifth House is the beating heart of creativity — the play that becomes art, the love that ignites life. Here lives the inner child who makes things simply for the joy of making. Children, lovers, and the projects into which you pour your soul all belong to its orbit. The courage to express yourself and risk being seen — this is the test of this house.',
  'The Sixth House is the daily discipline that translates ambition into reality. Health, routine, and detailed work find their meaning here. How you serve, how you care for your body, and the boundaries you consciously set on yourself — all of this is read in this house. Mastery is built through repetition, and repetition becomes love when it flows from an awake Sixth House.',
  'The Seventh House is your mirror in the other — what you find in those you choose as partner or adversary. Marriage, partnership, and long intimate relationships are shaped under this house. What you suppress in yourself appears in the partner opposite. Integration here is not merger but encounter: remaining yourself while expanding because the other holds something you need.',
  'The Eighth House is the world beneath the surface — shared resources, death and birth, and transformation through crisis. Here the soul attunes to what is deeper than the visible: inheritance, emotional debts, and the strength built in the most intense moments. The bankruptcy of the old self is this house\'s beginning, and what survives the fire is what was always real.',
  'The Ninth House is the horizon of meaning — philosophy, distant travel, and the faith that expands boundaries. Here lives the teacher, philosopher, and wanderer within you. What do you truly believe? And what mental map do you walk through life with? Universities, great texts, and other cultures are all doors this house knocks on in search of the wider truth.',
  'The Tenth House is the summit of what you see in yourself and what the world sees in you — career, reputation, and the legacy you leave. Here the self stands before society: what impact do you want to leave? And what role have you chosen in the great edifice? Success here is not achievement alone but the consistency between what you do and what you believe.',
  'The Eleventh House is the space of the collective dream — friends, community, and goals that transcend the individual. Here like souls meet and visions for the future take shape. What do you want to be better for the collective? And what network supports you and is supported by you? The great changes in the world always begin from this house when it finds aligned souls.',
  'The Twelfth House is the chamber of secrets — the unconscious, solitude, and the hidden world that operates beneath the surface. Here lives what you fear being seen, and what you have not yet found a voice for. Spirituality, contemplation, and dreams are bridges to this house. What is unresolved here forms the invisible constraints in your life. Gentle confrontation of what this house conceals releases enormous energy.',
];

const PLANET_AR: Record<string, string> = {
  sun: 'Sun', moon: 'Moon', mercury: 'Mercury', venus: 'Venus', mars: 'Mars',
  jupiter: 'Jupiter', saturn: 'Saturn', uranus: 'Uranus', neptune: 'Neptune', pluto: 'Pluto',
  chiron: 'Chiron', northNode: 'North Node', southNode: 'South Node',
};

const PLANET_KEYS = [
  'sun', 'moon', 'mercury', 'venus', 'mars',
  'jupiter', 'saturn', 'uranus', 'neptune', 'pluto',
  'chiron', 'northNode', 'southNode',
] as const;

// ── Helpers ───────────────────────────────────────────────────────────────────

function getPlanetsInHouse(chart: AstralChart, houseNum: number): { key: string; planet: AstralChart['sun'] }[] {
  const house = chart.houses[houseNum - 1];
  const nextHouse = chart.houses[houseNum % 12];
  const start = norm360(house.cusp);
  const end = norm360(nextHouse.cusp);
  const result: { key: string; planet: AstralChart['sun'] }[] = [];

  for (const key of PLANET_KEYS) {
    const planet = (chart as unknown as Record<string, AstralChart['sun']>)[key];
    if (!planet || typeof planet.longitude !== 'number') continue;
    const lon = norm360(planet.longitude);
    const inHouse = end > start
      ? lon >= start && lon < end
      : lon >= start || lon < end; // wraps around 0°
    if (inHouse) result.push({ key, planet });
  }
  return result;
}

function getTransitingPlanetsInHouse(sky: AstralChart, chart: AstralChart, houseNum: number): { key: string; planet: AstralChart['sun'] }[] {
  // Use natal house cusps but check sky planet positions
  const house = chart.houses[houseNum - 1];
  const nextHouse = chart.houses[houseNum % 12];
  const start = norm360(house.cusp);
  const end = norm360(nextHouse.cusp);
  const result: { key: string; planet: AstralChart['sun'] }[] = [];

  const transitKeys = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'] as const;
  for (const key of transitKeys) {
    const planet = (sky as unknown as Record<string, AstralChart['sun']>)[key];
    if (!planet || typeof planet.longitude !== 'number') continue;
    const lon = norm360(planet.longitude);
    const inHouse = end > start
      ? lon >= start && lon < end
      : lon >= start || lon < end;
    if (inHouse) result.push({ key, planet });
  }
  return result;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function PlanetRow({
  planetKey,
  planet,
  houseNum,
}: {
  planetKey: string;
  planet: AstralChart['sun'];
  houseNum: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const svgKey = planetSvgKey(planetKey);
  const posStr = `${planet.sign} ${planet.degree}°`;
  const reading = PLANET_IN_HOUSE[`${planetKey}:${houseNum}`];

  // Helper: get first 2 sentences of a string
  function firstTwoSentences(text: string): string {
    const matches = text.match(/[^.!?]+[.!?]+/g);
    if (!matches) return text.slice(0, 200);
    return matches.slice(0, 2).join('');
  }

  return (
    <div className="py-4 border-b border-[#EDE9E0] last:border-b-0">
      {/* Planet header row */}
      <div className="flex gap-3 items-start">
        <div className="shrink-0 w-9 h-9 rounded-full bg-[#F5F0E8] flex items-center justify-center">
          <div
            className="w-5 h-5"
            style={{
              WebkitMaskImage: `url('/svg/${svgKey}.svg')`,
              maskImage: `url('/svg/${svgKey}.svg')`,
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
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="font-medium text-[14px] text-ink">{PLANET_AR[planetKey] ?? planet.name}</span>
            <span className="text-[11px] text-ink-muted">{posStr}</span>
            {planet.retrograde && <span className="text-[10px] text-ink-muted">℞</span>}
          </div>
        </div>
      </div>

      {reading ? (
        <div className="mt-3 flex flex-col gap-3">
          {/* Traditional meaning */}
          <div>
            <div className="text-[10px] text-ink-muted font-semibold tracking-wide mb-1">TRADITIONAL MEANING</div>
            <div className="text-[13px] text-ink leading-[1.7]">
              {expanded ? reading.traditional : firstTwoSentences(reading.traditional)}
            </div>
          </div>
          {/* Evolutionary meaning */}
          <div>
            <div className="text-[10px] text-ink-muted font-semibold tracking-wide mb-1">EVOLUTIONARY MEANING</div>
            <div className="text-[13px] text-ink leading-[1.7]">
              {expanded ? reading.evolutionary : firstTwoSentences(reading.evolutionary)}
            </div>
          </div>
          {/* Developmental task */}
          <div>
            <div className="text-[10px] text-ink-muted font-semibold tracking-wide mb-1">DEVELOPMENTAL TASK</div>
            <div className="text-[13px] text-ink leading-[1.7]">
              {expanded ? reading.task : firstTwoSentences(reading.task)}
            </div>
          </div>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="self-start text-[12px] text-ink-muted underline underline-offset-2 mt-0.5"
          >
            {expanded ? 'Show less' : 'Show more'}
          </button>
        </div>
      ) : (
        <div className="mt-2 text-[13px] text-ink-muted leading-[1.6]">
          {PLANET_AR[planetKey] ?? planet.name} in the {HOUSE_NAMES_AR[houseNum - 1]} House.
        </div>
      )}
    </div>
  );
}

function TransitRow({
  planetKey,
  planet,
}: {
  planetKey: string;
  planet: AstralChart['sun'];
}) {
  const svgKey = planetSvgKey(planetKey);
  const posStr = `${planet.sign} ${planet.degree}°`;

  return (
    <div className="flex gap-3 items-center py-2.5 border-b border-[#EDE9E0] last:border-b-0">
      <div className="shrink-0 w-8 h-8 rounded-full bg-[#EEF4EC] flex items-center justify-center">
        <div
          className="w-4 h-4"
          style={{
            WebkitMaskImage: `url('/svg/${svgKey}.svg')`,
            maskImage: `url('/svg/${svgKey}.svg')`,
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
            background: '#8FA084',
          }}
        />
      </div>
      <div>
        <span className="font-medium text-[13px] text-ink">{PLANET_AR[planetKey] ?? planet.name}</span>
        <span className="text-[11px] text-ink-muted mr-2">{posStr}</span>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export function HouseDetailClient({ num }: { num: number }) {
  const router = useRouter();
  const [chart, setChart] = useState<AstralChart | null>(null);
  const [sky, setSky] = useState<AstralChart | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CHART);
      if (raw) setChart(JSON.parse(raw));
    } catch {}
    setSky(getCurrentSky());
  }, []);

  const houseIdx = num - 1;
  const isValid = num >= 1 && num <= 12;

  if (!isValid) {
    return (
      <div className="max-w-[430px] mx-auto w-full px-5 py-12 text-center" dir="ltr">
        <div className="text-ink-muted text-sm">Invalid house number.</div>
      </div>
    );
  }

  if (!chart) {
    return (
      <div className="max-w-[430px] mx-auto w-full pb-28" dir="ltr">
        {/* Header nav */}
        <div className="pt-4 px-5 flex justify-between items-center">
          <button onClick={() => router.back()} aria-label="Back" className="text-ink">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="text-xs text-ink-muted">Houses</div>
          <div className="w-[22px]" />
        </div>
        <div className="px-5 mt-16 text-center">
          <div className="text-ink-muted text-sm leading-[1.7] mb-6">
            No natal chart found. Enter your birth data to view house details.
          </div>
          <button
            onClick={() => router.push('/settings/edit-birth')}
            className="px-6 py-3 rounded-full bg-ink text-cream text-sm font-medium"
          >
            Enter Birth Data
          </button>
        </div>
      </div>
    );
  }

  const house = chart.houses[houseIdx];
  const signIdx = house ? Math.floor(norm360(house.cusp) / 30) : 0;
  const signName = ZODIAC_AR[signIdx];
  const signSvgKey = ZODIAC_SVG_KEYS[signIdx];
  const cuspDeg = house ? Math.floor(norm360(house.cusp) % 30) : 0;
  const houseLabel = HOUSE_ORDINALS_AR[houseIdx];
  const houseThemeShort = HOUSE_THEMES_SHORT[houseIdx];
  const houseDesc = HOUSE_FULL_DESCRIPTIONS[houseIdx];

  const natalPlanets = getPlanetsInHouse(chart, num);
  const transitingPlanets = sky ? getTransitingPlanetsInHouse(sky, chart, num) : [];

  // House header gradient colours
  const HOUSE_COLORS: Record<number, string> = {
    1: 'linear-gradient(140deg, #F5C0B0 0%, #D06050 100%)',
    2: 'linear-gradient(140deg, #D8C890 0%, #A89050 100%)',
    3: 'linear-gradient(140deg, #B0D8C8 0%, #5090A0 100%)',
    4: 'linear-gradient(140deg, #B0C8D8 0%, #5070A0 100%)',
    5: 'linear-gradient(140deg, #F5D070 0%, #C08030 100%)',
    6: 'linear-gradient(140deg, #C8D8B0 0%, #708050 100%)',
    7: 'linear-gradient(140deg, #D0B0D8 0%, #8050A0 100%)',
    8: 'linear-gradient(140deg, #A08898 0%, #503050 100%)',
    9: 'linear-gradient(140deg, #B8C8E8 0%, #4060A8 100%)',
    10: 'linear-gradient(140deg, #6080C0 0%, #203070 100%)',
    11: 'linear-gradient(140deg, #A0C8C8 0%, #3080A0 100%)',
    12: 'linear-gradient(140deg, #888898 0%, #404050 100%)',
  };

  const headerGrad = HOUSE_COLORS[num] ?? HOUSE_COLORS[1];

  return (
    <div className="max-w-[430px] mx-auto w-full pb-28 relative" dir="ltr">
      {/* Header nav */}
      <div className="pt-4 px-5 flex justify-between items-center">
        <button onClick={() => router.back()} aria-label="Back" className="text-ink">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="text-xs text-ink-muted">Houses</div>
        <div className="w-[22px]" />
      </div>

      {/* Identity card */}
      <div className="mx-5 mt-4 rounded-[20px] p-5 relative overflow-hidden" style={{ background: headerGrad }}>
        {/* Sign icon top-left */}
        <div
          className="absolute top-4 left-4 w-8 h-8 opacity-40"
          style={{
            WebkitMaskImage: `url('/svg/${signSvgKey}.svg')`,
            maskImage: `url('/svg/${signSvgKey}.svg')`,
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
            background: 'rgba(255,255,255,0.9)',
          }}
        />
        <div className="font-serif text-3xl text-white leading-tight drop-shadow-sm">{houseLabel}</div>
        <div className="text-sm text-white/80 mt-1">{houseThemeShort}</div>
        <div className="mt-3 flex items-center gap-2">
          <div className="px-2.5 py-1 bg-white/20 rounded-full text-[11px] text-white font-medium">
            {signName} {cuspDeg}° — Ascendant
          </div>
        </div>
      </div>

      {/* House themes section */}
      <div className="mx-5 mt-4 p-4 bg-white rounded-[14px]" style={{ border: '1px solid #E8E2D2' }}>
        <div className="text-[11px] text-ink-muted font-semibold tracking-wide mb-2">WHAT THIS HOUSE GOVERNS</div>
        <div className="text-[14px] text-ink leading-[1.7]">{houseDesc}</div>
      </div>

      {/* Natal planets in this house */}
      <div className="mx-5 mt-4">
        <div className="text-[11px] text-ink-muted font-semibold tracking-wide mb-2">NATAL PLANETS IN THIS HOUSE</div>
        {natalPlanets.length === 0 ? (
          <div className="p-4 bg-white rounded-[14px] text-[13px] text-ink-muted text-center" style={{ border: '1px solid #E8E2D2' }}>
            No natal planets in this house
          </div>
        ) : (
          <div className="bg-white rounded-[14px] px-4" style={{ border: '1px solid #E8E2D2' }}>
            {natalPlanets.map(({ key, planet }) => (
              <PlanetRow key={key} planetKey={key} planet={planet} houseNum={num} />
            ))}
          </div>
        )}
      </div>

      {/* Current transiting planets */}
      <div className="mx-5 mt-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="text-[11px] text-ink-muted font-semibold tracking-wide">CURRENT TRANSITS</div>
          <div className="px-2 py-0.5 rounded-full text-[10px] font-medium text-white" style={{ background: '#8FA084' }}>
            Now
          </div>
        </div>
        {transitingPlanets.length === 0 ? (
          <div className="p-4 bg-white rounded-[14px] text-[13px] text-ink-muted text-center" style={{ border: '1px solid #E8E2D2' }}>
            No transiting planets in this house right now
          </div>
        ) : (
          <div className="bg-white rounded-[14px] px-4" style={{ border: '1px solid #EDE9E0' }}>
            {transitingPlanets.map(({ key, planet }) => (
              <TransitRow key={key} planetKey={key} planet={planet} />
            ))}
          </div>
        )}
      </div>

      {/* Log button */}
      <div className="px-5 mt-5">
        <button
          onClick={() => router.push(`/log?type=house&key=${num}&label=${encodeURIComponent(houseLabel)}`)}
          className="w-full h-[52px] rounded-[26px] bg-ink text-cream text-base font-medium"
        >
          Log an event linked to this house
        </button>
      </div>
    </div>
  );
}
