/**
 * Zodiacal Senses & Organic Correspondences
 *
 * Extracted from: resources/cosmological-system.html
 *   Panel 5 — Senses & Signs (GA 265a, Cologne 1913; GA 169)
 *   Panel 6 — Organic Correspondences (GA 128, GA 348, GA 312)
 *
 * ZODIACAL_SENSES: one entry per zodiac sign, linking each sign to the Steiner
 * twelve-sense faculty it governs, including transit awakening language.
 *
 * ORGANIC_CORRESPONDENCES: sphere-organ-metal table for all ten spheres
 * (7 classical + 3 outer). Entries where isInference = true are extensions
 * of the system's internal logic, NOT direct Steiner teaching.
 */

export interface ZodiacalSenseEntry {
  /** Tropical zodiac sign name */
  sign: string;
  /** English sense name as used in the source */
  sense: string;
  /** German Steiner original term */
  senseGerman: string;
  /** Phenomenological quality of the sense faculty */
  quality: string;
  /** Transit awakening language — what activates in the soul when a sphere transits this sign */
  transitAwakening: string;
  /** Day (upper/spiritual-social) | Night (lower/body-directed) | Soul (middle register) */
  dayNight: 'Day' | 'Night' | 'Soul';
  /** Primary body region built by this sign's forces */
  bodyRegion: string;
}

export const ZODIACAL_SENSES: ZodiacalSenseEntry[] = [
  {
    sign: 'Aries',
    sense: 'Sense of self · I-sense',
    senseGerman: 'Ich-Sinn',
    quality:
      'Direct perception of another individuality as a genuine spiritual being; feeling the presence of an I in another person, distinct from all impression of their personality',
    transitAwakening:
      'Sphere transiting Aries activates the question of genuine self-recognition and genuine recognition of the other; the I confronts itself in what it meets',
    dayNight: 'Day',
    bodyRegion: 'Head — the originating head-impulse; seat of undifferentiated, initiating thought',
  },
  {
    sign: 'Taurus',
    sense: 'Sense of life · Vitality sense',
    senseGerman: 'Lebenssinn',
    quality:
      'The inner feeling of well-being or its absence — freshness, exhaustion, health, disease; the etheric body reporting on its own state from moment to moment',
    transitAwakening:
      'Sphere transiting Taurus activates the etheric body\'s report; bodily wisdom and physical vitality become the primary subject of the soul\'s attention',
    dayNight: 'Night',
    bodyRegion: 'Throat and voice; the organ of beauty as cosmic substance rather than aesthetic preference',
  },
  {
    sign: 'Gemini',
    sense: 'Sense of thought · Conceptual sense',
    senseGerman: 'Gedankensinn',
    quality:
      'Perception of the living concept within another\'s speech — not the sound but the actual thought-being living within words; genuine understanding of another\'s meaning as distinct from their expression',
    transitAwakening:
      'Sphere transiting Gemini tests whether we are meeting actual thoughts or merely sounds; the quality of genuine intellectual encounter in the soul\'s daily life',
    dayNight: 'Day',
    bodyRegion: 'Lungs and breath — the mediating rhythm between inner and outer; language as audible cosmic thinking',
  },
  {
    sign: 'Cancer',
    sense: 'Sense of touch',
    senseGerman: 'Tastsinn',
    quality:
      'The turning inward — perception of resistance, hardness, softness; the precise boundary where the self meets the world and discovers its own edges for the first time or the hundredth',
    transitAwakening:
      'Sphere transiting Cancer activates boundary-consciousness; the biographical question of where the self ends and the world begins becomes urgent and real',
    dayNight: 'Night',
    bodyRegion: 'Chest and rhythmic system — mediating between thinking and willing; the protective enclosure of soul',
  },
  {
    sign: 'Leo',
    sense: 'Sense of vital warmth · Solar vitality',
    senseGerman: 'Lebenswärmesinn',
    quality:
      'The felt quality of life-warmth radiating from one\'s own solar center; the direct sense of being genuinely alive and present rather than performing aliveness',
    transitAwakening:
      'Sphere transiting Leo activates the question of genuine self-expression versus performance; the solar vitality either flows naturally or is revealed as blocked',
    dayNight: 'Soul',
    bodyRegion: 'Heart region — the solar center where the I\'s organizing intelligence manifests in bodily form',
  },
  {
    sign: 'Virgo',
    sense: 'Sense of motion · Proprioception',
    senseGerman: 'Bewegungssinn',
    quality:
      'Perception of one\'s own movement — the felt sense of joints, muscles, the body\'s gesture through space; bodily self-knowledge that arrives only through action, not through observation',
    transitAwakening:
      'Sphere transiting Virgo activates the body\'s movement-intelligence; the practitioner\'s relationship to their own daily gestures, rhythms, and the intelligence stored in the body\'s habitual patterns',
    dayNight: 'Night',
    bodyRegion: 'Intestinal system — the organ of discernment at the cellular and spiritual level',
  },
  {
    sign: 'Libra',
    sense: 'Sense of balance · Equilibrium',
    senseGerman: 'Gleichgewichtssinn',
    quality:
      'The capacity to find one\'s right position in three-dimensional space — the vestibular intelligence; the felt sense of being properly oriented in the world, and the immediate recognition of when that orientation has been lost',
    transitAwakening:
      'Sphere transiting Libra tests the soul\'s actual relationship to relational balance; what is genuinely out of equilibrium in the I\'s relation to others becomes visible and unable to be avoided',
    dayNight: 'Night',
    bodyRegion: 'Kidneys — the cosmic balancing system between the two great organ-poles of the human constitution',
  },
  {
    sign: 'Scorpio',
    sense: 'Sense of smell',
    senseGerman: 'Geruchssinn',
    quality:
      'The outer sense most deeply penetrating the life processes; smell most directly contacts the etheric forces of substances; the sense most associated with instinctive soul-knowledge that bypasses analysis. Steiner: the most dangerous sense for spiritual work.',
    transitAwakening:
      'Sphere transiting Scorpio activates the instinctive knowing that lives below conscious awareness; the olfactory-spiritual faculty of recognition that does not wait for the mind to confirm it',
    dayNight: 'Soul',
    bodyRegion: 'Reproductive and eliminative systems — the death-regeneration forces; the zone of conscious descent and initiation',
  },
  {
    sign: 'Sagittarius',
    sense: 'Sense of taste',
    senseGerman: 'Geschmackssinn',
    quality:
      'The capacity to discriminate essence from surface in everything that nourishes — food, ideas, philosophies, relationships; the sense that knows what genuinely feeds the soul versus what only appears to and depletes it',
    transitAwakening:
      'Sphere transiting Sagittarius activates the soul\'s capacity for genuine philosophical discernment; hunger for what truly nourishes, and the capacity to distinguish real wisdom from its sophisticated imitation',
    dayNight: 'Soul',
    bodyRegion: 'Hips — the centauric region where animal drive and spiritual aspiration are held in the same form; the archer\'s base',
  },
  {
    sign: 'Capricorn',
    sense: 'Sense of sight · Vision',
    senseGerman: 'Gesichtssinn',
    quality:
      'The most spatially objective of the outer senses; perceiving color and form at a distance; the sense that most fully confronts the objective world in its genuine otherness, unchanged by the soul\'s desire to see otherwise',
    transitAwakening:
      'Sphere transiting Capricorn activates the capacity to see clearly — what has been avoided seeing, what the I\'s will-force now demands be looked at directly rather than circled around indefinitely',
    dayNight: 'Soul',
    bodyRegion: 'Bones and skeletal structure — the body\'s structural crystallization; time recorded in mineral form',
  },
  {
    sign: 'Aquarius',
    sense: 'Sense of warmth · Temperature',
    senseGerman: 'Wärmesinn',
    quality:
      'The capacity to register flowing warmth and cold — both physical and moral; warmth as a soul event rather than merely a skin event; Steiner: "like flowing water that rises and falls" with the currents of what is genuinely warm and what has grown cold',
    transitAwakening:
      'Sphere transiting Aquarius activates sensitivity to moral warmth and cold in the social environment; the soul becomes a thermometer of the collective\'s spiritual temperature and cannot pretend otherwise',
    dayNight: 'Soul',
    bodyRegion: 'Circulation and lower legs — the Water-Bearer\'s stream; the social distribution of cosmic intelligence',
  },
  {
    sign: 'Pisces',
    sense: 'Sense of hearing · Tone sense',
    senseGerman: 'Gehörsinn',
    quality:
      'The sense that most completely dissolves the self into what is perceived — genuine hearing requires the dissolution of personal agenda; Steiner: Pisces was named by occultists in relation to the sense of hearing because of this quality of self-dissolution in what is received',
    transitAwakening:
      'Sphere transiting Pisces activates the capacity to genuinely hear — the soul is asked to dissolve its own noise and receive what the cosmic environment is actually communicating rather than what the I wishes to hear',
    dayNight: 'Soul',
    bodyRegion: 'Feet — the gate of departing incarnation; the two fish oriented in opposite directions, bound by a single cord of destiny',
  },
];

// ---------------------------------------------------------------------------

export interface OrganicCorrespondenceEntry {
  /** Planet / sphere name */
  planet: string;
  /** Primary organ(s) as named in GA 128 / GA 348 */
  primaryOrgan: string;
  /** Organic system description (prose from source) */
  system: string;
  /** Metal correspondence (classical or "none") */
  metal: string;
  /** Body member / soul-spirit member activated */
  bodyMember: string;
  /**
   * Developmental note — full prose from source, including Steiner citations
   * and (for outer three) explicit inference flags
   */
  developmentNote: string;
  /**
   * true  = outer three spheres; organ connection is a reasoned inference from
   *         the system's internal logic, NOT direct Steiner teaching
   * false = seven classical spheres; direct Steiner citation available
   */
  isInference: boolean;
}

export const ORGANIC_CORRESPONDENCES: OrganicCorrespondenceEntry[] = [
  {
    planet: 'Sun',
    primaryOrgan: 'Heart · Blood system',
    system:
      'The cardiovascular circulation as a whole; the central rhythmic system of the body; the organ where the I\'s organizing intelligence manifests most directly in living bodily form',
    metal: 'Gold · Aurum',
    bodyMember: 'The I (Ego); Consciousness Soul',
    developmentNote:
      'Steiner: "the heart is not merely a pump driving blood through the body." The heart is a center where blood from different parts of the body meet — an organ of reception and encounter, not of mechanical forcing. Emotional security and solar vitality are physically unified here. Gold as Aurum metallicum strengthens the I\'s organizing forces.',
    isInference: false,
  },
  {
    planet: 'Moon',
    primaryOrgan: 'Brain · Reproductive system',
    system:
      'Nerve-sense system (upper pole) and reproductive forces (lower pole); both governed by the Moon\'s dual dominion over form and memory; the two poles of a single cosmic principle',
    metal: 'Silver · Argentum',
    bodyMember: 'Etheric body; Sentient Soul\'s habitual life',
    developmentNote:
      'The brain is the Moon organ of the nerve-sense pole; the reproductive system mirrors it below. In Steiner\'s teaching the brain thinks by virtue of a dying process — consciousness arises in the wake of living forces becoming quiescent. The Moon forces work through this polarity of memory and generation simultaneously. Silver supports nerve and brain function in Anthroposophic medicine.',
    isInference: false,
  },
  {
    planet: 'Mercury',
    primaryOrgan: 'Lungs · Respiratory system',
    system:
      'The mediating breath rhythm; the alternation of inspiration and expiration as the most accessible bodily microcosm of the Mercury sphere\'s coordinating intelligence; the lungs as the organ of cosmic-earthly exchange',
    metal: 'Quicksilver · Mercurius',
    bodyMember: 'Intellectual Soul; nerve-sense organization in its communicative dimension',
    developmentNote:
      'The lungs mediate between outer and inner just as Mercury mediates between cosmic intelligence and personal thinking. "Quicksilver processes have an affinity with the lungs through respiration." The breath rhythm is the body\'s living demonstration of mediation — receiving the world, transforming it, releasing it. Voice and conscious breathing are Mercury-sphere medicine.',
    isInference: false,
  },
  {
    planet: 'Venus',
    primaryOrgan: 'Kidneys · Filtration',
    system:
      'The kidney system as a balancing organ standing between the two great poles of human organic life; Venus-kidneys filter both physical toxins and accumulated soul residues that have crystallized into the life-processes',
    metal: 'Copper · Cuprum',
    bodyMember: "Astral body (harmonizing); Sentient Soul's love-capacity",
    developmentNote:
      'Steiner (GA 128): "the kidney-system… disposes of the excess which would result from the inharmonious interaction of the two other organ-systems." The kidneys in Occult Physiology stand as the mediating system between the liver-pole and the lung-pole. The Venus-force in the soul-life does the same: it processes what the I cannot yet integrate into its relational experience. Copper (Cuprum metallicum) aids kidney function and circulatory balance.',
    isInference: false,
  },
  {
    planet: 'Mars',
    primaryOrgan: 'Gall bladder · Bile',
    system:
      'Biliary system; iron in the blood; the muscular system as a whole; the forces of separation and discrimination at the most immediate metabolic level',
    metal: 'Iron · Ferrum',
    bodyMember: "Astral body (will dimension); physical body's force of movement",
    developmentNote:
      "The gall bladder produces bile — the body's most Mars-like substance: sharp, dissolving, separating what should be separated. Blocked Mars-force (unexpressed will, swallowed anger, suppressed initiative) tends to accumulate in the biliary system before manifesting in physical tension and inflammatory patterns. Iron (Ferrum phosphoricum) is used for inflammatory conditions and to strengthen the will-forces available to the physical constitution.",
    isInference: false,
  },
  {
    planet: 'Jupiter',
    primaryOrgan: 'Liver · Metabolic intelligence',
    system:
      'The liver as the organ of "wisdom-filled thinking" (Steiner); the great metabolic organizer; the organ that creates living substance from what is absorbed and governs the transformation of all that enters the organism',
    metal: 'Tin · Stannum',
    bodyMember: "Etheric body (wisdom-forming); Intellectual Soul's highest development",
    developmentNote:
      'The classical Hermetic formulation Steiner confirmed in GA 348: "Jupiter in the heavens is tin in the earth and the liver in man." The liver is the organ that knows how to use what it receives — the metabolic equivalent of genuine wisdom. It is the only organ that regenerates itself, which makes it the body\'s most Jupiter-like system. Tin (Stannum metallicum) supports liver health and helps bring thinking into living movement.',
    isInference: false,
  },
  {
    planet: 'Saturn',
    primaryOrgan: 'Spleen · Bones · Skin',
    system:
      'The spleen as cosmic memory organ; the skeletal system as the body\'s structural architecture; the skin and connective tissue as the periphery of the organized body',
    metal: 'Lead · Plumbum',
    bodyMember: "Physical body's structure; the I's karmic crystallization in form",
    developmentNote:
      'Steiner (GA 128): "the spleen effect is called a Saturnian effect." The spleen governs the rhythmic ordering of the body\'s life-processes, regulating the cosmic irregularity of food intake into the body\'s own internal rhythmic system. The bones record time — they hold the biography in mineral form. Saturn in hard transit concentrates karmic curriculum in these structural systems. Lead (Plumbum metallicum) is used for grounding and treating sclerotic (hardening) conditions.',
    isInference: false,
  },
  {
    planet: 'Uranus',
    primaryOrgan: 'Nerve-sense (higher organization)',
    system:
      'The higher organization of the nerve-sense system beyond its personal function; electrical sensitivity; the nervous system as a receiver of collective evolutionary impulses that exceed individual biography',
    metal: 'None (no classical metal assigned)',
    bodyMember: "Spirit-Self development; Consciousness Soul's genuine independence",
    developmentNote:
      'Steiner does not assign Uranus a direct organ correspondence in the classical seven-sphere system. The association with higher nerve-sense organization is a reasonable inference from its Mercury-octave nature. In practice: individuals with prominent Uranus configurations often show unusual sensitivity in the nervous system — both as a gift (rapid perceptual responsiveness) and as a vulnerability (the nervous system cannot filter what it is registering).',
    isInference: true,
  },
  {
    planet: 'Neptune',
    primaryOrgan: 'Lymphatic system · Glandular',
    system:
      "The boundary-dissolving forces in the organic life; the glandular secretion system; the body's own relationship to the processes of dissolution and spiritual receptivity",
    metal: 'None (no classical metal assigned)',
    bodyMember: 'Life-Spirit (Buddhi) as distant horizon; collective soul-field',
    developmentNote:
      "The lymphatic system dissolves and transports — a physical analog of Neptune's dissolving function. The glandular secretion system communicates across the body through chemical signals rather than through nerve pathways, which mirrors Neptune's mode of influence (diffuse, pervasive, permeating rather than targeted). Steiner does not directly assign organs to the outer three spheres; these connections represent informed inference from the system's internal logic.",
    isInference: true,
  },
  {
    planet: 'Pluto',
    primaryOrgan: 'Reproductive · Regenerative cellular',
    system:
      "The death-and-regeneration forces at the organic level; the deepest cellular processes of renewal; the body's capacity to transform itself at its most fundamental level of living substance",
    metal: 'None (no classical metal assigned)',
    bodyMember: 'Spirit-Man (Atma) as distant horizon; forces operating at the level of evolutionary epochs',
    developmentNote:
      "The association of Pluto with the reproductive and regenerative cellular forces follows the internal logic of the system (Scorpio's domain). As with Neptune and Uranus: noted as inference from the system's own principles, not as Steiner's direct teaching. In practice: significant Pluto transits often concentrate in biographical experiences that involve the body's most fundamental processes of life, death, and cellular regeneration.",
    isInference: true,
  },
];
