'use client';

// NEVER_AI — Foundation Stone content is human-authored. See src/content/foundationStone.ts.

import { useState, useEffect } from 'react';
import {
  FOUNDATION_STONE_MOVEMENTS,
  type FoundationStoneMovement,
  type FoundationStoneMovementNumber,
} from '@/content/foundationStone';
import { getSupabase } from '@/lib/supabase';
import { getUser } from '@/lib/auth';

interface FoundationArc {
  movementNumber: FoundationStoneMovementNumber;
  startDate: string;
  reflection: string;
  completed: boolean;
  completedDate?: string;
}

const STORAGE_KEY = 'hygiea.foundation-arc.v1';
const MOVEMENT_COLORS: Record<number, string> = {
  1: '#8B2E2E',
  2: '#C9A84C',
  3: '#1E3A5F',
  4: '#5A3E7A',
};

function getDayInArc(startDate: string): number {
  const start = new Date(startDate);
  const now = new Date();
  const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
}

function loadArc(): FoundationArc | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveArc(arc: FoundationArc): void {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(arc)); } catch {}
}

async function syncArc(arc: FoundationArc) {
  const sb = getSupabase();
  const user = await getUser();
  if (!sb || !user) return;
  try {
    await sb.from('foundation_arc').upsert({
      user_id: user.id,
      movement_number: arc.movementNumber,
      start_date: arc.startDate,
      reflection: arc.reflection || null,
      completed: arc.completed,
      completed_date: arc.completedDate || null,
    }, { onConflict: 'user_id,movement_number' });
  } catch {}
}

export default function FoundationPage() {
  const [arc, setArc] = useState<FoundationArc | null>(null);
  const [showText, setShowText] = useState(false);
  const [reflection, setReflection] = useState('');
  const [justCompleted, setJustCompleted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = loadArc();
    setArc(saved);
    if (saved) setReflection(saved.reflection || '');
    setLoaded(true);
  }, []);

  function startArc(movementNumber: FoundationStoneMovementNumber) {
    const newArc: FoundationArc = {
      movementNumber,
      startDate: new Date().toISOString().split('T')[0],
      reflection: '',
      completed: false,
    };
    setArc(newArc);
    saveArc(newArc);
    syncArc(newArc);
  }

  function saveReflection() {
    if (!arc) return;
    const updated = { ...arc, reflection };
    setArc(updated);
    saveArc(updated);
    syncArc(updated);
  }

  function completeArc() {
    if (!arc) return;
    const updated: FoundationArc = {
      ...arc,
      reflection,
      completed: true,
      completedDate: new Date().toISOString().split('T')[0],
    };
    setArc(updated);
    saveArc(updated);
    syncArc(updated);
    setJustCompleted(true);
  }

  function beginNextArc() {
    if (!arc) return;
    const next = ((arc.movementNumber % 4) + 1) as FoundationStoneMovementNumber;
    startArc(next);
    setJustCompleted(false);
    setShowText(false);
  }

  function resetArc() {
    setArc(null);
    localStorage.removeItem(STORAGE_KEY);
    setJustCompleted(false);
    setReflection('');
  }

  if (!loaded) return null;

  // No arc started — movement selection
  if (!arc) {
    return (
      <div className="pb-28 max-w-[430px] mx-auto">
        <div className="px-5 pt-6 pb-4">
          <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-1">
            Foundation Stone
          </div>
          <h1 className="font-serif text-[1.75rem] text-ink leading-tight">The Four Movements</h1>
          <p className="text-sm text-ink-muted mt-1 leading-[1.65]">
            Rudolf Steiner's Foundation Stone Meditation, given at the Christmas Conference of 1923–24, offers four 90-day arcs of inner practice. Each movement works through a different member of the human being. Begin the first and follow its thread.
          </p>
        </div>

        <div className="px-5 space-y-3">
          {FOUNDATION_STONE_MOVEMENTS.map((m) => {
            const color = MOVEMENT_COLORS[m.number];
            return (
              <button
                key={m.number}
                onClick={() => startArc(m.number as FoundationStoneMovementNumber)}
                className="w-full text-left rounded-[18px] p-5"
                style={{ background: `${color}12`, border: `1px solid ${color}25` }}
              >
                <div className="text-[10px] font-medium tracking-widest uppercase mb-1" style={{ color }}>
                  Movement {m.number} · {m.humanRegion}
                </div>
                <div className="font-serif text-lg text-ink mb-1">{m.practiceAct}</div>
                <div className="text-xs text-ink-muted leading-[1.6]">{m.orientationNote.slice(0, 140)}…</div>
              </button>
            );
          })}

          <div className="rounded-[14px] p-4 mt-2" style={{ background: 'rgba(28,25,23,0.04)' }}>
            <p className="text-xs text-ink-muted leading-[1.65]">
              The four movements may be worked in sequence or entered at whichever resonates with your current biographical moment. Steiner suggested beginning with Movement I and proceeding in order. Each arc is 90 days — three months of consistent daily attention.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const movement: FoundationStoneMovement = FOUNDATION_STONE_MOVEMENTS[arc.movementNumber - 1];
  const color = MOVEMENT_COLORS[arc.movementNumber];
  const dayIn = getDayInArc(arc.startDate);
  const progress = Math.min(dayIn / 90, 1);
  const daysLeft = Math.max(0, 90 - dayIn);

  // Just completed
  if (justCompleted || (arc.completed)) {
    const nextNum = ((arc.movementNumber % 4) + 1) as FoundationStoneMovementNumber;
    const nextMovement = FOUNDATION_STONE_MOVEMENTS[nextNum - 1];
    return (
      <div className="pb-28 max-w-[430px] mx-auto">
        <div className="px-5 pt-6 pb-4">
          <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-1">
            Foundation Stone
          </div>
          <h1 className="font-serif text-[1.75rem] text-ink leading-tight">Arc Complete</h1>
        </div>
        <div className="px-5 space-y-4">
          <div className="rounded-[18px] p-5 text-center" style={{ background: `${color}10` }}>
            <div className="font-serif text-2xl text-ink mb-2">Movement {arc.movementNumber} — Complete.</div>
            <p className="text-sm text-ink-muted leading-[1.65]">
              Ninety days of {movement.practiceAct.toLowerCase()}. The work of this movement is inscribed in your etheric life, beneath the reach of ordinary memory.
            </p>
            <div className="mt-3 text-xs italic text-ink-muted font-serif">{movement.latineAffirmation}</div>
          </div>

          {arc.reflection && (
            <div className="rounded-[14px] p-4" style={{ background: 'rgba(28,25,23,0.04)' }}>
              <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-2">Your reflection</div>
              <p className="text-sm text-ink-soft leading-[1.65] font-serif">{arc.reflection}</p>
            </div>
          )}

          <button
            onClick={beginNextArc}
            className="w-full h-[52px] rounded-[26px] font-medium text-sm"
            style={{ background: MOVEMENT_COLORS[nextNum], color: 'white' }}
          >
            Begin Movement {nextNum} · {nextMovement.practiceAct}
          </button>

          <button
            onClick={resetArc}
            className="w-full text-center text-sm text-ink-muted mt-2"
          >
            Reset (choose any movement)
          </button>
        </div>
      </div>
    );
  }

  // Active arc
  return (
    <div className="pb-28 max-w-[430px] mx-auto">
      <div className="px-5 pt-6 pb-4">
        <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-1">
          Foundation Stone · Movement {arc.movementNumber}
        </div>
        <h1 className="font-serif text-[1.75rem] text-ink leading-tight">{movement.practiceAct}</h1>
        <p className="text-xs text-ink-muted mt-1">{movement.humanRegion} · {movement.hierarchy.split('—')[0].trim()}</p>
      </div>

      <div className="px-5 space-y-4">
        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-[10px] text-ink-muted mb-1">
            <span>Day {dayIn + 1} of 90</span>
            <span>{daysLeft > 0 ? `${daysLeft} days remaining` : 'Complete'}</span>
          </div>
          <div className="h-1.5 rounded-full" style={{ background: 'rgba(28,25,23,0.1)' }}>
            <div
              className="h-1.5 rounded-full transition-all"
              style={{ width: `${progress * 100}%`, background: color }}
            />
          </div>
        </div>

        {/* Orientation note */}
        <div
          className="rounded-[16px] p-4"
          style={{ background: `${color}10`, border: `1px solid ${color}20` }}
        >
          <div className="text-[10px] font-medium tracking-widest uppercase mb-2" style={{ color }}>
            Orientation
          </div>
          <p className="text-sm text-ink-soft leading-[1.7]">{movement.orientationNote}</p>
        </div>

        {/* Daily contemplation prompt */}
        <div className="rounded-[16px] p-4" style={{ background: 'rgba(201,168,76,0.08)' }}>
          <div className="text-[10px] font-medium tracking-widest uppercase mb-2" style={{ color: 'var(--color-gold-soft)' }}>
            Today's contemplation
          </div>
          <p className="text-sm text-ink-soft leading-[1.7]">{movement.ninetyDayPrompt}</p>
        </div>

        {/* Movement text toggle */}
        <button
          onClick={() => setShowText(!showText)}
          className="w-full text-left rounded-[14px] p-3 flex items-center justify-between"
          style={{ background: 'rgba(28,25,23,0.04)' }}
        >
          <div className="text-sm font-medium text-ink">Read Movement {arc.movementNumber}</div>
          <span className="text-ink-muted text-sm">{showText ? '↑' : '↓'}</span>
        </button>

        {showText && (
          <div className="rounded-[14px] p-5" style={{ background: 'rgba(28,25,23,0.04)' }}>
            <pre className="font-serif text-sm text-ink-soft leading-[1.8] whitespace-pre-wrap">
              {movement.text}
            </pre>
            <div className="mt-4 text-xs text-ink-muted italic text-right">{movement.latineAffirmation}</div>
          </div>
        )}

        {/* Reflection */}
        <div>
          <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-2">
            Arc reflection
          </div>
          <p className="text-xs text-ink-muted mb-2 leading-[1.65]">
            A single place to gather what this arc has offered. Add to it as the 90 days unfold.
          </p>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="What has this movement opened in you?"
            className="w-full border rounded-[14px] px-4 py-3 text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none resize-none font-serif"
            style={{ borderColor: 'var(--color-rule-soft)', minHeight: 90 }}
            rows={3}
          />
          {reflection !== (arc.reflection || '') && (
            <button
              onClick={saveReflection}
              className="mt-2 text-sm font-medium"
              style={{ color }}
            >
              Save reflection
            </button>
          )}
        </div>

        {/* Complete arc */}
        {dayIn >= 80 && (
          <button
            onClick={completeArc}
            className="w-full h-[52px] rounded-[26px] font-medium text-sm"
            style={{ background: color, color: 'white' }}
          >
            Complete this arc
          </button>
        )}

        <button
          onClick={resetArc}
          className="w-full text-center text-xs text-ink-muted/60 py-1"
        >
          Begin a different movement
        </button>
      </div>
    </div>
  );
}
