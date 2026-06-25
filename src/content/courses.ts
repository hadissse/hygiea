// Course / series content for the teaching layer (Scr42-49, 94).
// Static seed data ported from the Sukoon design files.

export interface Course {
  id: string;
  title: string;
  course: string; // eyebrow, e.g. "Course · 10 Days"
  variant: string;
  teacher: string;
  blurb: string;
  tags: string[];
  lessons: string[];
}

export const COURSES: Course[] = [
  {
    id: 'first-breath',
    title: 'First Breath',
    course: 'Series · 3 Days',
    variant: 'dawn',
    teacher: 'Priya Shah',
    blurb: 'Three sessions that build the first bridge between you and your breath — the most present moment of your day.',
    tags: ['3 sessions', '7 minutes each', 'Priya Shah'],
    lessons: ['The Opening Breath', 'The Aware Breath', 'Presence in the Body'],
  },
  {
    id: 'home-return',
    title: 'Returning Home',
    course: 'Series · 4 Days',
    variant: 'lake',
    teacher: 'Asha Bowen',
    blurb: 'Four sessions that bring you back to yourself — when you lose your way and need an anchor.',
    tags: ['4 sessions', '9 minutes each', 'Asha Bowen'],
    lessons: ['What Is Home?', 'When You Lose Your Way', 'The Body as Shelter', 'Every Place an Anchor'],
  },
  {
    id: 'open-awareness',
    title: 'Open Awareness',
    course: 'Course · 8 Days',
    variant: 'dust',
    teacher: 'Jonas Park',
    blurb: 'Eight sessions that open awareness beyond thoughts — the spaciousness that holds everything.',
    tags: ['8 sessions', '12 minutes each', 'Jonas Park'],
    lessons: [
      'Who Am I?',
      'The Inner Witness',
      'Thoughts Pass',
      'Feelings Pass',
      'Nowhere to Go',
      'The Great Spaciousness',
      'Formless Awareness',
      'Back to Life',
    ],
  },
  {
    id: 'quiet-path',
    title: 'The Quiet Path',
    course: 'Course · 10 Days',
    variant: 'dawn',
    teacher: 'Maya Cole',
    blurb:
      'Ten sessions to settle the mind. Designed for those new to meditation — or returning after a break.',
    tags: ['10 sessions', '10 minutes each', 'Maya Cole'],
    lessons: [
      'The First Sit',
      'Presence in the Body',
      'When the Mind Wanders',
      'The Gentle Anchor',
      'The Spaciousness',
      'Naming What Arises',
      'Holding Gently',
      'Practice in Motion',
      'Less Is More',
      'Back to Life',
    ],
  },
  {
    id: 'gentle-anchors',
    title: 'Gentle Anchors',
    course: 'Course · 5 Days',
    variant: 'sage',
    teacher: 'Maya Cole',
    blurb: 'Five short sessions that build an anchor you can return to at any moment of the day.',
    tags: ['5 sessions', '7 minutes each', 'Maya Cole'],
    lessons: ['First Breath', 'Breath as Anchor', 'Hand on Heart', 'Body Scan', 'Returning Gently'],
  },
  {
    id: 'letting-go',
    title: 'Letting Go Gently',
    course: 'Series · 7 Days',
    variant: 'dusk',
    teacher: 'Jonas Park',
    blurb: 'Seven sessions to release the tension of the day, step by step.',
    tags: ['7 sessions', '10 minutes each', 'Jonas Park'],
    lessons: [
      'Loosening the Grip',
      'Breathing Through It',
      'Release the Jaw',
      'What Is Not Yours',
      'The Space Before Action',
      'Rest You Are Allowed',
      'Begin Again',
    ],
  },
];

// Course-detail "what you'll learn" cards (Scr43)
export const COURSE_OUTCOMES: [string, string][] = [
  ['Attention to Self', 'A trusted home for your attention.'],
  ['Softening Impulse', 'Space between feeling and action.'],
  ['Take It With You', 'Practice mindfulness in ordinary moments.'],
];

// Foundations grid (Scr49) — [title, duration label, variant, courseId]
export const FOUNDATIONS: [string, string, string, string][] = [
  ['The Quiet Path', '10 Days', 'dawn', 'quiet-path'],
  ['Gentle Anchors', '5 Days', 'sage', 'gentle-anchors'],
  ['Letting Go', '7 Days', 'dusk', 'letting-go'],
  ['Returning Home', '4 Days', 'lake', 'home-return'],
  ['First Breath', '3 Days', 'ember', 'first-breath'],
  ['Open Awareness', '8 Days', 'dust', 'open-awareness'],
];

// Teachers (Scr46-47, 93)
export const TEACHERS: { name: string; variant: string; blurb: string; count: string }[] = [
  { name: 'Maya Cole', variant: 'sage', blurb: 'Warm and grounded', count: '12 sessions' },
  { name: 'Jonas Park', variant: 'dusk', blurb: 'Calm and spacious', count: '8 sessions' },
  { name: 'Priya Shah', variant: 'dawn', blurb: 'Bright and vibrant', count: '15 sessions' },
  { name: 'Theo Reed', variant: 'lake', blurb: 'Slow and steady', count: '6 sessions' },
  { name: 'Asha Bowen', variant: 'ember', blurb: 'Clear and present', count: '9 sessions' },
  { name: 'Eiko Sato', variant: 'dust', blurb: 'Gentle and precise', count: '11 sessions' },
];

// Series & courses list (Scr94)
export const SERIES: { id: string; title: string; sub: string; color: string; progress: number }[] = [
  { id: 'quiet-path', title: 'The Quiet Path', sub: '10 Days · Beginners', color: '#F8D6BE', progress: 30 },
  { id: 'letting-go', title: 'Letting Go Gently', sub: '7 Days · Stress', color: '#9C8AB8', progress: 57 },
  { id: 'about-sleep', title: 'About Sleep', sub: '5 Days · Sleep', color: '#3A4490', progress: 0 },
  { id: 'gentle-anchors', title: 'Gentle Anchors', sub: '5 Days · Beginners', color: '#C9D2BE', progress: 100 },
];

// ─── Astrology courses ────────────────────────────────────────────────────────

export const ASTRO_COURSES: Course[] = [
  {
    id: 'natal-chart-basics',
    title: 'Your Birth Chart',
    course: 'Course · 7 Days',
    variant: 'dawn',
    teacher: 'Priya Shah',
    blurb: 'Seven sessions that take you from a blank page to reading your chart with fresh eyes.',
    tags: ['7 sessions', '12 minutes each', 'Priya Shah'],
    lessons: [
      'What Is the Chart?',
      'The Sun — Your Core',
      'The Moon — Your Soul\'s Echo',
      'The Rising — How You Appear',
      'Mercury, Venus, and Mars',
      'The Slow Planets',
      'How to Read Your Full Chart',
    ],
  },
  {
    id: 'twelve-houses',
    title: 'The Twelve Houses',
    course: 'Course · 12 Days',
    variant: 'lake',
    teacher: 'Theo Reed',
    blurb: 'Every house is a story. Learn how to read the spaces of your life from your chart.',
    tags: ['12 sessions', '10 minutes each', 'Theo Reed'],
    lessons: [
      'House One — You',
      'House Two — Your Resources',
      'House Three — Your Voice',
      'House Four — Your Roots',
      'House Five — Your Joy',
      'House Six — Your Day',
      'House Seven — Your Relationships',
      'House Eight — Your Transformation',
      'House Nine — Your Meaning',
      'House Ten — Your Path',
      'House Eleven — Your Vision',
      'House Twelve — Your Solitude',
    ],
  },
  {
    id: 'four-elements',
    title: 'The Four Elements',
    course: 'Series · 4 Days',
    variant: 'ember',
    teacher: 'Asha Bowen',
    blurb: 'Fire, earth, air, and water — how they balance in your chart and your life.',
    tags: ['4 sessions', '15 minutes each', 'Asha Bowen'],
    lessons: [
      'Fire — Will and Vision',
      'Earth — Body and Stability',
      'Air — Mind and Communication',
      'Water — Emotion and Intuition',
    ],
  },
  {
    id: 'reading-transits',
    title: 'Reading Transits',
    course: 'Course · 5 Days',
    variant: 'dust',
    teacher: 'Eiko Sato',
    blurb: 'Five sessions that teach you how to track the sky now and connect it to your life moment.',
    tags: ['5 sessions', '12 minutes each', 'Eiko Sato'],
    lessons: [
      'What Is a Transit?',
      'Fast Planets and Slow Planets',
      'Live Aspects',
      'Life-Changing Transits',
      'Your Sky Calendar',
    ],
  },
  {
    id: 'saturn-return',
    title: 'Saturn Return',
    course: 'Series · 3 Days',
    variant: 'sage',
    teacher: 'Theo Reed',
    blurb: 'The threshold of thirty — what it means, how to live it, and what it asks of you.',
    tags: ['3 sessions', '18 minutes each', 'Theo Reed'],
    lessons: [
      'What Is the Saturn Return?',
      'What Falls Apart and What Gets Built',
      'Crossing the Threshold',
    ],
  },
  {
    id: 'moon-cycles',
    title: 'The Moon Cycle',
    course: 'Series · 8 Days',
    variant: 'dawn',
    teacher: 'Maya Cole',
    blurb: 'From crescent to full moon and back — how to walk alongside the moon cycle in your daily life.',
    tags: ['8 sessions', '8 minutes each', 'Maya Cole'],
    lessons: [
      'New Moon — The Seed',
      'Waxing Crescent — The Movement',
      'First Quarter — The Decision',
      'Gibbous — The Push',
      'Full Moon — The Completion',
      'Waning Gibbous — The Harvest',
      'Last Quarter — The Release',
      'Waning Crescent — The Rest',
    ],
  },
  {
    id: 'twelve-signs',
    title: 'The Twelve Signs',
    course: 'Course · 12 Days',
    variant: 'ember',
    teacher: 'Priya Shah',
    blurb: 'A journey through the twelve signs — the energy of each sign, how it works, and how it shows up in your life.',
    tags: ['12 sessions', '10 minutes each', 'Priya Shah'],
    lessons: [
      'Aries — Beginnings and Leadership',
      'Taurus — Body and Beauty',
      'Gemini — Thought and Communication',
      'Cancer — Roots and Protection',
      'Leo — Creativity and Presence',
      'Virgo — Discernment and Service',
      'Libra — Balance and Relationships',
      'Scorpio — Transformation and Depth',
      'Sagittarius — Meaning and Freedom',
      'Capricorn — Discipline and Ascent',
      'Aquarius — Vision and Community',
      'Pisces — Dissolution and Faith',
    ],
  },
  {
    id: 'aspects-deep',
    title: 'Astrological Aspects',
    course: 'Course · 5 Days',
    variant: 'lake',
    teacher: 'Eiko Sato',
    blurb: 'Five sessions that reveal the language of angles — how the planets speak to each other in your chart.',
    tags: ['5 sessions', '12 minutes each', 'Eiko Sato'],
    lessons: [
      'What Is an Aspect?',
      'The Conjunction — Merging Two Forces',
      'The Trine and Sextile — Flow',
      'The Square and Opposition — Productive Tension',
      'Reading Your Full Chart Aspects',
    ],
  },
  {
    id: 'chiron-wound',
    title: 'Chiron and the Wounded Healer',
    course: 'Series · 3 Days',
    variant: 'sage',
    teacher: 'Asha Bowen',
    blurb: 'Three sessions that explore your primal wound in the chart — and how it becomes a compass for healing.',
    tags: ['3 sessions', '15 minutes each', 'Asha Bowen'],
    lessons: [
      'The Wound That Teaches',
      'From Wounded to Healer',
      'Chiron\'s Gift in Your Chart',
    ],
  },
  {
    id: 'mercury-retrograde',
    title: 'Mercury Retrograde',
    course: 'Series · 3 Days',
    variant: 'dusk',
    teacher: 'Jonas Park',
    blurb: 'Mercury does not retreat — but it slows down to give you the chance to review. Three sessions to understand this rhythm.',
    tags: ['3 sessions', '10 minutes each', 'Jonas Park'],
    lessons: [
      'What Happens When Mercury Slows',
      'The Chance to Review and Correct',
      'Mindfulness During Mercury Times',
    ],
  },
];

// Combined list of all courses
export const ALL_COURSES: Course[] = [...COURSES, ...ASTRO_COURSES];

// Astrology knowledge base articles (for Explore tab)
// svgKey: planet/zodiac SVG from /public/svg/ — use mask-image rendering; null = use icon text
export const ASTRO_KNOWLEDGE: { id: string; title: string; subtitle: string; svgKey: string | null; icon: string; courseId: string; href: string }[] = [
  { id: 'sun-sign', title: 'Your Sun Sign', subtitle: 'The core of your identity', svgKey: 'sun', icon: '◉', courseId: 'natal-chart-basics', href: '/الكواكب/الشمس' },
  { id: 'moon-sign', title: 'Your Moon Sign', subtitle: 'Your emotional life', svgKey: 'moon', icon: '◌', courseId: 'natal-chart-basics', href: '/الكواكب/القمر' },
  { id: 'rising-sign', title: 'Your Rising Sign', subtitle: 'How the world sees you', svgKey: null, icon: '↑', courseId: 'natal-chart-basics', href: '/المعرفة/الخريطة-الفلكية-astrology' },
  { id: 'houses', title: 'The Twelve Houses', subtitle: 'The spaces of your life', svgKey: null, icon: '▦', courseId: 'twelve-houses', href: '/البيوت/البيوت-الفلكية' },
  { id: 'elements', title: 'The Four Elements', subtitle: 'Your fire, earth, air, and water', svgKey: null, icon: '◈', courseId: 'four-elements', href: '/العناصر/العناصر-الأربعة' },
  { id: 'transits', title: 'Live Transits', subtitle: 'The sky now and your chart', svgKey: 'saturn', icon: '◎', courseId: 'reading-transits', href: '/المدونة/الخريطة-السنوية-الفلكية' },
  { id: 'saturn-return', title: 'Saturn Return', subtitle: 'The threshold of thirty', svgKey: 'saturn', icon: '◎', courseId: 'saturn-return', href: '/الكواكب/زحل' },
  { id: 'moon-phases', title: 'Moon Phases', subtitle: 'A monthly rhythm you live', svgKey: 'moon', icon: '◌', courseId: 'moon-cycles', href: '/الكواكب/القمر' },
  { id: 'twelve-signs', title: 'The Twelve Signs', subtitle: 'The energy and qualities of each sign', svgKey: null, icon: '◇', courseId: 'twelve-signs', href: '/الأبراج/الأبراج-الفلكية' },
  { id: 'aspects', title: 'Astrological Aspects', subtitle: 'The language of angles in your chart', svgKey: null, icon: '×', courseId: 'aspects-deep', href: '/الجوانب/الجوانب-الفلكية' },
  { id: 'chiron', title: 'Chiron', subtitle: 'The wound that teaches', svgKey: 'chiron', icon: '◎', courseId: 'chiron-wound', href: '/الكواكب/كايرون' },
  { id: 'mercury-rx', title: 'Mercury Retrograde', subtitle: 'The chance to review', svgKey: 'mercury', icon: '◎', courseId: 'mercury-retrograde', href: '/الكواكب/عطارد' },
];

export function getCourse(id: string): Course | undefined {
  return ALL_COURSES.find((c) => c.id === id);
}
