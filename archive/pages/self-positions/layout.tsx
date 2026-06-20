import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'مواضع الكواكب',
  description: 'مواضع كواكبك في خريطة ميلادك — الشمس والقمر وكل كوكب في برجه وبيته مع سُكون.',
};

export default function PositionsLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col min-h-dvh bg-cream">{children}</div>;
}
