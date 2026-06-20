import { SPHERES } from '@/content/spheres';
import { notFound } from 'next/navigation';

const GLYPHS: Record<string, string> = {
  sun: '☉', moon: '☽', mercury: '☿', venus: '♀',
  mars: '♂', jupiter: '♃', saturn: '♄',
};

export default async function SpherePage({ params }: { params: Promise<{ planet: string }> }) {
  const { planet } = await params;
  const sphere = SPHERES[planet.toLowerCase()];
  if (!sphere) notFound();
  const glyph = GLYPHS[planet.toLowerCase()] ?? '○';

  return (
    <main className="min-h-dvh bg-cream pb-20">
      {/* Hero */}
      <div className="bg-midnight px-5 pt-12 pb-8">
        <p className="text-xs uppercase tracking-widest text-gold mb-4 font-ui">{sphere.epithet}</p>
        <div className="flex items-center gap-4">
          <span className="text-6xl text-white">{glyph}</span>
          <div>
            <h1 className="text-3xl font-prose text-white">{sphere.sphereName}</h1>
          </div>
        </div>
      </div>

      <div className="px-5 py-6 space-y-4">
        {/* Hierarchy */}
        <div className="bg-white rounded-[18px] p-5 border border-rule-soft">
          <p className="text-xs uppercase tracking-widest text-ink-muted mb-2 font-ui">Hierarchy</p>
          <p className="font-prose text-ink">{sphere.hierarchy}</p>
          {sphere.hierarchySub && <p className="text-sm text-ink-muted font-ui mt-1">{sphere.hierarchySub}</p>}
        </div>

        {/* Body Member */}
        <div className="bg-white rounded-[18px] p-5 border border-rule-soft">
          <p className="text-xs uppercase tracking-widest text-ink-muted mb-2 font-ui">Body Member</p>
          <p className="font-prose text-ink">{sphere.bodyMember}</p>
          {sphere.bodyMemberSub && <p className="text-sm text-ink-muted font-ui mt-1">{sphere.bodyMemberSub}</p>}
        </div>

        {/* Organ + Metal */}
        <div className="bg-white rounded-[18px] p-5 border border-rule-soft">
          <p className="text-xs uppercase tracking-widest text-ink-muted mb-2 font-ui">Organ · Metal</p>
          <p className="font-prose text-ink">{sphere.organ}</p>
          <p className="text-sm text-gold font-ui mt-1">{sphere.metal}</p>
        </div>

        {/* Luciferic / Ahrimanic */}
        <div className="bg-cream-soft rounded-[18px] p-5 border border-rule-soft space-y-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-coral mb-2 font-ui">Luciferic Pole</p>
            <p className="text-sm font-prose text-ink leading-relaxed">{sphere.luciferic}</p>
          </div>
          <div className="border-t border-rule-soft pt-4">
            <p className="text-xs uppercase tracking-widest text-lake mb-2 font-ui">Ahrimanic Pole</p>
            <p className="text-sm font-prose text-ink leading-relaxed">{sphere.ahrimanic}</p>
          </div>
        </div>

        {/* Narrative */}
        <div className="bg-white rounded-[18px] p-5 border border-rule-soft">
          <p className="text-xs uppercase tracking-widest text-ink-muted mb-3 font-ui">The Sphere</p>
          <p className="font-prose text-ink leading-relaxed">{sphere.narrative}</p>
        </div>
      </div>
    </main>
  );
}
