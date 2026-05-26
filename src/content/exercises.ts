// NEVER_AI — All exercise content is human-authored. No AI generation permitted here.

export interface Exercise {
  id: 1 | 2 | 3 | 4 | 5 | 6;
  name: string;
  subtitle: string;
  guidance: string;
  practicePrompt: string;
  dayCompass: string;
  ahrimanicPitfall: string;
  lucifericPitfall: string;
  duration: string; // suggested daily time
}

export const EXERCISES: Exercise[] = [
  {
    id: 1,
    name: 'Control of Thought',
    subtitle: 'The mastery of mental life',
    guidance: `Each day, for five minutes, direct your thinking to an object you have chosen deliberately — something modest: a pencil, a button, a stone. Do not let your mind wander to what the object reminds you of, or to memories, plans, or associations. Hold the chosen object as the single content of your thought. When attention drifts, return without self-criticism.\n\nThis is not concentration in the ordinary sense. It is the practice of thinking from freedom rather than from habit. Most thinking happens to us; this exercise makes thinking an act. The soul learns to be the origin of its mental life, not merely its recipient.`,
    practicePrompt: 'Choose one small object. Hold it in thought alone for five minutes. Each time the mind moves away, return — once, quietly.',
    dayCompass: 'Today, let one thought be yours by choice, not by association.',
    ahrimanicPitfall: 'Forcing and gripping. The mind hardens into effort and the exercise becomes mechanical will rather than living attention.',
    lucifericPitfall: 'Drifting into pleasant associations with the chosen object — the exercise becomes a reverie, not a discipline.',
    duration: '5 minutes',
  },
  {
    id: 2,
    name: 'Control of Will',
    subtitle: 'The discipline of purposeful action',
    guidance: `Each day, perform one small action that you have decided upon — something that has no practical necessity, that exists only because you chose it. Arrange three objects on your desk in a particular order. Write one sentence in a notebook at a specific time. The action itself does not matter; what matters is that you have decided it and you carry it out.\n\nThis exercise addresses the will, which is the most sleeping part of the soul. We act constantly from habit, reflex, and necessity. The practice of an arbitrary act — useless by design — begins to wake the will from its mechanical slumber. Over weeks, the soul discovers it can originate action, not only react.`,
    practicePrompt: 'Choose one small, purposeless action. Do it today at a specific time. Decide first, then act.',
    dayCompass: 'Let one action today exist because you chose it, not because it was required.',
    ahrimanicPitfall: 'The exercise becomes compulsive routine. The act is performed mechanically, without the moment of free decision that gives it its quality.',
    lucifericPitfall: 'The action becomes grandiose or dramatic. The soul inflates the arbitrary act into a statement of identity rather than a quiet practice.',
    duration: '5–10 minutes',
  },
  {
    id: 3,
    name: 'Equanimity',
    subtitle: 'The cultivation of inner steadiness',
    guidance: `This exercise asks you to observe your inner life during moments of joy and moments of pain with the same quality of attention. Not suppression — the joy is still joy, the grief still grief. But beneath the movement, something in you can remain still.\n\nThroughout the day, notice when something pleases or displeases you. At that moment, do not immediately follow the wave. Pause. Let the feeling be what it is without amplifying or diminishing it. You are not becoming cold; you are becoming steady. The soul that is moved by everything, that rises and falls with every event, cannot yet carry itself. Equanimity is the ground from which genuine feeling can speak.`,
    practicePrompt: 'When something pleases or disturbs you today, pause before following the wave. Let it be what it is for one breath.',
    dayCompass: 'Let what moves you move you — and let something in you remain standing.',
    ahrimanicPitfall: 'Equanimity calcifies into detachment. The soul stops feeling and calls it stillness. This is not the exercise.',
    lucifericPitfall: 'The practice becomes performance — the soul watches itself being equanimous and loses the genuine feeling entirely.',
    duration: 'Throughout the day',
  },
  {
    id: 4,
    name: 'Positivity',
    subtitle: 'Finding the kernel of truth',
    guidance: `This exercise does not ask for optimism or for suppressing what is difficult. It asks for something more precise: when you encounter what appears ugly, false, or bad in the world, to look for the kernel within it — the living element that, however distorted, is trying to express something real.\n\nA difficult person carries an unmet longing. An ugly object was once a human intention. A wrong opinion contains a perception that has not yet found its form. The practice is not naive. It is phenomenological — it asks what is actually there, before judgment overlays it. Over time, the soul develops the capacity to perceive the positive without denying the negative. It sees both.`,
    practicePrompt: 'When something appears wrong, ugly, or difficult today, ask: what is trying to live inside this? Look for the kernel, not the surface.',
    dayCompass: 'What is actually there, before your judgment of it?',
    ahrimanicPitfall: 'Positivity becomes denial. The practitioner refuses to see what is genuinely harmful and calls it spiritual maturity. This is a corruption of the exercise.',
    lucifericPitfall: 'The search for the positive becomes sentimental inflation. Everything becomes beautiful and nothing can be honestly named as wrong.',
    duration: 'Throughout the day',
  },
  {
    id: 5,
    name: 'Open-Mindedness',
    subtitle: 'The discipline of beginners\'s mind',
    guidance: `Each encounter with a person, idea, or situation carries the risk of being met by what you already know. The fifth exercise asks you to meet each thing as if for the first time — not in ignorance of what you know, but setting it aside deliberately.\n\nThis does not mean abandoning discernment. It means giving what you meet the space to show itself before you categorise it. An old friend can surprise you. A familiar idea can reveal a new face. An experience you have had before can carry something you missed. The soul that meets the world only through its existing frameworks learns nothing new. Open-mindedness is the practice of genuine learning.`,
    practicePrompt: 'Today, choose one encounter — person, idea, or task — and meet it as if new. What does it show you that you have not seen before?',
    dayCompass: 'What would you notice if you had not already decided what to expect?',
    ahrimanicPitfall: 'The exercise hardens into scepticism. The soul uses "open-mindedness" as a reason to reject all existing knowledge and calls it freedom.',
    lucifericPitfall: 'The soul loses all discernment in its eagerness to remain open. Everything is accepted, nothing is tested.',
    duration: 'Throughout the day',
  },
  {
    id: 6,
    name: 'Harmony of the Six',
    subtitle: 'The synthesis and integration',
    guidance: `The sixth exercise does not introduce a new content. It asks you to hold all five in living relationship with each other — not as a list, not as a sequence, but as a wholeness.\n\nThought, will, equanimity, positivity, open-mindedness: these are not separate virtues to be acquired one after another. They are aspects of a single gesture — the gesture of a soul that has begun to take hold of itself. The sixth practice is awareness of this wholeness. In your daily review, ask: where did one of these live today? Where was another absent? Which pair came into tension? The answer is not a report card but a living observation.`,
    practicePrompt: 'In your evening review, ask: where did the six live today? Which was present, which was absent, which came into conflict with another?',
    dayCompass: 'What is the one gesture that all five exercises are trying to become?',
    ahrimanicPitfall: 'The synthesis becomes a performance review — a mechanical checking of boxes. The soul measures its spiritual progress and loses the living experience.',
    lucifericPitfall: 'The sense of wholeness becomes inflation. The practitioner believes they have achieved something when they have only glimpsed its direction.',
    duration: 'Evening reflection',
  },
];

export function getExerciseById(id: number): Exercise | undefined {
  return EXERCISES.find((e) => e.id === id);
}
