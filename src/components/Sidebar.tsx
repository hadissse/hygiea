'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

function TodayIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? '#171B3A' : 'none'} stroke={active ? '#171B3A' : '#5C5C7A'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" fill={active ? '#171B3A' : 'none'} />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function SpheresIcon({ active }: { active: boolean }) {
  const c = active ? '#171B3A' : '#5C5C7A';
  const w = active ? 2 : 1.5;
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" fill={active ? '#171B3A' : 'none'} stroke={c} strokeWidth={w} />
      <circle cx="12" cy="12" r="6.5" stroke={c} strokeWidth={w} />
      <circle cx="12" cy="12" r="10" stroke={c} strokeWidth={w} />
    </svg>
  );
}

function EventsIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 3L21 8.5V15.5L12 21L3 15.5V8.5L12 3Z" fill={active ? '#171B3A' : 'none'} stroke={active ? '#171B3A' : '#5C5C7A'} strokeWidth={active ? 2 : 1.5} strokeLinejoin="round" />
    </svg>
  );
}

function SelfIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? '#171B3A' : 'none'} stroke={active ? '#171B3A' : '#5C5C7A'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" fill={active ? '#171B3A' : 'none'} />
      <path d="M5.5 21a6.5 6.5 0 0 1 13 0" fill={active ? '#171B3A' : 'none'} />
    </svg>
  );
}

function BiographyIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? '#171B3A' : '#5C5C7A'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" fill={active ? '#171B3A' : 'none'} />
    </svg>
  );
}

const primaryNav = [
  { key: 'today',     label: 'Day',       href: '/today',     Icon: TodayIcon },
  { key: 'spheres',   label: 'Spheres',   href: '/spheres',   Icon: SpheresIcon },
  { key: 'events',    label: 'Events',    href: '/events',    Icon: EventsIcon },
  { key: 'self',      label: 'Self',      href: '/self',      Icon: SelfIcon },
  { key: 'biography', label: 'Biography', href: '/biography', Icon: BiographyIcon },
] as const;

export function Sidebar() {
  const pathname = usePathname();

  const reportsActive = pathname.startsWith('/reports');
  const settingsActive = pathname.startsWith('/settings');

  return (
    <aside className="relative hidden md:flex md:flex-col md:shrink-0 md:w-[220px] lg:w-[248px] xl:w-[272px] md:sticky md:top-0 md:h-dvh border-e border-rule-soft bg-cream-soft/40 backdrop-blur-xl z-40 overflow-hidden">
      {/* Decorative cosmic circle */}
      <div
        className="absolute bottom-0 left-0 w-[240px] h-[240px] rounded-full pointer-events-none -translate-x-1/2 translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(233,120,94,0.06) 0%, transparent 70%)' }}
      />

      <div className="flex flex-col h-full px-4 py-6">
        {/* Brand */}
        <Link href="/today" className="flex items-center gap-2.5 px-2 mb-7" aria-label="Hygiea">
          <div className="relative">
            <div className="absolute inset-[-3px] rounded-full border border-rule-soft opacity-60" />
            <Image src="/hygiea-logo.png" alt="Hygiea" width={36} height={36} className="object-contain" />
          </div>
          <span className="font-serif text-xl text-ink tracking-wide">Hygiea</span>
        </Link>

        {/* Primary navigation */}
        <nav className="flex flex-col gap-0.5">
          {primaryNav.map(({ key, label, href, Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={key}
                href={href}
                className={`relative flex items-center gap-3 px-3 h-10 rounded-[12px] text-[14px] font-medium transition-colors ${
                  active
                    ? 'bg-white text-ink shadow-sm border border-rule-soft'
                    : 'text-ink-muted hover:text-ink hover:bg-white/60'
                }`}
                style={active ? { borderLeftColor: '#E9785E' } : undefined}
              >
                {active && (
                  <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-coral" />
                )}
                <Icon active={active} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Separator with gradient */}
        <div
          className="h-px my-4 mx-1"
          style={{ background: 'linear-gradient(to right, transparent, #E8E2D2 30%, #E8E2D2 70%, transparent)' }}
        />

        {/* Secondary actions */}
        <div className="flex flex-col gap-0.5">
          <Link
            href="/log"
            className="flex items-center gap-3 px-3 h-10 rounded-[12px] text-[14px] font-medium text-coral hover:bg-white/60 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-coral shrink-0 animate-pulse" />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Log event</span>
          </Link>

          <Link
            href="/journey-2"
            className="flex items-center gap-3 px-3 h-10 rounded-[12px] text-[14px] font-medium text-ink-muted hover:text-ink hover:bg-white/60 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 3v18l7-4 7 4V3z" />
            </svg>
            <span>Track &amp; Save</span>
          </Link>

          <Link
            href="/reports"
            className={`relative flex items-center gap-3 px-3 h-10 rounded-[12px] text-[14px] font-medium transition-colors ${
              reportsActive
                ? 'bg-white text-ink shadow-sm border border-rule-soft'
                : 'text-ink-muted hover:text-ink hover:bg-white/60'
            }`}
            style={reportsActive ? { borderLeftColor: '#E9785E' } : undefined}
          >
            {reportsActive && (
              <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-coral" />
            )}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
            <span>Reports</span>
          </Link>
        </div>

        {/* Settings pinned to bottom */}
        <div className="mt-auto pt-4">
          <Link
            href="/settings"
            className={`relative flex items-center gap-3 px-3 h-10 rounded-[12px] text-[14px] font-medium transition-colors ${
              settingsActive
                ? 'bg-white text-ink shadow-sm border border-rule-soft'
                : 'text-ink-muted hover:text-ink hover:bg-white/60'
            }`}
            style={settingsActive ? { borderLeftColor: '#E9785E' } : undefined}
          >
            {settingsActive && (
              <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-coral" />
            )}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
              <circle cx="8" cy="6" r="2" fill="currentColor" stroke="none" />
              <circle cx="16" cy="12" r="2" fill="currentColor" stroke="none" />
              <circle cx="10" cy="18" r="2" fill="currentColor" stroke="none" />
            </svg>
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
