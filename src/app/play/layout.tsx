import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interactive Learning',
  description: 'Learn astrology in an interactive and engaging way — practical lessons with Hygiea.',
};

export default function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col min-h-dvh bg-ink">{children}</div>;
}
