'use client';

// ── Color palette (used internally) ──────────────────────────────────────────

const ARC_COLORS = {
  childhood:   '#6B9E8A',
  youth:       '#C9922A',
  adulthood:   '#7A6C5D',
  maturity:    '#5A6A8A',
  elderhood:   '#9A7A8A',
} as const;

// ── Seven-Year Phases data ────────────────────────────────────────────────────

const CURRENT_YEAR = 2026;

interface SevenYearPhase {
  label: string;
  startAge: number;
  endAge: number;
  color: string;
  planet: string;
  description: string;
}

const SEVEN_YEAR_PHASES: SevenYearPhase[] = [
  { label: '0–7', startAge: 0,  endAge: 7,  planet: 'Moon',    color: ARC_COLORS.childhood, description: 'The Moon phase — the etheric body is being formed; the child is entirely open to the world and absorbs its surroundings wholesale. Forces of imitation are supreme.' },
  { label: '7–14', startAge: 7,  endAge: 14, planet: 'Mercury', color: ARC_COLORS.childhood, description: 'The Mercury phase — the change of teeth marks the first liberation of etheric forces. The authority of the teacher becomes the organizing principle of learning.' },
  { label: '14–21', startAge: 14, endAge: 21, planet: 'Venus',   color: ARC_COLORS.youth, description: 'The Venus phase — puberty and the awakening of the astral body. The feeling life intensifies; the ideals of beauty and relationship become central.' },
  { label: '21–28', startAge: 21, endAge: 28, planet: 'Sun',     color: ARC_COLORS.youth, description: 'The Sun phase — the I begins to take its place. The young adult develops a sense of individual selfhood and begins to establish a place in the world.' },
  { label: '28–35', startAge: 28, endAge: 35, planet: 'Mars',    color: ARC_COLORS.adulthood, description: 'The Mars phase — the will forces mature. The first Saturn return falls here. The individual confronts their limitations and claims their true direction.' },
  { label: '35–42', startAge: 35, endAge: 42, planet: 'Jupiter', color: ARC_COLORS.adulthood, description: 'The Jupiter phase — broadening and consolidation. Wisdom begins to temper ambition; the individual becomes a resource for others.' },
  { label: '42–49', startAge: 42, endAge: 49, planet: 'Saturn',  color: ARC_COLORS.maturity, description: 'The Saturn phase — the mid-life reckoning. The soul confronts the gap between its earthly achievements and its deeper intentions.' },
  { label: '49–56', startAge: 49, endAge: 56, planet: 'Moon',    color: ARC_COLORS.maturity, description: 'Second Moon phase — the higher faculties ripen. The soul revisits the themes of childhood but now with conscious awareness.' },
  { label: '56–63', startAge: 56, endAge: 63, planet: 'Mercury', color: ARC_COLORS.elderhood, description: 'Second Mercury phase — the harvest of understanding. Communication and teaching take on a new depth.' },
  { label: '63+', startAge: 63, endAge: 999, planet: 'Venus/Sun', color: ARC_COLORS.elderhood, description: 'Elder phases — the soul looks toward the spiritual world with increasing clarity; earthly tasks are completed and transmitted.' },
];

// ── LifeArcColors component ───────────────────────────────────────────────────

interface LifeArcColorsProps {
  birthYear: number;
}

export function LifeArcColors({ birthYear }: LifeArcColorsProps) {
  const currentAge = CURRENT_YEAR - birthYear;
  const currentPhase = SEVEN_YEAR_PHASES.find(
    p => currentAge >= p.startAge && currentAge < p.endAge
  ) ?? SEVEN_YEAR_PHASES[SEVEN_YEAR_PHASES.length - 1];

  return (
    <div className="space-y-4 mt-4">
      {/* Phase bar */}
      <div className="flex gap-0.5 h-3 rounded-full overflow-hidden">
        {SEVEN_YEAR_PHASES.slice(0, 9).map(phase => (
          <div
            key={phase.label}
            className="flex-1 rounded-sm transition-opacity"
            style={{
              background: phase.color,
              opacity: phase === currentPhase ? 1 : 0.35,
            }}
          />
        ))}
      </div>

      {/* Current phase highlight */}
      <div
        className="rounded-[14px] border p-4 space-y-1.5"
        style={{ borderColor: currentPhase.color + '50', background: currentPhase.color + '0C' }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: currentPhase.color }} />
          <span className="text-[13px] font-semibold text-ink font-ui">
            Ages {currentPhase.label} — {currentPhase.planet} Phase
          </span>
          <span className="text-[11px] text-ink-muted font-ui ml-auto">Age {currentAge}</span>
        </div>
        <p className="text-sm leading-relaxed text-ink font-ui">{currentPhase.description}</p>
      </div>

      {/* All phases */}
      <div className="space-y-2">
        {SEVEN_YEAR_PHASES.map(phase => {
          const isCurrent = phase === currentPhase;
          return (
            <div
              key={phase.label}
              className={`flex items-start gap-3 rounded-[10px] px-4 py-3 ${
                isCurrent
                  ? 'bg-[#FAF6EF] border border-[#E5E1D8]'
                  : 'opacity-60'
              }`}
            >
              <div
                className="mt-1 w-2 h-2 rounded-full shrink-0"
                style={{ background: phase.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-semibold text-ink font-ui">{phase.label}</span>
                  <span className="text-[11px] text-ink-muted font-ui">· {phase.planet}</span>
                </div>
                <p className="text-[12px] text-ink leading-relaxed font-ui mt-0.5">{phase.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── SaturnReturn ───────────────────────────────────────────────────────────────

interface SaturnReturnProps {
  birthYear: number;
  birthMonth?: number;
}

const SATURN_PERIOD = 29.5; // approximate years per Saturn cycle

function saturnReturnYears(birthYear: number): number[] {
  const returns: number[] = [];
  let n = 1;
  while (true) {
    const year = Math.round(birthYear + n * SATURN_PERIOD);
    if (year > CURRENT_YEAR + 30) break;
    returns.push(year);
    n++;
  }
  return returns;
}

function getPhase(birthYear: number): { label: string; color: string; description: string } {
  const age = CURRENT_YEAR - birthYear;
  if (age < 21) return { label: 'Childhood & Youth', color: ARC_COLORS.childhood, description: 'The period of formation — soul fully entering the body, building the instruments for earthly life.' };
  if (age < 29) return { label: 'First Adult Phase', color: ARC_COLORS.youth, description: 'The I begins to assert itself in the world; the sentient and mind souls are being developed.' };
  if (age < 42) return { label: 'First Saturn Return to Mid-Life', color: ARC_COLORS.adulthood, description: 'The consciousness soul phase opens; the individual encounters their deeper purpose and the weight of karma.' };
  if (age < 56) return { label: 'Mid-Life to Second Saturn Return', color: ARC_COLORS.maturity, description: 'The I turns inward; the soul begins to work more consciously with spiritual forces.' };
  return { label: 'Elder Phase', color: ARC_COLORS.elderhood, description: 'Harvesting and transmitting — the life becomes a gift to future generations.' };
}

export function SaturnReturn({ birthYear, birthMonth = 1 }: SaturnReturnProps) {
  const returns = saturnReturnYears(birthYear);
  const phase = getPhase(birthYear);
  const currentAge = CURRENT_YEAR - birthYear;

  const nextReturn = returns.find(y => y > CURRENT_YEAR);
  const lastReturn = [...returns].reverse().find(y => y <= CURRENT_YEAR);

  // Use birthMonth to give slightly more precision in age display
  const currentAgeDisplay = birthMonth > 6
    ? `${currentAge}–${currentAge + 1}`
    : `${currentAge}`;

  return (
    <div className="space-y-5 mt-4">
      {/* Current Phase */}
      <div
        className="rounded-[14px] border p-5 space-y-2"
        style={{ borderColor: phase.color + '40', background: phase.color + '0A' }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: phase.color }} />
          <p className="text-[13px] font-semibold text-ink font-ui">{phase.label}</p>
          <span className="text-[11px] text-ink-muted font-ui">Age {currentAgeDisplay}</span>
        </div>
        <p className="text-sm leading-relaxed text-ink font-ui">{phase.description}</p>
      </div>

      {/* Saturn Return Markers */}
      <div className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-ink-muted font-ui">
          Saturn Return Markers
        </p>
        <div className="space-y-2">
          {returns.map((year, i) => {
            const age = year - birthYear;
            const isPast = year <= CURRENT_YEAR;
            const isCurrent = lastReturn === year;
            return (
              <div
                key={year}
                className={`flex items-center gap-3 rounded-[10px] px-4 py-3 ${
                  isCurrent
                    ? 'bg-[#C9922A10] border border-[#C9922A40]'
                    : isPast
                    ? 'bg-[#FAF6EF] border border-[#E5E1D8]'
                    : 'bg-white border border-[#E5E1D8] opacity-60'
                }`}
              >
                <span className="text-[11px] font-mono text-ink-muted w-16">{year}</span>
                <span className="text-[12px] text-ink font-ui">
                  {i + 1}{i === 0 ? 'st' : i === 1 ? 'nd' : i === 2 ? 'rd' : 'th'} Saturn Return
                </span>
                <span className="text-[11px] text-ink-muted font-ui ml-auto">Age {age}</span>
                {!isPast && nextReturn === year && (
                  <span className="text-[10px] font-semibold text-[#C9922A] bg-[#C9922A15] px-2 py-0.5 rounded-full">
                    Next
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
