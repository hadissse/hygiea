export type TransitKind = 'lunation' | 'ingress' | 'aspect' | 'station' | 'return';

export interface CalEvent {
  svgKey: string;
  title: string;
  kind: TransitKind;
  color: string;
  time: string;
  body: string;
  exact?: boolean;
}

export interface StationEvent {
  planet: string;
  nameAr: string;
  svgKey: string;
  month: number;
  day: number;
  type: 'sR' | 'sD';
  dateLabel: string;
}

// 2026 planetary stations — stationary points (change of direction)
export const STATIONS_2026: StationEvent[] = [
  // Mercury (6x)
  { planet: 'Mercury', nameAr: 'Mercury', svgKey: 'mercury', month: 2,  day: 26, type: 'sR', dateLabel: 'Feb 26' },
  { planet: 'Mercury', nameAr: 'Mercury', svgKey: 'mercury', month: 3,  day: 20, type: 'sD', dateLabel: 'Mar 20' },
  { planet: 'Mercury', nameAr: 'Mercury', svgKey: 'mercury', month: 6,  day: 29, type: 'sR', dateLabel: 'Jun 29' },
  { planet: 'Mercury', nameAr: 'Mercury', svgKey: 'mercury', month: 7,  day: 23, type: 'sD', dateLabel: 'Jul 23' },
  { planet: 'Mercury', nameAr: 'Mercury', svgKey: 'mercury', month: 10, day: 24, type: 'sR', dateLabel: 'Oct 24' },
  { planet: 'Mercury', nameAr: 'Mercury', svgKey: 'mercury', month: 11, day: 13, type: 'sD', dateLabel: 'Nov 13' },
  // Venus (2x)
  { planet: 'Venus',   nameAr: 'Venus',   svgKey: 'venus',   month: 10, day: 3,  type: 'sR', dateLabel: 'Oct 3' },
  { planet: 'Venus',   nameAr: 'Venus',   svgKey: 'venus',   month: 11, day: 14, type: 'sD', dateLabel: 'Nov 14' },
  // Jupiter (2x)
  { planet: 'Jupiter', nameAr: 'Jupiter', svgKey: 'jupiter', month: 3,  day: 11, type: 'sD', dateLabel: 'Mar 11' },
  { planet: 'Jupiter', nameAr: 'Jupiter', svgKey: 'jupiter', month: 12, day: 13, type: 'sR', dateLabel: 'Dec 13' },
  // Saturn (2x)
  { planet: 'Saturn',  nameAr: 'Saturn',  svgKey: 'saturn',  month: 7,  day: 26, type: 'sR', dateLabel: 'Jul 26' },
  { planet: 'Saturn',  nameAr: 'Saturn',  svgKey: 'saturn',  month: 12, day: 10, type: 'sD', dateLabel: 'Dec 10' },
  // Uranus (2x)
  { planet: 'Uranus',  nameAr: 'Uranus',  svgKey: 'uranus',  month: 2,  day: 4,  type: 'sD', dateLabel: 'Feb 4' },
  { planet: 'Uranus',  nameAr: 'Uranus',  svgKey: 'uranus',  month: 9,  day: 10, type: 'sR', dateLabel: 'Sep 10' },
  // Neptune (2x)
  { planet: 'Neptune', nameAr: 'Neptune', svgKey: 'neptune', month: 7,  day: 7,  type: 'sR', dateLabel: 'Jul 7' },
  { planet: 'Neptune', nameAr: 'Neptune', svgKey: 'neptune', month: 12, day: 12, type: 'sD', dateLabel: 'Dec 12' },
  // Pluto (2x)
  { planet: 'Pluto',   nameAr: 'Pluto',   svgKey: 'pluto',   month: 5,  day: 6,  type: 'sR', dateLabel: 'May 6' },
  { planet: 'Pluto',   nameAr: 'Pluto',   svgKey: 'pluto',   month: 10, day: 16, type: 'sD', dateLabel: 'Oct 16' },
  // Chiron (1x)
  { planet: 'Chiron',  nameAr: 'Chiron',  svgKey: 'chiron',  month: 8,  day: 3,  type: 'sR', dateLabel: 'Aug 3' },
];

// Build station events as CalEvents keyed by "month-day"
function buildStationCalEvents(): Record<string, CalEvent[]> {
  const result: Record<string, CalEvent[]> = {};
  for (const s of STATIONS_2026) {
    const key = `${s.month}-${s.day}`;
    if (!result[key]) result[key] = [];
    result[key].push({
      svgKey: s.svgKey,
      title: `${s.nameAr} ${s.type === 'sR' ? 'stations retrograde' : 'stations direct'}`,
      kind: 'station',
      color: '#D4A04C',
      time: s.dateLabel,
      body: s.type === 'sR'
        ? `${s.nameAr} begins its retrograde motion — a time for review and reflection.`
        : `${s.nameAr} resumes direct motion — energy flows forward.`,
    });
  }
  return result;
}

// Multi-month event map: key = "month-day" (1-indexed month)
const STATION_EVENTS = buildStationCalEvents();

// Original May 2026 events merged with station events
const MAY_EVENTS: Record<string, CalEvent[]> = {
  '5-2':  [{ svgKey: 'moon',    title: 'Moon enters Cancer',     kind: 'ingress',  color: '#7E97B8', time: '04:20', body: 'Moon enters Cancer, a sensitive water sign.' }],
  '5-6':  [
    { svgKey: 'sun',    title: 'Sun △ Jupiter',          kind: 'aspect',   color: '#8FA084', time: '11:02', body: 'Harmonious trine. An opportunity for calm expansion.' },
    { svgKey: 'venus',  title: 'Venus enters Gemini',    kind: 'ingress',  color: '#7E97B8', time: '22:47', body: 'Days begin with lighter communication and conversation.' },
  ],
  '5-10': [{ svgKey: 'moon',    title: 'Full Moon · Scorpio',    kind: 'lunation', color: '#E9785E', time: '17:53', body: 'Full Moon in Scorpio. A moment of revelation and closure.', exact: true }],
  '5-14': [{ svgKey: 'mercury', title: 'Mercury stationary',     kind: 'station',  color: '#D4A04C', time: '03:10', body: 'Mercury stationary at 8° Gemini before retrograde.' }],
  '5-17': [{ svgKey: 'mars',    title: 'Mars □ Saturn',          kind: 'aspect',   color: '#9A3F30', time: '09:24', body: 'Mars-Saturn square, within two degrees.' }],
  '5-20': [{ svgKey: 'sun',     title: 'Sun enters Gemini',      kind: 'ingress',  color: '#7E97B8', time: '14:36', body: 'Sun enters a new season. A light season of dialogue.' }],
  '5-24': [
    { svgKey: 'saturn', title: 'Saturn ☌ Sun',           kind: 'return',   color: '#E9785E', time: 'Now',   body: 'Saturn conjoins your natal Sun — 10 days of peak activity.', exact: true },
    { svgKey: 'venus',  title: 'Venus ☌ Jupiter',        kind: 'aspect',   color: '#8FA084', time: '07:40', body: 'Venus and Jupiter meet in Gemini.' },
  ],
  '5-26': [{ svgKey: 'moon',    title: 'New Moon · Gemini',      kind: 'lunation', color: '#E9785E', time: '12:02', body: 'Beginning of a new lunar cycle in Gemini. Plant an intention.', exact: true }],
  '5-28': [{ svgKey: 'mars',    title: 'Mars enters Leo',         kind: 'ingress',  color: '#D4A04C', time: '20:18', body: 'Mars enters Leo, ruler of the sign.' }],
  '5-30': [{ svgKey: 'moon',    title: 'Full Moon in Scorpio',   kind: 'lunation', color: '#E9785E', time: '06:14', body: 'Recurring monthly fullness. A moment of digestion and closure.', exact: true }],
};

// ── June–December 2026 transits (non-station events) ──────────────────────
// Stations (Retrograde/Direct) are sourced from STATIONS_2026 above to avoid
// duplicates; this list covers ingresses, conjunctions, lunations & eclipses.
const PLANET_AR: Record<string, string> = {
  sun: 'Sun', moon: 'Moon', mercury: 'Mercury', venus: 'Venus', mars: 'Mars',
  jupiter: 'Jupiter', saturn: 'Saturn', uranus: 'Uranus', neptune: 'Neptune', pluto: 'Pluto',
  chiron: 'Chiron', node: 'North Node', lilith: 'Lilith',
};
const SIGN_AR: Record<string, string> = {
  aries: 'Aries', taurus: 'Taurus', gemini: 'Gemini', cancer: 'Cancer', leo: 'Leo',
  virgo: 'Virgo', libra: 'Libra', scorpio: 'Scorpio', sagittarius: 'Sagittarius',
  capricorn: 'Capricorn', aquarius: 'Aquarius', pisces: 'Pisces',
};
const SVG_FOR: Record<string, string> = { node: 'northnode', lilith: 'lilith' };
const svgOf = (k: string) => SVG_FOR[k] ?? k;

type RawType = 'ingress' | 'leaves' | 'conj' | 'new' | 'full' | 'solar' | 'lunar';
interface RawTransit { m: number; d: number; t: string; type: RawType; a: string; b?: string; sign: string }

const H2_RAW: RawTransit[] = [
  // June
  { m: 6, d: 1,  t: '11:56', type: 'ingress', a: 'mercury', sign: 'cancer' },
  { m: 6, d: 9,  t: '19:58', type: 'conj',    a: 'venus', b: 'jupiter', sign: 'cancer' },
  { m: 6, d: 13, t: '10:47', type: 'ingress', a: 'venus', sign: 'leo' },
  { m: 6, d: 15, t: '02:53', type: 'new',     a: 'moon', sign: 'gemini' },
  { m: 6, d: 19, t: '21:18', type: 'ingress', a: 'chiron', sign: 'taurus' },
  { m: 6, d: 21, t: '08:25', type: 'ingress', a: 'sun', sign: 'cancer' },
  { m: 6, d: 28, t: '19:29', type: 'ingress', a: 'mars', sign: 'gemini' },
  { m: 6, d: 29, t: '23:56', type: 'full',    a: 'moon', sign: 'capricorn' },
  // July
  { m: 7, d: 4,  t: '06:07', type: 'conj',    a: 'mars', b: 'uranus', sign: 'gemini' },
  { m: 7, d: 9,  t: '17:22', type: 'ingress', a: 'venus', sign: 'virgo' },
  { m: 7, d: 13, t: '01:25', type: 'conj',    a: 'sun', b: 'mercury', sign: 'cancer' },
  { m: 7, d: 14, t: '09:43', type: 'new',     a: 'moon', sign: 'cancer' },
  { m: 7, d: 22, t: '19:13', type: 'ingress', a: 'sun', sign: 'leo' },
  { m: 7, d: 29, t: '12:17', type: 'conj',    a: 'sun', b: 'jupiter', sign: 'leo' },
  { m: 7, d: 29, t: '14:35', type: 'full',    a: 'moon', sign: 'aquarius' },
  // August
  { m: 8, d: 6,  t: '19:13', type: 'ingress', a: 'venus', sign: 'libra' },
  { m: 8, d: 9,  t: '16:29', type: 'ingress', a: 'mercury', sign: 'leo' },
  { m: 8, d: 11, t: '08:31', type: 'ingress', a: 'mars', sign: 'cancer' },
  { m: 8, d: 12, t: '17:36', type: 'new',     a: 'moon', sign: 'leo' },
  { m: 8, d: 12, t: '17:47', type: 'solar',   a: 'moon', sign: 'leo' },
  { m: 8, d: 15, t: '11:22', type: 'conj',    a: 'mercury', b: 'jupiter', sign: 'leo' },
  { m: 8, d: 18, t: '20:35', type: 'leaves',  a: 'node', sign: 'pisces' },
  { m: 8, d: 23, t: '02:19', type: 'ingress', a: 'sun', sign: 'virgo' },
  { m: 8, d: 25, t: '11:04', type: 'ingress', a: 'mercury', sign: 'virgo' },
  { m: 8, d: 27, t: '17:03', type: 'conj',    a: 'sun', b: 'mercury', sign: 'virgo' },
  { m: 8, d: 28, t: '04:14', type: 'lunar',   a: 'moon', sign: 'pisces' },
  { m: 8, d: 28, t: '04:18', type: 'full',    a: 'moon', sign: 'pisces' },
  // September
  { m: 9, d: 10, t: '08:07', type: 'ingress', a: 'venus', sign: 'scorpio' },
  { m: 9, d: 10, t: '16:21', type: 'ingress', a: 'mercury', sign: 'libra' },
  { m: 9, d: 11, t: '03:26', type: 'new',     a: 'moon', sign: 'virgo' },
  { m: 9, d: 14, t: '17:05', type: 'ingress', a: 'lilith', sign: 'capricorn' },
  { m: 9, d: 18, t: '01:54', type: 'leaves',  a: 'chiron', sign: 'taurus' },
  { m: 9, d: 23, t: '00:05', type: 'ingress', a: 'sun', sign: 'libra' },
  { m: 9, d: 26, t: '16:48', type: 'full',    a: 'moon', sign: 'aries' },
  { m: 9, d: 28, t: '02:49', type: 'ingress', a: 'mars', sign: 'leo' },
  { m: 9, d: 30, t: '11:45', type: 'ingress', a: 'mercury', sign: 'scorpio' },
  // October
  { m: 10, d: 7,  t: '00:10', type: 'conj',    a: 'mercury', b: 'venus', sign: 'scorpio' },
  { m: 10, d: 10, t: '15:49', type: 'new',     a: 'moon', sign: 'libra' },
  { m: 10, d: 23, t: '09:38', type: 'ingress', a: 'sun', sign: 'scorpio' },
  { m: 10, d: 24, t: '03:43', type: 'conj',    a: 'sun', b: 'venus', sign: 'scorpio' },
  { m: 10, d: 25, t: '09:10', type: 'leaves',  a: 'venus', sign: 'scorpio' },
  { m: 10, d: 26, t: '04:11', type: 'full',    a: 'moon', sign: 'taurus' },
  // November
  { m: 11, d: 4,  t: '14:24', type: 'conj',    a: 'sun', b: 'mercury', sign: 'scorpio' },
  { m: 11, d: 9,  t: '07:01', type: 'new',     a: 'moon', sign: 'scorpio' },
  { m: 11, d: 16, t: '06:23', type: 'conj',    a: 'mars', b: 'jupiter', sign: 'leo' },
  { m: 11, d: 22, t: '07:24', type: 'ingress', a: 'sun', sign: 'sagittarius' },
  { m: 11, d: 24, t: '14:53', type: 'full',    a: 'moon', sign: 'gemini' },
  { m: 11, d: 25, t: '23:37', type: 'ingress', a: 'mars', sign: 'virgo' },
  // December
  { m: 12, d: 4,  t: '08:13', type: 'ingress', a: 'venus', sign: 'scorpio' },
  { m: 12, d: 6,  t: '08:34', type: 'ingress', a: 'mercury', sign: 'sagittarius' },
  { m: 12, d: 9,  t: '00:51', type: 'new',     a: 'moon', sign: 'sagittarius' },
  { m: 12, d: 21, t: '20:50', type: 'ingress', a: 'sun', sign: 'capricorn' },
  { m: 12, d: 24, t: '01:27', type: 'full',    a: 'moon', sign: 'cancer' },
  { m: 12, d: 25, t: '18:23', type: 'ingress', a: 'mercury', sign: 'capricorn' },
];

function buildRawCalEvent(r: RawTransit): CalEvent {
  const a = PLANET_AR[r.a] ?? r.a;
  const b = r.b ? (PLANET_AR[r.b] ?? r.b) : '';
  const sign = SIGN_AR[r.sign] ?? r.sign;
  const time = r.t;
  switch (r.type) {
    case 'ingress':
      return { svgKey: svgOf(r.a), title: `${a} enters ${sign}`, kind: 'ingress', color: '#7E97B8', time, body: `${a} enters ${sign}.` };
    case 'leaves':
      return { svgKey: svgOf(r.a), title: `${a} leaves ${sign}`, kind: 'ingress', color: '#7E97B8', time, body: `${a} leaves ${sign} in retrograde motion.` };
    case 'conj':
      return { svgKey: svgOf(r.a), title: `${a} ☌ ${b}`, kind: 'aspect', color: '#E9785E', time, body: `${a} and ${b} conjoin in ${sign}.` };
    case 'new':
      return { svgKey: 'moon', title: `New Moon · ${sign}`, kind: 'lunation', color: '#E9785E', time, body: `New Moon in ${sign} — the start of a new cycle.`, exact: true };
    case 'full':
      return { svgKey: 'moon', title: `Full Moon · ${sign}`, kind: 'lunation', color: '#E9785E', time, body: `Full Moon in ${sign} — a moment of illumination and completion.`, exact: true };
    case 'solar':
      return { svgKey: 'sun', title: `Solar Eclipse · ${sign}`, kind: 'lunation', color: '#9A3F30', time, body: `Solar Eclipse in ${sign} — a powerful and pivotal beginning.`, exact: true };
    case 'lunar':
      return { svgKey: 'moon', title: `Lunar Eclipse · ${sign}`, kind: 'lunation', color: '#9A3F30', time, body: `Lunar Eclipse in ${sign} — an ending and emotional turning point.`, exact: true };
  }
}

const H2_2026_EVENTS: Record<string, CalEvent[]> = {};
for (const r of H2_RAW) {
  const key = `${r.m}-${r.d}`;
  (H2_2026_EVENTS[key] ??= []).push(buildRawCalEvent(r));
}

const ALL_2026_EVENTS: Record<string, CalEvent[]> = { ...MAY_EVENTS, ...H2_2026_EVENTS };
for (const [key, events] of Object.entries(STATION_EVENTS)) {
  if (ALL_2026_EVENTS[key]) {
    ALL_2026_EVENTS[key] = [...ALL_2026_EVENTS[key], ...events];
  } else {
    ALL_2026_EVENTS[key] = events;
  }
}

export function getEvents2026(month: number, day: number): CalEvent[] {
  return ALL_2026_EVENTS[`${month}-${day}`] || [];
}

// Legacy: original flat map for May (backwards compat with any remaining users)
export const CAL_TRANSITS: Record<number, CalEvent[]> = Object.fromEntries(
  Object.entries(MAY_EVENTS)
    .filter(([k]) => k.startsWith('5-'))
    .map(([k, v]) => [parseInt(k.split('-')[1]), v])
);

export const CAL_TODAY = 24;

export const AR_MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// LTR: Sun first (matches JS getDay() 0=Sun)
export const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const WEEK_DAYS_LTR = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function kindLabel(kind: TransitKind): string {
  return kind === 'lunation' ? 'Lunation'
    : kind === 'ingress' ? 'Ingress'
    : kind === 'aspect'  ? 'Aspect'
    : kind === 'station' ? 'Station'
    : 'Return';
}

export function toArabicNum(n: number): string {
  return String(n);
}

export function buildMonthCells(year: number, month: number, startWeekday: number): (number | null)[] {
  const totalDays = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export function getMonthStartWeekday(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}
