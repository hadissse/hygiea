// Static SVG cosmological model: pre-incarnation → spheres → human being
// Based on Steiner's sphere model (GA 228) and the hand-sketched diagram

const LAYERS = [
  { label: 'Pre-incarnation', sublabel: '', color: '#C8B8E8', textColor: '#5A3D8C', dash: true },
  { label: 'Fixed Stars (beyond zodiac)', sublabel: 'Earth Stars', color: '#D4C09A', textColor: '#6B5420', dash: true },
  { label: 'Fixed Stars (zodiac)', sublabel: 'Constellations', color: '#C9B56A', textColor: '#5A4410', dash: false },
  { label: 'Saturn', sublabel: '1st Hierarchy · Archai', color: '#8B8B6B', textColor: '#3D3D20', dash: false },
  { label: 'Jupiter', sublabel: 'Kyriotetes', color: '#7A9B6A', textColor: '#2D4D1A', dash: false },
  { label: 'Mars', sublabel: '2nd Hierarchy · Dynamis', color: '#C86B4A', textColor: '#6B2010', dash: false },
  { label: 'Sun', sublabel: 'Exusiai · Heart · Gold', color: '#D4A82A', textColor: '#5A3D00', dash: false },
  { label: 'Venus', sublabel: 'Kidneys · Copper', color: '#C87B8B', textColor: '#6B2030', dash: false },
  { label: 'Mercury', sublabel: '3rd Hierarchy · Archangeloi', color: '#6B9B8B', textColor: '#1A4D40', dash: false },
  { label: 'Moon', sublabel: 'Angeloi · Brain · Silver', color: '#A8B8C8', textColor: '#304050', dash: false },
  { label: 'Sky', sublabel: 'Atmosphere', color: '#D0E4F0', textColor: '#2060A0', dash: true },
];

export function SpheresDiagram() {
  const cx = 220;
  const cy = 260;
  const maxR = 200;
  const minR = 38;
  const count = LAYERS.length;

  // Radii spread evenly from maxR down to minR, outermost first
  const radii = LAYERS.map((_, i) => maxR - (i * (maxR - minR)) / (count - 1));

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox="0 0 440 520"
        className="w-full max-w-[440px] mx-auto"
        aria-label="Cosmological sphere diagram"
      >
        {/* Outer label: Pre-incarnation / Macro */}
        <text x="10" y="18" fontSize="9" fill="#9B8AB0" fontFamily="serif" fontStyle="italic">Macro · Cosmic</text>
        {/* Inner label */}
        <text x="10" y="510" fontSize="9" fill="#6B5030" fontFamily="serif" fontStyle="italic">Micro · Bodily · 4th Hierarchy</text>

        {/* Draw rings from outside in */}
        {LAYERS.map((layer, i) => {
          const r = radii[i];
          return (
            <g key={layer.label}>
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill={layer.color + '22'}
                stroke={layer.color}
                strokeWidth={i === 0 ? 0.8 : 1.5}
                strokeDasharray={layer.dash ? '4 3' : undefined}
              />
              {/* Label on the right side of each ring */}
              <text
                x={cx + r - 4}
                y={cy - 6}
                fontSize="8.5"
                fill={layer.textColor}
                textAnchor="end"
                fontFamily="serif"
                fontWeight="600"
              >
                {layer.label}
              </text>
              {layer.sublabel && (
                <text
                  x={cx + r - 4}
                  y={cy + 6}
                  fontSize="7"
                  fill={layer.textColor + 'CC'}
                  textAnchor="end"
                  fontFamily="serif"
                  fontStyle="italic"
                >
                  {layer.sublabel}
                </text>
              )}
            </g>
          );
        })}

        {/* Human figure at center */}
        <ellipse cx={cx} cy={cy} rx={minR - 4} ry={minR - 4} fill="#FAF6EF" stroke="#C8A87A" strokeWidth="1.5" />
        {/* Head */}
        <circle cx={cx} cy={cy - 14} r="7" fill="none" stroke="#6B5030" strokeWidth="1.2" />
        {/* Body */}
        <line x1={cx} y1={cy - 7} x2={cx} y2={cy + 12} stroke="#6B5030" strokeWidth="1.2" />
        {/* Arms */}
        <line x1={cx - 10} y1={cy - 2} x2={cx + 10} y2={cy - 2} stroke="#6B5030" strokeWidth="1.2" />
        {/* Legs */}
        <line x1={cx} y1={cy + 12} x2={cx - 8} y2={cy + 22} stroke="#6B5030" strokeWidth="1.2" />
        <line x1={cx} y1={cy + 12} x2={cx + 8} y2={cy + 22} stroke="#6B5030" strokeWidth="1.2" />
        {/* Organs label */}
        <text x={cx} y={cy + 32} fontSize="7" fill="#6B5030" textAnchor="middle" fontFamily="serif">organs · physical</text>

        {/* Freedom / Destiny axis arrow on left */}
        <line x1={28} y1={80} x2={28} y2={440} stroke="#B0A080" strokeWidth="0.8" markerEnd="url(#arrowDown)" />
        <text x={14} y={120} fontSize="7.5" fill="#8B7A50" textAnchor="middle" fontFamily="serif" transform="rotate(-90,14,260)">
          Freedom-making ↑ · Destiny-determining ↓
        </text>

        {/* Hierarchy bracket lines on right */}
        {[
          { label: '1st Hier.', rIdx: 3, endIdx: 3 },
          { label: '2nd Hier.', rIdx: 5, endIdx: 5 },
          { label: '3rd Hier.', rIdx: 7, endIdx: 7 },
        ].map(({ label, rIdx }) => (
          <g key={label}>
            <text
              x={cx + radii[rIdx] + 8}
              y={cy}
              fontSize="7"
              fill="#9B8060"
              fontFamily="serif"
              fontStyle="italic"
            >
              {label}
            </text>
          </g>
        ))}

        <defs>
          <marker id="arrowDown" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#B0A080" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
