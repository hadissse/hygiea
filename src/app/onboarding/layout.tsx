import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ابدأ رحلتك الفلكية',
  description: 'أنشئ خريطتك الفلكية في ٦٠ ثانية — أدخل تاريخ ووقت ومكان ولادتك واكتشف سُكونك.',
  openGraph: {
    title: 'سُكون — ابدأ رحلتك الفلكية',
    description: 'أنشئ خريطتك الفلكية في ٦٠ ثانية — أدخل تاريخ ووقت ومكان ولادتك واكتشف سُكونك.',
  },
  alternates: { canonical: '/onboarding' },
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-dvh bg-white">
      {children}
    </div>
  );
}
