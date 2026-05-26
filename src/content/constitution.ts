// NEVER_AI — All ninefold member descriptions are human-authored.

export type NinefoldMember =
  | 'physical_body'
  | 'etheric_body'
  | 'astral_body'
  | 'sentient_soul'
  | 'intellectual_soul'
  | 'consciousness_soul'
  | 'spirit_self'
  | 'life_spirit'
  | 'spirit_human';

export type ActivationLevel = 'active' | 'developing' | 'latent';

export interface MemberDescription {
  member: NinefoldMember;
  name: string;
  germanName: string;
  brief: string;
  active: string;
  developing: string;
  latent: string;
  color: string;
}

// NEVER_AI — authored below
export const NINEFOLD_MEMBERS: MemberDescription[] = [
  {
    member: 'physical_body',
    name: 'Physical Body',
    germanName: 'Physischer Leib',
    brief:
      'The mineral body — the form that obeys the laws of the physical world: gravity, chemistry, death. It is the densest vehicle of the human being and the one most thoroughly investigated by natural science.',
    active:
      'You are grounded in the physical world. Sensory experience is vivid and trustworthy. The body communicates clearly when it needs attention, and you hear it. Physical practice — rhythm, rest, nourishment — is a meaningful part of your daily life.',
    developing:
      'Your relationship to the physical body is becoming more conscious. You are learning to read its signals rather than override them, to treat it as a collaborator rather than an instrument.',
    latent:
      'The physical body tends to be ignored or treated as a burden. There may be difficulty with bodily rhythms, boundary awareness, or with taking physical existence seriously as a spiritual concern.',
    color: '#78716C',
  },
  {
    member: 'etheric_body',
    name: 'Etheric Body',
    germanName: 'Ätherleib',
    brief:
      'The life body — the formative forces that hold the physical together against dissolution. It is the carrier of memory, of habit, of the rhythms that repeat through a life: health, sleep, growth.',
    active:
      'Your life forces are strong. You recover well. Memory is reliable. Habits, once formed, hold. There is a natural vitality that renews itself without effort. The rhythms of your life have a quality of continuity.',
    developing:
      'The etheric body is coming into greater harmony. You are noticing the rhythms of your life — sleep, digestion, seasonal shifts — and learning to work with them rather than against them.',
    latent:
      'Life rhythms may be disrupted or difficult to establish. Recovery from effort, illness, or emotional strain can be slow. Memory may be patchy. There is work to be done in building the consistency of the life body through rhythm and practice.',
    color: '#C9A84C',
  },
  {
    member: 'astral_body',
    name: 'Astral Body',
    germanName: 'Astralleib',
    brief:
      'The soul body — the vehicle of desire, pleasure, pain, and the inner life of feeling. It is what moves through us in waking as emotion and in sleep as dream. The animal kingdom shares this member with the human being.',
    active:
      'Your feeling life is rich and mobile. You are moved by what you encounter. Empathy is genuine and often intense. The astral body is alert — sometimes too alert, carrying more of the world\'s suffering than is sustainable. The task is not to quiet it but to organise it.',
    developing:
      'The astral life is becoming more conscious. You are learning to distinguish between what moves through you as genuine feeling and what is reaction, conditioning, or carried feeling from others.',
    latent:
      'The feeling life may seem distant or difficult to access. There may be a quality of emotional numbness or of feelings that appear suddenly and without apparent cause. The astral body is present but not yet speaking clearly.',
    color: '#A8B4C0',
  },
  {
    member: 'sentient_soul',
    name: 'Sentient Soul',
    germanName: 'Empfindungsseele',
    brief:
      'The lowest member of the soul triad — the soul surface that turns toward the world of sensation and desire. It is the seat of immediate experience: pleasure, appetite, and the first registering of impressions before they are processed.',
    active:
      'You live with immediacy. The present moment is vivid. Sensory experience matters. There is a directness of response to what meets you — delight and irritation both register clearly. The challenge is to bring what is registered inward for deeper processing.',
    developing:
      'You are learning to be present to immediate experience without being consumed by it. The sentient soul is becoming a clear receptor rather than a reactive one.',
    latent:
      'Immediate experience may feel muted or overwhelming by turns. There may be difficulty with the present moment — either fleeing from it into abstraction or being flooded by it.',
    color: '#E8B480',
  },
  {
    member: 'intellectual_soul',
    name: 'Intellectual Soul',
    germanName: 'Verstandes- oder Gemütsseele',
    brief:
      'The middle member of the soul — the capacity to form inward representations, to reflect, to deliberate. It is where feelings become thoughts and thoughts begin to take on moral character. Also called the "Mind Soul."',
    active:
      'You think through what you feel. Experience is processed and made intelligible before it moves you to action. There is a natural inclination to understand — to find the principle behind the event. This can be a gift and occasionally a delay.',
    developing:
      'The capacity to reflect is growing. You are moving from immediate reaction toward considered response. The distance between event and meaning is widening, and within that space something wiser is beginning to speak.',
    latent:
      'The movement from feeling to understanding may be short-circuited — either by acting before reflecting or by reflecting without the warmth of genuine feeling. The middle member needs cultivation.',
    color: '#7E97B8',
  },
  {
    member: 'consciousness_soul',
    name: 'Consciousness Soul',
    germanName: 'Bewusstseinsseele',
    brief:
      'The highest member of the soul — where the soul touches the spirit. It is the capacity for self-knowledge that is not self-justification: the ability to see oneself as an object among objects, truthfully. This is the dominant member of our current cultural epoch.',
    active:
      'There is a quality of clear, unsentimental self-knowledge in you. You can see your own patterns without flinching and without melodrama. Truth matters more than comfort. The consciousness soul, when active, is the basis of genuine freedom.',
    developing:
      'Self-knowledge is deepening. You are becoming more honest about your own motivations and patterns — not harshly, but clearly. This is the work of the age.',
    latent:
      'Self-deception or confusion about one\'s own inner life may be present. The soul may be experienced primarily through the desires and impressions of the astral, with insufficient capacity to stand back and observe them.',
    color: '#1E3A5F',
  },
  {
    member: 'spirit_self',
    name: 'Spirit Self',
    germanName: 'Geistselbst',
    brief:
      'The first member of the spirit triad — the astral body transformed and purified by conscious moral and spiritual work. It is what remains of the soul\'s life when the drives and passions have been consciously ordered. In the East it is called "Manas."',
    active:
      'Something in you operates from a place that is beyond personal desire. There is a quality of conscience that is not guilt, and a quality of love that is not attachment. The spirit self is not achieved; it is revealed through long practice.',
    developing:
      'The work of transforming the astral body is underway. Through the exercises, through the Rückschau, through conscious moral effort, something of the spirit self is beginning to show itself.',
    latent:
      'The spirit self is the horizon toward which all practice tends. It is latent in most human beings of this epoch, awaiting the long work of cultivation that transforms desire into devotion.',
    color: '#5A3E7A',
  },
  {
    member: 'life_spirit',
    name: 'Life Spirit',
    germanName: 'Lebensgeist',
    brief:
      'The second member of the spirit — the etheric body transformed. It carries the fruits of a soul\'s evolution across incarnations. Called "Buddhi" in the Eastern tradition.',
    active:
      'This member is not commonly active in the biographical sense. Its presence is felt as a quality of deep creative wisdom — not learned but remembered. When it speaks, it does so through the hands, through the imagination, through what Goethe called "exact sensory fantasy."',
    developing:
      'The seeds of the life spirit are laid through Goethean observation, through artistic practice, and through the long cultivation of the etheric body in service to spiritual truth.',
    latent:
      'The life spirit is latent in almost all human beings of the present epoch. Its development belongs to the far future of humanity. Knowing it is latent is not a deficiency — it is the honest recognition of where we stand in the great arc of evolution.',
    color: '#2E5080',
  },
  {
    member: 'spirit_human',
    name: 'Spirit Human',
    germanName: 'Geistmensch',
    brief:
      'The highest member of the spirit — the physical body fully transformed. Called "Atma" in the Eastern tradition. It is the divine-human potential at the horizon of the human being\'s entire cosmic evolution.',
    active:
      'Spirit human is not active in any individual in the present age. Its existence is the implicit goal of all spiritual evolution — the form the human being will have become when the physical is fully spirit-permeated.',
    developing:
      'This member is not developing in any ordinary biographical sense. Its seeds exist in every human being as potential; they are tended by the whole of spiritual practice across many lives.',
    latent:
      'Spirit human is the latent divine core of the human being — what Steiner called "the human being\'s own highest being." To know it as latent is not a judgment but a recognition of the magnitude of what is entrusted to us.',
    color: '#C9A84C',
  },
];

export function getMemberByKey(member: NinefoldMember): MemberDescription | undefined {
  return NINEFOLD_MEMBERS.find((m) => m.member === member);
}

export type Temperament = 'sanguine' | 'choleric' | 'phlegmatic' | 'melancholic';

export interface TemperamentDescription {
  temperament: Temperament;
  name: string;
  element: string;
  brief: string;
  gift: string;
  shadow: string;
  practice: string;
  color: string;
}

export const TEMPERAMENT_DESCRIPTIONS: TemperamentDescription[] = [
  {
    temperament: 'sanguine',
    name: 'Sanguine',
    element: 'Air',
    brief:
      'The sanguine soul moves with the world. Each impression is vivid and quickly replaced by the next. There is a natural sociability, a delight in variety, and a tendency for attention to follow beauty wherever it leads.',
    gift:
      'Adaptability, warmth toward others, capacity for joy, the ability to make others feel seen and welcomed.',
    shadow:
      'Impressions do not accumulate into depth. The sanguine soul can be charming without substance, interested without being committed.',
    practice:
      'Choose one thing and see it through. Let one impression deepen into understanding rather than giving way to the next.',
    color: '#C9A84C',
  },
  {
    temperament: 'choleric',
    name: 'Choleric',
    element: 'Fire',
    brief:
      'The choleric soul has the quality of fire — quick, purposeful, and prone to flaring. There is a natural leadership, a readiness to act before others have finished deliberating, and a difficulty tolerating opposition.',
    gift:
      'Will, initiative, the capacity to get things done, the power to galvanise others through the force of directed intention.',
    shadow:
      'Impatience, anger, the tendency to override rather than persuade, the confusion of willfulness with strength.',
    practice:
      'Before acting, take one breath. Equanimity is the specific practice for the choleric soul — not suppression but the capacity to act from a ground that is not agitated.',
    color: '#8B2E2E',
  },
  {
    temperament: 'phlegmatic',
    name: 'Phlegmatic',
    element: 'Earth',
    brief:
      'The phlegmatic soul has depth and steadiness. It does not move quickly to impressions, but what it takes in, it holds. There is a natural patience, an inner life of considerable richness, and a slowness to anger.',
    gift:
      'Constancy, patience, the capacity for deep loyalty and lasting relationship, the ability to hold things over time without losing them.',
    shadow:
      'Inertia, difficulty initiating, a tendency to comfort-seeking that can become an obstacle to growth.',
    practice:
      'The control of will is the specific exercise for the phlegmatic soul — the deliberate performance of one unnecessary action each day, to wake the will from its comfortable sleep.',
    color: '#78716C',
  },
  {
    temperament: 'melancholic',
    name: 'Melancholic',
    element: 'Water',
    brief:
      'The melancholic soul takes the world seriously. It feels deeply, remembers long, and is acutely sensitive to the suffering — both its own and that of others. The world weighs on it, and this weight can be a burden or a gift depending on what is done with it.',
    gift:
      'Depth of feeling, the capacity for empathy that does not shy away from pain, artistic sensitivity, the memory that makes experience meaningful.',
    shadow:
      'Self-absorption, tendency toward depression, rumination that becomes circular, difficulty trusting that the weight can be set down.',
    practice:
      'Positivity is the specific exercise for the melancholic soul — not optimism but the practice of finding the living kernel even within what is difficult. The weight does not disappear; it becomes transformative.',
    color: '#5C6E78',
  },
];

export function getTemperamentDescription(temperament: Temperament): TemperamentDescription | undefined {
  return TEMPERAMENT_DESCRIPTIONS.find((t) => t.temperament === temperament);
}
