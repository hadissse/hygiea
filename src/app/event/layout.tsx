import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'تفاصيل الحدث',
  description: 'تفاصيل الحدث المسجّل — اكتشف الارتباط بين لحظاتك ومواضع الكواكب مع سُكون.',
};

export default function EventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col min-h-dvh bg-white">{children}</div>;
}
