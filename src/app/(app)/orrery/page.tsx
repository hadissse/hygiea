'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { OrreryPanel } from '@/components/OrreryPanel';
import { PLANETS } from '@/components/three/OrreryScene';

// Lazy-load the Three.js scene — avoids SSR issues
const OrreryScene = dynamic(
  () => import('@/components/three/OrreryScene').then(m => ({ default: m.OrreryScene })),
  { ssr: false }
);

export default function OrreryPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedId(prev => prev === id ? null : id);
  };

  return (
    <div className="fixed inset-0 bg-[#0F1228] flex flex-col">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 pt-4 pb-2 pointer-events-none">
        <Link
          href="/spheres"
          className="pointer-events-auto flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
        >
          ← Spheres
        </Link>
        <div className="text-center">
          <h1 className="text-sm font-semibold text-white/80 tracking-widest uppercase">Cosmic Orrery</h1>
          <p className="text-xs text-white/30 mt-0.5">Tap a sphere to explore</p>
        </div>
        <div className="w-16" />
      </div>

      {/* Planet quick-select pills */}
      <div className="absolute top-16 left-0 right-0 z-10 flex justify-center gap-2 px-4 pointer-events-none">
        <div className="flex gap-1.5 bg-black/30 backdrop-blur-md rounded-full px-3 py-1.5 pointer-events-auto overflow-x-auto max-w-full">
          {PLANETS.map(p => (
            <button
              key={p.id}
              onClick={() => handleSelect(p.id)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition-all whitespace-nowrap"
              style={{
                background: selectedId === p.id ? p.color + '30' : 'transparent',
                color: selectedId === p.id ? p.color : p.color + '80',
                border: `1px solid ${selectedId === p.id ? p.color + '60' : 'transparent'}`,
              }}
            >
              <span>{p.glyph}</span>
              <span className="hidden sm:inline">{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Three.js canvas */}
      <div className="flex-1">
        <OrreryScene selectedId={selectedId} onSelect={handleSelect} />
      </div>

      {/* Info panel */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="relative w-full h-full pointer-events-none">
          <div className="pointer-events-auto">
            <OrreryPanel selectedId={selectedId} onClose={() => setSelectedId(null)} />
          </div>
        </div>
      </div>
    </div>
  );
}
