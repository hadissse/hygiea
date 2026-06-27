'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const ZODIAC = [
  { sign:'Aries', glyph:'♈', color:'#E9785E', element:'Fire', quality:'Cardinal', keyword:'Initiative', desc:'Aries opens the zodiac as the force of self-beginning. In Steiner\'s vision it is the region where the cosmic Word first sounded, the origin of the I-impulse in humanity.' },
  { sign:'Taurus', glyph:'♉', color:'#8FA084', element:'Earth', quality:'Fixed', keyword:'Persistence', desc:'Taurus holds the forces of cosmic larynx and speech — the creative Word takes form here, and the soul learns to nourish what it has begun with patient devotion.' },
  { sign:'Gemini', glyph:'♊', color:'#C9D2BE', element:'Air', quality:'Mutable', keyword:'Duality', desc:'Gemini works through the arms and hands, the twin forces of giving and receiving. The soul discovers its capacity to bridge worlds through thinking and communication.' },
  { sign:'Cancer', glyph:'♋', color:'#C2D3E2', element:'Water', quality:'Cardinal', keyword:'Nurturing', desc:'Cancer governs the chest and the rhythmic system — the seat of the sentient soul. Here the soul learns to hold the world within itself with compassion and protective warmth.' },
  { sign:'Leo', glyph:'♌', color:'#FFC78A', element:'Fire', quality:'Fixed', keyword:'Radiance', desc:'Leo is the region of the heart — the sun in the microcosm. The soul discovers its own centre of warmth and learns to radiate I-being outward with sovereign creative force.' },
  { sign:'Virgo', glyph:'♍', color:'#8FA084', element:'Earth', quality:'Mutable', keyword:'Refinement', desc:'Virgo carries the forces of assimilation and the intestinal wisdom — the cosmic mother principle that discriminates, purifies, and prepares the substance of soul evolution.' },
  { sign:'Libra', glyph:'♎', color:'#F8D6BE', element:'Air', quality:'Cardinal', keyword:'Balance', desc:'Libra rules the kidneys and the sense of cosmic justice. The soul learns to weigh its karma with equanimity, discovering that balance is not stillness but a living act of will.' },
  { sign:'Scorpio', glyph:'♏', color:'#9C8AB8', element:'Water', quality:'Fixed', keyword:'Transformation', desc:'Scorpio governs the forces of regeneration and death in nature. It is the region of the deepest transformation — where the soul descends to renew itself at the source of life.' },
  { sign:'Sagittarius', glyph:'♐', color:'#E9785E', element:'Fire', quality:'Mutable', keyword:'Expansion', desc:'Sagittarius works through the thighs — the forces of movement toward the spiritual. The soul shoots its arrow of aspiration upward, carried by enthusiasm and philosophical fire.' },
  { sign:'Capricorn', glyph:'♑', color:'#5A3E7A', element:'Earth', quality:'Cardinal', keyword:'Mastery', desc:'Capricorn holds the forces of the knees — the gesture of bowing before cosmic law. The soul crystallises its highest achievement in the most structured and demanding conditions.' },
  { sign:'Aquarius', glyph:'♒', color:'#C2D3E2', element:'Air', quality:'Fixed', keyword:'Revelation', desc:'Aquarius works through the blood circulation and the social sense. The soul learns to pour its individual gifts into the stream of humanity with selfless community feeling.' },
  { sign:'Pisces', glyph:'♓', color:'#C9D2BE', element:'Water', quality:'Mutable', keyword:'Dissolution', desc:'Pisces closes the zodiac at the feet — the organ of earth-connection and surrender. The soul dissolves its individual form back into the cosmic ocean, ready for renewal.' },
];

export default function ConstellationsPage() {
  const [selected, setSelected] = useState<typeof ZODIAC[0] | null>(null);

  return (
    <div style={{ background: '#0F1228', minHeight: '100dvh', paddingBottom: '6rem' }}>
      {/* Header */}
      <div className="px-5 pt-12">
        <Link href="/self" className="text-white/40 text-sm">← Self</Link>
        <h1 className="font-serif text-white mt-3" style={{ fontSize: '28px' }}>Zodiac Constellations</h1>
        <p className="text-white/40 mt-1" style={{ fontSize: '13px' }}>The twelve spiritual archetypes</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 px-4 mt-8">
        {ZODIAC.map((z) => (
          <motion.div
            key={z.sign}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', damping: 14 }}
            onClick={() => setSelected(selected?.sign === z.sign ? null : z)}
            className="rounded-2xl p-4 cursor-pointer"
            style={{
              border: `1px solid ${z.color}30`,
              background: `${z.color}08`,
            }}
          >
            <div className="text-center" style={{ fontSize: '32px', color: z.color }}>{z.glyph}</div>
            <div className="text-white font-semibold text-center mt-2" style={{ fontSize: '14px' }}>{z.sign}</div>
            <div className="text-white/40 text-center" style={{ fontSize: '10px' }}>{z.element} · {z.quality}</div>
            <div className="text-center italic mt-1" style={{ fontSize: '10px', color: z.color }}>{z.keyword}</div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Panel */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key={selected.sign}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="fixed bottom-0 left-0 right-0 z-20 rounded-t-3xl p-6"
            style={{
              background: 'rgba(15,18,40,0.97)',
              borderTop: `1px solid ${selected.color}40`,
              maxHeight: '55vh',
              overflowY: 'auto',
            }}
          >
            <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ background: selected.color + '60' }} />
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl" style={{ color: selected.color }}>{selected.glyph}</span>
              <div>
                <h2 className="text-xl font-semibold text-white">{selected.sign}</h2>
                <p className="text-xs mt-0.5" style={{ color: selected.color + 'AA' }}>{selected.element} · {selected.quality} · {selected.keyword}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="ml-auto w-8 h-8 rounded-full flex items-center justify-center text-white/40"
                style={{ background: selected.color + '20' }}
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">{selected.desc}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
