export interface OuterEarthStar {
  name: string;
  constellation: string;
  type: 'polar' | 'galactic' | 'cherubic' | 'extra-zodiacal';
  longitude: number;  // ecliptic longitude equivalent for chart placement
  latitude: number;   // ecliptic latitude (high value = outside zodiac)
  magnitude: number;
  bodyConnection: string;   // which organ/body system
  earthConnection: string;  // geographic/elemental connection
  interpretation_en: string;
  steinerNote?: string;
}

export const OUTER_EARTH_STARS: OuterEarthStar[] = [
  // Polar stars
  { name: 'Polaris', constellation: 'Ursa Minor', type: 'polar', longitude: 98.4, latitude: 66.1, magnitude: 2.0,
    bodyConnection: 'Pineal gland — the cosmic axis within',
    earthConnection: 'North pole — axis mundi of the physical Earth',
    interpretation_en: 'Polaris stands at the celestial north pole, the still point around which all revolves. Its influence is not of fate but of orientation — the soul that carries a Polaris contact has an unusual capacity for inner stillness and spiritual north-finding. In Steinerian terms this is the sphere of the Fixed Stars as distinct from the zodiac — not a belt of graduated destiny but a background of cosmic intention.',
    steinerNote: 'GA 228: The fixed stars beyond the zodiac are not fate-determiners but form-givers — they hold the archetypal intentions that precede incarnation.' },
  { name: 'Vega', constellation: 'Lyra', type: 'extra-zodiacal', longitude: 284.7, latitude: 61.7, magnitude: 0.0,
    bodyConnection: 'Larynx — the formative sound organ',
    earthConnection: 'Was the pole star ~12,000 BCE — anchor of prior civilization',
    interpretation_en: 'Vega, the brightest star of Lyra, carries the lyre-music of the spheres. A chart contact to Vega suggests a strong connection to formative sound — the voice, music, the spoken word as world-creating force. In Anthroposophy the larynx is understood to be evolving toward a future creative organ; Vega contacts may indicate that this development is consciously in play.' },
  { name: 'Canopus', constellation: 'Carina', type: 'extra-zodiacal', longitude: 95.7, latitude: -75.8, magnitude: -0.7,
    bodyConnection: 'Navigation faculty — deep-body wisdom',
    earthConnection: 'South celestial navigational star — Southern Cross complement',
    interpretation_en: 'Canopus is the second brightest star in the sky, the great navigator of the southern heavens. Contact suggests a soul with unusual wayfinding capacity — an ability to orient in unfamiliar spiritual territory without external guidance. Rarely visible from northern latitudes, it represents what is not part of the normal northern inheritance.' },
  { name: 'Galactic Center', constellation: 'Sagittarius', type: 'galactic', longitude: 266.9, latitude: -5.6, magnitude: 0,
    bodyConnection: 'Crown — cosmic individuality source',
    earthConnection: 'Center of the Milky Way — source stream of our galaxy',
    interpretation_en: 'The Galactic Center at ~27° Sagittarius is the rotational center of our galaxy. A natal planet within 2° carries an unusual access to what Steiner called the "cosmic I" — the higher individuality that exists beyond the single incarnation. This contact is rare in its significance; it may manifest as a felt sense of mission that exceeds personal history, or as a pull toward what lies beyond the merely human.' },
  { name: 'Sirius', constellation: 'Canis Major', type: 'extra-zodiacal', longitude: 104.2, latitude: -39.6, magnitude: -1.5,
    bodyConnection: 'Blood — life-stream purification',
    earthConnection: 'Egyptian Nile flood calendar star — renewal through inundation',
    interpretation_en: 'Sirius is the brightest star in Earth\'s sky, the Dog Star of ancient cultures and the Nile flood indicator of Egypt. In Anthroposophy Sirius is connected to Isis — the cosmic feminine impulse of life-renewal through death. A chart contact to Sirius often marks an unusual relationship to loss and regeneration; the soul has been initiated through something that ended, and this ending became a source.' },
  { name: 'Fomalhaut', constellation: 'Piscis Austrinus', type: 'cherubic', longitude: 333.9, latitude: -21.1, magnitude: 1.2,
    bodyConnection: 'Eyes — visionary capacity',
    earthConnection: 'One of the four Royal Stars / Watchers of the Heavens',
    interpretation_en: 'Fomalhaut is one of the four Royal Stars — the Watcher of the South, associated with the archangel Gabriel. In the celestial schema of the Cherubic creatures (from Ezekiel and Revelation), Fomalhaut corresponds to the Eagle/Scorpio face — depth, transformation, the capacity to see through to essence. A contact here gives unusual perceptual capacity: the eyes see what others miss.' },
  { name: 'Antares', constellation: 'Scorpius', type: 'cherubic', longitude: 249.7, latitude: -4.6, magnitude: 0.9,
    bodyConnection: 'Liver — metabolic fire',
    earthConnection: 'Royal Star — Watcher of the West, autumn equinox guardian',
    interpretation_en: 'Antares is the heart of Scorpius — anti-Ares, the rival of Mars. One of the four Royal Stars, Watcher of the West, associated with Uriel. Its influence is the transformational fire of autumn — things must die to be reborn. A natal contact to Antares often marks someone who has been through radical transformation and carries the capacity to help others through theirs. The metabolic liver-fire burns consciously.' },
];

export const OUTER_EARTH_STAR_BY_NAME: Record<string, OuterEarthStar> = Object.fromEntries(OUTER_EARTH_STARS.map(s => [s.name, s]));
