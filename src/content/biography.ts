// NEVER_AI — All biographical phase content is human-authored.
// Sources: Rudolf Steiner's biographical science across multiple lecture cycles.
// Seven-year phase ages are approximate (Steiner: "with one person earlier, another later").

export interface BiographicalPhase {
  phase: number;         // 1-indexed
  ageRange: [number, number];
  name: string;
  subtitle: string;
  memberAwakening: string;
  planetaryCorrespondence: string;
  worldSentence: string;
  facultiesDeveloping: string;
  archetypeChallenge: string;
  practiceNote: string;  // how Hygiea's practices relate to this phase
  transitionMarker: string;
}

// NEVER_AI
export const BIOGRAPHICAL_PHASES: BiographicalPhase[] = [
  {
    phase: 1,
    ageRange: [0, 7],
    name: 'Coming Into the Body',
    subtitle: 'Formation of the Physical Instrument',
    memberAwakening: 'Physical Body',
    planetaryCorrespondence: 'Moon',
    worldSentence: 'The world is good.',
    facultiesDeveloping:
      'The physical body transforms from an inherited form into one that expresses the child\'s own individuality. Learning occurs entirely through imitation and unconscious participation. Will flows outward into the body and its formation. Walking, speech, and early thinking emerge as gifts. The change of teeth marks the completion of this work.',
    archetypeChallenge:
      'The quality of the physical and moral environment matters absolutely: the child\'s body literally shapes itself around the gestures, warmth, and moral tone it encounters. There is no inner shield yet.',
    practiceNote:
      'If you are in this phase: you are not in it as an adult reader. Adults working with early childhood memories may find this phase relevant to understanding formative patterns still active in the body.',
    transitionMarker: 'Change of teeth (~age 7): formative forces withdraw from body-building into memory and learning.',
  },
  {
    phase: 2,
    ageRange: [7, 14],
    name: 'The World of Feeling and Image',
    subtitle: 'Awakening of the Etheric Forces',
    memberAwakening: 'Etheric Body',
    planetaryCorrespondence: 'Mercury',
    worldSentence: 'The world is beautiful.',
    facultiesDeveloping:
      'The etheric body becomes independent, bringing genuine memory, the capacity for rhythm-based learning, and feeling as a guide to knowledge. Picture-thinking and imagination are the natural mode. The child learns through art, story, and rhythm. A trusted authority-figure (teacher, parent) acts as the model for what is true.',
    archetypeChallenge:
      'The feeling life must be nurtured without premature intellectualisation that would harden the still-fluid etheric forces before their time. Keeping wonder alive as a genuine mode of knowing.',
    practiceNote:
      'Adults returning to this phase in biographical work often find memories of either profound wonder or its premature closure. The exercises of positivity and open-mindedness have etheric resonance.',
    transitionMarker: 'Sexual maturity (~age 14): the astral body is born as an independent member, bringing self-consciousness and emotional turbulence.',
  },
  {
    phase: 3,
    ageRange: [14, 21],
    name: 'Awakening to the World',
    subtitle: 'Birth of the Astral Body',
    memberAwakening: 'Astral Body',
    planetaryCorrespondence: 'Venus',
    worldSentence: 'The world is true.',
    facultiesDeveloping:
      'Abstract thinking, independent judgment, and the capacity for ideals become available. The young person can now think about thinking, compare perspectives, and form convictions. A powerful longing for authenticity and meaning governs. The emotional life intensifies as desire and passion awaken in the newly independent astral body.',
    archetypeChallenge:
      'The strong awakening of desire and passion can disrupt the emerging capacity for objective thought. The challenge is forming genuine convictions without succumbing to the crowd or becoming isolated in rebellious individualism.',
    practiceNote:
      'The six exercises are particularly useful for adults carrying unresolved material from this phase — especially equanimity (for the astral turbulence) and positivity (for the cynicism that sometimes follows disappointed idealism).',
    transitionMarker: 'Age ~21: the Ego is born as an independent entity; the sentient soul phase begins.',
  },
  {
    phase: 4,
    ageRange: [21, 28],
    name: 'Birth of the Individual Self',
    subtitle: 'The Sentient Soul — Experience as Teacher',
    memberAwakening: 'Sentient Soul',
    planetaryCorrespondence: 'Sun',
    worldSentence: 'I am here. Now what?',
    facultiesDeveloping:
      'The Ego awakens as a genuine independent entity. Experience — rather than education or authority — becomes the primary teacher. The young adult enters the world and discovers through direct encounter who they are when freed from family and educational structures. The sentient soul processes experience through desire, aversion, and personal response.',
    archetypeChallenge:
      'The risk is remaining identified with immediate desires and preferences — mistaking the sentient soul for the full self. The healthy development is the gradual discovery that authentic individuality goes deeper than personal preference. Ages 31–33 (the Christ Years) are often a point of particular biographical intensity.',
    practiceNote:
      'The Soul Barometer is most useful in this phase for developing self-awareness without self-absorption. The evening Rückschau cultivates the habit of witnessing experience rather than only having it.',
    transitionMarker: 'Age ~28: the intellectual soul awakens; the Ego begins penetrating thinking rather than only feeling.',
  },
  {
    phase: 5,
    ageRange: [28, 35],
    name: 'The World Becomes Hard',
    subtitle: 'The Intellectual Soul — Responsibility and Reality',
    memberAwakening: 'Intellectual Soul',
    planetaryCorrespondence: 'Mars',
    worldSentence: 'I must find my way by my own light.',
    facultiesDeveloping:
      'The intellectual soul fully awakens: thinking becomes the primary instrument for engaging with reality. Career, family, and creative work demand sustained rational effort. The practitioner discovers that inspiration alone is insufficient — ideas must be carried through by will and sustained thinking. This is often the most creatively productive period of adult life.',
    archetypeChallenge:
      'Around age 28–35, the cosmic developmental forces that previously supported growth begin to withdraw. The individual must develop independently rather than drawing from unconscious cosmic reserves. The spiritual question begins to press: is my thinking touching something real, or only reflecting my own assumptions?',
    practiceNote:
      'Control of Thought (Exercise 1) and Control of Will (Exercise 2) are the specific exercises for this phase. The Soul Barometer helps navigate the period\'s characteristic oscillation between driven effort and exhaustion.',
    transitionMarker: 'Age ~35: the consciousness soul awakens; the midpoint of earthly life.',
  },
  {
    phase: 6,
    ageRange: [35, 42],
    name: 'Nothing Happens Unless I Make It Happen',
    subtitle: 'The Consciousness Soul — Awakening of Moral Will',
    memberAwakening: 'Consciousness Soul',
    planetaryCorrespondence: 'Jupiter',
    worldSentence: 'I must become the author of my own inner life.',
    facultiesDeveloping:
      'The consciousness soul awakens: the capacity for objective, independent moral thinking that operates independently of personal desire or inherited opinion. The practitioner begins to distinguish between what they truly know and what they merely believe. A genuine moral conscience emerges. The Ego begins its first transformation work on the soul members.',
    archetypeChallenge:
      'The midlife crisis — in its deepest form — is the consciousness soul forcing a confrontation with inauthenticity. The challenge is to face the gap between the self one has constructed and the self one actually is, without either despair or mere rearrangement of externals. Steiner: "Nothing happens anymore unless I make it happen."',
    practiceNote:
      'This is the phase for which Hygiea is most directly designed. The full practice loop (Threshold, daily exercises, Rückschau, Barometer) addresses the consciousness soul\'s central need: honest self-knowledge that is not self-justification.',
    transitionMarker: 'Age ~42: spirit-self begins its potential development; the Ego begins working on higher members.',
  },
  {
    phase: 7,
    ageRange: [42, 49],
    name: 'The World Turns Upside Down',
    subtitle: 'Spirit Self Phase — Transmutation of Experience',
    memberAwakening: 'Spirit Self (Manas)',
    planetaryCorrespondence: 'Saturn',
    worldSentence: 'What have I been given, and what can I now offer?',
    facultiesDeveloping:
      'The potential for spirit-self development opens: the Ego begins conscious transformation of the astral body — turning accumulated emotional and experiential material into genuine wisdom rather than mere opinion. Personal authority grounded in real experience becomes available. The practitioner may shift from building their life to contributing from it.',
    archetypeChallenge:
      'What previously felt like progress may now feel insufficient; earlier certainties may dissolve. The challenge is to undergo this dissolution not as loss but as alchemical transformation — to allow hardened structures to become ground for something genuinely spiritual.',
    practiceNote:
      'Open-Mindedness (Exercise 5) and Harmony (Exercise 6) are especially relevant. The Goethean observation mode can help re-sensitise perception that may have become overly conceptual.',
    transitionMarker: 'Age ~49: potential life-spirit development; the biographical "change of life."',
  },
  {
    phase: 8,
    ageRange: [49, 56],
    name: 'The World Becomes Harmonious',
    subtitle: 'Life Spirit Phase — Expertise and New Causes',
    memberAwakening: 'Life Spirit (Buddhi)',
    planetaryCorrespondence: 'Jupiter (second arc)',
    worldSentence: 'I know something real. It is time to give it.',
    facultiesDeveloping:
      'If development has proceeded organically, this phase brings genuine expertise — not mere accumulated facts but living understanding across domains. The practitioner may take up new causes or forms of service. Physical vitality may diminish while spiritual clarity deepens. The question of life\'s meaning becomes concrete and urgent.',
    archetypeChallenge:
      'The challenge is not to retreat into comfort or defensively protect established positions, but to remain genuinely generative — allowing the harvest of life to flow outward as contribution rather than calcifying into institutional conservatism.',
    practiceNote:
      'The Foundation Stone arc (four 90-day cycles) becomes particularly meaningful in this phase. The Inner Anatomy work with the twelve senses can deepen perception precisely when outer vitality naturally lessens.',
    transitionMarker: 'Age ~56: potential spirit-man development; phase of role modelling and embodied wisdom.',
  },
  {
    phase: 9,
    ageRange: [56, 63],
    name: 'The World Is Filled with Wisdom',
    subtitle: 'Spirit Man Phase — Healing Presence',
    memberAwakening: 'Spirit Man (Atma)',
    planetaryCorrespondence: 'Saturn (second arc)',
    worldSentence: 'I am a living bridge between what has been and what is coming.',
    facultiesDeveloping:
      'If preceding phases have been consciously lived, this phase brings the capacity to function as a healing force in communities — not through deliberate effort but through the quality of presence that accumulated transformation makes possible. Self-acceptance deepens. The practitioner becomes less attached to self-image and more concerned with serving what is genuinely needed.',
    archetypeChallenge:
      'To embody wisdom without rigidity — to be a model without becoming fixed, to offer what has been learned without insisting others follow the same path. The risk is premature withdrawal ("I\'ve done my part") or continued ego-driven striving that refuses life\'s natural completion.',
    practiceNote:
      'The Foundation Stone\'s Movement IV (the Turning Point) has particular resonance here. The inner life of the Rückschau deepens naturally at this phase into something closer to genuine spiritual review of a life.',
    transitionMarker: 'Age ~63: "Years of Grace" begin — freedom from developmental compulsion.',
  },
  {
    phase: 10,
    ageRange: [63, 999],
    name: 'Years of Grace',
    subtitle: 'Freedom to Be — Serving Humanity\'s Future',
    memberAwakening: 'Beyond the planetary spheres',
    planetaryCorrespondence: 'Free',
    worldSentence: 'The world is creative — and this is not all there is.',
    facultiesDeveloping:
      'The developmental compulsion of the seven-year phases relaxes. What remains is freedom — freedom from the urgent biological and biographical pressures that drove earlier decades. The elder\'s natural gift is spiritual intuition, perspective across long arcs of time, and the capacity to serve humanity\'s future without personal agenda.',
    archetypeChallenge:
      'To genuinely release accumulated wisdom into the stream of life — to trust that what has been lived and learned will find its proper recipients — without clinging to recognition or certainty about outcomes. Life becomes a seed planted for what comes after.',
    practiceNote:
      'The practice at this phase is the practice of a whole life. The six exercises remain but their quality changes: they are no longer disciplines for building something but expressions of what has already been built.',
    transitionMarker: 'Death and preparation for the next incarnation carry the fruits of this biography.',
  },
];

export function getBiographicalPhase(age: number): BiographicalPhase {
  const phase = BIOGRAPHICAL_PHASES.find(
    (p) => age >= p.ageRange[0] && (age < p.ageRange[1] || p.ageRange[1] === 999),
  );
  return phase ?? BIOGRAPHICAL_PHASES[BIOGRAPHICAL_PHASES.length - 1];
}

export function calculateAgeFromBirthDate(birthDate: {
  year: number;
  month: number;
  day: number;
}): number {
  const now = new Date();
  let age = now.getFullYear() - birthDate.year;
  const monthDiff = now.getMonth() + 1 - birthDate.month;
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.day)) {
    age -= 1;
  }
  return Math.max(0, age);
}

export function getBiographicalPhaseNumber(age: number): number {
  const phase = getBiographicalPhase(age);
  return phase.phase;
}
