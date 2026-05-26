'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { AstralChart } from '@/lib/chartCalculator';
import {
  calculateTemperament,
  calculateBiographicalPhase,
  calculateNinefoldAnnotations,
  type NinefoldAnnotation,
} from '@/lib/traitEngine';
import type { Temperament, NinefoldMember } from '@/content/constitution';
import {
  NINEFOLD_MEMBERS,
  TEMPERAMENT_DESCRIPTIONS,
  getMemberByKey,
  getTemperamentDescription,
} from '@/content/constitution';
import {
  BIOGRAPHICAL_PHASES,
  getBiographicalPhase,
  calculateAgeFromBirthDate,
} from '@/content/biography';
import { ZoomableWheel } from '@/components/ZoomableWheel';

type Tab = 'wheel' | 'ninefold' | 'temperament' | 'biography';

const TABS: { id: Tab; label: string }[] = [
  { id: 'wheel',       label: 'Chart' },
  { id: 'ninefold',    label: 'Ninefold' },
  { id: 'temperament', label: 'Temperament' },
  { id: 'biography',   label: 'Biography' },
];

const ACTIVATION_COLORS = {
  active:      'var(--color-cosmic-blue)',
  developing:  'var(--color-gold-soft)',
  latent:      'var(--color-silver)',
};

const ACTIVATION_LABELS = {
  active:     'Active',
  developing: 'Developing',
  latent:     'Latent',
};

const MEMBER_ORDER: NinefoldMember[] = [
  'physical_body', 'etheric_body', 'astral_body',
  'sentient_soul', 'intellectual_soul', 'consciousness_soul',
  'spirit_self', 'life_spirit', 'spirit_human',
];

function NinefoldTab({ chart, ninefold }: { chart: AstralChart; ninefold: NinefoldAnnotation | null }) {
  const [expanded, setExpanded] = useState<NinefoldMember | null>(null);

  if (!ninefold) return null;

  return (
    <div className="space-y-2">
      <p className="text-sm text-ink-muted leading-[1.65] mb-4">
        The human being in Steiner's spiritual science is constituted of nine members — from the densest physical body to the highest spirit human. Most adults have three to four members fully active; the spirit members are largely latent pending long spiritual development.
      </p>
      {MEMBER_ORDER.map((key) => {
        const member = getMemberByKey(key);
        if (!member) return null;
        const ann = ninefold[key];
        const isOpen = expanded === key;
        return (
          <div
            key={key}
            className="rounded-[14px] overflow-hidden"
            style={{ background: 'rgba(28,25,23,0.04)' }}
          >
            <button
              onClick={() => setExpanded(isOpen ? null : key)}
              className="w-full text-left p-4 flex items-center gap-3"
            >
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: ACTIVATION_COLORS[ann.activation] }}
              />
              <div className="flex-1">
                <div className="font-serif text-base text-ink">{member.name}</div>
                <div className="text-xs text-ink-muted">{member.germanName}</div>
              </div>
              <div
                className="text-[10px] font-medium tracking-widest uppercase px-2 py-0.5 rounded-full"
                style={{
                  background: `${ACTIVATION_COLORS[ann.activation]}20`,
                  color: ACTIVATION_COLORS[ann.activation],
                }}
              >
                {ACTIVATION_LABELS[ann.activation]}
              </div>
              <span className="text-ink-muted text-sm ml-1">{isOpen ? '↑' : '↓'}</span>
            </button>
            {isOpen && (
              <div className="px-4 pb-4 border-t" style={{ borderColor: 'var(--color-rule-soft)' }}>
                <p className="text-sm text-ink-soft leading-[1.7] mt-3 font-serif">{member.brief}</p>
                <div className="mt-3">
                  <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-1">
                    {ACTIVATION_LABELS[ann.activation]} in you
                  </div>
                  <p className="text-sm text-ink-muted leading-[1.65]">{ann.note}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function TemperamentTab({ temperament }: { temperament: Temperament | null }) {
  if (!temperament) return null;
  const desc = getTemperamentDescription(temperament);
  if (!desc) return null;

  const elements = ['fire', 'earth', 'air', 'water'];
  const elementForTemperament: Record<Temperament, string> = {
    choleric: 'fire', phlegmatic: 'earth', sanguine: 'air', melancholic: 'water',
  };
  const dominantEl = elementForTemperament[temperament];

  return (
    <div className="space-y-4">
      <div
        className="rounded-[18px] p-5"
        style={{ background: `${desc.color}15` }}
      >
        <div className="text-[10px] font-medium tracking-widest uppercase mb-1" style={{ color: desc.color }}>
          Your temperament · {desc.element}
        </div>
        <h2 className="font-serif text-2xl text-ink mb-3">{desc.name}</h2>
        <p className="font-serif text-base text-ink-soft leading-[1.75]">{desc.brief}</p>
      </div>

      {/* Element balance */}
      <div>
        <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-2">Elemental balance</div>
        <div className="flex gap-2">
          {elements.map((el) => (
            <div
              key={el}
              className="flex-1 py-2 rounded-[10px] text-center"
              style={{
                background: el === dominantEl ? `${desc.color}20` : 'rgba(28,25,23,0.04)',
                border: el === dominantEl ? `1px solid ${desc.color}40` : 'none',
              }}
            >
              <div className="text-[10px] font-medium tracking-widest uppercase" style={{
                color: el === dominantEl ? desc.color : 'var(--color-ink-muted)',
              }}>
                {el}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-1">Gift</div>
        <p className="text-sm text-ink-soft leading-[1.65]">{desc.gift}</p>
      </div>
      <div>
        <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-1">Shadow</div>
        <p className="text-sm text-ink-soft leading-[1.65]">{desc.shadow}</p>
      </div>
      <div
        className="rounded-[14px] p-4"
        style={{ background: 'rgba(201,168,76,0.08)' }}
      >
        <div className="text-[10px] font-medium tracking-widest uppercase mb-1" style={{ color: 'var(--color-gold-soft)' }}>Practice</div>
        <p className="text-sm text-ink-soft leading-[1.65]">{desc.practice}</p>
      </div>
    </div>
  );
}

function BiographyTab({ biographicalPhase }: { biographicalPhase: number | null }) {
  if (!biographicalPhase) return null;

  const currentPhaseIndex = Math.min(biographicalPhase - 1, BIOGRAPHICAL_PHASES.length - 1);
  const currentPhase = BIOGRAPHICAL_PHASES[currentPhaseIndex];
  if (!currentPhase) return null;

  return (
    <div className="space-y-4">
      {/* Arc visualization */}
      <div>
        <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-3">Your biographical arc</div>
        <div className="flex gap-1 mb-3">
          {BIOGRAPHICAL_PHASES.filter(p => p.ageRange[1] !== 999).map((p) => {
            const isCurrent = p.phase === biographicalPhase;
            return (
              <div
                key={p.phase}
                className="h-2 flex-1 rounded-full transition-all"
                style={{
                  background: isCurrent ? 'var(--color-cosmic-blue)' : p.phase < biographicalPhase ? 'rgba(30,58,95,0.3)' : 'rgba(28,25,23,0.08)',
                  transform: isCurrent ? 'scaleY(1.5)' : 'none',
                }}
              />
            );
          })}
        </div>
        <div className="flex justify-between text-[9px] text-ink-muted">
          <span>Birth</span>
          <span>21</span>
          <span>35</span>
          <span>49</span>
          <span>63+</span>
        </div>
      </div>

      {/* Current phase */}
      <div
        className="rounded-[18px] p-5"
        style={{ background: 'rgba(30,58,95,0.07)' }}
      >
        <div className="text-[10px] font-medium tracking-widest uppercase mb-1" style={{ color: 'var(--color-cosmic-blue)' }}>
          Phase {biographicalPhase} · Ages {currentPhase.ageRange[0]}–{currentPhase.ageRange[1] === 999 ? '∞' : currentPhase.ageRange[1]}
        </div>
        <h2 className="font-serif text-xl text-ink mb-1">{currentPhase.name}</h2>
        <p className="text-sm text-ink-muted mb-4">{currentPhase.subtitle}</p>
        <div className="space-y-3">
          <div>
            <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-1">What is developing</div>
            <p className="text-sm text-ink-soft leading-[1.65]">{currentPhase.facultiesDeveloping}</p>
          </div>
          <div>
            <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-1">Archetypal challenge</div>
            <p className="text-sm text-ink-soft leading-[1.65]">{currentPhase.archetypeChallenge}</p>
          </div>
          <div
            className="rounded-[12px] p-3"
            style={{ background: 'rgba(201,168,76,0.08)' }}
          >
            <div className="text-[10px] font-medium tracking-widest uppercase mb-1" style={{ color: 'var(--color-gold-soft)' }}>
              Practice note
            </div>
            <p className="text-xs text-ink-soft leading-[1.65]">{currentPhase.practiceNote}</p>
          </div>
        </div>
      </div>

      {/* World sentence */}
      <div className="text-center py-2">
        <p className="font-serif text-lg text-ink-muted italic">"{currentPhase.worldSentence}"</p>
      </div>

      <Link href="/inner-anatomy" className="block">
        <div
          className="rounded-[14px] p-4 flex items-center justify-between"
          style={{ background: 'rgba(28,25,23,0.04)' }}
        >
          <div>
            <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-0.5">Explore</div>
            <div className="font-serif text-base text-ink">Inner Anatomy →</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function ConstitutionPage() {
  const [tab, setTab] = useState<Tab>('wheel');
  const [chart, setChart] = useState<AstralChart | null>(null);
  const [temperament, setTemperament] = useState<Temperament | null>(null);
  const [biographicalPhase, setBiographicalPhase] = useState<number | null>(null);
  const [ninefold, setNinefold] = useState<NinefoldAnnotation | null>(null);

  useEffect(() => {
    try {
      const rawChart = localStorage.getItem('hygiea.primary-chart.v1');
      const rawBirth = localStorage.getItem('hygiea.birth-data');
      if (!rawChart) return;
      const c = JSON.parse(rawChart) as AstralChart;
      setChart(c);

      const temp = calculateTemperament(c);
      setTemperament(temp);

      if (rawBirth) {
        const bd = JSON.parse(rawBirth);
        const phase = calculateBiographicalPhase(bd);
        setBiographicalPhase(phase);
        setNinefold(calculateNinefoldAnnotations(c, temp, phase));
      }
    } catch {}
  }, []);

  return (
    <div className="pb-28 max-w-[430px] mx-auto">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-1">Your constitution</div>
        <h1 className="font-serif text-[1.75rem] text-ink leading-tight">Spirit-Soul Profile</h1>
      </div>

      {/* Tabs */}
      <div className="px-5 mb-5">
        <div className="flex gap-1 p-1 rounded-[14px]" style={{ background: 'rgba(28,25,23,0.06)' }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="flex-1 py-2 rounded-[11px] text-xs font-medium transition-all"
              style={{
                background: tab === t.id ? 'var(--color-cream)' : 'transparent',
                color: tab === t.id ? 'var(--color-ink)' : 'var(--color-ink-muted)',
                boxShadow: tab === t.id ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="px-5">
        {tab === 'wheel' && (
          chart ? (
            <div>
              <ZoomableWheel chart={chart} size={360} />
              <div className="mt-4 space-y-2">
                {temperament && (
                  <div className="text-sm text-ink-muted">
                    Temperament: <span className="text-ink font-medium capitalize">{temperament}</span>
                  </div>
                )}
                {biographicalPhase && (
                  <div className="text-sm text-ink-muted">
                    Biographical phase: <span className="text-ink font-medium">{biographicalPhase}</span>
                    {' · '}
                    <span>{getBiographicalPhase(biographicalPhase ? biographicalPhase * 7 - 3 : 0).name}</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-ink-muted">No chart found. <Link href="/onboarding" className="underline">Complete onboarding</Link></p>
            </div>
          )
        )}

        {tab === 'ninefold' && <NinefoldTab chart={chart!} ninefold={ninefold} />}
        {tab === 'temperament' && <TemperamentTab temperament={temperament} />}
        {tab === 'biography' && <BiographyTab biographicalPhase={biographicalPhase} />}
      </div>
    </div>
  );
}
