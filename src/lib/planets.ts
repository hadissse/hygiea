export const DAY_PLANETS: Record<number, { key: string; name: string; glyph: string; organ: string; metal: string; color: string }> = {
  0: { key: 'sun',     name: 'Sun',     glyph: '☉', organ: 'Heart & Blood',         metal: 'Gold',    color: '#FFC78A' },
  1: { key: 'moon',    name: 'Moon',    glyph: '☽', organ: 'Brain & Reproductive',  metal: 'Silver',  color: '#C2D3E2' },
  2: { key: 'mars',    name: 'Mars',    glyph: '♂', organ: 'Gallbladder & Bile',     metal: 'Iron',    color: '#E9785E' },
  3: { key: 'mercury', name: 'Mercury', glyph: '☿', organ: 'Lungs & Breath',         metal: 'Mercury', color: '#C9D2BE' },
  4: { key: 'jupiter', name: 'Jupiter', glyph: '♃', organ: 'Liver & Metabolism',     metal: 'Tin',     color: '#9C8AB8' },
  5: { key: 'venus',   name: 'Venus',   glyph: '♀', organ: 'Kidneys & Filtration',   metal: 'Copper',  color: '#F8D6BE' },
  6: { key: 'saturn',  name: 'Saturn',  glyph: '♄', organ: 'Spleen, Bones & Skin',   metal: 'Lead',    color: '#5A3E7A' },
};

export const DAY_PLANET_KEYS = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn'] as const;
export type DayPlanetKey = typeof DAY_PLANET_KEYS[number];

export function todayPlanet() {
  return DAY_PLANETS[new Date().getDay()];
}
