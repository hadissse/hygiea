import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reflect',
  description: 'Evening reflection with Hygiea — connect with your inner self through questions inspired by your natal chart.',
};

export default function ReflectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col min-h-dvh bg-white">{children}</div>;
}
