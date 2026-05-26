import type { AstralChart } from './chartCalculator';
import type { Temperament, NinefoldMember, ActivationLevel } from '@/content/constitution';
import { calculateAgeFromBirthDate } from '@/content/biography';

export interface ElementAllocation {
  fire: number;   // percentage 0-100
  earth: number;
  air: number;
  water: number;
  dominant: 'fire' | 'earth' | 'air' | 'water';
}

export interface MineralEntry {
  planet: string;   // Arabic planet name
  mineral: string;  // Arabic mineral name
  color: string;    // hex accent color
}

export interface OrganEntry {
  planet: string;
  organ: string;
  theme: string;
}

export interface HDCentre {
  name: string;       // Arabic centre name
  defined: boolean;
  keywords: string;
}

export interface TraitProfile {
  elements: ElementAllocation;
  minerals: MineralEntry[];
  organs: OrganEntry[];
  hdCentres: HDCentre[];
  quizInsights: Record<string, string>;
}

const SIGN_ELEMENTS: Record<number, 'fire' | 'earth' | 'air' | 'water'> = {
  0: 'fire',  1: 'earth', 2: 'air',   3: 'water',
  4: 'fire',  5: 'earth', 6: 'air',   7: 'water',
  8: 'fire',  9: 'earth', 10: 'air',  11: 'water',
};

const MINERALS: Record<string, { mineral: string; color: string }> = {
  sun:     { mineral: 'الذهب',        color: '#FFC78A' },
  moon:    { mineral: 'الفضة',        color: '#C2D3E2' },
  mercury: { mineral: 'الزئبق',       color: '#C9D2BE' },
  venus:   { mineral: 'النحاس',       color: '#F8D6BE' },
  mars:    { mineral: 'الحديد',       color: '#E9785E' },
  jupiter: { mineral: 'القصدير',      color: '#9C8AB8' },
  saturn:  { mineral: 'الرصاص',       color: '#5A3E7A' },
  uranus:  { mineral: 'الأورانيوم',   color: '#7E97B8' },
  neptune: { mineral: 'حجر الأعماق', color: '#BDAA82' },
  pluto:   { mineral: 'الأوبسيديان', color: '#4A3520' },
  chiron:  { mineral: 'الشاروايت',    color: '#A8A8A8' },
  lilith:  { mineral: 'اللابرادوريت', color: '#6B5B7B' },
};

const PLANET_AR: Record<string, string> = {
  sun: 'الشمس', moon: 'القمر', mercury: 'عطارد', venus: 'الزهرة',
  mars: 'المريخ', jupiter: 'المشتري', saturn: 'زحل', uranus: 'أورانوس',
  neptune: 'نبتون', pluto: 'بلوتو', chiron: 'كيرون', lilith: 'الجزء الأسود',
};

const ORGANS: Record<string, { organ: string; theme: string }> = {
  sun:     { organ: 'القلب',   theme: 'مركز الحياة والإشعاع' },
  moon:    { organ: 'الدماغ',  theme: 'الاستقبال والانعكاس' },
  mercury: { organ: 'الرئتان', theme: 'التنفس والتبادل' },
  venus:   { organ: 'الكليتان', theme: 'التوازن والجمال' },
  mars:    { organ: 'المرارة', theme: 'الإرادة والاندفاع' },
  jupiter: { organ: 'الكبد',   theme: 'التوسع والسعة' },
  saturn:  { organ: 'الطحال', theme: 'التمييز والبنية' },
};

const PLANET_KEYS = ['sun','moon','mercury','venus','mars','jupiter','saturn','uranus','neptune','pluto','chiron','lilith'] as const;

// Derive HD centre definition from chart positions (simplified).
// A centre is "defined" if 2+ planets occupy activating signs for it.
const HD_CENTRES = [
  { name: 'مركز الرأس',       planets: ['saturn', 'uranus'],          desc: 'الإلهام والضغط الفكري' },
  { name: 'مركز الأجنا',      planets: ['mercury', 'saturn'],         desc: 'التفكير والمعالجة' },
  { name: 'مركز الحلق',       planets: ['mercury', 'venus', 'sun'],   desc: 'التعبير والتجلّي' },
  { name: 'مركز الهوية',      planets: ['sun', 'jupiter'],            desc: 'الاتجاه والحب والهوية' },
  { name: 'مركز الإرادة',     planets: ['mars', 'saturn'],            desc: 'الإرادة والأنا والتعهّد' },
  { name: 'مركز العجز الذهبي', planets: ['sun', 'moon', 'mars'],     desc: 'الطاقة المستدامة والاستجابة' },
  { name: 'مركز الضفيرة',     planets: ['moon', 'venus', 'neptune'], desc: 'العاطفة والمشاعر والموجات' },
  { name: 'مركز الجذر',       planets: ['saturn', 'pluto'],           desc: 'ضغط الجذر والدافع للتطور' },
  { name: 'مركز الطحال',      planets: ['moon', 'mars', 'chiron'],   desc: 'الحدس والصحة والخوف' },
];

function calcElements(chart: AstralChart): ElementAllocation {
  const counts = { fire: 0, earth: 0, air: 0, water: 0 };
  const keys: (keyof AstralChart)[] = ['sun','moon','mercury','venus','mars','jupiter','saturn','uranus','neptune','pluto'];
  for (const key of keys) {
    const p = chart[key];
    if (typeof p === 'object' && p !== null && 'signNumber' in p) {
      const el = SIGN_ELEMENTS[(p as { signNumber: number }).signNumber % 12];
      if (el) counts[el]++;
    }
  }
  const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
  const pcts = {
    fire:  Math.round((counts.fire / total) * 100),
    earth: Math.round((counts.earth / total) * 100),
    air:   Math.round((counts.air / total) * 100),
    water: Math.round((counts.water / total) * 100),
  };
  const dominant = (Object.keys(counts) as (keyof typeof counts)[]).reduce((a, b) => counts[a] >= counts[b] ? a : b);
  return { ...pcts, dominant };
}

function calcMinerals(chart: AstralChart): MineralEntry[] {
  return PLANET_KEYS.map((key) => ({
    planet: PLANET_AR[key],
    mineral: MINERALS[key].mineral,
    color: MINERALS[key].color,
  }));
}

function calcOrgans(chart: AstralChart): OrganEntry[] {
  return Object.entries(ORGANS).map(([key, val]) => ({
    planet: PLANET_AR[key],
    organ: val.organ,
    theme: val.theme,
  }));
}

function calcHDCentres(chart: AstralChart): HDCentre[] {
  return HD_CENTRES.map(({ name, planets, desc }) => {
    // Centre is "defined" if any of its associated planets are in angular houses (1,4,7,10).
    const angularHouseNums = [1, 4, 7, 10];
    let defined = false;
    for (const pKey of planets) {
      const p = chart[pKey as keyof AstralChart];
      if (typeof p === 'object' && p !== null && 'longitude' in p) {
        const lon = (p as { longitude: number }).longitude;
        // Check if planet is within 10° of an angular house cusp
        for (const house of chart.houses) {
          if (angularHouseNums.includes(house.num)) {
            const diff = Math.abs(((lon - house.cusp + 180) % 360) - 180);
            if (diff < 15) { defined = true; break; }
          }
        }
      }
      if (defined) break;
    }
    return { name, defined, keywords: desc };
  });
}

export function calculateTraits(chart: AstralChart, quiz: Record<string, string[]> = {}): TraitProfile {
  const profile: TraitProfile = {
    elements: calcElements(chart),
    minerals: calcMinerals(chart),
    organs: calcOrgans(chart),
    hdCentres: calcHDCentres(chart),
    quizInsights: Object.fromEntries(
      Object.entries(quiz).map(([k, v]) => [k, v.join(', ')])
    ),
  };

  // Persist to localStorage
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('hygiea.traits.v1', JSON.stringify(profile));
    } catch {
      // localStorage unavailable — traits are in-memory only
    }
  }

  return profile;
}

export function loadTraits(): TraitProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('hygiea.traits.v1');
    return raw ? (JSON.parse(raw) as TraitProfile) : null;
  } catch {
    return null;
  }
}

// ─── Temperament ──────────────────────────────────────────────────────────────

export function calculateTemperament(chart: AstralChart): Temperament {
  const elements = calcElements(chart);
  // Map dominant element to temperament
  const map: Record<string, Temperament> = {
    fire:  'choleric',
    air:   'sanguine',
    water: 'melancholic',
    earth: 'phlegmatic',
  };
  return map[elements.dominant] ?? 'sanguine';
}

// ─── Biographical phase ───────────────────────────────────────────────────────

export function calculateBiographicalPhase(birthDate: {
  year: number;
  month: number;
  day: number;
}): number {
  const age = calculateAgeFromBirthDate(birthDate);
  // phase = 1-indexed seven-year period
  return Math.floor(age / 7) + 1;
}

// ─── Ninefold annotations ─────────────────────────────────────────────────────

export type NinefoldAnnotation = Record<NinefoldMember, {
  activation: ActivationLevel;
  note: string;
}>;

export function calculateNinefoldAnnotations(
  _chart: AstralChart,
  temperament: Temperament,
  biographicalPhase: number,
): NinefoldAnnotation {
  // Activation rules based on current epoch and biographical phase
  // Physical, etheric, astral are always active
  // Sentient soul active from phase 4+
  // Intellectual soul active from phase 5+
  // Consciousness soul developing from phase 6+
  // Spirit members latent in most adults (developing at higher phases)

  const phase = biographicalPhase;

  const sentientActive = phase >= 4;
  const intellectualActive = phase >= 5;
  const consciousnessLevel: ActivationLevel = phase >= 7 ? 'developing' : phase >= 6 ? 'developing' : 'developing';
  const spiritSelfLevel: ActivationLevel = phase >= 7 ? 'developing' : 'latent';

  // Temperament influences emphasis on certain members
  const astralNote =
    temperament === 'choleric'
      ? 'The choleric temperament energises the astral body with purposeful force. Equanimity is the specific counter-practice.'
      : temperament === 'melancholic'
      ? 'The melancholic temperament gives the astral body depth and sensitivity. Positivity is the specific counter-practice.'
      : temperament === 'sanguine'
      ? 'The sanguine temperament moves the astral body with quicksilver lightness. Persistence and equanimity are the counter-practices.'
      : 'The phlegmatic temperament grounds the astral body. Will-training is the counter-practice.';

  return {
    physical_body: {
      activation: 'active',
      note: 'The physical body is fully active and the foundation of all practice. Attention to bodily rhythm — sleep, nourishment, warmth — is foundational hygiene.',
    },
    etheric_body: {
      activation: 'active',
      note: 'The etheric body is active but largely unconscious. It is strengthened by rhythm, by the six exercises, and by the regular practice of the Rückschau.',
    },
    astral_body: {
      activation: 'active',
      note: astralNote,
    },
    sentient_soul: {
      activation: sentientActive ? 'active' : 'developing',
      note: sentientActive
        ? 'The sentient soul is active. The task is to bring its immediate responses into the light of consciousness rather than acting from them unreflectingly.'
        : 'The sentient soul is developing. The capacity for genuine individual feeling-response is awakening.',
    },
    intellectual_soul: {
      activation: intellectualActive ? 'active' : 'developing',
      note: intellectualActive
        ? 'The intellectual soul is active. The capacity to think through what you feel is available. Use it — but do not let it replace feeling altogether.'
        : 'The intellectual soul is developing. The capacity for reflective, self-directed thinking is awakening.',
    },
    consciousness_soul: {
      activation: consciousnessLevel,
      note: 'The consciousness soul is the central development of our age. It awakens through honest self-knowledge, the practice of conscience, and the willingness to face what is real without comfort.',
    },
    spirit_self: {
      activation: spiritSelfLevel,
      note: spiritSelfLevel === 'developing'
        ? 'The spirit self is beginning to develop. The six exercises, practiced consistently over years, are the primary pathway. It manifests as wisdom that is genuinely disinterested.'
        : 'The spirit self is latent. Its seeds are laid by the work of the consciousness soul — every genuine moral act, every honest self-observation.',
    },
    life_spirit: {
      activation: 'latent',
      note: 'The life spirit is latent in almost all human beings of this epoch. Its development belongs to the long future of humanity. Goethean observation and artistic practice plant its distant seeds.',
    },
    spirit_human: {
      activation: 'latent',
      note: 'Spirit human is latent — the divine human potential at the far horizon of the human being\'s entire evolution. To know it as latent is not a deficiency; it is honest recognition of where we stand.',
    },
  };
}
