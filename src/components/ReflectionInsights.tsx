'use client';

import { useEffect, useState } from 'react';
import { Meta } from '@/components/Meta';
import { Body } from '@/components/Body';
import { loadEvents, STREAM_AR, type StreamKey } from '@/lib/events';
import { computeInsights, type ReflectionInsights as Insights } from '@/lib/insights';
import { FrameworkLabel } from '@/components/FrameworkLabel';

// What does each dominant stream tend to mean for the person living it?
const STREAM_REFLECTION: Record<StreamKey, string> = {
  thinking:
    'Your dominant stream is thinking — you seek meaning and question before you move. Where does your energy go toward feeling and willing?',
  feeling:
    'Your dominant stream is feeling — you live from the heart and read beneath the surface. How do you balance sensing with action that serves you?',
  willing:
    'Your dominant stream is willing — you move what\'s around you through sincere action. Where do you pause to hear your feeling and thinking?',
};

const STREAM_COLOR: Record<StreamKey, string> = {
  thinking: '#7E97B8',
  feeling: '#E9785E',
  willing: '#8FA084',
};

export function ReflectionInsights() {
  const [insights, setInsights] = useState<Insights | null>(null);

  useEffect(() => {
    setInsights(computeInsights(loadEvents()));
  }, []);

  if (!insights) return null;

  // Below the 7-event threshold the pattern isn't trustworthy yet — show a
  // gentle nudge instead of fabricating insight from noise.
  if (insights.totalEvents < 7) {
    const remaining = 7 - insights.totalEvents;
    return (
      <div className="rounded-[20px] bg-cream-soft p-5 border border-rule-soft">
        <Meta>Your Patterns</Meta>
        <div className="mt-2">
          <Body muted>
            {remaining === 0
              ? 'Your rhythm will appear here soon.'
              : `Log ${remaining} more ${remaining === 1 ? 'moment' : 'moments'} for your patterns to begin emerging.`}
          </Body>
        </div>
      </div>
    );
  }

  const stream = insights.dominantStream;
  const balance = insights.averageRhythm;
  const balanceLabel =
    balance === null
      ? null
      : balance < 45
      ? 'leaned toward expansion'
      : balance > 55
      ? 'leaned toward contraction'
      : 'stayed balanced';

  return (
    <div className="rounded-[20px] bg-cream-soft p-5 border border-rule-soft flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Meta>Your Patterns</Meta>
        <span className="text-[11px] text-ink-muted">{insights.totalEvents} moment</span>
      </div>
      {stream && (
        <div className="flex flex-col gap-2">
          <div className="text-[11px] font-semibold tracking-wider text-ink-muted">Dominant Stream</div>
          <div className="font-serif text-[15px] text-ink leading-[1.7]">
            {STREAM_REFLECTION[stream]}
          </div>
          <StreamBar dist={insights.streamDistribution} />
        </div>
      )}

      {balance !== null && balanceLabel && (
        <div className="flex flex-col gap-1.5">
          <div className="text-[11px] font-semibold tracking-wider text-ink-muted">Your Rhythm</div>
          <Body>
            Your days in this period{' '}
            <span className="text-ink font-medium">{balanceLabel}</span> — {insights.expansionPercent}% expansion, {insights.contractionPercent}% contraction.
          </Body>
        </div>
      )}

      {(insights.mostCommonHardSky || insights.mostCommonLightSky) && (
        <div className="flex flex-col gap-1.5">
          <div className="text-[11px] font-semibold tracking-wider text-ink-muted">The Sky When You Were</div>
          {insights.mostCommonHardSky && (
            <Body>
              In contraction: <span className="text-ink font-medium">{insights.mostCommonHardSky}</span>
            </Body>
          )}
          {insights.mostCommonLightSky && (
            <Body>
              In expansion: <span className="text-ink font-medium">{insights.mostCommonLightSky}</span>
            </Body>
          )}
        </div>
      )}
    </div>
  );
}

function StreamBar({ dist }: { dist: Record<StreamKey, number> }) {
  const total = dist.thinking + dist.feeling + dist.willing;
  if (total === 0) return null;
  const segs: Array<{ key: StreamKey; pct: number }> = [
    { key: 'thinking', pct: (dist.thinking / total) * 100 },
    { key: 'feeling', pct: (dist.feeling / total) * 100 },
    { key: 'willing', pct: (dist.willing / total) * 100 },
  ];
  return (
    <div className="flex flex-col gap-1.5 mt-1">
      <div className="flex h-2 rounded-full overflow-hidden bg-rule-soft">
        {segs.map(
          (s) =>
            s.pct > 0 && (
              <div key={s.key} style={{ width: `${s.pct}%`, background: STREAM_COLOR[s.key] }} />
            ),
        )}
      </div>
      <div className="flex justify-between text-[11px] text-ink-muted">
        {segs.map((s) => (
          <span key={s.key}>
            {STREAM_AR[s.key]} {Math.round(s.pct)}%
          </span>
        ))}
      </div>
    </div>
  );
}
