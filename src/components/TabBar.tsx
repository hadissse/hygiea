'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { key: 'today',        label: 'Today',    href: '/today',        icon: TodayIcon },
  { key: 'constitution', label: 'Self',      href: '/constitution', icon: SelfIcon },
  { key: 'library',      label: 'Study',    href: '/library',      icon: StudyIcon },
  { key: 'rhythms',      label: 'Rhythms',  href: '/rhythms',      icon: RhythmsIcon },
  { key: 'settings',     label: 'Settings', href: '/settings',     icon: SettingsIcon },
] as const;

function TodayIcon({ active }: { active: boolean }) {
  const c = active ? 'var(--color-cosmic-blue)' : 'var(--color-ink-muted)';
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" fill={active ? c : 'none'} />
      <line x1="12" y1="2" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="2" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="4.93" x2="7.05" y2="7.05" />
      <line x1="16.95" y1="16.95" x2="19.07" y2="19.07" />
      <line x1="4.93" y1="19.07" x2="7.05" y2="16.95" />
      <line x1="16.95" y1="7.05" x2="19.07" y2="4.93" />
    </svg>
  );
}

function SelfIcon({ active }: { active: boolean }) {
  const c = active ? 'var(--color-cosmic-blue)' : 'var(--color-ink-muted)';
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12,3 21,20.5 3,20.5" fill={active ? c : 'none'} />
      <circle cx="12" cy="12" r="3" stroke={active ? 'white' : c} fill={active ? 'white' : 'none'} strokeWidth={active ? '1' : '1.6'} />
    </svg>
  );
}

function StudyIcon({ active }: { active: boolean }) {
  const c = active ? 'var(--color-cosmic-blue)' : 'var(--color-ink-muted)';
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round">
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="14" y2="17" />
    </svg>
  );
}

function RhythmsIcon({ active }: { active: boolean }) {
  const c = active ? 'var(--color-cosmic-blue)' : 'var(--color-ink-muted)';
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12 Q6 4 12 12 Q18 20 22 12" />
    </svg>
  );
}

function SettingsIcon({ active }: { active: boolean }) {
  const c = active ? 'var(--color-cosmic-blue)' : 'var(--color-ink-muted)';
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

export function TabBar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 inset-x-0 backdrop-blur-xl border-t safe-bottom z-50"
      style={{
        background: 'rgba(245,242,234,0.92)',
        borderColor: 'var(--color-rule-soft)',
      }}
    >
      <div className="flex items-center justify-around max-w-[430px] mx-auto h-[56px]">
        {tabs.map((tab) => {
          const active =
            pathname === tab.href ||
            (tab.key !== 'today' && pathname.startsWith(tab.href));
          const Icon = tab.icon;
          return (
            <Link
              key={tab.key}
              href={tab.href}
              className="flex flex-col items-center gap-1 px-3 py-1.5 transition-colors min-w-[56px]"
            >
              <Icon active={active} />
              <span
                className="text-[9.5px] font-medium tracking-wide"
                style={{
                  color: active ? 'var(--color-cosmic-blue)' : 'var(--color-ink-muted)',
                }}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
