import type { Metadata } from 'next';
import { TabBar } from '@/components/TabBar';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { ChartSync } from '@/components/ChartSync';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row min-h-dvh">
      <ChartSync />
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <div className="md:hidden"><Header /></div>
        <div className="hidden md:flex items-center h-12 px-6 border-b border-rule-soft/50 bg-cream/80 backdrop-blur-lg sticky top-0 z-30">
          <span className="text-sm font-medium text-ink-muted">Hygiea</span>
        </div>
        <main className="flex-1 pb-20 md:pb-0 w-full max-w-[430px] mx-auto md:max-w-full md:mx-0">
          {children}
        </main>
      </div>
      <div className="md:hidden"><TabBar /></div>
    </div>
  );
}
