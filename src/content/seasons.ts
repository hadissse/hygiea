// NEVER_AI — All seasonal copy is human-authored.

import type { SeasonQuadrant } from '@/lib/cosmicYear';

export interface SeasonalSurface {
  morning: string;
  throughDay: string;
  evening: string;
  greeting: string;
}

export const SEASONAL_COPY: Record<SeasonQuadrant, SeasonalSurface> = {
  spring: {
    greeting: 'The world is opening.',
    morning:
      'This is the season of outbreathing. Something in the cosmos is reaching outward into form. This morning, let your attention do the same — move toward what you have been tending in thought, and see what it has become.',
    throughDay:
      'In spring, forces work from the periphery inward. Let the day meet you more than you reach for it. The exercise today is receiving as much as doing.',
    evening:
      'Before you walk the Rückschau backward, notice what entered you today from outside — from nature, from others, from the world. The soul in spring is porous. What came through?',
  },
  summer: {
    greeting: 'The light is at its fullness.',
    morning:
      'This is the season of St John\'s. The cosmos speaks with maximum clarity. The challenge is not to receive more but to hold what you have. This morning, ask: what in me has ripened enough to be given?',
    throughDay:
      'Summer is the outbreath at its peak. The danger is dispersion. Let the exercise today be a gathering — one task, one attention, one gesture completed fully before another begins.',
    evening:
      'In the bright season, the inner life grows quiet so the outer world can be heard. Walk the Rückschau backward and ask: what spoke to me today through the world? What did I hear that I was not expecting?',
  },
  autumn: {
    greeting: 'The inbreath begins.',
    morning:
      'Michaelmas stands at the threshold of this season. The soul is called inward — not away from the world, but deeper into its own ground. This morning, bring the quality of iron to your thought: precise, clear, willing.',
    throughDay:
      'In autumn, what has been scattered by summer must be gathered. Let the exercise today be one of discrimination — what in you is genuinely yours, and what is noise that entered during the bright months?',
    evening:
      'The Rückschau in autumn has a particular quality: the backward walk is also a purification. What from the day can you set down cleanly? What needs to be carried forward, and what does not?',
  },
  winter: {
    greeting: 'The spirit gathers in the quiet.',
    morning:
      'In the Holy Nights, something seeds itself in the depths that will bloom only in the spring to come. This morning, tend the quietest thought — the one that has been growing in the dark. Do not hurry it into form yet.',
    throughDay:
      'Winter is the inbreath at its deepest. Let today\'s exercise live in the interior — not as withdrawal from the world, but as the practice of building inner substance. What you deepen now will bear fruit when the world breathes outward again.',
    evening:
      'The winter Rückschau is an act of quiet accounting. Walk backward through what was, and ask of each moment: what did I bring from myself? Not what happened, but what I carried into it.',
  },
};

export function getSeasonalCopy(quadrant: SeasonQuadrant): SeasonalSurface {
  return SEASONAL_COPY[quadrant];
}
