// Scr — House detail page (house [num])

import { HouseDetailClient } from './HouseDetailClient';

export default async function HousePage({ params }: { params: Promise<{ num: string }> }) {
  const { num } = await params;
  return <HouseDetailClient num={parseInt(num, 10)} />;
}
