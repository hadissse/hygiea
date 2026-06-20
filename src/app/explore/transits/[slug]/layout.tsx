import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'عبور كوكبي',
  description: 'تفاصيل العبور الكوكبي — كيف يؤثر هذا العبور على خريطتك الفلكية مع سُكون.',
};

export default function TransitEssayLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col min-h-dvh bg-cream">{children}</div>;
}
