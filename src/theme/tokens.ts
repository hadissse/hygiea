export const colors = {
  // Base
  cream:        '#F5F2EA',
  creamSoft:    '#F0EDE4',
  sand:         '#E8E4D9',
  ink:          '#1C1917',
  inkSoft:      '#3D3733',
  inkMuted:     '#78716C',
  // Accent
  cosmicBlue:   '#1E3A5F',
  cosmicBlueSoft:'#2E5080',
  ironRed:      '#8B2E2E',   // Michaelmas season only
  goldSoft:     '#C9A84C',   // Sun / warmth
  silver:       '#A8B4C0',   // Moon
  // Utility
  ruleSoft:     '#DDD9CE',
  white:        '#FFFFFF',
  transparent:  'transparent',
  // Streams (kept from Sukoon for trait engine compatibility)
  streamThinking: '#5C6E78',
  streamFeeling:  '#C9A84C',
  streamWilling:  '#8B2E2E',
} as const;

export const typography = {
  prose: '"EB Garamond", Georgia, serif',
  ui:    '"Inter", system-ui, sans-serif',
} as const;

export const radii = {
  chip:  14,
  card:  18,
  modal: 22,
} as const;

export const spacing = {
  xs:    4,
  sm:    8,
  md:    12,
  base:  16,
  lg:    20,
  xl:    24,
  '2xl': 28,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
} as const;

export type ColorToken    = keyof typeof colors;
export type RadiusToken   = keyof typeof radii;
export type TypographyToken = keyof typeof typography;
