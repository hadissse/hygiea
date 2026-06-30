'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SPHERES } from '@/content/spheres';
import { DAY_PLANETS } from '@/lib/planets';
import { calculateTransits, orbLabel, type Transit } from '@/lib/transits';
import { SIGN_SLUGS, getPlacementContent } from '@/content/placements';
import { STORAGE_KEYS } from '@/lib/storageKeys';
import type { AstralChart } from '@/lib/chartCalculator';

const DAY_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const ASPECT_FEEL: Record<string, string> = {
  Conjunction: 'They meet at one point — energies intensify and ask for full attention.',
  Sextile:     'A gentle opening — the opportunity is real if you move toward it.',
  Square:      'Friction that pushes you to grow rather than remain still.',
  Trine:       'Harmony flowing without effort — trust what you already carry.',
  Opposition:  'Two poles facing each other, asking you to hold both at once.',
};

const TRANSIT_FLAVOR: Record<string, string> = {
  sun:     'A turn toward what you illuminate — identity asked to be present.',
  mercury: 'Movement in mind and tongue — thoughts asking to be spoken.',
  venus:   'A touch of value and gentleness — something worth attending to.',
  mars:    'A spark in the will — a push toward action.',
  jupiter: 'Expansion and an invitation toward greater meaning.',
  saturn:  'A test of what was built — the structure is asked if it is real.',
  uranus:  'A break seeking a new pattern — sudden movement.',
  neptune: 'Dissolution of boundaries — clarity or fog, your choice.',
  pluto:   'Depth calling for transformation — what is revealed cannot be hidden.',
  chiron:  'A touch on the old wound — a place asking for tenderness.',
};

const NATAL_POSSESSIVE: Record<string, string> = {
  sun: 'your Sun', moon: 'your Moon', mercury: 'your Mercury',
  venus: 'your Venus', mars: 'your Mars', jupiter: 'your Jupiter',
  saturn: 'your Saturn', uranus: 'your Uranus', neptune: 'your Neptune',
  pluto: 'your Pluto', northNode: 'your North Node', southNode: 'your South Node',
};

const RESONANCE = ['Warm', 'Quiet', 'Stirring', 'Flat'] as const;

// ── Resonance vote row ────────────────────────────────────────────────────────

function ResonanceVotes({ voteKey, dark = false }: { voteKey: string; dark?: boolean }) {
  const [vote, setVote] = useState<string | null>(null);

  useEffect(() => {
    try { setVote(localStorage.getItem(voteKey)); } catch {}
  }, [voteKey]);

  const cast = (v: string) => {
    setVote(v);
    try { localStorage.setItem(voteKey, v); } catch {}
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {RESONANCE.map((v) => (
        <button
          key={v}
          onClick={() => cast(v)}
          className="px-3 py-1.5 rounded-[14px] text-xs font-medium transition-colors"
          style={
            vote === v
              ? { background: dark ? '#fff' : '#1C1917', color: dark ? '#1C1917' : '#FAFAF7' }
              : { background: dark ? 'rgba(255,255,255,0.14)' : '#F5F2EA', color: dark ? 'rgba(255,255,255,0.65)' : '#78716C' }
          }
        >
          {v}
        </button>
      ))}
    </div>
  );
}

// ── Task 1 + 2: Transit hero card with live transit and resonance votes ───────

function TransitHeroCard({ transit, chart, today }: { transit: Transit; chart: AstralChart; today: string }) {
  const [expanded, setExpanded] = useState(false);

  const natalPlanet = (chart as unknown as Record<string, AstralChart['sun']>)[transit.natalKey];
  const natalSlug = natalPlanet ? SIGN_SLUGS[natalPlanet.signNumber] : null;
  const voice = natalSlug ? getPlacementContent('planet', `${transit.natalKey}:${natalSlug}`) : null;

  const possessive = NATAL_POSSESSIVE[transit.natalKey] ?? transit.natalName;
  const flavor     = TRANSIT_FLAVOR[transit.transitKey] ?? '';
  const feel       = ASPECT_FEEL[transit.aspectName] ?? '';
  const reading    = voice?.traditional ?? '';
  const truncated  = reading.length > 280 && !expanded ? reading.slice(0, 280) + '…' : reading;

  const exactLabel = transit.exactDate
    ? new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short' }).format(transit.exactDate)
    : null;

  return (
    <div className="rounded-[20px] overflow-hidden relative" style={{ background: '#0F1228', minHeight: 200 }}>
      {/* Glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: `radial-gradient(ellipse at 80% 10%, ${transit.aspectColor}, transparent 60%)` }} />
      {/* Orbit rings */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none" viewBox="0 0 420 280" preserveAspectRatio="xMidYMid meet">
        <circle cx="360" cy="40" r="80"  fill="none" stroke={transit.aspectColor} strokeWidth="0.8" />
        <circle cx="360" cy="40" r="130" fill="none" stroke={transit.aspectColor} strokeWidth="0.5" />
        <circle cx="360" cy="40" r="190" fill="none" stroke={transit.aspectColor} strokeWidth="0.3" />
      </svg>

      <div className="relative z-10 p-5 flex flex-col gap-4">
        {/* Header */}
        <div>
          <p className="text-[10px] font-semibold tracking-widest text-white/40 uppercase mb-1.5">Active transit</p>
          <p className="font-serif text-[22px] text-white leading-[1.2]">
            {transit.transitName} {transit.aspectSymbol} {possessive}
          </p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="text-[11px] font-medium" style={{ color: transit.aspectColor }}>
              {transit.aspectName} · {orbLabel(transit.orb)} orb
            </span>
            {exactLabel && (
              <span className="text-[11px] text-white/35">· exact {exactLabel}</span>
            )}
          </div>
        </div>

        {/* Reading */}
        <div className="space-y-2.5">
          <p className="text-[14px] text-white/75 leading-[1.8]">{flavor}</p>
          {feel && <p className="text-[13px] text-white/50 leading-[1.7] italic">{feel}</p>}
          {reading && (
            <div className="rounded-[14px] p-4" style={{ background: 'rgba(255,255,255,0.07)' }}>
              <p className="text-[13px] text-white/80 leading-[1.85] font-serif">{truncated}</p>
              {reading.length > 280 && (
                <button
                  onClick={() => setExpanded(e => !e)}
                  className="text-[11px] text-white/40 mt-2 hover:text-white/70 transition-colors"
                >
                  {expanded ? 'Show less' : 'Read more'}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Task 4: Today's Question — aphorism from natal placement */}
        {voice?.aphorism && (
          <div className="border-t border-white/10 pt-3">
            <p className="text-[10px] font-semibold tracking-widest text-white/30 uppercase mb-1.5">Soul question</p>
            <p className="font-serif text-[14px] text-white/60 italic leading-[1.7]">"{voice.aphorism}"</p>
          </div>
        )}

        {/* Task 2: Resonance votes */}
        <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-3">
          <ResonanceVotes voteKey={`${STORAGE_KEYS.VOTES_PREFIX}transit.${today}`} dark />
          <Link
            href={`/self/aspect/${transit.transitKey}-${transit.natalKey}`}
            className="text-[11px] text-white/40 hover:text-white/70 transition-colors whitespace-nowrap shrink-0"
          >
            Explore →
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Mini card for secondary transits ─────────────────────────────────────────

function MiniTransitCard({ transit }: { transit: Transit }) {
  return (
    <Link href={`/self/aspect/${transit.transitKey}-${transit.natalKey}`} className="block">
      <div className="bg-white rounded-[16px] p-3.5 border border-rule-soft flex flex-col gap-1 h-full hover:shadow-sm transition-shadow">
        <p className="text-[10px] font-semibold tracking-widest text-ink-muted uppercase">Also active</p>
        <p className="font-serif text-[15px] text-ink leading-snug">{transit.label}</p>
        <p className="text-[11px] font-medium mt-auto pt-1" style={{ color: transit.aspectColor }}>
          {transit.aspectName} · {orbLabel(transit.orb)}
        </p>
      </div>
    </Link>
  );
}

// ── Task 3: Two Winds card (Luciferic vs. Ahrimanic) ─────────────────────────

type Sphere = (typeof SPHERES)[string];
type Planet = (typeof DAY_PLANETS)[0];

function TwoWindsCard({ sphere, planet, today }: { sphere: Sphere; planet: Planet; today: string }) {
  return (
    <div className="rounded-[20px] bg-white border border-rule-soft overflow-hidden">
      <div className="px-5 pt-4 pb-3 border-b border-rule-soft">
        <p className="text-[10px] font-semibold tracking-widest text-ink-muted uppercase mb-0.5">Two Winds</p>
        <p className="font-serif text-base text-ink">{planet.name} sphere today</p>
      </div>
      <div className="grid grid-cols-2 divide-x divide-rule-soft">
        <div className="p-4">
          <p className="text-[10px] font-semibold tracking-widest mb-2.5" style={{ color: '#E9785E' }}>LUCIFERIC</p>
          <p className="text-[13px] text-ink leading-[1.8] font-serif">{sphere.luciferic}</p>
        </div>
        <div className="p-4">
          <p className="text-[10px] font-semibold tracking-widest mb-2.5" style={{ color: '#6B7FC4' }}>AHRIMANIC</p>
          <p className="text-[13px] text-ink leading-[1.8] font-serif">{sphere.ahrimanic}</p>
        </div>
      </div>
      <div className="px-5 py-3 border-t border-rule-soft flex items-center justify-between gap-3">
        <p className="text-[12px] text-ink-muted italic">Where does this pull you today?</p>
        <ResonanceVotes voteKey={`${STORAGE_KEYS.VOTES_PREFIX}winds.${today}`} />
      </div>
    </div>
  );
}

// ── Body card (sphere of the day — organ + practice) ─────────────────────────

function BodyCard({ planet, today }: { planet: Planet; today: string }) {
  const maskStyle = {
    WebkitMaskImage: `url('/svg/${planet.key}.svg')`,
    maskImage: `url('/svg/${planet.key}.svg')`,
    WebkitMaskSize: 'contain', maskSize: 'contain',
    WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center', maskPosition: 'center',
    background: planet.color,
  };

  return (
    <div className="bg-cream-soft rounded-[20px] p-5 border border-rule-soft">
      {/* Sphere label */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative w-10 h-10 shrink-0">
          <div className="absolute inset-[-4px] rounded-full border opacity-25" style={{ borderColor: planet.color }} />
          <div className="w-full h-full" style={maskStyle} />
        </div>
        <div>
          <p className="text-[10px] font-semibold tracking-widest text-ink-muted uppercase">Body · {planet.glyph} {planet.name}</p>
          <p className="font-serif text-base text-ink">{planet.organ}</p>
        </div>
      </div>

      {/* Practice */}
      <p className="text-[10px] font-semibold tracking-widest text-ink-muted uppercase mb-2">Daily practice</p>
      <p className="font-serif text-[14px] text-ink leading-[1.85]">
        Bring your attention to the region of your {planet.organ.split('&')[0].trim().toLowerCase()}.
        Notice warmth, rhythm, tension. Observe for one minute before your day continues.
      </p>

      <div className="mt-4 pt-3 border-t border-rule-soft/60">
        <ResonanceVotes voteKey={`${STORAGE_KEYS.VOTES_PREFIX}body.${today}`} />
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function TodayPage() {
  const [planet, setPlanet] = useState<Planet | null>(null);
  const [dateStr, setDateStr] = useState('');
  const [today, setToday] = useState('');
  const [chart, setChart] = useState<AstralChart | null>(null);
  const [transits, setTransits] = useState<Transit[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const now = new Date();
    setPlanet(DAY_PLANETS[now.getDay()]);
    setDateStr(`${DAY_NAMES[now.getDay()]}, ${now.getDate()} ${MONTH_NAMES[now.getMonth()]} ${now.getFullYear()}`);
    setToday(now.toISOString().slice(0, 10));

    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CHART);
      if (raw) {
        const parsed: AstralChart = JSON.parse(raw);
        setChart(parsed);
        // Exclude moon — its transits change hourly and don't suit a daily card
        setTransits(calculateTransits(parsed).filter(t => t.transitKey !== 'moon'));
      }
    } catch {}
    setLoaded(true);
  }, []);

  if (!planet) return <div className="bg-cream min-h-dvh" />;

  const sphere    = SPHERES[planet.key];
  const hero      = transits[0] ?? null;
  const secondary = transits.slice(1, 3);

  return (
    <div className="bg-cream flex flex-col md:flex-row md:h-[calc(100dvh-48px)]">

      {/* ── Left column: transit cards ─────────────────────────────────────── */}
      <div className="md:w-[55%] md:border-r md:border-rule-soft md:overflow-y-auto flex-shrink-0">

        <div className="px-5 xl:px-8 pt-8 pb-4">
          <p className="text-xs text-ink-muted font-medium tracking-wide">{dateStr}</p>
          <h1 className="font-serif text-[28px] text-ink mt-0.5 -tracking-[0.5px]">Today</h1>
        </div>

        <div className="px-5 xl:px-8 pb-10 space-y-4">

          {/* Hero transit */}
          {loaded && hero && chart ? (
            <TransitHeroCard transit={hero} chart={chart} today={today} />
          ) : loaded && !chart ? (
            <div className="rounded-[20px] p-5 relative overflow-hidden" style={{ background: '#0F1228', minHeight: 160 }}>
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 80% 20%, #5C5C7A, transparent 60%)' }} />
              <div className="relative z-10 flex flex-col gap-3">
                <p className="text-[10px] font-semibold tracking-widest text-white/40 uppercase">Active transit</p>
                <p className="font-serif text-[20px] text-white leading-snug">Set up your chart to see what's active in your sky</p>
                <Link href="/settings/edit-birth" className="text-sm text-white/60 font-medium hover:text-white/90 transition-colors mt-1">
                  Enter birth data →
                </Link>
              </div>
            </div>
          ) : loaded ? (
            <div className="rounded-[20px] p-5" style={{ background: '#0F1228' }}>
              <p className="text-[10px] font-semibold tracking-widest text-white/40 uppercase mb-2">Active transit</p>
              <p className="font-serif text-white/60">No strong transits today — a quieter sky.</p>
            </div>
          ) : null}

          {/* Secondary transits */}
          {secondary.length > 0 && (
            <div className={`grid gap-3 ${secondary.length === 1 ? '' : 'grid-cols-2'}`}>
              {secondary.map(t => <MiniTransitCard key={t.id} transit={t} />)}
            </div>
          )}

        </div>
      </div>

      {/* ── Right column: body + two winds ────────────────────────────────── */}
      <div className="md:w-[45%] md:overflow-y-auto">
        <div className="px-5 xl:px-8 pt-8 pb-10 space-y-4">

          {/* Two Winds */}
          {sphere && <TwoWindsCard sphere={sphere} planet={planet} today={today} />}

          {/* Body */}
          <BodyCard planet={planet} today={today} />

          {/* Sphere deep-dive link */}
          <Link
            href={`/spheres/${planet.key}`}
            className="flex items-center justify-between bg-white rounded-[18px] p-4 border border-rule-soft hover:shadow-sm transition-shadow"
          >
            <div>
              <p className="text-[10px] font-semibold tracking-widest text-ink-muted uppercase mb-0.5">Sphere</p>
              <p className="font-serif text-base text-ink">{planet.name} — explore the full sphere →</p>
            </div>
            <span className="text-ink-muted text-xl">○</span>
          </Link>

        </div>
      </div>

    </div>
  );
}
