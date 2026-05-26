'use client';

// NEVER_AI — All Michaelmas content is human-authored.
// Active Aug 15 – Nov 11 (Michael season).

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface MichaelContent {
  title: string;
  subtitle: string;
  sections: { heading: string; body: string }[];
}

// NEVER_AI — authored content below
const MICHAEL_CONTENT: MichaelContent = {
  title: 'The Michael Age',
  subtitle: 'Aug 15 — Nov 11 · The iron threshold',
  sections: [
    {
      heading: 'What is happening now',
      body: `We stand in the season that Rudolf Steiner called the threshold of Michael. The archangel Michael — called the Countenance of God — rules this quarter of the cosmic year. His attribute is iron: the mineral that gives the blood its red and the will its edge.\n\nFrom Michaelmas (September 29) backward to the Assumption (August 15) and forward to Martinmas (November 11), something in the cosmic landscape sharpens. The soft peripheral forces of summer withdraw. The world breathes inward. What was scattered by midsummer light must now be gathered into clarity.`,
    },
    {
      heading: 'The challenge of the season',
      body: `Michael's gift is not comfort. His quality is the capacity to face what is real — to stand before the dragon without flinching, and to do so not from hardness but from a warmth that has found its spine.\n\nThe soul in autumn is called to two things simultaneously: to open to the cooling, contracting forces that draw the world inward, and to hold, consciously, the summer warmth that has been gathered. The one who can do both — who becomes iron-clear without becoming cold — has found the Michaelic gesture.`,
    },
    {
      heading: 'The practice in this season',
      body: `In Michael's season, the six auxiliary exercises take on a particular quality. The control of thought becomes sharpness — not cleverness, but precision. Equanimity becomes the capacity to face autumn's weight without despair. Positivity becomes the act of finding the living kernel even in what is dying and falling.\n\nThe Rückschau deepens in this season. The backward walk through the day is not merely a review — it is an act of discrimination: what from today was truly yours, and what was merely inherited habit or reflex? Michael's sword is the symbol of this capacity to cut cleanly.`,
    },
    {
      heading: 'A meditation for Michaelmas',
      body: `We must eradicate from the soul\nAll fear and terror of what comes toward the human being out of the future.\n\nWe must acquire serenity\nIn all feelings and sensations about the future.\n\nWe must look forward\nWith absolute equanimity\nTo everything that may come.\n\nAnd we must think only\nThat whatever comes\nIs given to us by a world-directive full of wisdom.\n\n— Rudolf Steiner, Anthroposophical Leading Thoughts`,
    },
  ],
};

export default function MichaelPage() {
  const router = useRouter();
  const [inSeason, setInSeason] = useState(true);

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const start = new Date(year, 7, 15); // Aug 15
    const end = new Date(year, 10, 11);  // Nov 11
    setInSeason(now >= start && now <= end);
  }, []);

  return (
    <div
      className="min-h-dvh"
      style={{ background: 'var(--color-cream)' }}
    >
      {/* Iron-red header band */}
      <div
        className="px-5 pt-8 pb-6"
        style={{ background: 'var(--color-iron-red)' }}
      >
        <button
          onClick={() => router.back()}
          className="text-sm mb-6 flex items-center gap-1.5"
          style={{ color: 'rgba(245,242,234,0.7)' }}
        >
          ← Back
        </button>

        {!inSeason && (
          <div
            className="text-xs rounded-full px-3 py-1 mb-4 inline-block"
            style={{ background: 'rgba(245,242,234,0.15)', color: 'rgba(245,242,234,0.7)' }}
          >
            Not currently in season — available Aug 15–Nov 11
          </div>
        )}

        <div
          className="text-[10px] font-medium tracking-widest uppercase mb-2"
          style={{ color: 'rgba(245,242,234,0.6)' }}
        >
          Seasonal threshold
        </div>
        <h1
          className="font-serif text-[2rem] leading-tight mb-1"
          style={{ color: 'var(--color-cream)' }}
        >
          {MICHAEL_CONTENT.title}
        </h1>
        <p className="text-sm" style={{ color: 'rgba(245,242,234,0.7)' }}>
          {MICHAEL_CONTENT.subtitle}
        </p>
      </div>

      {/* Content */}
      <div className="px-5 py-6 max-w-[430px] mx-auto pb-28 space-y-8">
        {MICHAEL_CONTENT.sections.map((section) => (
          <div key={section.heading}>
            <div
              className="text-[10px] font-medium tracking-widest uppercase mb-3"
              style={{ color: 'var(--color-iron-red)' }}
            >
              {section.heading}
            </div>
            {section.body.split('\n\n').map((para, i) => (
              <p
                key={i}
                className="font-serif text-[1.05rem] text-ink-soft leading-[1.75] mb-4"
              >
                {para}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
