'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SPHERES } from '@/content/spheres';
import { DAY_PLANETS } from '@/lib/planets';

const DAY_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export default function TodayPage() {
  const [planet, setPlanet] = useState<typeof DAY_PLANETS[0] | null>(null);
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const now = new Date();
    setPlanet(DAY_PLANETS[now.getDay()]);
    setDateStr(`${DAY_NAMES[now.getDay()]}, ${now.getDate()} ${MONTH_NAMES[now.getMonth()]} ${now.getFullYear()}`);
  }, []);

  if (!planet) return <div className="min-h-dvh bg-cream" />;

  const sphere = SPHERES[planet.key];
  const maskStyle = {
    WebkitMaskImage: `url('/svg/${planet.key}.svg')`,
    maskImage: `url('/svg/${planet.key}.svg')`,
    WebkitMaskSize: 'contain', maskSize: 'contain',
    WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center', maskPosition: 'center',
    background: planet.color,
  };

  return (
    <main className="relative overflow-hidden min-h-dvh bg-cream pb-24 md:pb-12">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3 opacity-[0.03]" style={{ background: planet.color }} />

      {/* Section 1 — Date header */}
      <div className="px-5 md:px-8 xl:px-12 pt-10 md:pt-12 pb-5">
        <p className="text-xs text-ink-muted font-medium tracking-wide">{dateStr}</p>
        <h1 className="font-serif text-[28px] md:text-[34px] text-ink mt-1 -tracking-[0.5px]">Today</h1>
      </div>

      {/* Section 2 — Sphere Hero + Section 3 — Day Content */}
      <div className="px-5 md:px-8 xl:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

          {/* Sphere Hero */}
          <div className="xl:col-span-2">
            <div className="rounded-[20px] p-6 md:p-8 relative overflow-hidden h-full" style={{ background: '#0F1228', minHeight: 160 }}>
              <div className="absolute inset-0 opacity-20 rounded-[20px]" style={{ background: `radial-gradient(ellipse at 80% 20%, ${planet.color}, transparent 60%)` }} />
              <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet" style={{ color: planet.color }}>
                <circle cx="320" cy="100" r="60"  fill="none" stroke="currentColor" strokeWidth="0.8" />
                <circle cx="320" cy="100" r="100" fill="none" stroke="currentColor" strokeWidth="0.6" />
                <circle cx="320" cy="100" r="140" fill="none" stroke="currentColor" strokeWidth="0.4" />
                <circle cx="320" cy="100" r="180" fill="none" stroke="currentColor" strokeWidth="0.3" />
              </svg>
              <div className="relative z-10 flex flex-col h-full">
                <p className="text-[11px] font-semibold tracking-widest mb-5" style={{ color: planet.color }}>SPHERE OF THE DAY</p>
                <div className="flex items-center gap-6">
                  <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                    <div className="absolute inset-[-6px] rounded-full border opacity-30" style={{ borderColor: planet.color }} />
                    <div className="absolute inset-[-12px] rounded-full border opacity-15" style={{ borderColor: planet.color }} />
                    <div className="w-full h-full" style={maskStyle} />
                  </div>
                  <div>
                    <h2 className="font-serif text-3xl md:text-4xl text-white leading-none">{planet.name}</h2>
                    <p className="text-white/50 text-sm mt-2">{planet.glyph} · {sphere?.epithet ?? 'Sphere of the day'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Focal organ */}
          <div className="bg-white rounded-[18px] p-5 md:p-6 border border-rule-soft relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full pointer-events-none" style={{ border: `1.5px solid ${planet.color}`, opacity: 0.18 }} />
            <div className="absolute -top-14 -right-14 w-36 h-36 rounded-full pointer-events-none" style={{ border: `1px solid ${planet.color}`, opacity: 0.10 }} />
            <p className="text-[10px] font-semibold tracking-widest text-ink-muted mb-3">FOCAL ORGAN</p>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center" style={{ background: `${planet.color}22`, border: `1.5px solid ${planet.color}60` }}>
                <div className="w-5 h-5" style={maskStyle} />
              </div>
              <div>
                <p className="font-serif text-lg text-ink leading-snug">{planet.organ}</p>
                <p className="text-xs text-ink-muted mt-0.5">Metal: {planet.metal}</p>
              </div>
            </div>
          </div>

          {/* Daily practice */}
          <div className="bg-cream-soft rounded-[18px] p-5 md:p-6 border border-rule-soft md:col-span-2 xl:col-span-2 relative overflow-hidden">
            <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-20 h-20 rounded-full pointer-events-none" style={{ border: `2px solid ${planet.color}`, opacity: 0.15 }} />
            <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-32 h-32 rounded-full pointer-events-none" style={{ border: `1.5px solid ${planet.color}`, opacity: 0.08 }} />
            <p className="text-[10px] font-semibold tracking-widest text-ink-muted mb-3">DAILY PRACTICE</p>
            <p className="font-serif text-base md:text-lg text-ink leading-[1.8]">
              Bring your attention to the region of your {planet.organ.split('&')[0].trim().toLowerCase()} in your body.
              Notice warmth, rhythm, tension. Simply observe for one minute before your day begins.
            </p>
          </div>

        </div>
      </div>

      {/* Section 4 — Sphere Deep Dive */}
      {sphere && (
        <div className="px-5 md:px-8 xl:px-12 mt-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-rule-soft" />
            <span className="text-ink-muted text-sm font-medium">— {planet.glyph} {planet.name} —</span>
            <div className="flex-1 h-px bg-rule-soft" />
          </div>

          <div className="space-y-4">
            {/* Two-col: hierarchy + body member | organ + metal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <p className="text-sm mt-1" style={{ color: planet.color }}>{sphere.metal}</p>
              </div>
            </div>

            {/* Narrative */}
            <div className="bg-white rounded-[18px] p-5 border border-rule-soft">
              <p className="text-[10px] font-semibold tracking-widest text-ink-muted mb-3">THE SPHERE</p>
              <p className="font-serif text-ink leading-relaxed">{sphere.narrative}</p>
            </div>

            {/* Luciferic / Ahrimanic poles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
      )}

      {/* Section 5 — Links row */}
      <div className="px-5 md:px-8 xl:px-12 mt-6 flex flex-col sm:flex-row gap-3">
        <Link href="/reflect" className="flex-1 flex items-center justify-between bg-white rounded-[18px] p-5 border border-rule-soft">
          <div>
            <p className="text-[10px] font-semibold tracking-widest text-ink-muted mb-1">EVENING REFLECTION</p>
            <p className="font-serif text-base text-ink">Open reflection →</p>
          </div>
          <span className="text-ink-muted text-xl">◌</span>
        </Link>
        <Link href="/spheres" className="flex-1 flex items-center justify-between bg-white rounded-[18px] p-5 border border-rule-soft">
          <div>
            <p className="text-[10px] font-semibold tracking-widest text-ink-muted mb-1">ALL SPHERES</p>
            <p className="font-serif text-base text-ink">Explore all spheres →</p>
          </div>
          <span className="text-ink-muted text-xl">○</span>
        </Link>
      </div>
    </main>
  );
}
