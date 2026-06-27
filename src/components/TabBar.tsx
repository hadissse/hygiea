'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppShell } from '@/components/AppShell';

const tabs = [
  { key: 'self',     label: 'Self',         href: '/self',      icon: SelfIcon },
  { key: 'today',    label: 'Day',           href: '/today',     icon: TodayIcon },
  { key: 'spheres',  label: 'Spheres',       href: '/spheres',   icon: SpheresIcon },
  { key: 'track',    label: 'Track Events',  href: '/journey-2', icon: TrackIcon },
  { key: 'settings', label: 'Settings',      href: '/settings',  icon: SettingsIcon },
] as const;

function TodayIcon({ active }: { active: boolean }) {
  return active ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4" fill="#171B3A" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="#171B3A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5C5C7A" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function SpheresIcon({ active }: { active: boolean }) {
  const c = active ? '#171B3A' : '#5C5C7A';
  const w = active ? 2 : 1.5;
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" fill={active ? '#171B3A' : 'none'} stroke={c} strokeWidth={w} />
      <circle cx="12" cy="12" r="6.5" stroke={c} strokeWidth={w} />
      <circle cx="12" cy="12" r="10" stroke={c} strokeWidth={w} />
    </svg>
  );
}

function TrackIcon({ active }: { active: boolean }) {
  const c = active ? '#171B3A' : '#5C5C7A';
  const w = active ? 2 : 1.5;
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" fill={active ? c : 'none'} />
    </svg>
  );
}

function SelfIcon({ active }: { active: boolean }) {
  return active ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#171B3A">
      <circle cx="12" cy="8" r="4" />
      <path d="M5.5 21a6.5 6.5 0 0 1 13 0" fill="#171B3A" />
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5C5C7A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
    </svg>
  );
}

function SettingsIcon({ active }: { active: boolean }) {
  const c = active ? '#171B3A' : '#5C5C7A';
  const w = active ? 2 : 1.5;
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" fill={active ? '#171B3A' : 'none'} />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

export function TabBar() {
  const pathname = usePathname();
  const { setHelperOpen, helperOpen } = useAppShell();
  return (
    <nav className="relative fixed bottom-0 inset-x-0 bg-cream/95 backdrop-blur-xl border-t border-rule-soft safe-bottom z-50">
      <div className="flex items-center justify-around max-w-[430px] mx-auto h-[56px]">
        {tabs.map((tab) => {
          const active = pathname === tab.href || pathname.startsWith(tab.href + '/');
          const Icon = tab.icon;
          return (
            <Link
              key={tab.key}
              href={tab.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 transition-colors ${active ? 'text-ink' : 'text-ink-muted'}`}
            >
              <Icon active={active} />
              <span className="text-[10px] font-medium tracking-wide">{tab.label}</span>
            </Link>
          );
        })}
      </div>
      <button
        onClick={() => setHelperOpen(!helperOpen)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-ink/5 flex items-center justify-center text-ink-muted hover:text-ink"
        aria-label="Help"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>
        </svg>
      </button>
    </nav>
  );
}
