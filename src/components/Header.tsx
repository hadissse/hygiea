'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useAppShell } from '@/components/AppShell';

export function Header() {
  const [hidden, setHidden] = useState(false);
  const { setMobileSidebarOpen, setHelperOpen, helperOpen } = useAppShell();

  useEffect(() => {
    let last = window.scrollY;
    const handler = () => { const y = window.scrollY; setHidden(y > last && y > 60); last = y; };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header className={`sticky top-0 z-40 bg-cream/90 backdrop-blur-xl safe-top transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="flex items-center justify-between max-w-[430px] mx-auto h-12 px-5">
        {/* Left: hamburger */}
        <button onClick={() => setMobileSidebarOpen(true)} className="p-1 -m-1 text-ink-muted hover:text-ink" aria-label="Menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        {/* Center: logo */}
        <Link href="/today" aria-label="Hygiea">
          <Image src="/hygiea-logo.png" alt="Hygiea" width={44} height={44} className="object-contain" />
        </Link>

        {/* Right: ? helper */}
        <button
          onClick={() => setHelperOpen(!helperOpen)}
          className={`p-1 -m-1 transition-colors ${helperOpen ? 'text-coral' : 'text-ink-muted hover:text-ink'}`}
          aria-label="Help"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>
          </svg>
        </button>
      </div>
    </header>
  );
}
