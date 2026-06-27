'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { SPHERES } from '@/content/reportData/spheres';
import { PLANETS } from './three/OrreryScene';

interface Props {
  selectedId: string | null;
  onClose: () => void;
}

export function OrreryPanel({ selectedId, onClose }: Props) {
  const planet = selectedId ? PLANETS.find(p => p.id === selectedId) : null;
  const sphere = selectedId ? SPHERES.find(s => s.planet.toLowerCase() === selectedId) : null;

  return (
    <AnimatePresence>
      {planet && sphere && (
        <motion.div
          key={selectedId}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          style={{ background: 'rgba(15,18,40,0.96)', borderColor: planet.color + '40' }}
          className="absolute bottom-0 left-0 right-0 rounded-t-3xl border-t p-6 z-20 max-h-[60vh] overflow-y-auto backdrop-blur-md"
        >
          {/* Handle */}
          <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ background: planet.color + '60' }} />

          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl" style={{ color: planet.color }}>{planet.glyph}</span>
              <div>
                <h2 className="text-xl font-semibold text-white">{sphere.sphere_name}</h2>
                <p className="text-sm" style={{ color: planet.color + 'CC' }}>{sphere.sphere_epithet}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-colors"
              style={{ background: planet.color + '20' }}
            >
              ✕
            </button>
          </div>

          {/* Data grid */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              { label: 'Hierarchy', value: sphere.hierarchy, sub: sphere.hierarchy_sub },
              { label: 'Body member', value: sphere.body_member, sub: sphere.body_member_sub },
              { label: 'Organ', value: sphere.organ },
              { label: 'Metal', value: sphere.metal },
            ].map(({ label, value, sub }) => (
              <div
                key={label}
                className="rounded-xl p-3"
                style={{ background: planet.color + '10', borderColor: planet.color + '25', border: '1px solid' }}
              >
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: planet.color + '80' }}>{label}</p>
                <p className="text-sm text-white font-medium">{value}</p>
                {sub && <p className="text-xs text-white/40 mt-0.5">{sub}</p>}
              </div>
            ))}
          </div>

          {/* Narrative */}
          {sphere.sphere_narrative && (
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              {sphere.sphere_narrative.replace(/Steiner:\s*"[^"]*"\s*/g, '').trim()}
            </p>
          )}

          {/* Link */}
          <a
            href={`/spheres/${planet.id}`}
            className="flex items-center gap-2 text-sm font-medium"
            style={{ color: planet.color }}
          >
            Explore the {planet.name} sphere →
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
