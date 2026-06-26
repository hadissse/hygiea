'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SPHERES } from '@/content/spheres';

type LayerKey = 'physical' | 'etheric' | 'astral' | 'ego';

const LAYERS: Array<{
  key: LayerKey;
  label: string;
  planet: string;
  planetName: string;
  glyph: string;
  color: string;
  rx: number;
  ry: number;
}> = [
  { key: 'physical', label: 'Physical body', planet: 'saturn',  planetName: 'Saturn',  glyph: '♄', color: '#5A3E7A', rx: 130, ry: 180 },
  { key: 'etheric',  label: 'Etheric body',  planet: 'mercury', planetName: 'Mercury', glyph: '☿', color: '#C9D2BE', rx: 95,  ry: 130 },
  { key: 'astral',   label: 'Astral body',   planet: 'moon',    planetName: 'Moon',    glyph: '☽', color: '#C2D3E2', rx: 60,  ry: 85  },
  { key: 'ego',      label: 'I — Ego',       planet: 'sun',     planetName: 'Sun',     glyph: '☉', color: '#FFC78A', rx: 28,  ry: 40  },
];

const DAY_PLANET = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn'];

const LABEL_Y: Record<LayerKey, number> = {
  physical: 202,
  etheric: 167,
  astral: 136,
  ego: 108,
};

function truncate(s: string, n: number): string {
  return s.length > n ? s.slice(0, n) + '...' : s;
}

export default function LayersPage() {
  const [activeLayer, setActiveLayer] = useState<LayerKey | null>(null);
  const todayPlanet = DAY_PLANET[new Date().getDay()];
  const active = LAYERS.find(l => l.key === activeLayer) ?? null;
  const sphere = active ? SPHERES[active.planet] : null;

  return (
    <div className="min-h-dvh relative overflow-hidden" style={{ background: '#0F1228' }}>
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(255,199,138,0.04) 0%, transparent 60%)' }}
      />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 px-5 pt-12">
        <Link href="/self" className="text-sm text-white/50 hover:text-white/80 transition-colors">
          ← Self
        </Link>
        <h1 className="font-serif text-3xl text-white mt-2 -tracking-[0.5px]">Layers of Being</h1>
        <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Your four-fold constitution
        </p>
      </div>

      {/* SVG diagram — centered */}
      <div className="flex items-center justify-center min-h-dvh">
        <svg
          viewBox="0 0 300 400"
          width={300}
          height={400}
          style={{ display: 'block', overflow: 'visible' }}
        >
          {/* Render outer → inner so inner rings appear on top */}
          {LAYERS.map(layer => {
            const isActive = activeLayer === layer.key;
            const isToday = layer.planet === todayPlanet;
            const ly = LABEL_Y[layer.key];
            return (
              <g
                key={layer.key}
                onClick={() => setActiveLayer(isActive ? null : layer.key)}
                style={{ cursor: 'pointer' }}
              >
                <ellipse
                  cx={150}
                  cy={200}
                  rx={layer.rx}
                  ry={layer.ry}
                  stroke={layer.color}
                  strokeWidth={isActive ? 2 : 1.2}
                  fill={layer.color}
                  fillOpacity={isActive ? 0.12 : 0.05}
                  className={isToday && !isActive ? 'animate-pulse' : undefined}
                />
                {/* Label staggered along right edge */}
                <text
                  x={150 + layer.rx - 4}
                  y={ly}
                  fontSize={10}
                  fill={layer.color}
                  textAnchor="end"
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {layer.label}
                </text>
                <text
                  x={150 + layer.rx - 4}
                  y={ly + 13}
                  fontSize={9}
                  fill={layer.color}
                  fillOpacity={0.65}
                  textAnchor="end"
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {layer.planetName}
                </text>
              </g>
            );
          })}

          {/* Center glyph */}
          <text
            x={150}
            y={205}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={14}
            fill="white"
            style={{ pointerEvents: 'none', userSelect: 'none' }}
          >
            ✦
          </text>
        </svg>
      </div>

      {/* Slide-up detail panel */}
      {active && sphere && (
        <div
          className="fixed bottom-0 left-0 right-0 z-20 bg-white rounded-t-[24px] p-6 overflow-y-auto"
          style={{ maxHeight: '60vh' }}
        >
          {/* Header row */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="font-serif text-2xl text-ink">{active.label}</h2>
              <p className="text-sm text-ink-muted mt-0.5">
                {active.planetName} {active.glyph}
              </p>
            </div>
            <button
              onClick={() => setActiveLayer(null)}
              className="text-ink-muted text-2xl leading-none p-1 -mt-1 -mr-1"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* Body member */}
          <p className="text-sm text-ink mb-4 leading-relaxed">{sphere.bodyMember}</p>

          {/* Luciferic pole */}
          <div className="rounded-[12px] p-3 mb-2" style={{ background: `${active.color}22` }}>
            <div className="text-[10px] font-semibold tracking-wider text-ink-muted mb-1">LUCIFERIC POLE</div>
            <p className="text-xs text-ink leading-relaxed">{truncate(sphere.luciferic, 80)}</p>
          </div>

          {/* Ahrimanic pole */}
          <div className="rounded-[12px] p-3 mb-4" style={{ background: `${active.color}22` }}>
            <div className="text-[10px] font-semibold tracking-wider text-ink-muted mb-1">AHRIMANIC POLE</div>
            <p className="text-xs text-ink leading-relaxed">{truncate(sphere.ahrimanic, 80)}</p>
          </div>

          <Link
            href={`/spheres/${active.planet}`}
            className="text-sm font-medium text-coral"
          >
            Explore sphere →
          </Link>
        </div>
      )}
    </div>
  );
}
