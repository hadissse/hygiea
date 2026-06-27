'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { AstralChart } from '@/lib/chartCalculator';
import { NinefoldConstitution } from '@/components/NinefoldConstitution';
import { FourfoldToggle } from '@/components/FourfoldToggle';
import { LifeArcColors, SaturnReturn } from '@/components/LifeArcPanel';
import {
  CHAPTER_SECTIONS,
  ASC_IN_SIGN_MAP,
  PLANET_IN_SIGN_MAP,
  SPHERE_BY_PLANET,
  type PlacementContent,
} from '@/content/reportData';
import { STORAGE_KEYS } from '@/lib/storageKeys';

interface BirthData {
  name?: string;
  year?: number;
  month?: number;
  day?: number;
  [key: string]: unknown;
}

const NINE_BODIES = [
  {
    id: 'physical-body',
    en: 'Physical Body',
    de: 'Physischer Leib',
    planet: 'Saturn',
    role: 'The oldest and most dense member of the human being — the mineral substrate built up over immense spans of evolution and crystallised through the Saturn-sphere on the soul\'s descent toward birth. It is the threshold the self must pass through every day. Its constitutional tendencies are not obstacles from outside; they are the particular shape of the material the soul chose to take on.',
    sphereKey: 'Saturn',
  },
  {
    id: 'etheric-body',
    en: 'Etheric Body',
    de: 'Ätherleib / Lebensleib',
    planet: 'Moon',
    role: 'The living body that breathes with the seasons, carries the rhythm of sleep and waking as reliably as the tides, and holds the memory of every wound and every recovery without being asked and without forgetting. It underlies the physical form, organises it, keeps it from disintegrating back into mineral substance. This is the carrier of living memory — where every significant experience leaves a trace that continues to shape the present.',
    sphereKey: 'Moon',
  },
  {
    id: 'astral-body',
    en: 'Astral Body',
    de: 'Astralleib',
    planet: 'Mars',
    role: 'Before the capacity for self-reflection arrives, there is desire. The pull toward warmth, the recoil from threat, the surge of excitement that precedes any reasoning about it — this is the domain of the astral body, the soul-carrier that the human being shares in its general structure with the animal kingdom, though in the human being it carries additional dimensions. The task across a lifetime is not suppression but progressive education — the slow development of a feeling life that can be held consciously rather than simply undergone.',
    sphereKey: 'Mars',
  },
  {
    id: 'sentient-soul',
    en: 'Sentient Soul',
    de: 'Empfindungsseele',
    planet: 'Venus',
    role: 'The soul\'s most instinctive layer — the direct interface between the astral body\'s raw drives and the more reflective dimensions of soul life. Here the first intimations of inner life arise: the immediate felt-sense of beautiful and ugly, safe and threatening, welcoming and hostile. Venus governs the harmonising dimension of this layer, where raw feeling is refined toward relationship and aesthetic sensitivity.',
    sphereKey: 'Venus',
  },
  {
    id: 'mind-soul',
    en: 'Mind Soul',
    de: 'Verstandsseele',
    planet: 'Mercury',
    role: 'The thinking soul — the capacity for conceptual knowledge, for holding ideas in relationship to one another, for communication and mediation between the world and the inner life. Mercury coordinates human thinking and shapes the cognitive signature the soul carries into incarnation. The Intellectual Soul is neither the highest nor the lowest of the soul members; it stands as the mediating intelligence through which the outer world is translated into inner understanding.',
    sphereKey: 'Mercury',
  },
  {
    id: 'consciousness-soul',
    en: 'Consciousness Soul',
    de: 'Bewusstseinseele',
    planet: 'Sun',
    role: 'The highest of the soul members — where the I consciously confronts truth as something independent of personal preference, desire, or convenience. The Sun as conductor of the planetary system stands at the center of the human being\'s spiritual organisation. The Consciousness Soul is not fully present at birth; it is the member most deeply tied to what the human being becomes through conscious self-development. The solar placement indicates the particular mode this soul elected for that becoming.',
    sphereKey: 'Sun',
  },
  {
    id: 'spirit-self',
    en: 'Spirit Self',
    de: 'Geistselbst / Manas',
    planet: 'Uranus',
    role: 'The astral body transformed by the I — the first of the spirit members, representing the capacity for thought liberated from personal interest and aligned with living cosmic intelligence. Uranus as a higher octave of Mercury carries the awakening force that shatters crystallised forms to make way for what evolution requires. The Spirit Self is largely a future capacity in most human beings, present as seed and potential rather than accomplished fact.',
    sphereKey: 'Uranus',
  },
  {
    id: 'life-spirit',
    en: 'Life Spirit',
    de: 'Lebensgeist / Buddhi',
    planet: 'Neptune',
    role: 'The etheric body transformed by the I — the second of the spirit members, corresponding to what the Eastern traditions call Buddhi: a higher love that dissolves personal boundaries without losing individual consciousness. Neptune as higher octave of Venus carries the oceanic dissolution and mystical compassion that foreshadow this development. The Life Spirit is even more a future capacity than the Spirit Self — its fragrance is felt in moments of genuine selfless love and artistic inspiration.',
    sphereKey: 'Neptune',
  },
  {
    id: 'spirit-man',
    en: 'Spirit Man',
    de: 'Geistmensch / Atma',
    planet: 'Pluto',
    role: 'The physical body transformed by the I — the highest of the nine members, corresponding to Atma in Eastern terminology. Pluto as the force of absolute transformation and regeneration carries, in its lower expression, the primordial power that will eventually be turned toward this highest development. Spirit Man is the most distant from current human attainment — it belongs to the far future of human evolution, but the seed of its possibility is present in the human constitution from the beginning.',
    sphereKey: 'Pluto',
  },
];

function getHouseForLongitude(houses: AstralChart['houses'], longitude: number): number {
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

function getAngularPlanets(chart: AstralChart): string[] {
  const angularHouses = new Set([1, 4, 7, 10]);
  const planets = [
    { name: 'Sun',     pos: chart.sun },
    { name: 'Moon',    pos: chart.moon },
    { name: 'Mercury', pos: chart.mercury },
    { name: 'Venus',   pos: chart.venus },
    { name: 'Mars',    pos: chart.mars },
    { name: 'Jupiter', pos: chart.jupiter },
    { name: 'Saturn',  pos: chart.saturn },
    { name: 'Uranus',  pos: chart.uranus },
    { name: 'Neptune', pos: chart.neptune },
    { name: 'Pluto',   pos: chart.pluto },
  ];
  return planets
    .filter(p => {
      const house = getHouseForLongitude(chart.houses, p.pos.longitude);
      return angularHouses.has(house);
    })
    .map(p => p.name);
}

const ZODIAC_SIGNS_EN = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

function longitudeToSignEn(longitude: number): string {
  const idx = Math.floor(((longitude % 360) + 360) % 360 / 30);
  return ZODIAC_SIGNS_EN[idx];
}

function PlacementCard({ title, content }: { title: string; content: PlacementContent }) {
  return (
    <div className="bg-white rounded-[16px] border p-4 space-y-4" style={{ borderColor: '#F0EDE6' }}>
      <p className="text-[11px] font-semibold tracking-wider text-ink-muted">{title.toUpperCase()}</p>
      {content.traditional_en && (
        <div className="space-y-1.5">
          <p className="text-[10px] font-semibold tracking-wider text-ink-muted/70">TRADITIONAL</p>
          <p className="text-sm leading-relaxed text-ink whitespace-pre-line">{content.traditional_en}</p>
        </div>
      )}
      {content.evolutionary_en && (
        <div className="space-y-1.5">
          <p className="text-[10px] font-semibold tracking-wider text-ink-muted/70">EVOLUTIONARY</p>
          <p className="text-sm leading-relaxed text-ink whitespace-pre-line">{content.evolutionary_en}</p>
        </div>
      )}
      {content.developmental_en && (
        <div className="space-y-1.5">
          <p className="text-[10px] font-semibold tracking-wider text-ink-muted/70">DEVELOPMENTAL</p>
          <p className="text-sm leading-relaxed text-ink whitespace-pre-line">{content.developmental_en}</p>
        </div>
      )}
      {content.aphorism_en && (
        <p className="text-sm italic text-ink-muted border-l-2 border-[#E9785E]/40 pl-3">
          {content.aphorism_en}
        </p>
      )}
    </div>
  );
}

function ChapterSectionCard({ section }: { section: PlacementContent }) {
  const SIGN_LABELS: Record<string, string> = {
    'astral-body':       'The Astral Body',
    'ego-conductor':     'The I as Conductor',
    'etheric-body':      'The Etheric Body',
    'freedom-karma':     'Freedom & Karma',
    'path-of-cognition': 'The Path of Cognition',
    'physical-body':     'The Physical Body',
    'salutogenesis':     'Salutogenesis',
    'seven-step':        'The Seven-Step Arc',
    'three-learning':    'The Three Modes of Learning',
    'three-mission':     'The Threefold Mission',
  };
  const label = SIGN_LABELS[section.sign] ?? section.sign;
  return (
    <div className="bg-white rounded-[16px] border p-4 space-y-3" style={{ borderColor: '#F0EDE6' }}>
      <p className="text-[11px] font-semibold tracking-wider text-ink-muted">{label.toUpperCase()}</p>
      {section.traditional_en && (
        <p className="text-sm leading-relaxed text-ink whitespace-pre-line">{section.traditional_en}</p>
      )}
      {section.aphorism_en && (
        <p className="text-sm italic text-ink-muted border-l-2 border-[#E9785E]/40 pl-3">
          {section.aphorism_en}
        </p>
      )}
    </div>
  );
}

function NineBodyCard({ body, isActive, expanded, onToggle }: {
  body: typeof NINE_BODIES[0];
  isActive: boolean;
  expanded: boolean;
  onToggle: () => void;
}) {
  const sphere = SPHERE_BY_PLANET[body.sphereKey];
  return (
    <div
      className="bg-white rounded-[16px] border transition-all"
      style={{ borderColor: isActive ? '#C9922A' : '#F0EDE6' }}
    >
      <button
        onClick={onToggle}
        className="w-full text-left px-3 py-2.5 flex items-center gap-2.5"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[12px] font-semibold text-ink">{body.en}</span>
            {isActive && (
              <span className="text-[10px] font-semibold text-[#C9922A] bg-[#C9922A15] px-1.5 py-0.5 rounded-full tracking-wide">
                ACTIVE
              </span>
            )}
          </div>
          <div className="text-[11px] text-ink-muted mt-0.5">{body.de} · {body.planet}</div>
        </div>
        <span className="text-ink-muted text-xs shrink-0">{expanded ? '‹' : '›'}</span>
      </button>
      {expanded && (
        <div className="px-3 pb-3 space-y-3 border-t" style={{ borderColor: '#F0EDE6' }}>
          <p className="text-sm leading-relaxed text-ink pt-3">{body.role}</p>
          {sphere && (
            <div className="rounded-[12px] p-3 space-y-2" style={{ background: '#FAFAF7', border: '1px solid #F0EDE6' }}>
              <p className="text-[10px] font-semibold tracking-wider text-ink-muted">
                {sphere.sphere_name} · {sphere.sphere_epithet}
              </p>
              {sphere.sphere_narrative && (
                <p className="text-xs leading-relaxed text-ink">{sphere.sphere_narrative}</p>
              )}
              {sphere.organ && (
                <p className="text-xs text-ink-muted">
                  <span className="font-semibold">Organ:</span> {sphere.organ}{sphere.metal ? ` · ${sphere.metal}` : ''}
                </p>
              )}
              {sphere.hierarchy && (
                <p className="text-xs text-ink-muted">
                  <span className="font-semibold">Hierarchy:</span> {sphere.hierarchy} — {sphere.hierarchy_sub}
                </p>
              )}
              {sphere.luciferic && (
                <div className="pt-2 border-t space-y-1" style={{ borderColor: '#F0EDE6' }}>
                  <p className="text-xs text-ink-muted"><span className="font-semibold">Luciferic:</span> {sphere.luciferic}</p>
                  <p className="text-xs text-ink-muted"><span className="font-semibold">Ahrimanic:</span> {sphere.ahrimanic}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Chapter1Page() {
  const [chart, setChart] = useState<AstralChart | null>(null);
  const [birthData, setBirthData] = useState<BirthData | null>(null);
  const [expandedBody, setExpandedBody] = useState<string | null>(null);

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

  const highlightedPlanets = chart ? getAngularPlanets(chart) : [];
  const ascSign = chart ? longitudeToSignEn(chart.asc) : null;
  const ascContent = ascSign ? ASC_IN_SIGN_MAP[ascSign.toLowerCase()] : null;
  const moonSign = chart ? longitudeToSignEn(chart.moon.longitude) : null;
  const moonContent = moonSign ? PLANET_IN_SIGN_MAP[`moon-${moonSign.toLowerCase()}`] : null;
  const chapterSections = CHAPTER_SECTIONS.filter(s => s.placement_type === 'chapter-section');

  return (
    <div className="bg-cream pb-24">

      {/* Header */}
      <div className="max-w-3xl mx-auto md:max-w-6xl px-5 pt-8 pb-6">
        <Link
          href="/biography"
          className="inline-flex items-center gap-1.5 text-[11px] text-ink-muted font-semibold tracking-wider hover:text-ink transition-colors mb-6"
        >
          ← BIOGRAPHY
        </Link>
        <p className="text-[11px] font-semibold tracking-wider text-ink-muted mb-2">CHAPTER 1</p>
        <h1 className="font-serif text-3xl text-ink leading-tight mb-2">The Arc</h1>
        <p className="text-sm text-ink-muted leading-relaxed">
          The Threefold Human Being &amp; Ninefold Constitution
          {birthData?.name && ` · For ${birthData.name}`}
        </p>
      </div>

      {/* Two-column grid */}
      <div className="max-w-3xl mx-auto md:max-w-6xl px-5 md:grid md:grid-cols-2 md:gap-8">

        {/* ── Left column ── */}
        <div className="space-y-5">

          {/* Threefold diagram */}
          <div>
            <p className="text-[11px] font-semibold tracking-wider text-ink-muted mb-2.5">THE THREEFOLD HUMAN BEING</p>
            <div className="bg-white rounded-[16px] border p-4" style={{ borderColor: '#F0EDE6' }}>
              <p className="text-xs text-ink-muted mb-4 leading-relaxed">
                The bridge between the heavenly and the earthly — Beauty above, Strength below, Wisdom mediating.
              </p>
              <svg viewBox="0 0 300 280" className="w-full max-w-[340px] mx-auto block" aria-label="Threefold Human Being diagram">
                <rect x="20" y="8" width="260" height="68" rx="10" fill="#f4ecd8" stroke="#3a3a3a" strokeWidth="1.2" />
                <text x="150" y="26" textAnchor="middle" fontFamily="inherit" fontSize="9" fill="#7a6a4a" fontWeight="600" letterSpacing="1">COSMOS / HEAVENLY</text>
                <text x="150" y="44" textAnchor="middle" fontFamily="inherit" fontSize="14" fill="#2b2b2b" fontWeight="700">BEAUTY</text>
                <text x="150" y="60" textAnchor="middle" fontFamily="inherit" fontSize="9" fill="#5a4a2a">Head &amp; Thinking — cosmic, tempered by the earthly</text>
                <line x1="150" y1="76" x2="150" y2="100" stroke="#3a3a3a" strokeWidth="1.2" markerEnd="url(#arr)" />
                <rect x="20" y="100" width="260" height="80" rx="10" fill="#ede8dc" stroke="#3a3a3a" strokeWidth="1.2" />
                <text x="150" y="120" textAnchor="middle" fontFamily="inherit" fontSize="9" fill="#7a6a4a" fontWeight="600" letterSpacing="1">BALANCE — THE RHYTHMIC HUMAN</text>
                <text x="150" y="140" textAnchor="middle" fontFamily="inherit" fontSize="14" fill="#2b2b2b" fontWeight="700">WISDOM</text>
                <text x="150" y="158" textAnchor="middle" fontFamily="inherit" fontSize="9" fill="#5a4a2a">Rhythm &amp; Feeling — the bridge between heaven and earth</text>
                <line x1="150" y1="180" x2="150" y2="204" stroke="#3a3a3a" strokeWidth="1.2" markerEnd="url(#arr)" />
                <rect x="20" y="204" width="260" height="68" rx="10" fill="#e8e0d2" stroke="#3a3a3a" strokeWidth="1.2" />
                <text x="150" y="222" textAnchor="middle" fontFamily="inherit" fontSize="9" fill="#7a6a4a" fontWeight="600" letterSpacing="1">EARTH / EARTHLY</text>
                <text x="150" y="240" textAnchor="middle" fontFamily="inherit" fontSize="14" fill="#2b2b2b" fontWeight="700">STRENGTH</text>
                <text x="150" y="258" textAnchor="middle" fontFamily="inherit" fontSize="9" fill="#5a4a2a">Limbs &amp; Will — earthly, mitigated by the cosmos</text>
                <defs>
                  <marker id="arr" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                    <path d="M0,1 L8,4 L0,7 Z" fill="#3a3a3a" />
                  </marker>
                </defs>
              </svg>
              <p className="text-[10px] text-ink-muted text-center mt-3">
                Source: Rudolf Steiner, GA 202 — The Bridge Between World Spirit and Physical Body (Nov 1920)
              </p>
            </div>
          </div>

          {/* Fourfold & Ninefold */}
          <div>
            <p className="text-[11px] font-semibold tracking-wider text-ink-muted mb-2.5">FOURFOLD &amp; NINEFOLD CONSTITUTION</p>
            <div className="bg-white rounded-[16px] border p-4" style={{ borderColor: '#F0EDE6' }}>
              {chart && <FourfoldToggle chart={chart} />}
            </div>
          </div>

          {/* Ninefold diagram */}
          <div>
            <p className="text-[11px] font-semibold tracking-wider text-ink-muted mb-2.5">NINEFOLD CONSTITUTION</p>
            <div className="bg-white rounded-[16px] border p-4" style={{ borderColor: '#F0EDE6' }}>
              {highlightedPlanets.length > 0 && (
                <p className="text-xs text-ink-muted mb-4">Planets in angular houses are highlighted as constitutionally active.</p>
              )}
              <NinefoldConstitution highlighted={highlightedPlanets} />
            </div>
          </div>

          {/* Life Arc */}
          <div>
            <p className="text-[11px] font-semibold tracking-wider text-ink-muted mb-2.5">LIFE ARC — SEVEN-YEAR PHASES</p>
            <div className="bg-white rounded-[16px] border p-4" style={{ borderColor: '#F0EDE6' }}>
              <LifeArcColors birthYear={birthData?.year ?? new Date().getFullYear() - 30} />
            </div>
          </div>

          {/* Saturn Return */}
          <div>
            <p className="text-[11px] font-semibold tracking-wider text-ink-muted mb-2.5">THE SATURN RETURN</p>
            <div className="bg-white rounded-[16px] border p-4" style={{ borderColor: '#F0EDE6' }}>
              <SaturnReturn
                birthYear={birthData?.year ?? new Date().getFullYear() - 30}
                birthMonth={birthData?.month ?? 1}
              />
            </div>
          </div>

        </div>

        {/* ── Right column ── */}
        <div className="space-y-5 mt-5 md:mt-0">

          {/* Nine members — compact expandable grid */}
          <div>
            <p className="text-[11px] font-semibold tracking-wider text-ink-muted mb-2.5">THE NINE MEMBERS</p>
            <div className="space-y-2">
              {NINE_BODIES.map((body) => {
                const isActive = highlightedPlanets.some(
                  p => p.toLowerCase() === body.planet.toLowerCase()
                );
                return (
                  <NineBodyCard
                    key={body.id}
                    body={body}
                    isActive={isActive}
                    expanded={expandedBody === body.id}
                    onToggle={() => setExpandedBody(expandedBody === body.id ? null : body.id)}
                  />
                );
              })}
            </div>
          </div>

          {/* ASC in sign */}
          {ascContent && (
            <div>
              <p className="text-[11px] font-semibold tracking-wider text-ink-muted mb-2.5">
                ASCENDANT IN {ascSign?.toUpperCase()}
              </p>
              <PlacementCard
                title={`ASC in ${ascSign} — The Shape of Incarnation`}
                content={ascContent}
              />
            </div>
          )}

          {/* Moon in sign */}
          {moonContent && (
            <div>
              <p className="text-[11px] font-semibold tracking-wider text-ink-muted mb-2.5">
                MOON IN {moonSign?.toUpperCase()}
              </p>
              <PlacementCard
                title={`Moon in ${moonSign} — The Etheric Register`}
                content={moonContent}
              />
            </div>
          )}

          {/* Chapter sections */}
          {chapterSections.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold tracking-wider text-ink-muted mb-2.5">INTERPRETIVE FRAMEWORK</p>
              <div className="space-y-2">
                {chapterSections.map((section, i) => (
                  <ChapterSectionCard key={`${section.sign}-${i}`} section={section} />
                ))}
              </div>
            </div>
          )}

          {/* No chart state */}
          {!chart && (
            <div className="bg-white rounded-[16px] border p-4 text-center space-y-3" style={{ borderColor: '#F0EDE6' }}>
              <p className="text-sm font-semibold text-ink">No birth chart found</p>
              <p className="text-xs text-ink-muted">
                Enter your birth data to see your personalised constitution reading.
              </p>
              <Link
                href="/settings/edit-birth"
                className="inline-block text-xs font-semibold text-[#C9922A] underline underline-offset-2"
              >
                Add birth data →
              </Link>
            </div>
          )}

        </div>
      </div>

      {/* Navigation */}

    </div>
  );
}
