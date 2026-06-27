'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAppShell } from './AppShell';
import { HELPER_CONTENT } from '@/content/helperContent';

type Tab = 'see' | 'terms' | 'use';

function findContent(pathname: string) {
  const keys = Object.keys(HELPER_CONTENT);
  const match = keys.find((k) => pathname.startsWith(k));
  return match ? HELPER_CONTENT[match] : HELPER_CONTENT['/today'];
}

function PanelContent() {
  const pathname = usePathname();
  const { setHelperOpen } = useAppShell();
  const [tab, setTab] = useState<Tab>('see');
  const content = findContent(pathname);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'see', label: 'What you see' },
    { id: 'terms', label: 'Key terms' },
    { id: 'use', label: 'How to use' },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 py-4 border-b border-rule-soft/50 shrink-0">
        <span className="text-sm font-medium text-ink">{content.title}</span>
        <button
          onClick={() => setHelperOpen(false)}
          className="text-ink-muted hover:text-ink transition-colors text-lg leading-none w-7 h-7 flex items-center justify-center"
          aria-label="Close helper"
        >
          ×
        </button>
      </div>

      <div className="flex gap-1.5 px-5 py-3 shrink-0">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              tab === t.id
                ? 'bg-[#E9785E] text-cream'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {tab === 'see' && (
          <p className="text-sm text-ink-muted leading-relaxed">{content.whatYouSee}</p>
        )}

        {tab === 'terms' && (
          <ul className="space-y-3">
            {content.keyTerms.map((item) => (
              <li key={item.term}>
                <span className="text-sm font-semibold text-ink">{item.term}</span>
                <span className="text-sm text-ink-muted"> — {item.def}</span>
              </li>
            ))}
          </ul>
        )}

        {tab === 'use' && (
          <ol className="space-y-3 list-none">
            {content.howToUse.map((tip, i) => (
              <li key={i} className="flex gap-3">
                <span className="shrink-0 w-5 h-5 rounded-full bg-[#E9785E]/15 text-[#E9785E] text-xs font-semibold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm text-ink-muted leading-relaxed">{tip}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

export function HelperPanel() {
  const { helperOpen, setHelperOpen } = useAppShell();

  return (
    <>
      <div className={`transition-all duration-300 overflow-hidden shrink-0 ${helperOpen ? 'w-[360px]' : 'w-0'}`}>
        <aside className="flex flex-col w-[360px] border-l border-rule-soft bg-cream-soft/60 backdrop-blur-xl sticky top-0 h-dvh overflow-y-auto">
          {helperOpen && <PanelContent />}
        </aside>
      </div>

    </>
  );
}
