'use client';

export interface AspectEntry {
  p1: string;
  p2: string;
  type: 'conjunction' | 'opposition' | 'trine' | 'square' | 'sextile' | 'quincunx';
  orb: number;
}

export interface AspectGridSvgProps {
  planets: string[];
  aspects: AspectEntry[];
}

const PLANET_GLYPHS: Record<string, string> = {
  Sun: '☉',
  Moon: '☽',
  Mercury: '☿',
  Venus: '♀',
  Mars: '♂',
  Jupiter: '♃',
  Saturn: '♄',
  Uranus: '♅',
  Neptune: '♆',
  Pluto: '♇',
  Chiron: '⚷',
  'North Node': '☊',
  NorthNode: '☊',
};

const ASPECT_SYMBOLS: Record<AspectEntry['type'], string> = {
  conjunction: '☌',
  opposition: '☍',
  trine: '△',
  square: '□',
  sextile: '✶',
  quincunx: '⚻',
};

const ASPECT_COLORS: Record<AspectEntry['type'], string> = {
  conjunction: '#C9A227',
  opposition: '#C0392B',
  trine: '#27AE60',
  square: '#922B21',
  sextile: '#1ABC9C',
  quincunx: '#95A5A6',
};

const CELL = 32;
const LABEL_OFFSET = 14; // space for the diagonal planet label column

function getPlanetGlyph(name: string): string {
  return PLANET_GLYPHS[name] ?? name.slice(0, 2);
}

export function AspectGridSvg({ planets, aspects }: AspectGridSvgProps) {
  const n = planets.length;

  // Build lookup: "p1|p2" -> AspectEntry (normalised so smaller index first)
  const aspectMap = new Map<string, AspectEntry>();
  for (const a of aspects) {
    const i1 = planets.indexOf(a.p1);
    const i2 = planets.indexOf(a.p2);
    if (i1 === -1 || i2 === -1) continue;
    const [lo, hi] = i1 < i2 ? [i1, i2] : [i2, i1];
    aspectMap.set(`${lo}|${hi}`, a);
  }

  // Grid occupies rows 1..n-1, cols 0..n-2 (lower-left triangle)
  // We add one extra row at top for column headers and one extra col on right for row labels
  // Layout:
  //   - Column j header (planet glyph) sits above column j of the grid
  //   - Row i label (planet glyph) sits to the right of row i of the grid
  //
  // Grid cell (row=i, col=j) represents the pair (planets[j], planets[i])
  // where i > j  (lower-left triangle, i.e. row > col)
  //
  // Width:  (n-1) cells + 1 label col on right  + small margin
  // Height: (n-1) cells + 1 header row on top   + small margin

  const HEADER = CELL; // height of top header row
  const MARGIN = 4;

  const totalW = (n - 1) * CELL + CELL + MARGIN * 2; // grid cols + right label col
  const totalH = HEADER + (n - 1) * CELL + MARGIN * 2;

  const gridLeft = MARGIN;
  const gridTop = MARGIN + HEADER;

  return (
    <svg
      width={totalW}
      height={totalH}
      viewBox={`0 0 ${totalW} ${totalH}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ background: '#fff', display: 'block' }}
      aria-label="Aspect grid"
    >
      {/* Outer border */}
      <rect
        x={MARGIN}
        y={MARGIN + HEADER}
        width={(n - 1) * CELL}
        height={(n - 1) * CELL}
        fill="none"
        stroke="#E5E1D8"
        strokeWidth={1}
      />

      {/* Grid lines */}
      {Array.from({ length: n - 1 }, (_, i) => (
        <g key={`gridlines-${i}`}>
          {/* horizontal line after row i */}
          <line
            x1={gridLeft}
            y1={gridTop + (i + 1) * CELL}
            x2={gridLeft + (i + 1) * CELL}
            y2={gridTop + (i + 1) * CELL}
            stroke="#E5E1D8"
            strokeWidth={0.5}
          />
          {/* vertical line after col i */}
          <line
            x1={gridLeft + (i + 1) * CELL}
            y1={gridTop}
            x2={gridLeft + (i + 1) * CELL}
            y2={gridTop + (i + 1) * CELL}
            stroke="#E5E1D8"
            strokeWidth={0.5}
          />
        </g>
      ))}

      {/* Column headers (planets[0] .. planets[n-2]) */}
      {Array.from({ length: n - 1 }, (_, j) => (
        <text
          key={`col-header-${j}`}
          x={gridLeft + j * CELL + CELL / 2}
          y={MARGIN + HEADER / 2 + 5}
          textAnchor="middle"
          fontSize={13}
          fill="#7A7469"
          fontFamily="serif"
        >
          {getPlanetGlyph(planets[j])}
        </text>
      ))}

      {/* Row labels (planets[1] .. planets[n-1]) on the right */}
      {Array.from({ length: n - 1 }, (_, i) => (
        <text
          key={`row-label-${i}`}
          x={gridLeft + (n - 1) * CELL + CELL / 2}
          y={gridTop + i * CELL + CELL / 2 + 5}
          textAnchor="middle"
          fontSize={13}
          fill="#7A7469"
          fontFamily="serif"
        >
          {getPlanetGlyph(planets[i + 1])}
        </text>
      ))}

      {/* Cells: row i (0-based within grid) = planets[i+1], col j = planets[j], j < i+1 */}
      {Array.from({ length: n - 1 }, (_, i) =>
        Array.from({ length: i + 1 }, (_, j) => {
          const planetRow = i + 1; // index in planets array for this row
          const planetCol = j;     // index in planets array for this col
          const lo = Math.min(planetRow, planetCol);
          const hi = Math.max(planetRow, planetCol);
          const entry = aspectMap.get(`${lo}|${hi}`);

          const cx = gridLeft + j * CELL + CELL / 2;
          const cy = gridTop + i * CELL + CELL / 2;

          return (
            <g key={`cell-${i}-${j}`}>
              <rect
                x={gridLeft + j * CELL}
                y={gridTop + i * CELL}
                width={CELL}
                height={CELL}
                fill={entry ? `${ASPECT_COLORS[entry.type]}18` : '#FAFAF9'}
                stroke="#E5E1D8"
                strokeWidth={0.5}
              />
              {entry && (
                <text
                  x={cx}
                  y={cy + 5}
                  textAnchor="middle"
                  fontSize={14}
                  fill={ASPECT_COLORS[entry.type]}
                  fontFamily="serif"
                  aria-label={`${entry.type} between ${planets[planetCol]} and ${planets[planetRow]}`}
                >
                  {ASPECT_SYMBOLS[entry.type]}
                </text>
              )}
            </g>
          );
        })
      )}
    </svg>
  );
}
