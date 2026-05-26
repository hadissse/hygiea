// NEVER_AI — All Goethean observation content is human-authored. No AI generation permitted here.
// Sources: Rudolf Steiner, "Goethean Science" (GA 1, 1883); "Goethe's Theory of Knowledge" (GA 2, 1886);
//          Margaret Colquhoun & Axel Ewald, "New Eyes for Plants" (Hawthorn Press);
//          Craig Holdrege, "Doing Goethean Science" (The Nature Institute, natureinstitute.org);
//          Daniel Christian Wahl, "'Zarte Empirie'" (Janus Head, 2005).
// The four stages follow the Bortoft/Colquhoun formulation as aligned with Steiner's interpretation.

// ─────────────────────────────────────────
// PART A: THE FOUR STAGES
// ─────────────────────────────────────────

export interface GoetheanStage {
  number: 1 | 2 | 3 | 4;
  germanName: string;
  englishName: string;
  alternativeName: string;
  cognitiveCapacity: 'Perception' | 'Imagination' | 'Inspiration' | 'Intuition';
  description: string;
  practitionerInstruction: string;
  commonObstacle: string;
}

export const GOETHEAN_STAGES: GoetheanStage[] = [
  {
    number: 1,
    germanName: 'Genaue sinnliche Wahrnehmung',
    englishName: 'Exact Sense Perception',
    alternativeName: 'Pure observation — the bare facts',
    cognitiveCapacity: 'Perception',
    description:
      'The observer attends to all available sensory qualities of the phenomenon: size, colour, texture, proportion, scent, temperature, sound, movement, and context — without rushing toward explanation or classification. Drawing is encouraged, as it forces sustained attention. The aim is to gather a genuinely rich sensory portrait, suspending the habitual leap toward "what this is for" or "what it reminds me of."',
    practitionerInstruction:
      'Spend sustained time with your chosen phenomenon. Use all available senses. Describe only what is actually present to perception — not what you know, expect, or remember. If a word of interpretation arises ("this is X because..."), set it aside and return to the raw sensory surface. Note contrasts, boundaries, gradients, and textures.',
    commonObstacle:
      'Naming too quickly. The moment we label something ("this is a granite rock"), the senses stop working and conceptual habit fills the space. Return to sensation before the label.',
  },
  {
    number: 2,
    germanName: 'Genaue sinnliche Phantasie',
    englishName: 'Exact Sensorial Imagination',
    alternativeName: 'Imaginative reconstruction — the living process',
    cognitiveCapacity: 'Imagination',
    description:
      'Having gathered rich perceptual material, the observer closes their eyes (or shifts inward) and attempts to reconstruct the phenomenon inwardly with as much precision as possible. The key word is "exact": the imagination must be constrained by what was actually observed. One then allows the inner picture to move — watching the plant grow to its next stage, the mineral cleave along its fault lines, the animal shift posture. The imagination is freed only within the limits of what the phenomenon itself makes possible.',
    practitionerInstruction:
      'Close your eyes and rebuild what you observed, feature by feature. Do not invent; reconstruct. Then allow one movement: let it grow, shift, or extend — but only as it could actually do so. You are looking for the "gesture" of the being — its characteristic way of moving through time.',
    commonObstacle:
      'Either too much freedom (the imagination wanders into fantasy unanchored to the observed) or too much constraint (the inner image is frozen rather than alive). Exact sensorial imagination is the disciplined middle path.',
  },
  {
    number: 3,
    germanName: 'Anschauende Urteilskraft',
    englishName: 'Seeing in Beholding',
    alternativeName: 'Receptive attentiveness — the character reveals itself',
    cognitiveCapacity: 'Inspiration',
    description:
      'At this stage, active perception is stilled. The observer does not look at the phenomenon; the phenomenon is allowed to express itself through the observer. Something of the essential character of the being — what practitioners sometimes call its "gesture" or "spirit of place" — reveals itself in a moment of sudden understanding. This is often accompanied by an emotional quality and is best expressed in poetic, imagistic, or artistic language rather than analytical prose.',
    practitionerInstruction:
      'After sustained observation and imaginative reconstruction, allow yourself to become receptive. Do not seek an insight — wait for one to arrive. If nothing comes, return to stage 1. When something does arrive, express it in an image, a metaphor, or a brief poem rather than a conclusion. Multiple observers reaching independent consensus about the character they perceived is a mark of genuine beholding rather than projection.',
    commonObstacle:
      'Projection: mistaking one\'s own emotional associations for the being\'s self-expression. The test is whether the insight surprises you — whether it reveals something the phenomenon was always showing but you had not yet seen.',
  },
  {
    number: 4,
    germanName: 'Sein in der Einheit',
    englishName: 'Being One With',
    alternativeName: 'Intuitive unity — the outer and inner fuse',
    cognitiveCapacity: 'Intuition',
    description:
      'The culminating stage is not something willed or achieved by technique. It is the moment in which the boundary between observer and observed momentarily dissolves: "the outer world and the inner fuse." The phenomenon takes the active role; the observer encounters it with a fully open and empty attention. From this state of oneness, knowledge arises of how to relate to the phenomenon rightly — not only intellectually but morally and practically.',
    practitionerInstruction:
      'This stage cannot be forced. The preparation is stages 1–3, practised with patience and honesty. What can be cultivated is the willingness to be changed by what you observe — to enter the encounter without a predetermined conclusion. If you find yourself forming a thesis, return to exact sense perception. The unity is a gift of sustained attention, not an achievement of will.',
    commonObstacle:
      'Confusing intellectual comprehension ("I now understand this organism") with actual beholding. Intuitive unity leaves no distance between knower and known; understanding leaves them separate. The former transforms; the latter merely informs.',
  },
];

// ─────────────────────────────────────────
// PART B: THE 48 OBSERVATION PROMPTS
// ─────────────────────────────────────────

export type GoetheanKingdom = 'mineral' | 'plant' | 'animal' | 'human';

export type MonthName =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export interface GoetheanPrompt {
  kingdom: GoetheanKingdom;
  month: MonthName;
  /**
   * The prompt directs pure sensory attention only — no interpretation, metaphor, or
   * inner meaning is invited. The observer is asked only to witness a specific quality
   * of the phenomenon as it presents itself to the senses.
   */
  prompt: string;
}

export const GOETHEAN_PROMPTS: GoetheanPrompt[] = [
  // ═══════════════════════════════════════
  // MINERAL — 12 months
  // ═══════════════════════════════════════
  {
    kingdom: 'mineral',
    month: 'January',
    prompt:
      'Find a stone outdoors in winter. Place it in your bare hand. Attend only to the rate at which it draws warmth from your skin. Notice at what point the sensation changes from "cold touching warm" to simply temperature. Do not name the stone or describe its origin. Only the meeting of temperatures.',
  },
  {
    kingdom: 'mineral',
    month: 'February',
    prompt:
      'Look at a rock face, cliff, or paving stone in flat winter light. Attend to the surface texture as seen, not as imagined from touch. Notice where the light is received and where it is stopped. Count the visible gradations of tone between the lightest and darkest patch without naming the stone type.',
  },
  {
    kingdom: 'mineral',
    month: 'March',
    prompt:
      'Find a piece of quartz, flint, or any crystalline stone. Observe where its surfaces are flat and where curved. Notice where light enters and does not return. Attend to the edges — whether they are sharp, chipped, or worn. Do not think about how they formed; only see them as they are now.',
  },
  {
    kingdom: 'mineral',
    month: 'April',
    prompt:
      'Observe a wet stone immediately after rain. Attend to the changes in colour from its dry state if you can recall it, or simply to how the colour is distributed when wet. Notice which areas absorb the water and which repel it. Attend only to surface behaviour, not to geological cause.',
  },
  {
    kingdom: 'mineral',
    month: 'May',
    prompt:
      'Find a stone with visible layering, striping, or banding. Trace one band with your eye from one edge to the other without losing it. Notice where it disappears, thins, widens, or changes tone. Follow it as you would follow a line in a drawing. Attend only to its path, not its meaning.',
  },
  {
    kingdom: 'mineral',
    month: 'June',
    prompt:
      'Place a stone in direct summer sunlight for ten minutes. Hold it in the shade immediately after. Attend to how the warmth distributes through its volume — which surfaces are hottest, where the coolness remains longest. Notice how long the gradient takes to equalise. Only the temperature, in time.',
  },
  {
    kingdom: 'mineral',
    month: 'July',
    prompt:
      'Find a stone or mineral with visible colour. Look at it in three different light conditions: full sun, open shade, and indoor light. Attend to how the colour changes — whether it deepens, flattens, or acquires new tones. Name no geological explanation; only attend to the colour itself in each condition.',
  },
  {
    kingdom: 'mineral',
    month: 'August',
    prompt:
      'Find a stone with an irregular surface. Close your eyes and run one fingertip slowly across it. Attend to the sequence of sensations: the rises and falls, the grit, the smooth patches. Then open your eyes. Notice whether what you see matches what you felt. Attend only to the comparison, not to a conclusion.',
  },
  {
    kingdom: 'mineral',
    month: 'September',
    prompt:
      'Observe a stone or gravel path at the point where it meets grass or soil. Attend to the exact boundary: where does the mineral end? Where does the earth begin? Notice whether the line is sharp or gradual, whether there is a zone of mixing. Only the boundary — do not follow either side away from it.',
  },
  {
    kingdom: 'mineral',
    month: 'October',
    prompt:
      'Find a stone in a stream or near water. Observe how the water moves around it: where it accelerates, where it eddies, where a shadow of still water forms on the downstream side. Attend only to the pattern of water movement — not to the stone\'s shape as such, but to the shape the stone makes in the water.',
  },
  {
    kingdom: 'mineral',
    month: 'November',
    prompt:
      'Observe a stone or rocky surface in dim autumn light or overcast sky. Attend to what the subdued light reveals that bright light conceals: surface patterning, slight colour variation, fine texture. Notice how long it takes your eye to adjust and begin seeing more. Attend only to the emergence of visible detail over time.',
  },
  {
    kingdom: 'mineral',
    month: 'December',
    prompt:
      'Find a stone with frost or ice on it, or observe the pattern of freezing on any mineral surface. Attend to where the frost accumulates first and where it avoids — the edges, the pits, the flat faces. Notice whether the frost follows the stone\'s own surface geometry. Attend only to the distribution of ice on the surface.',
  },

  // ═══════════════════════════════════════
  // PLANT — 12 months
  // ═══════════════════════════════════════
  {
    kingdom: 'plant',
    month: 'January',
    prompt:
      'Find a deciduous tree or shrub in its leafless winter state. Attend to the silhouette of the branching against the sky. Notice which branches thicken toward the trunk and which thin toward the periphery. Count no branches; measure nothing. Attend only to the direction and quality of the branching gesture as a whole.',
  },
  {
    kingdom: 'plant',
    month: 'February',
    prompt:
      'Find a plant bud that has not yet opened. Attend to its shape, the arrangement of its scales or coverings, its colour, and its texture. Notice where it sits on the stem — in relation to the axis, the angle it makes. Attend only to its form as it is now, sealed. Do not anticipate what it will become.',
  },
  {
    kingdom: 'plant',
    month: 'March',
    prompt:
      'Find a plant that is beginning to show early growth — a new shoot, a cracking bud, a first unfurling leaf. Attend to the direction of movement: is the growth upward, outward, spiralling? Notice what colour the new growth is before it becomes fully green. Attend only to the direction and colour of emergence.',
  },
  {
    kingdom: 'plant',
    month: 'April',
    prompt:
      'Find a leaf that has recently unfolded. Attend to its surface texture: the slight roughness, the venation pattern, the way the blade meets the light. Notice whether the edges are smooth, serrated, or lobed. Run a fingertip along the midrib from base to tip. Attend only to what the finger finds, not what the eye anticipates.',
  },
  {
    kingdom: 'plant',
    month: 'May',
    prompt:
      'Find a flowering plant. Before looking at the flower, attend to the way the stem holds it: the angle, the stiffness or flexibility, whether it faces upward, outward, or downward. Then attend to the transition from stem to flower — where does one end and the other begin? Attend only to the structural transition.',
  },
  {
    kingdom: 'plant',
    month: 'June',
    prompt:
      'Find a plant in full leaf at the height of summer. Attend to the difference between the upper and lower surfaces of one leaf: the colour difference, the texture difference, and the way each surface handles light. Notice whether the underside has visible veins, hairs, or a bloom. Attend only to the comparison between the two surfaces.',
  },
  {
    kingdom: 'plant',
    month: 'July',
    prompt:
      'On a warm day, find a plant in direct sunlight. Attend to any movement — the slight trembling of leaves in a breeze, or the stillness in airless heat. Notice which parts move most easily and which remain still. If you can smell the plant\'s foliage, note whether the scent changes in the heat. Attend only to movement and temperature; not to beauty.',
  },
  {
    kingdom: 'plant',
    month: 'August',
    prompt:
      'Find a plant that is forming seeds or fruit. Attend to how the seed or fruit attaches to the plant — the stalk, the receptacle, the point of connection. Notice the weight it carries relative to the stem\'s thickness. Attend to any colour change from the unripe to the ripening stage if visible. Only the geometry of attachment and the gradient of colour.',
  },
  {
    kingdom: 'plant',
    month: 'September',
    prompt:
      'Find a leaf that is beginning to change colour in autumn. Attend to the exact distribution of colour change: where it starts (tip, edge, base, between veins?), how far it has progressed, and whether any green remains. Do not name the tree. Attend only to the map of colour change on the surface of one leaf.',
  },
  {
    kingdom: 'plant',
    month: 'October',
    prompt:
      'Find a fallen leaf on the ground. Attend to its texture after it has been separated from the tree: is it crisp or soft, curled or flat, damp or dry? Notice whether its colour has continued to change since falling. Attend to where it is thinnest and most fragile. Only the quality of the detached leaf as it now is.',
  },
  {
    kingdom: 'plant',
    month: 'November',
    prompt:
      'Find a plant in late autumn that is dying back to the ground or to its woody framework. Attend to the colour and texture of the dying stems: the range of browns, the brittleness or pliability, the way stems that were once separate now appear as a mass. Attend only to the qualities of the dying back — not to the plant you remember from summer.',
  },
  {
    kingdom: 'plant',
    month: 'December',
    prompt:
      'Find an evergreen plant — a tree, shrub, or small groundcover — and compare one part of it that is sheltered from winter to one part exposed. Attend to any visible differences: in leaf surface, in colour, in posture of the branches. Notice whether the exposed part is darker, shinier, more compressed. Attend only to the comparison between sheltered and exposed.',
  },

  // ═══════════════════════════════════════
  // ANIMAL — 12 months
  // ═══════════════════════════════════════
  {
    kingdom: 'animal',
    month: 'January',
    prompt:
      'Observe a bird at rest — perched, not in flight. Attend to the posture: the angle of the body, where the head rests in relation to the shoulders, how the feet grip the perch. Notice whether the bird is puffed or sleek. Do not identify the species; attend only to the posture as a bodily fact.',
  },
  {
    kingdom: 'animal',
    month: 'February',
    prompt:
      'If you can observe any animal in winter — a squirrel, a crow, a garden spider, a domestic animal — attend to its relationship to the cold. How does it position its body? Does it orient toward or away from warmth sources? Attend only to the animal\'s spatial behaviour, not to its presumed inner state.',
  },
  {
    kingdom: 'animal',
    month: 'March',
    prompt:
      'Observe a bird in flight — even for a few seconds. Attend to the shape of the wing during a downstroke versus an upstroke. Notice whether the flight is straight or undulating, flapping or gliding. Attend only to the geometry of the movement in space, not to where the bird is going.',
  },
  {
    kingdom: 'animal',
    month: 'April',
    prompt:
      'Observe an insect — a bee, a beetle, a fly — on a surface. Attend to how it moves its legs: the sequence of steps, the way it turns, the way it stops. Notice whether the body tilts during movement. Attend only to the mechanics of movement visible to the eye — not to purpose or behaviour as a whole.',
  },
  {
    kingdom: 'animal',
    month: 'May',
    prompt:
      'Find a spider or an ant and observe it for three minutes. Attend to the quality of its attention: does it pause, scan, accelerate, hesitate? Notice the direction of the head relative to the body\'s direction of travel. Attend only to the pattern of motion and pause — not to what it is "doing."',
  },
  {
    kingdom: 'animal',
    month: 'June',
    prompt:
      'Observe a domesticated or familiar animal — a cat, dog, or horse — at rest. Attend to its breathing: the rate, the depth visible in the flank, whether it is even or irregular. Notice which part of the body moves most in breathing. Attend only to the breathing as a visible phenomenon — not to the animal\'s mood.',
  },
  {
    kingdom: 'animal',
    month: 'July',
    prompt:
      'Observe any animal drinking water. Attend to the exact movement of the head and neck: the angle of approach, the rhythm of drinking, the way the body adjusts. Notice when the animal pauses and what it does with its head before resuming. Attend only to the sequence of physical movements.',
  },
  {
    kingdom: 'animal',
    month: 'August',
    prompt:
      'Observe a bird or animal in the heat. Attend to how it manages temperature with its body: an open beak, spread wings, a shaded posture, pressed-down feathers. Notice which surfaces are presented to the air and which are folded away. Attend only to the body\'s response to heat — not to the species or its habits.',
  },
  {
    kingdom: 'animal',
    month: 'September',
    prompt:
      'Observe any animal eating. Attend to the pace: is the eating continuous or interrupted? Does the animal check its surroundings while eating? Notice how the food is taken — seized, nibbled, lapped, or torn. Attend only to the rhythm and method of taking food, not to what is being eaten.',
  },
  {
    kingdom: 'animal',
    month: 'October',
    prompt:
      'Observe a bird or small mammal making a sound — a call, a song, a chirp. Attend to what the body does during the sound: does the throat move, do the wings shift, does the posture change? Notice how long after the sound the animal returns to stillness. Attend only to the body during and after the sound.',
  },
  {
    kingdom: 'animal',
    month: 'November',
    prompt:
      'Observe any two animals of the same species near each other. Attend to the space between them: does it stay constant, narrow, widen? Notice which one moves first when the distance changes, and which maintains position. Attend only to the spatial distance as a living fact that changes over time.',
  },
  {
    kingdom: 'animal',
    month: 'December',
    prompt:
      'Observe a sleeping or very still animal. Attend to the smallest visible movements: the subtle rise and fall of the flank, the occasional flicker of an ear, the micro-adjustment of a paw. Notice how long the stillness lasts before the next small movement. Attend only to the threshold between stillness and motion.',
  },

  // ═══════════════════════════════════════
  // HUMAN — 12 months
  // ═══════════════════════════════════════
  {
    kingdom: 'human',
    month: 'January',
    prompt:
      'In a public space where people sit — a waiting room, a café, a transport vehicle — observe one person at rest. Attend only to the posture: the angle of the back, how the head is carried, where the hands are placed, whether the feet are together or apart. Attend for two minutes without forming any opinion of the person.',
  },
  {
    kingdom: 'human',
    month: 'February',
    prompt:
      'Observe a person speaking — in person or in a recording without sound. Attend only to the rhythm of gesture: when do the hands move, when do they stop? Does the gesture lead the speech, accompany it, or arrive after? Attend only to the timing and shape of visible gesture, not to what is being communicated.',
  },
  {
    kingdom: 'human',
    month: 'March',
    prompt:
      'Observe someone walking — on a street, in a corridor, across a room. Attend only to their gait: the pace, the length of stride, whether the arms swing, whether the upper body moves or is held still. Notice whether the walk accelerates or decelerates. Attend only to the quality of the gait, not to where they are going.',
  },
  {
    kingdom: 'human',
    month: 'April',
    prompt:
      'Observe someone performing a task with their hands — cooking, writing, repairing, drawing. Attend only to the movements of the hands: their speed, their precision, the way they orient to the object being worked on. Notice what the fingers do when the hands pause. Attend only to hand movement.',
  },
  {
    kingdom: 'human',
    month: 'May',
    prompt:
      'Attend to your own breathing for three minutes without altering it. Notice only: the rate, the depth, the sound (if any), and which part of the torso moves most — the chest, the belly, or the collarbone region. Attend only to what breathing actually does in your body right now, not what it should do.',
  },
  {
    kingdom: 'human',
    month: 'June',
    prompt:
      'Observe a group of people — at a meal, a meeting, or any shared activity. Attend only to the pattern of who looks at whom and when: whose gaze is most often sought, whose is most often avoided, and what happens in the seconds when two gazes meet. Attend only to the visual pattern, not to the social dynamic you believe it reflects.',
  },
  {
    kingdom: 'human',
    month: 'July',
    prompt:
      'Observe someone in a moment of transition — standing up from a chair, entering a room, finishing a phone call. Attend only to what happens in the body in the two seconds before and the two seconds after the transition. Notice the preparatory movement before and the settling movement after. Attend only to the transitions, not to the states before and after.',
  },
  {
    kingdom: 'human',
    month: 'August',
    prompt:
      'Attend to the quality of your own voice today — not what you say, but how it sounds in different contexts: alone, in conversation, on a phone call. Notice when it rises, when it softens, when it tightens. Attend only to the acoustic quality of the voice as a physical phenomenon, not to the emotions you associate with it.',
  },
  {
    kingdom: 'human',
    month: 'September',
    prompt:
      'Observe someone listening — fully attending to someone else speaking. Attend only to what their body does during listening: the stillness or movement, the direction and quality of the gaze, the rate of blinking, any slight head nods or tilts. Attend only to the listening as a visible bodily state.',
  },
  {
    kingdom: 'human',
    month: 'October',
    prompt:
      'Attend to your own face at rest, if possible via a neutral mirror observation, or attend to the resting face of another. Notice the default position of the mouth — whether it tends open or closed, turned up or down, pressed or relaxed. Notice the brow. Attend only to the face at rest, not to what expression you read into it.',
  },
  {
    kingdom: 'human',
    month: 'November',
    prompt:
      'Observe someone working alone — reading, writing, or engaged in any solitary task. Attend only to the rhythm of their engagement: the periods of absorbed action and the moments of pause when they look up or stop. Notice the length of the absorption cycles. Attend only to the rhythm of engagement and pause.',
  },
  {
    kingdom: 'human',
    month: 'December',
    prompt:
      'In a social gathering or shared meal, attend only to the moments of silence — when conversation pauses. Notice who (or what) ends the silence, and how: with a word, a movement, a laugh, a sound? Notice the duration of silences and whether they feel the same or different in quality. Attend only to the silence as a social and acoustic fact.',
  },
];

// ─────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────

/** Returns all 12 prompts for a given kingdom */
export function getPromptsByKingdom(kingdom: GoetheanKingdom): GoetheanPrompt[] {
  return GOETHEAN_PROMPTS.filter((p) => p.kingdom === kingdom);
}

/** Returns all 4 prompts for a given month (one per kingdom) */
export function getPromptsByMonth(month: MonthName): GoetheanPrompt[] {
  return GOETHEAN_PROMPTS.filter((p) => p.month === month);
}

/** Returns the prompt for a specific kingdom and month */
export function getPrompt(kingdom: GoetheanKingdom, month: MonthName): GoetheanPrompt | undefined {
  return GOETHEAN_PROMPTS.find((p) => p.kingdom === kingdom && p.month === month);
}

/** Returns a Goethean stage by number */
export function getStage(n: 1 | 2 | 3 | 4): GoetheanStage {
  return GOETHEAN_STAGES[n - 1];
}

export const KINGDOM_LABELS: Record<GoetheanKingdom, string> = {
  mineral: 'Mineral',
  plant: 'Plant',
  animal: 'Animal',
  human: 'Human',
};

export const MONTHS: MonthName[] = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
