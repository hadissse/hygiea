import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'تأمل المساء',
  description: 'لحظة تأمل مسائية مع سُكون — تواصل مع إيقاعك الداخلي تحت سماء الليل.',
};

export default function EveningLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col min-h-dvh" style={{ background: '#0F1228' }}>{children}</div>;
}
