import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fixed Stars',
  description: 'Explore fixed stars in your natal chart with Hygiea.',
};

export default function FixedStarsLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col min-h-dvh bg-cream">{children}</div>;
}
