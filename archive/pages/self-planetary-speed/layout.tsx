import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'سرعة الكواكب',
  description: 'تتبّع سرعة حركة الكواكب — اكتشف الكواكب المتراجعة والمباشرة في خريطتك مع سُكون.',
};

export default function PlanetarySpeedLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col min-h-dvh bg-cream">{children}</div>;
}
