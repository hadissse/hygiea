'use client';

interface Props {
  highlighted?: string[];
}

const MEMBERS = [
  // Lower Four (col 0), bottom to top
  { id: 'physical', name: 'Physical Body', german: 'Physischer Leib', role: 'Mineral substrate', col: 0, row: 3, color: '#C8A878' },
  { id: 'etheric', name: 'Etheric Body', german: 'Ätherleib', role: 'Life forces', col: 0, row: 2, color: '#B8C8A0' },
  { id: 'astral', name: 'Astral Body', german: 'Astralleib', role: 'Soul bearer', col: 0, row: 1, color: '#C8A8B0' },
  { id: 'i', name: 'The I', german: 'Das Ich', role: 'Ego / spirit kernel', col: 0, row: 0, color: '#D4B870' },
  // Soul Triad (col 1)
  { id: 'sentient-soul', name: 'Sentient Soul', german: 'Empfindungsseele', role: 'Desire & sensation', col: 1, row: 2, color: '#8898B8' },
  { id: 'intellectual-soul', name: 'Intellectual Soul', german: 'Verstandesseele', role: 'Thinking & feeling', col: 1, row: 1, color: '#7898A8' },
  { id: 'consciousness-soul', name: 'Consciousness Soul', german: 'Bewusstseinsseele', role: 'Self-aware cognition', col: 1, row: 0, color: '#6888A8' },
  // Spirit Triad (col 2)
  { id: 'spirit-self', name: 'Spirit-Self', german: 'Geistselbst', role: 'Transformed astral', col: 2, row: 2, color: '#C8B8E8' },
  { id: 'life-spirit', name: 'Life-Spirit', german: 'Lebensgeist', role: 'Transformed etheric', col: 2, row: 1, color: '#D8C8F0' },
  { id: 'spirit-man', name: 'Spirit-Man', german: 'Geistmensch', role: 'Transformed physical', col: 2, row: 0, color: '#E8D8FF' },
];

const COL_LABELS = ['Lower Four', 'Soul Triad', 'Spirit Triad'];

const CARD_W = 148;
const CARD_H = 72;
const COL_GAP = 24;
const ROW_GAP = 14;
const PAD_X = 20;
const PAD_Y = 56;

const COLS = 3;
const ROWS = 4; // Lower Four has 4 rows; soul/spirit only use rows 0-2

const totalW = PAD_X * 2 + COLS * CARD_W + (COLS - 1) * COL_GAP;
const totalH = PAD_Y + ROWS * CARD_H + (ROWS - 1) * ROW_GAP + 20;

function colX(col: number) {
  return PAD_X + col * (CARD_W + COL_GAP);
}

function rowY(row: number) {
  // row 0 = top, row 3 = bottom
  return PAD_Y + row * (CARD_H + ROW_GAP);
}

export function NinefoldConstitution({ highlighted = [] }: Props) {
  const hi = new Set(highlighted.map((s) => s.toLowerCase()));

  return (
    <svg
      viewBox={`0 0 ${totalW} ${totalH}`}
      width={totalW}
      height={totalH}
      xmlns="http://www.w3.org/2000/svg"
      style={{ fontFamily: 'inherit' }}
    >
      {/* Column labels */}
      {COL_LABELS.map((label, ci) => (
        <text
          key={label}
          x={colX(ci) + CARD_W / 2}
          y={PAD_Y - 12}
          textAnchor="middle"
          fontSize={11}
          fontWeight={600}
          fill="#6B7280"
          letterSpacing={0.5}
        >
          {label.toUpperCase()}
        </text>
      ))}

      {/* Cards */}
      {MEMBERS.map((m) => {
        const x = colX(m.col);
        const y = rowY(m.row);
        const isHi = hi.has(m.id) || hi.has(m.name.toLowerCase());

        return (
          <g key={m.id}>
            {/* Glow for highlighted */}
            {isHi && (
              <rect
                x={x - 3}
                y={y - 3}
                width={CARD_W + 6}
                height={CARD_H + 6}
                rx={11}
                fill="none"
                stroke="#F5C842"
                strokeWidth={2.5}
                opacity={0.85}
                filter="url(#goldGlow)"
              />
            )}
            {/* Card background */}
            <rect
              x={x}
              y={y}
              width={CARD_W}
              height={CARD_H}
              rx={9}
              fill={m.color}
              opacity={0.92}
              stroke={isHi ? '#F5C842' : 'rgba(255,255,255,0.35)'}
              strokeWidth={isHi ? 1.5 : 1}
            />
            {/* Member name */}
            <text
              x={x + 12}
              y={y + 24}
              fontSize={12}
              fontWeight={700}
              fill="#1C1C1E"
            >
              {m.name}
            </text>
            {/* German name */}
            <text
              x={x + 12}
              y={y + 38}
              fontSize={9.5}
              fill="#3C3C3E"
              opacity={0.75}
              fontStyle="italic"
            >
              {m.german}
            </text>
            {/* Role */}
            <text
              x={x + 12}
              y={y + 54}
              fontSize={9.5}
              fill="#3C3C3E"
              opacity={0.88}
            >
              {m.role}
            </text>
          </g>
        );
      })}

      {/* Defs */}
      <defs>
        <filter id="goldGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation={4} result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}
