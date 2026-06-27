'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { AstralChart } from '@/lib/chartCalculator';
import {
  PLANET_IN_SIGN_MAP,
  PLANET_IN_HOUSE_MAP,
  SPHERE_BY_PLANET,
} from '@/content/reportData';
import { STORAGE_KEYS } from '@/lib/storageKeys';

// ── Helpers ────────────────────────────────────────────────────────────────────

function getHouseNumber(longitude: number, houses: AstralChart['houses']): number {
  const norm = ((longitude % 360) + 360) % 360;
  for (let i = 0; i < 12; i++) {
    const start = ((houses[i].cusp % 360) + 360) % 360;
    const end = ((houses[(i + 1) % 12].cusp % 360) + 360) % 360;
    if (start < end) {
      if (norm >= start && norm < end) return i + 1;
    } else {
      // crosses 0°
      if (norm >= start || norm < end) return i + 1;
    }
  }
  return 1;
}

// ── LucifericAhrimanicAxis inline component ────────────────────────────────────

function LucifericAhrimanicAxis({
  luciferic,
  ahrimanic,
}: {
  luciferic: string;
  ahrimanic: string;
}) {
  return (
    <div className="rounded-[16px] border border-[#F0EDE6] overflow-hidden">
      <div className="grid grid-cols-2 divide-x divide-[#F0EDE6]">
        <div className="p-5">
          <p className="text-[10px] uppercase tracking-widest font-semibold text-[#E9785E] mb-2">
            Luciferic Pole
          </p>
          <p className="text-sm text-[#2C2C2C] leading-relaxed font-prose">
            {luciferic}
          </p>
        </div>
        <div className="p-5">
          <p className="text-[10px] uppercase tracking-widest font-semibold text-[#5C7EA8] mb-2">
            Ahrimanic Pole
          </p>
          <p className="text-sm text-[#2C2C2C] leading-relaxed font-prose">
            {ahrimanic}
          </p>
        </div>
      </div>
      <div className="bg-[#F5F2EA] border-t border-[#F0EDE6] px-5 py-3 flex items-center gap-3">
        <div className="flex-1 h-px bg-gradient-to-r from-[#E9785E] via-[#E5E1D8] to-[#5C7EA8]" />
        <span className="text-[10px] text-[#8C8479] uppercase tracking-widest font-semibold">
          The Axis
        </span>
        <div className="flex-1 h-px bg-gradient-to-l from-[#E9785E] via-[#E5E1D8] to-[#5C7EA8]" />
      </div>
    </div>
  );
}

// ── Planet card ────────────────────────────────────────────────────────────────

const OUTER_PLANET_GLYPHS: Record<string, string> = {
  uranus: '♅',
  neptune: '♆',
  pluto: '♇',
};

const OUTER_PLANET_COLORS: Record<string, string> = {
  uranus: '#7EC8C8',
  neptune: '#6B8ABF',
  pluto: '#8A7070',
};

const HIGHER_OCTAVE_NOTES: Record<string, { of: string; explanation: string }> = {
  uranus: {
    of: 'Mercury',
    explanation:
      'Uranus is the higher octave of Mercury. Where Mercury governs the individual mind — the nervous system, daily communication, the capacity to name and connect — Uranus operates at the transpersonal register of that same principle. It is the sudden illumination that bypasses the rational sequence Mercury requires; the collective awakening that arrives where individual thought reaches its limit. In Steiner\'s cosmology, Uranus represents the sudden breakthrough of spirit into the Mercurial sphere — the lightning-flash of intuition that carries more information than discursive thought can transmit. Uranus does not evolve slowly through Mercury\'s incremental logic; it disrupts, inverts, and revolutionizes the cognitive order so that consciousness can leap to a new level.',
  },
  neptune: {
    of: 'Venus',
    explanation:
      'Neptune is the higher octave of Venus. Venus governs personal love, aesthetic sense, and the capacity for harmonious relation between individual souls. Neptune elevates this principle into the universal — the dissolution of the boundary between self and other that Venus softens but does not dissolve. Neptune asks: what happens when love is not personal? When beauty is not perceived but lived? In the Anthroposophical tradition, Neptune corresponds to the sphere where the soul\'s relational impulse merges with the cosmic feeling-life — the ocean of compassion from which all individual souls have differentiated and to which spiritual evolution eventually returns. Neptune in the natal chart shows where the personal love principle is being called to expand into universal compassion, mystical union, or artistic transcendence.',
  },
  pluto: {
    of: 'Mars',
    explanation:
      'Pluto is the higher octave of Mars. Mars is the principle of individual will — desire, initiative, the courage to act, the drive to assert. Pluto is that same will operating at the collective or evolutionary level: the deep pressure by which entire epochs of consciousness are destroyed and regenerated, the compulsive force that moves through the soul when something that can no longer be sustained must finally be released. Mars fights; Pluto transforms. Where Mars burns what stands in the way, Pluto descends into the underworld of whatever needs to die so that something genuinely new can be born. In Anthroposophical terms, Pluto operates in the sphere where individual will intersects with the great metamorphic forces of Earth evolution — the kundalini of the macrocosm, the collective Mars-force working through geological and historical time.',
  },
};

interface OuterPlanetSectionProps {
  planetKey: 'uranus' | 'neptune' | 'pluto';
  chart: AstralChart;
}

function OuterPlanetSection({ planetKey, chart }: OuterPlanetSectionProps) {
  const planet = chart[planetKey];
  const glyph = OUTER_PLANET_GLYPHS[planetKey];
  const color = OUTER_PLANET_COLORS[planetKey];
  const name = planetKey.charAt(0).toUpperCase() + planetKey.slice(1);
  const sign = planet.sign;
  const signLower = sign.toLowerCase();
  const houseNum = getHouseNumber(planet.longitude, chart.houses);

  const sphereData = SPHERE_BY_PLANET[planetKey];
  const signInterp = PLANET_IN_SIGN_MAP[`${planetKey}-${signLower}`];
  const houseInterp = PLANET_IN_HOUSE_MAP[`${planetKey}-${houseNum}`];
  const octaveNote = HIGHER_OCTAVE_NOTES[planetKey];

  return (
    <div className="space-y-4">
      {/* Planet header */}
      <div className="bg-white rounded-[16px] border border-[#F0EDE6] p-5">
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-3xl shrink-0"
            style={{ background: `${color}22`, border: `2px solid ${color}` }}
          >
            <span style={{ color }}>{glyph}</span>
          </div>
          <div className="flex-1">
            <h2 className="font-prose text-2xl text-[#1A1A1A]">{name}</h2>
            <p className="text-sm text-[#8C8479] mt-0.5">
              {planet.degree}°{planet.minute > 0 ? `${planet.minute}′` : ''} {sign}
              {planet.retrograde ? ' ℞' : ''}
              <span className="mx-2 opacity-40">·</span>
              House {houseNum}
            </p>
          </div>
        </div>
      </div>

      {/* Sphere narrative */}
      {sphereData && (
        <div className="bg-white rounded-[16px] border border-[#F0EDE6] p-5 space-y-3">
          <p className="text-[10px] uppercase tracking-widest font-semibold text-[#8C8479]">
            Sphere Narrative
          </p>
          {sphereData.sphere_epithet && (
            <p className="text-xs text-[#8C8479] italic font-prose">
              {sphereData.sphere_epithet}
            </p>
          )}
          <p className="text-sm text-[#2C2C2C] leading-relaxed font-prose">
            {sphereData.sphere_narrative}
          </p>
          {sphereData.hierarchy && (
            <div className="pt-3 border-t border-[#F0EDE6] grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[#8C8479] uppercase tracking-wider font-semibold text-[10px]">Hierarchy</span>
                <p className="text-[#2C2C2C] mt-0.5 font-prose">{sphereData.hierarchy}</p>
                {sphereData.hierarchy_sub && (
                  <p className="text-[#8C8479] mt-0.5">{sphereData.hierarchy_sub}</p>
                )}
              </div>
              {sphereData.metal && (
                <div>
                  <span className="text-[#8C8479] uppercase tracking-wider font-semibold text-[10px]">Metal</span>
                  <p className="text-[#2C2C2C] mt-0.5 font-prose">{sphereData.metal}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Luciferic / Ahrimanic axis */}
      {sphereData && (
        <LucifericAhrimanicAxis
          luciferic={sphereData.luciferic}
          ahrimanic={sphereData.ahrimanic}
        />
      )}

      {/* Planet in sign */}
      {signInterp ? (
        <div className="bg-white rounded-[16px] border border-[#F0EDE6] p-5 space-y-4">
          <div>
            <p className="text-[10px] uppercase tracking-widest font-semibold text-[#8C8479] mb-1">
              {name} in {sign}
            </p>
            <p className="text-[10px] text-[#8C8479] uppercase tracking-widest">
              Planet in Sign
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-[#A09080]">
              Traditional
            </p>
            <p className="text-sm text-[#2C2C2C] leading-relaxed font-prose">
              {signInterp.traditional_en}
            </p>
          </div>

          <div className="border-t border-[#F0EDE6] pt-4 space-y-1">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-[#7090A0]">
              Evolutionary
            </p>
            <p className="text-sm text-[#2C2C2C] leading-relaxed font-prose">
              {signInterp.evolutionary_en}
            </p>
          </div>

          <div className="border-t border-[#F0EDE6] pt-4 space-y-1">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-[#5A8070]">
              Developmental
            </p>
            <p className="text-sm text-[#2C2C2C] leading-relaxed font-prose">
              {signInterp.developmental_en}
            </p>
          </div>

          {signInterp.aphorism_en && (
            <div className="border-t border-[#F0EDE6] pt-4">
              <p className="text-sm text-[#6C6459] italic font-prose leading-relaxed">
                &ldquo;{signInterp.aphorism_en}&rdquo;
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-[16px] border border-[#F0EDE6] p-5">
          <p className="text-[10px] uppercase tracking-widest font-semibold text-[#8C8479] mb-2">
            {name} in {sign} — Interpretation
          </p>
          <p className="text-sm text-[#8C8479] font-prose">
            Interpretation for {name} in {sign} is not yet available in the content database.
          </p>
        </div>
      )}

      {/* Planet in house */}
      {houseInterp ? (
        <div className="bg-white rounded-[16px] border border-[#F0EDE6] p-5 space-y-4">
          <div>
            <p className="text-[10px] uppercase tracking-widest font-semibold text-[#8C8479] mb-1">
              {name} in House {houseNum}
            </p>
            <p className="text-[10px] text-[#8C8479] uppercase tracking-widest">
              Planet in House
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-[#A09080]">
              Traditional
            </p>
            <p className="text-sm text-[#2C2C2C] leading-relaxed font-prose">
              {houseInterp.traditional_en}
            </p>
          </div>

          <div className="border-t border-[#F0EDE6] pt-4 space-y-1">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-[#7090A0]">
              Evolutionary
            </p>
            <p className="text-sm text-[#2C2C2C] leading-relaxed font-prose">
              {houseInterp.evolutionary_en}
            </p>
          </div>

          <div className="border-t border-[#F0EDE6] pt-4 space-y-1">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-[#5A8070]">
              Developmental
            </p>
            <p className="text-sm text-[#2C2C2C] leading-relaxed font-prose">
              {houseInterp.developmental_en}
            </p>
          </div>

          {houseInterp.aphorism_en && (
            <div className="border-t border-[#F0EDE6] pt-4">
              <p className="text-sm text-[#6C6459] italic font-prose leading-relaxed">
                &ldquo;{houseInterp.aphorism_en}&rdquo;
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-[16px] border border-[#F0EDE6] p-5">
          <p className="text-[10px] uppercase tracking-widest font-semibold text-[#8C8479] mb-2">
            {name} in House {houseNum} — Interpretation
          </p>
          <p className="text-sm text-[#8C8479] font-prose">
            Interpretation for {name} in House {houseNum} is not yet available in the content database.
          </p>
        </div>
      )}

      {/* Higher octave note */}
      {octaveNote && (
        <div
          className="rounded-[16px] border border-[#F0EDE6] p-5 space-y-3"
          style={{ background: `${color}0D` }}
        >
          <p className="text-[10px] uppercase tracking-widest font-semibold text-[#8C8479]">
            Higher Octave of {octaveNote.of}
          </p>
          <p className="text-sm text-[#2C2C2C] leading-relaxed font-prose">
            {octaveNote.explanation}
          </p>
        </div>
      )}
    </div>
  );
}

// ── Stellium + House concentration ────────────────────────────────────────────

const ALL_PLANET_KEYS: (keyof AstralChart)[] = [
  'sun', 'moon', 'mercury', 'venus', 'mars',
  'jupiter', 'saturn', 'uranus', 'neptune', 'pluto',
  'chiron', 'northNode', 'southNode',
];

function detectStelliums(chart: AstralChart): Array<{ sign: string; planets: string[] }> {
  const signMap: Record<string, string[]> = {};
  for (const key of ALL_PLANET_KEYS) {
    const p = chart[key];
    if (p && typeof p === 'object' && 'sign' in p) {
      const s = (p as { sign: string }).sign;
      if (!signMap[s]) signMap[s] = [];
      signMap[s].push(key as string);
    }
  }
  return Object.entries(signMap)
    .filter(([, planets]) => planets.length >= 3)
    .map(([sign, planets]) => ({ sign, planets }));
}

function detectHouseConcentrations(chart: AstralChart): Array<{ house: number; planets: string[] }> {
  const houseMap: Record<number, string[]> = {};
  for (const key of ALL_PLANET_KEYS) {
    const p = chart[key];
    if (p && typeof p === 'object' && 'longitude' in p) {
      const h = getHouseNumber((p as { longitude: number }).longitude, chart.houses);
      if (!houseMap[h]) houseMap[h] = [];
      houseMap[h].push(key as string);
    }
  }
  return Object.entries(houseMap)
    .filter(([, planets]) => planets.length >= 3)
    .map(([house, planets]) => ({ house: parseInt(house), planets }));
}

function planetDisplayName(key: string): string {
  const NAMES: Record<string, string> = {
    sun: 'Sun', moon: 'Moon', mercury: 'Mercury', venus: 'Venus', mars: 'Mars',
    jupiter: 'Jupiter', saturn: 'Saturn', uranus: 'Uranus', neptune: 'Neptune',
    pluto: 'Pluto', chiron: 'Chiron', northNode: 'North Node', southNode: 'South Node',
  };
  return NAMES[key] ?? key;
}

function StelliumSection({ sign, planets }: { sign: string; planets: string[] }) {
  return (
    <div className="bg-white rounded-[16px] border border-[#F0EDE6] p-5 space-y-4">
      <div>
        <p className="text-[10px] uppercase tracking-widest font-semibold text-[#E9785E] mb-1">
          Stellium Detected
        </p>
        <h3 className="font-prose text-xl text-[#1A1A1A]">Stellium in {sign}</h3>
        <p className="text-xs text-[#8C8479] mt-1">
          {planets.map(planetDisplayName).join(' · ')}
        </p>
      </div>

      <div className="space-y-1">
        <p className="text-[10px] uppercase tracking-widest font-semibold text-[#A09080]">
          What this means
        </p>
        <p className="text-sm text-[#2C2C2C] leading-relaxed font-prose">
          A stellium — three or more planets gathered in the same sign — represents an extraordinary
          concentration of soul-intention. Where most nativity charts distribute the planetary forces
          across the zodiac, a stellium compresses several principles into a single field. The sign
          becomes, in effect, the dominant coloration of the entire life: the atmosphere in which
          the I finds itself most powerfully at work, most challenged, and most gifted. The planets
          within a stellium do not operate independently — they form a composite voice, a chord
          rather than separate notes, and their interactions with each other are as significant as
          their individual placements.
        </p>
      </div>

      <div className="border-t border-[#F0EDE6] pt-4 space-y-1">
        <p className="text-[10px] uppercase tracking-widest font-semibold text-[#7090A0]">
          Evolutionary Significance
        </p>
        <p className="text-sm text-[#2C2C2C] leading-relaxed font-prose">
          From an evolutionary perspective, a stellium in {sign} suggests that the soul has elected
          to focus the entire force of its present incarnation through the qualities and challenges
          of this sign. The concentration implies an unfinished work — themes that were begun in
          prior lifetimes and require the full weight of multiple planetary principles to complete.
          The gifts of {sign} are strongly emphasized, as are its characteristic blindspots and
          resistances. Integration rather than one-sided expression becomes the central developmental
          task: learning to let each planet in the stellium speak in its own voice while recognizing
          that all are sounding through the same chamber.
        </p>
      </div>

      <div className="border-t border-[#F0EDE6] pt-4 space-y-1">
        <p className="text-[10px] uppercase tracking-widest font-semibold text-[#5A8070]">
          Developmental Task
        </p>
        <p className="text-sm text-[#2C2C2C] leading-relaxed font-prose">
          The practical work with a stellium in {sign} involves developing enough inner spaciousness
          to hold the multiple demands of concentrated planetary energy without collapse into the
          sign&rsquo;s shadow expression. Because so much is concentrated here, transits and
          progressions through this sign tend to activate the entire stellium simultaneously —
          periods of intense activation and transformation followed by periods of integration and
          consolidation. The task is to work with this rhythm consciously rather than being swept by
          it, and to bring the wisdom of the surrounding chart — especially planets in opposing or
          square signs — to bear as counterbalance and complement.
        </p>
      </div>
    </div>
  );
}

function HouseConcentrationSection({ house, planets }: { house: number; planets: string[] }) {
  const HOUSE_THEMES: Record<number, string> = {
    1: 'Self · Body · Beginnings',
    2: 'Resources · Values · Substance',
    3: 'Mind · Communication · Connection',
    4: 'Roots · Home · Foundation',
    5: 'Creativity · Pleasure · Self-Expression',
    6: 'Work · Daily Practice · Service',
    7: 'Partnership · Other · Reflection',
    8: 'Depth · Transformation · Shared Resources',
    9: 'Horizon · Meaning · Belief',
    10: 'Career · Public Life · Legacy',
    11: 'Community · Ideals · Future Vision',
    12: 'Retreat · Unconscious · Dissolution',
  };
  const theme = HOUSE_THEMES[house] ?? '';

  return (
    <div className="bg-white rounded-[16px] border border-[#F0EDE6] p-5 space-y-4">
      <div>
        <p className="text-[10px] uppercase tracking-widest font-semibold text-[#6B8ABF] mb-1">
          House Concentration
        </p>
        <h3 className="font-prose text-xl text-[#1A1A1A]">House {house} Concentration</h3>
        <p className="text-xs text-[#8C8479] mt-0.5">{theme}</p>
        <p className="text-xs text-[#8C8479] mt-1">
          {planets.map(planetDisplayName).join(' · ')}
        </p>
      </div>

      <div className="space-y-1">
        <p className="text-[10px] uppercase tracking-widest font-semibold text-[#A09080]">
          What this means
        </p>
        <p className="text-sm text-[#2C2C2C] leading-relaxed font-prose">
          A concentration of three or more planets in a single house focuses a disproportionate
          amount of life-energy into the domain that house governs. The house is not merely an
          area of interest — it becomes the primary arena through which the I works out its
          evolutionary intentions. What occurs in House {house} does not remain contained there;
          it colors the entire life because so many of the soul&rsquo;s resources are implicated.
          The themes of {theme.toLowerCase()} carry an unusual density and significance in this
          biography.
        </p>
      </div>

      <div className="border-t border-[#F0EDE6] pt-4 space-y-1">
        <p className="text-[10px] uppercase tracking-widest font-semibold text-[#7090A0]">
          Evolutionary Significance
        </p>
        <p className="text-sm text-[#2C2C2C] leading-relaxed font-prose">
          Multiple planets in House {house} indicate that the soul&rsquo;s karmic work — the
          unfinished business carried across incarnations — is substantially located in this domain.
          The planets here do not simply describe tendencies; they describe a field of necessary
          encounter. The soul returns again and again to the questions of House {house} not because
          it is trapped there but because it has elected to go deep rather than wide — to develop
          genuine mastery in this sphere rather than a more evenly distributed surface engagement
          with all of life&rsquo;s domains.
        </p>
      </div>

      <div className="border-t border-[#F0EDE6] pt-4 space-y-1">
        <p className="text-[10px] uppercase tracking-widest font-semibold text-[#5A8070]">
          Developmental Task
        </p>
        <p className="text-sm text-[#2C2C2C] leading-relaxed font-prose">
          The developmental work with a House {house} concentration involves both full engagement
          with this domain and the cultivation of the opposite house as a necessary complement and
          corrective. The opposite house (House {house <= 6 ? house + 6 : house - 6}) carries
          exactly the qualities that become most needed as counterweight to the concentrated focus.
          Integration means bringing the gifts of the concentration into service without losing
          the perspective that only the complementary domain can provide.
        </p>
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────

export default function Chapter3Page() {
  const [chart, setChart] = useState<AstralChart | null>(null);
  const [birthData, setBirthData] = useState<{
    name?: string;
    year?: number;
    month?: number;
    day?: number;
  } | null>(null);

  useEffect(() => {
    try {
      const rawChart = localStorage.getItem(STORAGE_KEYS.CHART);
      if (rawChart) setChart(JSON.parse(rawChart));
    } catch { /* ignore */ }

    try {
      const rawBirth = localStorage.getItem(STORAGE_KEYS.BIRTH_DATA);
      if (rawBirth) setBirthData(JSON.parse(rawBirth));
    } catch { /* ignore */ }
  }, []);

  const stelliums = chart ? detectStelliums(chart) : [];
  const houseConcentrations = chart ? detectHouseConcentrations(chart) : [];

  return (
    <main className="bg-cream pb-24">

      {/* Chapter header */}
      <div className="max-w-3xl mx-auto md:max-w-6xl px-5 pt-8 pb-6">
        <Link
          href="/biography"
          className="inline-flex items-center gap-1.5 text-[11px] text-ink-muted font-semibold tracking-wider hover:text-ink transition-colors mb-6"
        >
          ← BIOGRAPHY
        </Link>
        <p className="text-[11px] font-semibold tracking-wider text-ink-muted mb-2">CHAPTER 3</p>
        <h1 className="font-serif text-3xl text-ink leading-tight">
          The Outer Spheres
        </h1>
        <p className="text-sm text-ink-muted mt-2 leading-relaxed">
          Uranus, Neptune, and Pluto operate beyond the personal planets — transpersonal forces
          that shape generations and carry evolutionary impulses larger than the individual biography.
        </p>
        {birthData?.name && (
          <p className="text-xs text-ink-muted mt-2">Chart of {birthData.name}</p>
        )}
      </div>

      {!chart ? (
        <div className="max-w-3xl mx-auto md:max-w-6xl px-5 py-12 text-center">
          <div className="bg-white rounded-[16px] border border-[#F0EDE6] p-8">
            <p className="text-sm font-semibold text-ink mb-2">No chart loaded</p>
            <p className="text-sm text-ink-muted">
              Complete your birth data setup to view your Chapter III reading.
            </p>
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto md:max-w-6xl px-5 space-y-8">

          {/* Stelliums (if any) */}
          {stelliums.length > 0 && (
            <section>
              {stelliums.map((s) => (
                <StelliumSection key={s.sign} sign={s.sign} planets={s.planets} />
              ))}
            </section>
          )}

          {/* House concentrations (if any) */}
          {houseConcentrations.length > 0 && (
            <section>
              {houseConcentrations.map((hc) => (
                <HouseConcentrationSection key={hc.house} house={hc.house} planets={hc.planets} />
              ))}
            </section>
          )}

          {/* Divider before outer planets */}
          {(stelliums.length > 0 || houseConcentrations.length > 0) && (
            <div className="flex items-center gap-3 py-2">
              <div className="flex-1 h-px bg-[#E5E1D8]" />
              <span className="text-[10px] uppercase tracking-widest text-[#8C8479] font-semibold">
                The Outer Planets
              </span>
              <div className="flex-1 h-px bg-[#E5E1D8]" />
            </div>
          )}

          {/* Uranus */}
          <section>
            <OuterPlanetSection planetKey="uranus" chart={chart} />
          </section>

          {/* Neptune */}
          <section>
            <OuterPlanetSection planetKey="neptune" chart={chart} />
          </section>

          {/* Pluto */}
          <section>
            <OuterPlanetSection planetKey="pluto" chart={chart} />
          </section>

        </div>
      )}


    </main>
  );
}
