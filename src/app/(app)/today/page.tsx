'use client';
import { useEffect, useState } from 'react';

const DAY_PLANETS: Record<number, { key: string; name: string; glyph: string; organ: string; metal: string }> = {
  0: { key: 'sun',     name: 'Sun',     glyph: '☉', organ: 'Heart · Blood',              metal: 'Gold' },
  1: { key: 'moon',    name: 'Moon',    glyph: '☽', organ: 'Brain · Reproductive',        metal: 'Silver' },
  2: { key: 'mars',    name: 'Mars',    glyph: '♂', organ: 'Gallbladder · Bile',          metal: 'Iron' },
  3: { key: 'mercury', name: 'Mercury', glyph: '☿', organ: 'Lungs · Respiratory',         metal: 'Quicksilver' },
  4: { key: 'jupiter', name: 'Jupiter', glyph: '♃', organ: 'Liver · Metabolic',           metal: 'Tin' },
  5: { key: 'venus',   name: 'Venus',   glyph: '♀', organ: 'Kidneys · Filtration',        metal: 'Copper' },
  6: { key: 'saturn',  name: 'Saturn',  glyph: '♄', organ: 'Spleen · Bones · Skin',      metal: 'Lead' },
};

export default function TodayPage() {
  const [planet, setPlanet] = useState<typeof DAY_PLANETS[0] | null>(null);
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const now = new Date();
    setPlanet(DAY_PLANETS[now.getDay()]);
    setDateStr(now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }));
  }, []);

  if (!planet) return <div className="min-h-dvh bg-cream" />;

  return (
    <main className="min-h-dvh bg-cream pb-20">
      {/* Date header */}
      <div className="px-5 pt-12 pb-4">
        <p className="text-ink-muted text-sm font-ui">{dateStr}</p>
        <h1 className="text-2xl font-prose font-medium text-ink mt-1">Today</h1>
      </div>

      {/* Sphere of the day card */}
      <section className="px-5 mb-4">
        <a href={`/spheres/${planet.key}`} className="block bg-midnight rounded-[18px] p-6 text-white">
          <p className="text-xs uppercase tracking-widest text-gold mb-3 font-ui">Sphere of the Day</p>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{planet.glyph}</span>
            <div>
              <h2 className="text-2xl font-prose">{planet.name}</h2>
              <p className="text-white/60 text-sm font-ui mt-0.5">Tap to enter the sphere →</p>
            </div>
          </div>
        </a>
      </section>

      {/* Organ focus card */}
      <section className="px-5 mb-4">
        <div className="bg-white rounded-[18px] p-5 border border-rule-soft">
          <p className="text-xs uppercase tracking-widest text-ink-muted mb-2 font-ui">Organ Focus</p>
          <p className="text-lg font-prose text-ink">{planet.organ}</p>
          <p className="text-sm text-ink-muted font-ui mt-1">Metal: {planet.metal}</p>
        </div>
      </section>

      {/* Daily practice stub */}
      <section className="px-5 mb-4">
        <div className="bg-cream-soft rounded-[18px] p-5 border border-rule-soft">
          <p className="text-xs uppercase tracking-widest text-ink-muted mb-2 font-ui">Daily Practice</p>
          <p className="text-base font-prose text-ink leading-relaxed">
            Bring your attention to the {planet.organ.split('·')[0].trim().toLowerCase()} area of your body.{' '}
            Notice warmth, rhythm, tension. Simply observe for one minute before the day begins.
          </p>
        </div>
      </section>

      {/* Evening reflection entry */}
      <section className="px-5">
        <a href="/reflect" className="flex items-center justify-between bg-white rounded-[18px] p-5 border border-rule-soft">
          <div>
            <p className="text-xs uppercase tracking-widest text-ink-muted mb-1 font-ui">Evening Reflection</p>
            <p className="text-sm font-prose text-ink">Open the reflection →</p>
          </div>
          <span className="text-ink-muted text-lg">◌</span>
        </a>
      </section>
    </main>
  );
}
