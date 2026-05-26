'use client';

// NEVER_AI — Library article content is human-authored. See src/content/library.ts.

import { useState } from 'react';
import Link from 'next/link';
import { LIBRARY_ARTICLES, LIBRARY_CATEGORIES, type LibraryCategory } from '@/content/library';

const CATEGORY_COLORS: Record<string, string> = {
  'Constitution':    '#1E3A5F',
  'Inner Anatomy':   '#A8B4C0',
  'Practice':        '#C9A84C',
  'Spiritual Science': '#5A3E7A',
  'Biography':       '#8B2E2E',
  'Seasons':         '#6B8F5C',
  'Texts':           '#78716C',
};

export default function LibraryPage() {
  const [activeCategory, setActiveCategory] = useState<LibraryCategory>('All');
  const [search, setSearch] = useState('');

  const filtered = LIBRARY_ARTICLES.filter((a) => {
    const matchCat = activeCategory === 'All' || a.category === activeCategory;
    const matchSearch = !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.summary.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="pb-28 max-w-[430px] mx-auto">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-1">
          Library
        </div>
        <h1 className="font-serif text-[1.75rem] text-ink leading-tight">Spiritual Science</h1>
        <p className="text-sm text-ink-muted mt-1">
          Authored study on Anthroposophical spiritual science — the foundation of this practice.
        </p>
      </div>

      {/* Search */}
      <div className="px-5 mb-3">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles…"
          className="w-full rounded-[14px] px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none border"
          style={{ borderColor: 'var(--color-rule-soft)', background: 'var(--color-cream)' }}
        />
      </div>

      {/* Category filter */}
      <div className="px-5 mb-4 flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {LIBRARY_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
            style={{
              background: activeCategory === cat
                ? (CATEGORY_COLORS[cat] ?? 'var(--color-cosmic-blue)')
                : 'rgba(28,25,23,0.06)',
              color: activeCategory === cat ? 'white' : 'var(--color-ink-muted)',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Article list */}
      <div className="px-5 space-y-2">
        {filtered.length === 0 && (
          <div className="text-center py-10 text-sm text-ink-muted">No articles found.</div>
        )}
        {filtered.map((article) => {
          const color = CATEGORY_COLORS[article.category] ?? '#78716C';
          return (
            <Link key={article.slug} href={`/library/${article.slug}`}>
              <div
                className="rounded-[16px] p-4 hover:opacity-90 transition-opacity"
                style={{ background: 'rgba(28,25,23,0.04)' }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div
                      className="text-[9px] font-medium tracking-widest uppercase mb-1"
                      style={{ color }}
                    >
                      {article.category}
                    </div>
                    <div className="font-serif text-[1.05rem] text-ink leading-snug mb-1">
                      {article.title}
                    </div>
                    <p className="text-xs text-ink-muted leading-[1.6]">
                      {article.summary}
                    </p>
                  </div>
                  <div className="text-[10px] text-ink-muted flex-shrink-0 mt-5">
                    {article.readMinutes} min
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Count */}
      {filtered.length > 0 && (
        <div className="px-5 pt-4 text-center text-xs text-ink-muted">
          {filtered.length} article{filtered.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}
