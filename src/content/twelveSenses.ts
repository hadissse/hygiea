// NEVER_AI — All twelve-senses content is human-authored. No AI generation permitted here.
// Sources: Rudolf Steiner, GA 169 "Toward Imagination" (June 20 1916);
//          GA 170 "The Riddle of Humanity" (lectures VII and XIV, 1916);
//          GA 293 "The Study of Man" (lecture VIII, August 29 1919);
//          GA 206 "Man as a Being of Sense and Perception" (July 22 1921);
//          GA 265a "Lessons for the Participants of Cognitive-Cultic Work" (May 12 and 20, 1913).
// All available at rsarchive.org.

export type SenseGroup = 'will' | 'feeling' | 'knowledge';

export interface SteinerSense {
  number: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  name: string;
  /** Alternative or older naming used by Steiner in some lectures */
  alternativeNames: string[];
  group: SenseGroup;
  /**
   * Zodiacal correspondence from GA 265a (May 1913).
   * Steiner mapped each sense to a zodiacal sign in his esoteric school work.
   */
  zodiacalSign: string;
  /** What this sense perceives, in Steiner's terms */
  whatItPerceives: string;
  /** How it works — the organ, process, or medium */
  howItWorks: string;
  /**
   * Level of waking consciousness associated with this sense.
   * Steiner described a "night–twilight–day" gradient across the twelve.
   */
  consciousnessLevel: 'night (subconscious)' | 'twilight (semi-conscious)' | 'day (fully conscious)';
  /**
   * Biographical emphasis: which life phase tends to shape or stress this sense.
   * Steiner's will-senses are most formative in early childhood (0–7);
   * feeling-senses in the middle years of youth (7–21);
   * knowledge-senses reach their contemplative peak in adulthood.
   * These are developmental emphases, not exclusive windows.
   */
  biographicalEmphasis: 'early childhood (0–7)' | 'childhood and youth (7–21)' | 'adulthood (21+)';
  /**
   * Temperament tendency: one or two temperaments whose characteristic posture
   * resonates with the nature of this sense. (Steiner did not publish a definitive
   * mapping; these reflect the pedagogical consensus in Waldorf literature.)
   */
  temperamentTendency: string;
  /** A single yes/no question to help a practitioner assess this sense's development */
  selfAssessmentQuestion: string;
  /** Brief contemplative note for working with this sense */
  practiceNote: string;
}

export const TWELVE_SENSES: SteinerSense[] = [
  // ——— GROUP I: WILL SENSES (body-directed, largely subconscious) ———
  {
    number: 1,
    name: 'Touch',
    alternativeNames: ['Sense of touch', 'Taste sense (early nomenclature)'],
    group: 'will',
    zodiacalSign: 'Cancer',
    whatItPerceives:
      'The resistance, hardness, softness, and surface quality of material things at the point where self and world meet; the boundary between inner and outer.',
    howItWorks:
      'Through direct skin contact, the will of the organism meets the resistance of the external world. The sense is less a receptor of qualities than a mediator of encounter: it tells the self that an otherness exists. Impressions rarely rise into distinct memory; they sink quickly into the unconscious.',
    consciousnessLevel: 'night (subconscious)',
    biographicalEmphasis: 'early childhood (0–7)',
    temperamentTendency:
      'Melancholic (heightened sensitivity to contact, tendency toward withdrawal) and phlegmatic (comfortable dwelling in bodily sensation)',
    selfAssessmentQuestion:
      'When you shake someone\'s hand or pick up an object, do you actually feel its specific texture and temperature — or does the sensation vanish immediately into function?',
    practiceNote:
      'Hold an unfamiliar object with closed eyes for one minute. Attend only to surface: grain, temperature, edge. Let no word arise yet.',
  },
  {
    number: 2,
    name: 'Life',
    alternativeNames: ['Life sense', 'Sense of vitality', 'Vital sense'],
    group: 'will',
    zodiacalSign: 'Leo',
    whatItPerceives:
      'The overall condition of one\'s own organism: wellbeing, fatigue, hunger, freshness, depression, or vitality. It is the perception of how the organs are functioning as a whole.',
    howItWorks:
      'Unlike the other senses, the life sense has no single organ; the entire organism is its organ. It remains largely subconscious in health — we notice it only when disturbed by pain, illness, or unusual vitality. It is the body\'s self-report to the soul.',
    consciousnessLevel: 'night (subconscious)',
    biographicalEmphasis: 'early childhood (0–7)',
    temperamentTendency:
      'Phlegmatic (comfort in bodily ease, difficulty noticing subtle imbalances) and melancholic (acute suffering when the life sense is disturbed)',
    selfAssessmentQuestion:
      'At the end of a day, can you tell specifically where in your body you feel drained versus where you feel alive — without resorting to thought or mental review?',
    practiceNote:
      'Once each day, before rising from sleep, scan the body as a whole. Name no problem; simply register the overall quality — as you would register the weather before stepping outside.',
  },
  {
    number: 3,
    name: 'Self-Movement',
    alternativeNames: ['Sense of movement', 'Kinesthetic sense', 'Movement sense'],
    group: 'will',
    zodiacalSign: 'Virgo',
    whatItPerceives:
      'One\'s own bodily movement and position: the awareness that the body is in motion, at rest, or changing posture. It distinguishes stillness from movement without reference to external landmarks.',
    howItWorks:
      'Steiner locates this sense in the joints and muscle-tendon system. We walk largely unconsciously; the sense of self-movement operates below ordinary awareness. When it is well developed, it allows the body to "think" geometrically — the movement sense, not the eye, perceives the form of a circle drawn in the air.',
    consciousnessLevel: 'night (subconscious)',
    biographicalEmphasis: 'early childhood (0–7)',
    temperamentTendency:
      'Sanguine (ease and grace of movement, fluid adaptation) and choleric (purposeful, forceful directedness in gesture)',
    selfAssessmentQuestion:
      'Without looking, can you feel precisely where your hands are right now — their angle, tension, and the weight they carry?',
    practiceNote:
      'Walk one short distance (even ten steps) with full attention on the sensation of movement itself — the shift of weight, the moment of lift, the moment of landing. No destination; only the movement.',
  },
  {
    number: 4,
    name: 'Balance',
    alternativeNames: ['Sense of balance', 'Sense of equilibrium'],
    group: 'will',
    zodiacalSign: 'Libra',
    whatItPerceives:
      'One\'s orientation and equilibrium in three-dimensional space: the sense that tells the organism whether it is upright, tilted, or falling, independent of vision.',
    howItWorks:
      'The organ is the vestibular system — the three semicircular canals of the inner ear, oriented in three planes of space. The sense is acquired gradually through infancy as the child learns to stand and walk. Steiner notes that destroying this organ causes falling just as destroying the eye prevents colour perception. In health, it remains in "the night of consciousness."',
    consciousnessLevel: 'night (subconscious)',
    biographicalEmphasis: 'early childhood (0–7)',
    temperamentTendency:
      'Phlegmatic (stable, grounded, slow to be destabilised) and choleric (drive toward upright, dominating spatial presence)',
    selfAssessmentQuestion:
      'When you are emotionally unsettled, do you notice a corresponding physical experience of imbalance — dizziness, instability in the legs, or a need to hold something?',
    practiceNote:
      'Stand on one foot for thirty seconds. Notice what the body does to maintain equilibrium, not what you think it should do. The adjustments are the message.',
  },

  // ——— GROUP II: FEELING SENSES (soul-directed, semi-conscious) ———
  {
    number: 5,
    name: 'Smell',
    alternativeNames: ['Olfactory sense'],
    group: 'feeling',
    zodiacalSign: 'Scorpio',
    whatItPerceives:
      'Volatile substances diffused through the air that carry an aromatic quality — the "soul" of a substance as it dissolves into the surrounding atmosphere.',
    howItWorks:
      'Steiner describes smell as the sense requiring the deepest immersion into bodily life: the organism must be temporarily penetrated by the substance. Soul processes connected to smell rarely rise into clear consciousness; they surface unexpectedly — in musicians, he notes, as sudden inspiration. He calls smell "the most dangerous sense" when relating to certain spiritual entities, indicating its deep affinity with elemental forces.',
    consciousnessLevel: 'twilight (semi-conscious)',
    biographicalEmphasis: 'childhood and youth (7–21)',
    temperamentTendency:
      'Melancholic (sensitive to olfactory impressions as carriers of memory and mood) and sanguine (pleasure in fragrant variety, difficulty sustaining olfactory attention)',
    selfAssessmentQuestion:
      'Can you tell, by smell alone, whether a room you enter is lived-in and warm or cold and unused?',
    practiceNote:
      'Choose one natural scent — fresh earth, a herb, a wood. Hold it to the nose for thirty seconds. Let no association arise. Notice only: is the smell approaching or receding? Does it change as you attend to it?',
  },
  {
    number: 6,
    name: 'Taste',
    alternativeNames: ['Gustatory sense'],
    group: 'feeling',
    zodiacalSign: 'Sagittarius',
    whatItPerceives:
      'The qualitative character of substances placed in contact with the tongue and mucous membranes: sweet, sour, salty, bitter, and their endless gradations. More broadly, the sense mediates between nourishment and soul.',
    howItWorks:
      'Steiner notes that taste exists in a twilight consciousness: most people want to taste again rather than retain the memory of a flavour, indicating how quickly the impression sinks beneath clear awareness. The sense mediates between the organism\'s needs and the outer substance, and has an intimate relationship with desire and satisfaction.',
    consciousnessLevel: 'twilight (semi-conscious)',
    biographicalEmphasis: 'childhood and youth (7–21)',
    temperamentTendency:
      'Sanguine (delight in variety and novelty of flavour) and phlegmatic (comfort in familiar, repeated flavours)',
    selfAssessmentQuestion:
      'When eating something simple — bread, an apple, water — do you taste it, or do you consume it while thinking of something else?',
    practiceNote:
      'Eat one mouthful of an ordinary food in complete silence, with full attention. Let it transform in the mouth. Notice when the taste changes. Do not swallow until the flavour has completed its arc.',
  },
  {
    number: 7,
    name: 'Sight',
    alternativeNames: ['Visual sense', 'Sense of colour'],
    group: 'feeling',
    zodiacalSign: 'Capricorn',
    whatItPerceives:
      'Colour and light. Steiner is careful to distinguish: sight perceives colour, but perceives form only indirectly through the subconscious use of the sense of self-movement.',
    howItWorks:
      'This is the sense where, in Steiner\'s words, "the sun of consciousness rises" — where the soul enters full waking awareness. The eye is the organ. Steiner considers it a feeling sense, not a knowledge sense: colour perception is a meeting between the soul\'s feeling nature and the world\'s qualitative expression in light.',
    consciousnessLevel: 'day (fully conscious)',
    biographicalEmphasis: 'childhood and youth (7–21)',
    temperamentTendency:
      'Sanguine (lively responsiveness to colour and visual impression) and choleric (strong orientation by visual will and spatial clarity)',
    selfAssessmentQuestion:
      'When you see a colour that moves you — the blue of the sky, the red of autumn — do you pause and let it in, or does the intellectual name "blue" arrive before the experience does?',
    practiceNote:
      'Choose one colour in your environment. Sit with it for two minutes. Let no word for it arise. Notice whether your feeling changes as you look longer — whether the colour seems to deepen, warm, or expand.',
  },
  {
    number: 8,
    name: 'Warmth',
    alternativeNames: ['Thermal sense', 'Sense of warmth'],
    group: 'feeling',
    zodiacalSign: 'Aquarius',
    whatItPerceives:
      'Gradations of temperature in the environment and in other beings. More subtly, it perceives the qualitative warmth or cold that emanates from situations, relationships, and inner states.',
    howItWorks:
      'Distinct from touch, warmth perception involves the entire skin surface and also operates through the breathing and circulatory systems. Steiner compares it to "flowing water that rises and falls in waves." It belongs entirely to the feeling realm, bridging the outer thermal world and the inner warmth-organisation of the etheric body.',
    consciousnessLevel: 'day (fully conscious)',
    biographicalEmphasis: 'childhood and youth (7–21)',
    temperamentTendency:
      'Melancholic (acutely sensitive to cold, interprets atmospheric warmth as emotional tone) and sanguine (radiates warmth into social settings, quickly chilled when warmth is withdrawn)',
    selfAssessmentQuestion:
      'When you enter a room full of people, do you sense a quality of warmth or coldness in the social atmosphere — before any words are exchanged?',
    practiceNote:
      'Sit near a window on a cold or warm day. Place your hand near the glass without touching it. Feel the temperature gradient. Let it register as quality, not measurement. What does cool air meeting warm skin feel like as a fact, not a concept?',
  },

  // ——— GROUP III: KNOWLEDGE SENSES (spirit-directed, fully conscious) ———
  {
    number: 9,
    name: 'Hearing',
    alternativeNames: ['Auditory sense', 'Sense of sound'],
    group: 'knowledge',
    zodiacalSign: 'Pisces',
    whatItPerceives:
      'Sound vibrations: pitch, timbre, volume, and rhythmic structure. Hearing conveys the inner nature of things — what resonates inside an object comes out as sound.',
    howItWorks:
      'The ear is the organ. Steiner notes that hearing is distinct from the speech/language sense: hearing registers the acoustic phenomenon; the speech sense interprets the linguistic meaning. Through hearing, the soul becomes "all sound" — it vibrates with what it perceives in a way sight does not require.',
    consciousnessLevel: 'day (fully conscious)',
    biographicalEmphasis: 'adulthood (21+)',
    temperamentTendency:
      'Melancholic (depth of listening, tendency to be moved and affected by what is heard) and sanguine (delight in varied sound, susceptibility to being carried by music)',
    selfAssessmentQuestion:
      'Can you listen to a piece of music — or to silence — without your mind simultaneously forming commentary, memory, or plan?',
    practiceNote:
      'Sit in a space with ambient sound — a street, a garden, a quiet room. For three minutes, only listen. Name nothing. When a sound arises, let it pass without labelling it. Notice which sounds your attention habitually follows, and which it dismisses.',
  },
  {
    number: 10,
    name: 'Language',
    alternativeNames: ['Word sense', 'Speech sense', 'Sense of language', 'Sense of the word'],
    group: 'knowledge',
    zodiacalSign: 'Aries',
    whatItPerceives:
      'The meaning carried in spoken words and language — the difference between hearing a sound and understanding that it is a word. It perceives "language" as a spiritual reality, not merely an acoustic phenomenon.',
    howItWorks:
      'Steiner holds that even spatial gestures, mime, or body language could in principle be perceived by the language sense — it grasps the intention of communication, not only spoken sound. This sense stands at the zenith of inner life, between hearing and the thought sense. It is possible to perceive language in another\'s gesture just as easily as in their speech.',
    consciousnessLevel: 'day (fully conscious)',
    biographicalEmphasis: 'adulthood (21+)',
    temperamentTendency:
      'Sanguine (facility with language, pleasure in conversation) and choleric (drive to communicate with precision and effect)',
    selfAssessmentQuestion:
      'When someone speaks to you, do you hear the words — or do you hear what they are trying to say, which is sometimes different from the words?',
    practiceNote:
      'In one conversation today, listen past the words. Notice the pauses, the quality of the voice before the sentence forms, the gesture of the hands. What is being communicated that no word contains?',
  },
  {
    number: 11,
    name: 'Conceptual',
    alternativeNames: ['Thought sense', 'Sense of thought', 'Sense of ideas'],
    group: 'knowledge',
    zodiacalSign: 'Taurus',
    whatItPerceives:
      'The thoughts of other people — not one\'s own thoughts, but the concepts and ideas that live in another\'s mind, perceived as direct realities independent of the words in which they are clothed.',
    howItWorks:
      'Steiner criticised Eduard von Hartmann\'s claim that "nobody can look into another\'s consciousness," arguing that the thought sense is a direct perceptual organ, not an inferential one. Perceiving another\'s thought is, in principle, as direct as colour affecting the eye — there is no interpretation involved, only perception. The sense is underdeveloped in most people, who mistake their own projections for perception of others.',
    consciousnessLevel: 'day (fully conscious)',
    biographicalEmphasis: 'adulthood (21+)',
    temperamentTendency:
      'Melancholic (attentiveness to the ideas of others, susceptibility to being changed by encountering a new thought) and phlegmatic (slow but thorough reception of concepts)',
    selfAssessmentQuestion:
      'When someone explains their view to you, do you receive their actual thought — or do you immediately begin translating it into your own conceptual framework?',
    practiceNote:
      'After a conversation, write down in one sentence what the other person actually believed or meant — not what you agreed or disagreed with, but what their thought was. Read it the next day and ask: was that their thought or mine?',
  },
  {
    number: 12,
    name: 'Ego',
    alternativeNames: ['I-sense', 'Sense of the I', 'Sense of the self (of others)', 'Ego sense'],
    group: 'knowledge',
    zodiacalSign: 'Gemini',
    whatItPerceives:
      'The individuality — the "I" — of another person, not one\'s own self. Through this sense, one perceives that the being before you is an irreducible centre of consciousness, not merely a body or a set of behaviours.',
    howItWorks:
      'Steiner describes this as a "sleeping will" sense rather than a waking one: the soul temporarily vacates itself to receive the other\'s selfhood. He says "the love living in the other\'s soul is borne into your soul" through this sense. When this sense is active, genuine encounter occurs. When it is inactive, one meets only one\'s own image of the other. It requires a twofold movement: stepping out of one\'s own identity, and allowing the other\'s to enter.',
    consciousnessLevel: 'day (fully conscious)',
    biographicalEmphasis: 'adulthood (21+)',
    temperamentTendency:
      'Choleric (powerful encounter with other individualities, risk of projection) and melancholic (depth of genuine recognition, vulnerability in encounter)',
    selfAssessmentQuestion:
      'Can you think of someone in your life who consistently surprises you — someone who does or says something you could not have predicted? If yes, that is evidence the ego-sense is active. If everyone you know seems entirely predictable, it may not be.',
    practiceNote:
      'In one interaction today, try to hold the question: "What is this person\'s specific way of being in the world?" Not what they said or did, but the quality of the being behind it. Do not answer with a label or a type. Sit with the question as an open perception.',
  },
];

export type SenseName =
  | 'Touch'
  | 'Life'
  | 'Self-Movement'
  | 'Balance'
  | 'Smell'
  | 'Taste'
  | 'Sight'
  | 'Warmth'
  | 'Hearing'
  | 'Language'
  | 'Conceptual'
  | 'Ego';

/** Returns all senses belonging to a given group */
export function getSensesByGroup(group: SenseGroup): SteinerSense[] {
  return TWELVE_SENSES.filter((s) => s.group === group);
}

/** Returns a sense by its canonical number (1–12) */
export function getSenseByNumber(n: number): SteinerSense | undefined {
  return TWELVE_SENSES.find((s) => s.number === n);
}

/** Human-readable group labels */
export const SENSE_GROUP_LABELS: Record<SenseGroup, string> = {
  will: 'Will Senses (body-directed)',
  feeling: 'Feeling Senses (soul-directed)',
  knowledge: 'Knowledge Senses (spirit-directed)',
};
