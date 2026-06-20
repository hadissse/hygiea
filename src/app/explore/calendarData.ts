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
  { planet: 'Mercury', nameAr: 'عطارد', svgKey: 'mercury', month: 2,  day: 26, type: 'sR', dateLabel: '٢٦ فبراير' },
  { planet: 'Mercury', nameAr: 'عطارد', svgKey: 'mercury', month: 3,  day: 20, type: 'sD', dateLabel: '٢٠ مارس' },
  { planet: 'Mercury', nameAr: 'عطارد', svgKey: 'mercury', month: 6,  day: 29, type: 'sR', dateLabel: '٢٩ يونيو' },
  { planet: 'Mercury', nameAr: 'عطارد', svgKey: 'mercury', month: 7,  day: 23, type: 'sD', dateLabel: '٢٣ يوليو' },
  { planet: 'Mercury', nameAr: 'عطارد', svgKey: 'mercury', month: 10, day: 24, type: 'sR', dateLabel: '٢٤ أكتوبر' },
  { planet: 'Mercury', nameAr: 'عطارد', svgKey: 'mercury', month: 11, day: 13, type: 'sD', dateLabel: '١٣ نوفمبر' },
  // Venus (2x)
  { planet: 'Venus',   nameAr: 'الزهرة', svgKey: 'venus',   month: 10, day: 3,  type: 'sR', dateLabel: '٣ أكتوبر' },
  { planet: 'Venus',   nameAr: 'الزهرة', svgKey: 'venus',   month: 11, day: 14, type: 'sD', dateLabel: '١٤ نوفمبر' },
  // Jupiter (2x)
  { planet: 'Jupiter', nameAr: 'المشتري', svgKey: 'jupiter', month: 3,  day: 11, type: 'sD', dateLabel: '١١ مارس' },
  { planet: 'Jupiter', nameAr: 'المشتري', svgKey: 'jupiter', month: 12, day: 13, type: 'sR', dateLabel: '١٣ ديسمبر' },
  // Saturn (2x)
  { planet: 'Saturn',  nameAr: 'زحل',    svgKey: 'saturn',  month: 7,  day: 26, type: 'sR', dateLabel: '٢٦ يوليو' },
  { planet: 'Saturn',  nameAr: 'زحل',    svgKey: 'saturn',  month: 12, day: 10, type: 'sD', dateLabel: '١٠ ديسمبر' },
  // Uranus (2x)
  { planet: 'Uranus',  nameAr: 'أورانوس', svgKey: 'uranus', month: 2,  day: 4,  type: 'sD', dateLabel: '٤ فبراير' },
  { planet: 'Uranus',  nameAr: 'أورانوس', svgKey: 'uranus', month: 9,  day: 10, type: 'sR', dateLabel: '١٠ سبتمبر' },
  // Neptune (2x)
  { planet: 'Neptune', nameAr: 'نبتون',   svgKey: 'neptune', month: 7,  day: 7,  type: 'sR', dateLabel: '٧ يوليو' },
  { planet: 'Neptune', nameAr: 'نبتون',   svgKey: 'neptune', month: 12, day: 12, type: 'sD', dateLabel: '١٢ ديسمبر' },
  // Pluto (2x)
  { planet: 'Pluto',   nameAr: 'بلوتو',   svgKey: 'pluto',  month: 5,  day: 6,  type: 'sR', dateLabel: '٦ مايو' },
  { planet: 'Pluto',   nameAr: 'بلوتو',   svgKey: 'pluto',  month: 10, day: 16, type: 'sD', dateLabel: '١٦ أكتوبر' },
  // Chiron (1x)
  { planet: 'Chiron',  nameAr: 'كيرون',   svgKey: 'chiron', month: 8,  day: 3,  type: 'sR', dateLabel: '٣ أغسطس' },
];

// Build station events as CalEvents keyed by "month-day"
function buildStationCalEvents(): Record<string, CalEvent[]> {
  const result: Record<string, CalEvent[]> = {};
  for (const s of STATIONS_2026) {
    const key = `${s.month}-${s.day}`;
    if (!result[key]) result[key] = [];
    result[key].push({
      svgKey: s.svgKey,
      title: `${s.nameAr} ${s.type === 'sR' ? 'يبدأ الرجوع' : 'يعود مباشرًا'}`,
      kind: 'station',
      color: '#D4A04C',
      time: s.dateLabel,
      body: s.type === 'sR'
        ? `${s.nameAr} يبدأ حركته الراجعة — وقت مراجعة وإعادة نظر.`
        : `${s.nameAr} يستأنف حركته المباشرة — الطاقة تتدفّق للأمام.`,
    });
  }
  return result;
}

// Multi-month event map: key = "month-day" (1-indexed month)
const STATION_EVENTS = buildStationCalEvents();

// Original May 2026 events merged with station events
const MAY_EVENTS: Record<string, CalEvent[]> = {
  '5-2':  [{ svgKey: 'moon',    title: 'القمر يدخل السرطان',   kind: 'ingress', color: '#7E97B8', time: '٠٤:٢٠', body: 'القمر يدخل السرطان، برجٌ مائي حسّاس.' }],
  '5-6':  [
    { svgKey: 'sun',    title: 'الشمس △ المشتري',     kind: 'aspect',  color: '#8FA084', time: '١١:٠٢', body: 'تثليث متناغم. فرصة للتوسّع بهدوء.' },
    { svgKey: 'venus',  title: 'الزهرة تدخل الجوزاء', kind: 'ingress', color: '#7E97B8', time: '٢٢:٤٧', body: 'بداية أيام أخفّ في التواصل والمحادثة.' },
  ],
  '5-10': [{ svgKey: 'moon',    title: 'بدر القمر · العقرب',   kind: 'lunation', color: '#E9785E', time: '١٧:٥٣', body: 'اكتمال قمري في العقرب. لحظة كشف وإغلاق ملف.', exact: true }],
  '5-14': [{ svgKey: 'mercury', title: 'عطارد ساكن',           kind: 'station',  color: '#D4A04C', time: '٠٣:١٠', body: 'عطارد ساكن عند الدرجة الثامنة من الجوزاء قبل الرجوع.' }],
  '5-17': [{ svgKey: 'mars',    title: 'المريخ □ زحل',          kind: 'aspect',   color: '#9A3F30', time: '٠٩:٢٤', body: 'تربيع المريخ وزحل، ضمن درجتين.' }],
  '5-20': [{ svgKey: 'sun',     title: 'الشمس تدخل الجوزاء',   kind: 'ingress',  color: '#7E97B8', time: '١٤:٣٦', body: 'دخول الشمس فصلًا جديدًا. موسم خفيف وحوار.' }],
  '5-24': [
    { svgKey: 'saturn', title: 'زحل ☌ الشمس',          kind: 'return',   color: '#E9785E', time: 'الآن',  body: 'اقتران زحل بالشمس على خريطتك — ١٠ أيام في النشاط.', exact: true },
    { svgKey: 'venus',  title: 'الزهرة ☌ المشتري',     kind: 'aspect',   color: '#8FA084', time: '٠٧:٤٠', body: 'الزهرة والمشتري يلتقيان في الجوزاء.' },
  ],
  '5-26': [{ svgKey: 'moon',    title: 'القمر الجديد · الجوزاء', kind: 'lunation', color: '#E9785E', time: '١٢:٠٢', body: 'بداية دورة قمرية جديدة في الجوزاء. ابذر نيّة.', exact: true }],
  '5-28': [{ svgKey: 'mars',    title: 'المريخ يدخل الأسد',    kind: 'ingress',  color: '#D4A04C', time: '٢٠:١٨', body: 'المريخ يدخل الأسد، حاكم البرج.' }],
  '5-30': [{ svgKey: 'moon',    title: 'اكتمال القمر في العقرب', kind: 'lunation', color: '#E9785E', time: '٠٦:١٤', body: 'تكرار اكتمال شهري. لحظة هضم وإغلاق.', exact: true }],
};

// ── June–December 2026 transits (non-station events) ──────────────────────
// Stations (Retrograde/Direct) are sourced from STATIONS_2026 above to avoid
// duplicates; this list covers ingresses, conjunctions, lunations & eclipses.
const PLANET_AR: Record<string, string> = {
  sun: 'الشمس', moon: 'القمر', mercury: 'عطارد', venus: 'الزهرة', mars: 'المريخ',
  jupiter: 'المشتري', saturn: 'زحل', uranus: 'أورانوس', neptune: 'نبتون', pluto: 'بلوتو',
  chiron: 'كيرون', node: 'العقدة الشمالية', lilith: 'ليليث',
};
const SIGN_AR: Record<string, string> = {
  aries: 'الحمل', taurus: 'الثور', gemini: 'الجوزاء', cancer: 'السرطان', leo: 'الأسد',
  virgo: 'العذراء', libra: 'الميزان', scorpio: 'العقرب', sagittarius: 'القوس',
  capricorn: 'الجدي', aquarius: 'الدلو', pisces: 'الحوت',
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
  const time = r.t.replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[+d]);
  switch (r.type) {
    case 'ingress':
      return { svgKey: svgOf(r.a), title: `${a} يدخل ${sign}`, kind: 'ingress', color: '#7E97B8', time, body: `${a} يدخل ${sign}.` };
    case 'leaves':
      return { svgKey: svgOf(r.a), title: `${a} يغادر ${sign}`, kind: 'ingress', color: '#7E97B8', time, body: `${a} يغادر ${sign} في حركته الراجعة.` };
    case 'conj':
      return { svgKey: svgOf(r.a), title: `${a} ☌ ${b}`, kind: 'aspect', color: '#E9785E', time, body: `اقتران ${a} و${b} في ${sign}.` };
    case 'new':
      return { svgKey: 'moon', title: `القمر الجديد · ${sign}`, kind: 'lunation', color: '#E9785E', time, body: `قمر جديد في ${sign} — بداية دورة جديدة.`, exact: true };
    case 'full':
      return { svgKey: 'moon', title: `اكتمال القمر · ${sign}`, kind: 'lunation', color: '#E9785E', time, body: `اكتمال القمر في ${sign} — لحظة كشف وإغلاق.`, exact: true };
    case 'solar':
      return { svgKey: 'sun', title: `كسوف شمسي · ${sign}`, kind: 'lunation', color: '#9A3F30', time, body: `كسوف شمسي في ${sign} — بداية قوية ومحوريّة.`, exact: true };
    case 'lunar':
      return { svgKey: 'moon', title: `خسوف قمري · ${sign}`, kind: 'lunation', color: '#9A3F30', time, body: `خسوف قمري في ${sign} — نهاية ومنعطف عاطفي.`, exact: true };
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
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
];

// RTL: Sat first
export const WEEK_DAYS = ['س', 'ج', 'خ', 'ر', 'ث', 'ا', 'ح'];
export const WEEK_DAYS_LTR = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

export function kindLabel(kind: TransitKind): string {
  return kind === 'lunation' ? 'قمري'
    : kind === 'ingress' ? 'دخول'
    : kind === 'aspect'  ? 'جانب'
    : kind === 'station' ? 'محطّ'
    : 'عودة';
}

export function toArabicNum(n: number): string {
  return String(n).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[+d]);
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
