import { getEasterDate } from './cosmicStamp';

export type SeasonQuadrant = 'spring' | 'summer' | 'autumn' | 'winter';
export type CosmicPole = 'outbreath' | 'inbreath';

export interface ThresholdDates {
  easter: Date;
  stJohns: Date;
  michaelmas: Date;
  christmas: Date;
}

export interface CosmicYear {
  quadrant: SeasonQuadrant;
  pole: CosmicPole;
  weekInSeason: number;
  thresholdDates: ThresholdDates;
  isMichaelmasSeason: boolean; // Aug 15 – Nov 11
  nextThresholdLabel: string;
  nextThresholdDate: Date;
  daysToNextThreshold: number;
}

function daysUntil(from: Date, to: Date): number {
  return Math.max(0, Math.floor((to.getTime() - from.getTime()) / 86400000));
}

export function getCosmicYear(date: Date = new Date()): CosmicYear {
  const year = date.getFullYear();

  const thresholdDates: ThresholdDates = {
    easter:     getEasterDate(year),
    stJohns:    new Date(year, 5, 24),  // June 24
    michaelmas: new Date(year, 8, 29),  // Sep 29
    christmas:  new Date(year, 11, 25), // Dec 25
  };

  // Michaelmas season: Aug 15 – Nov 11
  const michStart = new Date(year, 7, 15);
  const michEnd   = new Date(year, 10, 11);
  const isMichaelmasSeason = date >= michStart && date <= michEnd;

  // Determine quadrant
  let quadrant: SeasonQuadrant;
  let pole: CosmicPole;
  let seasonStart: Date;

  const { easter, stJohns, michaelmas, christmas } = thresholdDates;

  if (date >= christmas || date < easter) {
    // Winter: Christmas → Easter
    quadrant = 'winter';
    pole = 'inbreath';
    seasonStart = date >= christmas ? christmas : getEasterDate(year - 1);
  } else if (date >= easter && date < stJohns) {
    // Spring: Easter → St John's
    quadrant = 'spring';
    pole = 'outbreath';
    seasonStart = easter;
  } else if (date >= stJohns && date < michaelmas) {
    // Summer: St John's → Michaelmas
    quadrant = 'summer';
    pole = 'outbreath';
    seasonStart = stJohns;
  } else {
    // Autumn: Michaelmas → Christmas
    quadrant = 'autumn';
    pole = 'inbreath';
    seasonStart = michaelmas;
  }

  const weekInSeason = Math.floor((date.getTime() - seasonStart.getTime()) / (7 * 86400000)) + 1;

  // Next threshold
  const upcoming = [easter, stJohns, michaelmas, christmas]
    .map((d, i) => ({
      date: d,
      label: ['Easter', "St John's", 'Michaelmas', 'Holy Nights'][i],
    }))
    .filter((t) => t.date > date)
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const next = upcoming[0] ?? {
    date: getEasterDate(year + 1),
    label: 'Easter',
  };

  return {
    quadrant,
    pole,
    weekInSeason,
    thresholdDates,
    isMichaelmasSeason,
    nextThresholdLabel: next.label,
    nextThresholdDate: next.date,
    daysToNextThreshold: daysUntil(date, next.date),
  };
}

export function getSeasonColor(quadrant: SeasonQuadrant): string {
  const map: Record<SeasonQuadrant, string> = {
    spring: 'var(--color-gold-soft)',
    summer: 'var(--color-cosmic-blue-soft)',
    autumn: 'var(--color-iron-red)',
    winter: 'var(--color-cosmic-blue)',
  };
  return map[quadrant];
}

export function getSeasonDescription(quadrant: SeasonQuadrant): string {
  const map: Record<SeasonQuadrant, string> = {
    spring: 'The world breathes outward. The soul opens toward the periphery.',
    summer: 'Maximum light. The cosmos speaks; the inner life rests.',
    autumn: 'Michael stands guard. Iron and clarity. The soul turns inward.',
    winter: 'The darkness deepens. In the quiet, the spirit renews itself.',
  };
  return map[quadrant];
}
