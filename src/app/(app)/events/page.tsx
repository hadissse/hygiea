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
        <div className="px-5 py-16 text-center">
          <p className="text-4xl mb-4">◌</p>
          <p className="text-ink-muted font-prose">Nothing logged yet.</p>
          <p className="text-sm text-ink-muted font-ui mt-2">Tap + Log to record an event.</p>
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
    </main>
  );
}
