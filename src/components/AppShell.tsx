'use client';

import React, { createContext, useContext, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { HelperPanel } from './HelperPanel';

interface AppShellCtx {
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (v: boolean) => void;
  helperOpen: boolean;
  setHelperOpen: (v: boolean) => void;
}

const AppShellContext = createContext<AppShellCtx>({
  sidebarOpen: true,
  setSidebarOpen: () => {},
  mobileSidebarOpen: false,
  setMobileSidebarOpen: () => {},
  helperOpen: false,
  setHelperOpen: () => {},
});

export function useAppShell() {
  return useContext(AppShellContext);
}

const SECTION_TITLES: Record<string, string> = {
  '/today': 'Day',
  '/self': 'Self',
  '/spheres': 'Spheres',
  '/biography': 'Biography',
  '/hierarchy': 'Hierarchy',
  '/orrery': 'Orrery',
  '/constellations': 'Constellations',
  '/reports': 'Reports',
  '/explore': 'Explore',
  '/learn': 'Library',
  '/journey': 'Journey',
  '/settings': 'Settings',
};

function getSectionTitle(pathname: string): string {
  const key = Object.keys(SECTION_TITLES).find((k) => pathname.startsWith(k));
  return key ? SECTION_TITLES[key] : 'Hygiea';
}

function Topbar() {
  const { sidebarOpen, setSidebarOpen, helperOpen, setHelperOpen } = useAppShell();
  const pathname = usePathname();
  const title = getSectionTitle(pathname);

  return (
    <div className="flex items-center h-12 px-4 md:px-6 border-b border-rule-soft/50 bg-cream/80 backdrop-blur-lg sticky top-0 z-30">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        className="w-8 h-8 flex items-center justify-center text-ink-muted hover:text-ink transition-colors rounded-lg hover:bg-ink/5"
      >
        {sidebarOpen ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        )}
      </button>

      <span className="flex-1 text-center text-sm font-medium text-ink">{title}</span>

      <button
        onClick={() => setHelperOpen(!helperOpen)}
        aria-label="Toggle helper panel"
        className="w-8 h-8 flex items-center justify-center text-ink-muted hover:text-ink transition-colors rounded-lg hover:bg-ink/5 relative"
      >
        <span className="text-sm font-medium">?</span>
        {helperOpen && (
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#E9785E]" />
        )}
      </button>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [helperOpen, setHelperOpen] = useState(true);

  return (
    <AppShellContext.Provider value={{ sidebarOpen, setSidebarOpen, mobileSidebarOpen, setMobileSidebarOpen, helperOpen, setHelperOpen }}>
      <div className="flex min-h-dvh bg-cream">
        <div className={`transition-all duration-300 ${sidebarOpen ? '' : '!hidden'}`}>
          <Sidebar />
        </div>

        <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
          <Topbar />

          <main className="flex-1 pb-0 w-full md:max-w-full md:mx-0">
            {children}
          </main>
        </div>

        <HelperPanel />
      </div>
    </AppShellContext.Provider>
  );
}
