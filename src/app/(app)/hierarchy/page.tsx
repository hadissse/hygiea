'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const HIERARCHIES = [
  { name: 'Seraphim', planet: 'Saturn', color: '#5A3E7A', glyph: '♄', role: 'Beings of Love — cosmic will and warmth', desc: 'The Seraphim stand closest to the divine ground, carrying the primordial impulse of love as cosmic fire. They weave the Saturn sphere into the foundations of time itself.' },
  { name: 'Cherubim', planet: 'Jupiter', color: '#9C8AB8', glyph: '♃', role: 'Beings of Harmony — world wisdom', desc: 'The Cherubim bear the wisdom of cosmic law, shaping the Jupiter forces that give all earthly form its inner measure and proportion.' },
  { name: 'Thrones', planet: 'Mars', color: '#E9785E', glyph: '♂', role: 'Beings of Will — cosmic warmth-giving', desc: 'The Thrones sacrifice their own substance to gift the cosmos with warmth-will. Through the Mars sphere, they instil the courage that makes initiation possible.' },
  { name: 'Dominions', planet: 'Sun', color: '#FFC78A', glyph: '☉', role: 'Lords of Form — spiritual light', desc: 'The Dominions work through the Sun as architects of the etheric life-body, weaving the golden forces that sustain growth, healing, and rhythmic renewal in all living things.' },
  { name: 'Virtues', planet: 'Venus', color: '#F8D6BE', glyph: '♀', role: 'Moving Forces — cosmic beauty', desc: 'The Virtues pour the creative beauty of Venus into the world of feeling. They are the source of aesthetic impulse and the inward longing for harmony in the soul.' },
  { name: 'Powers', planet: 'Mercury', color: '#C9D2BE', glyph: '☿', role: 'Revealers — wisdom in motion', desc: 'The Powers work through Mercury to carry cosmic intelligence into earthly thinking. They guard the records of karma and mediate the wisdom-forces that guide individual destiny.' },
  { name: 'Archangels', planet: 'Moon', color: '#C2D3E2', glyph: '☽', role: 'Guardians of peoples and epochs', desc: 'The Archangels steward the soul-life of nations and cultural epochs. Through the Moon they weave the group-karma of humanity across the rhythms of history.' },
  { name: 'Angels', planet: 'Earth-Moon', color: '#8FA084', glyph: '◎', role: 'Personal guardian beings', desc: 'Each Angel walks beside a single human soul, guarding the thread of individual karma across incarnations and gently guiding the conscience toward its spiritual task.' },
  { name: 'Human', planet: 'Earth', color: '#E8D5A3', glyph: '✦', role: 'Tenth hierarchy in the becoming', desc: 'Humanity is the youngest hierarchy, still in formation. Through freedom and love, the human being is called to become a creator — adding a new note to the cosmic chord.' },
];

export default function HierarchyPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="min-h-dvh px-5 pt-12 pb-20" style={{ background: '#0F1228' }}>
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/self"
          className="text-sm mb-4 inline-block"
          style={{ color: 'rgba(255,255,255,0.45)' }}
        >
          ← Self
        </Link>
        <h1 className="text-2xl font-semibold text-white mb-2">Celestial Hierarchies</h1>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
          The nine orders of spiritual beings and their planetary correspondences
        </p>
      </div>

      {/* Card list */}
      <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        {HIERARCHIES.map((h, i) => (
          <motion.div
            key={h.name}
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            onClick={() => setSelectedIndex(selectedIndex === i ? null : i)}
            className="cursor-pointer"
            style={{
              minHeight: '80px',
              borderBottom: `1px solid ${h.color}20`,
            }}
          >
            {/* Main row */}
            <div className="flex items-center justify-between py-4 gap-4">
              {/* Left side */}
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className="text-2xl shrink-0"
                  style={{ color: h.color, fontSize: '24px', lineHeight: 1 }}
                >
                  {h.glyph}
                </span>
                <div className="min-w-0">
                  <div
                    className="font-semibold leading-snug"
                    style={{ color: '#ffffff', fontSize: '18px' }}
                  >
                    {h.name}
                  </div>
                  <div
                    className="mt-0.5 truncate"
                    style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}
                  >
                    {h.role}
                  </div>
                </div>
              </div>

              {/* Right side — planet name */}
              <span
                className="shrink-0 font-medium tracking-wide"
                style={{ color: h.color, fontSize: '11px' }}
              >
                {h.planet}
              </span>
            </div>

            {/* Expandable description */}
            <AnimatePresence initial={false}>
              {selectedIndex === i && (
                <motion.div
                  key="desc"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <p
                    className="pb-4 leading-relaxed"
                    style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}
                  >
                    {h.desc}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
