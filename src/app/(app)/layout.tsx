import type { Metadata } from 'next';
import { AppShell } from '@/components/AppShell';
import { ChartSync } from '@/components/ChartSync';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ChartSync />
      <AppShell>{children}</AppShell>
    </>
  );
}
