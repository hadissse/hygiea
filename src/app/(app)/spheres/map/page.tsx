'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SPHERES } from '@/content/spheres';

const PLANET_ORDER = ['saturn', 'jupiter', 'mars', 'sun', 'venus', 'mercury', 'moon'] as const;
type PlanetKey = typeof PLANET_ORDER[number];

const COLORS: Record<PlanetKey, string> = {
  saturn:  '#5A3E7A',
  jupiter: '#9C8AB8',
  mars:    '#E9785E',
  sun:     '#FFC78A',
  venus:   '#F8D6BE',
  mercury: '#C9D2BE',
  moon:    '#C2D3E2',
};

const GLYPHS: Record<PlanetKey, string> = {
  saturn: '♄', jupiter: '♃', mars: '♂', sun: '☉',
  venus: '♀', mercury: '☿', moon: '☽',
};

function BackgroundRings() {
  return (
    <svg
      className="pointer-events-none fixed inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {[80, 180, 300, 430].map((r) => (
        <circle key={r} cx="50%" cy="50%" r={r} fill="none" stroke="white" strokeWidth="1" opacity="0.04" />
      ))}
    </svg>
  );
}

export default function SpheresMapPage() {
  const [activeKey, setActiveKey] = useState<PlanetKey | null>(null);

  return (
    <main
      className="min-h-dvh pb-20 relative overflow-x-hidden md:max-w-5xl md:mx-auto"
      style={{ backgroundColor: '#0F1228' }}
    >
      <BackgroundRings />

      {/* Header */}
      <div className="relative z-10 px-5 pt-10 pb-6">
        <Link
          href="/spheres"
          className="inline-flex items-center gap-1 text-sm mb-4"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          <span>←</span>
          <span>Spheres</span>
        </Link>
        <h1
          className="text-2xl font-bold tracking-tight"
          style={{ color: 'rgba(255,255,255,0.92)', fontFamily: 'DM Sans, sans-serif' }}
        >
          Sphere Hierarchy
        </h1>
        <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
          The seven cosmic realms · tap to explore
        </p>
      </div>

      {/* Oval stack — single column on mobile, wrapped row on md+ */}
      <div className="relative z-10 flex flex-col items-center md:flex-row md:flex-wrap md:justify-center md:gap-6 md:px-8">
        {PLANET_ORDER.map((key, idx) => {
          const sphere = SPHERES[key];
          if (!sphere) return null;
          const color = COLORS[key];
          const glyph = GLYPHS[key];
          const isActive = activeKey === key;

          return (
            <div
              key={key}
              onClick={() => setActiveKey(isActive ? null : key)}
              className="cursor-pointer transition-all duration-300 flex flex-col items-center justify-start overflow-hidden md:mt-0"
              style={{
                width: 140,
                minHeight: 160,
                height: isActive ? 'auto' : 160,
                borderRadius: '50%',
                border: `1px solid ${color}66`,
                backgroundColor: `${color}1A`,
                marginTop: idx === 0 ? 0 : -96,
                position: 'relative',
                zIndex: PLANET_ORDER.length - idx,
              }}
            >
              {/* Glyph + name always visible */}
              <div className="flex flex-col items-center pt-6 pb-2">
                <span className="text-2xl leading-none" style={{ color }}>{glyph}</span>
                <span
                  className="text-xs mt-1 tracking-widest uppercase"
                  style={{ color: `${color}CC`, letterSpacing: '0.12em' }}
                >
                  {sphere.planet}
                </span>
              </div>

              {/* Expanded content */}
              {isActive && (
                <div
                  className="px-4 pb-5 text-left w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    className="rounded-xl p-3 mt-1"
                    style={{ backgroundColor: `${color}22`, border: `1px solid ${color}33` }}
                  >
                    <p className="text-xs font-semibold mb-2" style={{ color }}>
                      {sphere.hierarchy}
                      {sphere.hierarchySub ? ` · ${sphere.hierarchySub}` : ''}
                    </p>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1 mb-2">
                      <div>
                        <span className="block" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Body</span>
                        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.75)' }}>{sphere.bodyMember}</span>
                      </div>
                      <div>
                        <span className="block" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Organ</span>
                        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.75)' }}>{sphere.organ}</span>
                      </div>
                      <div>
                        <span className="block mt-1" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Metal</span>
                        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.75)' }}>{sphere.metal}</span>
                      </div>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                      {sphere.narrative.slice(0, 100)}…
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
