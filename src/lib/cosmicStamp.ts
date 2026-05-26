import * as Astronomy from 'astronomy-engine';

const ZODIAC_EN = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];
const DAY_NAMES_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DAY_RULERS_EN = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];

function signAndDegree(longitude: number): { sign: string; degree: number } {
  const n = ((longitude % 360) + 360) % 360;
  const i = Math.floor(n / 30);
  return { sign: ZODIAC_EN[i], degree: Math.floor(n - i * 30) };
}

function moonPhaseName(angle: number): string {
  if (angle < 45) return 'New Moon';
  if (angle < 90) return 'Waxing Crescent';
  if (angle < 135) return 'First Quarter';
  if (angle < 180) return 'Waxing Gibbous';
  if (angle < 225) return 'Full Moon';
  if (angle < 270) return 'Waning Gibbous';
  if (angle < 315) return 'Last Quarter';
  return 'Waning Crescent';
}

export interface CosmicStamp {
  dayRuler: string;    // "Tuesday · Mars"
  moonPhase: string;   // "Waxing Crescent in Capricorn"
  sunPosition: string; // "27° Taurus"
}

export function getCosmicStamp(date: Date = new Date()): CosmicStamp {
  const dow = date.getDay();

  try {
    const time = new Astronomy.AstroTime(date);
    const sunLon = Astronomy.Ecliptic(Astronomy.GeoVector(Astronomy.Body.Sun, time, true)).elon;
    const moonLon = Astronomy.Ecliptic(Astronomy.GeoVector(Astronomy.Body.Moon, time, true)).elon;
    const sun = signAndDegree(sunLon);
    const moon = signAndDegree(moonLon);
    const phase = moonPhaseName(Astronomy.MoonPhase(time));

    return {
      dayRuler: `${DAY_NAMES_EN[dow]} · ${DAY_RULERS_EN[dow]}`,
      moonPhase: `${phase} in ${moon.sign}`,
      sunPosition: `${sun.degree}° ${sun.sign}`,
    };
  } catch {
    return {
      dayRuler: `${DAY_NAMES_EN[dow]} · ${DAY_RULERS_EN[dow]}`,
      moonPhase: '—',
      sunPosition: '—',
    };
  }
}

// ─── Easter (Meeus algorithm) ─────────────────────────────────────────────────

export function getEasterDate(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31); // 3=March, 4=April
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

// ─── Calendar of the Soul week (1–52, Easter-relative) ───────────────────────

export function getCalendarSoulWeek(date: Date = new Date()): number {
  const year = date.getFullYear();
  let easter = getEasterDate(year);

  // If before Easter this year, use last year's Easter
  if (date < easter) {
    easter = getEasterDate(year - 1);
  }

  const msPerDay = 86400000;
  const daysSinceEaster = Math.floor((date.getTime() - easter.getTime()) / msPerDay);
  const week = Math.floor(daysSinceEaster / 7) + 1;

  // Clamp to 1–52
  if (week < 1) return 1;
  if (week > 52) return 52;
  return week;
}
