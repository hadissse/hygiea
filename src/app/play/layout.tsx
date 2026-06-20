import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'تعلّم تفاعلي',
  description: 'تعلّم الفلك بطريقة تفاعلية وممتعة — دروس عملية مع سُكون.',
};

export default function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col min-h-dvh bg-ink">{children}</div>;
}
