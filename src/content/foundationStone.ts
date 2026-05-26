// NEVER_AI — All Foundation Stone content is human-authored. No AI generation permitted here.
// Source: Rudolf Steiner, GA 260, Christmas Conference 1923–24, Dornach.
// Text follows the George Adams / Anthroposophical Society standard English rendering
// as preserved in the Rudolf Steiner Archive (rsarchive.org/Lectures/GA260/).
// The four movements are numbered I–IV and named by their central contemplative act.

export interface FoundationStoneMovement {
  number: 1 | 2 | 3 | 4;
  /** The contemplative act named in movements I–III; movement IV has no single-word practice name */
  practiceAct: string;
  /** Primary region of the human being addressed */
  humanRegion: 'Limbs' | 'Heart and Lungs' | 'Head' | 'The Turning Point';
  /** Spiritual body transformation operative in this movement */
  bodyTransformation: string;
  /** Hierarchy invoked */
  hierarchy: string;
  /** The closing Latin (or equivalent) affirmation */
  latineAffirmation: string;
  /** Complete English text of the movement */
  text: string;
  /** A 90-day contemplation prompt */
  ninetyDayPrompt: string;
  /** Brief orientation note for a practitioner entering this 90-day arc */
  orientationNote: string;
}

export const FOUNDATION_STONE_MOVEMENTS: FoundationStoneMovement[] = [
  {
    number: 1,
    practiceAct: 'Spirit-Remembering',
    humanRegion: 'Limbs',
    bodyTransformation: 'Etheric body toward Life-Spirit',
    hierarchy: 'Seraphim, Cherubim, Thrones — Spirits of Strength',
    latineAffirmation: 'Ex Deo nascimur — From the divine, humanity takes being.',
    text: `Human soul!
You live in the limbs
That carry you through the world of space
Into the sea of spirit-being:
Practice spirit-recalling
In depths of soul,
Where in the wielding will
Of world-creating
Your own I
Comes to being
Within the I of God;
And you will truly live
In the cosmic being of humanity.

For the Father-Spirit of the heights reigns
Creating being in world-depths:
Seraphim, Cherubim, Thrones,
Let resound from the heights
What in the depths finds its echo;
This speaks: Ex Deo nascimur.
The elemental spirits in the East, West, North, South hear it:
May human beings hear it.`,
    ninetyDayPrompt: `Each day this season, find one moment — however brief — in which you feel your limbs not as mechanical levers but as the outermost edge of a living field that touches the world. Ask: "Where does my gesture end and the world begin?" Do not answer with thought. Let the question rest in the movement itself. At day's end, write one sentence: what did your hands, feet, or posture encounter that was not of your own making?`,
    orientationNote: `Movement I works through the will-sphere — the limbs, the metabolic system, the midnight-dark zone of consciousness where the self-as-will meets the physical world. This 90-day arc is a threshold of re-awakening: you are learning to notice what your body already knows about its relationship to the divine ground. Expect dryness first. Insights arrive slowly, often through physical sensation rather than thought. The practice is not about feeling spiritual; it is about noticing that you are already embedded in something larger every time you take a step.`,
  },
  {
    number: 2,
    practiceAct: 'Spirit-Meditating',
    humanRegion: 'Heart and Lungs',
    bodyTransformation: 'Astral body toward Spirit-Self',
    hierarchy: 'Kyriotetes, Dynamis, Exusiai — Spirits of Light',
    latineAffirmation: 'In Christo morimur — In Christ, death becomes life.',
    text: `Human soul!
You live in the beat of heart and lungs
That leads you through the rhythm of time
Into the realm of your own soul-feeling:
Practice spirit-sensing
In balance of the soul,
Where the surging deeds
Of world-evolving
Unite your own I
With the world-I;
And you will truly feel
In the working of human souls.

For the Christ-Will encircling us
Holds sway in the rhythms of worlds,
Bestowing grace on souls:
Kyriotetes, Dynamis, Exusiai,
Let there be enkindled from the East
What through the West takes on its form;
This speaks: In Christo morimur.
The elemental spirits in the East, West, North, South hear it:
May human beings hear it.`,
    ninetyDayPrompt: `Each day this season, sit for a moment with your hand on your heart or simply with attention on your breath. Notice the rhythm — not its mechanics, but its quality. Is it anxious, steady, shallow, full? Ask: "What is the world meeting in me right now?" Let the feeling-quality of the day gather in your chest rather than rise to the head for explanation. At day's end, note one word for the emotional tone that ran through the day — not its cause, but its texture.`,
    orientationNote: `Movement II works through the feeling-sphere — the heart and lung rhythms, the middle realm between thinking and willing, where the soul's sympathies and antipathies are formed. This arc invites you to treat your emotional life as a sensory organ rather than a problem to solve. The Christ impulse named here is not doctrinal; it points to the force that transforms death-bound experience into renewed life. You may encounter grief, tenderness, or a strange gratitude during this arc. These are signs that the soul is beginning to feel the world, not just register it.`,
  },
  {
    number: 3,
    practiceAct: 'Spirit-Beholding',
    humanRegion: 'Head',
    bodyTransformation: 'Ego/lower I toward Spirit-Man',
    hierarchy: 'Archai, Archangeloi, Angeloi — Spirits of Soul',
    latineAffirmation: 'Per Spiritum Sanctum reviviscimus — In the Spirit, world-thoughts, the soul awakens.',
    text: `Human soul!
You live in the resting head
Which from the ground of eternity
Opens cosmic thoughts to you:
Practice spirit-envisioning
In stillness of thought,
Where the eternal aims of Gods
Bestow the light of cosmic being
On your own I
For free and active willing;
And you will truly think
In the depths of human spirit.

For the Spirit's cosmic thoughts
Hold sway in the world-existence of light,
Imploring grace for souls:
Archai, Archangeloi, Angeloi,
Let there resound from the depths
What in the heights shall be heard;
This speaks: Per Spiritum Sanctum reviviscimus.
The elemental spirits in the East, West, North, South hear it:
May human beings hear it.`,
    ninetyDayPrompt: `Each day this season, before you engage with tasks and information, spend one moment in deliberate inner quiet. Not emptiness — but listening for a thought that is not self-generated, that arrives as if from outside ordinary opinion. You may find it in a sudden clarity, an unexpected image, or a question that rises unbidden. Do not force it. Ask instead: "What wants to be thought through me today?" Write it down when it appears, unchanged. Over 90 days, a thread may become visible.`,
    orientationNote: `Movement III works through the thinking-sphere — the head, the nerve-sense system, the realm of pure concept and spiritual intuition. This arc is subtler than the previous two: the experience it opens is not emotional warmth or bodily awakening, but a quality of inner light — a moment when thinking feels less like personal rumination and more like participation in something cosmic. Expect the mind to be restless at first. The practice requires patience with silence. If you find the head feels "loud" at the start of this arc, that is normal — the noise gradually quiets as the organ attunes.`,
  },
  {
    number: 4,
    practiceAct: 'Turning-Point Contemplation',
    humanRegion: 'The Turning Point',
    bodyTransformation: 'Physical body toward Spirit-Man; the Trinity working through direct grace',
    hierarchy: 'The Trinity — Father, Son, Spirit',
    latineAffirmation: 'Godly light, Christ-Sun, warm our hearts, enlighten our heads.',
    text: `At the turning point of time
The Spirit-light of the world
Entered the stream of earthly being;
Night-darkness
Had run its course;
Day-radiant light
Shone forth in human souls;
Light that gives warmth
To simple shepherds' hearts,
Light that enlightens
The wise heads of kings.

Godly light,
Christ-Sun,
Give warmth
To our hearts;
Give light
To our heads;
That what we found from our hearts,
What we guide from our heads,
Shall be good.`,
    ninetyDayPrompt: `Each day this season, hold the image of a threshold: the moment between darkness and first light. You need not observe a literal dawn, though that is one form. The practice is to locate in your day the place where something ended and something else began — a mood, a conversation, a task, an understanding. Sit with that threshold moment. Ask: "What crossed over?" Do not interpret. Simply witness the fact of change, and note one word for what arrived on the other side.`,
    orientationNote: `Movement IV stands apart from the first three. It is not addressed to the human soul from outside, nor does it invoke a specific hierarchy — it speaks of an event, the turning point of cosmic time, and closes with a prayer. This 90-day arc is offered as a period of threshold-holding: learning to live consciously at the boundary between the old and the new. It pairs well with any season of personal transition — a year's beginning or end, a period of grief, or a return to practice after an absence. The warmth asked for is not comfort; it is the warmth that makes growth possible.`,
  },
];

export type FoundationStoneMovementNumber = 1 | 2 | 3 | 4;

/** Returns a single movement by its number */
export function getFoundationStoneMovement(
  n: FoundationStoneMovementNumber
): FoundationStoneMovement {
  return FOUNDATION_STONE_MOVEMENTS[n - 1];
}
