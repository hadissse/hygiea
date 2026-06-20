import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Astrological Houses',
  description: 'Discover your twelve astrological houses — each one reveals a dimension of your life.',
};

export default function HouseLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col min-h-dvh bg-cream">{children}</div>;
}
