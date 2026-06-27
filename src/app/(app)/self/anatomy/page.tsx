'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { SPHERES } from '@/content/spheres';
import { DAY_PLANET_KEYS as DAY_PLANET } from '@/lib/planets';

const GLYPHS: Record<string, string> = {
  sun: '☉', moon: '☽', mercury: '☿', venus: '♀',
  mars: '♂', jupiter: '♃', saturn: '♄',
};

const METALS: Record<string, string> = {
  sun: 'Au', moon: 'Ag', mercury: 'Hg', venus: 'Cu',
  mars: 'Fe', jupiter: 'Sn', saturn: 'Pb',
};

const ORGAN_SHORT: Record<string, string> = {
  sun: 'Heart', moon: 'Brain', mercury: 'Lungs', venus: 'Kidney',
  mars: 'Gall', jupiter: 'Liver', saturn: 'Spleen',
};

const todayKey = DAY_PLANET[new Date().getDay()];

interface Hotspot {
  key: string;
  cx: number;
  cy: number;
  color: string;
  name: string;
}

const HOTSPOTS: Hotspot[] = [
  { key: 'moon',    cx: 100, cy: 70,  color: '#C2D3E2', name: 'Moon' },
  { key: 'mercury', cx: 100, cy: 120, color: '#C9D2BE', name: 'Mercury' },
  { key: 'sun',     cx: 100, cy: 150, color: '#FFC78A', name: 'Sun' },
  { key: 'mars',    cx: 130, cy: 180, color: '#E9785E', name: 'Mars' },
  { key: 'jupiter', cx: 100, cy: 195, color: '#9C8AB8', name: 'Jupiter' },
  { key: 'venus',   cx: 100, cy: 230, color: '#F8D6BE', name: 'Venus' },
  { key: 'saturn',  cx: 100, cy: 300, color: '#5A3E7A', name: 'Saturn' },
];

type TabKey = 'organs' | 'systems' | 'metals';

export default function AnatomyPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('organs');
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const active = activeHotspot ? HOTSPOTS.find((h) => h.key === activeHotspot) : null;
  const sphere = activeHotspot ? SPHERES[activeHotspot] : null;

  const hotspotLabel = (h: Hotspot) => {
    if (activeTab === 'organs') return GLYPHS[h.key];
    if (activeTab === 'systems') return ORGAN_SHORT[h.key];
    return METALS[h.key];
  };

  return (
    <div className="min-h-dvh pb-32" style={{ background: '#F5F2EA' }}>
      {/* Header */}
      <div className="px-5 pt-6 pb-2">
        <Link href="/self" className="text-xs text-ink-muted flex items-center gap-1 mb-4">
          <span>←</span><span>Self</span>
        </Link>
        <h1 className="font-serif text-[28px] text-ink -tracking-[0.5px]">Cosmic Anatomy</h1>
        <p className="text-sm text-ink-muted mt-1">The seven planetary organs</p>
      </div>

      {/* SVG silhouette */}
      <div className="mx-auto mt-6" style={{ maxWidth: 220 }}>
        <svg viewBox="0 0 200 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          {/* Head */}
          <circle cx="100" cy="50" r="30" stroke="#E5E1D8" strokeWidth="1" />
          {/* Neck */}
          <rect x="88" y="79" width="24" height="16" stroke="#E5E1D8" strokeWidth="1" />
          {/* Torso */}
          <rect x="62" y="95" width="76" height="120" rx="10" stroke="#E5E1D8" strokeWidth="1" />
          {/* Left arm */}
          <path d="M62 100 Q40 130 35 190" stroke="#E5E1D8" strokeWidth="1" strokeLinecap="round" />
          {/* Right arm */}
          <path d="M138 100 Q160 130 165 190" stroke="#E5E1D8" strokeWidth="1" strokeLinecap="round" />
          {/* Left forearm */}
          <path d="M35 190 Q30 230 38 260" stroke="#E5E1D8" strokeWidth="1" strokeLinecap="round" />
          {/* Right forearm */}
          <path d="M165 190 Q170 230 162 260" stroke="#E5E1D8" strokeWidth="1" strokeLinecap="round" />
          {/* Left leg */}
          <path d="M80 215 Q72 270 68 330" stroke="#E5E1D8" strokeWidth="1" strokeLinecap="round" />
          {/* Right leg */}
          <path d="M120 215 Q128 270 132 330" stroke="#E5E1D8" strokeWidth="1" strokeLinecap="round" />
          {/* Left lower leg */}
          <path d="M68 330 Q64 370 66 400" stroke="#E5E1D8" strokeWidth="1" strokeLinecap="round" />
          {/* Right lower leg */}
          <path d="M132 330 Q136 370 134 400" stroke="#E5E1D8" strokeWidth="1" strokeLinecap="round" />

          {/* Hotspot circles */}
          {HOTSPOTS.map((h) => (
            <g key={h.key} onClick={() => setActiveHotspot(h.key === activeHotspot ? null : h.key)} style={{ cursor: 'pointer' }}>
              <circle
                cx={h.cx} cy={h.cy} r={14}
                fill={h.color + '4D'}
                stroke={h.color}
                strokeWidth="1.5"
              />
              {h.key === todayKey && (
                <circle
                  cx={h.cx} cy={h.cy} r={17}
                  fill="none"
                  stroke={h.color}
                  strokeWidth="1"
                  strokeOpacity="0.5"
                  className="animate-pulse"
                />
              )}
              {h.key === activeHotspot && (
                <circle cx={h.cx} cy={h.cy} r={16} fill="none" stroke={h.color} strokeWidth="2" />
              )}
              {h.key === activeHotspot && (
                <circle
                  cx={h.cx} cy={h.cy} r={22}
                  fill="none"
                  stroke={h.color}
                  strokeWidth="1"
                  strokeOpacity="0.3"
                  style={{ animation: 'ping 1.5s ease-out infinite' }}
                />
              )}
              <text
                x={h.cx} y={h.cy}
                fontSize={activeTab === 'systems' ? 7 : 10}
                fill={h.color}
                textAnchor="middle"
                dominantBaseline="middle"
                style={{ userSelect: 'none', pointerEvents: 'none' }}
              >
                {hotspotLabel(h)}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Tab strip */}
      <div className="flex gap-2 px-5 mt-4 justify-center">
        {(['organs', 'systems', 'metals'] as TabKey[]).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className="px-4 py-2 rounded-full text-xs font-medium capitalize transition-colors"
            style={{
              background: activeTab === t ? '#171B3A' : '#fff',
              color: activeTab === t ? '#F5F2EA' : '#171B3A',
              border: activeTab === t ? 'none' : '1px solid #E5E1D8',
            }}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Tap hint */}
      {!activeHotspot && (
        <p className="text-center text-xs text-ink-muted mt-5 px-5">
          Tap a circle to explore its planetary organ
        </p>
      )}

      {/* Drawer panel */}
      <AnimatePresence>
        {active && sphere && (
          <motion.div
            key={activeHotspot}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white shadow-xl z-50"
            style={{ borderRadius: '24px 24px 0 0' }}
          >
            <div className="p-6 pb-10">
              {/* Close */}
              <button
                onClick={() => setActiveHotspot(null)}
                className="absolute top-4 right-5 text-ink-muted text-xl leading-none"
                aria-label="Close"
              >
                ×
              </button>

              {/* Planet header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-[22px] shrink-0"
                  style={{ background: active.color + '30', border: `1.5px solid ${active.color}` }}
                >
                  <span style={{ color: active.color }}>{GLYPHS[active.key]}</span>
                </div>
                <div>
                  <div className="font-serif text-xl text-ink">{active.name}</div>
                  <div className="text-xs text-ink-muted mt-0.5">{sphere.organ}</div>
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="rounded-[12px] p-3" style={{ background: active.color + '18' }}>
                  <div className="text-[10px] font-semibold tracking-wider text-ink-muted mb-1">METAL</div>
                  <div className="font-serif text-base text-ink">{sphere.metal}</div>
                  <div className="text-[11px] text-ink-muted font-mono mt-0.5">{METALS[active.key]}</div>
                </div>
                <div className="rounded-[12px] p-3" style={{ background: active.color + '18' }}>
                  <div className="text-[10px] font-semibold tracking-wider text-ink-muted mb-1">BODY MEMBER</div>
                  <div className="font-serif text-sm text-ink leading-snug">{sphere.bodyMember}</div>
                </div>
              </div>

              <Link
                href={`/spheres/${active.key}`}
                className="flex items-center justify-between px-4 py-3 rounded-[14px] text-sm font-medium"
                style={{ background: active.color + '25', color: '#171B3A' }}
              >
                <span>Explore {active.name} sphere</span>
                <span>→</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
