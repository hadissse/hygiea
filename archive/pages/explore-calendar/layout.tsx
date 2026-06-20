import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'التقويم الفلكي',
  description: 'التقويم الفلكي اليومي — تتبّع حركة الكواكب والأحداث الفلكية القادمة مع سُكون.',
};

export default function CalendarLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col min-h-dvh bg-cream">{children}</div>;
}
