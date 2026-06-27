'use client';

// SEARCH (Scr95-102) — tab-level screen (Header + TabBar from (app)).
// One interactive page covering: default(95), suggestions(96), results(97),
// filters(98), search-by-feeling(99), no-results(100), teacher results(101),
// list view(102).

import { useMemo, useState } from 'react';
import { GradientOrb } from '@/components/GradientOrb';
import {
  SearchIcon,
  CloseIcon,
  ChevronEnd,
  PlayIcon,
  FilterIcon,
  gradientCss,
} from '@/components/learn/primitives';

const RECENT = ['Sleep', 'Letting Go', '5 min', 'Breathe', 'Maya Cole'];
const POPULAR = ['Beginners', '3 min', 'Body Scan', 'Walking', 'Sleep Stories', 'Anxiety'];

const SUGGESTIONS = ['Sleep Stories', 'Sleep Music', 'Kids Sleep', 'Sleep + Anxiety', 'Bedtime Stories'];

const SLEEP_RESULTS: [string, string, string][] = [
  ['The Slow Lighthouse', 'Story · 45 min', '#3A4490'],
  ['Effortless Sleep', 'Solo · 3 min', '#5A3E7A'],
  ['Soft Rain', 'Soundscape', '#C2D3E2'],
  ['From Body to Bed', 'Solo · 10 min', '#9C8AB8'],
  ['On Sleep', 'Series · 5 days', '#3A4490'],
];

const FEELINGS: [string, string, boolean][] = [
  ['Tense', 'dawn', false],
  ['Tired', 'dusk', false],
  ['Anxious', 'ember', true],
  ['Foggy', 'lake', true],
  ['Heavy', 'night', false],
  ['Open', 'sage', true],
  ['Worried', 'dust', true],
  ['Tender', 'dawn', false],
];

const BREATH_LIST: [string, string][] = [
  ['Box Breath', '5 min'],
  ['Breathe Through It', '10 min'],
  ['One Breath', '30 sec'],
  ['Breath as Anchor', '7 min'],
];

const TEACHER_SESSIONS: [string, string][] = [
  ['The Quiet Path · Day 1', '10 min'],
  ['Gentle Anchors', '7 min'],
  ['On Returning', '5 min'],
];

const FILTER_GROUPS: [string, string[], number][] = [
  ['Duration', ['Under 5 min', '5–10', '10–20', '20+'], 1],
  ['Type', ['Reflect', 'Sleep Story', 'Soundscape', 'Reading'], 0],
  ['Teacher', ['Any', 'Maya Cole', 'Jonas Park', 'Priya Shah', 'Theo Reid'], 1],
];

function ResultRow({ title, sub, color }: { title: string; sub: string; color: string }) {
  return (
    <div className="bg-white rounded-[14px] p-3 border border-sand flex gap-3 items-center">
      <div className="w-14 h-14 rounded-[10px] shrink-0" style={{ background: color }} />
      <div className="flex-1">
        <div className="text-sm text-ink font-medium">{title}</div>
        <div className="text-xs text-ink-muted mt-0.5">{sub}</div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [committed, setCommitted] = useState(false);
  const [feelings, setFeelings] = useState(false);
  const [filters, setFilters] = useState(false);

  // which result-state to show based on the committed query
  const state = useMemo<'sleep' | 'teacher' | 'breath' | 'empty'>(() => {
    const q = query.trim().toLowerCase();
    if (q.includes('sleep')) return 'sleep';
    if (q.includes('maya')) return 'teacher';
    if (q.includes('breath')) return 'breath';
    return 'empty';
  }, [query]);

  const showSuggestions = query.trim().length > 0 && !committed;

  // ── Scr98: filters panel ──
  if (filters) {
    return (
      <div className="pb-28 px-5 pt-4 relative min-h-[80vh]">
        <div className="flex justify-between items-center">
          <h1 className="font-serif text-[22px] text-ink">Filters</h1>
          <button className="text-sm text-coral font-medium" onClick={() => setFilters(false)}>Reset</button>
        </div>
        <div className="mt-5 flex flex-col gap-[22px]">
          {FILTER_GROUPS.map(([h, opts, sel]) => (
            <div key={h}>
              <div className="text-[13px] text-ink-muted font-semibold mb-3">{h}</div>
              <div className="flex flex-wrap gap-2">
                {opts.map((t, i) => (
                  <span
                    key={t}
                    className={`px-3.5 py-2 rounded-full text-[13px] ${
                      i === sel ? 'bg-ink text-cream' : 'bg-white text-ink border border-sand'
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="fixed bottom-24 inset-x-0 md:left-[220px] px-5 max-w-[430px] mx-auto">
          <button
            onClick={() => setFilters(false)}
            className="block w-full text-center py-3.5 rounded-[14px] bg-ink text-cream text-sm font-medium"
          >
            Show 8 Results
          </button>
        </div>
      </div>
    );
  }

  // ── Scr99: search by feeling ──
  if (feelings) {
    return (
      <div className="pb-28 px-5 pt-4">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-[28px] text-ink -tracking-[0.5px]">Search by Feeling</h1>
          <button className="text-sm text-coral font-medium" onClick={() => setFeelings(false)}>‹ Back</button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          {FEELINGS.map(([l, v, onLight]) => (
            <div
              key={l}
              className="h-[100px] rounded-[16px] p-4 flex items-end font-serif text-[18px]"
              style={{ background: gradientCss(v), color: onLight ? '#171B3A' : '#FFFFFF' }}
            >
              {l}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="pb-28 px-5 pt-4">
      {!committed && query.trim().length === 0 && (
        <h1 className="font-serif text-[28px] text-ink mb-3.5 -tracking-[0.5px]">Search</h1>
      )}

      {/* search bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2.5 bg-white rounded-[12px] px-3.5 py-2.5 border border-sand">
          <span className="text-ink-muted"><SearchIcon /></span>
          <input
            dir="ltr"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCommitted(false);
            }}
            onKeyDown={(e) => e.key === 'Enter' && setCommitted(true)}
            placeholder="Search"
            className="flex-1 bg-transparent text-[15px] text-ink focus:outline-none placeholder:text-ink-muted"
          />
          {query && (
            <button onClick={() => { setQuery(''); setCommitted(false); }} aria-label="Clear" className="text-ink-muted">
              <CloseIcon size={18} />
            </button>
          )}
        </div>
        {(query || committed) && (
          <button onClick={() => { setQuery(''); setCommitted(false); }} className="text-sm text-coral font-medium shrink-0">
            Cancel
          </button>
        )}
      </div>

      {/* Scr95 — default (recent + popular + feeling entry) */}
      {!showSuggestions && !committed && query.trim().length === 0 && (
        <div className="mt-6">
          <div className="text-[13px] text-ink-muted font-semibold">Recent</div>
          <div className="mt-3 flex flex-col gap-1.5">
            {RECENT.map((t) => (
              <button
                key={t}
                onClick={() => { setQuery(t); setCommitted(true); }}
                className="py-3 px-1 flex items-center justify-between text-start"
              >
                <span className="text-[15px] text-ink">{t}</span>
                <span className="text-ink-muted"><CloseIcon size={18} /></span>
              </button>
            ))}
          </div>
          <div className="text-[13px] text-ink-muted font-semibold mt-4">Popular</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {POPULAR.map((t) => (
              <button
                key={t}
                onClick={() => { setQuery(t); setCommitted(true); }}
                className="px-4 py-2 rounded-full bg-cream-soft text-ink-soft text-sm hover:bg-sand"
              >
                {t}
              </button>
            ))}
          </div>
          <button
            onClick={() => setFeelings(true)}
            className="mt-6 w-full flex items-center justify-between bg-cream-soft rounded-[14px] px-4 py-3.5"
          >
            <span className="text-sm text-ink font-medium">Search by Feeling</span>
            <ChevronEnd className="text-ink-muted" />
          </button>
        </div>
      )}

      {/* Scr96 — suggestions while typing */}
      {showSuggestions && (
        <div className="mt-5">
          <div className="text-[13px] text-ink-muted font-semibold">Suggestions</div>
          <div className="mt-3">
            {SUGGESTIONS.map((t) => (
              <button
                key={t}
                onClick={() => { setQuery(t); setCommitted(true); }}
                className="w-full py-3.5 border-b border-sand flex items-center justify-between text-start"
              >
                <span className="text-[15px] text-ink">{t}</span>
                <ChevronEnd className="text-ink-muted" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* committed results */}
      {committed && (
        <div className="mt-5">
          {/* filter trigger */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-[13px] text-ink-muted">
              {state === 'sleep' && `14 results for "${query.trim()}"`}
              {state === 'breath' && `8 results for "${query.trim()}"`}
              {state === 'teacher' && 'Results'}
              {state === 'empty' && ' '}
            </span>
            <button onClick={() => setFilters(true)} className="text-ink-muted" aria-label="Filters">
              <FilterIcon size={20} />
            </button>
          </div>

          {/* Scr97 — card results (sleep) */}
          {state === 'sleep' && (
            <div className="flex flex-col gap-2.5">
              {SLEEP_RESULTS.map(([t, s, c], i) => (
                <ResultRow key={i} title={t} sub={s} color={c} />
              ))}
            </div>
          )}

          {/* Scr101 — teacher results */}
          {state === 'teacher' && (
            <div className="flex flex-col gap-2.5">
              <div className="text-[13px] text-ink-muted font-semibold">Teachers</div>
              <div className="bg-white rounded-[14px] p-3.5 border border-sand flex gap-3.5 items-center">
                <div className="w-[50px] h-[50px] rounded-full bg-[#C9D2BE]" />
                <div className="flex-1">
                  <div className="text-[15px] text-ink font-medium">Maya Cole</div>
                  <div className="text-xs text-ink-muted mt-0.5">12 sessions · Warm &amp; grounded</div>
                </div>
                <ChevronEnd className="text-ink-muted" />
              </div>
              <div className="text-[13px] text-ink-muted font-semibold mt-3">Sessions</div>
              {TEACHER_SESSIONS.map(([t, d]) => (
                <div key={t} className="bg-white rounded-[14px] p-3 border border-sand flex gap-3 items-center">
                  <div className="w-[50px] h-[50px] rounded-[10px] bg-[#F8D6BE]" />
                  <div className="flex-1">
                    <div className="text-sm text-ink font-medium">{t}</div>
                    <div className="text-xs text-ink-muted mt-0.5">{d} · Maya Cole</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Scr102 — compact list (breath) */}
          {state === 'breath' && (
            <div>
              {BREATH_LIST.map(([t, d]) => (
                <div key={t} className="py-2.5 border-b border-sand flex justify-between items-center">
                  <div>
                    <div className="text-sm text-ink font-medium">{t}</div>
                    <div className="text-xs text-ink-muted mt-0.5">{d}</div>
                  </div>
                  <span className="text-ink"><PlayIcon size={18} /></span>
                </div>
              ))}
            </div>
          )}

          {/* Scr100 — no results */}
          {state === 'empty' && (
            <div className="pt-14 flex flex-col items-center px-8">
              <GradientOrb variant="dust" size={100} />
              <div className="font-serif text-[22px] text-ink mt-6 -tracking-[0.3px]">No results yet</div>
              <div className="text-sm text-ink-muted mt-2 text-center leading-[1.6]">Try a feeling, a duration, or a teacher&apos;s name.</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
