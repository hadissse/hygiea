'use client';

// NEVER_AI — All inner anatomy content is human-authored.

import { useEffect, useState } from 'react';
import { NINEFOLD_MEMBERS } from '@/content/constitution';

// Planetary metals (English, from existing mineral data)
const PLANETARY_METALS = [
  { planet: 'Sun',     metal: 'Gold',    organ: 'Heart',   color: '#FFC78A', theme: 'The centre of life and radiance — rhythm and warmth.' },
  { planet: 'Moon',    metal: 'Silver',  organ: 'Brain',   color: '#C2D3E2', theme: 'Receptivity and reflection — the mirror of the cosmos in the head.' },
  { planet: 'Mercury', metal: 'Mercury', organ: 'Lungs',   color: '#C9D2BE', theme: 'Exchange and communication — breathing as cosmic-human dialogue.' },
  { planet: 'Venus',   metal: 'Copper',  organ: 'Kidneys', color: '#F8D6BE', theme: 'Balance and beauty — the kidneys as organs of justice.' },
  { planet: 'Mars',    metal: 'Iron',    organ: 'Bile',    color: '#8B2E2E', theme: 'Will and initiative — the Michaelic mineral of purposeful effort.' },
  { planet: 'Jupiter', metal: 'Tin',     organ: 'Liver',   color: '#9C8AB8', theme: 'Expansion and wisdom — the liver as the seat of ancient intelligence.' },
  { planet: 'Saturn',  metal: 'Lead',    organ: 'Spleen',  color: '#5A3E7A', theme: 'Structure and discernment — the spleen as the regulator of time.' },
];

type AnatomyTab = 'threefold' | 'metals' | 'senses';

const TABS = [
  { id: 'threefold' as AnatomyTab, label: 'Threefold' },
  { id: 'metals'    as AnatomyTab, label: 'Metals' },
  { id: 'senses'    as AnatomyTab, label: 'Senses' },
];

// Threefold organism descriptions
const THREEFOLD = [
  {
    region: 'Head system',
    subtitle: 'Nerve-sense system',
    description:
      'The head is the seat of consciousness and thinking. The nervous system is primarily a dying system — it registers the world precisely because it withdraws from life. In the head, the human being lives most completely in the past; it is the organ of memory and concept. The planetary correspondences are Moon (brain) and Saturn (crystallisation).',
    exercise: 'Control of Thought — the head pole is cultivated by disciplined thinking that does not wander.',
    color: '#A8B4C0',
  },
  {
    region: 'Rhythmic system',
    subtitle: 'Heart and lung system',
    description:
      'The middle region — heart and lungs — mediates between head and limbs. It is the system of rhythm: the beating heart, the breathing lungs. It is neither fully awake (like the head) nor fully sleeping (like the limbs and metabolism). The feeling life lives here. In Anthroposophy the heart is not a mere pump but the organ of cosmic-human encounter.',
    exercise: 'Equanimity — the heart pole is cultivated by the capacity to feel fully without being swept away.',
    color: '#C9A84C',
  },
  {
    region: 'Limb and metabolic system',
    subtitle: 'Will system',
    description:
      'The limbs and the metabolic system are the seat of will. Here the human being is most deeply asleep in consciousness — will acts below the threshold of ordinary awareness. The limb system moves in space, transforms matter, and carries the impulses of the future. The warmth organisation lives here.',
    exercise: 'Control of Will — the limb-metabolic pole is cultivated by the practice of arbitrary acts that wake the will from its mechanical sleep.',
    color: '#8B2E2E',
  },
];

function ThreefoldDiagram() {
  return (
    <svg viewBox="0 0 120 200" width="120" height="200" className="mx-auto mb-6">
      {/* Head */}
      <ellipse cx="60" cy="30" rx="35" ry="28" fill="rgba(168,180,192,0.25)" stroke="#A8B4C0" strokeWidth="1.5" />
      <text x="60" y="33" textAnchor="middle" fontSize="9" fill="#5C6E78">Head</text>
      {/* Heart */}
      <rect x="32" y="68" width="56" height="64" rx="6" fill="rgba(201,168,76,0.2)" stroke="#C9A84C" strokeWidth="1.5" />
      <text x="60" y="103" textAnchor="middle" fontSize="9" fill="#78716C">Rhythmic</text>
      {/* Limb + metabolic */}
      <path d="M30 140 Q20 200 38 200 L82 200 Q100 200 90 140 Z" fill="rgba(139,46,46,0.15)" stroke="#8B2E2E" strokeWidth="1.5" />
      <text x="60" y="170" textAnchor="middle" fontSize="9" fill="#8B2E2E">Limb</text>
    </svg>
  );
}

// Import twelve senses type
interface SteinerSenseSimple {
  number: number;
  name: string;
  group: string;
  whatItPerceives: string;
  selfAssessmentQuestion: string;
}

export default function InnerAnatomyPage() {
  const [tab, setTab] = useState<AnatomyTab>('threefold');
  const [senses, setSenses] = useState<SteinerSenseSimple[]>([]);

  useEffect(() => {
    // Dynamically import the twelve senses content
    import('@/content/twelveSenses').then((mod) => {
      const raw = mod.TWELVE_SENSES as SteinerSenseSimple[];
      setSenses(raw ?? []);
    }).catch(() => {
      // twelveSenses may not be importable — use empty array
      setSenses([]);
    });
  }, []);

  return (
    <div className="pb-28 max-w-[430px] mx-auto">
      <div className="px-5 pt-6 pb-4">
        <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-1">Inner Anatomy</div>
        <h1 className="font-serif text-[1.75rem] text-ink leading-tight">The Living Body</h1>
        <p className="text-sm text-ink-muted mt-1">Steiner's spiritual-scientific understanding of the human organism.</p>
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

      <div className="px-5">
        {tab === 'threefold' && (
          <div>
            <ThreefoldDiagram />
            <div className="space-y-4">
              {THREEFOLD.map((region) => (
                <div
                  key={region.region}
                  className="rounded-[16px] p-4"
                  style={{ background: `${region.color}15`, border: `1px solid ${region.color}30` }}
                >
                  <div
                    className="text-[10px] font-medium tracking-widest uppercase mb-1"
                    style={{ color: region.color }}
                  >
                    {region.region}
                  </div>
                  <div className="font-serif text-base text-ink mb-2">{region.subtitle}</div>
                  <p className="text-sm text-ink-soft leading-[1.7] mb-3">{region.description}</p>
                  <div className="text-xs text-ink-muted italic">{region.exercise}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'metals' && (
          <div className="space-y-3">
            <p className="text-sm text-ink-muted leading-[1.65] mb-4">
              In Anthroposophical spiritual science, each of the seven classical planets corresponds to a metal, an organ, and a principle of soul activity. These correspondences are not metaphors — they describe real relationships between cosmic and earthly processes.
            </p>
            {PLANETARY_METALS.map((m) => (
              <div
                key={m.planet}
                className="rounded-[14px] p-4 flex items-start gap-3"
                style={{ background: `${m.color}15` }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-serif text-xs font-medium"
                  style={{ background: m.color, color: 'white' }}
                >
                  {m.metal.slice(0, 2)}
                </div>
                <div>
                  <div className="font-serif text-base text-ink">{m.planet} · {m.metal}</div>
                  <div className="text-xs text-ink-muted mb-1">Organ: {m.organ}</div>
                  <p className="text-xs text-ink-soft leading-[1.6]">{m.theme}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'senses' && (
          <div>
            <p className="text-sm text-ink-muted leading-[1.65] mb-4">
              Steiner identified twelve senses — far beyond the ordinary five. The lower four (will senses) are active in the body; the middle four (feeling senses) relate the inner to the outer; the upper four (knowledge senses) perceive the soul and spirit of others.
            </p>
            {senses.length > 0 ? (
              <div className="space-y-2">
                {senses.map((s) => (
                  <div
                    key={s.number}
                    className="rounded-[14px] p-4"
                    style={{ background: 'rgba(28,25,23,0.04)' }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="text-[10px] font-medium tracking-widest uppercase"
                        style={{
                          color: s.group === 'will' ? '#8B2E2E' : s.group === 'feeling' ? '#C9A84C' : '#1E3A5F',
                        }}
                      >
                        {s.group} sense {s.number}
                      </div>
                    </div>
                    <div className="font-serif text-base text-ink mb-1">{s.name}</div>
                    <p className="text-xs text-ink-muted leading-[1.6] mb-2">{s.whatItPerceives}</p>
                    <p className="text-xs text-ink-soft italic leading-[1.6]">{s.selfAssessmentQuestion}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {['Touch','Life','Self-Movement','Balance','Smell','Taste','Sight','Warmth','Hearing','Language','Conceptual','Ego'].map((name, i) => (
                  <div key={name} className="rounded-[14px] p-3" style={{ background: 'rgba(28,25,23,0.04)' }}>
                    <div className="flex items-center justify-between">
                      <div className="font-serif text-base text-ink">{name}</div>
                      <div className="text-xs text-ink-muted">Sense {i + 1}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
