import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'اختبار فلكي',
  description: 'اختبر معرفتك بالفلك والأبراج مع سُكون — اكتشف كم تعرف عن خريطتك الفلكية.',
  alternates: { canonical: '/quiz' },
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col min-h-dvh bg-white">{children}</div>;
}
