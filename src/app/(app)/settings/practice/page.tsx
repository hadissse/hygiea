'use client';

import Link from 'next/link';
import { SettingsSubHeader } from '@/components/SettingsSubHeader';
import { Card } from '@/components/Card';
import { Body } from '@/components/Body';

const CONSULTATION_URL = process.env.NEXT_PUBLIC_CONSULTATION_URL ?? '';

export default function PracticePage() {
  return (
    <div className="py-4 md:max-w-lg md:mx-auto">
      <SettingsSubHeader title="Practice Settings" />
      <div className="px-5 flex flex-col gap-4">
        <Card>
          <div className="flex flex-col gap-3">
            <div className="font-serif text-lg text-ink">Session with a Guide</div>
            <Body muted>A quiet conversation about your chart with one of our guides.</Body>
            {CONSULTATION_URL ? (
              <Link
                href={CONSULTATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start px-4 py-2 rounded-[14px] bg-ink text-cream text-sm font-medium"
              >
                Book a Session
              </Link>
            ) : (
              <span className="text-sm text-ink-muted">Bookings opening soon.</span>
            )}
          </div>
        </Card>
        <Card>
          <div className="flex flex-col gap-2">
            <div className="font-serif text-lg text-ink">Your Daily Practice</div>
            <Body muted>
              Track your sessions and reflections. Your practice log will appear here over time.
            </Body>
          </div>
        </Card>
      </div>
    </div>
  );
}
