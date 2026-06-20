import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'سجّل لحظة',
  description: 'سجّل لحظات حياتك المهمة وربطها بمواضع الكواكب — تتبّع أحداثك مع سُكون.',
};

export default function LogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col min-h-dvh bg-white">{children}</div>;
}
