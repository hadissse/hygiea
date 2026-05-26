'use client';

// NEVER_AI — All Goethean content is human-authored.

import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase';
import { getUser } from '@/lib/auth';

type Kingdom = 'mineral' | 'plant' | 'animal' | 'human';
type GoetheanStep = 'observe' | 'arises';

interface GoetheanEntry {
  id: string;
  date: string;
  kingdom: Kingdom;
  observation: string;
  interpretation: string;
}

const KINGDOM_LABELS: Record<Kingdom, string> = {
  mineral: 'Mineral',
  plant:   'Plant',
  animal:  'Animal',
  human:   'Human',
};

const KINGDOM_COLORS: Record<Kingdom, string> = {
  mineral: '#78716C',
  plant:   '#6B8F5C',
  animal:  '#C9A84C',
  human:   '#1E3A5F',
};

// Kingdom rotates by biographical phase + month; default monthly rotation
const KINGDOM_ROTATION: Kingdom[] = ['mineral', 'plant', 'animal', 'human'];

function getCurrentKingdom(): Kingdom {
  const month = new Date().getMonth(); // 0–11
  return KINGDOM_ROTATION[month % 4];
}

const STEP_LABELS: Record<GoetheanStep, string> = {
  observe: 'What do you perceive?',
  arises:  'What arises?',
};

const STEP_SUBTEXTS: Record<GoetheanStep, string> = {
  observe:
    'Describe only what is actually present to your senses. Name what you see, hear, smell, touch, or taste — not what you know about it or what it reminds you of. The senses first.',
  arises:
    'Only after pure observation: what arose within you as you attended? A feeling, an image, a quality. Not an interpretation — what arose?',
};

const STAGE_NAMES = [
  'Exact Sense Perception',
  'Exact Sensorial Imagination',
  'Beholding the Gesture',
  'Intuition',
];

export default function GoetheanPage() {
  const [kingdom] = useState<Kingdom>(getCurrentKingdom());
  const [step, setStep] = useState<GoetheanStep>('observe');
  const [observation, setObservation] = useState('');
  const [arises, setArises] = useState('');
  const [saved, setSaved] = useState(false);
  const [pastEntries, setPastEntries] = useState<GoetheanEntry[]>([]);
  const [showStages, setShowStages] = useState(false);

  useEffect(() => {
    // Load past entries from localStorage
    try {
      const raw = localStorage.getItem('hygiea.goethean.v1');
      if (raw) setPastEntries(JSON.parse(raw));
    } catch {}
  }, []);

  async function handleSave() {
    if (!observation.trim()) return;
    const today = new Date().toISOString().split('T')[0];
    const entry: GoetheanEntry = {
      id: `goethean-${Date.now()}`,
      date: today,
      kingdom,
      observation: observation.trim(),
      interpretation: arises.trim(),
    };

    // Save to localStorage
    const updated = [entry, ...pastEntries.slice(0, 19)]; // keep 20 max
    setPastEntries(updated);
    try {
      localStorage.setItem('hygiea.goethean.v1', JSON.stringify(updated));
    } catch {}

    // Supabase sync
    const sb = getSupabase();
    const user = await getUser();
    if (sb && user) {
      try {
        await sb.from('goethean_entries').insert({
          user_id: user.id,
          date: today,
          kingdom,
          observation: observation.trim(),
          interpretation: arises.trim() || null,
        });
      } catch (e) {
        if (process.env.NODE_ENV === 'development') console.error('syncGoethean:', e);
      }
    }

    setSaved(true);
  }

  const color = KINGDOM_COLORS[kingdom];

  return (
    <div className="pb-28 max-w-[430px] mx-auto">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-1">
          Goethean Observation
        </div>
        <h1 className="font-serif text-[1.75rem] text-ink leading-tight">Seeing Precisely</h1>
        <p className="text-sm text-ink-muted mt-1">
          The phenomenological method of Goethe — perceive before you interpret.
        </p>
      </div>

      <div className="px-5 space-y-4">
        {/* Kingdom indicator */}
        <div
          className="rounded-[18px] p-4"
          style={{ background: `${color}12`, border: `1px solid ${color}25` }}
        >
          <div className="text-[10px] font-medium tracking-widest uppercase mb-1" style={{ color }}>
            This month's kingdom
          </div>
          <h2 className="font-serif text-xl text-ink">{KINGDOM_LABELS[kingdom]} kingdom</h2>
          <p className="text-xs text-ink-muted mt-1">
            Step outside. Find one {kingdom} to attend to for at least five minutes.
          </p>
        </div>

        {/* Four stages reference */}
        <button
          onClick={() => setShowStages(!showStages)}
          className="w-full text-left rounded-[14px] p-3 flex items-center justify-between"
          style={{ background: 'rgba(28,25,23,0.04)' }}
        >
          <div className="text-sm font-medium text-ink">The four stages of Goethean observation</div>
          <span className="text-ink-muted text-sm">{showStages ? '↑' : '↓'}</span>
        </button>
        {showStages && (
          <div className="rounded-[14px] p-4 space-y-3" style={{ background: 'rgba(28,25,23,0.04)' }}>
            {STAGE_NAMES.map((name, i) => (
              <div key={name} className="flex gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0"
                  style={{ background: color, color: 'white' }}
                >
                  {i + 1}
                </div>
                <div className="text-sm text-ink-soft leading-[1.6]">{name}</div>
              </div>
            ))}
          </div>
        )}

        {!saved ? (
          <>
            {/* Step selector */}
            <div className="flex gap-2">
              {(['observe', 'arises'] as GoetheanStep[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setStep(s)}
                  className="flex-1 py-2.5 rounded-[12px] text-sm font-medium transition-all"
                  style={{
                    background: step === s ? color : 'rgba(28,25,23,0.06)',
                    color: step === s ? 'white' : 'var(--color-ink-muted)',
                  }}
                >
                  {s === 'observe' ? '1. Observe' : '2. What arises'}
                </button>
              ))}
            </div>

            {/* Prompt */}
            <div>
              <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-2">
                {STEP_LABELS[step]}
              </div>
              <p className="text-sm text-ink-muted leading-[1.65] mb-3">{STEP_SUBTEXTS[step]}</p>
              <textarea
                value={step === 'observe' ? observation : arises}
                onChange={(e) =>
                  step === 'observe' ? setObservation(e.target.value) : setArises(e.target.value)
                }
                placeholder={
                  step === 'observe'
                    ? 'What do you see, hear, smell, touch? Be precise. No interpretation.'
                    : 'After attending purely: what arose? A feeling, a quality, an image.'
                }
                className="w-full border rounded-[14px] px-4 py-3 text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none resize-none font-serif"
                style={{ borderColor: 'var(--color-rule-soft)', minHeight: 100 }}
                rows={4}
              />
            </div>

            <button
              onClick={handleSave}
              disabled={!observation.trim()}
              className="w-full h-[52px] rounded-[26px] font-medium text-sm transition-colors disabled:opacity-40"
              style={{ background: color, color: 'white' }}
            >
              Save observation
            </button>
          </>
        ) : (
          <div
            className="rounded-[18px] p-5 text-center"
            style={{ background: `${color}10` }}
          >
            <div className="font-serif text-xl text-ink mb-2">Observed.</div>
            <p className="text-sm text-ink-muted leading-[1.65]">
              The {kingdom} met you today. What you attended to is recorded.
            </p>
            <button
              onClick={() => { setSaved(false); setObservation(''); setArises(''); setStep('observe'); }}
              className="mt-4 text-sm font-medium"
              style={{ color }}
            >
              New observation
            </button>
          </div>
        )}

        {/* Past entries */}
        {pastEntries.length > 0 && (
          <div className="mt-4">
            <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-3">
              Recent observations
            </div>
            <div className="space-y-2">
              {pastEntries.slice(0, 5).map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-[14px] p-3"
                  style={{ background: 'rgba(28,25,23,0.04)' }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="text-[9px] font-medium tracking-widest uppercase"
                      style={{ color: KINGDOM_COLORS[entry.kingdom] }}
                    >
                      {KINGDOM_LABELS[entry.kingdom]}
                    </div>
                    <div className="text-[9px] text-ink-muted">{entry.date}</div>
                  </div>
                  <p className="text-sm text-ink-soft leading-[1.6]">
                    {entry.observation.slice(0, 100)}{entry.observation.length > 100 ? '…' : ''}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
