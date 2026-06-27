'use client'

import { useState } from 'react'
import Link from 'next/link'

type GeometryNode = {
  id: number
  x: number
  y: number
  name: string
  glyph: string
  meaning: string
}

const R = 60
const D1 = 2 * R
const D2 = 4 * R

function deg(d: number) {
  return (d * Math.PI) / 180
}

function cx(dist: number, angle: number) {
  return Math.round(dist * Math.cos(deg(angle)) * 10) / 10
}

function cy(dist: number, angle: number) {
  return Math.round(dist * Math.sin(deg(angle)) * 10) / 10
}

const nodes: GeometryNode[] = [
  {
    id: 0,
    x: 0,
    y: 0,
    name: 'The Source',
    glyph: '✦',
    meaning:
      'The still point from which all geometry unfolds. In Steiner\'s cosmology, the undifferentiated spiritual origin before the Word divides into multiplicity.',
  },
  {
    id: 1,
    x: cx(D1, 0),
    y: cy(D1, 0),
    name: 'Sun',
    glyph: '☉',
    meaning:
      'The Sun principle: the impulse of the I, of warmth and selfhood. In Steiner\'s vision, the solar logos is the vehicle of Christ consciousness descending into earthly time.',
  },
  {
    id: 2,
    x: cx(D1, 60),
    y: cy(D1, 60),
    name: 'Moon',
    glyph: '☽',
    meaning:
      'The Moon principle: memory, rhythm, and reflection. It governs the etheric body\'s tidal forces, linking past incarnations to present form through the waters of life.',
  },
  {
    id: 3,
    x: cx(D1, 120),
    y: cy(D1, 120),
    name: 'Mars',
    glyph: '♂',
    meaning:
      'The Mars principle: will, courage, and transformative fire. It carries the cosmic impulse that separates and individuates form from the undifferentiated cosmic ground.',
  },
  {
    id: 4,
    x: cx(D1, 180),
    y: cy(D1, 180),
    name: 'Mercury',
    glyph: '☿',
    meaning:
      'The Mercury principle: the mediating intelligence between spirit and matter. In Steiner\'s teaching, Mercury governs healing and the living bridge between worlds.',
  },
  {
    id: 5,
    x: cx(D1, 240),
    y: cy(D1, 240),
    name: 'Jupiter',
    glyph: '♃',
    meaning:
      'The Jupiter principle: wisdom, expansion, and the ordering of cosmic law. It expresses the benevolent shaping forces that bring coherence to multiplicity.',
  },
  {
    id: 6,
    x: cx(D1, 300),
    y: cy(D1, 300),
    name: 'Venus',
    glyph: '♀',
    meaning:
      'The Venus principle: love, beauty, and harmonic resonance. It is the formative power that draws multiplicity back toward unity through the eros of becoming.',
  },
  {
    id: 7,
    x: cx(D2, 30),
    y: cy(D2, 30),
    name: 'Aries',
    glyph: '♈',
    meaning:
      'The impulse of beginning: the head forces in the cosmic human, where spirit first strikes matter into wakefulness and the I incarnates anew.',
  },
  {
    id: 8,
    x: cx(D2, 90),
    y: cy(D2, 90),
    name: 'Cancer',
    glyph: '♋',
    meaning:
      'The gate of incarnation: the chest cavity and breath, where the soul descends into embodiment through the watery etheric body of feeling.',
  },
  {
    id: 9,
    x: cx(D2, 150),
    y: cy(D2, 150),
    name: 'Libra',
    glyph: '♎',
    meaning:
      'The scales of equilibrium: the kidneys and relational harmony, where the soul learns to balance cosmic and earthly necessity through conscious encounter.',
  },
  {
    id: 10,
    x: cx(D2, 210),
    y: cy(D2, 210),
    name: 'Capricorn',
    glyph: '♑',
    meaning:
      'The gate of the gods: the skeletal structure and earthly form, where spirit densifies to its furthest point before the return journey toward light.',
  },
  {
    id: 11,
    x: cx(D2, 270),
    y: cy(D2, 270),
    name: 'Scorpio',
    glyph: '♏',
    meaning:
      'The principle of transformation: the organs of generation and death, where the lower will is either consumed or transfigured into creative spirit fire.',
  },
  {
    id: 12,
    x: cx(D2, 330),
    y: cy(D2, 330),
    name: 'Aquarius',
    glyph: '♒',
    meaning:
      'The future human: the cosmic circulatory forces, where brotherly love becomes the new creative principle for an age beyond the isolation of ego.',
  },
]

const lines: [number, number][] = []
for (let i = 0; i < nodes.length; i++) {
  for (let j = i + 1; j < nodes.length; j++) {
    lines.push([i, j])
  }
}

export default function SacredGeometryPage() {
  const [selected, setSelected] = useState<number | null>(null)

  const selectedNode = selected !== null ? nodes[selected] : null

  function handleNodeClick(id: number) {
    setSelected((prev) => (prev === id ? null : id))
  }

  return (
    <div className="bg-[#0F1228] text-white flex flex-col">
      <style>{`
        @keyframes metatron-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

      <div className="px-6 pt-10 pb-4">
        <Link
          href="/self"
          className="text-[rgba(255,215,100,0.5)] text-sm font-sans hover:text-[rgba(255,215,100,0.9)] transition-colors"
        >
          ← Self
        </Link>
        <h1 className="mt-3 text-2xl font-serif text-amber-100 tracking-wide">Sacred Geometry</h1>
        <p className="mt-1 text-sm font-serif italic text-[rgba(255,215,100,0.45)]">
          Metatron&apos;s Cube — the pattern behind creation
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center px-4 pb-10">
        <div
          className="w-[320px] h-[320px] md:w-[480px] md:h-[480px] rounded-[24px] overflow-hidden flex items-center justify-center"
          style={{ border: '1px solid rgba(255,215,100,0.15)', background: '#0F1228' }}
        >
          <svg
            viewBox="-320 -320 640 640"
            className="w-full h-full"
            style={{
              transformOrigin: 'center center',
              animation: 'metatron-spin 1800s linear infinite',
            }}
          >
            {lines.map(([i, j]) => (
              <line
                key={`l-${i}-${j}`}
                x1={nodes[i].x}
                y1={nodes[i].y}
                x2={nodes[j].x}
                y2={nodes[j].y}
                stroke="rgba(255,215,100,0.15)"
                strokeWidth="0.6"
              />
            ))}

            {nodes.map((node) => {
              const isActive = selected === node.id
              return (
                <circle
                  key={node.id}
                  cx={node.x}
                  cy={node.y}
                  r={isActive ? R + 4 : R}
                  fill="none"
                  stroke={isActive ? 'rgba(255,215,100,0.8)' : 'rgba(255,215,100,0.4)'}
                  strokeWidth={isActive ? 1.5 : 0.8}
                  style={{ cursor: 'pointer', transition: 'all 0.25s ease' }}
                  onClick={() => handleNodeClick(node.id)}
                />
              )
            })}

            {nodes.map((node) => (
              <circle
                key={`hit-${node.id}`}
                cx={node.x}
                cy={node.y}
                r={R + 8}
                fill="transparent"
                style={{ cursor: 'pointer' }}
                onClick={() => handleNodeClick(node.id)}
              />
            ))}
          </svg>
        </div>

        <div className="mt-8 w-full max-w-[480px] min-h-[120px] px-2">
          {selectedNode ? (
            <div className="text-center">
              <div className="text-4xl mb-3 text-amber-200">{selectedNode.glyph}</div>
              <h2 className="text-xl font-serif text-amber-100 mb-3 tracking-wide">
                {selectedNode.name}
              </h2>
              <p className="text-sm font-serif text-[rgba(255,215,100,0.6)] leading-relaxed">
                {selectedNode.meaning}
              </p>
            </div>
          ) : (
            <p className="text-center text-sm font-serif italic text-[rgba(255,215,100,0.35)]">
              Touch a node to reveal its principle
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
