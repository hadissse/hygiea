import type { AstralChart } from './chartCalculator';

export interface ElementAllocation {
  fire: number;   // percentage 0-100
  earth: number;
  air: number;
  water: number;
  dominant: 'fire' | 'earth' | 'air' | 'water';
}

export interface MineralEntry {
  planet: string;   // planet name
  mineral: string;  // mineral name
  color: string;    // hex accent color
}

export interface OrganEntry {
  planet: string;
  planetKey: string;
  organ: string;
  theme: string;
  sign: string;
  signNumber: number;
  element: 'fire' | 'earth' | 'air' | 'water';
  houseNum: number;
  retrograde: boolean;
}

export interface HDCentre {
  name: string;       // centre name
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
  sun:     { mineral: 'Gold',        color: '#FFC78A' },
  moon:    { mineral: 'Silver',      color: '#C2D3E2' },
  mercury: { mineral: 'Quicksilver', color: '#C9D2BE' },
  venus:   { mineral: 'Copper',      color: '#F8D6BE' },
  mars:    { mineral: 'Iron',        color: '#E9785E' },
  jupiter: { mineral: 'Tin',         color: '#9C8AB8' },
  saturn:  { mineral: 'Lead',        color: '#5A3E7A' },
  uranus:  { mineral: 'Uranium',     color: '#7E97B8' },
  neptune: { mineral: 'Deep Stone',  color: '#BDAA82' },
  pluto:   { mineral: 'Obsidian',    color: '#4A3520' },
  chiron:    { mineral: 'Charoite',  color: '#A8A8A8' },
  northNode: { mineral: 'Turquoise', color: '#4A7FB5' },
  southNode: { mineral: 'Carnelian', color: '#C0392B' },
};

const PLANET_AR: Record<string, string> = {
  sun: 'Sun', moon: 'Moon', mercury: 'Mercury', venus: 'Venus',
  mars: 'Mars', jupiter: 'Jupiter', saturn: 'Saturn', uranus: 'Uranus',
  neptune: 'Neptune', pluto: 'Pluto', chiron: 'Chiron', northNode: 'North Node', southNode: 'South Node',
};

const ORGANS: Record<string, { organ: string; theme: string }> = {
  sun:     { organ: 'Heart',      theme: 'Center of Life and Radiance' },
  moon:    { organ: 'Brain',      theme: 'Reception and Reflection' },
  mercury: { organ: 'Lungs',      theme: 'Breathing and Exchange' },
  venus:   { organ: 'Kidneys',    theme: 'Balance and Beauty' },
  mars:    { organ: 'Gallbladder', theme: 'Will and Impulse' },
  jupiter: { organ: 'Liver',      theme: 'Expansion and Capacity' },
  saturn:  { organ: 'Spleen',     theme: 'Discernment and Structure' },
};

const PLANET_KEYS = ['sun','moon','mercury','venus','mars','jupiter','saturn','uranus','neptune','pluto','chiron','northNode','southNode'] as const;

// Derive HD centre definition from chart positions (simplified).
// A centre is "defined" if 2+ planets occupy activating signs for it.
const HD_CENTRES = [
  { name: 'Head Centre',         planets: ['saturn', 'uranus'],          desc: 'Inspiration and mental pressure' },
  { name: 'Ajna Centre',         planets: ['mercury', 'saturn'],         desc: 'Thinking and processing' },
  { name: 'Throat Centre',       planets: ['mercury', 'venus', 'sun'],   desc: 'Expression and manifestation' },
  { name: 'Identity Centre',     planets: ['sun', 'jupiter'],            desc: 'Direction, love, and identity' },
  { name: 'Ego/Heart Centre',    planets: ['mars', 'saturn'],            desc: 'Will, ego, and commitment' },
  { name: 'Sacral Centre',       planets: ['sun', 'moon', 'mars'],       desc: 'Sustainable energy and response' },
  { name: 'Solar Plexus Centre', planets: ['moon', 'venus', 'neptune'], desc: 'Emotion, feelings, and waves' },
  { name: 'Root Centre',         planets: ['saturn', 'pluto'],           desc: 'Root pressure and drive to evolve' },
  { name: 'Spleen Centre',       planets: ['moon', 'mars', 'chiron'],   desc: 'Intuition, health, and fear' },
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

/** Determine which house a planet longitude falls in */
function getPlanetHouse(longitude: number, chart: AstralChart): number {
  if (!chart.houses || chart.houses.length < 12) return 1;
  for (let i = 0; i < 12; i++) {
    const curr = chart.houses[i].cusp;
    const next = chart.houses[(i + 1) % 12].cusp;
    // Normalise to handle 0°/360° wrap
    const lon = ((longitude % 360) + 360) % 360;
    const c = ((curr % 360) + 360) % 360;
    const n = ((next % 360) + 360) % 360;
    if (n > c) {
      if (lon >= c && lon < n) return chart.houses[i].num;
    } else {
      // wraps through 0°
      if (lon >= c || lon < n) return chart.houses[i].num;
    }
  }
  return 1;
}

function calcOrgans(chart: AstralChart): OrganEntry[] {
  return Object.entries(ORGANS).map(([key, val]) => {
    const p = chart[key as keyof AstralChart];
    let sign = '—';
    let signNumber = 0;
    let element: 'fire' | 'earth' | 'air' | 'water' = 'fire';
    let houseNum = 1;
    let retrograde = false;
    if (typeof p === 'object' && p !== null && 'signNumber' in p) {
      const planet = p as { sign: string; signNumber: number; longitude: number; retrograde?: boolean };
      sign = planet.sign;
      signNumber = planet.signNumber % 12;
      element = SIGN_ELEMENTS[signNumber] ?? 'fire';
      houseNum = getPlanetHouse(planet.longitude, chart);
      retrograde = !!planet.retrograde;
    }
    return {
      planet: PLANET_AR[key],
      planetKey: key,
      organ: val.organ,
      theme: val.theme,
      sign,
      signNumber,
      element,
      houseNum,
      retrograde,
    };
  });
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
