'use client';

import { useState } from 'react';
import type { AstralChart } from '@/lib/chartCalculator';

interface Props {
  chart: AstralChart;
}

const FOURFOLD = [
  {
    id: 'physical',
    label: 'Physical Body',
    de: 'Physischer Leib',
    description:
      'The mineral substrate — the most dense and ancient member of the human being, crystallised through evolution and shaped by the Saturn sphere on the soul\'s descent toward birth.',
    planet: 'Saturn',
    color: '#7A6C5D',
  },
  {
    id: 'etheric',
    label: 'Etheric Body',
    de: 'Ätherleib',
    description:
      'The living body that breathes with the seasons, carrying the rhythm of sleep and waking and holding the memory of every wound and recovery. It underlies the physical form and keeps it from dissolving back into mineral substance.',
    planet: 'Moon',
    color: '#5A8A7A',
  },
  {
    id: 'astral',
    label: 'Astral Body',
    de: 'Astralleib',
    description:
      'The soul-carrier of desires, drives, and feeling life — the seat of impulse that precedes reflection. Shared in structure with the animal kingdom, yet in the human being it carries additional dimensions awaiting development.',
    planet: 'Mars',
    color: '#A05A5A',
  },
  {
    id: 'ego',
    label: 'The I',
    de: 'Das Ich',
    description:
      'The bearer of self-consciousness — the member unique to the human being among earthly kingdoms. Through the I, the other three members are progressively transformed toward Spirit Self, Life Spirit, and Spirit Man.',
    planet: 'Sun',
    color: '#C9922A',
  },
];

export function FourfoldToggle({ chart }: Props) {
  const [active, setActive] = useState<string | null>(null);

  const activeMember = FOURFOLD.find(m => m.id === active);

  return (
    <div className="space-y-4 mt-4">
      <div className="grid grid-cols-2 gap-2">
        {FOURFOLD.map(member => (
          <button
            key={member.id}
            onClick={() => setActive(active === member.id ? null : member.id)}
            className={`text-left rounded-[14px] border p-4 transition-all ${
              active === member.id
                ? 'border-[#C9922A] bg-[#C9922A08]'
                : 'border-[#E5E1D8] bg-white hover:border-[#C5BDB0]'
            }`}
          >
            <p className="text-[13px] font-semibold text-ink font-ui">{member.label}</p>
            <p className="text-[11px] text-ink-muted font-ui mt-0.5">{member.de}</p>
            <p className="text-[11px] text-ink-muted font-ui mt-1">
              {member.planet} sphere
            </p>
          </button>
        ))}
      </div>

      {activeMember && (
        <div
          className="rounded-[14px] border border-[#E5E1D8] bg-[#FAF6EF] p-5 space-y-2 animate-fade-in"
        >
          <div className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: activeMember.color }}
            />
            <p className="text-[13px] font-semibold text-ink font-ui">{activeMember.label}</p>
            <span className="text-[11px] text-ink-muted font-ui">· {activeMember.planet}</span>
          </div>
          <p className="text-sm leading-relaxed text-ink font-ui">{activeMember.description}</p>
        </div>
      )}

      {chart && (
        <p className="text-[11px] text-ink-muted font-ui">
          Sun in {chart.sun.sign} · Moon in {chart.moon.sign}
        </p>
      )}
    </div>
  );
}
