// NEVER_AI — All placement content is human-authored.
// Anthroposophical spiritual-scientific framing, not conventional astrology.
// Each placement describes how a planetary principle expresses through a zodiacal quality —
// the sign modifying, not causing, the soul tendency.

export interface VoiceContent {
  obs: string;       // phenomenological observation — what is present to soul perception
  mean: string;      // Anthroposophical significance — the soul quality and its spiritual dimension
  shadow: string;    // the characteristic failure mode (Ahrimanic or Luciferic degeneration)
  q: string;         // self-assessment question
  practice?: string; // a specific counter-practice
  cycles?: [string, string][]; // legacy field — not used in Hygiea content
}

// Sign slugs indexed by signNumber (0 = Aries … 11 = Pisces).
export const SIGN_SLUGS = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
] as const;

export type SignSlug = typeof SIGN_SLUGS[number];

// Keyed by `planet:sign`.
const CONTENT: Record<string, VoiceContent> = {

  // ── SUN ────────────────────────────────────────────────────────────────────
  // The Ego principle — how the "I" force radiates into the world.

  'planet:sun:aries': {
    obs: 'An identity that moves before it thinks — the will reaches into the world before the reflective mind arrives. Initiative is not a choice here; it is the first impulse.',
    mean: 'The Ego in Aries meets the world as a fresh beginning. There is spiritual vitality in this directness: the force that can break through the crust of the past. In Steiner\'s terms, this placement has strong contact with the Spirits of Personality — beings of individual will.',
    shadow: 'The Luciferic risk: the self that acts from impulse loses contact with consequence. Initiative becomes imposition. The will that moves first and considers later can leave a trail of incomplete gestures.',
    q: 'When you act, do you act from genuine inner impulse or from the fear of being second?',
    practice: 'Control of Will: perform one deliberate act daily that has no external urgency. Practice completing what you begin.',
  },
  'planet:sun:taurus': {
    obs: 'An identity grounded in the physical and sensory — presence, steadiness, and a quality of patient accumulation. The self is most itself when building something that lasts.',
    mean: 'The Ego in Taurus carries the Ego\'s light through the earth element — through form, rhythm, and material faithfulness. The soul qualities cultivated here — patience, reliability — are etheric virtues, strengthening the life-body through consistency.',
    shadow: 'The Ahrimanic risk: the self that identifies with what it possesses and produces. Stability becomes rigidity; the reliable becomes the immovable.',
    q: 'Is your steadiness a gift to others, or a wall against what might change you?',
    practice: 'Open-Mindedness: regularly encounter one idea or perspective that your preferred world does not contain.',
  },
  'planet:sun:gemini': {
    obs: 'An identity at home in multiplicity — the self that is genuinely interested in everything, that moves between perspectives with ease. Thought is lived rather than concluded.',
    mean: 'The Ego in Gemini works through the Mercury principle — the mediating, communicating, connecting force. The strength here is the soul\'s natural participation in the world of ideas. The risk is that the Ego remains perpetually at the surface, never descending into the ground of its own being.',
    shadow: 'The Luciferic risk: the multiplicity of interest becomes a substitute for depth. Every position is relative; no position becomes real.',
    q: 'What do you know to be true — not as a preference, but as something you have tested in your own experience?',
    practice: 'Control of Thought: hold a single, freely chosen thought for five minutes without following its associations.',
  },
  'planet:sun:cancer': {
    obs: 'An identity formed through and for relationship — the self that is most alive in its care for others, that feels the boundary between self and other as porous and significant.',
    mean: 'The Ego in Cancer works through the Moon principle — memory, nourishment, the etheric forces of the home. The soul quality of genuine care is spiritually significant: it mirrors the cosmic principle of the Mother. Steiner associated Cancer with the forces that maintain individual form against the dissolving forces of the cosmos.',
    shadow: 'The Luciferic risk: the self that disappears into care for others — using service as a way of avoiding its own inner reckoning. Or the Ahrimanic inversion: a protective shell so thick that nothing genuine enters.',
    q: 'When you care for others, do you do so from fullness or from need?',
    practice: 'Equanimity: develop the capacity to feel fully without being swept away — to care without dissolving.',
  },
  'planet:sun:leo': {
    obs: 'An identity at home at the centre — the self that is most alive when it is seen, when its light is acknowledged. Generosity and pride live in the same house here.',
    mean: 'The Ego in Leo works through the Sun principle itself — the heart, the rhythmic system, the organ of cosmic-human encounter. The Leo Ego has natural contact with what Steiner called the Ego\'s royal quality: the capacity to bestow, to recognise, to hold the centre without grasping it.',
    shadow: 'The Luciferic risk: the self that requires recognition as its oxygen, that confuses its spiritual quality with its social performance. Pride is the shadow of genuine dignity.',
    q: 'Can you act generously when no one is watching, and feel equally fulfilled?',
    practice: 'Positivity: find what is genuinely real and nourishing in your encounters — independent of whether they confirm your sense of your own importance.',
  },
  'planet:sun:virgo': {
    obs: 'An identity shaped by precision and service — the self that sees what is imperfect and feels a genuine call to improve it. Discernment is not a skill here; it is a mode of perception.',
    mean: 'The Ego in Virgo works through the Mercury-earth principle — the analytical faculty applied to the realm of physical and etheric nourishment. Steiner associated Virgo with the forces of assimilation: the capacity to take in the world and transform it into substance. Genuine service, offered without attachment to outcome, is one of the highest soul qualities.',
    shadow: 'The Ahrimanic risk: the self that reduces everything to what can be improved. Perfectionism as a substitute for genuine encounter. The critical faculty applied to the self becomes relentless.',
    q: 'Do you serve because it is needed or because imperfection is intolerable to you?',
    practice: 'Equanimity: practice receiving what is as it is — before reaching for what should be.',
  },
  'planet:sun:libra': {
    obs: 'An identity at home in the space between — the self that perceives with unusual clarity what is just, what is beautiful, what creates harmony. The Ego does not rest easily in one position.',
    mean: 'The Ego in Libra works through the Venus principle — the feeling-sense that perceives balance and relationship. The capacity for genuine objectivity — to hold two perspectives simultaneously without collapsing into either — is spiritually significant: it corresponds to the consciousness soul\'s requirement for impartial judgment.',
    shadow: 'The Luciferic risk: the self that avoids taking a position entirely, that equates indecision with fairness. Or the opposite: the self that is so driven by aesthetic judgment that it cannot tolerate the necessarily imperfect moral life.',
    q: 'When you hesitate between two positions, is it from genuine discernment or from fear of choosing wrongly?',
    practice: 'Control of Will: make decisions at their first moment of clarity, then act. Do not wait for perfect conditions.',
  },
  'planet:sun:scorpio': {
    obs: 'An identity formed in depth — the self that cannot stay at the surface, that feels compelled to go to the root of what is real. Intensity is the natural medium of consciousness here.',
    mean: 'The Ego in Scorpio works through the Mars principle in the water element — the will applied to the depths of feeling and soul. The capacity for genuine transformation — the willingness to let old forms die so that new ones can arise — is one of the highest Scorpio qualities and corresponds directly to the alchemical process of the consciousness soul.',
    shadow: 'The Luciferic risk: the intensity of soul perception becomes an addiction — the self that continually descends but never emerges with anything to bring back. Or power exercised over others as a substitute for power exercised over oneself.',
    q: 'What have you genuinely transformed in yourself, rather than merely observed?',
    practice: 'Open-Mindedness: consciously cultivate a period of not-knowing — allow what you encounter to remain open before you interpret it.',
  },
  'planet:sun:sagittarius': {
    obs: 'An identity oriented toward horizon — the self most alive when moving toward a distant truth, a larger understanding, a principle that makes the particular meaningful.',
    mean: 'The Ego in Sagittarius works through the Jupiter principle — the expanding, wisdom-seeking force. The soul quality of genuine philosophical openness — the willingness to follow an idea wherever it leads — corresponds to the intellectual soul\'s highest function: thinking that serves truth rather than the thinker.',
    shadow: 'The Luciferic risk: the self that confuses enthusiasm for an idea with possession of it. The journey substitutes for the arrival; the seeking substitutes for the knowing.',
    q: 'What have you arrived at — what do you actually know, from your own experience, to be real?',
    practice: 'Control of Thought: complete a chain of reasoning to its conclusion before beginning the next. Practice arrival.',
  },
  'planet:sun:capricorn': {
    obs: 'An identity built from the ground up — the self that knows itself through what it achieves, sustains, and earns. Patience and gravity are native qualities.',
    mean: 'The Ego in Capricorn works through the Saturn principle — structure, karma, the long arc of consequence. The soul quality of genuine responsibility — not obligation from fear but from clear-eyed recognition of what one is and what one owes — is spiritually significant: it corresponds to the consciousness soul\'s demand for honest reckoning with reality.',
    shadow: 'The Ahrimanic risk: the identity that exists only in achievement and status. When these are removed, there is no self behind them. Or the opposite extreme: discipline without joy, duty without meaning.',
    q: 'If all external markers of achievement were removed, what remains that you could call genuinely your own?',
    practice: 'Positivity: regularly notice one thing that is real and nourishing about your life that has nothing to do with productivity or status.',
  },
  'planet:sun:aquarius': {
    obs: 'An identity formed in relation to the collective — the self most alive when it is serving an idea that is larger than itself, when it can see the whole pattern of which particular lives are instances.',
    mean: 'The Ego in Aquarius works through the Saturn-air principle — the crystallising, pattern-perceiving force applied to the realm of thought and social life. The capacity for genuine objectivity about the human condition corresponds to the consciousness soul\'s task: seeing clearly, without personal distortion.',
    shadow: 'The Luciferic risk: the self that lives in ideas about humanity while remaining relationally distant from actual human beings. Or the opposite Ahrimanic inversion: the objectivity that has become coldness.',
    q: 'Do you know specific individual human beings as deeply as you know your ideas about humanity?',
    practice: 'Equanimity: maintain your concern for the whole while remaining genuinely present to the particular.',
  },
  'planet:sun:pisces': {
    obs: 'An identity formed through porousness and empathy — the self that is most alive in the currents of feeling that move between beings, that has a natural perception of what lies beneath the surface.',
    mean: 'The Ego in Pisces works through the Jupiter-water principle — the wisdom-seeking force applied to the feeling life and the realm of the unconscious. The capacity for genuine compassion — feeling into another\'s situation without losing one\'s own centre — is spiritually significant: it is a seed of the future faculty of genuine spiritual perception.',
    shadow: 'The Luciferic risk: the self that dissolves into others\' experience and calls it sensitivity. The boundary between one\'s own soul-content and another\'s is unclear. Compassion becomes merger; empathy becomes projection.',
    q: 'When you feel what another feels, are you actually perceiving them — or are you feeling your own response to their situation?',
    practice: 'Control of Will: practice performing one deliberate, embodied act each day that anchors you in physical reality.',
  },

  // ── MOON ───────────────────────────────────────────────────────────────────
  // The etheric body — memory, habit, the quality of life-force and nourishment.

  'planet:moon:aries': {
    obs: 'The life-forces move quickly, establishing rhythms that break and reform. The etheric body has an impulse quality — its nourishment comes from new beginnings.',
    mean: 'In Steiner\'s physiology, the Moon governs the brain and the etheric forces of memory. In Aries, these forces have a forward thrust: memory that is more vivid for recent impressions; nourishment that comes from initiative rather than routine. The will-senses may be heightened.',
    shadow: 'Restlessness in the etheric body — an inability to rest in what has already been established. Emotional life that reacts before it remembers.',
    q: 'What rhythms have you established that genuinely nourish you — rather than merely stimulate?',
    practice: 'Equanimity: establish at least one daily rhythm (sleep, meals, practice) that you maintain regardless of mood.',
  },
  'planet:moon:taurus': {
    obs: 'The life-forces move with steadiness and depth. The etheric body finds nourishment in the sensory, the rhythmic, and the physically beautiful.',
    mean: 'The Moon in Taurus gives the etheric body exceptional resilience and a natural affinity with the plant-kingdom\'s formative forces. Memory has a strong sensory component — the past is held in smell, touch, and the body\'s cellular recall. The etheric body restores itself through physical beauty and consistent rhythm.',
    shadow: 'The etheric body may resist necessary change — clinging to familiar patterns long past their usefulness. Emotional comfort-seeking as a substitute for genuine nourishment.',
    q: 'When you seek physical comfort, is it genuine etheric restoration or avoidance?',
    practice: 'Open-Mindedness: when you feel the pull toward the familiar, pause and ask whether the familiar genuinely nourishes you or merely feels safe.',
  },
  'planet:moon:gemini': {
    obs: 'The life-forces express through mental activity and connection. The etheric body is quickened by conversation, exchange, and the flow of ideas.',
    mean: 'The Moon in Gemini gives the etheric body a versatile, socially attuned quality. Memory is associative — the past is held in patterns of language and relationship. The etheric body restores through variety and intellectual engagement. The risk is that the life-forces are too dispersed across the surface of experience.',
    shadow: 'Emotional volatility hidden behind wit and surface adaptability. The etheric body that cannot rest because the mind will not slow.',
    q: 'Do you know how to be genuinely quiet — not just externally, but inwardly?',
    practice: 'Control of Thought: spend five minutes daily in genuine inner stillness — not planning, not reviewing, simply attending.',
  },
  'planet:moon:cancer': {
    obs: 'The life-forces are intimately connected to the domestic and the relational. The etheric body is deeply nourished by belonging and by the quality of home.',
    mean: 'Moon in Cancer is considered by spiritual science to work powerfully on the etheric body because both the Moon and Cancer govern the life-forces\' formative activity. Memory here is tenacious and emotionally charged — the past lives in feeling rather than fact. The etheric body is genuinely sensitive to its environment.',
    shadow: 'The etheric body that becomes too identified with the emotional atmosphere of its environment. Over-sensitivity; difficulty distinguishing one\'s own mood from the mood of those around one.',
    q: 'Can you identify, at this moment, which of your emotional states is genuinely yours?',
    practice: 'Positivity: each evening, name one thing in your day that was genuinely real and good — independent of whether you felt at home or not.',
  },
  'planet:moon:leo': {
    obs: 'The life-forces have a warm, generative quality. The etheric body is nourished by recognition, by warmth given and received, by being at the centre of meaningful activity.',
    mean: 'The Moon in Leo brings the heart-forces into the life-body — a genuine warmth that is both personal and capable of radiating outward. Memory here holds the high points vividly; the etheric body recalls moments of significance and aliveness with unusual clarity.',
    shadow: 'The etheric body that requires constant affirmation. When recognition is withdrawn, the life-forces thin and the soul becomes dramatically cold.',
    q: 'Can you sustain your own inner warmth independently of external recognition?',
    practice: 'Equanimity: practice maintaining an inner quality of warmth regardless of whether the outer situation responds to it.',
  },
  'planet:moon:virgo': {
    obs: 'The life-forces express through careful attention and the instinct to improve, to heal, to order what is disordered. The etheric body finds genuine nourishment in useful work.',
    mean: 'The Moon in Virgo connects the etheric body to the assimilation forces — the process of taking in experience and digesting it into substance. Memory is precise and detailed. The etheric body restores through careful, purposeful activity rather than rest alone.',
    shadow: 'The etheric body exhausted by its own critical attention. The life-forces that turn their assimilating energy against the self — endless inner correction without rest.',
    q: 'When you turn your attention to your own flaws, is it from genuine care for your development or from habit?',
    practice: 'Positivity: daily, name what you did that was genuinely good — without immediately qualifying it.',
  },
  'planet:moon:libra': {
    obs: 'The life-forces seek balance and harmony. The etheric body is nourished by beauty, by just relationships, and by the resolution of tension.',
    mean: 'The Moon in Libra gives the etheric body a Venus-influenced quality — an aesthetic sensitivity in the life-forces themselves. The etheric body may experience genuine physical symptoms when the social or aesthetic environment is discordant. Memory holds the quality of relationship rather than its factual content.',
    shadow: 'The etheric body that cannot rest in unresolved situations. Anxiety as the constant companion of the life-forces that seek equilibrium and do not find it.',
    q: 'Can you tolerate genuine irresolution without it depleting you?',
    practice: 'Equanimity: practice sitting with an unresolved situation for five minutes without reaching for a solution.',
  },
  'planet:moon:scorpio': {
    obs: 'The life-forces are deep, tenacious, and capable of genuine regeneration from apparent depletion. The etheric body holds past experiences with unusual intensity.',
    mean: 'The Moon in Scorpio gives the etheric body a strong connection to the transformative forces — the capacity to process what has been traumatic or difficult into genuine substance. Memory is long and emotionally charged. The etheric body restores through depth rather than distraction.',
    shadow: 'The etheric body that cannot release what it has transformed. Old experiences live in the body as contracted force rather than assimilated wisdom.',
    q: 'What emotional content do you carry in your body that your thinking has already released?',
    practice: 'Control of Thought: practice reviewing the day\'s events in the Rückschau manner — backwards, without judgment.',
  },
  'planet:moon:sagittarius': {
    obs: 'The life-forces are generative and expansive. The etheric body is nourished by freedom, by movement, by encounters with what is greater than the familiar.',
    mean: 'The Moon in Sagittarius gives the etheric body a Jupiter quality — a genuine optimism in the life-forces, an instinct toward meaning. Memory holds experiences of significance and insight rather than factual chronology. The etheric body restores through encounter with what is large.',
    shadow: 'The etheric body that becomes restless without the constant influx of new experience. Withdrawal and routine feel like depletion even when they are genuinely restorative.',
    q: 'Can you be nourished by the small and familiar as genuinely as by the large and novel?',
    practice: 'Harmony: practice finding the gesture of wholeness in one ordinary daily moment.',
  },
  'planet:moon:capricorn': {
    obs: 'The life-forces are disciplined and slow to express. The etheric body is nourished by accomplishment, by structure, and by the sense that time is being well used.',
    mean: 'The Moon in Capricorn gives the etheric body a Saturn quality — a seriousness in the life-forces, a deep connection to the long arc of consequence. Memory holds what has been built and what has been lost with equal clarity. The etheric body restores slowly and reliably through consistent routine.',
    shadow: 'The etheric body that interprets rest as failure. The life-forces driven beyond their rhythm by the Saturn demand for productivity.',
    q: 'Do you rest as deliberately as you work — or is rest something that happens when effort finally fails?',
    practice: 'Positivity: regularly acknowledge what your etheric body has given you today — not what more it could have done.',
  },
  'planet:moon:aquarius': {
    obs: 'The life-forces express through the social and the ideational. The etheric body is nourished by belonging to something larger — a community, a vision, a movement of thought.',
    mean: 'The Moon in Aquarius gives the etheric body a quality of collective orientation. Memory holds patterns and principles rather than individual episodes. The etheric body finds genuine restoration through group work and shared purpose.',
    shadow: 'The etheric body that is more comfortable with humanity in the abstract than with individual human beings. The life-forces cooled by too much objectivity.',
    q: 'Are the people closest to you genuinely known to you — or are they understood primarily as instances of types?',
    practice: 'Open-Mindedness: in one relationship today, deliberately set aside what you already know about the person and meet them freshly.',
  },
  'planet:moon:pisces': {
    obs: 'The life-forces are fluid and receptive, attuned to the currents of feeling that move between beings. The etheric body absorbs the emotional quality of its environment.',
    mean: 'The Moon in Pisces gives the etheric body a Jupiter-water quality — a genuine sensitivity to what is beneath the surface of experience. Memory is impressionistic and emotionally coloured. The etheric body restores through solitude, through beauty, and through contact with what is genuinely spiritual.',
    shadow: 'The etheric body that cannot distinguish its own life-current from those around it. Over-absorbency leads to depletion; the life-forces give without knowing what is being given.',
    q: 'After a day of social engagement, can you identify what is genuinely yours versus what you absorbed?',
    practice: 'Control of Will: practice one embodied daily ritual that anchors your own life-force field distinctly.',
  },

  // ── MERCURY ────────────────────────────────────────────────────────────────
  // The thinking function — how concept, language, and communication are coloured.

  'planet:mercury:aries': {
    obs: 'Thinking that arrives before it is assembled — the mind that moves to conclusions by direct apprehension rather than sequential reasoning.',
    mean: 'Mercury in Aries gives thinking the quality of the inspired flash — genuine intuitive contact with ideas before the step-by-step logic that would verify them. In Goethean terms, this is closest to the fourth stage: the idea that appears complete.',
    shadow: 'Thinking that concludes before it examines. The certainty of first impression as a substitute for genuine investigation.',
    q: 'How often do you discover that your first conclusion was wrong — and how do you respond?',
    practice: 'Control of Thought: hold the opposite of your first conclusion in mind with equal seriousness for five minutes before acting on the original.',
  },
  'planet:mercury:taurus': {
    obs: 'Thinking that moves deliberately, that works through what it encounters with patience and thoroughness. The mind that prefers to understand deeply rather than quickly.',
    mean: 'Mercury in Taurus gives thinking a building quality — concept by concept, layer by layer. This corresponds to the Goethean stage of Exact Sensorial Imagination: the capacity to hold what has been perceived in inner experience with accuracy.',
    shadow: 'Thinking that becomes rigid once it has concluded — difficulty revising positions that have taken effort to form.',
    q: 'Is there a belief you hold that you have not seriously examined in the past year?',
    practice: 'Open-Mindedness: deliberately seek out a well-argued position contrary to one you hold securely.',
  },
  'planet:mercury:gemini': {
    obs: 'Thinking that thrives on connection and multiplicity — the mind at home in the interplay of ideas, the translation between perspectives, the recognition of patterns across domains.',
    mean: 'Mercury in Gemini is in its natural element — the mediating, connecting principle in full expression. The strength is genuine intellectual versatility; the capacity to hold multiple frames simultaneously is spiritually significant when applied to objective investigation rather than to mere cleverness.',
    shadow: 'The mind that plays with ideas rather than committing to them. Wit as a substitute for depth.',
    q: 'What have you thought through to its conclusion, rather than to a provisional position?',
    practice: 'Control of Thought: choose one question and pursue it alone, without moving to the next, for a full week.',
  },
  'planet:mercury:cancer': {
    obs: 'Thinking that is intimately connected to feeling — ideas that arise from emotional perception rather than detached analysis. The mind that remembers what it has felt.',
    mean: 'Mercury in Cancer gives thinking a participatory quality: thought arises from the inside of experience rather than observing it from outside. This corresponds to the first stage of Goethean observation — exact sense perception — carried into the domain of inner experience.',
    shadow: 'The thinking that cannot separate what is true from what is felt to be true. Conclusions coloured by the need for emotional safety.',
    q: 'Can you think something through that threatens a cherished feeling — and follow the thought honestly?',
    practice: 'Control of Thought: practice thinking one emotionally charged question with deliberate objectivity for five minutes.',
  },
  'planet:mercury:leo': {
    obs: 'Thinking that has a quality of authority and generosity — ideas communicated with warmth and with the expectation of being received.',
    mean: 'Mercury in Leo gives communication a solar quality: the word that illuminates, that warms, that radiates outward. The strength is genuine ability to inspire thought in others. The risk is that communication becomes performance rather than genuine exchange.',
    shadow: 'The thinker who is more interested in being heard than in hearing. Communication that is generosity on the surface and self-promotion beneath.',
    q: 'In your last significant conversation, how much of your attention was genuinely on the other person?',
    practice: 'Open-Mindedness: in one conversation today, hold your response in silence until the other person has genuinely finished.',
  },
  'planet:mercury:virgo': {
    obs: 'Thinking that analyses, orders, and discriminates with precision. The mind that notices what others overlook and knows the difference between what is accurate and what is approximate.',
    mean: 'Mercury in Virgo is in one of its natural expressions — the discriminating, assimilating principle applied to the domain of concept. This corresponds to Goethean exact sense perception carried into intellectual form: the capacity to see precisely without premature generalisation.',
    shadow: 'The critical faculty applied without warmth — analysis that reduces what it encounters rather than releasing its truth.',
    q: 'When you notice what is imperfect in an argument or person, do you also notice what is genuinely right?',
    practice: 'Positivity: after any analysis, deliberately name what is correct or valuable before naming what is incomplete.',
  },
  'planet:mercury:libra': {
    obs: 'Thinking that perceives relationship and proportion — the mind that sees how things balance, how perspectives correspond, how a just conclusion can be formed from competing considerations.',
    mean: 'Mercury in Libra gives thinking a Venus quality: the aesthetics of the argument, the elegance of the solution, the perception of harmony in conceptual structure. The capacity for genuine impartiality — holding competing claims without premature resolution — is spiritually significant.',
    shadow: 'The thinker who equates perpetual balance with genuine thought. Indecision in the form of sophisticated balance.',
    q: 'Is there a question where you have deliberately not formed a view — and if so, why?',
    practice: 'Control of Will: where you have been withholding a judgment from courtesy or conflict-avoidance, form it deliberately and hold it.',
  },
  'planet:mercury:scorpio': {
    obs: 'Thinking that goes to the root — the mind that is not satisfied with surface explanations, that investigates until it reaches the actual ground of what is real.',
    mean: 'Mercury in Scorpio gives thinking a penetrating, investigative quality — the intellectual capacity of the consciousness soul\'s highest function: seeing clearly what is, without the softening that comfort requires.',
    shadow: 'The thinking that becomes suspicious rather than perceptive. Investigation that is driven by distrust rather than genuine desire to know.',
    q: 'When you probe deeply, is it from genuine curiosity or from the assumption that the surface is hiding something?',
    practice: 'Open-Mindedness: practice allowing one investigation to conclude positively — accepting what you find rather than seeking further.',
  },
  'planet:mercury:sagittarius': {
    obs: 'Thinking that reaches toward principle and meaning — the mind at home with large patterns, with the philosophical question, with the overview that makes particular facts meaningful.',
    mean: 'Mercury in Sagittarius gives thinking a Jupiter quality: the generative, meaning-seeking mind. The strength is genuine philosophical breadth; the capacity to form principles from experience rather than merely cataloguing experiences.',
    shadow: 'The thinking that generalises before it has genuinely observed the particular. The enthusiastic principle that has outrun its factual basis.',
    q: 'Can you name specific experiences that genuinely ground your most important convictions?',
    practice: 'Control of Thought: practice reasoning from the specific to the general — beginning with observation, not conclusion.',
  },
  'planet:mercury:capricorn': {
    obs: 'Thinking that is practical, structured, and serious — the mind that works from principle through consequence to result, and that values what can be demonstrated.',
    mean: 'Mercury in Capricorn gives thinking a Saturn quality: the disciplined, consequentialist mind. The strength is genuine rigour; the capacity to sustain a chain of reasoning to its conclusion without losing the thread.',
    shadow: 'The thinking that reduces everything to what is measurable. The practical mind that cannot enter the domain of what is real but not quantifiable.',
    q: 'Is there something you know to be true that you cannot demonstrate to someone who requires proof?',
    practice: 'Open-Mindedness: spend time genuinely engaging with an idea that has no practical application — for its own sake.',
  },
  'planet:mercury:aquarius': {
    obs: 'Thinking that operates at the level of pattern and principle — the mind that perceives the structure beneath the particular, that is genuinely at home in abstraction.',
    mean: 'Mercury in Aquarius gives thinking a Saturn-air quality: the crystallising, system-perceiving mind. The strength is genuine capacity for objective, impersonal thought — the intellectual soul function at its highest.',
    shadow: 'The thinking that has become disconnected from the particular and the personal. Abstract systems that float free of the actual human beings they describe.',
    q: 'When you think about humanity, are specific individuals present in your thinking?',
    practice: 'Equanimity: practice holding both the abstract principle and the particular instance simultaneously.',
  },
  'planet:mercury:pisces': {
    obs: 'Thinking that arises from and returns to feeling — the mind whose reasoning is shaped by what it perceives beneath the surface of the literal.',
    mean: 'Mercury in Pisces gives thinking an imaginative, poetic quality: the capacity to think in images and analogies, to perceive connections that linear logic misses. In Steiner\'s epistemology, this corresponds to the second stage of Goethean observation: exact sensorial imagination.',
    shadow: 'The thinking that cannot distinguish between genuine perception and projection. The image that feels like truth without having been examined.',
    q: 'When you trust an intuition, can you name what it is based on — or does it simply feel true?',
    practice: 'Control of Thought: practice translating one intuition into a step-by-step argument, following each step to see if it holds.',
  },

  // ── VENUS ──────────────────────────────────────────────────────────────────
  // The feeling-life — the astral body\'s sympathies, aesthetic sense, and relational life.

  'planet:venus:aries': {
    obs: 'The feeling-life that moves quickly toward what it loves — desire that is direct and unreflective, warmth that is immediate rather than considered.',
    mean: 'Venus in Aries gives the astral body\'s feeling-life an impulsive, initiating quality. The capacity for genuine enthusiasm — the soul that is alive in the first moment of an encounter — is spiritually valuable when it is followed by sustained attention.',
    shadow: 'The feeling-life that follows the first impulse without developing it. Warmth that cools as quickly as it kindles.',
    q: 'What have you loved long enough to genuinely know?',
    practice: 'Harmony: practice completing one act of care or beauty that you began — even when the initial enthusiasm has faded.',
  },
  'planet:venus:taurus': {
    obs: 'The feeling-life that is slow to kindle but deep and durable once established. Beauty is encountered through the senses; love endures through consistency.',
    mean: 'Venus in Taurus gives the astral body a deeply sensory aesthetic dimension. The soul\'s sympathies are formed through the body\'s experience of beauty — texture, music, physical warmth. These are genuine forms of etheric nourishment when they are received with full attention.',
    shadow: 'The feeling-life that becomes possessive. Love that seeks to secure rather than to encounter.',
    q: 'Is there a relationship or possession that you hold more tightly than is good for it?',
    practice: 'Open-Mindedness: practice allowing one cherished thing to be exactly as it is — without seeking to secure it.',
  },
  'planet:venus:gemini': {
    obs: 'The feeling-life that is quickened by exchange — the soul most alive in conversation, in the meeting of minds, in the pleasure of moving between perspectives together.',
    mean: 'Venus in Gemini gives the astral body a sociable, intellectually aesthetic dimension. The soul\'s sympathies are formed through the exchange of ideas; beauty is found in wit, in connection, in the elegance of a well-turned thought.',
    shadow: 'The feeling-life that is dispersed across too many contacts. The warmth that is present everywhere and deep nowhere.',
    q: 'Who in your life do you genuinely know, as opposed to genuinely enjoy?',
    practice: 'Equanimity: practice sustained attention in one relationship — through one full, unhurried conversation.',
  },
  'planet:venus:cancer': {
    obs: 'The feeling-life that is deeply nourished by belonging and by the care of the intimate. Love is expressed through nourishment — through feeding, through shelter, through remembrance.',
    mean: 'Venus in Cancer gives the astral body a quality of profound domestic sensitivity. The soul\'s aesthetic is the aesthetic of home — warmth, familiarity, the beauty of things that carry memories. The capacity for genuine nurturing is spiritually significant when it is offered freely.',
    shadow: 'The feeling-life that clings — that conflates love with the need to be needed.',
    q: 'Do you care for others from a place of genuine abundance, or from a need to secure their attachment?',
    practice: 'Positivity: notice and name what is genuinely beautiful in one ordinary domestic moment today.',
  },
  'planet:venus:leo': {
    obs: 'The feeling-life that is warm, generous, and at home in the dramatic. Love is expressed through display, through gift, through the creation of memorable experiences.',
    mean: 'Venus in Leo gives the astral body a solar aesthetic: the soul that finds beauty in the grand gesture, in genuine generosity, in the quality of warmth that illuminates a room. The capacity to celebrate — genuinely and without calculation — is a spiritual quality.',
    shadow: 'The feeling-life that requires reciprocal display. Love that is generosity only when it is acknowledged.',
    q: 'Can you give warmth without any expectation of return — and sustain it?',
    practice: 'Equanimity: perform one act of genuine care today that no one will witness.',
  },
  'planet:venus:virgo': {
    obs: 'The feeling-life that expresses through care and through the quality of attention to detail. Love is shown in the practical, in what is done rather than said.',
    mean: 'Venus in Virgo gives the astral body a quality of humble service — the soul that finds beauty in precision, in the perfectly executed care, in what is done well and quietly. The aesthetic is the aesthetic of craft.',
    shadow: 'The feeling-life that critiques what it loves. Care that comes with correction.',
    q: 'Do the people you love feel primarily cared for — or primarily improved?',
    practice: 'Positivity: offer one act of care today with no suggestion of improvement attached to it.',
  },
  'planet:venus:libra': {
    obs: 'The feeling-life that is attuned to proportion and to the quality of relationship. Love is felt most intensely where there is genuine encounter — two beings meeting with mutual recognition.',
    mean: 'Venus in Libra is in one of its natural expressions — the aesthetic of balance and harmony in full resonance. The soul\'s sympathies are formed through the experience of genuine reciprocity. The capacity to perceive beauty in relationship — in the space between two people — is spiritually significant.',
    shadow: 'The feeling-life that avoids genuine commitment in order to maintain its freedom of aesthetic movement.',
    q: 'Is there a relationship in which you have been choosing grace over honesty?',
    practice: 'Control of Will: name one truth in a close relationship that you have been softening in the name of harmony.',
  },
  'planet:venus:scorpio': {
    obs: 'The feeling-life that goes to depth — love that is genuine only when it has moved through what is difficult, that finds beauty in what is real rather than what is comfortable.',
    mean: 'Venus in Scorpio gives the astral body a penetrating quality — the soul that cannot settle for surface warmth, that is compelled to know what lies beneath. The capacity for genuine depth in relationship — the willingness to see and be seen in one\'s full reality — is spiritually significant.',
    shadow: 'The feeling-life that tests rather than encounters. The soul that makes love into an investigation.',
    q: 'Do you allow yourself to be genuinely known, or do you reserve some part of yourself that observes the other\'s response?',
    practice: 'Open-Mindedness: in one relationship today, disclose something true about yourself without monitoring the other\'s response.',
  },
  'planet:venus:sagittarius': {
    obs: 'The feeling-life that is generous, expansive, and at home in what is large. Love is felt as an adventure; beauty is found in what is free and unconfined.',
    mean: 'Venus in Sagittarius gives the astral body a Jupiter quality: the feeling-life oriented toward what is meaningful, what is true, what is beyond the merely personal. The soul finds beauty in wisdom, in principle, in the encounter with what is genuinely greater.',
    shadow: 'The feeling-life that is in love with the idea of the person rather than the actual person.',
    q: 'Do you love someone for what they are, or for what they represent to you?',
    practice: 'Equanimity: attend to one specific particular in someone you love today — a detail of who they actually are.',
  },
  'planet:venus:capricorn': {
    obs: 'The feeling-life that is reserved and durable — love that is expressed through reliability, through presence over time, through what is built rather than what is felt in the moment.',
    mean: 'Venus in Capricorn gives the astral body a Saturn quality: the feeling-life that expresses through patient fidelity. The soul\'s aesthetic is the aesthetic of what endures — of forms that have earned their beauty through time and use.',
    shadow: 'The feeling-life that is so concerned with demonstrating reliability that it forgets to be present.',
    q: 'When did you last experience genuine warmth — not the warmth of being useful or reliable, but of being genuinely met?',
    practice: 'Positivity: allow yourself to receive care today without immediately reciprocating.',
  },
  'planet:venus:aquarius': {
    obs: 'The feeling-life that is most alive in the context of the collective — love that expresses through shared vision, through friendship grounded in principle, through what can be created together for something larger.',
    mean: 'Venus in Aquarius gives the astral body a social, idealistic aesthetic. The soul\'s sympathies are formed through shared commitment to what is genuinely significant. The capacity for friendship based on truth rather than sentiment is spiritually significant.',
    shadow: 'The feeling-life that is more comfortable with ideals than with persons. Love that is offered to humanity and withheld from individuals.',
    q: 'Is there someone specific in your life for whom you feel genuine personal warmth — not admiration, not utility, but warmth?',
    practice: 'Equanimity: practice being present to one individual today with the same quality of care you bring to your larger commitments.',
  },
  'planet:venus:pisces': {
    obs: 'The feeling-life that is porous to beauty and to suffering — the soul that is moved by what it encounters, that finds it difficult to maintain distance from what is real.',
    mean: 'Venus in Pisces gives the astral body a Jupiter-water quality: the feeling-life attuned to what is beneath the surface of the apparent. The capacity for genuine compassion — feeling into another\'s reality without distortion — is a seed of genuine spiritual perception.',
    shadow: 'The feeling-life that idealises rather than perceives. Love that is given to an image of the other rather than to the actual being.',
    q: 'In your most significant relationship, do you see the other as they actually are — or as you need them to be?',
    practice: 'Open-Mindedness: practice observing someone you love today with fresh eyes, as if for the first time.',
  },

  // ── MARS ───────────────────────────────────────────────────────────────────
  // The will impulse — how purposeful action, initiative, and force manifest.

  'planet:mars:aries': {
    obs: 'Will that is immediate, direct, and uncomplicated. The capacity to act without hesitation, to move the world by moving through it.',
    mean: 'Mars in Aries is the will principle in its natural expression — the Michaelic iron of purposeful initiative, unmodified by deliberation. The spiritual significance of genuine will is that it is the most human of forces: the Ego\'s capacity to act in the physical world.',
    shadow: 'Will that becomes aggression when blocked. The force that cannot distinguish between what it wants and what is right.',
    q: 'When you encounter genuine resistance, do you pause to determine whether the resistance is valid — or do you experience it primarily as an obstacle?',
    practice: 'Equanimity: when you feel the will contracted by frustration, pause for one breath before acting.',
  },
  'planet:mars:taurus': {
    obs: 'Will that builds slowly but durably — the force that does not rush but does not stop. Persistence as a form of power.',
    mean: 'Mars in Taurus gives the will a Saturn-earth quality: patient, deliberate, oriented toward what can be physically established. The spiritual value of this will is its capacity to sustain effort across time — what Steiner called the will\'s long breath.',
    shadow: 'Will that becomes obstinacy — the force that continues because it has begun, not because it should.',
    q: 'Is there something you are still doing primarily because you have already invested in it?',
    practice: 'Open-Mindedness: practice asking, once per week, whether what you are pursuing is still aligned with what you genuinely value.',
  },
  'planet:mars:gemini': {
    obs: 'Will that is quickened by ideas — the force that is most alive when it is moving between possibilities, when action is informed by variety.',
    mean: 'Mars in Gemini gives the will a Mercury quality: the capacity to act in multiple directions simultaneously, to respond to what is immediate and varied. The strength is genuine adaptability; the will that can shift without losing its essential direction.',
    shadow: 'Will that is dispersed — many beginnings and few completions. Force that follows novelty rather than necessity.',
    q: 'What have you completed recently, that you would not have completed if it had not retained its novelty?',
    practice: 'Control of Will: commit to completing one task fully before beginning the next, regardless of what becomes interesting in the meantime.',
  },
  'planet:mars:cancer': {
    obs: 'Will that is protective and motivated by care — the force that acts most powerfully on behalf of what it loves.',
    mean: 'Mars in Cancer gives the will a Moon quality: the force driven by feeling, by the memory of what has been lost or threatened. The strength is the capacity for extraordinary effort in service of what genuinely matters. The will here is a manifestation of the etheric forces — the life-force itself defending what it has built.',
    shadow: 'Will that is reactive to emotional threat — force driven by anxiety about loss rather than by genuine purpose.',
    q: 'When you act most forcefully, is it from genuine conviction or from the fear of what might otherwise happen?',
    practice: 'Equanimity: before acting from strong emotion, pause and name whether the force is purposeful or protective.',
  },
  'planet:mars:leo': {
    obs: 'Will that is dramatic and generous — force that seeks to create, to lead, to manifest something genuinely significant.',
    mean: 'Mars in Leo gives the will a solar quality: the force that is most alive in the full expression of creative power. The strength is genuine capacity for leadership — the will that can inspire others by being genuinely committed to something larger than itself.',
    shadow: 'Will that performs rather than acts. Force that is in love with its own image of action.',
    q: 'Do you pursue what you pursue because it is genuinely important, or because it makes you feel important?',
    practice: 'Control of Will: perform one significant act of will today that no one will notice or acknowledge.',
  },
  'planet:mars:virgo': {
    obs: 'Will that is precise and purposeful — force directed at what is imperfect and needs to be made right. The energy of careful correction.',
    mean: 'Mars in Virgo gives the will a Mercury-earth quality: force that serves rather than dominates, that is most effective when directed toward genuine improvement. The spiritual value of this will is the capacity for sustained practical service.',
    shadow: 'Will that exhausts itself in the correction of what is imperfect — unable to stop because imperfection is everywhere.',
    q: 'What would you do if you accepted that the world is imperfect and will remain so?',
    practice: 'Positivity: name one thing today that is imperfect and complete — and allow it to be both.',
  },
  'planet:mars:libra': {
    obs: 'Will that is oriented toward justice and toward the equilibrium of forces. Force that seeks right relationship rather than personal advantage.',
    mean: 'Mars in Libra gives the will a Venus quality: force in service of balance. The strength is the genuine capacity for fair judgment in action — the will that can choose what is right rather than what is expedient.',
    shadow: 'Will that is paralysed by the need to be just — unable to act because every action tips a balance.',
    q: 'Is there a situation where you have been waiting for perfect justification before acting?',
    practice: 'Control of Will: act from your best current judgment — acknowledging the limitation — rather than waiting for certainty.',
  },
  'planet:mars:scorpio': {
    obs: 'Will that is concentrated and relentless — force directed toward what is essential, that will not be deflected by what is merely difficult.',
    mean: 'Mars in Scorpio gives the will a concentrated, transformative quality: the force that can sustain itself through what would exhaust a less determined soul. The spiritual value of this will is the capacity for genuine transformation — the Ego working on the astral body with sustained pressure.',
    shadow: 'Will that does not distinguish between what is genuinely worth its force and what is merely an obstacle to its pride.',
    q: 'What are you determined to do — and why?',
    practice: 'Open-Mindedness: once this month, ask whether what you are relentlessly pursuing is genuinely yours to do.',
  },
  'planet:mars:sagittarius': {
    obs: 'Will that is generated by vision — force that is most powerful when it is moving toward something genuinely meaningful and large.',
    mean: 'Mars in Sagittarius gives the will a Jupiter quality: the force motivated by principle, by the sense that what is being done matters beyond the immediate. The strength is the genuine capacity for sustained action in service of a larger purpose.',
    shadow: 'Will that is inspired but not sustained — the force that is most alive in the exciting beginning and diminishes as the work becomes ordinary.',
    q: 'What is the most unglamorous part of your most important undertaking — and how consistently do you attend to it?',
    practice: 'Harmony: bring the same quality of attention to the routine aspects of your work as to the moments that feel significant.',
  },
  'planet:mars:capricorn': {
    obs: 'Will that is disciplined and consequentialist — force that acts from clear assessment of what is necessary and carries through without complaint.',
    mean: 'Mars in Capricorn gives the will an exceptional Saturn-grounded quality: the force that is most effective because it is most realistic. The strength is the capacity for sustained purposeful effort in genuine service of what is important, regardless of how it feels.',
    shadow: 'Will that becomes mechanical — force that carries through because it has been set in motion, not because it is still responsive to what is genuinely needed.',
    q: 'Is there a direction in your life that you continue from habit rather than from live conviction?',
    practice: 'Open-Mindedness: periodically ask whether your disciplines are serving what they were designed to serve.',
  },
  'planet:mars:aquarius': {
    obs: 'Will that is oriented toward the collective — force that is most alive in service of a shared vision, a principle, a cause larger than the personal.',
    mean: 'Mars in Aquarius gives the will a Saturn-air quality: force in service of what is genuinely universal. The strength is the capacity for sustained action on behalf of what benefits others without requiring personal recognition.',
    shadow: 'Will that is self-righteous — force that is certain of its own correctness because it serves a principle.',
    q: 'How do you distinguish between acting from principle and acting from the pleasure of being principled?',
    practice: 'Equanimity: practice acting from genuine conviction while remaining genuinely open to the possibility that you are wrong.',
  },
  'planet:mars:pisces': {
    obs: 'Will that is motivated by compassion and by what is real beneath the surface. Force that can be deeply patient because it perceives what is genuinely at stake.',
    mean: 'Mars in Pisces gives the will a Jupiter-water quality: force that flows from the depths rather than from the surface. The strength is the capacity for sustained effort on behalf of what is genuinely important, including what cannot be measured.',
    shadow: 'Will that is vague — force without clear direction, compassion without clear form. Inspiration that does not crystallise into action.',
    q: 'What is one compassionate impulse that you have not yet given concrete form?',
    practice: 'Control of Will: take one specific, embodied action today in service of something you genuinely care about.',
  },

  // ── JUPITER ────────────────────────────────────────────────────────────────
  // Wisdom, expansion — how understanding and generosity flow.

  'planet:jupiter:aries': {
    obs: 'Wisdom that arrives in flashes — the generous mind that is most alive in the first encounter with a new territory of understanding.',
    mean: 'Jupiter in Aries gives the wisdom-principle an initiating quality: the understanding that opens doors rather than completes rooms. The spiritual gift is enthusiasm for the beginning of genuine knowledge.',
    shadow: 'Wisdom claimed before it has been earned. The generous assumption that because one has seen the beginning of a territory, one knows it.',
    q: 'What do you speak about with confidence that you have not yet genuinely investigated?',
    practice: 'Control of Thought: before speaking with authority on a subject, spend five minutes honestly assessing your actual knowledge of it.',
  },
  'planet:jupiter:taurus': {
    obs: 'Wisdom that accumulates patiently — understanding built from consistent observation of what is real and enduring.',
    mean: 'Jupiter in Taurus gives the wisdom-principle a grounded, material wisdom: the understanding that comes from long contact with the physical world and its processes. The gift is genuine knowledge of what endures.',
    shadow: 'Wisdom that becomes wealth-focused — the generosity that flows primarily to what has tangible value.',
    q: 'What understanding do you have that cannot be quantified or demonstrated — and how do you relate to it?',
    practice: 'Open-Mindedness: spend time with a form of knowledge that has no practical application.',
  },
  'planet:jupiter:gemini': {
    obs: 'Wisdom that delights in connection — understanding that is most alive when it reveals unexpected relationships between domains.',
    mean: 'Jupiter in Gemini gives the wisdom-principle a genuinely connective quality: the capacity to see how disparate fields of knowledge illuminate each other. The gift is the breadth of genuine intellectual generosity.',
    shadow: 'The breadth that replaces depth. Wisdom that connects many surfaces without penetrating any.',
    q: 'What do you know in genuine depth — not just in its connections to other things?',
    practice: 'Control of Thought: investigate one subject exclusively and completely before connecting it to other domains.',
  },
  'planet:jupiter:cancer': {
    obs: 'Wisdom expressed through nourishment — understanding that is most generous when it provides for what is needed.',
    mean: 'Jupiter in Cancer gives the wisdom-principle a maternal, formative quality: the generosity that sustains life and enables growth. The spiritual gift is genuine practical wisdom in service of what needs to live.',
    shadow: 'Generosity that creates dependency. Wisdom given without the receiver being required to develop their own.',
    q: 'Is your generosity empowering or maintaining?',
    practice: 'Positivity: notice when the help you offer is genuinely enabling rather than simply providing.',
  },
  'planet:jupiter:leo': {
    obs: 'Wisdom that is generous and celebratory — understanding that wants to be shared, that finds its fullest expression when it illuminates a gathering.',
    mean: 'Jupiter in Leo gives the wisdom-principle a solar, radiating quality: the teacher who illuminates, the leader who genuinely serves by being genuinely wise. The gift is the capacity to make understanding contagious.',
    shadow: 'The wisdom-teacher who has become more interested in teaching than in continuing to learn.',
    q: 'Who has genuinely changed your understanding recently?',
    practice: 'Open-Mindedness: spend a full hour in genuine learning from a source that challenges rather than confirms your existing views.',
  },
  'planet:jupiter:virgo': {
    obs: 'Wisdom expressed through service and precision — understanding in the practical, in what actually helps, in what genuinely heals.',
    mean: 'Jupiter in Virgo gives the wisdom-principle a humble, serviceable quality: the practical wisdom of the healer, the teacher, the craftsperson. The gift is genuine knowledge of how things work and what helps.',
    shadow: 'The critical mind that believes its analysis is wisdom. Understanding that reduces rather than expands.',
    q: 'Does your knowledge primarily enable or primarily correct?',
    practice: 'Positivity: practice offering understanding that confirms what someone already knows before extending it.',
  },
  'planet:jupiter:libra': {
    obs: 'Wisdom expressed through the perception of justice and beauty — understanding that sees what is proportionate, what is fair, what creates harmony between competing goods.',
    mean: 'Jupiter in Libra gives the wisdom-principle an aesthetic-moral quality: genuine wisdom about what is just and what is beautiful. The gift is the capacity to mediate between perspectives with genuine understanding rather than mere diplomacy.',
    shadow: 'The wisdom that cannot decide. Understanding so aware of multiple sides that it produces paralysis.',
    q: 'What is your considered view on a genuinely difficult moral question?',
    practice: 'Control of Will: form a clear judgment on one genuinely difficult question and hold it — even under pressure.',
  },
  'planet:jupiter:scorpio': {
    obs: 'Wisdom that reaches into depth — understanding that is not satisfied with explanation but seeks the actual ground of what is real.',
    mean: 'Jupiter in Scorpio gives the wisdom-principle a penetrating, investigative quality: the capacity to know what is genuinely real about human experience, including its most difficult and hidden aspects. The gift is genuine depth wisdom.',
    shadow: 'The wisdom of intensity without integration. Understanding that lives in the dark without bringing light out.',
    q: 'What do you know about the depths of human experience that you have genuinely integrated into your life?',
    practice: 'Harmony: practice taking one insight from depth and applying it simply and practically to daily life.',
  },
  'planet:jupiter:sagittarius': {
    obs: 'Wisdom at home — understanding that is most alive in philosophical exploration, in the encounter with what is genuinely larger than the ordinary.',
    mean: 'Jupiter in Sagittarius is in its natural expression: the wisdom-principle in full resonance with its own nature. The gift is genuine philosophical generosity — the capacity to find principle in experience and to share it without diminishing it.',
    shadow: 'The philosopher who teaches about the path rather than walking it. Wisdom that has become its own subject.',
    q: 'What specific change in your life has resulted from your most cherished understanding?',
    practice: 'Control of Will: take one principle you hold and find one specific daily practice it would support. Do it.',
  },
  'planet:jupiter:capricorn': {
    obs: 'Wisdom expressed through structure and through the long view — understanding that is most generous when it provides something that will last.',
    mean: 'Jupiter in Capricorn gives the wisdom-principle a Saturn quality: the understanding that comes from careful work over time, the generosity that provides enduring form. The gift is genuine practical wisdom about what can be built.',
    shadow: 'The wisdom that has become conservative — understanding that protects what has been built rather than continuing to learn.',
    q: 'What understanding have you genuinely revised in the past year?',
    practice: 'Open-Mindedness: seek out one context where your established wisdom may not apply.',
  },
  'planet:jupiter:aquarius': {
    obs: 'Wisdom oriented toward the universal — understanding that seeks what is genuinely beneficial for humanity, not merely for the immediate group.',
    mean: 'Jupiter in Aquarius gives the wisdom-principle a genuinely social dimension: the understanding that perceives the patterns of collective human development. The gift is genuine social wisdom — the capacity to see what serves the long-term good of the whole.',
    shadow: 'The wisdom that is generous toward humanity and impatient with persons.',
    q: 'Does your wisdom for the collective find any expression in your specific individual relationships?',
    practice: 'Equanimity: offer one gesture of genuine, specific wisdom to one individual today — not to humanity.',
  },
  'planet:jupiter:pisces': {
    obs: 'Wisdom that flows from the depths — understanding that is most generous when it gives what cannot be seen but can be felt.',
    mean: 'Jupiter in Pisces gives the wisdom-principle its most expansive expression: the understanding that flows from genuine compassion and genuine spiritual sensitivity. The gift is the capacity for wisdom that is genuinely selfless.',
    shadow: 'The wisdom that dissolves its own boundaries — understanding so receptive that it loses its own clarity.',
    q: 'Can you offer wisdom that is both genuinely compassionate and genuinely clear?',
    practice: 'Control of Thought: practice giving one piece of understanding in precise, clear language — without softening it into vagueness.',
  },

  // ── SATURN ─────────────────────────────────────────────────────────────────
  // Structure, karma, crystallising force — how necessity and limitation are met.

  'planet:saturn:aries': {
    obs: 'The karmic principle meets the impulsive will — structure imposed on what most wants to be free. Patience as the lesson that must be learned in action.',
    mean: 'Saturn in Aries brings the karmic principle of consequence into contact with the initiation impulse. The soul has something important to learn about the relationship between its will and its effects on others. Genuine patience — not passivity but the will that holds before it acts — is the specific developmental task.',
    shadow: 'The impulsive will frustrated by repeated consequences. The anger that arises when reality does not yield to force.',
    q: 'What do you keep encountering that seems to resist your will — and what might it be teaching you?',
    practice: 'Equanimity: before any significant action, take one full breath and ask: "Is this mine to do, in this way, now?"',
  },
  'planet:saturn:taurus': {
    obs: 'The karmic principle in the realm of resources and security — structure around what is owned, built, and held.',
    mean: 'Saturn in Taurus brings the karmic principle of consequence into the domain of the physical and material. The soul has a specific task around its relationship to resources: not as deprivation, but as the invitation to develop genuine independence from what is possessed.',
    shadow: 'The fear of loss that crystallises into hoarding — emotional or material. The identity that cannot let go of what it has built.',
    q: 'What would you be if you could not rely on what you currently possess?',
    practice: 'Open-Mindedness: practice giving something you value — time, resource, or attention — without expecting return.',
  },
  'planet:saturn:gemini': {
    obs: 'The karmic principle in the realm of thought and communication — structure around what can be said, what can be known.',
    mean: 'Saturn in Gemini brings the karmic principle of consequence into the domain of intellectual life. The soul is learning to take its thinking seriously — to speak with precision, to think with genuine rigour. The task is the transformation of agility into depth.',
    shadow: 'The thinker who is afraid of committing to a conclusion. Perpetual qualification as a protection against error.',
    q: 'What do you actually believe — as distinct from what you find interesting to consider?',
    practice: 'Control of Thought: state one conviction clearly and publicly, and hold it for a period.',
  },
  'planet:saturn:cancer': {
    obs: 'The karmic principle in the domain of belonging and emotional security — structure around the home, the family, what is foundational.',
    mean: 'Saturn in Cancer brings the karmic principle of consequence into the realm of emotional life and belonging. The soul has a specific task around its relationship to its own emotional foundations — to build genuine inner security that does not depend on particular outer conditions.',
    shadow: 'The emotional withdrawal that comes from a deep fear of abandonment. The protective shell that prevents genuine encounter.',
    q: 'What would genuine inner security — independent of any specific relationship — feel like for you?',
    practice: 'Positivity: practice naming what you have, emotionally, that is genuinely yours and cannot be taken.',
  },
  'planet:saturn:leo': {
    obs: 'The karmic principle in the domain of self-expression and recognition — structure around how the self is seen and valued.',
    mean: 'Saturn in Leo brings the karmic principle of consequence into the realm of the Ego\'s social expression. The soul has a specific task around its relationship to recognition — learning to develop genuine confidence that is independent of the audience\'s response.',
    shadow: 'The performance that is driven by the fear of not being enough. The warmth that is offered only when it is certain of a return.',
    q: 'What would you create if you were certain no one would ever see it?',
    practice: 'Control of Will: create or act from genuine inner impulse today, without sharing the result.',
  },
  'planet:saturn:virgo': {
    obs: 'The karmic principle in the domain of service and precision — structure around what is done correctly, what is of genuine use.',
    mean: 'Saturn in Virgo brings the karmic principle of consequence into the domain of practical service. The soul has a specific task around its relationship to the limits of its own capacity — learning to serve within genuine boundaries rather than from an anxious perfectionism.',
    shadow: 'The inner critic that never rests. The exhausted servant who cannot stop because stopping feels like failure.',
    q: 'What is "good enough" — and can you genuinely accept it?',
    practice: 'Positivity: at the end of each working day, explicitly acknowledge what you have done that was genuinely adequate.',
  },
  'planet:saturn:libra': {
    obs: 'The karmic principle in the domain of relationship and justice — structure around what is fair, what is reciprocal.',
    mean: 'Saturn in Libra brings the karmic principle of consequence into the domain of relationship. The soul has a specific task around its capacity for genuine impartiality — developing the consciousness soul\'s requirement for honest judgment that is independent of personal preference.',
    shadow: 'The perpetual negotiation that never arrives at genuine encounter. The relationship maintained by balance rather than lived from.',
    q: 'Is there a relationship in which you have been managing fairness rather than actually being present?',
    practice: 'Equanimity: in one relationship today, set aside the question of fairness and simply be with the other person.',
  },
  'planet:saturn:scorpio': {
    obs: 'The karmic principle in the domain of depth and transformation — structure around what must change and what the cost of change actually is.',
    mean: 'Saturn in Scorpio brings the karmic principle of consequence into the domain of genuine transformation. The soul has a specific task around its capacity to face what is real without flinching — and to transform what it finds rather than merely enduring it.',
    shadow: 'The soul that carries its shadow as a permanent identity. The depth that has become dwelling rather than passing through.',
    q: 'What have you genuinely released — not suppressed, not managed, but actually let go?',
    practice: 'Open-Mindedness: practice holding one old wound with fresh eyes — asking what it has given you, not only what it took.',
  },
  'planet:saturn:sagittarius': {
    obs: 'The karmic principle in the domain of belief and meaning — structure around what the soul is permitted to believe and what it must test.',
    mean: 'Saturn in Sagittarius brings the karmic principle of consequence into the domain of philosophy and faith. The soul has a specific task around its relationship to what it believes: learning to distinguish genuine conviction from comfortable assumption.',
    shadow: 'The belief that has become rigid — the philosophy that is no longer alive because it is no longer being tested.',
    q: 'What belief do you hold that you have not genuinely questioned in the past year?',
    practice: 'Open-Mindedness: engage seriously with the strongest argument against your most important conviction.',
  },
  'planet:saturn:capricorn': {
    obs: 'The karmic principle in its natural domain — structure, consequence, and the long arc of genuine responsibility.',
    mean: 'Saturn in Capricorn is in its natural expression: the crystallising, karma-clarifying force in full resonance with its own nature. The soul has an exceptional capacity for genuine responsibility — for seeing clearly what is required and doing it without evasion.',
    shadow: 'The soul that identifies with its responsibility and loses itself in it. The reliable one who has no self outside their duty.',
    q: 'Who are you when nothing is required of you?',
    practice: 'Positivity: practice allowing yourself to simply be — without producing, achieving, or demonstrating.',
  },
  'planet:saturn:aquarius': {
    obs: 'The karmic principle in the domain of the collective — structure around what the individual owes to the whole and how that debt is paid.',
    mean: 'Saturn in Aquarius brings the karmic principle of consequence into the domain of social responsibility. The soul has a specific task around its relationship to the collective good — developing the genuine capacity for impersonal service without losing the individual self in the process.',
    shadow: 'The idealism that has become obligation. The social worker who has forgotten to tend their own soul.',
    q: 'Is there a form of social commitment you maintain primarily from guilt rather than from genuine conviction?',
    practice: 'Harmony: find one act of genuine individual rest today that you can offer without guilt.',
  },
  'planet:saturn:pisces': {
    obs: 'The karmic principle in the domain of dissolution and the infinite — structure around the soul\'s relationship to what cannot be bounded.',
    mean: 'Saturn in Pisces brings the karmic principle of consequence into the domain of spiritual sensitivity and the unconscious. The soul has a specific task around its relationship to what is formless — learning to give form to what it perceives spiritually without hardening it into dogma.',
    shadow: 'The spiritual sensitivity that cannot act in the world because every form seems too limited for what it perceives.',
    q: 'What has your spiritual perception given you that you have actually brought into concrete form?',
    practice: 'Control of Will: take one spiritual perception or intuition and give it one specific embodied expression today.',
  },
};

export function getVoiceContent(planet: string, sign: string): VoiceContent | null {
  return CONTENT[`planet:${planet}:${sign}`] ?? null;
}

// Backwards compatibility shim for PlacementDetailClient
// type: 'planet' | 'sign' | 'house' | 'aspect' | 'element'
// key: for 'planet' → 'sun:capricorn'; others → not in this dataset
export function getPlacementContent(type: string, key: string): VoiceContent | null {
  if (type === 'planet') {
    const parts = key.split(':');
    if (parts.length === 2) {
      const [planet, sign] = parts;
      return CONTENT[`planet:${planet}:${sign}`] ?? null;
    }
  }
  return null;
}

export function getAllPlanetSigns(): Array<{ planet: string; sign: string }> {
  return Object.keys(CONTENT).map((key) => {
    const [, planet, sign] = key.split(':');
    return { planet, sign };
  });
}
