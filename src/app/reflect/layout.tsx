import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'تأمل',
  description: 'لحظة تأمل مع سُكون — تواصل مع ذاتك الداخلية من خلال أسئلة روحية مستوحاة من خريطتك الفلكية.',
};

export default function ReflectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col min-h-dvh bg-white">{children}</div>;
}
