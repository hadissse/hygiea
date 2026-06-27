'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Scale {
  id: string;
  label: string;
  title: string;
  description: string;
}

const SCALES: Scale[] = [
  {
    id: 'universe',
    label: 'Universe',
    title: 'The Cosmos',
    description:
      'Before form and number, the primordial will weaves galaxies from darkness, each spiral a thought of the World Spirit.',
  },
  {
    id: 'solar',
    label: 'Solar System',
    title: 'Planetary Sphere',
    description:
      'Seven sacred wanderers inscribe the rhythms of time — each sphere a tone in the music of the spheres.',
  },
  {
    id: 'earth',
    label: 'Earth',
    title: 'The Living World',
    description:
      'A living being clothed in water and stone, the Earth is the body through which cosmic forces flow into matter.',
  },
  {
    id: 'human',
    label: 'Human',
    title: 'The Individual',
    description:
      'The human form is a microcosm: in golden proportion the universe repeats itself in miniature.',
  },
  {
    id: 'heart',
    label: 'Heart',
    title: 'The Seat of I',
    description:
      'At the centre of the centre burns the I — the eternal fire that individuates and reunites with the All.',
  },
];

// ─── SVG Art ──────────────────────────────────────────────────────────────────

function UniverseSVG() {
  const stars = [
    [42, 28], [180, 15], [310, 55], [380, 22], [60, 110],
    [240, 85], [350, 130], [18, 200], [140, 175], [285, 195],
    [390, 180], [75, 270], [200, 255], [340, 280], [420, 240],
    [110, 340], [260, 360], [395, 345], [30, 370], [450, 90],
  ] as [number, number][];

  return (
    <svg viewBox="0 0 480 400" className="w-full h-full">
      {/* Deep space gradient */}
      <defs>
        <radialGradient id="cosmos-bg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#1a1240" />
          <stop offset="60%" stopColor="#0a0820" />
          <stop offset="100%" stopColor="#020108" />
        </radialGradient>
        <radialGradient id="gal1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8060d0" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#8060d0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="gal2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6090c0" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#6090c0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="gal3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c080a0" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#c080a0" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="480" height="400" fill="url(#cosmos-bg)" rx="16" />

      {/* Spiral galaxy 1 — centre */}
      <ellipse cx="240" cy="200" rx="85" ry="32" fill="url(#gal1)" transform="rotate(-20 240 200)" />
      <ellipse cx="240" cy="200" rx="55" ry="18" fill="none" stroke="#9070e0" strokeWidth="0.6" opacity="0.4" transform="rotate(-20 240 200)" />
      <ellipse cx="240" cy="200" rx="28" ry="9" fill="none" stroke="#b090f0" strokeWidth="0.8" opacity="0.5" transform="rotate(-20 240 200)" />
      <circle cx="240" cy="200" r="4" fill="#e0d8ff" opacity="0.9" />

      {/* Spiral galaxy 2 — upper right */}
      <ellipse cx="370" cy="80" rx="42" ry="15" fill="url(#gal2)" transform="rotate(35 370 80)" />
      <ellipse cx="370" cy="80" rx="24" ry="8" fill="none" stroke="#80a0d0" strokeWidth="0.5" opacity="0.4" transform="rotate(35 370 80)" />
      <circle cx="370" cy="80" r="2.5" fill="#c0d8f8" opacity="0.9" />

      {/* Spiral galaxy 3 — lower left */}
      <ellipse cx="90" cy="320" rx="36" ry="13" fill="url(#gal3)" transform="rotate(-10 90 320)" />
      <ellipse cx="90" cy="320" rx="20" ry="7" fill="none" stroke="#d090b0" strokeWidth="0.5" opacity="0.35" transform="rotate(-10 90 320)" />
      <circle cx="90" cy="320" r="2" fill="#f0c0d8" opacity="0.9" />

      {/* Stars */}
      {stars.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i % 4 === 0 ? 1.5 : 0.8}
          fill="white"
          opacity={0.4 + (i % 5) * 0.12}
        />
      ))}

      {/* Nebula wisps */}
      <ellipse cx="130" cy="150" rx="60" ry="20" fill="#6040a0" opacity="0.07" transform="rotate(15 130 150)" />
      <ellipse cx="340" cy="290" rx="50" ry="15" fill="#4060b0" opacity="0.07" transform="rotate(-25 340 290)" />
    </svg>
  );
}

function SolarSystemSVG() {
  // Planet colors matching the app palette
  const planets = [
    { r: 60,  color: '#C2D3E2', name: 'Moon',    size: 5 },
    { r: 90,  color: '#BDAA82', name: 'Mercury',  size: 4 },
    { r: 118, color: '#E9785E', name: 'Venus',    size: 5.5 },
    { r: 148, color: '#8B9DC0', name: 'Mars',     size: 4.5 },
    { r: 174, color: '#C0392B', name: 'Sun',      size: 5 },
    { r: 196, color: '#5C7A5C', name: 'Jupiter',  size: 7 },
    { r: 218, color: '#5C5C7A', name: 'Saturn',   size: 6 },
  ];

  // Fixed positions for each planet on its orbit (spread them out)
  const angles = [20, 75, 155, 230, 295, 340, 110];

  return (
    <svg viewBox="0 0 480 400" className="w-full h-full">
      <defs>
        <radialGradient id="solar-bg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#141030" />
          <stop offset="100%" stopColor="#050310" />
        </radialGradient>
        <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFC78A" stopOpacity="0.7" />
          <stop offset="40%" stopColor="#FF9940" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FF9940" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="480" height="400" fill="url(#solar-bg)" rx="16" />

      {/* Orbit rings */}
      {planets.map((p, i) => (
        <ellipse
          key={i}
          cx="240"
          cy="200"
          rx={p.r}
          ry={p.r * 0.38}
          fill="none"
          stroke="white"
          strokeWidth="0.5"
          opacity="0.18"
        />
      ))}

      {/* Sun glow */}
      <circle cx="240" cy="200" r="36" fill="url(#sun-glow)" />
      {/* Sun */}
      <circle cx="240" cy="200" r="14" fill="#FFC78A" />
      <circle cx="240" cy="200" r="11" fill="#FFD9A0" />
      <circle cx="240" cy="200" r="7" fill="#FFF0D0" />

      {/* Planets on orbits */}
      {planets.map((p, i) => {
        const angleRad = (angles[i] * Math.PI) / 180;
        const x = 240 + p.r * Math.cos(angleRad);
        const y = 200 + p.r * 0.38 * Math.sin(angleRad);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={p.size + 2} fill={p.color} opacity="0.2" />
            <circle cx={x} cy={y} r={p.size} fill={p.color} />
          </g>
        );
      })}

      {/* Saturn ring */}
      {(() => {
        const ai = 6;
        const angleRad = (angles[ai] * Math.PI) / 180;
        const x = 240 + planets[ai].r * Math.cos(angleRad);
        const y = 200 + planets[ai].r * 0.38 * Math.sin(angleRad);
        return (
          <ellipse
            cx={x}
            cy={y}
            rx={10}
            ry={3.5}
            fill="none"
            stroke="#8080a8"
            strokeWidth="1.5"
            opacity="0.7"
          />
        );
      })()}

      {/* Planet labels */}
      {planets.map((p, i) => {
        const angleRad = (angles[i] * Math.PI) / 180;
        const x = 240 + p.r * Math.cos(angleRad);
        const y = 200 + p.r * 0.38 * Math.sin(angleRad);
        return (
          <text
            key={i}
            x={x}
            y={y - p.size - 4}
            textAnchor="middle"
            fill="white"
            fontSize="7"
            opacity="0.5"
            fontFamily="serif"
          >
            {p.name}
          </text>
        );
      })}
    </svg>
  );
}

function EarthSVG() {
  return (
    <svg viewBox="0 0 480 400" className="w-full h-full">
      <defs>
        <radialGradient id="earth-bg" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#0a1828" />
          <stop offset="100%" stopColor="#020508" />
        </radialGradient>
        <radialGradient id="earth-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4080c0" stopOpacity="0" />
          <stop offset="70%" stopColor="#4080c0" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#4080c0" stopOpacity="0.4" />
        </radialGradient>
        <radialGradient id="earth-sphere" cx="38%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#6aaee8" />
          <stop offset="40%" stopColor="#2a6098" />
          <stop offset="100%" stopColor="#0a2848" />
        </radialGradient>
        <clipPath id="earth-clip">
          <circle cx="240" cy="200" r="145" />
        </clipPath>
      </defs>

      <rect width="480" height="400" fill="url(#earth-bg)" rx="16" />

      {/* Atmosphere glow */}
      <circle cx="240" cy="200" r="160" fill="url(#earth-glow)" opacity="0.8" />

      {/* Globe */}
      <circle cx="240" cy="200" r="145" fill="url(#earth-sphere)" />

      {/* Continents — simplified shapes clipped to globe */}
      <g clipPath="url(#earth-clip)" opacity="0.85">
        {/* Africa */}
        <path
          d="M230 140 Q248 135 258 148 Q272 165 270 195 Q268 220 255 240 Q245 258 230 262 Q215 265 208 248 Q200 228 202 205 Q204 178 215 158 Z"
          fill="#3a7a3a"
        />
        {/* Europe */}
        <path
          d="M195 118 Q210 110 225 112 Q238 115 240 125 Q240 135 228 140 Q212 142 200 136 Q190 128 195 118 Z"
          fill="#4a8a4a"
        />
        {/* Asia (Eurasia east) */}
        <path
          d="M255 110 Q295 100 335 108 Q365 118 378 140 Q385 158 370 168 Q350 175 320 170 Q290 162 268 148 Q252 135 255 110 Z"
          fill="#3d7a3d"
        />
        {/* Americas hint */}
        <path
          d="M95 138 Q108 130 118 138 Q125 148 122 168 Q118 188 108 200 Q98 210 90 202 Q82 190 84 170 Q86 152 95 138 Z"
          fill="#3d7a3d"
        />
        {/* Antarctica */}
        <path
          d="M160 330 Q200 320 240 322 Q280 322 310 332 Q290 350 240 355 Q190 355 160 330 Z"
          fill="#d8e8f0"
          opacity="0.7"
        />
        {/* Cloud streaks */}
        <ellipse cx="180" cy="175" rx="30" ry="8" fill="white" opacity="0.2" transform="rotate(-15 180 175)" />
        <ellipse cx="300" cy="230" rx="38" ry="7" fill="white" opacity="0.18" transform="rotate(10 300 230)" />
        <ellipse cx="240" cy="300" rx="55" ry="9" fill="white" opacity="0.15" transform="rotate(-5 240 300)" />
      </g>

      {/* Atmosphere rim */}
      <circle cx="240" cy="200" r="145" fill="none" stroke="#6ab0f0" strokeWidth="2" opacity="0.3" />
      <circle cx="240" cy="200" r="152" fill="none" stroke="#4090d8" strokeWidth="1" opacity="0.15" />
    </svg>
  );
}

function HumanSVG() {
  return (
    <svg viewBox="0 0 480 400" className="w-full h-full">
      <defs>
        <radialGradient id="human-bg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#1a1530" />
          <stop offset="100%" stopColor="#080510" />
        </radialGradient>
        <radialGradient id="human-glow" cx="50%" cy="42%" r="45%">
          <stop offset="0%" stopColor="#d4b86a" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#d4b86a" stopOpacity="0" />
        </radialGradient>
        {/* Golden ratio spiral guide — subtle */}
        <radialGradient id="phi-ring" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d4b86a" stopOpacity="0" />
          <stop offset="80%" stopColor="#d4b86a" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#d4b86a" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="480" height="400" fill="url(#human-bg)" rx="16" />
      <rect width="480" height="400" fill="url(#human-glow)" rx="16" />

      {/* Golden ratio circle — Da Vinci reference */}
      <circle cx="240" cy="195" r="155" fill="none" stroke="#d4b86a" strokeWidth="0.5" opacity="0.12" />
      <circle cx="240" cy="195" r="96" fill="none" stroke="#d4b86a" strokeWidth="0.5" opacity="0.1" strokeDasharray="4 6" />

      {/* Vitruvian cross guides */}
      <line x1="240" y1="50" x2="240" y2="370" stroke="#d4b86a" strokeWidth="0.4" opacity="0.1" />
      <line x1="88" y1="210" x2="392" y2="210" stroke="#d4b86a" strokeWidth="0.4" opacity="0.1" />

      {/* Human figure — cream/golden tone */}
      {/* Head */}
      <circle cx="240" cy="100" r="28" fill="none" stroke="#e8d8a8" strokeWidth="1.5" opacity="0.9" />
      <circle cx="240" cy="100" r="28" fill="#d4b86a" opacity="0.08" />

      {/* Neck */}
      <line x1="240" y1="128" x2="240" y2="145" stroke="#e8d8a8" strokeWidth="1.8" opacity="0.7" />

      {/* Shoulders */}
      <line x1="176" y1="158" x2="304" y2="158" stroke="#e8d8a8" strokeWidth="1.5" opacity="0.8" />

      {/* Torso */}
      <line x1="240" y1="145" x2="240" y2="252" stroke="#e8d8a8" strokeWidth="1.8" opacity="0.8" />
      {/* Torso outline */}
      <path
        d="M196 158 Q188 180 190 210 Q192 232 205 248 L240 252 L275 248 Q288 232 290 210 Q292 180 284 158 Z"
        fill="#e8d8a8"
        opacity="0.07"
        stroke="#e8d8a8"
        strokeWidth="0.8"
      />

      {/* Arms */}
      <line x1="176" y1="158" x2="140" y2="225" stroke="#e8d8a8" strokeWidth="1.5" opacity="0.75" />
      <line x1="304" y1="158" x2="340" y2="225" stroke="#e8d8a8" strokeWidth="1.5" opacity="0.75" />
      {/* Forearms angled */}
      <line x1="140" y1="225" x2="118" y2="285" stroke="#e8d8a8" strokeWidth="1.2" opacity="0.6" />
      <line x1="340" y1="225" x2="362" y2="285" stroke="#e8d8a8" strokeWidth="1.2" opacity="0.6" />

      {/* Hips */}
      <line x1="205" y1="252" x2="275" y2="252" stroke="#e8d8a8" strokeWidth="1.5" opacity="0.75" />

      {/* Legs */}
      <line x1="215" y1="252" x2="200" y2="340" stroke="#e8d8a8" strokeWidth="1.5" opacity="0.75" />
      <line x1="265" y1="252" x2="280" y2="340" stroke="#e8d8a8" strokeWidth="1.5" opacity="0.75" />

      {/* Feet */}
      <line x1="200" y1="340" x2="185" y2="355" stroke="#e8d8a8" strokeWidth="1.2" opacity="0.6" />
      <line x1="280" y1="340" x2="295" y2="355" stroke="#e8d8a8" strokeWidth="1.2" opacity="0.6" />

      {/* Heart glow point */}
      <circle cx="240" cy="192" r="5" fill="#e87060" opacity="0.7" />
      <circle cx="240" cy="192" r="10" fill="#e87060" opacity="0.15" />

      {/* Golden ratio label */}
      <text x="380" y="210" fill="#d4b86a" fontSize="11" opacity="0.35" fontFamily="serif">φ</text>
    </svg>
  );
}

function HeartSVG() {
  return (
    <svg viewBox="0 0 480 400" className="w-full h-full">
      <defs>
        <radialGradient id="heart-bg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#200808" />
          <stop offset="100%" stopColor="#050205" />
        </radialGradient>
        <radialGradient id="heart-glow-outer" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff6030" stopOpacity="0.25" />
          <stop offset="60%" stopColor="#c82010" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#800000" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="heart-glow-mid" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff9060" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ff4010" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="heart-fill" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ff8060" />
          <stop offset="50%" stopColor="#e02010" />
          <stop offset="100%" stopColor="#800010" />
        </radialGradient>
      </defs>

      <rect width="480" height="400" fill="url(#heart-bg)" rx="16" />

      {/* Outer glow */}
      <circle cx="240" cy="205" r="160" fill="url(#heart-glow-outer)" />

      {/* Mid glow */}
      <circle cx="240" cy="205" r="85" fill="url(#heart-glow-mid)" opacity="0.6" />

      {/* Flame wisps */}
      <ellipse cx="240" cy="118" rx="8" ry="22" fill="#ff9040" opacity="0.4" transform="rotate(-8 240 118)" />
      <ellipse cx="240" cy="112" rx="5" ry="18" fill="#ffb060" opacity="0.5" transform="rotate(5 240 112)" />
      <ellipse cx="240" cy="108" rx="3" ry="14" fill="#ffd080" opacity="0.6" />

      {/* Heart shape — SVG path */}
      <path
        d="M240 295
           C200 270 120 230 115 175
           C110 130 140 110 175 112
           C198 113 220 128 240 150
           C260 128 282 113 305 112
           C340 110 370 130 365 175
           C360 230 280 270 240 295 Z"
        fill="url(#heart-fill)"
        stroke="#ff6040"
        strokeWidth="1"
        opacity="0.95"
      />

      {/* Inner highlight */}
      <path
        d="M240 255
           C220 238 178 212 175 185
           C172 162 185 150 200 152
           C215 153 228 163 240 178
           C252 163 265 153 280 152
           C295 150 308 162 305 185
           C302 212 260 238 240 255 Z"
        fill="#ff9070"
        opacity="0.25"
      />

      {/* Centre spark */}
      <circle cx="240" cy="195" r="8" fill="#fff8e8" opacity="0.9" />
      <circle cx="240" cy="195" r="14" fill="#ffcc80" opacity="0.3" />
      <circle cx="240" cy="195" r="22" fill="#ff8040" opacity="0.15" />

      {/* Spark rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 240 + 10 * Math.cos(rad);
        const y1 = 195 + 10 * Math.sin(rad);
        const x2 = 240 + 20 * Math.cos(rad);
        const y2 = 195 + 20 * Math.sin(rad);
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#fff0c0"
            strokeWidth="0.8"
            opacity="0.5"
          />
        );
      })}
    </svg>
  );
}

const SVG_MAP: Record<string, () => React.ReactElement> = {
  universe: UniverseSVG,
  solar: SolarSystemSVG,
  earth: EarthSVG,
  human: HumanSVG,
  heart: HeartSVG,
};

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function CosmosPage() {
  const [level, setLevel] = useState(0);

  const goIn = useCallback(() => setLevel(l => Math.min(l + 1, SCALES.length - 1)), []);
  const goOut = useCallback(() => setLevel(l => Math.max(l - 1, 0)), []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goIn();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goOut();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goIn, goOut]);

  const scale = SCALES[level];
  const SvgComponent = SVG_MAP[scale.id];

  return (
    <div
      className="flex flex-col"
      style={{ background: '#0F1228' }}
    >
      {/* Background radial glow — shifts per level */}
      <div
        className="fixed inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background:
            level === 4
              ? 'radial-gradient(ellipse at center, rgba(200,40,20,0.08) 0%, transparent 60%)'
              : level === 3
              ? 'radial-gradient(ellipse at center, rgba(212,184,106,0.06) 0%, transparent 60%)'
              : level === 2
              ? 'radial-gradient(ellipse at center, rgba(64,128,192,0.07) 0%, transparent 60%)'
              : 'radial-gradient(ellipse at center, rgba(120,80,200,0.06) 0%, transparent 60%)',
        }}
      />

      {/* Header */}
      <div className="relative z-10 px-5 pt-12 pb-4">
        <Link
          href="/self"
          className="text-sm text-white/50 hover:text-white/80 transition-colors"
        >
          ← Self
        </Link>
        <h1 className="font-serif text-3xl text-white mt-2 -tracking-[0.5px]">
          Cosmic Scales
        </h1>
        <p className="text-sm mt-1 text-white/40">From the infinite to the intimate</p>
      </div>

      {/* Scale indicator */}
      <div className="relative z-10 flex justify-center gap-2 px-5 pb-6">
        {SCALES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setLevel(i)}
            className="transition-all duration-300"
            aria-label={`Go to ${s.label}`}
          >
            <div
              className="rounded-full transition-all duration-300"
              style={{
                width: i === level ? 24 : 6,
                height: 6,
                background: i === level ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.2)',
              }}
            />
          </button>
        ))}
      </div>

      {/* Main art area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5">
        <div className="w-full max-w-sm md:max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={scale.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.06 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="w-full aspect-[6/5] rounded-2xl overflow-hidden"
              style={{ boxShadow: '0 0 60px rgba(0,0,0,0.6)' }}
            >
              <SvgComponent />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Text block */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${scale.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
            className="mt-6 text-center max-w-xs md:max-w-sm"
          >
            {/* Sub-label */}
            <p className="text-xs tracking-widest uppercase text-white/30 mb-1">
              {scale.label}
            </p>
            {/* Title */}
            <h2 className="font-serif text-2xl text-white mb-2">{scale.title}</h2>
            {/* Description */}
            <p className="text-sm text-white/55 leading-relaxed">{scale.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="relative z-10 flex items-center justify-between px-8 pb-10 pt-6">
        <button
          onClick={goOut}
          disabled={level === 0}
          className="flex items-center gap-2 text-sm text-white/60 hover:text-white/90 disabled:text-white/20 disabled:cursor-not-allowed transition-colors"
        >
          ← Out
        </button>

        {/* Level counter */}
        <span className="text-xs text-white/25 tabular-nums">
          {level + 1} / {SCALES.length}
        </span>

        <button
          onClick={goIn}
          disabled={level === SCALES.length - 1}
          className="flex items-center gap-2 text-sm text-white/60 hover:text-white/90 disabled:text-white/20 disabled:cursor-not-allowed transition-colors"
        >
          In →
        </button>
      </div>
    </div>
  );
}
