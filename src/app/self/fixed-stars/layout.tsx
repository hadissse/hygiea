import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'النجوم الثابتة',
  description: 'استكشف النجوم الثابتة في خريطتك الفلكية — تراث فلكي عربي أصيل مع سُكون.',
};

export default function FixedStarsLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col min-h-dvh bg-cream">{children}</div>;
}
