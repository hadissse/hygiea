export const colors = {
  cream: '#FAFAF7',
  creamSoft: '#F5F2EA',
  sand: '#EDE9E0',
  ink: '#1C1917',
  inkSoft: '#292524',
  inkMuted: '#78716C',
  gold: '#C9A84C',
  goldSoft: '#E8D5A3',
  silver: '#A8B4C0',
  coral: '#E9785E',
  coralSoft: '#F3B8A6',
  amber: '#D4A04C',
  midnight: '#0F1228',
  midnight2: '#1B1F47',
  ruleSoft: '#E5E1D8',
  cosmicBlue: '#1E3A5F',
  sage: '#8FA084',
  lake: '#7E97B8',
  white: '#FFFFFF',
  transparent: 'transparent',
} as const;

export const radii = {
  chip: 14,
  card: 18,
  modal: 22,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 28,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
} as const;

export type ColorToken = keyof typeof colors;
export type RadiusToken = keyof typeof radii;
