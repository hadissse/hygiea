import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'عجلة الخريطة',
  description: 'عجلة خريطتك الفلكية الكاملة — استكشف بيوتك وكواكبك وجوانبك بصريًا مع سُكون.',
};

export default function WheelLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col min-h-dvh" style={{ background: '#0F1228' }}>{children}</div>;
}
