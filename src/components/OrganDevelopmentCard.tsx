'use client';

import type { OrganDevelopment } from '@/content/reportData/cosmology';

export function OrganDevelopmentCard(props: OrganDevelopment) {
  const { planet, organ, glyph, sevenYear, function_en, developmental_task, pathology_note } = props;

  return (
    <div className="rounded-[14px] border border-[#E5E1D8] bg-[#FAF6EF] p-4 space-y-3 mt-3">
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="text-2xl leading-none">{glyph}</span>
        <div>
          <p className="text-[13px] font-semibold text-ink font-ui">{planet} — {organ}</p>
          <p className="text-[11px] text-ink-muted font-ui">Seven-year phase: Ages {sevenYear}</p>
        </div>
      </div>

      {/* Function */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-muted font-ui mb-1">
          Organ Function
        </p>
        <p className="text-sm leading-relaxed text-ink font-ui">{function_en}</p>
      </div>

      {/* Developmental Task */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-muted font-ui mb-1">
          Developmental Task
        </p>
        <p className="text-sm leading-relaxed text-ink font-ui">{developmental_task}</p>
      </div>

      {/* Pathology Note */}
      {pathology_note && (
        <div className="border-t border-[#E5E1D8] pt-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-muted font-ui mb-1">
            Pathological Note
          </p>
          <p className="text-sm leading-relaxed text-ink-muted font-ui italic">{pathology_note}</p>
        </div>
      )}
    </div>
  );
}
