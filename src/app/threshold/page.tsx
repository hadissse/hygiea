'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const THRESHOLD_KEY = 'hygiea.threshold.date';

function todayISO(): string {
  return new Date().toISOString().split('T')[0];
}

export default function ThresholdPage() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Mark threshold as crossed for today
    try {
      localStorage.setItem(THRESHOLD_KEY, todayISO());
    } catch {}

    // Trigger the fade-in after a single paint frame
    const t1 = setTimeout(() => setVisible(true), 50);

    // Navigate to /today after the animation completes (1.2 s + small buffer)
    const t2 = setTimeout(() => {
      router.replace('/today');
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [router]);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ background: 'var(--color-cream)' }}
    >
      {/* Outer halo */}
      <div
        className="absolute w-[280px] h-[280px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)',
          transition: 'opacity 1.2s ease-in-out',
          opacity: visible ? 1 : 0,
        }}
      />

      {/* Central phrase */}
      <div
        style={{
          transition: 'opacity 1.2s ease-in-out, transform 1.2s ease-in-out',
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(0.97)',
          textAlign: 'center',
          padding: '0 2rem',
        }}
      >
        <p
          className="font-serif text-[1.6rem] text-ink leading-[1.5]"
          style={{ letterSpacing: '0.01em' }}
        >
          You are here.
        </p>
        <p
          className="text-sm text-ink-muted mt-4"
          style={{
            transition: 'opacity 0.8s ease-in-out 0.6s',
            opacity: visible ? 0.7 : 0,
          }}
        >
          Take one breath.
        </p>
      </div>

      {/* Skip link — subtle, for return visits */}
      <button
        onClick={() => router.replace('/today')}
        className="absolute bottom-10 text-xs text-ink-muted/50 hover:text-ink-muted transition-colors"
        style={{
          transition: 'opacity 0.8s ease-in-out 1.2s',
          opacity: visible ? 1 : 0,
        }}
      >
        Enter
      </button>
    </div>
  );
}
