// 8-phase lunar journey — one short prompt + practice per moon phase.
// Phase names match what cosmicStamp.ts returns from moonPhaseName().
// The cycle repeats every ~29 days, giving returning users fresh ground
// after they've completed the 7-step weekly journey.

export interface LunarPhase {
  key: string;
  name: string;             // phase name as returned by cosmicStamp
  arcTitle: string;         // descriptive title
  essence: string;          // 1-2 sentences on what this phase asks
  prompt: string;           // journaling question
  practice: string;         // small daily practice
  duration: string;         // approximate length in days
  accent: string;           // hex color
}

export const LUNAR_PHASES: LunarPhase[] = [
  {
    key: 'new',
    name: 'New Moon',
    arcTitle: 'The Silent Beginning',
    essence:
      'A quiet beginning. Something is being planted now before it can be seen — you don\'t need to know its shape yet, only to choose it.',
    prompt: 'What small seed are you choosing to plant in this cycle?',
    practice: 'Write one sentence beginning with "I intend…" — simple and honest.',
    duration: '~4 days',
    accent: '#171B3A',
  },
  {
    key: 'waxing-crescent',
    name: 'Waxing Crescent',
    arcTitle: 'Daily Tending',
    essence:
      'The seed needs daily tending. No leaps here — just a repeated, gentle touch at a quiet rhythm.',
    prompt: 'What small step are you giving these days to what you planted at the New Moon?',
    practice: 'Five minutes for your intention is enough. Consistency matters more than intensity.',
    duration: '~4 days',
    accent: '#5A3E7A',
  },
  {
    key: 'first-quarter',
    name: 'First Quarter',
    arcTitle: 'The First Decision',
    essence:
      'A first friction calls for a decision. What is trying to surface now needs clarity from you — not hesitation.',
    prompt: 'Where do you find resistance in what you\'re pursuing — and is that resistance in you or in the path?',
    practice: 'Say no to one thing today so you can say yes to what truly matters.',
    duration: '~3 days',
    accent: '#7E97B8',
  },
  {
    key: 'waxing-gibbous',
    name: 'Waxing Gibbous',
    arcTitle: 'Refining Before the Peak',
    essence:
      'What you planted is ripening but not yet complete. This is a time for refinement, not achievement.',
    prompt: 'What needs polishing before it reaches the Full Moon — in your work, your relationships, or yourself?',
    practice: 'Revisit what you began at the New Moon and recalibrate it with honesty, not perfectionism.',
    duration: '~4 days',
    accent: '#8FA084',
  },
  {
    key: 'full',
    name: 'Full Moon',
    arcTitle: 'The Illuminated Peak',
    essence:
      'Everything is visible now. What was hidden becomes lit; what was expansive reaches its height.',
    prompt: 'What is being illuminated in you these days — and do you welcome what appears, or fear it?',
    practice: 'Step outside into moonlight if you can. Write what you see, not what you want to see.',
    duration: '~3 days',
    accent: '#E9785E',
  },
  {
    key: 'waning-gibbous',
    name: 'Waning Gibbous',
    arcTitle: 'Giving and Gratitude',
    essence:
      'What was fulfilled at the Full Moon is now given away. This is a time for generosity and gratitude, not holding on.',
    prompt: 'What can you share or tell from what you\'ve learned in this cycle?',
    practice: 'Thank someone with genuine words — not automatic pleasantries.',
    duration: '~4 days',
    accent: '#D4A04C',
  },
  {
    key: 'last-quarter',
    name: 'Last Quarter',
    arcTitle: 'Release and Forgiveness',
    essence:
      'Time to empty what is no longer needed. Release is not loss — it is space cleared for what is coming.',
    prompt: 'What is expiring in you now — a habit, a relationship, a belief about yourself?',
    practice: 'Write then burn (or delete) — one sentence saying farewell to something.',
    duration: '~3 days',
    accent: '#BDAA82',
  },
  {
    key: 'waning-crescent',
    name: 'Waning Crescent',
    arcTitle: 'Rest and Listening',
    essence:
      'Land resting after the harvest. Nothing is asked of you now but to listen, and to wait for another new beginning.',
    prompt: 'Where do you need silence more than you need action?',
    practice: 'Take an hour without screens. Simply sit with your breath.',
    duration: '~4 days',
    accent: '#5C5C7A',
  },
];

// Map cosmicStamp's phase-name string to a LunarPhase entry.
export function findPhase(stampPhaseName: string): LunarPhase {
  return (
    LUNAR_PHASES.find((p) => stampPhaseName.startsWith(p.name)) ?? LUNAR_PHASES[0]
  );
}
