// cosmology.ts
// Extracted from: /resources/cosmological-system.html
// Sources: GA 9, GA 13, GA 110, GA 128, GA 169, GA 207, GA 208, GA 265a, GA 348

// ─────────────────────────────────────────────────────────────────────────────
// Interfaces
// ─────────────────────────────────────────────────────────────────────────────

export interface NineBody {
  number: number;
  name: string;
  german: string;
  triad: "body" | "soul" | "spirit";
  role: string;
  sphereConnection: string;
  steinerQuote: string;
  lucifericRisk: string;
  ahrimanicRisk: string;
}

export interface ZodiacalArchetype {
  sign: string;
  archetype: string;
  headChestLimbs: "head" | "chest" | "limbs";
  sense: string;
  bodyRegion: string;
  spiritualNote: string;
  cosmosophyGesture: string;
}

export interface TwelveSense {
  sign: string;
  sense: string;
  quality: string;
  transitAwakening: string;
  dayOrNight: string;
}

export interface TransitLanguage {
  planet: string;
  duration: string;
  hierarchyBrings: string;
  senseAwakened: string;
  bodyConcentration: string;
  lucifericRisk: string;
  ahrimanicRisk: string;
  centralPrinciple: string;
}

export interface CosmosophyForm {
  sign: string;
  gesture: string;
  region: "head" | "chest" | "limbs";
  cosmicSource: string;
}

export interface SevenLifeLevel {
  planet: string;
  lifeLevel: string;
  quality: string;
  mechanism: string;
}

export interface SoulDynamic {
  activity: string;
  livesBetween: string;
  consciousness: string;
  note: string;
}

export interface DeathRebirthEntry {
  title: string;
  content: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. NINE_BODIES
// Nine members of the human constitution (GA 9, Theosophy)
// ─────────────────────────────────────────────────────────────────────────────

export const NINE_BODIES: NineBody[] = [
  {
    number: 1,
    name: "The Physical Body",
    german: "Physischer Leib",
    triad: "body",
    role: "The crystallized heaven — the final stage of the spirit's long descent into matter. Not a prison but a densely coded cosmic document; the body is what the hierarchies built through four evolutionary stages (Old Saturn, Old Sun, Old Moon, Earth). The oldest document in the human being — it carries the signatures of cosmic evolution from before human beings were human.",
    sphereConnection: "Saturn sphere (structure, bones, skin); Solar sphere (heart, blood organization); all seven spheres contributed to physical body formation across evolutionary stages.",
    steinerQuote: "Matter is solidified spirit.",
    lucifericRisk: "Treating the body as merely physical denies its cosmic spiritual origin and bypasses the moral weight of the hierarchies' long labor to build it.",
    ahrimanicRisk: "The body reduced to a mechanism — a collection of systems to be optimized rather than a document of spiritual evolution to be read and honored."
  },
  {
    number: 2,
    name: "The Etheric Body",
    german: "Ätherleib / Lebensleib",
    triad: "body",
    role: "The body of living memory — the life-force that maintains the physical body against disintegration. Carries the accumulated emotional and biographical memory across incarnations. The seat of rhythm, habit, temperament, healing, and genuine biographical learning. The etheric body is where the soul's past lives are stored as formative forces rather than conscious memories.",
    sphereConnection: "Lunar sphere (memory, heredity formation); Jupiter sphere (wisdom-forming forces in etheric life); Venus sphere (harmonizing the etheric currents).",
    steinerQuote: "The etheric body is where the soul's past lives are stored as formative forces.",
    lucifericRisk: "Inflation of the etheric's memory function into nostalgia or identity with the past; refusing to grow beyond accumulated patterns.",
    ahrimanicRisk: "The etheric life-forces suppressed or mechanized; genuine soul nourishment denied in favor of productivity and measurable output."
  },
  {
    number: 3,
    name: "The Astral Body",
    german: "Astralleib",
    triad: "body",
    role: "The carrier of soul experience — desires, sympathies, antipathies, pain, pleasure, passion. Lucifer's primary domain since the Lemurian epoch: his gift was the seed of freedom within the astral life; his risk is the severance of passion from higher guidance. The I's central developmental task across many incarnations is not to suppress the astral body but to gradually educate it into Spirit-Self.",
    sphereConnection: "Venus sphere (relational feeling, harmonizing); Mars sphere (will-impulses, initiation); Lunar sphere (instinctual reactions from prior incarnations).",
    steinerQuote: "The I's central task is not to suppress the astral body but to gradually educate it into Spirit-Self.",
    lucifericRisk: "Passion mistaken for spiritual authenticity; the astral body's desires treated as the voice of the higher self; emotional reactivity unchecked by the I's moral direction.",
    ahrimanicRisk: "The astral life mechanically suppressed rather than consciously educated; desire denied rather than transformed; the soul flattened into behavioral control."
  },
  {
    number: 4,
    name: "The I / The Ego",
    german: "Das Ich",
    triad: "soul",
    role: "The truly divine element — the cosmic individuality that persists across incarnations. Not a personality trait but the spiritual organizer of the whole constitution. The natal Sun-sphere configuration is this I's primary signature in the chart. It is what the Exusiai gifted to humanity during the Lemurian epoch.",
    sphereConnection: "Solar sphere (primary I-domain); Saturn sphere (karmic crystallization of the I's pre-birth commitments); all spheres imprint on the I during its pre-birth passage.",
    steinerQuote: "The I is not something the person already fully is at birth — it is what the person is in the process of becoming.",
    lucifericRisk: "The I convinced of its own cosmic indispensability; grandiosity; messianic identification with the spiritual organizing impulse.",
    ahrimanicRisk: "I-force reduced to achievement and function; spiritual organizing impulse flattened into career; identity dissolved into institutional role."
  },
  {
    number: 5,
    name: "The Sentient Soul",
    german: "Empfindungsseele",
    triad: "soul",
    role: "The most immediate layer of soul life — where sense impressions and personal desires live. The arena where Luciferic inflation is most immediately and powerfully felt. Here the I has barely begun to take hold; the Sentient Soul tends to run with the astral body's desires and reactions rather than with the I's spiritual direction. The soul layer that most directly receives the impressions of the twelve senses.",
    sphereConnection: "Lunar sphere (instinct and habitual reaction); Venus sphere (love-desires and aesthetic responsiveness); Mars sphere (passionate willing).",
    steinerQuote: "The Sentient Soul is the arena where Luciferic inflation is most immediately felt.",
    lucifericRisk: "Identification of personal desire with genuine soul guidance; the Sentient Soul's impressions mistaken for spiritual insight.",
    ahrimanicRisk: "Sense-impressions mechanized or denied; the immediate soul-response armored against in favor of rational processing that cannot feel."
  },
  {
    number: 6,
    name: "The Intellectual Soul",
    german: "Verstandesseele / Gemütsseele",
    triad: "soul",
    role: "The soul's reasoning and mediating faculty — where the I first begins to reflect on its own inner life. The Mercury sphere imprints the quality of intellectual-soul activity most directly. The capacity for honest inner examination first emerges here. The soul layer where the I can begin to observe its own processes with some degree of detachment and self-direction.",
    sphereConnection: "Mercury sphere (cognitive signature and mediating intelligence); Jupiter sphere (wisdom developing within the intellectual soul's activity); Saturn (structural discipline given to thinking).",
    steinerQuote: "The Intellectual Soul is the soul's reasoning and mediating faculty — where the I first begins to reflect on its own inner life.",
    lucifericRisk: "Cleverness mistaken for wisdom; facility substituting for genuine depth; the Intellectual Soul's agility bypassing honest self-examination.",
    ahrimanicRisk: "Thinking hardened into analysis that cannot perceive living reality; the soul's mediating faculty reduced to cataloguing without genuine insight."
  },
  {
    number: 7,
    name: "The Consciousness Soul",
    german: "Bewusstseinsseele",
    triad: "soul",
    role: "The soul layer in which the I first becomes truly free — taking hold of itself without external guidance. The central developmental task of the Fifth Post-Atlantean Epoch (1413–3573 AD). The Ahrimanic danger is most acute here: the intellect, unillumined by spirit, becomes the Ahrimanic tool par excellence. The natal Sun-sphere configuration points to where Consciousness Soul development is most concentrated for this I.",
    sphereConnection: "Solar sphere (ego-forming force at the level of freedom); Saturn (structural demand of genuine freedom); Uranus (the awakening of the Consciousness Soul's genuine independence from collective thinking).",
    steinerQuote: "The intellect, unillumined by spirit, becomes the Ahrimanic tool par excellence.",
    lucifericRisk: "Freedom declared before it has been genuinely earned through the difficult work of self-knowledge; spiritual independence asserted rather than developed.",
    ahrimanicRisk: "The Consciousness Soul's capacity for genuine self-direction hollowed out by Ahrimanic intellect; clarity without spiritual content; precision without meaning."
  },
  {
    number: 8,
    name: "Spirit-Self / Manas",
    german: "Geistselbst",
    triad: "spirit",
    role: "The I consciously transforming the astral body — the first fruits of the soul's deliberate education by the spirit. Spirit-Self is not yet achieved by most of humanity; it is the developmental horizon the Consciousness Soul epoch is beginning to open. Wherever the I acts from genuine moral intuition rather than reactive impulse, the first seeds of Manas are being sown.",
    sphereConnection: "Uranus sphere (collective awakening impulse that prefigures Manas); Saturn sphere (discipline required for its development); Solar sphere (illumination that transforms astral life into Manas).",
    steinerQuote: "Named as frontier, not as accomplishment.",
    lucifericRisk: "The claim to Manas-level development before the astral body has actually been educated; spiritual achievement as self-concept rather than living reality.",
    ahrimanicRisk: "The developmental horizon denied or reduced to a theoretical concept; the practical transformative work of astral education replaced by doctrinal knowledge about it."
  },
  {
    number: 9,
    name: "Life-Spirit and Spirit-Man",
    german: "Lebensgeist / Geistmensch",
    triad: "spirit",
    role: "Life-Spirit (Buddhi, 8): the I transforming the etheric body — a capacity of future evolutionary stages, present now only in initiate individuals of the highest development. Spirit-Man (Atma, 9): the I transforming even the physical body — the ultimate goal of human evolution, the Tenth Hierarchy in its fully realized form. Named here as the cosmic direction of the whole incarnational journey, not as present biographical reality.",
    sphereConnection: "Neptune sphere (Life-Spirit's dissolution and transformation of etheric fixity); Pluto sphere (Spirit-Man's capacity for total regeneration of even physical substance) — these connections are systemic inferences, not Steiner's direct teaching.",
    steinerQuote: "Named here as the cosmic direction of the whole incarnational journey, not as present biographical reality.",
    lucifericRisk: "Identifying with Life-Spirit or Spirit-Man as present attainment; the spiritual horizon mistaken for biographical ground.",
    ahrimanicRisk: "The far developmental horizons denied entirely; the evolutionary direction of humanity reduced to present material reality as the only truth."
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. ZODIACAL_ARCHETYPES
// 12 signs with Steinerian characterology and Cosmosophy form-gesture
// ─────────────────────────────────────────────────────────────────────────────

export const ZODIACAL_ARCHETYPES: ZodiacalArchetype[] = [
  {
    sign: "Aries",
    archetype: "The primordial beginning-force — the head impulse, the capacity to originate from nothing, the courage of pure initiation before any certainty is present. Steiner associates Aries with the formation of the human head and thought in its most undifferentiated, originating form. Sign of the I-sense — the direct self-perception that awakens when the soul genuinely meets another I. Pre-birth signature of souls who chose radical new beginnings.",
    headChestLimbs: "head",
    sense: "I-sense / Sense of self",
    bodyRegion: "Head; originating thought",
    spiritualNote: "The Cherubim administer Aries through Hamal (force of the Ram) and Sheratan (dual initiating thrust). Perseus above provides the heroic-overcoming force; Algol (Caput Algol) marks the sub-sensible force Aries-courage must consciously confront.",
    cosmosophyGesture: "Looking back — the universe reaching into us"
  },
  {
    sign: "Taurus",
    archetype: "The formative earthy substance — the sense of vital warmth and life; the capacity to be genuinely present in the body. The sign of the throat and voice; of beauty as cosmic substance rather than aesthetic preference; of the I's encounter with the enduring permanence of material form. The Pleiades cluster makes Taurus one of the most cosmically charged signs — a direct gateway to the ancestral memory of humanity.",
    headChestLimbs: "head",
    sense: "Sense of life / Vitality sense",
    bodyRegion: "Throat; voice; larynx",
    spiritualNote: "Royal star Aldebaran (Watcher of the East) bestows firmness, integrity, and disciplined will contingent on full commitment. The Pleiades (Alcyone as cosmic heart) carry ancestral soul-memory. Orion below provides the great descender — spirit into matter.",
    cosmosophyGesture: "Inwardly mobile; the sideways leap imitating the universe"
  },
  {
    sign: "Gemini",
    archetype: "The duality that enables genuine communication — the I that must step outside itself to perceive another I. Sign of the lungs and breath as the mediating rhythm between inner and outer; of language as the form through which cosmic thinking descends into audible speech. The Twins as the archetype of the I-Thou encounter.",
    headChestLimbs: "head",
    sense: "Sense of thought / Conceptual sense",
    bodyRegion: "Lungs; breath; upper limbs",
    spiritualNote: "Castor (mortal twin) — the human capacity for skill and multiple intelligences. Pollux (immortal twin) — the divine element within human capacity. Alhena — the wound that becomes the method. Auriga above with Capella as cosmic goat-star of unconditional generosity.",
    cosmosophyGesture: "Touching / taking hold of oneself — hand holding hand"
  },
  {
    sign: "Cancer",
    archetype: "The sense of touch — the turning inward that occurs when the self meets the resistance of the world and discovers its own boundary. Sign of the soul's protective enclosure; of home as a cosmic gesture; of the chest and rhythmic system mediating between thinking and willing. In the tradition Cancer is the gate of descent — the portal through which souls entering incarnation from the spiritual world most recently passed.",
    headChestLimbs: "head",
    sense: "Sense of touch",
    bodyRegion: "Chest; rhythmic system; stomach",
    spiritualNote: "Praesepe (the Beehive cluster) is the ancient gateway where the tradition located the portal of souls before incarnation. Asellus Borealis and Australis are the sustaining forces at the threshold. The Hydra's long body begins here — the great serpentine force the Cancer-Leo threshold must consciously meet.",
    cosmosophyGesture: "Enclosing / closing oneself off"
  },
  {
    sign: "Leo",
    archetype: "The sense of vital life in its solar radiance. Sign of the heart region; the capacity for genuine individual self-expression that does not require an audience to be real. The sign where the I meets its own solar nature most directly — and where the Luciferic temptation is most immediate.",
    headChestLimbs: "chest",
    sense: "Sense of vital warmth / Solar vitality",
    bodyRegion: "Heart; blood system; upper back",
    spiritualNote: "Royal star Regulus (Watcher of the North) bestows genuine solar authority earned through integrity — one condition: no revenge. Denebola (tail of the Lion) carries wisdom from what has been completed. Algieba emanates the visible solar force. The solar force stands above the Hydra it must illuminate.",
    cosmosophyGesture: "That which fills — the blood, the heart"
  },
  {
    sign: "Virgo",
    archetype: "The sense of motion — the perception of one's own movement through space; the sign of the refinement of the instrument through service and disciplined daily craft. The intestinal system; the capacity for discernment at the cellular and spiritual level. The Divine Sophia dwells here in her cosmic form — the celestial woman who has internalized the solar force. The sign most directly connected to the development of Spirit-Self through earthly service rendered consciously.",
    headChestLimbs: "chest",
    sense: "Sense of motion / Proprioception",
    bodyRegion: "Intestines; digestive refinement",
    spiritualNote: "Spica (Ear of Wheat) is the most beneficent fixed star — the gift held in the extended hand; brilliance in art, science, and spiritual perception to those who have genuinely cultivated what they offer. Vindemiatrix (false certainty before genuine discernment). Arcturus above — renown through self-determination.",
    cosmosophyGesture: "Ripening — the ear of corn"
  },
  {
    sign: "Libra",
    archetype: "The sense of balance — the capacity to find one's right position in three-dimensional space, both physically and relationally. The kidneys as the cosmic balancing system between the two great organ-poles. The autumn equinox — the moment of perfect equilibrium between light and dark. The sign of cosmic justice as living force.",
    headChestLimbs: "chest",
    sense: "Sense of balance / Equilibrium",
    bodyRegion: "Kidneys; lower back; filtration",
    spiritualNote: "Zubenelgenubi (Southern Claw) — the capacity to hold what must eventually be weighed without premature verdict. Zubeneschamali (Northern Claw) — the only star described as greenish, pointing to living balance. Centaurus below with Chiron's constellation domain — the healer who bridges worlds.",
    cosmosophyGesture: "Finding balance — becoming part of the outer world"
  },
  {
    sign: "Scorpio",
    archetype: "The sense of smell — which Steiner identifies as the most spiritually dangerous of the outer senses; it brings us directly into the domain of black magicians when misused. Sign of the death-regeneration forces; of what must go underground before it can return transformed. The reproductive and eliminative systems; the capacity for genuine initiation through conscious descent. The Eagle as Scorpio's higher symbol — consciousness that has risen above the serpent force without denying its power.",
    headChestLimbs: "chest",
    sense: "Sense of smell",
    bodyRegion: "Reproductive system; eliminative organs; colon",
    spiritualNote: "Royal star Antares (Watcher of the West, Rival of Mars) is the most intense fixed star — passion and depth; the test: does intensity serve transformation or destruction? Graffias — poison and medicine as the same substance. Ophiuchus above stands with one foot on the Scorpion.",
    cosmosophyGesture: "The poison-sting — taking in the outer world"
  },
  {
    sign: "Sagittarius",
    archetype: "The sense of taste — the capacity to discriminate essence from surface; to know what genuinely nourishes and what only appears to. Sign of philosophical quest; the centauric duality of animal drive and spiritual aspiration. The archer whose arrow is aimed toward the Galactic Center. Jupiter's home — the expansion of the wisdom-forming capacity through encounter with what is larger than the personal biography.",
    headChestLimbs: "limbs",
    sense: "Sense of taste",
    bodyRegion: "Hips; thighs; sciatic system",
    spiritualNote: "Nunki — wisdom from having crossed the waters. The Galactic Center (~27 Sag) — configurations touching this point receive an impulse from the source of our galaxy's evolutionary intelligence. Corona Australis below — wisdom earned through philosophical descent into genuine life-experience.",
    cosmosophyGesture: "The hunter"
  },
  {
    sign: "Capricorn",
    archetype: "The sense of sight — the most spatially objective of the outer senses; the one that most fully confronts the objective world in its genuine otherness. Sign of crystallization; of the will applied to the material plane over long time horizons. The Mountain — not as obstacle but as the precise medium through which spiritual discipline takes earthly form. The sea-goat navigated the depths before ascending to the heights.",
    headChestLimbs: "limbs",
    sense: "Sense of sight / Vision",
    bodyRegion: "Knees; skeletal structure; skin",
    spiritualNote: "Dabih — the ancient gateway through which the Sun enters at winter solstice; deepest darkness containing the seed of returning light. Algedi — the creative intelligence available only through sustained constraint. Deneb Algedi — wisdom gathered at the summit. Aquila (Eagle) above with Altair — the most brilliantly individualized star of this field.",
    cosmosophyGesture: "The animal-breeder"
  },
  {
    sign: "Aquarius",
    archetype: "The sense of warmth — the capacity to register the flowing currents of warmth and cold, both physical and moral. Sign of the Water-Bearer who pours out cosmic intelligence for collective benefit while remaining individually sovereign. The Exusiai work here in their future-oriented mode — preparing what humanity will need in the coming Jupiter epoch. The sign where individual freedom and collective service must be reconciled rather than chosen between.",
    headChestLimbs: "limbs",
    sense: "Sense of warmth / Temperature",
    bodyRegion: "Ankles; calves; circulatory periphery",
    spiritualNote: "Royal star Fomalhaut (Watcher of the South) at the mouth of the Water-Bearer's stream — idealism that must be grounded in genuine reality or it becomes poisonous illusion. Sadalsuud (luckiest of the lucky) — collective good fortune that cannot be hurried. Pegasus above — intelligence that has earned its freedom of movement.",
    cosmosophyGesture: "The tiller of the soil"
  },
  {
    sign: "Pisces",
    archetype: "The sense of hearing — the sense that most completely dissolves the self into what is perceived. Steiner connects hearing to Pisces because the dissolution of self-boundaries required for genuine listening mirrors the two fish swimming in opposite directions — toward the cosmic, and returning to individual form through a freely chosen gesture of love. The gate of souls departing incarnation (opposite Cancer, gate of descent).",
    headChestLimbs: "limbs",
    sense: "Sense of hearing / Tone sense",
    bodyRegion: "Feet; lymphatic system",
    spiritualNote: "Alrescha (the Cord that binds the two fish) — the paradox of dual direction held by a single thread of destiny. Revati — the hidden abundance in apparent dissolution. Cetus below — the great sea-monster the soul must navigate without being swallowed. Fomalhaut overlaps at the very edge.",
    cosmosophyGesture: "Trade — ships as fishes upon the sea"
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 3. TWELVE_SENSES
// 12 senses mapped to signs (GA 169, GA 265a)
// ─────────────────────────────────────────────────────────────────────────────

export const TWELVE_SENSES: TwelveSense[] = [
  {
    sign: "Aries",
    sense: "Sense of self / I-sense",
    quality: "Direct perception of another individuality as a genuine spiritual being; feeling the presence of an I in another person, distinct from all impression of their personality.",
    transitAwakening: "Sphere transiting Aries activates the question of genuine self-recognition and genuine recognition of the other; the I confronts itself in what it meets.",
    dayOrNight: "Upper / Day"
  },
  {
    sign: "Taurus",
    sense: "Sense of life / Vitality sense",
    quality: "The inner feeling of well-being or its absence — freshness, exhaustion, health, disease; the etheric body reporting on its own state from moment to moment.",
    transitAwakening: "Sphere transiting Taurus activates the etheric body's report; bodily wisdom and physical vitality become the primary subject of the soul's attention.",
    dayOrNight: "Lower / Will"
  },
  {
    sign: "Gemini",
    sense: "Sense of thought / Conceptual sense",
    quality: "Perception of the living concept within another's speech — not the sound but the actual thought-being living within words; genuine understanding of another's meaning as distinct from their expression.",
    transitAwakening: "Sphere transiting Gemini tests whether we are meeting actual thoughts or merely sounds; the quality of genuine intellectual encounter in the soul's daily life.",
    dayOrNight: "Upper / Day"
  },
  {
    sign: "Cancer",
    sense: "Sense of touch",
    quality: "The turning inward — perception of resistance, hardness, softness; the precise boundary where the self meets the world and discovers its own edges for the first time or the hundredth.",
    transitAwakening: "Sphere transiting Cancer activates boundary-consciousness; the biographical question of where the self ends and the world begins becomes urgent and real.",
    dayOrNight: "Lower / Will"
  },
  {
    sign: "Leo",
    sense: "Sense of vital warmth / Solar vitality",
    quality: "The felt quality of life-warmth radiating from one's own solar center; the direct sense of being genuinely alive and present rather than performing aliveness.",
    transitAwakening: "Sphere transiting Leo activates the question of genuine self-expression versus performance; the solar vitality either flows naturally or is revealed as blocked.",
    dayOrNight: "Middle / Soul"
  },
  {
    sign: "Virgo",
    sense: "Sense of motion / Proprioception",
    quality: "Perception of one's own movement — the felt sense of joints, muscles, the body's gesture through space; bodily self-knowledge that arrives only through action, not through observation.",
    transitAwakening: "Sphere transiting Virgo activates the body's movement-intelligence; the practitioner's relationship to their own daily gestures, rhythms, and the intelligence stored in the body's habitual patterns.",
    dayOrNight: "Lower / Will"
  },
  {
    sign: "Libra",
    sense: "Sense of balance / Equilibrium",
    quality: "The capacity to find one's right position in three-dimensional space — the vestibular intelligence; the felt sense of being properly oriented in the world, and the immediate recognition of when that orientation has been lost.",
    transitAwakening: "Sphere transiting Libra tests the soul's actual relationship to relational balance; what is genuinely out of equilibrium in the I's relation to others becomes visible and unable to be avoided.",
    dayOrNight: "Lower / Will"
  },
  {
    sign: "Scorpio",
    sense: "Sense of smell",
    quality: "The outer sense most deeply penetrating the life processes; smell most directly contacts the etheric forces of substances; the sense most associated with instinctive soul-knowledge that bypasses analysis. Steiner: the most dangerous sense for spiritual work.",
    transitAwakening: "Sphere transiting Scorpio activates the instinctive knowing that lives below conscious awareness; the olfactory-spiritual faculty of recognition that does not wait for the mind to confirm it.",
    dayOrNight: "Middle / Soul"
  },
  {
    sign: "Sagittarius",
    sense: "Sense of taste",
    quality: "The capacity to discriminate essence from surface in everything that nourishes — food, ideas, philosophies, relationships; the sense that knows what genuinely feeds the soul versus what only appears to and depletes it.",
    transitAwakening: "Sphere transiting Sagittarius activates the soul's capacity for genuine philosophical discernment; hunger for what truly nourishes, and the capacity to distinguish real wisdom from its sophisticated imitation.",
    dayOrNight: "Middle / Soul"
  },
  {
    sign: "Capricorn",
    sense: "Sense of sight / Vision",
    quality: "The most spatially objective of the outer senses; perceiving color and form at a distance; the sense that most fully confronts the objective world in its genuine otherness, unchanged by the soul's desire to see otherwise.",
    transitAwakening: "Sphere transiting Capricorn activates the capacity to see clearly — what has been avoided seeing, what the I's will-force now demands be looked at directly rather than circled around indefinitely.",
    dayOrNight: "Middle / Soul"
  },
  {
    sign: "Aquarius",
    sense: "Sense of warmth / Temperature",
    quality: "The capacity to register flowing warmth and cold — both physical and moral; warmth as a soul event rather than merely a skin event. Steiner: like flowing water that rises and falls with the currents of what is genuinely warm and what has grown cold.",
    transitAwakening: "Sphere transiting Aquarius activates sensitivity to moral warmth and cold in the social environment; the soul becomes a thermometer of the collective's spiritual temperature and cannot pretend otherwise.",
    dayOrNight: "Middle / Soul"
  },
  {
    sign: "Pisces",
    sense: "Sense of hearing / Tone sense",
    quality: "The sense that most completely dissolves the self into what is perceived — genuine hearing requires the dissolution of personal agenda. Steiner: Pisces was named by occultists in relation to the sense of hearing because of this quality of self-dissolution in what is received.",
    transitAwakening: "Sphere transiting Pisces activates the capacity to genuinely hear — the soul is asked to dissolve its own noise and receive what the cosmic environment is actually communicating rather than what the I wishes to hear.",
    dayOrNight: "Middle / Soul"
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 4. TRANSIT_LANGUAGE
// Per-sphere transit descriptions as initiatory curriculum
// ─────────────────────────────────────────────────────────────────────────────

export const TRANSIT_LANGUAGE: TransitLanguage[] = [
  {
    planet: "Saturn",
    duration: "~2.5 years per sign",
    hierarchyBrings: "The threshold guardian arrives at the precise biographical domain where the I has accumulated karmic material requiring concentrated attention. The Archai administer the I's developmental calendar — Saturn transits are scheduled initiatory thresholds, not random obstacles. The soul is asked to earn through genuine effort what it has only felt entitled to by virtue of past development.",
    senseAwakened: "The zodiacal sense of the transited sign becomes the specific perceptual faculty through which the Saturn curriculum is delivered. Saturn in Libra: the sense of balance is tested under genuine relational pressure. Saturn in Gemini: the conceptual sense is pressed to develop genuine depth rather than the facility that has passed for depth. The pressure is the curriculum.",
    bodyConcentration: "Saturn works through the physical body's structural dimension and through the I's karmic commitments. Physical concentration in bones, spleen, skin during Saturn transits is the body's record of where the curriculum concentrates.",
    lucifericRisk: "Spiritual bypass of what Saturn is genuinely asking through retreat into higher-sounding perspectives; karma spiritualized away rather than worked through; false transcendence.",
    ahrimanicRisk: "Limitation hardened into permanent fate; the I imprisoned by its structural limitations; karmic configuration mistaken for unalterable identity.",
    centralPrinciple: "Saturn transits are scheduled initiatory thresholds. The Archai administer the I's developmental calendar. The soul earns through genuine effort what it has only felt entitled to by past development."
  },
  {
    planet: "Jupiter",
    duration: "~1 year per sign",
    hierarchyBrings: "The Kyriotetes pour wisdom-forming forces into the I's encounter with the sign's archetypal domain. This is not mere good fortune — it is cosmic generosity that expects genuine philosophical engagement in return. The I receives more access to wisdom than it has yet earned, and must rise to meet the gift rather than simply enjoy the ride of it.",
    senseAwakened: "Jupiter activates each zodiacal sense as a domain of expansive philosophical engagement. Jupiter in Cancer activates the sense of touch — a heightened sensitivity to the boundaries between self and world takes on philosophical depth. Jupiter in Pisces activates the sense of hearing at its most dissolving — the capacity for genuine listening becomes a philosophical practice.",
    bodyConcentration: "The etheric body's wisdom-forming capacity and the liver's metabolic intelligence respond most directly.",
    lucifericRisk: "Expansion beyond what has been earned; hubris dressed as philosophical development; the teacher who has stopped learning.",
    ahrimanicRisk: "Reducing the wisdom-opportunity to mere information accumulation without genuine inner transformation of the one receiving it.",
    centralPrinciple: "Jupiter transits bring cosmic generosity that expects genuine philosophical engagement in return. Wisdom received must be risen to, not merely enjoyed."
  },
  {
    planet: "Mars",
    duration: "~6-7 weeks per sign",
    hierarchyBrings: "The Archangels provide the will-force needed to engage what the I has been circling without committing. Mars transits do not create conflict — they reveal what was already present but unnamed or avoided. The sphere is a liberating force when the I can meet its own will honestly; it becomes destructive only when the will is driven unconsciously by the astral body's older reactions.",
    senseAwakened: "Mars activates whatever zodiacal sense the sign carries with the quality of initiating force — the impulse to act from it rather than merely register it. Mars in Aries: the I-sense demands action from genuine self-recognition. Mars in Pisces: genuine hearing must lead to concrete deed rather than remaining in the beautiful space of attentive receptivity.",
    bodyConcentration: "The gall bladder, muscular system, and iron in the blood respond most directly. Suppressed will during Mars transits tends to accumulate in the biliary system before manifesting physically.",
    lucifericRisk: "Aggression dressed as initiative; speed substituting for genuine courage; passion substituting for purposeful direction.",
    ahrimanicRisk: "Cold force executing without the moral warmth that would make it serve spirit rather than mechanism; will treating other human beings as instruments.",
    centralPrinciple: "Mars transits reveal what was already present but unnamed or avoided. The sphere is liberating when the I meets its own will honestly."
  },
  {
    planet: "Venus",
    duration: "~3-4 weeks per sign direct",
    hierarchyBrings: "The Dynamis harmonize — Venus transits bring genuine relational intelligence into the foreground of the I's experience. The soul's capacity for love, beauty, and moral warmth is activated and made visible through its quality of expression. The I's actual relationships become a mirror of its inner state of development.",
    senseAwakened: "Venus activates each zodiacal sense with the quality of warmth and genuine encounter. Venus in Libra: the sense of balance becomes the domain of relational intelligence — the capacity to hold one's own equilibrium while genuinely receiving another. Venus retrograde: the inward-turning of all these sense-qualities — review before expression.",
    bodyConcentration: "The kidneys and the astral body's harmonizing capacity respond most directly. Venus retrograde intensifies the inward movement — the soul reviews its relationship to beauty and love before expressing outward.",
    lucifericRisk: "Idealization; the I dissolved in the relational field; love inflated into dependency or self-dissolution.",
    ahrimanicRisk: "Love calculated rather than freely given; beauty as social currency rather than genuine reverence; relation governed entirely by transaction.",
    centralPrinciple: "Venus transits make the I's actual relationships a mirror of its inner state. The Dynamis harmonize; the soul's love-capacity is activated and made visible."
  },
  {
    planet: "Mercury",
    duration: "~2-3 weeks per sign direct",
    hierarchyBrings: "Mercury transits activate the I's capacity to mediate — to bring inner intelligence into articulable, transmissible form. The Archangels coordinate the cultural-temporal expression of thinking through Mercury's passage; these transits are moments when the thinking faculty receives an infusion from the collective intelligence active in the current epoch.",
    senseAwakened: "Mercury activates the language and thought dimension of each zodiacal sense — the capacity not merely to perceive but to name and communicate what is perceived. Mercury in Scorpio: the capacity to name what the sense of smell is detecting in the hidden structures of what presents itself to the I's attention.",
    bodyConcentration: "Lungs, respiratory rhythm, and the nerve-sense organization's communicative function. Mercury retrograde: the I is asked to review its thinking — where has cognitive architecture become rigid?",
    lucifericRisk: "Cleverness; speed substituting for depth; facility mistaken for genuine insight; wit without substance.",
    ahrimanicRisk: "Reduction of living thinking to dead categorical application; habitual formulation mistaken for genuine insight; concepts become dead counters.",
    centralPrinciple: "Mercury transits activate the I's capacity to mediate and bring inner intelligence into articulable form. The thinking faculty receives an infusion from collective epoch-intelligence."
  },
  {
    planet: "Moon",
    duration: "~2.5 days per sign",
    hierarchyBrings: "The Moon's rapid passage through the zodiac activates each sense in sequence — a daily rhythm of perceptual emphasis that the soul lives through largely below the threshold of ordinary consciousness. The Angel accompanying the individual works through the Moon's transits to bring accumulated soul-memory into brief contact with each zodiacal archetypal force.",
    senseAwakened: "Each of the twelve senses is awakened for approximately 2.5 days as the Moon passes through its sign. These brief activations form the background rhythm against which the longer sphere transits are heard — too rapid and constant for the I to consciously track, but real as the tidal rhythm they mirror in the body's fluid organization.",
    bodyConcentration: "The etheric body registers the Moon's transits most directly — moods, physical rhythms, feeling-tone all pulse with the lunar passage.",
    lucifericRisk: "Full Moon: maximum etheric expansion, soul most exposed — emotional inflation, the I swept along by accumulated feeling-patterns.",
    ahrimanicRisk: "New Moon: rationality suppressing the feeling-life precisely when it most needs to be honored; the soul's interior contracted rather than gathered.",
    centralPrinciple: "The Moon's daily rhythm activates each zodiacal sense in sequence, forming the background rhythm of perceptual life. The Angel works through lunar transits to bring soul-memory into brief contact with each archetypal force."
  },
  {
    planet: "Sun",
    duration: "~30 days per sign",
    hierarchyBrings: "The Sun's passage through each sign illumines it with the full force of I-organizing intelligence — the Exusiai work through each zodiacal field in sequence, activating each sign's archetypal quality in the collective soul-life of humanity. In natal terms, the Sun's current transit activates whatever sphere-configurations the individual holds in that sign.",
    senseAwakened: "The Sun illumines each zodiacal sense with I-consciousness — during its month in each sign, the corresponding sense is available to the highest development of which the I is currently capable. The Sun in Aquarius: the warmth-sense becomes the I's primary perceptual domain; moral warmth and cold in the social environment become immediately legible as biographical facts.",
    bodyConcentration: "The heart and blood system respond to Solar transits — the cardiovascular rhythm shifts subtly through the year as the Sun moves. The I's organizing principle is engaged throughout.",
    lucifericRisk: "Solar inflation at the Sun's natal return — the I convinced of its annual renewal without the genuine developmental reckoning that alone makes renewal real.",
    ahrimanicRisk: "The Solar return reduced to a calendar date; the I's annual biographical reckoning dismissed as sentiment; what has actually changed in the quality of the I itself goes unexamined.",
    centralPrinciple: "The Solar return to the natal position is the I's annual biographical reckoning: not what has been accomplished — what has genuinely changed in the quality of the I itself?"
  },
  {
    planet: "Uranus / Neptune / Pluto",
    duration: "Uranus 84 years full cycle; Neptune 165 years; Pluto 248 years",
    hierarchyBrings: "The outer three spheres move so slowly that their transits through signs are generational rather than biographical in the ordinary sense. When they make exact configurations to natal sphere positions, the collective evolutionary forces they carry make direct contact with the individual karmic curriculum.",
    senseAwakened: "The outer spheres do not activate specific zodiacal senses in the way the inner seven do. They activate the whole sense-field at a collective level — the generation born under a particular outer sphere configuration shares a particular quality of perceptual challenge that runs through all twelve senses simultaneously as a background coloring of the epoch.",
    bodyConcentration: "These are the transits that change not what a person does but what kind of person they become. The adversarial forces operate at civilizational rather than individual scale.",
    lucifericRisk: "Uranus: disruption for its own sake; false freedoms that dissolve without building anything truer. Neptune: spiritual escapism; mass mystical confusion mistaken for genuine Imagination. Pluto: depth and destruction confused; the underworld as permanent identity rather than a passage.",
    ahrimanicRisk: "Uranus: the I conforming to outdated structures; collective evolutionary necessity denied. Neptune: the mystical capacity systematically suppressed. Pluto: the power of depth-force used to dominate rather than genuinely transform.",
    centralPrinciple: "Outer sphere transits mark the moments when the civilizational evolutionary field makes direct contact with the I's personal karmic curriculum. Asuric beings work through Uranus contacts; Luciferic forces exploit Neptune transits; Pluto transits are the arena of civilizational death-and-regeneration."
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 5. COSMOSOPHY_FORMS
// 12 zodiacal form-gestures from GA 208, Lecture IV
// ─────────────────────────────────────────────────────────────────────────────

export const COSMOSOPHY_FORMS: CosmosophyForm[] = [
  {
    sign: "Aries",
    gesture: "Looking back — the universe reaching into us",
    region: "head",
    cosmicSource: "Formed from the universe; the head is a passenger carried by the rest of the body"
  },
  {
    sign: "Taurus",
    gesture: "Inwardly mobile; the sideways leap imitating the universe",
    region: "head",
    cosmicSource: "Formed from the universe; the head receives the cosmic gesture of vital movement"
  },
  {
    sign: "Gemini",
    gesture: "Touching / taking hold of oneself — hand holding hand",
    region: "head",
    cosmicSource: "Formed from the universe; the dual gesture of self-contact and I-Thou encounter"
  },
  {
    sign: "Cancer",
    gesture: "Enclosing / closing oneself off",
    region: "head",
    cosmicSource: "Formed from the universe; the protective enclosure as a cosmic gesture of boundaries"
  },
  {
    sign: "Leo",
    gesture: "That which fills — the blood, the heart",
    region: "chest",
    cosmicSource: "Formed from within; the chest is the carer and wet-nurse of the whole organization"
  },
  {
    sign: "Virgo",
    gesture: "Ripening — the ear of corn",
    region: "chest",
    cosmicSource: "Formed from within; refinement through service; the harvest of genuine daily cultivation"
  },
  {
    sign: "Libra",
    gesture: "Finding balance — becoming part of the outer world",
    region: "chest",
    cosmicSource: "Formed from within; the chest mediates between inner and outer through the balancing impulse"
  },
  {
    sign: "Scorpio",
    gesture: "The poison-sting — taking in the outer world",
    region: "chest",
    cosmicSource: "Formed from within; the penetrating intake of what lies outside; poison and medicine as the same force"
  },
  {
    sign: "Sagittarius",
    gesture: "The hunter",
    region: "limbs",
    cosmicSource: "Earthly human activity; the limbs are the worker used as a slave — purposeful, directed movement"
  },
  {
    sign: "Capricorn",
    gesture: "The animal-breeder",
    region: "limbs",
    cosmicSource: "Earthly human activity; cultivation of living forces through sustained earthly engagement"
  },
  {
    sign: "Aquarius",
    gesture: "The tiller of the soil",
    region: "limbs",
    cosmicSource: "Earthly human activity; working the ground that feeds the collective; intelligence made into service"
  },
  {
    sign: "Pisces",
    gesture: "Trade — ships as fishes upon the sea",
    region: "limbs",
    cosmicSource: "Earthly human activity; navigation and exchange across the oceanic dissolution; the limbs as vessels"
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 6. SEVEN_LIFE_LEVELS
// Seven levels of life mapped to planets (GA 208, Lecture V)
// Note: distinct from the canonical seven life processes (GA 170/206)
// ─────────────────────────────────────────────────────────────────────────────

export const SEVEN_LIFE_LEVELS: SevenLifeLevel[] = [
  {
    planet: "Saturn",
    lifeLevel: "Life of the senses",
    quality: "Life in the process of dying — Saturn dries the vessel so a sense-apparatus can form. Nearest the zodiac.",
    mechanism: "A planet normally restrains the Sun's life so an organ can crystallize; when the Sun blocks out Saturn (approximately once every 30 years), the life-of-the-senses receives a special stimulus — a biographical awakening of the entire sense-apparatus."
  },
  {
    planet: "Jupiter",
    lifeLevel: "Life of the nerves",
    quality: "A resting life, a life that holds and keeps — after-images, the lingering of sound.",
    mechanism: "When the Sun blocks out Jupiter (approximately once every 12 years), the nervous life receives a special stimulus — the after-image quality intensifies; what has been perceived is held and deepened rather than immediately released."
  },
  {
    planet: "Mars",
    lifeLevel: "Life of breathing",
    quality: "The image-creating life — poetry and music are stimulated when the Mars-life is restrained.",
    mechanism: "When the Sun blocks out Mars (approximately once every 2 years), the life of breathing receives a special stimulus — image-creating forces intensify; the respiratory rhythm becomes a vehicle for artistic and imaginative activity."
  },
  {
    planet: "Sun",
    lifeLevel: "Life of circulation / rhythm",
    quality: "The Sun is the source of light, life, and love: light in the outside world, love in our hearts, life in our dealings with the world. The heart sits midway between breathing and circulation.",
    mechanism: "The Sun is not restrained — it is the source. The heart stands midway between the Mars-breathing principle and the Venus-movement principle; the Sun's circulation-life is the rhythmic center from which all other life-levels are organized."
  },
  {
    planet: "Venus",
    lifeLevel: "Life of movement",
    quality: "Energy streaming through — an energy human being inside one.",
    mechanism: "When the Sun blocks out Venus, the movement-life receives a special stimulus — the felt quality of energy streaming through the organism intensifies; the capacity for fluid, harmonious movement in both physical and relational life is awakened."
  },
  {
    planet: "Mercury",
    lifeLevel: "Life of metabolism",
    quality: "Takes up physical matter and processes its energies.",
    mechanism: "When the Sun blocks out Mercury, the metabolic life receives a special stimulus — the capacity for transformative processing intensifies; what has been taken in is more fully digested at both the physical and cognitive levels."
  },
  {
    planet: "Moon",
    lifeLevel: "Life of reproduction",
    quality: "A space is created, matter pushed back into chaos, the embryo organized out of the cosmos.",
    mechanism: "When the Sun blocks out the Moon, the reproductive life receives a special stimulus — generative forces are awakened; the Moon's work of pushing matter into chaos so that new form can be organized from the cosmos is heightened for that period."
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 7. SOUL_DYNAMICS
// Thinking / feeling / willing as living activity (GA 207-208)
// ─────────────────────────────────────────────────────────────────────────────

export const SOUL_DYNAMICS: SoulDynamic[] = [
  {
    activity: "Thinking",
    livesBetween: "Physical body and Etheric body",
    consciousness: "We are awake in our thoughts",
    note: "Sense-perception is the outer pole; the deed is the opposite pole of the same axis. Karma inside the daily rhythm: every morning on awaking, the human being passes the region of past karma."
  },
  {
    activity: "Feeling",
    livesBetween: "Etheric body and Astral body",
    consciousness: "We dream our feelings",
    note: "Feelings are dreams submerged into our organization. The meeting-point of past and future — present mood already carries the coloring of the unknown future. Every evening on falling asleep, the human being passes the region of future karma."
  },
  {
    activity: "Willing",
    livesBetween: "Astral body and the I",
    consciousness: "We sleep over our will",
    note: "With deeds we experience everything in the conceptual life; we dream of it in feeling; we sleep over it in the actual life of will. Conscience is the meeting of moral will with the inner chaos — this is the actual source of conscience."
  },
  {
    activity: "Will (ascending scale)",
    livesBetween: "Organic activity — sleep-level; metabolism",
    consciousness: "Antipathy and sympathy at root level",
    note: "The ascent from will to sense-perception: Will (organic/sleep), Feeling (soul/dream), Judgment/idea-forming (mind-spirit/image), Sense-perception (the activity of the gods — light/darkness). Evil is necessary and rightly placed: nothing in the world is in itself evil or good; evil has its function."
  },
  {
    activity: "Sense-perception",
    livesBetween: "Beyond the zodiac — the human sense-fillings reach to the region beyond the zodiac, which animals cannot",
    consciousness: "The activity of the gods — light and darkness",
    note: "God in the light is the divine principle with Luciferic bias; God in the dark with Ahrimanic bias. The twelve senses are twelve pockets with their fillings — the eye-socket is the pocket, the eye is the filling. In this respect human beings go beyond the zodiac; animals do not."
  },
  {
    activity: "Sleep and future bodies",
    livesBetween: "Physical body structured by Vulcan-stage consciousness; ether body by Venus-stage; astral body by Jupiter-stage",
    consciousness: "We are created out of the spirit every night",
    note: "Going to sleep, we always unconsciously ask a question; waking up, the answer is given — and in waking life that answer becomes the voice of conscience. The Earth phosphoresces at night from sleeping human ether-bodies. Waking = mood of autumn/winter; falling asleep = spring/summer."
  },
  {
    activity: "Hierarchies in soul-faculties",
    livesBetween: "Inner-to-outer scale of human expression",
    consciousness: "Cognition-ladder: ordinary perception (Spirits of Form); Imagination (Angels); Inspiration (Archangels); Intuition (Archai)",
    note: "Sense-perception reveals Spirits of Form (Elohim). Thoughts are the mineralizing/salt-crystallizing of thinking — Archai active. Speech/language is administered by Archangels (folk-spirits; people are the product of their language). Imagination/dreams are one-to-one with individual Angels. Will/action — the I lives in the sum of all our actions."
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 8. DEATH_REBIRTH
// 4 eschatological framework entries (GA 207-208)
// ─────────────────────────────────────────────────────────────────────────────

export const DEATH_REBIRTH: DeathRebirthEntry[] = [
  {
    title: "The Moon as Karmic Mediator",
    content: "Between death and rebirth we are not outside the Moon but inside it — we always see the inside of the Moon. The Moon preserves the events of one life on earth as something that comes into effect in a later life — it is the mediator between the individual earth lives, not the cinder we see as a shining light. This deepens the Lunar-sphere's soul-memory function into an explicit karmic vehicle: the Moon holds the record of what each incarnation accomplished in a form that seeds the next."
  },
  {
    title: "We Become the Sun — The Great Inversion",
    content: "After death the sun immediately disappears, for we ourselves are then the sun. Earth is heaven; sun is earth in the life between death and rebirth. Behind us stands the whole world of the spirit with all the hierarchies. Our deeds become our very self: we are after death every one of our deeds. Whoever has done good or evil to anyone is then himself that which he did. The governing formula (GA 208, Lecture I): The outer becomes inner. The inner becomes outer. What is now our inner life — thoughts, feelings, the people we have loved — becomes, after death, our entire cosmos; and what is now the outer world becomes our inner content."
  },
  {
    title: "The Midnight Hour of Existence — Weltenmitternacht",
    content: "After death the thought-element longs to become world while the will-element longs to become man; at the Midnight Hour this longing reverses — thought begins to long for the human state, will begins to pour itself into the cosmos. The will (longing to become world) lives already in the propagation of the generations into which we then descend — it precedes us into the heredity-stream. The future cosmos is being woven from the inner life of present humanity: it is superficial to say Earth will become Jupiter. The physical substance of the earth will melt away. The tissue woven around it out of our feelings will be the future earth — and become the true Jupiter planet."
  },
  {
    title: "The Three Kingdoms and the Building of Organs",
    content: "We pass through death with a mineral consciousness colored by moral experience, then successively work upon the mineral, plant, and animal kingdoms as the inner side of our after-death life. From the animal group-souls we build our own future organs (brain, heart, lungs as forces). The fertilized germ-cell is not complex structure but chaos: into this disintegrating chaos pours the human being. The embryo is not inherited form — substance is thrown into chaos in the maternal body and the form is implanted out of the universe; only the bed for the new human being is created in the maternal body. The four elements reverse after death: Warmth (living) is experienced as Scent; Light as Smoke/Air (Hebrew Ruach); Chemical workings as Water; Life as Earth (the whole earth perceived as one living being)."
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 9. ORGAN_DEVELOPMENT
// Planetary organ correspondences from spiritual science
// ─────────────────────────────────────────────────────────────────────────────

export interface OrganDevelopment {
  planet: string;
  organ: string;
  glyph: string;
  sevenYear: string;
  function_en: string;
  developmental_task: string;
  pathology_note?: string;
}

export const ORGAN_DEVELOPMENT: OrganDevelopment[] = [
  {
    planet: 'Moon',
    organ: 'Brain & Reproductive Organs',
    glyph: '☽',
    sevenYear: '0–7',
    function_en: 'The Moon forces shape the brain during the first seven-year period and stand in polarity with the reproductive organs — the forces of growth and memory are concentrated in the head during childhood and later freed for thinking.',
    developmental_task: 'Allowing the etheric forces to complete their brain-building work before intellectual demands are imposed. The tooth change signals this release.',
    pathology_note: 'Premature intellectual forcing before the seventh year redirects formative forces away from organ development.',
  },
  {
    planet: 'Mercury',
    organ: 'Lungs & Speech Organs',
    glyph: '☿',
    sevenYear: '7–14',
    function_en: 'Mercury governs the respiratory system and the mediating function of the nervous system. Breath and speech are the organs of Mercury — the in-breathing of the world and the out-breathing of thought.',
    developmental_task: 'Developing rhythm in breathing and speaking; cultivating the musical sense as a preparation for thinking.',
  },
  {
    planet: 'Venus',
    organ: 'Kidneys & Venous Blood',
    glyph: '♀',
    sevenYear: '14–21',
    function_en: 'Venus governs the kidney-bladder polarity and the venous blood return — the assimilation of the world into the organism and the aesthetic organization of the body fluids.',
    developmental_task: 'The development of aesthetic sensitivity and harmonizing forces as the astral body descends more fully into the organism.',
  },
  {
    planet: 'Sun',
    organ: 'Heart',
    glyph: '☉',
    sevenYear: '21–28',
    function_en: 'The Sun stands at the center of the organism as the heart stands at the center of the circulatory system. The heart is not a pump but a sense organ — it senses the rhythm of the blood and responds to the I.',
    developmental_task: 'Developing a conscious relationship to the rhythmic system — finding the balance between thinking (nerve-sense) and willing (metabolic).',
    pathology_note: 'Heart conditions in the spiritual-scientific picture reflect disturbances in the soul\'s capacity to find its equilibrium.',
  },
  {
    planet: 'Mars',
    organ: 'Gallbladder & Bile',
    glyph: '♂',
    sevenYear: '28–35',
    function_en: 'Mars governs the bile-secreting function of the liver-gallbladder system. Bile is the outer expression of the forces of courage, confrontation, and will that Mars carries spiritually.',
    developmental_task: 'Learning to direct the martial impulse consciously — transforming aggression into purposeful initiative.',
    pathology_note: 'Blocked Mars energy may appear as bitterness, resentment, or gallbladder inflammation.',
  },
  {
    planet: 'Jupiter',
    organ: 'Liver',
    glyph: '♃',
    sevenYear: '35–42',
    function_en: 'Jupiter governs the liver as the great organ of assimilation and distribution — transforming what is taken in from the world into substance the organism can use. The liver is the central metabolic organ.',
    developmental_task: 'Developing wisdom as a metabolic faculty — digesting experience and transforming it into insight that nourishes others.',
  },
  {
    planet: 'Saturn',
    organ: 'Spleen & Skeleton',
    glyph: '♄',
    sevenYear: '42–49',
    function_en: 'Saturn governs the bony skeleton and the spleen\'s blood-forming function. The skeleton is the most mineralized and Saturnine structure in the human body — it is the outer limit, the crystallized form.',
    developmental_task: 'Making peace with form and limitation; allowing the Saturnine wisdom of time and structure to become an inner resource rather than an external prison.',
    pathology_note: 'Sclerotic or calcifying conditions reflect Saturnine forces operating without sufficient Jupiterian warmth.',
  },
];
