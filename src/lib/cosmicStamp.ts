import * as Astronomy from 'astronomy-engine';

const ZODIAC_EN = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
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
  dayRuler: string;
  moonPhase: string;
  sunPosition: string;
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
