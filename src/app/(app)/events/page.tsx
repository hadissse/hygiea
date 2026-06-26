'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface LoggedEvent {
  id: string;
  text: string;
  date: string;
  sphere: string | null;
}

export default function EventsPage() {
  const [events, setEvents] = useState<LoggedEvent[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('hygiea.events');
      if (stored) setEvents(JSON.parse(stored));
    } catch {}
  }, []);

  return (
    <main className="min-h-dvh bg-cream pb-20">
      <div className="max-w-2xl mx-auto">
      <div className="px-5 pt-12 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-prose font-medium text-ink">Events</h1>
          <p className="text-sm text-ink-muted font-ui mt-1">Your biographical log</p>
        </div>
        <Link href="/log" className="bg-ink text-cream text-sm font-ui px-4 py-2 rounded-full">
          + Log
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="px-5 py-16 text-center flex flex-col items-center gap-4">
          <svg width="48" height="28" viewBox="0 0 48 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-30">
            <path d="M24 14C24 14 18 4 10 4C4.477 4 0 8.477 0 14C0 19.523 4.477 24 10 24C18 24 24 14 24 14ZM24 14C24 14 30 4 38 4C43.523 4 48 8.477 48 14C48 19.523 43.523 24 38 24C30 24 24 14 24 14Z" stroke="#5C5C7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div>
            <p className="text-ink-muted font-prose">No events yet.</p>
            <p className="text-sm text-ink-muted font-ui mt-1">Tap + to log your first moment.</p>
          </div>
        </div>
      ) : (
        <div className="px-5 space-y-3">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/event/${event.id}`}
              className="block bg-white rounded-[18px] p-5 border border-rule-soft"
            >
              <p className="text-xs text-ink-muted font-ui mb-1">
                {new Date(event.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
                {event.sphere && <span className="ml-2 text-gold">· {event.sphere}</span>}
              </p>
              <p className="font-prose text-ink line-clamp-2">{event.text}</p>
            </Link>
          ))}
        </div>
      )}
      </div>
    </main>
  );
}
