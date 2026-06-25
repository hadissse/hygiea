'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { AstralChart } from '@/lib/chartCalculator';
import { NinefoldConstitution } from '@/components/NinefoldConstitution';
import {
  CHAPTER_SECTIONS,
  ASC_IN_SIGN_MAP,
  PLANET_IN_SIGN_MAP,
  SPHERE_BY_PLANET,
  type PlacementContent,
} from '@/content/reportData';

// ── Types ──────────────────────────────────────────────────────────────────────

interface BirthData {
  name?: string;
  year?: number;
  month?: number;
  day?: number;
  [key: string]: unknown;
}

// ── Nine bodies data ───────────────────────────────────────────────────────────

const NINE_BODIES = [
  {
    id: 'physical-body',
    en: 'Physical Body',
    de: 'Physischer Leib',
    planet: 'Saturn',
    role:
      'The oldest and most dense member of the human being — the mineral substrate built up over immense spans of evolution and crystallised through the Saturn-sphere on the soul\'s descent toward birth. It is the threshold the self must pass through every day. Its constitutional tendencies are not obstacles from outside; they are the particular shape of the material the soul chose to take on.',
    sphereKey: 'Saturn',
  },
  {
    id: 'etheric-body',
    en: 'Etheric Body',
    de: 'Ätherleib / Lebensleib',
    planet: 'Moon',
    role:
      'The living body that breathes with the seasons, carries the rhythm of sleep and waking as reliably as the tides, and holds the memory of every wound and every recovery without being asked and without forgetting. It underlies the physical form, organises it, keeps it from disintegrating back into mineral substance. This is the carrier of living memory — where every significant experience leaves a trace that continues to shape the present.',
    sphereKey: 'Moon',
  },
  {
    id: 'astral-body',
    en: 'Astral Body',
    de: 'Astralleib',
    planet: 'Mars',
    role:
      'Before the capacity for self-reflection arrives, there is desire. The pull toward warmth, the recoil from threat, the surge of excitement that precedes any reasoning about it — this is the domain of the astral body, the soul-carrier that the human being shares in its general structure with the animal kingdom, though in the human being it carries additional dimensions. The task across a lifetime is not suppression but progressive education — the slow development of a feeling life that can be held consciously rather than simply undergone.',
    sphereKey: 'Mars',
  },
  {
    id: 'sentient-soul',
    en: 'Sentient Soul',
    de: 'Empfindungsseele',
    planet: 'Venus',
    role:
      'The soul\'s most instinctive layer — the direct interface between the astral body\'s raw drives and the more reflective dimensions of soul life. Here the first intimations of inner life arise: the immediate felt-sense of beautiful and ugly, safe and threatening, welcoming and hostile. Venus governs the harmonising dimension of this layer, where raw feeling is refined toward relationship and aesthetic sensitivity.',
    sphereKey: 'Venus',
  },
  {
    id: 'mind-soul',
    en: 'Mind Soul',
    de: 'Verstandsseele',
    planet: 'Mercury',
    role:
      'The thinking soul — the capacity for conceptual knowledge, for holding ideas in relationship to one another, for communication and mediation between the world and the inner life. Mercury coordinates human thinking and shapes the cognitive signature the soul carries into incarnation. The Intellectual Soul is neither the highest nor the lowest of the soul members; it stands as the mediating intelligence through which the outer world is translated into inner understanding.',
    sphereKey: 'Mercury',
  },
  {
    id: 'consciousness-soul',
    en: 'Consciousness Soul',
    de: 'Bewusstseinseele',
    planet: 'Sun',
    role:
      'The highest of the soul members — where the I consciously confronts truth as something independent of personal preference, desire, or convenience. The Sun as conductor of the planetary system stands at the center of the human being\'s spiritual organisation. The Consciousness Soul is not fully present at birth; it is the member most deeply tied to what the human being becomes through conscious self-development. The solar placement indicates the particular mode this soul elected for that becoming.',
    sphereKey: 'Sun',
  },
  {
    id: 'spirit-self',
    en: 'Spirit Self',
    de: 'Geistselbst / Manas',
    planet: 'Uranus',
    role:
      'The astral body transformed by the I — the first of the spirit members, representing the capacity for thought liberated from personal interest and aligned with living cosmic intelligence. Uranus as a higher octave of Mercury carries the awakening force that shatters crystallised forms to make way for what evolution requires. The Spirit Self is largely a future capacity in most human beings, present as seed and potential rather than accomplished fact.',
    sphereKey: 'Uranus',
  },
  {
    id: 'life-spirit',
    en: 'Life Spirit',
    de: 'Lebensgeist / Buddhi',
    planet: 'Neptune',
    role:
      'The etheric body transformed by the I — the second of the spirit members, corresponding to what the Eastern traditions call Buddhi: a higher love that dissolves personal boundaries without losing individual consciousness. Neptune as higher octave of Venus carries the oceanic dissolution and mystical compassion that foreshadow this development. The Life Spirit is even more a future capacity than the Spirit Self — its fragrance is felt in moments of genuine selfless love and artistic inspiration.',
    sphereKey: 'Neptune',
  },
  {
    id: 'spirit-man',
    en: 'Spirit Man',
    de: 'Geistmensch / Atma',
    planet: 'Pluto',
    role:
      'The physical body transformed by the I — the highest of the nine members, corresponding to Atma in Eastern terminology. Pluto as the force of absolute transformation and regeneration carries, in its lower expression, the primordial power that will eventually be turned toward this highest development. Spirit Man is the most distant from current human attainment — it belongs to the far future of human evolution, but the seed of its possibility is present in the human constitution from the beginning.',
    sphereKey: 'Pluto',
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

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

// ── Sub-components ─────────────────────────────────────────────────────────────

function PlacementCard({ title, content }: { title: string; content: PlacementContent }) {
  return (
    <div className="bg-white rounded-[18px] border border-[#E5E1D8] p-6 space-y-5">
      <h3 className="font-prose text-lg font-semibold text-ink">{title}</h3>
      {content.traditional_en && (
        <div className="space-y-2">
          <p className="text-[11px] font-ui font-semibold uppercase tracking-widest text-ink-muted">
            Traditional
          </p>
          <p className="text-base leading-relaxed text-ink font-ui whitespace-pre-line">
            {content.traditional_en}
          </p>
        </div>
      )}
      {content.evolutionary_en && (
        <div className="space-y-2">
          <p className="text-[11px] font-ui font-semibold uppercase tracking-widest text-ink-muted">
            Evolutionary
          </p>
          <p className="text-base leading-relaxed text-ink font-ui whitespace-pre-line">
            {content.evolutionary_en}
          </p>
        </div>
      )}
      {content.developmental_en && (
        <div className="space-y-2">
          <p className="text-[11px] font-ui font-semibold uppercase tracking-widest text-ink-muted">
            Developmental
          </p>
          <p className="text-base leading-relaxed text-ink font-ui whitespace-pre-line">
            {content.developmental_en}
          </p>
        </div>
      )}
      {content.aphorism_en && (
        <p className="text-sm italic text-ink-muted font-prose border-l-2 border-[#E5E1D8] pl-4">
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
    <div className="bg-white rounded-[18px] border border-[#E5E1D8] p-6 space-y-4">
      <h3 className="font-prose text-lg font-semibold text-ink">{label}</h3>
      {section.traditional_en && (
        <p className="text-base leading-relaxed text-ink font-ui whitespace-pre-line">
          {section.traditional_en}
        </p>
      )}
      {section.aphorism_en && (
        <p className="text-sm italic text-ink-muted font-prose border-l-2 border-[#E5E1D8] pl-4">
          {section.aphorism_en}
        </p>
      )}
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────

export default function Chapter1Page() {
  const [chart, setChart] = useState<AstralChart | null>(null);
  const [birthData, setBirthData] = useState<BirthData | null>(null);

  useEffect(() => {
    try {
      const rawChart = localStorage.getItem('hygiea.primary-chart.v1');
      if (rawChart) setChart(JSON.parse(rawChart));
    } catch { /* ignore parse errors */ }
    try {
      const rawBirth = localStorage.getItem('hygiea.birth-data');
      if (rawBirth) setBirthData(JSON.parse(rawBirth));
    } catch { /* ignore parse errors */ }
  }, []);

  // Derive highlighted planets from angular house positions
  const highlightedPlanets = chart ? getAngularPlanets(chart) : [];

  // ASC sign — derived from longitude to avoid Arabic vs English sign name ambiguity
  const ascSign = chart ? longitudeToSignEn(chart.asc) : null;
  const ascContent = ascSign ? ASC_IN_SIGN_MAP[ascSign.toLowerCase()] : null;

  // Moon sign — derived from longitude
  const moonSign = chart ? longitudeToSignEn(chart.moon.longitude) : null;
  const moonContent = moonSign ? PLANET_IN_SIGN_MAP[`moon-${moonSign.toLowerCase()}`] : null;

  // Chapter sections
  const chapterSections = CHAPTER_SECTIONS.filter(s => s.placement_type === 'chapter-section');

  return (
    <div className="min-h-dvh bg-[#FAF6EF] pb-24">
      {/* ── Back navigation ── */}
      <div className="px-5 pt-8 pb-2">
        <Link
          href="/biography"
          className="inline-flex items-center gap-1.5 text-sm text-ink-muted font-ui hover:text-ink transition-colors"
        >
          <span>←</span>
          <span>Biography</span>
        </Link>
      </div>

      {/* ── Chapter header ── */}
      <div className="px-5 pt-4 pb-8">
        <p className="text-xs font-ui font-semibold uppercase tracking-widest text-ink-muted mb-2">
          Chapter 1
        </p>
        <h1 className="font-prose text-3xl font-bold text-ink leading-tight mb-3">
          The Arc
        </h1>
        <p className="text-base text-ink-muted font-ui leading-relaxed">
          The Threefold Human Being &amp; Ninefold Constitution
        </p>
        {birthData?.name && (
          <p className="text-sm text-ink-muted font-ui mt-2">
            For {birthData.name}
          </p>
        )}
      </div>

      <div className="px-5 space-y-5">

        {/* ── Ninefold Constitution diagram ── */}
        <div className="bg-white rounded-[18px] border border-[#E5E1D8] p-6">
          <h2 className="font-prose text-xl font-semibold text-ink mb-1">
            Ninefold Constitution
          </h2>
          <p className="text-sm text-ink-muted font-ui mb-5">
            The nine members of the human being, from physical body to spirit man.
            {highlightedPlanets.length > 0 && (
              <> Planets in angular houses are highlighted as constitutionally active.</>
            )}
          </p>
          <NinefoldConstitution highlighted={highlightedPlanets} />
        </div>

        {/* ── Chapter sections ── */}
        {chapterSections.length > 0 && (
          <div className="space-y-5">
            <div className="pt-2">
              <h2 className="font-prose text-xl font-semibold text-ink mb-1">
                Interpretive Framework
              </h2>
              <p className="text-sm text-ink-muted font-ui">
                The conceptual ground for reading the arc of this biography.
              </p>
            </div>
            {chapterSections.map((section, i) => (
              <ChapterSectionCard key={`${section.sign}-${i}`} section={section} />
            ))}
          </div>
        )}

        {/* ── Nine body members ── */}
        <div className="space-y-5 pt-2">
          <div>
            <h2 className="font-prose text-xl font-semibold text-ink mb-1">
              The Nine Members
            </h2>
            <p className="text-sm text-ink-muted font-ui">
              Each member of the human constitution — its role, its planetary connection, and its sphere.
            </p>
          </div>

          {NINE_BODIES.map((body) => {
            const sphere = SPHERE_BY_PLANET[body.sphereKey];
            const isActive = highlightedPlanets.some(
              p => p.toLowerCase() === body.planet.toLowerCase()
            );
            return (
              <div
                key={body.id}
                className={`bg-white rounded-[18px] border p-6 space-y-4 ${
                  isActive ? 'border-[#C9922A]' : 'border-[#E5E1D8]'
                }`}
              >
                {/* Header */}
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-prose text-lg font-semibold text-ink">
                        {body.en}
                      </h3>
                      {isActive && (
                        <span className="text-[11px] font-ui font-semibold uppercase tracking-wide text-[#C9922A] bg-[#C9922A15] px-2 py-0.5 rounded-full">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-ink-muted font-ui mt-0.5">
                      {body.de} · {body.planet} sphere
                    </p>
                  </div>
                </div>

                {/* Role description */}
                <p className="text-base leading-relaxed text-ink font-ui">
                  {body.role}
                </p>

                {/* Sphere connection */}
                {sphere && (
                  <div className="bg-[#FAF6EF] rounded-[12px] p-4 space-y-2">
                    <p className="text-[11px] font-ui font-semibold uppercase tracking-widest text-ink-muted">
                      {sphere.sphere_name} · {sphere.sphere_epithet}
                    </p>
                    {sphere.sphere_narrative && (
                      <p className="text-sm leading-relaxed text-ink font-ui">
                        {sphere.sphere_narrative}
                      </p>
                    )}
                    {sphere.organ && (
                      <p className="text-xs text-ink-muted font-ui">
                        <span className="font-semibold">Organ:</span> {sphere.organ}
                        {sphere.metal ? ` · ${sphere.metal}` : ''}
                      </p>
                    )}
                    {sphere.hierarchy && (
                      <p className="text-xs text-ink-muted font-ui">
                        <span className="font-semibold">Hierarchy:</span> {sphere.hierarchy} — {sphere.hierarchy_sub}
                      </p>
                    )}
                    {sphere.luciferic && (
                      <div className="pt-1 border-t border-[#E5E1D8] space-y-1">
                        <p className="text-xs text-ink-muted font-ui">
                          <span className="font-semibold">Luciferic distortion:</span> {sphere.luciferic}
                        </p>
                        <p className="text-xs text-ink-muted font-ui">
                          <span className="font-semibold">Ahrimanic distortion:</span> {sphere.ahrimanic}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── ASC in sign ── */}
        {ascContent && (
          <div className="space-y-3 pt-2">
            <div>
              <h2 className="font-prose text-xl font-semibold text-ink mb-1">
                Ascendant in {ascSign}
              </h2>
              <p className="text-sm text-ink-muted font-ui">
                The rising sign as the soul's vehicle of entry into incarnation.
              </p>
            </div>
            <PlacementCard
              title={`ASC in ${ascSign} — The Shape of Incarnation`}
              content={ascContent}
            />
          </div>
        )}

        {/* ── Moon sign note ── */}
        {moonContent && (
          <div className="space-y-3 pt-2">
            <div>
              <h2 className="font-prose text-xl font-semibold text-ink mb-1">
                Moon in {moonSign}
              </h2>
              <p className="text-sm text-ink-muted font-ui">
                The Moon sign as the primary register of the etheric and feeling life.
              </p>
            </div>
            <PlacementCard
              title={`Moon in ${moonSign} — The Etheric Register`}
              content={moonContent}
            />
          </div>
        )}

        {/* ── No chart state ── */}
        {!chart && (
          <div className="bg-white rounded-[18px] border border-[#E5E1D8] p-6 text-center space-y-3">
            <p className="text-ink font-prose font-medium">No birth chart found</p>
            <p className="text-sm text-ink-muted font-ui">
              Enter your birth data to see your personalised constitution reading.
            </p>
            <Link
              href="/settings/edit-birth"
              className="inline-block text-sm font-ui font-medium text-[#C9922A] underline underline-offset-2"
            >
              Add birth data →
            </Link>
          </div>
        )}

        {/* ── Navigation ── */}
        <div className="flex items-center justify-between pt-4 pb-2">
          <Link
            href="/biography"
            className="flex items-center gap-2 text-sm font-ui text-ink-muted hover:text-ink transition-colors"
          >
            <span>←</span>
            <span>Back to Biography</span>
          </Link>
          <Link
            href="/biography/chapter2"
            className="flex items-center gap-2 text-sm font-ui font-medium text-ink hover:text-[#C9922A] transition-colors"
          >
            <span>Chapter 2</span>
            <span>→</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
