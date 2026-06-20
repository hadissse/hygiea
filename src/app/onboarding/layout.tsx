import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Begin your journey',
  description: 'Create your natal chart in 60 seconds — enter your birth date, time, and place.',
  openGraph: {
    title: 'Hygiea — Begin your journey',
    description: 'Create your natal chart in 60 seconds — enter your birth date, time, and place.',
  },
  alternates: { canonical: '/onboarding' },
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-dvh bg-cream">
      {children}
    </div>
  );
}
