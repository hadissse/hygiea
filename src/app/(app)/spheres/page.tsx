'use client';

import { useState } from 'react';
import { SPHERE_ORDER, SPHERES } from '@/content/spheres';

const SPHERE_META: Record<string, { glyph: string; color: string }> = {
  sun:     { glyph: '☉', color: '#FFC78A' },
  moon:    { glyph: '☽', color: '#C2D3E2' },
  mercury: { glyph: '☿', color: '#C9D2BE' },
  venus:   { glyph: '♀', color: '#F8D6BE' },
  mars:    { glyph: '♂', color: '#E9785E' },
  jupiter: { glyph: '♃', color: '#9C8AB8' },
  saturn:  { glyph: '♄', color: '#5A3E7A' },
};

function SphereDetail({ sphereKey }: { sphereKey: string }) {
  const sphere = SPHERES[sphereKey];
  const meta = SPHERE_META[sphereKey];
  if (!sphere || !meta) return null;

  const maskStyle = {
    WebkitMaskImage: `url('/svg/${sphereKey}.svg')`,
    maskImage: `url('/svg/${sphereKey}.svg')`,
    WebkitMaskSize: 'contain', maskSize: 'contain',
    WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center', maskPosition: 'center',
    background: meta.color,
  };

  return (
    <div className="p-6 xl:p-10 space-y-4">
      {/* Hero */}
      <div className="rounded-[20px] p-6 relative overflow-hidden" style={{ background: '#0F1228', minHeight: 140 }}>
        <div className="absolute inset-0 opacity-20 rounded-[20px]" style={{ background: `radial-gradient(ellipse at 80% 20%, ${meta.color}, transparent 60%)` }} />
        <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 400 180" preserveAspectRatio="xMidYMid meet">
          <circle cx="320" cy="90" r="60"  fill="none" stroke={meta.color} strokeWidth="0.8" />
          <circle cx="320" cy="90" r="100" fill="none" stroke={meta.color} strokeWidth="0.5" />
          <circle cx="320" cy="90" r="140" fill="none" stroke={meta.color} strokeWidth="0.3" />
        </svg>
        <div className="relative z-10 flex items-center gap-6">
          <div className="relative w-16 h-16 shrink-0">
            <div className="absolute inset-[-6px] rounded-full border opacity-30" style={{ borderColor: meta.color }} />
            <div className="absolute inset-[-12px] rounded-full border opacity-15" style={{ borderColor: meta.color }} />
            <div className="w-full h-full" style={maskStyle} />
          </div>
          <div>
            <p className="text-[10px] font-semibold tracking-widest mb-1" style={{ color: meta.color }}>THE SPHERE</p>
            <h2 className="font-serif text-3xl text-white leading-none">{sphere.planet}</h2>
            <p className="text-white/50 text-sm mt-2">{meta.glyph} · {sphere.epithet}</p>
          </div>
        </div>
      </div>

      {/* Hierarchy + Body Member | Organ/Metal */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="bg-white rounded-[18px] p-5 border border-rule-soft">
            <p className="text-[10px] font-semibold tracking-widest text-ink-muted mb-2">HIERARCHY</p>
            <p className="font-serif text-ink">{sphere.hierarchy}</p>
            {sphere.hierarchySub && <p className="text-xs text-ink-muted mt-1">{sphere.hierarchySub}</p>}
          </div>
          <div className="bg-white rounded-[18px] p-5 border border-rule-soft">
            <p className="text-[10px] font-semibold tracking-widest text-ink-muted mb-2">BODY MEMBER</p>
            <p className="font-serif text-ink">{sphere.bodyMember}</p>
            {sphere.bodyMemberSub && <p className="text-xs text-ink-muted mt-1">{sphere.bodyMemberSub}</p>}
          </div>
        </div>
        <div className="bg-white rounded-[18px] p-5 border border-rule-soft flex flex-col justify-center">
          <p className="text-[10px] font-semibold tracking-widest text-ink-muted mb-2">ORGAN · METAL</p>
          <p className="font-serif text-ink">{sphere.organ}</p>
          <p className="text-sm mt-1 font-medium" style={{ color: meta.color }}>{sphere.metal}</p>
        </div>
      </div>

      {/* Narrative */}
      <div className="bg-white rounded-[18px] p-5 border border-rule-soft">
        <p className="text-[10px] font-semibold tracking-widest text-ink-muted mb-3">THE SPHERE</p>
        <p className="font-serif text-ink leading-relaxed">{sphere.narrative}</p>
      </div>

      {/* Luciferic / Ahrimanic */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="rounded-[18px] p-5 border" style={{ background: '#FFF5F3', borderColor: '#E9785E60' }}>
          <p className="text-[10px] font-semibold tracking-widest mb-2" style={{ color: '#E9785E' }}>LUCIFERIC POLE</p>
          <p className="text-sm font-serif text-ink leading-relaxed">{sphere.luciferic}</p>
        </div>
        <div className="rounded-[18px] p-5 border" style={{ background: '#F3F5FF', borderColor: '#6B7FC460' }}>
          <p className="text-[10px] font-semibold tracking-widest mb-2" style={{ color: '#6B7FC4' }}>AHRIMANIC POLE</p>
          <p className="text-sm font-serif text-ink leading-relaxed">{sphere.ahrimanic}</p>
        </div>
      </div>

    </div>
  );
}

export default function SpheresPage() {
  const [selected, setSelected] = useState<string>(SPHERE_ORDER[0]);

  return (
    <div className="bg-cream flex flex-col md:flex-row md:h-[calc(100dvh-48px)]">

      {/* Left column — Sphere list */}
      <div className="md:w-1/2 md:border-r md:border-rule-soft md:overflow-y-auto flex-shrink-0">
        <div className="px-6 xl:px-10 pt-10 pb-4">
          <div>
            <h1 className="text-2xl font-prose font-medium text-ink">The Seven Spheres</h1>
          </div>
          <p className="text-sm text-ink-muted mt-1">Your planetary constitution</p>
        </div>

        <div className="px-6 xl:px-10 pb-10 flex flex-col gap-2">
          {SPHERE_ORDER.map((key) => {
            const sphere = SPHERES[key];
            const meta = SPHERE_META[key];
            if (!sphere || !meta) return null;
            const isSelected = selected === key;

            return (
              <button
                key={key}
                onClick={() => setSelected(key)}
                className={`w-full text-left flex items-center gap-4 rounded-[18px] p-5 border transition-all ${
                  isSelected
                    ? 'bg-white shadow-sm border-rule-soft'
                    : 'bg-white/60 border-rule-soft/60 hover:bg-white hover:shadow-sm'
                }`}
              >
                <div
                  className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center"
                  style={{
                    background: isSelected ? `${meta.color}22` : 'transparent',
                    border: `1.5px solid ${isSelected ? meta.color : '#E5E1D8'}`,
                  }}
                >
                  <span className="text-lg">{meta.glyph}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-prose text-ink font-medium">{sphere.sphereName}</p>
                  <p className="text-xs text-ink-muted mt-0.5 truncate">{sphere.epithet}</p>
                </div>
                {isSelected && (
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: meta.color }} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right column — Sphere detail */}
      <div className="md:w-1/2 md:overflow-y-auto">
        {selected ? (
          <SphereDetail sphereKey={selected} />
        ) : (
          <div className="flex items-center justify-center h-full text-sm text-ink-muted">
            Select a sphere to explore
          </div>
        )}
      </div>

    </div>
  );
}
