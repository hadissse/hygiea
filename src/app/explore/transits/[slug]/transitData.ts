// Long-form transit essays. Paragraphs are lists of parts; { em: string } marks italic emphasis (<em>).

export type ParaPart = string | { em: string };
export type Block = { sub: string } | { para: ParaPart[] } | { callout: string } | { note: string };

export interface TransitEssay {
  slug: string;
  svgKey: string;
  title: string;
  sub: string;
  color: string;
  readTime: string;
  words: string;
  blocks: Block[];
}

export const ESSAYS: Record<string, TransitEssay> = {
  'saturn-return': {
    slug: 'saturn-return',
    svgKey: 'saturn',
    title: 'First Saturn Return',
    sub: 'A major transit · around age 29.5',
    color: '#E9785E',
    readTime: '7 min',
    words: '750',
    blocks: [
      { callout: 'This transit occurs around age 29.5. Duration is approximately two years.' },
      { sub: 'The Astronomical Observation' },
      {
        para: [
          'Saturn takes twenty-nine and a half years to complete its orbit around the Sun and return to the exact degree it occupied at the moment of your birth. When it does, it meets your personal natal Sun for the first time — the one that witnessed your entry into the body. This meeting is not a metaphor: it is an astronomically documented event recorded since Ptolemy\'s catalogue, preserved in Arabic astronomical texts as "the planet\'s return to its place."',
        ],
      },
      {
        para: [
          'In the later catalogue of Abd al-Rahman al-Sufi (964 CE), Saturn is named "the Elder" — slowest in its motion, coldest in temperament, most faithful to the meanings of time it carries. What is slow to arrive, when it arrives, arrives with a different weight.',
        ],
      },
      { sub: 'The Meaning Working in You' },
      {
        para: [
          'The Saturn Return is not a punishment, nor is it the "thirty-year crisis" circulated in fashion magazines. It is the first question that life poses to you in its own voice: ',
          { em: 'What structure did you choose yourself — not what was inherited?' },
        ],
      },
      {
        para: [
          'The transit lasts a full two years, during which Saturn passes over your Sun three times: once in direct motion, once in retrograde, once as it settles on the same point. This repetition is not architectural coincidence — it is the rhythm that both body and soul need to transform what was accidental into structure.',
        ],
      },
      {
        para: [
          'What holds up under the weight of this encounter was real. What collapses was borrowed. This distinction is Saturn\'s gift — sometimes painful, but the most honest gift a planet can give a person.',
        ],
      },
      { sub: 'The Shadow That Hovers' },
      {
        para: [
          'The greatest danger in the Saturn Return is not failure — but succeeding in the wrong place. Finishing what was never yours, cementing a structure that was only your parents\' idea of your life. Saturn is patient: it will not cut the false structure, but it will weigh it down until you choose to leave it.',
        ],
      },
      {
        para: [
          'The other shadow: premature surrender. Believing that time has passed for re-arrangement because you have become "a serious person." Seriousness is not rigidity — it is the capacity to choose again with full awareness of who you have been.',
        ],
      },
      { sub: 'The Soul Question' },
      { para: [{ em: 'Which structure in your life do you wake up for each morning — and which do you wake to its weight?' }] },
      { sub: 'The Practice' },
      {
        para: [
          'Write on paper five commitments you currently carry. Reflect on each one: did you choose it yourself, or did someone else hand it to you? Keep the paper. Make no decisions today — simply seeing is enough.',
        ],
      },
      { note: '↻ Saturn meets your Sun again in May 2055 — stay observant.' },
    ],
  },

  'pluto-square': {
    slug: 'pluto-square',
    svgKey: 'pluto',
    title: 'Pluto Square',
    sub: 'Pluto squares its natal position · around age 37–42',
    color: '#9C8AB8',
    readTime: '8 min',
    words: '820',
    blocks: [
      { sub: 'What Happens in the Sky' },
      {
        para: [
          'Pluto is the slowest of the known planets — it takes 248 years to complete its orbit, but its path is highly irregular. This means its square to its natal position occurs at different ages for different generations. For one generation it arrives at 37, for another at 42. So do not take the number literally — read the event itself.',
        ],
      },
      {
        para: [
          'The square is a ninety-degree angle — a meeting where two wills clash and neither reaches the other without transformation. In your chart, this square occurs between natal Pluto — the thing you were born with and cannot relinquish — and sky Pluto, advancing with its cold authority over your rhythm.',
        ],
      },
      { sub: 'The Deep Meaning' },
      {
        para: [
          'The word Pluto carries is "transformation," but it is a wretched word. It is better to say: leaving what is no longer capable of surviving. Pluto does not build, and does not repair — it is the planet that reveals what is already dead, and insists until you acknowledge its death.',
        ],
      },
      {
        para: [
          'At the square, Pluto poses one question only: ',
          { em: 'What are you clinging to that has lost its secret?' },
          ' The relationship that turned into a habit. The career that became a costume. The identity you wear as if it is you, while it is a garment from a previous era. Pluto does not ask you to leave, but to see what you already left long ago and have not yet admitted.',
        ],
      },
      {
        para: [
          'This transit is not brief. It typically lasts between 18 months and three years, depending on Pluto\'s speed in that era. It passes over the same point multiple times in oscillating motion. Each pass deepens the exposure. It cannot be rushed, nor postponed — it comes when it comes.',
        ],
      },
      { sub: 'How It Appears in Daily Life' },
      {
        para: [
          'First: a sense of unease without clear cause. Something insists. Recurring dreams about the old house, someone from the past, an abandoned place. This is not romanticism — it is the self requesting attention to what you are ignoring.',
        ],
      },
      {
        para: [
          'Second: revelations. Something you were hiding from yourself appears with undeniable clarity. A relationship you thought healthy, that is not. A job you thought your achievement, that is your cage. This revelation is not cruelty — it is a gift. But the gift does not come in colourful wrapping.',
        ],
      },
      {
        para: [
          'Third: decisions that come from a depth you did not know you carried. You leave what could not be left. You begin what could not begin. Later, you look back and wonder: who did that? It was you, but the you beneath the skin.',
        ],
      },
      { sub: 'The Soul Question' },
      { para: [{ em: 'What has died in you for some time and you have not dared to hold a funeral for it?' }] },
      { sub: 'The Practice' },
      {
        para: [
          'Once a week, sit for ten minutes in silence. Do not ask for anything, do not analyse. Ask only: "What is insisting on me this week?" Write what comes without editing. Pluto will tell you in its own way — you do not need to prompt it, you need to listen.',
        ],
      },
    ],
  },

  'neptune-sun': {
    slug: 'neptune-sun',
    svgKey: 'neptune',
    title: 'Neptune Crosses Your Sun',
    sub: 'A slow transit · two to three years',
    color: '#7E97B8',
    readTime: '6 min',
    words: '670',
    blocks: [
      { sub: 'The Observation' },
      {
        para: [
          'Neptune takes 165 years to complete its orbit — passing through each degree of your chart once in an entire lifetime. When it touches your Sun, it is a unique transit, never to be repeated. This is not dramatization — it is astronomical fact.',
        ],
      },
      {
        para: [
          'In classical Arabic astronomical texts, Neptune was not known — it was only discovered in 1846 CE. But its place in the sky, through which it now passes, has been observed for thousands of years as part of the zodiacal bands. What changed was its name, not its presence.',
        ],
      },
      { sub: 'The Meaning' },
      {
        para: [
          'If Saturn is the father who builds, Neptune is the mother who dissolves. Its transit over your Sun neither adds nor subtracts — it softens the edges. What was clear becomes hazy. What was defined becomes permeable. This is not loss, though it may feel so at first.',
        ],
      },
      {
        para: [
          'In this transit, the self comes to know it is wider than it thought. The boundaries it built — I am this, I am not that — lose their grip. Something inside you remembers that before it was "I," it was something else. This remembering is liberating and disorienting at once.',
        ],
      },
      { sub: 'The Dangers' },
      {
        para: [
          'First danger: the loss of meaning. People become indistinct. Goals lose their pull. You do not feel you hate anything, you simply do not care about it. This is not necessarily depression — it is the dissolving of the sharpness of discrimination.',
        ],
      },
      {
        para: [
          'Second danger: self-deception. When boundaries dissolve, it becomes easy to confuse signals. Someone who appears angelic may be ordinary. A project that appears a calling may be obsession. This transit typically makes clear sight difficult. Many practitioners prefer to postpone major decisions until Neptune has settled.',
        ],
      },
      {
        para: [
          'Third danger: sedatives. Alcohol, excessive sleep, digital distraction — all work more strongly under Neptune. Not because they are forbidden, but because they conceal the moment the transit requests: the moment of conscious dissolving.',
        ],
      },
      { sub: 'The Soul Question' },
      { para: [{ em: 'If you are not who you think you are, what remains?' }] },
      { sub: 'The Practice' },
      {
        para: [
          'Every morning, before looking at your phone, sit on the edge of the bed for three minutes. Do not think. Do not attempt clarity. Allow the fog to be fog. You will find, after weeks, that what is real in your life will float to the surface of its own accord — because what is not real will have dissolved.',
        ],
      },
    ],
  },

  'jupiter-return': {
    slug: 'jupiter-return',
    svgKey: 'jupiter',
    title: 'Jupiter Return',
    sub: 'A recurring transit · approximately every 12 years',
    color: '#9C8AB8',
    readTime: '6 min',
    words: '640',
    blocks: [
      { callout: 'Timing · approximately age 12, 24, 36, 48, 60' },
      { sub: 'The Astronomical Observation' },
      {
        para: [
          'Jupiter takes approximately twelve years to complete its orbit around the Sun and return to the degree it occupied at the moment of your birth. It is the fastest of the giant planets, and the most regular in its visits. In the Arabic astronomical tradition, it was named "al-Bahja" — the Joy — and considered a planet that bestows expansion and blessing. Ibn Sina, in his treatise on celestial bodies, noted that Jupiter clarifies the heavy air clouded by Saturn — meaning it lightens the weight of reality with some measure of meaning.',
        ],
      },
      {
        para: [
          'The first return, at around age twelve, coincides with a documented developmental moment — the beginning of abstract thinking, and the emergence of moral and existential questions. Subsequent cycles come at age 24, then 36, and so on — each opening a different door on a theme that renews itself.',
        ],
      },
      { sub: 'The Meaning Working in You' },
      {
        para: [
          'Jupiter does not ask about structure as Saturn does — it asks about expansion. ',
          { em: 'Does your life\'s space suffice for your soul?' },
          ' This question returns every twelve years in a new formulation, but is at its core the same: are the frameworks you live within — relationships, career, ideas, body — still containing who you have become, or have they quietly grown too tight for you?',
        ],
      },
      {
        para: [
          'At thirty-five, when three cycles are complete, this question acquires layered depth: you are not seeking expansion for the first time, but recognising anew what you learned in the two preceding cycles. Jupiter builds a spiritual memory — each return adds a layer upon the previous.',
        ],
      },
      { sub: 'The Shadow That Accompanies Expansion' },
      {
        para: [
          'Jupiter carries one shadow: the excess of expansion. Leaping to the new before the old is complete. Dazzlement by possibility at the expense of rootedness. In this transit, it is difficult to distinguish between a genuine vision calling you to expansion and Jupiter fever enticing you to abandon what still holds value.',
        ],
      },
      {
        para: [
          'The wisdom here: take the expansion Jupiter opens, but do not rush to fold what is good. Genuine expansion does not require demolition — sometimes it suffices to expand the room without bringing down the walls.',
        ],
      },
      { sub: 'The Soul Question' },
      { para: [{ em: 'Which horizon is calling you now — and what is holding you back from responding?' }] },
    ],
  },

  'chiron-return': {
    slug: 'chiron-return',
    svgKey: 'chiron',
    title: 'Chiron Return',
    sub: 'A transitional passage · around age 50',
    color: '#A8A8A8',
    readTime: '7 min',
    words: '710',
    blocks: [
      { callout: 'Timing · around age 49–51 · once in a lifetime' },
      { sub: 'The Astronomical Observation' },
      {
        para: [
          'Chiron is not a planet in the classical sense — it is a small body between Jupiter and Saturn, discovered in 1977 CE, moving in a highly irregular elliptical orbit. A complete cycle takes between forty and fifty-five years — and this variation means its return occurs at different ages depending on the generation. The average falls around fifty, which gives this transit its distinctive vital rhythm.',
        ],
      },
      {
        para: [
          'In Greek mythology, Chiron is the wounded healer who cannot heal himself, and so his wound becomes a source of wisdom for those he treats. This mythic image is somehow drawn in the body itself — a small planet orbiting between two giants, belonging neither here nor there, carrying a precious mediation.',
        ],
      },
      { sub: 'The Wound That Teaches' },
      {
        para: [
          'In the natal chart, Chiron represents a primal wound — something felt early as a deficiency or fracture in one\'s being. Not every Chiron wound is loudly painful: some are quiet, chronic, resembling the background ache one has lived with so long it has been forgotten.',
        ],
      },
      {
        para: [
          'At the return — around fifty — this wound surfaces again, not to return you to the old pain, but to ask you: ',
          { em: 'Do you still believe this wound defines you?' },
          ' The difference that the mid-century age makes is that you now carry enough experience to see the wound with a different eye — not as a source of shame or concealment, but as what has ripened you in a way nothing else could.',
        ],
      },
      { sub: 'From the Wounded to the Guide' },
      {
        para: [
          'What distinguishes the Chiron Return from other major transits is its double transformative quality: inner healing opens an outward path. The person who has lived with a wound they understand possesses something rare — the ability to sit beside someone in pain without fixing them, and without breaking down with them. This is the wounded healer in its clearest form.',
        ],
      },
      {
        para: [
          'Those who complete this transit fully do not rid themselves of their wound — they cease fighting it. The wound becomes a compass: where are you most appropriate to be present, and where is your capacity for empathy deeper than any technical skill.',
        ],
      },
      { sub: 'The Shadow: Addiction to the Wound' },
      {
        para: [
          'The danger in the Chiron Return is the over-investment in the identity of "the one who suffers." Some people discover in this transit that they built their entire personality around their wound — and that healing it seems like a loss of identity. This is not rhetoric — it is a real dilemma faced by those who have carried a wound for a long time.',
        ],
      },
      {
        para: [
          'The difficult question here: if the wound is removed from your self-definition, who are you? The answer does not come through thinking — it comes through the courage to experience it.',
        ],
      },
      { sub: 'The Soul Question' },
      { para: [{ em: 'What has your wound taught you — and are you ready to pass that lesson on?' }] },
    ],
  },

  'uranus-opposition': {
    slug: 'uranus-opposition',
    svgKey: 'uranus',
    title: 'Uranus Opposition',
    sub: 'Midlife · around age 40–42',
    color: '#7E97B8',
    readTime: '7 min',
    words: '730',
    blocks: [
      { callout: 'Timing · around age 40–42 · once in a lifetime' },
      { sub: 'The Astronomical Observation' },
      {
        para: [
          'Uranus takes 84 years to complete its full orbit. At the midpoint of this cycle — between approximately forty and forty-two — it reaches the point directly opposite its position at the moment of your birth. This angle — 180 degrees — is the opposition, which in traditional astrology is a moment of fulfilment and confrontation simultaneously: the thing sees itself in an unfamiliar mirror.',
        ],
      },
      {
        para: [
          'In the classical Arabic astronomical tradition, Uranus was not known — it was discovered in 1781 CE. Yet Arab astronomers of the medieval period observed that period of life as a threshold of periodic transformation, connecting it to concepts of "the balance of forces" and "re-establishing equilibrium." What differed was the language of description, not the content.',
        ],
      },
      { sub: 'The Awakening That Stirs Even When It Disturbs' },
      {
        para: [
          'Uranus is the consciousness that suddenly accelerates. In its natal position, it represents the way your soul needs freedom — not abstract freedom, but the very specific form in which you do not feel stifled. At the opposition, the sky reflects this position from the opposite side and asks: ',
          { em: 'Does the life you are living now allow you this freedom, or have you pledged it to an old decision you never revisited?' },
        ],
      },
      {
        para: [
          'This is what people call the "midlife crisis" — but the name robs the phenomenon of its depth. It is not a crisis — it is the soul returning to what it had deferred. Everything you promised yourself then forgot in the noise of establishing yourself, every path you left behind because "the timing was not right," knocks at the door again — this time with a louder voice.',
        ],
      },
      { sub: 'Authenticity as a Project' },
      {
        para: [
          'What distinguishes the Uranus Opposition transit from others is that it asks for one thing only, but it is costly: ',
          { em: 'to live from the centre, not the margin.' },
          ' The centre is what you truly know is yours — the taste that does not shift, the need that does not sleep, the vision that surfaces despite everything. The margin is what you built because circumstances demanded it, or because you did not have enough clarity to choose otherwise.',
        ],
      },
      {
        para: [
          'This does not mean everything you built is wrong. Much of it may be good. But Uranus asks you: are you adding your soul to this structure — or completing it by inertia alone?',
        ],
      },
      { sub: 'The Shadow: Rupture Instead of Transformation' },
      {
        para: [
          'When Uranus\'s message is resisted and not heard, it sometimes transforms into an explosion: a sudden divorce, a resignation without a plan, abandoning responsibilities without containing the affected relationships. This is not because Uranus demands demolition — but because the suppressed energy that found no channel breaks through any gap.',
        ],
      },
      {
        para: [
          'The difference between a completed transit and a destructive one often lies in one question: are you initiating change, or waiting until no choice remains? Initiative is not haste — it is choosing to see clearly before pain forces you to see.',
        ],
      },
      { sub: 'The Soul Question' },
      { para: [{ em: 'What is the thing that if you did it you would not regret at sixty — and might regret not doing?' }] },
    ],
  },
};
