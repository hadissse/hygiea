import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Great Transits',
  description: 'The great planetary transits of your life — Saturn Return, Jupiter Return, and key celestial milestones.',
};

export default function GreatTransitsLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col min-h-dvh bg-cream">{children}</div>;
}
