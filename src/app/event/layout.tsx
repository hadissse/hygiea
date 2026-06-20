import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Event details',
  description: 'Logged event details — discover the connection between your moments and planetary positions.',
};

export default function EventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col min-h-dvh bg-white">{children}</div>;
}
