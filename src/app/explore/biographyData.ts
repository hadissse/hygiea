// Panoramic biography + major cosmic transits.
// Unified chronological timeline merging Steiner 7-year phases + major planetary transits.

export type TimelineItemType = 'phase' | 'transit';

export interface UnifiedTimelineItem {
  /** Sort key — start age (phases) or exact transit age */
  sortAge: number;
  type: TimelineItemType;
  /** Display age label, e.g. "0–7" or "age ~12" */
  ageLabel: string;
  /** Numeric age range [start, end]. For transits end ≈ start+1 */
  age: [number, number];
  name: string;
  svgKey: string;
  planet: string;
  /** One-line summary */
  theme: string;
  /** Full body, 3-5 rich sentences drawn from Steiner / Judith Hill / Bruno Huber sources */
  body: string;
  /** Reflective prompt (transits only) */
  prompt?: string;
}

// ─── Unified Chronological Timeline ───────────────────────────────────────
export const UNIFIED_TIMELINE: UnifiedTimelineItem[] = [
  // ── Phase 0–7 ──────────────────────────────────────────────────────────
  {
    sortAge: 0,
    type: 'phase',
    ageLabel: '0–7',
    age: [0, 7],
    name: 'Early Childhood',
    svgKey: 'moon',
    planet: 'Moon',
    theme: 'Body and Trust',
    body:
      'In the first seven years the formative cosmic forces work to build the body from the inside out — as Steiner described: "the human being is sculpted from cosmic matter with an invisible chisel." ' +
      'The child learns through pure imitation, not understanding; everything the senses touch is directly imprinted in the rhythm of its growth. ' +
      'In this phase the child first develops the four bodily senses: touch, life, self-movement, and balance — the senses that make it "at home in the body." ' +
      'The loss of baby teeth at the end of this phase signals that the formative forces have finished building the body\'s framework and are now free to move toward thinking energy. ' +
      'The Moon governs this cycle as the force of growth and adaptation, establishing in the child the basic trust that the world is safe and worthy of love.',
  },

  // ── Phase 7–14 ─────────────────────────────────────────────────────────
  {
    sortAge: 7,
    type: 'phase',
    ageLabel: '7–14',
    age: [7, 14],
    name: 'Second Childhood',
    svgKey: 'mercury',
    planet: 'Mercury',
    theme: 'Imagination and Beloved Authority',
    body:
      'With the loss of baby teeth the formative forces are freed from building the body to move toward thinking — and it is for this very reason that Steiner decided formal schooling should begin at age seven and not before. ' +
      'The etheric body (forces of growth and memory) releases its energy for inner life, so imagination ignites and memory rich with images opens. ' +
      'Learning in this phase should pass through art, rhythm, and story rather than dry concepts; for the child still learns through imagery, not abstraction. ' +
      'Around age nine the child passes through the first separation crisis — realising for the first time that it is a being separate from others and from nature — and this is a critical moment calling for reinforcement of trust and accompaniment. ' +
      'The beloved authority (the trusted teacher) is the main guide in this phase; the child learns through attachment to a living human model, not through abstract rules.',
  },

  // ── Transit: Jupiter Return 1 (~12) ────────────────────────────────────
  {
    sortAge: 12,
    type: 'transit',
    ageLabel: 'age ~12',
    age: [11.5, 12.5],
    name: 'First Jupiter Return',
    svgKey: 'jupiter',
    planet: 'Jupiter',
    theme: 'First expansion of consciousness',
    body:
      'When Jupiter completes its full orbit around age twelve, the child passes through the first moment of real expansion of consciousness — the question shifts from childhood\'s "why?" to the moral "what is just?" ' +
      'This timing coincides with the middle of the Mercury phase (7–14), where the etheric body is freed more deeply toward thinking and capacities for independent judgment begin to emerge. ' +
      'Jupiter opens here the first door to personal wisdom — what inspires you at this age often carries the seed of your life\'s mission. ' +
      'In Anthroposophical tradition this moment is described as "spirits of wisdom" planting in the emerging consciousness a first sense of great purpose. ' +
      'Many remember this age as the moment they began to see the world with wider eyes — the moment of opening the horizon.',
    prompt: 'What inspired you in your later childhood — and is it still alive in you?',
  },

  // ── Transit: Saturn opposition (~14.5) ─────────────────────────────────
  {
    sortAge: 14.5,
    type: 'transit',
    ageLabel: 'age ~14.5',
    age: [14, 15],
    name: 'First Saturn Opposition',
    svgKey: 'saturn',
    planet: 'Saturn',
    theme: 'Birth of identity through collision',
    body:
      'When Saturn reaches opposition to its natal position — around age fourteen — the first real test of identity begins: puberty in its spiritual not merely physical sense. ' +
      'Steiner describes this moment as "the birth of the astral body" — the emotional layer of the human being that carries desires and feelings and makes the adolescent feel with an intensity they have not known before. ' +
      'Adolescent rebellion is not chaos but the way the emerging ego tests its boundaries through collision; Saturn says: "know where you end and the other begins." ' +
      'In Huber\'s system this coincides with the low point in the fourth house — the deepest moment of roots before the ascent toward confronting the outer world. ' +
      'Adolescents who find a wise adult to accompany them in this moment — neither controlling nor abandoning — develop healthy boundaries that serve them throughout their lives.',
    prompt: 'What boundaries did you discover in your adolescence — and which ones still govern you without your realising it?',
  },

  // ── Phase 14–21 ────────────────────────────────────────────────────────
  {
    sortAge: 14,
    type: 'phase',
    ageLabel: '14–21',
    age: [14, 21],
    name: 'Adolescence',
    svgKey: 'venus',
    planet: 'Venus',
    theme: 'The Astral Body and Love',
    body:
      'This phase begins with the birth of the astral body — the inner emotional layer — and manifests first in sexual awakening, then gradually expands to encompass artistic, philosophical, and social awakening. ' +
      'The adolescent discovers for the first time "the other" as a real independent being, and begins building relationships beyond the family — and this discovery is accompanied by deep longing and the pain of sensing distance and separation. ' +
      'Venus governs this phase as the force of beauty, attachment, and the desire for union; art, music, and first love are the tools through which the young person builds their emotional consciousness. ' +
      'Proper education in this phase should cultivate independent judgment, social responsibility, and conceptual understanding rather than memorisation and rote learning. ' +
      'Those who pass through this phase with good support emerge with an emotional and aesthetic repertoire that nourishes their creativity and relationships throughout their lives.',
  },

  // ── Phase 21–28 ────────────────────────────────────────────────────────
  {
    sortAge: 21,
    type: 'phase',
    ageLabel: '21–28',
    age: [21, 28],
    name: 'Building the Self',
    svgKey: 'sun',
    planet: 'Sun',
    theme: 'Birth of the Conscious Ego',
    body:
      'At age twenty-one the true ego ("Ich") is freed to step for the first time into the world with its own will — Steiner described this moment as "the fourth birth" after physical, etheric, and astral birth. ' +
      'This is the phase of the "consciousness soul" in Steiner\'s terms — where the person begins to ask: "who am I truly, beyond what was given to me?" And the first answers begin to appear in their professional and emotional choices. ' +
      'The associative centres in the brain reach peak efficiency for conceptual work, granting an unprecedented capacity for organised thinking and long-term planning. ' +
      'A gradual liberation from the family of origin and a break from inherited references makes this phase a mixture of exhilarating freedom and anxiety-provoking solitude. ' +
      'Everything learned in the first twenty years is now tested in the crucible of reality — profession, relationship, values — and what holds up is the true core.',
  },

  // ── Phase 28–35 ────────────────────────────────────────────────────────
  {
    sortAge: 28,
    type: 'phase',
    ageLabel: '28–35',
    age: [28, 35],
    name: 'The Mars Phase',
    svgKey: 'mars',
    planet: 'Mars',
    theme: 'Will and Testing',
    body:
      'The ego tests its will in the world directly — this is the phase of work, struggle, and establishment; goals collide with reality and are tested not in imagination but in daily effort. ' +
      'Steiner described this phase as the associative centres in the brain reaching maximum efficiency around age thirty-five — the age at which the greatest thinkers produced their most mature ideas (Jesus, Buddha, Dante). ' +
      'Mars as ruler of this phase drives energy outward — ambition, competition, and love of victory — but also teaches that the real defeat is remaining without principle. ' +
      'The first Saturn Return (~29.5) falls at the heart of this phase and makes it a true crucible of examination: what is built on rock holds, and what is on sand crumbles. ' +
      'Those who complete this phase with awareness emerge with a firm identity and clear vision — and those who flee from its tests carry them into the following decades.',
  },

  // ── Transit: Saturn Return 1 (~29.5) ────────────────────────────────────
  {
    sortAge: 29.5,
    type: 'transit',
    ageLabel: 'age ~29.5',
    age: [28.5, 30.5],
    name: 'First Saturn Return',
    svgKey: 'saturn',
    planet: 'Saturn',
    theme: 'The test of the true foundation',
    body:
      'The first Saturn Return is the most important cosmic event in the first half of life — when Saturn returns to its natal position between ages 28 and 30, one decisive question is posed: "Is what you have built real?" ' +
      'In Anthroposophical tradition this is the moment of birth of the "consciousness soul" — the transformation from the receiving human to the conscious actor who knows why they choose what they choose. ' +
      'Many change their career, partner, or city in this phase; and what usually falls is what was built to please expectations that do not truly belong to them. ' +
      'Saturn does not punish but cleanses — removing all that is borrowed to reveal what is authentic; and this is why the wise understand it as mercy, not severity. ' +
      'The sense of touch — Saturn\'s deepest gift — speaks clearly here: you feel precisely what belongs to you and what does not, and you recognise the difference between free choice and inherited compliance.',
    prompt: 'What did you build because others expected it — and what do you feel is truly yours alone?',
  },

  // ── Phase 35–42 ────────────────────────────────────────────────────────
  {
    sortAge: 35,
    type: 'phase',
    ageLabel: '35–42',
    age: [35, 42],
    name: 'The Jupiter Phase',
    svgKey: 'jupiter',
    planet: 'Jupiter',
    theme: 'Midlife · Expansion or Revision',
    body:
      'The true midlife — psychological and analytical capacities reach their peak, and the person possesses enough experience to see their personal pattern clearly for the first time. ' +
      'The re-evaluation phase: the person begins examining the fruits of what they planted in the past two decades — what gave genuine satisfaction and what gave image without substance. ' +
      'In Huber\'s system, the low point around age 36 is a moment of quiet internal review — a phase of the unexpected and spiritual recovery before the next departure. ' +
      'Jupiter pushes toward expansion and adventure — but in this phase the real expansion is internal: self-understanding and not merely external addition. ' +
      'The approaching Uranus Opposition (~42) looms on the horizon as a cosmic call to awakening and authenticity — and this phase is the preparation for it.',
  },

  // ── Transit: Jupiter Return 4 (~36) ─────────────────────────────────────
  {
    sortAge: 36,
    type: 'transit',
    ageLabel: 'age ~36',
    age: [35.5, 36.5],
    name: 'Fourth Jupiter Return',
    svgKey: 'jupiter',
    planet: 'Jupiter',
    theme: 'Midlife expansion',
    body:
      'The fourth Jupiter Return falls at the heart of the Jupiter phase (35–42) and carries with it qualitative expansion energy — not merely expansion of knowledge but of the overall vision of life. ' +
      'This return coincides with the moment Steiner described when the associative centres in the brain reached maximum efficiency — making this age the age of great intellectual production. ' +
      'Jupiter invites at this moment a review of personal philosophy: are the beliefs you carry ones you chose yourself or inherited without examination? ' +
      'Many thinkers and artists witness at this age a qualitative leap — a mature idea born after years of quiet gestation. ' +
      'This return represents a bridge between what you accomplished in your thirties and what you will build in the coming decade — and the clarity you gain now will determine how you navigate the Uranus Opposition.',
    prompt: 'What idea or vision is maturing inside you now and is waiting for space to emerge?',
  },

  // ── Transit: Uranus Opposition (~42) ───────────────────────────────────
  {
    sortAge: 42,
    type: 'transit',
    ageLabel: 'age ~42',
    age: [40, 44],
    name: 'Uranus Opposition',
    svgKey: 'uranus',
    planet: 'Uranus',
    theme: 'Midlife awakening',
    body:
      'When Uranus reaches opposition to its natal position — between ages 40 and 42 — the deepest earthquake of midlife arrives: not the "midlife crisis" in the mocking sense but a cosmic call asking: "Did you live your life or someone else\'s?" ' +
      'Uranus is the higher octave of Mercury — the revolutionary consciousness that breaks old moulds; every social mask becomes unbearably heavy at this moment. ' +
      'What appears as destruction and dissolution in this phase is often understood later as an awakening toward authenticity — from the burning of what was borrowed appears what is real. ' +
      'In Steiner\'s system the "solar half" of life begins here — where the developmental phases reverse: what was built spontaneously in childhood is now rebuilt with conscious and free will. ' +
      'The deepest question in this phase is not "what do I want?" but "what does the spiritual being I am want from this life?"',
    prompt: 'What do you know about yourself now that you did not dare face in your twenties?',
  },

  // ── Phase 42–49 ────────────────────────────────────────────────────────
  {
    sortAge: 42,
    type: 'phase',
    ageLabel: '42–49',
    age: [42, 49],
    name: 'The Saturn Phase',
    svgKey: 'saturn',
    planet: 'Saturn',
    theme: 'Wisdom and Conscious Giving',
    body:
      'After the earthquake of the Uranus Opposition you enter a phase of intensifying and purifying identity — ambition shifts from quantitative to qualitative, and physical forces may slightly recede but spiritual and intellectual forces rise. ' +
      'Steiner described it as the phase of the "consciousness soul" — where the person begins to live from earned wisdom rather than borrowed ambition, and begins to give back to the community what they have learned. ' +
      'In the system of developmental progression, these years mirror the 0–7 phase with awareness: what the body built spontaneously in childhood, the mature person rebuilds with conscious and chosen will. ' +
      'Saturn teaches here the art of wise boundaries — knowing what to accept and what to refuse, what to give and what to keep; this discernment is the difference between exhausting giving and life-giving giving. ' +
      'The second Saturn Return (~58–59) awaits on the horizon as the moment of final harvest of all that was planted in this phase.',
  },

  // ── Transit: Chiron Return (~50) ───────────────────────────────────────
  {
    sortAge: 50,
    type: 'transit',
    ageLabel: 'age ~50',
    age: [49, 51],
    name: 'Chiron Return',
    svgKey: 'chiron',
    planet: 'Chiron',
    theme: 'The Teaching Wound',
    body:
      'The Chiron Return — the small planet that represents the "teaching wound" — occurs around age fifty and carries an invitation to face the deepest wound that has not yet been healed. ' +
      'Chiron in Greek mythology is the healer who heals others but cannot heal himself — yet his own wound transforms into the greatest source of his wisdom and compassion. ' +
      'In this return the person is called not to erase their old wound but to transform it: from a source of pain to a source of understanding, mercy, and the deepest forms of giving. ' +
      'The school of spiritual psychoanalysis sees in this moment the key to the hidden biography — what was unresolved in childhood and upbringing surfaces now requesting recognition and integration. ' +
      'Those who face the Chiron wound with courage transform into healers and guides by lived experience — not by degrees and theories — and this is the deepest form of learning and influence.',
    prompt: 'What old wound do you now carry as wisdom rather than burden?',
  },

  // ── Phase 49–56 ────────────────────────────────────────────────────────
  {
    sortAge: 49,
    type: 'phase',
    ageLabel: '49–56',
    age: [49, 56],
    name: 'The Uranus Phase',
    svgKey: 'uranus',
    planet: 'Uranus',
    theme: 'Second Authenticity',
    body:
      'The return to the self after decades of external commitments — this is the phase of quiet honesty where you transcend others\' opinions and offer what you believe in without apology. ' +
      'Steiner described it as the second round of the adolescent phase but with mature consciousness — the existential questions the young person raised at fourteen return now but with the possibility of a deeper answer. ' +
      'Sometimes this phase takes the form of a radical transformation in career or lifestyle; sometimes it takes the form of deeper rootedness in what you have always been — but now with conscious choice rather than the force of circumstance. ' +
      'Uranus\'s great gift in this phase is freedom from the need for social recognition — the person begins to act from inner conviction rather than the expectations of their environment. ' +
      'Those who pass through this phase honestly prepare themselves for the coming Neptune phase — where spiritual dissolving becomes a blessing rather than a loss.',
  },

  // ── Phase 56–63 ────────────────────────────────────────────────────────
  {
    sortAge: 56,
    type: 'phase',
    ageLabel: '56–63',
    age: [56, 63],
    name: 'The Neptune Phase',
    svgKey: 'neptune',
    planet: 'Neptune',
    theme: 'Dissolution and Spirituality',
    body:
      'The boundaries between the ego and the world begin to thin — and this is not weakness but spiritual readiness for a deeper phase of cosmic connection. ' +
      'Carl Jung described this phase as "individuation" — the process of discovering that the human being is an independent entity at its core but connected to the whole simultaneously. ' +
      'Art, meditation, faith, and service are the natural languages of this phase; the mind slightly recedes to make room for intuition and holistic knowing. ' +
      'Neptune teaches the art of conscious surrender — not yielding from weakness but harmonising with the current of life from strength and serenity. ' +
      'Steiner described this phase as the beginning of direct spiritual awareness — the person begins to perceive that their life is part of a cosmic symphony larger and more beautiful than they imagined.',
  },

  // ── Transit: Saturn Return 2 (~59) ─────────────────────────────────────
  {
    sortAge: 59,
    type: 'transit',
    ageLabel: 'age ~59',
    age: [57.5, 60.5],
    name: 'Second Saturn Return',
    svgKey: 'saturn',
    planet: 'Saturn',
    theme: 'Harvest and Legacy',
    body:
      'The second Saturn Return — between ages 58 and 60 — is the moment of great harvest: if the first return was a question about the foundation, the second asks about the fruit: "What did you plant in thirty years — and what has ripened?" ' +
      'In the Anthroposophical view this phase falls within the "spirit soul" — where the person begins to live from deep wisdom rather than ambition, and from giving rather than acquiring. ' +
      'Saturn opens here the door of the inner teacher — wisdom gained from painful and joyful lived experience alike, not from books and theories. ' +
      'Those who resist this transformation suffer from rigidity and painful nostalgia for the past; those who embrace it enter a phase of deep giving and inner calm they have not known before. ' +
      'The sense of touch speaks here in its deepest form: you know precisely what belongs to you and what does not, and you stop fighting for what is not yours.',
    prompt: 'What wisdom did you gain through painful experience — and how will you pass it on to those who come after you?',
  },

  // ── Phase 63–70 ────────────────────────────────────────────────────────
  {
    sortAge: 63,
    type: 'phase',
    ageLabel: '63–70',
    age: [63, 70],
    name: 'The Pluto Phase',
    svgKey: 'pluto',
    planet: 'Pluto',
    theme: 'Deep Transformation and Legacy',
    body:
      'The phase of the final radical transformation of identity — what does not serve the soul dies willingly or reluctantly, and what is essential is reborn in its purest form. ' +
      'Pluto represents the force of death and resurrection simultaneously — and this phase brings the person face to face with inevitability in a way not possible at an earlier age. ' +
      'Steiner described this phase as the moment of "complete individuation" in Jung\'s term — the person realises they are a distinct individual while also part of a whole that transcends them. ' +
      'Openness to human relationships deepens here — less competitive and more accepting of difference; coming generations become a subject of genuine interest, not merely an extension of the self. ' +
      'Those who pass through this phase with awareness become guardians of living memory and a bridge between past and future — and this is among the noblest things a human being can be.',
  },
];

// Sort chronologically; ties: phases before transits
UNIFIED_TIMELINE.sort((a, b) => {
  if (a.sortAge !== b.sortAge) return a.sortAge - b.sortAge;
  if (a.type !== b.type) return a.type === 'phase' ? -1 : 1;
  return 0;
});

// ─── Legacy exports (kept for compatibility with other pages) ──────────────
export interface Phase {
  range: string;
  age: [number, number];
  name: string;
  svgKey: string;
  planet: string;
  theme: string;
  body: string;
  current?: boolean;
  currentAge?: number;
}

export interface GreatTransit {
  name: string;
  year: string;
  age: string;
  status: 'past' | 'next' | 'later';
  svgKey: string;
  planet: string;
  intro: string;
  body: string;
  prompt: string;
}

export const PB_PHASES: Phase[] = UNIFIED_TIMELINE
  .filter(i => i.type === 'phase')
  .map(i => ({
    range: i.ageLabel,
    age: i.age,
    name: i.name,
    svgKey: i.svgKey,
    planet: i.planet,
    theme: i.theme,
    body: i.body,
  }));

export const PB_TRANSITS: GreatTransit[] = [
  {
    name: 'First Jupiter Return',
    year: '~age 12',
    age: 'age ~12',
    status: 'past',
    svgKey: 'jupiter',
    planet: 'Jupiter',
    intro: 'When Jupiter completes its full orbit around age twelve, the child passes through the first moment of real expansion of consciousness.',
    body: UNIFIED_TIMELINE.find(i => i.name === 'First Jupiter Return')?.body ?? '',
    prompt: 'What inspired you in your later childhood — and is it still alive in you?',
  },
  {
    name: 'First Saturn Opposition',
    year: '~age 14.5',
    age: 'age ~14.5',
    status: 'past',
    svgKey: 'saturn',
    planet: 'Saturn',
    intro: 'When Saturn reaches opposition to its natal position — around age fourteen — the first real test of identity begins.',
    body: UNIFIED_TIMELINE.find(i => i.name === 'First Saturn Opposition')?.body ?? '',
    prompt: 'What boundaries did you discover in your adolescence — and which ones still govern you without your realising it?',
  },
  {
    name: 'First Saturn Return',
    year: '~age 29.5',
    age: 'age ~29.5',
    status: 'past',
    svgKey: 'saturn',
    planet: 'Saturn',
    intro: 'The first Saturn Return is the most important cosmic event in the first half of life.',
    body: UNIFIED_TIMELINE.find(i => i.name === 'First Saturn Return')?.body ?? '',
    prompt: 'What did you build because others expected it — and what do you feel is truly yours alone?',
  },
  {
    name: 'Uranus Opposition',
    year: '~age 42',
    age: 'age ~42',
    status: 'next',
    svgKey: 'uranus',
    planet: 'Uranus',
    intro: 'When Uranus reaches opposition to its natal position — around age 42 — the deepest earthquake of midlife arrives.',
    body: UNIFIED_TIMELINE.find(i => i.name === 'Uranus Opposition')?.body ?? '',
    prompt: 'What do you know about yourself now that you did not dare face in your twenties?',
  },
  {
    name: 'Second Saturn Return',
    year: '~age 59',
    age: 'age ~59',
    status: 'later',
    svgKey: 'saturn',
    planet: 'Saturn',
    intro: 'The second Saturn Return — around ages 58 to 60 — is the moment of great harvest.',
    body: UNIFIED_TIMELINE.find(i => i.name === 'Second Saturn Return')?.body ?? '',
    prompt: 'What wisdom did you gain through painful experience — and how will you pass it on to those who come after you?',
  },
];

export type PhaseStatus = 'current' | 'next' | 'past';

export function pbStatus(p: Phase, currentAge = 36): PhaseStatus {
  if (p.current) return 'current';
  if (currentAge < p.age[0]) return 'next';
  if (currentAge >= p.age[1]) return 'past';
  return 'current';
}

export function statusLabel(s: PhaseStatus): string {
  return s === 'current' ? 'Now' : s === 'next' ? 'Next' : 'Past';
}

export function statusColor(s: PhaseStatus): string {
  return s === 'current' ? '#E9785E' : s === 'past' ? '#5C5C7A' : '#2A2F66';
}
