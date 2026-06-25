'use client';

interface NodalAxisDiagramProps {
  southNode?: { sign: string; degree: number; house: string };
  northNode?: { sign: string; degree: number; house: string };
  chiron?: { sign: string; degree: number; house: string; retrograde?: boolean };
}

export function NodalAxisDiagram({ southNode, northNode, chiron }: NodalAxisDiagramProps) {
  const SN_COLOR = '#C8A878';
  const NN_COLOR = '#8898C8';
  const CH_COLOR = '#78A888';

  const formatBody = (body: { sign: string; degree: number; house: string } | undefined, retrograde?: boolean) => {
    if (!body) return null;
    const deg = Math.floor(body.degree);
    const min = Math.round((body.degree - deg) * 60);
    return `${deg}°${min.toString().padStart(2, '0')}' ${body.sign}${retrograde ? ' ℞' : ''} · ${body.house}`;
  };

  return (
    <svg
      viewBox="0 0 500 200"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto' }}
      aria-label="Nodal Axis and Chiron Diagram"
    >
      {/* Background */}
      <rect width="500" height="200" fill="transparent" />

      {/* ── Nodal Axis line ── */}
      {/* Arrow pointing left */}
      <line x1="60" y1="90" x2="440" y2="90" stroke="#555577" strokeWidth="1.5" />
      <polygon points="60,90 72,85 72,95" fill="#555577" />
      {/* Arrow pointing right */}
      <polygon points="440,90 428,85 428,95" fill="#555577" />

      {/* Axis label */}
      <text x="250" y="85" textAnchor="middle" fontSize="10" fill="#888899" letterSpacing="1">
        ←  Nodal Axis  →
      </text>

      {/* ── South Node (left) ── */}
      {/* Glyph ☋ */}
      <text x="110" y="62" textAnchor="middle" fontSize="28" fill={SN_COLOR} fontFamily="serif">
        ☋
      </text>

      {/* Label */}
      <text x="110" y="108" textAnchor="middle" fontSize="9" fill={SN_COLOR} letterSpacing="0.5" fontWeight="600">
        SOUL'S ORIGIN
      </text>

      {/* Sign / degree / house */}
      <text x="110" y="122" textAnchor="middle" fontSize="9" fill={SN_COLOR} opacity="0.85">
        {formatBody(southNode) ?? '—'}
      </text>

      {/* Karmic subtitle */}
      <text x="110" y="136" textAnchor="middle" fontSize="8" fill={SN_COLOR} opacity="0.55" fontStyle="italic">
        karmic origin
      </text>

      {/* ── North Node (right) ── */}
      {/* Glyph ☊ */}
      <text x="390" y="62" textAnchor="middle" fontSize="28" fill={NN_COLOR} fontFamily="serif">
        ☊
      </text>

      {/* Label */}
      <text x="390" y="108" textAnchor="middle" fontSize="9" fill={NN_COLOR} letterSpacing="0.5" fontWeight="600">
        SOUL'S FRONTIER
      </text>

      {/* Sign / degree / house */}
      <text x="390" y="122" textAnchor="middle" fontSize="9" fill={NN_COLOR} opacity="0.85">
        {formatBody(northNode) ?? '—'}
      </text>

      {/* Developmental subtitle */}
      <text x="390" y="136" textAnchor="middle" fontSize="8" fill={NN_COLOR} opacity="0.55" fontStyle="italic">
        developmental frontier
      </text>

      {/* ── Chiron (bottom center) ── */}
      {/* Separator line */}
      <line x1="180" y1="152" x2="320" y2="152" stroke="#334" strokeWidth="0.75" strokeDasharray="3 3" />

      {/* Glyph ⚷ */}
      <text x="250" y="168" textAnchor="middle" fontSize="18" fill={CH_COLOR} fontFamily="serif">
        ⚷
      </text>

      {/* Label */}
      <text x="250" y="184" textAnchor="middle" fontSize="9" fill={CH_COLOR} letterSpacing="0.5" fontWeight="600">
        THE SACRED WOUND
      </text>

      {/* Sign / degree / house */}
      <text x="250" y="196" textAnchor="middle" fontSize="8.5" fill={CH_COLOR} opacity="0.85">
        {formatBody(chiron, chiron?.retrograde) ?? '—'}
      </text>
    </svg>
  );
}
