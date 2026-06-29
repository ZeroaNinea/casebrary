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
): Theme {
  const palettes = {
    primary: createPalette(primary, mode),
    secondary: createPalette(secondary, mode),
    tertiary: createPalette(tertiary, mode),
    neutral: createPalette(neutral, mode),
    neutralVariant: createPalette(neutralVariant, mode),
    error: createPalette(error, mode),
  };

  return {
    ...palettes,
    bg: palettes.neutral['50'],
    surface: palettes.neutral['900'],
    surfaceAlt: palettes.neutral['800'],
    border: palettes.neutralVariant['500'],
    text: palettes.neutral['900'],
    textMuted: palettes.neutral['600'],
    accent: palettes.secondary['500'],
    accentHover: palettes.secondary['600'],
    accentActive: palettes.secondary['700'],
  } as Theme;
}
