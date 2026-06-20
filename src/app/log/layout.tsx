import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Log an event',
  description: 'Log meaningful moments and connect them to planetary positions.',
};

export default function LogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col min-h-dvh bg-white">{children}</div>;
}
