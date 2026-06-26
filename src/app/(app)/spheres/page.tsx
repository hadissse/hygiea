import Link from 'next/link';
import { SPHERE_ORDER, SPHERES } from '@/content/spheres';

const SPHERE_GLYPHS: Record<string, string> = {
  sun: '☉', moon: '☽', mercury: '☿', venus: '♀',
  mars: '♂', jupiter: '♃', saturn: '♄',
};

export default function SpheresPage() {
  return (
    <main className="min-h-dvh bg-cream pb-20">
      <div className="px-5 pt-12 pb-6">
        <div className="flex items-baseline justify-between">
          <h1 className="text-2xl font-prose font-medium text-ink">The Seven Spheres</h1>
          <Link href="/spheres/map" className="text-xs text-ink-muted font-ui hover:text-ink transition-colors">Map ↗</Link>
        </div>
        <p className="text-sm text-ink-muted font-ui mt-1">Your planetary constitution</p>
      </div>
      <div className="px-5 grid gap-3">
        {SPHERE_ORDER.map((key) => {
          const sphere = SPHERES[key];
          if (!sphere) return null;
          return (
            <Link
              key={key}
              href={`/spheres/${key}`}
              className="flex items-center gap-4 bg-white rounded-[18px] p-5 border border-rule-soft hover:shadow-md transition-shadow"
            >
              <span className="text-3xl w-10 text-center">{SPHERE_GLYPHS[key]}</span>
              <div className="flex-1 min-w-0">
                <p className="font-prose text-ink font-medium">{sphere.sphereName}</p>
                <p className="text-xs text-ink-muted font-ui mt-0.5 truncate">{sphere.epithet}</p>
              </div>
              <span className="text-ink-muted">›</span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
