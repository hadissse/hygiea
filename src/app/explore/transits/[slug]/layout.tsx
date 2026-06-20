import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Planetary Transit',
  description: 'Planetary transit details — how this transit affects your natal chart.',
};

export default function TransitEssayLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col min-h-dvh bg-cream">{children}</div>;
}
