export interface HelperContent {
  title: string;
  whatYouSee: string;
  keyTerms: { term: string; def: string }[];
  howToUse: string[];
}

export const HELPER_CONTENT: Record<string, HelperContent> = {
  '/today': {
    title: 'Day View',
    whatYouSee:
      'The Day View shows the planetary sphere ruling today, the day\'s cosmic quality, and your suggested daily practice. Each weekday is governed by one of the seven classical planets, which shapes the spiritual tone of the day. A rotating highlight card surfaces the most active planetary influence in your chart right now.',
    keyTerms: [
      { term: 'Day Ruler', def: 'The planet that governs a given weekday — Sun on Sunday, Moon on Monday, Mars on Tuesday, and so on.' },
      { term: 'Sphere of the Day', def: 'The celestial sphere corresponding to the day\'s ruling planet, whose qualities permeate earthly activity.' },
      { term: 'Daily Practice', def: 'A brief contemplative or eurythmic exercise attuned to the day\'s planetary quality.' },
      { term: 'Planetary Hour', def: 'A subdivision of the day during which a specific planet\'s influence is especially strong.' },
    ],
    howToUse: [
      'Read the sphere card at the top to orient yourself to today\'s cosmic mood before beginning any activity.',
      'Tap the practice card to expand the suggested exercise and follow it as a morning or evening ritual.',
      'Scroll down to see upcoming planetary hours and plan focused work during the most supportive window.',
    ],
  },
  '/self': {
    title: 'Your Self',
    whatYouSee:
      'The Self section displays your natal chart wheel alongside your biographical profile. The wheel encodes the position of every planet and house cusp at the moment of your birth. Below the wheel, tabs reveal your biography chapters, fourfold constitution layers, and organ-planet correspondences.',
    keyTerms: [
      { term: 'Natal Chart', def: 'A map of the heavens at the exact moment and place of birth, expressing the soul\'s incarnating intentions.' },
      { term: 'Fourfold Constitution', def: 'Steiner\'s model of the human being as physical body, etheric body, astral body, and ego-organisation.' },
      { term: 'Biography Chapter', def: 'A seven-year life phase, each ruled by a different planetary sphere unfolding the soul\'s development.' },
      { term: 'Layers Panel', def: 'A visual overlay showing which constitutional layer each planet primarily influences.' },
    ],
    howToUse: [
      'Tap any planet glyph on the wheel to see its sign, house, and spiritual significance in your chart.',
      'Switch to the Biography tab to explore which seven-year chapter you are currently living through.',
      'Use the Layers toggle to view your chart filtered by physical, etheric, or astral influences.',
    ],
  },
  '/spheres': {
    title: 'The Spheres',
    whatYouSee:
      'The Spheres page presents the seven classical planetary spheres arranged in their Ptolemaic order from Moon to Saturn. Each sphere card shows its ruling planet, associated qualities, metals, colours, and organs. A radial diagram at the top illustrates their concentric nesting around the Earth.',
    keyTerms: [
      { term: 'Planetary Sphere', def: 'A concentric realm of cosmic influence through which the soul passes before birth and after death according to Steiner.' },
      { term: 'Etheric Forces', def: 'Life-giving formative forces that flow from the planetary spheres into earthly organisms.' },
      { term: 'Metal Correspondence', def: 'Each sphere is linked to a metal — Moon to silver, Sun to gold, Mars to iron — expressing their shared cosmic quality.' },
      { term: 'Organ Relationship', def: 'Steiner identified each classical planet with a specific organ it helps form and maintain during embryonic development.' },
    ],
    howToUse: [
      'Tap a sphere card to expand its full profile, including meditative verse and colour palette.',
      'Use the radial diagram to see how the spheres nest relative to one another and to the zodiac beyond Saturn.',
      'Compare two spheres side by side using the long-press gesture to understand their complementary qualities.',
    ],
  },
  '/biography': {
    title: 'Biography',
    whatYouSee:
      'The Biography section maps Rudolf Steiner\'s model of human biographical development across seven-year life phases. Each phase is governed by a planetary sphere and corresponds to the maturation of a distinct constitutional layer. Your current chapter is highlighted based on your birth date.',
    keyTerms: [
      { term: 'Seven-Year Rhythm', def: 'A developmental cycle Steiner identified in which a new constitutional body matures approximately every seven years.' },
      { term: 'Life Phase', def: 'A chapter of biography defined by the leading planetary quality and the developmental task of that period.' },
      { term: 'Moon Phase (0–7)', def: 'The first seven years dominated by the etheric body formation and imitative learning.' },
      { term: 'Saturn Return', def: 'Around age 28–30, Saturn\'s sphere completes its first cycle, often bringing a reckoning with destiny and vocation.' },
      { term: 'Karma', def: 'The balance of causes and effects carried between incarnations, gradually surfacing through biographical events.' },
    ],
    howToUse: [
      'Tap your highlighted chapter to read a description of its developmental theme and planetary influence.',
      'Scroll the timeline to review past phases and identify recurring patterns across seven-year rhythms.',
      'Use the annotation tool to journal key events within each chapter and observe how they relate to the ruling sphere.',
    ],
  },
  '/hierarchy': {
    title: 'Celestial Hierarchies',
    whatYouSee:
      'The Hierarchy page displays the nine ranks of spiritual beings as described by Steiner: from the highest Seraphim down to the Angels who work most closely with individual humans. Each rank is shown with its Dionysian name, its spiritual task, and its relationship to a planetary sphere.',
    keyTerms: [
      { term: 'Third Hierarchy', def: 'Angels, Archangels, and Archai — beings whose activity touches humanity most directly.' },
      { term: 'Second Hierarchy', def: 'Exusiai (Powers), Dynamis (Mights), and Kyriotetes (Dominions) — world-formative beings.' },
      { term: 'First Hierarchy', def: 'Thrones, Cherubim, and Seraphim — beings closest to the divine source, bearing cosmic will.' },
      { term: 'Folk Spirit', def: 'An Archangel-level being guiding the spiritual evolution of an entire cultural people.' },
      { term: 'Time Spirit', def: 'An Archai-being that leads the spirit of a historical epoch, each epoch lasting roughly 2,160 years.' },
    ],
    howToUse: [
      'Tap any hierarchy rank to read Steiner\'s description of its nature and its relationship to the planetary spheres.',
      'Use the sphere-mapping toggle to overlay each hierarchy onto the concentric sphere diagram.',
      'Trace the chain from Seraphim to Angels to understand how cosmic intentions become personal guidance.',
    ],
  },
  '/orrery': {
    title: 'Orrery',
    whatYouSee:
      'The Orrery renders a live three-dimensional model of planetary motion around the Sun, with positions computed from real ephemeris data. You can observe current planetary alignments, conjunctions, and retrogrades as they appear from a heliocentric perspective.',
    keyTerms: [
      { term: 'Heliocentric View', def: 'A perspective centred on the Sun, showing true orbital positions rather than Earth-apparent positions.' },
      { term: 'Retrograde', def: 'A period when a planet appears to move backward as seen from Earth, often a time of inner review.' },
      { term: 'Conjunction', def: 'Two or more planets aligned at the same ecliptic longitude, intensifying their combined influence.' },
      { term: 'Ephemeris', def: 'A table or algorithm giving precise planetary positions at regular intervals of time.' },
    ],
    howToUse: [
      'Drag to rotate the orrery and pinch to zoom in on any planetary cluster of interest.',
      'Tap a planet to freeze its label and see its current longitude, speed, and next station date.',
      'Use the time-scrubber at the bottom to animate forward or backward and watch upcoming alignments form.',
    ],
  },
  '/constellations': {
    title: 'Zodiac',
    whatYouSee:
      'The Zodiac section presents the twelve signs as spiritual archetypes rather than mere personality labels. Each sign is explored through its elemental quality, its cosmic task in the life of the soul, and Steiner\'s characterisation of its formative gesture. A star-field illustration shows the actual constellation backdrop.',
    keyTerms: [
      { term: 'Spiritual Archetype', def: 'The ideal cosmic template behind a zodiac sign, expressing a divine creative intention.' },
      { term: 'Formative Gesture', def: 'The shaping force a zodiac sign imparts to the physical organs during embryological development.' },
      { term: 'Warm/Cool Signs', def: 'Steiner\'s grouping of signs by their warmth-ether or chemical-ether quality rather than modern fire/air/water/earth.' },
      { term: 'Fixed Stars', def: 'Stars far beyond the planets whose sphere forms the zodiac backdrop, bearing the highest spiritual intentions.' },
    ],
    howToUse: [
      'Tap a sign to read its archetype description and see which planets in your natal chart occupy it.',
      'Toggle the star-field overlay to view the actual stars forming the constellation outline.',
      'Use the season wheel to see how the Sun\'s movement through the zodiac correlates with the rhythms of the year.',
    ],
  },
  '/reports': {
    title: 'Reports',
    whatYouSee:
      'The Reports section generates printable astrology-biography documents combining your natal chart analysis with biographical chapter reflections. Each report is formatted for reading or sharing, with sections for planetary profiles, life-phase summaries, and karma indications.',
    keyTerms: [
      { term: 'Natal Report', def: 'A written analysis of all natal placements, covering sign, house, aspects, and spiritual significance.' },
      { term: 'Biography Report', def: 'A chapter-by-chapter narrative of your seven-year life phases and their planetary themes.' },
      { term: 'Transit Report', def: 'A look at current planetary movements in relation to your natal positions and what they may activate.' },
      { term: 'Karma Indication', def: 'A section highlighting nodes, Saturn, and past-life indicators as described in Steiner\'s karma lectures.' },
    ],
    howToUse: [
      'Choose a report type from the menu, confirm your birth data is accurate, then tap Generate.',
      'Use the section toggles to include or exclude specific chapters before printing or exporting as PDF.',
      'Share a report link with a practitioner or student for guided study of its contents.',
    ],
  },
  '/explore': {
    title: 'Explore',
    whatYouSee:
      'Explore shows the live sky as it appears right now, overlaid with a transit calendar and markers for upcoming planetary stations, ingresses, and eclipses. A star-map background renders the visible constellations for your location and current sidereal time.',
    keyTerms: [
      { term: 'Transit', def: 'A current planetary position forming an angular relationship to a point in your natal chart.' },
      { term: 'Ingress', def: 'The moment a planet enters a new zodiac sign, shifting the quality of its influence.' },
      { term: 'Station', def: 'The moment a planet appears to pause before turning retrograde or direct.' },
      { term: 'Sidereal Time', def: 'Time measured relative to the fixed stars rather than the Sun, used to determine which stars are on the meridian.' },
    ],
    howToUse: [
      'Pan the star map by dragging and use pinch-zoom to explore any region of the sky.',
      'Tap the calendar icon to switch to the transit timeline and filter by planet or aspect type.',
      'Enable location access to align the live sky map with your actual horizon and meridian.',
    ],
  },
  '/learn': {
    title: 'Library',
    whatYouSee:
      'The Library collects courses, karma lecture summaries, guided meditative practices, and study paths drawn from Steiner\'s spiritual-scientific teachings. Content is organised by theme — planets, biography, karma, and cosmology — and each item tracks your reading or listening progress.',
    keyTerms: [
      { term: 'Karma Lectures', def: 'A series of Steiner\'s lectures from 1924 exploring how karma and reincarnation shape individual biography.' },
      { term: 'Guided Practice', def: 'A step-by-step contemplative or eurythmic exercise drawn from Anthroposophical spiritual training.' },
      { term: 'Study Path', def: 'A curated sequence of texts and practices leading progressively deeper into a given theme.' },
      { term: 'Eurythmy', def: 'An expressive movement art developed by Steiner in which speech sounds and musical tones are made visible in movement.' },
    ],
    howToUse: [
      'Browse by theme using the top filter chips, or search for a specific term or lecture title.',
      'Tap a course card to begin — your progress is saved automatically so you can resume any session.',
      'Mark items as favourites with the bookmark icon to build a personal reading list.',
    ],
  },
  '/journey': {
    title: 'Soul Journey',
    whatYouSee:
      'Soul Journey traces the path of the soul through the planetary spheres between death and rebirth, as described by Steiner. An animated sequence shows the soul ascending through the Moon, Mercury, Venus, Sun, Mars, Jupiter, and Saturn spheres before returning earthward through the same sequence.',
    keyTerms: [
      { term: 'Kamaloca', def: 'The Moon sphere review period after death in which the soul releases earthly desires and habits.' },
      { term: 'Devachan', def: 'The spiritual world of cosmic day experienced in the higher spheres between incarnations.' },
      { term: 'Descent through the Spheres', def: 'The soul\'s prenatal journey inward through the planetary spheres, gathering capacities for the coming life.' },
      { term: 'Midnight Hour of Existence', def: 'The deepest point between incarnations when the soul is most fully in the spiritual world, before the intention to reincarnate forms.' },
    ],
    howToUse: [
      'Tap Play to animate the soul\'s ascent — pause on any sphere to read what the soul experiences there.',
      'Switch to Descent mode to trace the inward journey and see which natal qualities each sphere contributes.',
      'Use the comparison view to place your natal chart alongside the sphere sequence and see which spheres are most emphasised.',
    ],
  },
  '/settings': {
    title: 'Settings',
    whatYouSee:
      'Settings is where you store and refine your birth data, calibrate location and time zone, and configure display preferences. Accurate birth data is essential for all chart calculations; even a few minutes of difference can shift the Ascendant or house cusps.',
    keyTerms: [
      { term: 'Birth Data', def: 'The date, time, and place of birth used as the foundation for all natal chart calculations.' },
      { term: 'House System', def: 'The mathematical method used to divide the chart into twelve houses — Placidus, Whole Sign, Koch, and others each give different results.' },
      { term: 'Sidereal / Tropical', def: 'Two zodiac frameworks: tropical is anchored to the seasons, sidereal to the actual star positions.' },
      { term: 'Ayanamsa', def: 'The degree of precession offset applied when converting between tropical and sidereal positions.' },
    ],
    howToUse: [
      'Enter your exact birth time as precisely as possible — check your birth certificate if uncertain.',
      'Select your preferred house system from the dropdown; Whole Sign is simplest for beginners.',
      'Toggle dark mode or adjust text size under Display Preferences to suit your reading environment.',
    ],
  },
};
