'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { Headline } from '@/components/Headline';
import { Body } from '@/components/Body';
import { Meta } from '@/components/Meta';
import type { AstralChart } from '@/lib/chartCalculator';
import { calculateTransits, orbLabel, type Transit } from '@/lib/transits';
import { SIGN_SLUGS, getPlacementContent } from '@/content/placements';

const ASPECT_FEEL: Record<string, string> = {
  Conjunction: 'They meet at one point, their energies intensify and ask for your attention.',
  Sextile: 'A facilitating angle that opens a gentle opportunity if you move toward it.',
  Square: 'Tension that calls for action, friction that pushes you to grow rather than stay still.',
  Trine: 'Harmony flowing easily, a good time to trust what you carry without judging it.',
  Opposition: 'Two poles face each other, inviting you to balance both sides within you.',
};

const TRANSIT_FLAVOR: Record<string, string> = {
  sun: 'A turn toward what you illuminate — an identity asked to be present.',
  mercury: 'Movement in mind and tongue — thoughts asking to be spoken or written.',
  venus: 'A touch of value and gentleness, inviting you to what is worth it.',
  mars: 'A spark in the will, a push toward action.',
  jupiter: 'Expansion and an invitation toward greater meaning — the door opens wide.',
  saturn: 'A test of what was built — the structure is asked if it is real.',
  uranus: 'A break seeking a new pattern, sudden movement that does not ask permission.',
  neptune: 'Dissolution of boundaries — clarity or fog, depending on what you choose.',
  pluto: 'Depth calling for radical transformation — what is revealed cannot be hidden.',
  chiron: 'A touch on the old wound — a place asking for tenderness and acknowledgment.',
};

const NATAL_POSSESSIVE: Record<string, string> = {
  sun: 'your Sun',
  moon: 'your Moon',
  mercury: 'your Mercury',
  venus: 'your Venus',
  mars: 'your Mars',
  jupiter: 'your Jupiter',
  saturn: 'your Saturn',
  uranus: 'your Uranus',
  neptune: 'your Neptune',
  pluto: 'your Pluto',
  northNode: 'your North Node',
  southNode: 'your South Node',
};

const VOTES = ['Warm', 'Calm', 'Moving', 'Still'];

export function TransitHeroCard() {
  const [chart, setChart] = useState<AstralChart | null>(null);
  const [transit, setTransit] = useState<Transit | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [vote, setVote] = useState<string | null>(null);
  const [showReading, setShowReading] = useState(false);

  const today = new Date().toISOString().slice(0, 10);
  const voteKey = `hygiea.vote.transit.${today}`;

  useEffect(() => {
    const stored = localStorage.getItem('hygiea.primary-chart.v1');
    if (stored) {
      try {
        const parsed: AstralChart = JSON.parse(stored);
        setChart(parsed);
        const transits = calculateTransits(parsed).filter((t) => t.transitKey !== 'moon');
        setTransit(transits[0] ?? null);
      } catch {}
    }
    setVote(localStorage.getItem(voteKey));
    setLoaded(true);
  }, [voteKey]);

  const castVote = (v: string) => {
    setVote(v);
    localStorage.setItem(voteKey, v);
  };

  if (loaded && !transit) {
    return (
      <Card>
        <div className="flex flex-col gap-2">
          <Meta>What touches you today</Meta>
          <Body muted>
            {chart
              ? 'No strong transit touching your chart today — a relatively quiet day.'
              : 'Load your chart to see what touches your inner sky today.'}
          </Body>
        </div>
      </Card>
    );
  }

  if (!transit || !chart) {
    return (
      <Card>
        <Meta>What touches you today</Meta>
      </Card>
    );
  }

  const natalPlanet = (chart as unknown as Record<string, AstralChart['sun']>)[transit.natalKey];
  const natalSlug = natalPlanet ? SIGN_SLUGS[natalPlanet.signNumber] : null;
  const natalVoice = natalSlug
    ? getPlacementContent('planet', `${transit.natalKey}:${natalSlug}`)
    : null;

  const possessive = NATAL_POSSESSIVE[transit.natalKey] ?? transit.natalName;
  const flavor = TRANSIT_FLAVOR[transit.transitKey] ?? 'An active transit touching your chart now.';
  const feel = ASPECT_FEEL[transit.aspectName] ?? '';

  return (
    <div className="relative rounded-[20px] overflow-hidden p-5 bg-white border border-rule-soft">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Meta>What touches you today</Meta>
          <span className="text-xs font-medium" style={{ color: transit.aspectColor }}>
            {transit.aspectSymbol} {orbLabel(transit.orb)}
          </span>
        </div>
        <Headline size="sm">
          {transit.transitName} {transit.aspectName} {possessive}
        </Headline>

        {!showReading ? (
          <button
            onClick={() => setShowReading(true)}
            className="text-xs text-coral font-medium mt-1 text-left"
          >
            Read the reading ←
          </button>
        ) : (
          <>
            <Body>{flavor}</Body>
            {natalVoice && (
              <div className="rounded-[14px] bg-cream-soft px-4 py-3 text-[14px] text-ink leading-[1.7] font-serif">
                {natalVoice.traditional}
              </div>
            )}
            {feel && <Body muted>{feel}</Body>}
          </>
        )}

        <div className="flex gap-2 mt-1">
          {VOTES.map((v) => (
            <button
              key={v}
              onClick={() => castVote(v)}
              className={`px-3 py-1.5 rounded-[14px] text-xs font-medium transition-colors ${
                vote === v ? 'bg-ink text-cream' : 'bg-cream-soft text-ink-muted hover:bg-sand'
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        <Link
          href={`/self/aspect/${transit.transitKey}-${transit.natalKey}`}
          className="text-xs text-coral font-medium mt-1"
        >
          Read more ←
        </Link>
      </div>
    </div>
  );
}
