'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const SECTIONS = [
  { id: 'stars', label: 'The Starry Heights', glyph: '✦', color: '#E8D5A3', bg: '#08091A', desc: 'Before incarnation the soul rests in the warmth of the fixed stars, woven into the cosmic script of its coming life.' },
  { id: 'saturn', label: 'Saturn Threshold', glyph: '♄', color: '#5A3E7A', bg: '#0F0B18', desc: 'The soul passes through the Saturn sphere, receiving the seed of memory, the sense of time, and the capacity for reverence.' },
  { id: 'sun', label: 'Sun Sphere', glyph: '☉', color: '#FFC78A', bg: '#1A1208', desc: 'Bathed in the light of the Sun, the I-force is quickened — individuality takes its first breath in the warmth of cosmic love.' },
  { id: 'moon', label: 'Moon Crossing', glyph: '☽', color: '#C2D3E2', bg: '#0A0E14', desc: 'The Moon sphere weaves the life-body: rhythms, habits, and the inherited form of the physical body receive their living pattern.' },
  { id: 'venus', label: 'Venus & Mercury', glyph: '♀', color: '#F8D6BE', bg: '#14100C', desc: 'Through Venus and Mercury the soul takes on its temperament and its gifts of beauty, language, and the longing for connection.' },
  { id: 'birth', label: 'Birth', glyph: '◎', color: '#8FA084', bg: '#0C1410', desc: 'The soul crosses the threshold of birth, wrapped in its new body, carrying the stars within — a world compressed into a single life.' },
  { id: 'earth', label: 'Life on Earth', glyph: '♂', color: '#E9785E', bg: '#160C0A', desc: 'On Earth the soul works and loves, transforming karma into future seeds — each deed a stone laid in the cathedral of cosmic evolution.' },
];

export default function JourneyPage() {
  return (
    <>
      {/* Fixed vertical golden line */}
      <div
        style={{
          position: 'fixed',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '1px',
          background: 'rgba(255,199,138,0.1)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Fixed top-left back link */}
      <Link
        href="/self"
        style={{
          position: 'fixed',
          top: '16px',
          left: '20px',
          zIndex: 10,
        }}
        className="text-sm text-white/40 hover:text-white transition-colors"
      >
        ← Self
      </Link>

      {/* Fixed top-right title */}
      <div
        style={{
          position: 'fixed',
          top: '16px',
          right: '20px',
          zIndex: 10,
          fontSize: '11px',
          letterSpacing: '0.15em',
          color: 'rgba(255,255,255,0.3)',
          textTransform: 'uppercase',
        }}
      >
        River of Light
      </div>

      {/* Scroll container */}
      <div
        style={{
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          height: '100dvh',
        }}
      >
        {SECTIONS.map((section) => (
          <div
            key={section.id}
            style={{
              scrollSnapAlign: 'start',
              height: '100dvh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: section.bg,
              padding: '40px',
            }}
          >
            <div style={{ maxWidth: '380px', width: '100%', textAlign: 'center' }}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                {/* Glyph */}
                <div
                  style={{
                    fontSize: '64px',
                    color: section.color,
                    lineHeight: 1,
                  }}
                >
                  {section.glyph}
                </div>

                {/* Label */}
                <div
                  style={{
                    fontSize: '28px',
                    fontWeight: 600,
                    color: '#ffffff',
                    marginTop: '16px',
                  }}
                >
                  {section.label}
                </div>

                {/* Thin color bar */}
                <div
                  style={{
                    width: '40px',
                    height: '2px',
                    backgroundColor: section.color,
                    margin: '16px auto',
                  }}
                />

                {/* Description */}
                <div
                  style={{
                    fontSize: '15px',
                    color: 'rgba(255,255,255,0.6)',
                    lineHeight: 1.7,
                    textAlign: 'center',
                  }}
                >
                  {section.desc}
                </div>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
