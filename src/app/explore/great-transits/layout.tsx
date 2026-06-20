import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'العبورات الكبرى',
  description: 'العبورات الكوكبية الكبرى في حياتك — عودة زحل وعودة المشتري ومحطات فلكية مهمة مع سُكون.',
};

export default function GreatTransitsLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col min-h-dvh bg-cream">{children}</div>;
}
