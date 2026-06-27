const SPHERES = [
  {
    glyph: '☉',
    name: 'Sun Sphere',
    variant: 'ember',
    text: 'The Sun sphere asks us to stand fully within our I — the spiritual core that is neither past nor future. In this period, the question is whether we can act from the eternal ground of selfhood rather than from habit or pressure.',
  },
  {
    glyph: '☽',
    name: 'Moon Sphere',
    variant: 'dust',
    text: 'The Moon sphere holds the mirror of memory and the rhythm of repetition. It invites us now to notice which patterns we unconsciously replay, and to bring enough light to the threshold so that something new may enter.',
  },
  {
    glyph: '☿',
    name: 'Mercury Sphere',
    variant: 'lake',
    text: 'Mercury mediates between the inner and the outer, weaving thought into speech and speech into form. The current sky asks us to speak only what we have truly thought through — and to listen with the same care we give to reading.',
  },
  {
    glyph: '♀',
    name: 'Venus Sphere',
    variant: 'dawn',
    text: "Venus sphere is the realm of aesthetic feeling, the soul's capacity to recognise beauty as a moral fact. At this time, small acts of harmony — a tidy space, a kind word, a moment of real appreciation — carry unusual weight.",
  },
  {
    glyph: '♂',
    name: 'Mars Sphere',
    variant: 'sage',
    text: 'Mars calls the will into directed movement. The sphere teaches that courage is not the absence of resistance but the capacity to move through it with warmth. Now is a time for action that originates from love rather than from fear.',
  },
  {
    glyph: '♃',
    name: 'Jupiter Sphere',
    variant: 'dusk',
    text: 'Jupiter sphere is where cosmic wisdom condenses into moral imagination. It asks us to hold the wider picture — to resist the narrowing of perspective that comes from exhaustion — and to bring large thinking into daily choice.',
  },
  {
    glyph: '♄',
    name: 'Saturn Sphere',
    variant: 'night',
    text: 'Saturn stands at the threshold of the cosmos accessible to ordinary consciousness. Its influence in this period slows time so we may meet what we have carried without resolution. The discipline it requires is patient honesty.',
  },
];

const SPHERE_TEXT_COLORS: Record<string, string> = {
  ember: '#171B3A',
  dust: '#171B3A',
  lake: '#171B3A',
  dawn: '#171B3A',
  sage: '#171B3A',
  dusk: '#FFFFFF',
  night: '#FFFFFF',
};

const SPHERE_GRAD: Record<string, string> = {
  ember: 'linear-gradient(135deg,#FFC78A,#D4651E)',
  dust: 'linear-gradient(135deg,#EBE3D0,#8B7B6B)',
  lake: 'linear-gradient(135deg,#C2D3E2,#7E97B8)',
  dawn: 'linear-gradient(135deg,#F8D6BE,#E9785E)',
  sage: 'linear-gradient(135deg,#C9D2BE,#8FA084)',
  dusk: 'linear-gradient(135deg,#9C8AB8,#5A3E7A)',
  night: 'linear-gradient(135deg,#3A4490,#1B1F47)',
};

const PRACTICES = [
  {
    title: 'Morning Observation',
    body: 'Before speaking or looking at a screen, stand at a window for three minutes. Note the quality of light, any wind, any sound. Let the sky register in you before the day begins.',
  },
  {
    title: 'Weekly Rhythm',
    body: 'Each day of the week holds a planetary signature. Let Monday carry the quality of the Moon — more inward, more reflective. Let Sunday belong to the Sun — more expansive, more generous. Let this rhythm inform small choices.',
  },
];

export default function TransitDepthPage() {
  return (
    <div className="bg-cream pb-16">
      <div className="px-5 pt-8 pb-6 md:max-w-3xl md:mx-auto">
        <h1 className="font-prose text-2xl text-ink">Depth Read</h1>
        <p className="text-sm text-ink-muted mt-1">The current sky seen through Steiner's sphere system.</p>
      </div>

      <div className="px-5 md:max-w-3xl md:mx-auto">
        <div className="text-[11px] text-ink-muted font-semibold tracking-wider mb-3">The Seven Spheres</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SPHERES.map((sphere) => {
            const fg = SPHERE_TEXT_COLORS[sphere.variant];
            return (
              <div
                key={sphere.name}
                className="rounded-[18px] p-5"
                style={{ background: SPHERE_GRAD[sphere.variant] }}
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="text-2xl leading-none" style={{ color: fg }}>{sphere.glyph}</span>
                  <span className="font-prose text-sm font-medium" style={{ color: fg }}>{sphere.name}</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: fg, opacity: 0.9 }}>
                  {sphere.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="px-5 mt-10 md:max-w-3xl md:mx-auto">
        <div className="text-[11px] text-ink-muted font-semibold tracking-wider mb-3">Practice</div>
        <div className="flex flex-col gap-3">
          {PRACTICES.map((p) => (
            <div key={p.title} className="bg-white rounded-[16px] border border-rule-soft p-4">
              <div className="font-prose text-sm text-ink mb-1.5">{p.title}</div>
              <p className="text-sm text-ink-muted leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
