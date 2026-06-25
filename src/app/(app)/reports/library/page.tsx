'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  SPHERES,
  FIXED_STARS,
  FIXED_STARS_BY_SIGN,
  PLANET_IN_SIGN,
  PLANET_IN_HOUSE,
  ASPECTS,
  ASC_IN_SIGN,
  CHAPTER_SECTIONS,
} from '@/content/reportData';

const PLANETS = ['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto'];
const SIGNS = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];

type Tab = 'placements' | 'houses' | 'aspects' | 'spheres' | 'stars' | 'asc' | 'chapters';

function Card({ label, body, subtle }: { label: string; body: string; subtle?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#E5E1D8] rounded-[14px] bg-white">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full text-left px-4 py-3 flex items-center justify-between gap-3"
      >
        <div>
          <span className="font-medium text-sm text-ink">{label}</span>
          {subtle && <span className="ml-2 text-xs text-ink-muted">{subtle}</span>}
        </div>
        <span className="text-ink-muted text-sm shrink-0">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-[#E5E1D8] pt-3">
          {body.split('\n\n').map((para, i) => (
            <p key={i} className="text-sm text-ink-muted leading-relaxed">{para}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ReportLibraryPage() {
  const [tab, setTab] = useState<Tab>('placements');
  const [filterPlanet, setFilterPlanet] = useState('Sun');
  const [filterSign, setFilterSign] = useState('');
  const [filterHouse, setFilterHouse] = useState('');
  const [filterAspect, setFilterAspect] = useState('');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'placements', label: 'Planet in Sign' },
    { id: 'houses', label: 'Planet in House' },
    { id: 'aspects', label: 'Aspects' },
    { id: 'spheres', label: 'Spheres' },
    { id: 'stars', label: 'Fixed Stars' },
    { id: 'asc', label: 'Ascendant' },
    { id: 'chapters', label: 'Chapters' },
  ];

  const filteredPlacements = PLANET_IN_SIGN.filter(p =>
    (!filterPlanet || p.planet === filterPlanet) &&
    (!filterSign || p.sign === filterSign)
  );

  const filteredHouses = PLANET_IN_HOUSE.filter(p =>
    (!filterPlanet || p.planet === filterPlanet) &&
    (!filterHouse || p.house === filterHouse)
  );

  const filteredAspects = ASPECTS.filter(p =>
    (!filterAspect || p.planet.toLowerCase().includes(filterAspect.toLowerCase()) ||
     p.sign.toLowerCase().includes(filterAspect.toLowerCase()))
  );

  return (
    <div className="px-5 pt-8 pb-32 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/reports" className="text-ink-muted text-sm hover:text-ink transition-colors">← Reports</Link>
      </div>
      <h1 className="text-xl font-prose font-medium text-ink mb-1">Interpretation Library</h1>
      <p className="text-xs text-ink-muted font-ui mb-6">
        All content from the Cosmological Biography database — {PLANET_IN_SIGN.length + PLANET_IN_HOUSE.length + ASPECTS.length} interpretations, {SPHERES.length} spheres, {FIXED_STARS.length} fixed stars.
      </p>

      {/* Tab bar */}
      <div className="flex gap-1 flex-wrap mb-6">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              tab === t.id
                ? 'bg-midnight text-white'
                : 'bg-[#F4F0E8] text-ink-muted hover:text-ink'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Planet in Sign ─────────────────────────────────────────────────── */}
      {tab === 'placements' && (
        <div>
          <div className="flex gap-2 mb-4 flex-wrap">
            <select
              value={filterPlanet}
              onChange={e => setFilterPlanet(e.target.value)}
              className="border border-[#E5E1D8] rounded-lg px-3 py-1.5 text-sm bg-white text-ink"
            >
              <option value="">All planets</option>
              {PLANETS.map(p => <option key={p}>{p}</option>)}
            </select>
            <select
              value={filterSign}
              onChange={e => setFilterSign(e.target.value)}
              className="border border-[#E5E1D8] rounded-lg px-3 py-1.5 text-sm bg-white text-ink"
            >
              <option value="">All signs</option>
              {SIGNS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            {filteredPlacements.map((p, i) => (
              <Card
                key={i}
                label={`${p.planet} in ${p.sign}`}
                subtle={p.aphorism_en ? `"${p.aphorism_en.slice(0, 60)}…"` : undefined}
                body={[p.traditional_en, p.evolutionary_en, p.developmental_en].filter(Boolean).join('\n\n')}
              />
            ))}
            {filteredPlacements.length === 0 && (
              <p className="text-sm text-ink-muted py-4 text-center">No results for this filter.</p>
            )}
          </div>
        </div>
      )}

      {/* ── Planet in House ────────────────────────────────────────────────── */}
      {tab === 'houses' && (
        <div>
          <div className="flex gap-2 mb-4 flex-wrap">
            <select
              value={filterPlanet}
              onChange={e => setFilterPlanet(e.target.value)}
              className="border border-[#E5E1D8] rounded-lg px-3 py-1.5 text-sm bg-white text-ink"
            >
              <option value="">All planets</option>
              {PLANETS.map(p => <option key={p}>{p}</option>)}
            </select>
            <select
              value={filterHouse}
              onChange={e => setFilterHouse(e.target.value)}
              className="border border-[#E5E1D8] rounded-lg px-3 py-1.5 text-sm bg-white text-ink"
            >
              <option value="">All houses</option>
              {Array.from({length: 12}, (_, i) => String(i + 1)).map(h => (
                <option key={h} value={h}>House {h}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            {filteredHouses.map((p, i) => (
              <Card
                key={i}
                label={`${p.planet} in House ${p.house}`}
                subtle={p.aphorism_en ? `"${p.aphorism_en.slice(0, 60)}…"` : undefined}
                body={[p.traditional_en, p.evolutionary_en, p.developmental_en].filter(Boolean).join('\n\n')}
              />
            ))}
            {filteredHouses.length === 0 && (
              <p className="text-sm text-ink-muted py-4 text-center">No results for this filter.</p>
            )}
          </div>
        </div>
      )}

      {/* ── Aspects ─────────────────────────────────────────────────────────── */}
      {tab === 'aspects' && (
        <div>
          <input
            value={filterAspect}
            onChange={e => setFilterAspect(e.target.value)}
            placeholder="Filter aspects…"
            className="border border-[#E5E1D8] rounded-lg px-3 py-1.5 text-sm bg-white text-ink mb-4 w-full max-w-xs"
          />
          <p className="text-xs text-ink-muted mb-3">{filteredAspects.length} aspect interpretations</p>
          <div className="space-y-2">
            {filteredAspects.map((p, i) => (
              <Card
                key={i}
                label={`${p.planet} ${p.sign} ${p.house}`}
                subtle={p.aphorism_en ? `"${p.aphorism_en.slice(0, 60)}…"` : undefined}
                body={[p.traditional_en, p.evolutionary_en, p.developmental_en].filter(Boolean).join('\n\n')}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Spheres ─────────────────────────────────────────────────────────── */}
      {tab === 'spheres' && (
        <div className="space-y-2">
          {SPHERES.map((s, i) => (
            <div key={i} className="border border-[#E5E1D8] rounded-[14px] bg-white p-4">
              <div className="flex items-baseline justify-between gap-3 mb-2">
                <h3 className="font-medium text-ink">{s.sphere_name}</h3>
                <span className="text-xs text-gold">{s.metal}</span>
              </div>
              <p className="text-xs text-ink-muted italic mb-3">{s.sphere_epithet}</p>
              {s.hierarchy && (
                <p className="text-xs text-ink-muted mb-1">
                  <span className="font-medium">Hierarchy:</span> {s.hierarchy} · {s.hierarchy_sub}
                </p>
              )}
              {s.organ && (
                <p className="text-xs text-ink-muted mb-1">
                  <span className="font-medium">Organ:</span> {s.organ}
                </p>
              )}
              {s.body_member && (
                <p className="text-xs text-ink-muted mb-3">
                  <span className="font-medium">Body:</span> {s.body_member}
                </p>
              )}
              {s.sphere_narrative && (
                <p className="text-sm text-ink leading-relaxed mb-3">{s.sphere_narrative}</p>
              )}
              {s.luciferic && (
                <div className="border-t border-[#E5E1D8] pt-3 mt-2 space-y-2">
                  <div>
                    <p className="text-xs font-medium text-ink-muted uppercase tracking-wider mb-1">Luciferic pole</p>
                    <p className="text-xs text-ink-muted leading-relaxed">{s.luciferic}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-ink-muted uppercase tracking-wider mb-1">Ahrimanic pole</p>
                    <p className="text-xs text-ink-muted leading-relaxed">{s.ahrimanic}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── Fixed Stars ─────────────────────────────────────────────────────── */}
      {tab === 'stars' && (
        <div>
          {SIGNS.map(sign => {
            const stars = FIXED_STARS_BY_SIGN[sign] ?? [];
            if (!stars.length) return null;
            return (
              <div key={sign} className="mb-6">
                <h3 className="text-xs uppercase tracking-widest text-ink-muted font-ui mb-2 pb-1 border-b border-[#E5E1D8]">
                  {sign} — {stars[0]?.constellation_name}
                </h3>
                <div className="space-y-2">
                  {stars.map((s, i) => (
                    <Card
                      key={i}
                      label={s.star_name}
                      subtle={`${s.bayer_designation}${s.tropical_degree ? ` · ${s.tropical_degree}` : ''} · mag ${s.magnitude}`}
                      body={s.interpretation_en}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Ascendant in Sign ─────────────────────────────────────────────── */}
      {tab === 'asc' && (
        <div className="space-y-2">
          {ASC_IN_SIGN.map((p, i) => (
            <Card
              key={i}
              label={`Ascendant in ${p.sign}`}
              subtle={p.aphorism_en ? `"${p.aphorism_en.slice(0, 60)}…"` : undefined}
              body={[p.traditional_en, p.evolutionary_en, p.developmental_en].filter(Boolean).join('\n\n')}
            />
          ))}
        </div>
      )}

      {/* ── Chapter Sections ──────────────────────────────────────────────── */}
      {tab === 'chapters' && (
        <div className="space-y-2">
          {CHAPTER_SECTIONS.map((p, i) => (
            <Card
              key={i}
              label={p.sign || p.house || p.planet || `Section ${i + 1}`}
              body={p.traditional_en}
            />
          ))}
        </div>
      )}
    </div>
  );
}
