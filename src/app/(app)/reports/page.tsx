'use client';

import Link from 'next/link';

export default function ReportsPage() {
  return (
    <div className="px-5 pt-10 pb-6">
      <div className="mb-8">
        <p className="text-ink-muted text-xs uppercase tracking-widest font-ui mb-1">Reports</p>
        <h1 className="text-2xl font-prose font-medium text-ink">Cosmological Biography</h1>
        <p className="text-sm text-ink-muted mt-2 leading-relaxed">
          Generate a full chart report — natal positions, aspects, fixed stars, and personal narrative notes.
        </p>
      </div>

      <Link
        href="/reports/new"
        className="flex items-center justify-between bg-midnight text-white rounded-[18px] px-6 py-5 mb-3"
      >
        <div>
          <p className="font-prose text-lg font-medium">New Report</p>
          <p className="text-xs text-white/60 mt-1 font-ui">Fill in chart data and generate a biography</p>
        </div>
        <span className="text-2xl opacity-60">→</span>
      </Link>

      <Link
        href="/reports/library"
        className="flex items-center justify-between bg-[#F4F0E8] rounded-[18px] px-6 py-5 mb-3"
      >
        <div>
          <p className="font-prose text-base font-medium text-ink">Interpretation Library</p>
          <p className="text-xs text-ink-muted mt-1 font-ui">Browse all placements, spheres &amp; fixed stars</p>
        </div>
        <span className="text-xl opacity-40 text-ink">→</span>
      </Link>

      <Link
        href="/biography"
        className="flex items-center justify-between bg-white border-l-4 border-[#C9A84C] rounded-[18px] px-6 py-5 mb-4 shadow-sm"
      >
        <div>
          <p className="font-prose text-base font-medium text-ink">Your Biography</p>
          <p className="text-xs text-ink-muted mt-1 font-ui">Auto-generated from your chart — all 6 chapters of interpretation</p>
        </div>
        <span className="text-xl opacity-40 text-ink">→</span>
      </Link>
    </div>
  );
}
