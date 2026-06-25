// Explore-depth content (Scr85-91) — chip-filtered session catalogue.

export const EXPLORE_CHIPS = [
  'Featured',
  'Stress',
  'Sleep',
  'Focus',
  'Anxiety',
  'Self-Compassion',
  'Work',
  'Relationships',
  'For Kids',
];

// card tuple: [title, subtitle, variant]
export const EXPLORE_CARDS: Record<string, [string, string, string][]> = {
  Featured: [
    ['The Quiet Path', 'Course · 10 Days', 'dawn'],
    ['Gentle Anchors', 'Course · 5 Days', 'sage'],
    ['Box Breath', 'Single · 5 min', 'lake'],
    ['One Minute', 'Quick · 1 min', 'dust'],
    ['Letting Go Gently', 'Series · 7 Days', 'dusk'],
    ['On Gratitude', 'Series · 5 Days', 'ember'],
  ],
  Stress: [
    ['Resetting a Tense Day', '5 min', 'dawn'],
    ['Relax Your Jaw', '7 min', 'sage'],
    ['Between Meetings', '3 min', 'dust'],
    ['Breathe Through It', '10 min', 'ember'],
    ['Scan for a Tense Body', '12 min', 'dusk'],
    ['Calmer Mornings', 'Course', 'lake'],
  ],
  Sleep: [
    ['The Slow Lighthouse', 'Story · 45 min', 'night'],
    ['Soft Rain', 'Soundscape', 'lake'],
    ['Wind Down Before Sleep', 'Series · 7 Days', 'dusk'],
    ['Sleep Without Failing', '3 min', 'night'],
    ['Distant Thunder', 'Soundscape', 'lake'],
    ['From Body to Bed', 'Single · 10 min', 'dusk'],
  ],
  Focus: [
    ['Returning to Focus', '5 min', 'dust'],
    ['Pomodoro Pause', '2 min', 'dawn'],
    ['One Task', '10 min', 'sage'],
    ['Inbox Before the Session', '7 min', 'lake'],
    ['Easing Distraction', '12 min', 'dusk'],
    ['Priming for Deep Work', '15 min', 'ember'],
  ],
  Anxiety: [
    ['Naming What\'s Happening', '7 min', 'dusk'],
    ['Box Breath', '5 min', 'lake'],
    ['Breaking the Spiral', '3 min', 'dawn'],
    ['Hand on Heart', '5 min', 'sage'],
    ['Three Things You See', '2 min', 'dust'],
    ['Stay Just a Moment', '10 min', 'ember'],
  ],
  'Self-Compassion': [
    ['Speak to Yourself Gently', '8 min', 'dawn'],
    ['When You Fail', '10 min', 'sage'],
    ['The Kind Critic', '7 min', 'dust'],
    ['The Body, Gently', '12 min', 'lake'],
    ['On Rest', '5 min', 'ember'],
    ['Begin Again', '3 min', 'dusk'],
  ],
};

// fallback for chips without bespoke cards
export const EXPLORE_DEFAULT = EXPLORE_CARDS['Featured'];

// Topic detail (Scr91)
export const STRESS_DETAIL: [string, string][] = [
  ['Relax Your Jaw', '7 min'],
  ['Between Meetings', '3 min'],
  ['Calmer Mornings', '10 min'],
  ['Breathe Through It', '12 min'],
];
