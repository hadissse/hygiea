import { Glyph } from '@/components/Glyph';

export interface LucifericAhrimanicAxisProps {
  planet: string;
  luciferic: string;
  ahrimanic: string;
  sphereName?: string;
}

export function LucifericAhrimanicAxis({
  planet,
  luciferic,
  ahrimanic,
  sphereName,
}: LucifericAhrimanicAxisProps) {
  return (
    <div className="w-full rounded-[18px] overflow-hidden border border-[#E5E1D8]">
      {/* Main axis row */}
      <div className="flex min-h-[140px]">
        {/* Luciferic pole — warm amber/gold */}
        <div className="flex-1 bg-amber-50 p-4 flex flex-col gap-2">
          <p className="text-[10px] font-ui font-semibold tracking-widest uppercase text-gold">
            Luciferic Pole
          </p>
          <p className="font-prose text-sm leading-relaxed text-ink">
            {luciferic}
          </p>
        </div>

        {/* Center divider */}
        <div className="flex flex-col items-center justify-center gap-2 px-3 bg-cream border-x border-[#E5E1D8] min-w-[72px]">
          <Glyph name={planet} size={22} color="var(--color-gold)" />
          <div className="w-px flex-1 bg-[#E5E1D8]" />
          <span className="text-[9px] font-ui text-ink-muted text-center leading-tight rotate-0 whitespace-nowrap">
            ↔ Middle<br />Way ↔
          </span>
          <div className="w-px flex-1 bg-[#E5E1D8]" />
        </div>

        {/* Ahrimanic pole — dark slate */}
        <div className="flex-1 bg-slate-50 p-4 flex flex-col gap-2">
          <p className="text-[10px] font-ui font-semibold tracking-widest uppercase text-ink-muted">
            Ahrimanic Pole
          </p>
          <p className="font-prose text-sm leading-relaxed text-ink">
            {ahrimanic}
          </p>
        </div>
      </div>

      {/* Footer: sphere name */}
      {sphereName && (
        <div className="border-t border-[#E5E1D8] px-4 py-2 bg-cream text-center">
          <span className="font-prose italic text-xs text-ink-muted">
            {sphereName}
          </span>
        </div>
      )}
    </div>
  );
}
