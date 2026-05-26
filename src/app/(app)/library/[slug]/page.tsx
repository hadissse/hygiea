'use client';

// NEVER_AI — All library article content is human-authored.

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getArticleBySlug } from '@/content/library';

const CATEGORY_COLORS: Record<string, string> = {
  'Constitution':      '#1E3A5F',
  'Inner Anatomy':     '#A8B4C0',
  'Practice':          '#C9A84C',
  'Spiritual Science': '#5A3E7A',
  'Biography':         '#8B2E2E',
  'Seasons':           '#6B8F5C',
  'Texts':             '#78716C',
};

export default function LibraryArticlePage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : Array.isArray(params.slug) ? params.slug[0] : '';
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="pb-28 max-w-[430px] mx-auto px-5 pt-10 text-center">
        <p className="text-ink-muted text-sm">Article not found.</p>
        <Link href="/library" className="block mt-4 text-sm font-medium" style={{ color: 'var(--color-cosmic-blue)' }}>
          ← Back to Library
        </Link>
      </div>
    );
  }

  const color = CATEGORY_COLORS[article.category] ?? '#78716C';
  const paragraphs = article.body.trim().split(/\n\n+/);

  return (
    <div className="pb-28 max-w-[430px] mx-auto">
      {/* Back */}
      <div className="px-5 pt-5">
        <Link
          href="/library"
          className="text-xs font-medium"
          style={{ color: 'var(--color-ink-muted)' }}
        >
          ← Library
        </Link>
      </div>

      {/* Header */}
      <div className="px-5 pt-3 pb-5">
        <div
          className="text-[10px] font-medium tracking-widest uppercase mb-2"
          style={{ color }}
        >
          {article.category} · {article.readMinutes} min read
        </div>
        <h1 className="font-serif text-[1.75rem] text-ink leading-tight mb-3">
          {article.title}
        </h1>
        <p className="text-sm text-ink-muted leading-[1.65] italic font-serif">
          {article.summary}
        </p>
      </div>

      {/* Divider */}
      <div className="mx-5 mb-5" style={{ borderTop: '1px solid var(--color-rule-soft)' }} />

      {/* Body */}
      <div className="px-5 space-y-5">
        {paragraphs.map((para, i) => (
          <p key={i} className="font-serif text-[1rem] text-ink-soft leading-[1.75]">
            {para.trim()}
          </p>
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 mt-8">
        <div
          className="rounded-[14px] p-4 text-center"
          style={{ background: `${color}10` }}
        >
          <p className="text-xs text-ink-muted leading-[1.65]">
            All library articles are human-authored. Sources: Rudolf Steiner's complete works (GA series), Anthroposophical Society publications.
          </p>
        </div>
        <Link
          href="/library"
          className="block mt-5 text-center text-sm font-medium"
          style={{ color }}
        >
          ← Back to Library
        </Link>
      </div>
    </div>
  );
}
