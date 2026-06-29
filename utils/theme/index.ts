import createPalette from './palette.util';

import Theme from '@/types/theme.interface';

export default function createTheme(
  primary: string,
  secondary: string,
  tertiary: string,
  neutral: string,
  neutralVariant: string,
  error: string,
  mode: 'light' | 'dark' = 'light',
) {
  const theme: Theme = {
    primary: createPalette(primary, mode),
    secondary: createPalette(secondary, mode),
    tertiary: createPalette(tertiary, mode),
    neutral: createPalette(neutral, mode),
    neutralVariant: createPalette(neutralVariant, mode),
    error: createPalette(error, mode),

    // Semantic Roles
    bg: this.neutral['0'],
    // return {
    //   50: scale[0],
    //   100: scale[1],
    //   200: scale[2],
    //   300: scale[3],
    //   400: scale[4],
    //   500: scale[5],
    //   600: scale[6],
    //   700: scale[7],
    //   800: scale[8],
    //   900: scale[9],

    //   // Semantic roles.
    //   bg: scale[0],
    //   surface: scale[8],
    //   surfaceAlt: scale[7],
    //   border: scale[6],
    //   text: chroma.contrast(scale[0], '#fff') > 4.5 ? '#fff' : '#000',
    //   textMuted: scale[3],
    //   accent: scale[4],
    //   accentHover: scale[3],
    //   accentActive: scale[2],

    //   // State colors.
    //   hover: chroma(base).brighten(0.5).hex(),
    //   active: chroma(base).darken(0.5).hex(),
    //   focus: chroma(base).saturate(1).hex(),

    //   // Base
    //   base: base,
    // };
  };

  return theme;
}
