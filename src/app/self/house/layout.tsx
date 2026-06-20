import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'البيوت الفلكية',
  description: 'اكتشف بيوتك الفلكية الاثني عشر — كل بيت يكشف جانبًا من حياتك مع سُكون.',
};

export default function HouseLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col min-h-dvh bg-cream">{children}</div>;
}
