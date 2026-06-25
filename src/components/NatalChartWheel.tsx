'use client';

interface NatalChartWheelProps {
  chart: {
    asc: number;
    sun?: { longitude: number; sign: string; retrograde?: boolean };
    moon?: { longitude: number; sign: string; retrograde?: boolean };
    mercury?: { longitude: number; sign: string; retrograde?: boolean };
    venus?: { longitude: number; sign: string; retrograde?: boolean };
    mars?: { longitude: number; sign: string; retrograde?: boolean };
    jupiter?: { longitude: number; sign: string; retrograde?: boolean };
    saturn?: { longitude: number; sign: string; retrograde?: boolean };
    uranus?: { longitude: number; sign: string; retrograde?: boolean };
    neptune?: { longitude: number; sign: string; retrograde?: boolean };
    pluto?: { longitude: number; sign: string; retrograde?: boolean };
    chiron?: { longitude: number; sign: string; retrograde?: boolean };
    northNode?: { longitude: number; sign: string };
    southNode?: { longitude: number; sign: string };
    houses?: Array<{ num: number; cusp: number }>;
  };
  size?: number;
}

const SIGN_GLYPHS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

const ELEMENT_COLORS: Record<string, string> = {
  fire: '#C86B4A',
  earth: '#6B8B5A',
  air: '#5A7B9B',
  water: '#5A7B8B',
};

// Signs by element (0-indexed: 0=Aries, 1=Taurus, ...)
const SIGN_ELEMENTS: string[] = [
  'fire', 'earth', 'air', 'water',   // Aries, Taurus, Gemini, Cancer
  'fire', 'earth', 'air', 'water',   // Leo, Virgo, Libra, Scorpio
  'fire', 'earth', 'air', 'water',   // Sagittarius, Capricorn, Aquarius, Pisces
];

const PLANET_GLYPHS: Record<string, string> = {
  sun: '☉',
  moon: '☽',
  mercury: '☿',
  venus: '♀',
  mars: '♂',
  jupiter: '♃',
  saturn: '♄',
  uranus: '♅',
  neptune: '♆',
  pluto: '♇',
  chiron: '⚷',
  northNode: '☊',
  southNode: '☋',
};

const PLANET_COLORS: Record<string, string> = {
  sun: '#C9A84C',
  moon: '#E8E0D0',
  mercury: '#B0C4DE',
  venus: '#DDA0DD',
  mars: '#CD5C5C',
  jupiter: '#DAA520',
  saturn: '#8B7355',
  uranus: '#7FFFD4',
  neptune: '#6495ED',
  pluto: '#9370DB',
  chiron: '#90EE90',
  northNode: '#C9A84C',
  southNode: '#C9A84C',
};

const ASPECT_COLORS: Record<string, string> = {
  conjunction: '#C9A84C',
  trine: '#4CAF50',
  square: '#E53935',
  opposition: '#1976D2',
  sextile: '#009688',
};

const ASPECT_ORBS: Record<string, number> = {
  conjunction: 8,
  opposition: 8,
  trine: 8,
  square: 8,
  sextile: 6,
};

function getAspectType(diff: number): string | null {
  const d = ((diff % 360) + 360) % 360;
  const angle = d > 180 ? 360 - d : d;
  if (Math.abs(angle - 0) <= ASPECT_ORBS.conjunction) return 'conjunction';
  if (Math.abs(angle - 180) <= ASPECT_ORBS.opposition) return 'opposition';
  if (Math.abs(angle - 120) <= ASPECT_ORBS.trine) return 'trine';
  if (Math.abs(angle - 90) <= ASPECT_ORBS.square) return 'square';
  if (Math.abs(angle - 60) <= ASPECT_ORBS.sextile) return 'sextile';
  return null;
}

// Convert ecliptic longitude to SVG angle
// ASC = left (9 o'clock = 180deg from right = π radians)
// angle = (longitude - asc + 180) * PI / 180
function longitudeToAngle(longitude: number, asc: number): number {
  return ((longitude - asc + 180) * Math.PI) / 180;
}

function polarToCartesian(cx: number, cy: number, r: number, angleRad: number): { x: number; y: number } {
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
}

export function NatalChartWheel({ chart, size = 400 }: NatalChartWheelProps) {
  const cx = 200;
  const cy = 200;
  const scale = size / 400;

  const R_OUTER = 190;
  const R_SIGN_INNER = 155;
  const R_HOUSE_OUTER = 150;
  const R_HOUSE_INNER = 110;
  const R_PLANET = 125;
  const R_ASPECT = 105;
  const R_CENTER = 60;

  const { asc } = chart;

  // Build planet list
  type PlanetEntry = { key: string; longitude: number; retrograde?: boolean };
  const planets: PlanetEntry[] = [];
  const planetKeys = [
    'sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter',
    'saturn', 'uranus', 'neptune', 'pluto', 'chiron', 'northNode', 'southNode',
  ] as const;
  for (const key of planetKeys) {
    const p = chart[key];
    if (p) {
      planets.push({ key, longitude: p.longitude, retrograde: 'retrograde' in p ? p.retrograde : undefined });
    }
  }

  // Compute aspects
  type AspectEntry = { a: string; b: string; type: string };
  const aspects: AspectEntry[] = [];
  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const diff = planets[j].longitude - planets[i].longitude;
      const type = getAspectType(diff);
      if (type) {
        aspects.push({ a: planets[i].key, b: planets[j].key, type });
      }
    }
  }

  // Zodiac sign segments (12 segments of 30°)
  // Sign 0 (Aries) starts at 0° ecliptic
  const signSegments = SIGN_GLYPHS.map((glyph, i) => {
    const startLon = i * 30;
    const endLon = (i + 1) * 30;
    const startAngle = longitudeToAngle(startLon, asc);
    const endAngle = longitudeToAngle(endLon, asc);
    const midAngle = longitudeToAngle(startLon + 15, asc);
    const color = ELEMENT_COLORS[SIGN_ELEMENTS[i]];
    const outerStart = polarToCartesian(cx, cy, R_OUTER, startAngle);
    const outerEnd = polarToCartesian(cx, cy, R_OUTER, endAngle);
    const innerStart = polarToCartesian(cx, cy, R_SIGN_INNER, startAngle);
    const innerEnd = polarToCartesian(cx, cy, R_SIGN_INNER, endAngle);

    const path = [
      `M ${innerStart.x} ${innerStart.y}`,
      `L ${outerStart.x} ${outerStart.y}`,
      `A ${R_OUTER} ${R_OUTER} 0 0 1 ${outerEnd.x} ${outerEnd.y}`,
      `L ${innerEnd.x} ${innerEnd.y}`,
      `A ${R_SIGN_INNER} ${R_SIGN_INNER} 0 0 0 ${innerStart.x} ${innerStart.y}`,
      'Z',
    ].join(' ');

    const labelR = (R_OUTER + R_SIGN_INNER) / 2;
    const labelPos = polarToCartesian(cx, cy, labelR, midAngle);

    return { path, color, glyph, labelPos, startAngle, index: i };
  });

  // House cusps
  const houseCusps: Array<{ num: number; cusp: number }> = chart.houses && chart.houses.length === 12
    ? chart.houses
    : Array.from({ length: 12 }, (_, i) => ({
        num: i + 1,
        cusp: ((asc + i * 30) % 360 + 360) % 360,
      }));

  const houseLines = houseCusps.map(({ num, cusp }) => {
    const angle = longitudeToAngle(cusp, asc);
    const inner = polarToCartesian(cx, cy, R_CENTER, angle);
    const outer = polarToCartesian(cx, cy, R_HOUSE_OUTER, angle);
    const labelR = (R_HOUSE_OUTER + R_HOUSE_INNER) / 2;
    const labelPos = polarToCartesian(cx, cy, labelR, angle + (Math.PI / 180) * 15);
    return { num, angle, inner, outer, labelPos };
  });

  // Planet positions
  const planetPositions = planets.map(({ key, longitude, retrograde }) => {
    const angle = longitudeToAngle(longitude, asc);
    const pos = polarToCartesian(cx, cy, R_PLANET, angle);
    return { key, pos, angle, retrograde };
  });

  // Aspect lines
  const aspectLines = aspects.map(({ a, b, type }) => {
    const pa = planets.find(p => p.key === a);
    const pb = planets.find(p => p.key === b);
    if (!pa || !pb) return null;
    const angleA = longitudeToAngle(pa.longitude, asc);
    const angleB = longitudeToAngle(pb.longitude, asc);
    const posA = polarToCartesian(cx, cy, R_ASPECT, angleA);
    const posB = polarToCartesian(cx, cy, R_ASPECT, angleB);
    return { posA, posB, type };
  }).filter(Boolean) as Array<{ posA: { x: number; y: number }; posB: { x: number; y: number }; type: string }>;

  return (
    <svg
      viewBox="0 0 400 400"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* Background */}
      <circle cx={cx} cy={cy} r={R_OUTER} fill="var(--bg-midnight, #171B3A)" />

      {/* Zodiac sign segments */}
      {signSegments.map(({ path, color, glyph, labelPos, index }) => (
        <g key={`sign-${index}`}>
          <path d={path} fill={color} fillOpacity={0.25} stroke="rgba(255,255,255,0.15)" strokeWidth={0.5} />
          <text
            x={labelPos.x}
            y={labelPos.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={12}
            fill={color}
            opacity={0.9}
          >
            {glyph}
          </text>
        </g>
      ))}

      {/* Outer ring border */}
      <circle cx={cx} cy={cy} r={R_OUTER} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
      <circle cx={cx} cy={cy} r={R_SIGN_INNER} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={0.5} />

      {/* House cusps ring */}
      <circle cx={cx} cy={cy} r={R_HOUSE_OUTER} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
      <circle cx={cx} cy={cy} r={R_HOUSE_INNER} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={0.5} />

      {/* House cusp lines and numbers */}
      {houseLines.map(({ num, inner, outer, labelPos }) => (
        <g key={`house-${num}`}>
          <line
            x1={inner.x}
            y1={inner.y}
            x2={outer.x}
            y2={outer.y}
            stroke={num === 1 || num === 4 || num === 7 || num === 10
              ? 'rgba(201,168,76,0.7)'
              : 'rgba(255,255,255,0.2)'}
            strokeWidth={num === 1 || num === 4 || num === 7 || num === 10 ? 1.5 : 0.75}
          />
          <text
            x={labelPos.x}
            y={labelPos.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={8}
            fill="rgba(255,255,255,0.45)"
          >
            {num}
          </text>
        </g>
      ))}

      {/* Aspect circle */}
      <circle cx={cx} cy={cy} r={R_ASPECT} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={0.5} />

      {/* Aspect lines */}
      {aspectLines.map(({ posA, posB, type }, i) => (
        <line
          key={`aspect-${i}`}
          x1={posA.x}
          y1={posA.y}
          x2={posB.x}
          y2={posB.y}
          stroke={ASPECT_COLORS[type]}
          strokeWidth={0.6}
          opacity={0.4}
        />
      ))}

      {/* Planet positions */}
      {planetPositions.map(({ key, pos, retrograde }) => (
        <g key={`planet-${key}`}>
          {/* Planet background dot */}
          <circle cx={pos.x} cy={pos.y} r={8} fill="var(--bg-midnight, #171B3A)" fillOpacity={0.8} />
          {/* Planet glyph */}
          <text
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={11}
            fill={PLANET_COLORS[key] ?? '#E8E0D0'}
            fontWeight="bold"
          >
            {PLANET_GLYPHS[key]}
          </text>
          {/* Retrograde marker */}
          {retrograde && (
            <text
              x={pos.x + 7}
              y={pos.y - 5}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={6}
              fill={PLANET_COLORS[key] ?? '#E8E0D0'}
              opacity={0.8}
            >
              ℞
            </text>
          )}
        </g>
      ))}

      {/* Center circle */}
      <circle cx={cx} cy={cy} r={R_CENTER} fill="#F5F0E8" fillOpacity={0.07} stroke="rgba(201,168,76,0.3)" strokeWidth={1} />

      {/* ASC marker */}
      {(() => {
        const ascAngle = longitudeToAngle(asc, asc); // = π
        const inner = polarToCartesian(cx, cy, R_CENTER, ascAngle);
        const outer = polarToCartesian(cx, cy, R_SIGN_INNER + 5, ascAngle);
        return (
          <line
            x1={inner.x}
            y1={inner.y}
            x2={outer.x}
            y2={outer.y}
            stroke="rgba(201,168,76,0.8)"
            strokeWidth={2}
          />
        );
      })()}
    </svg>
  );
}
