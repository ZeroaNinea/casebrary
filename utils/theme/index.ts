import createPalette from './palette.util';

import Theme, { ThemeColors, ThemeMode } from '@/types/theme.interface';

export default function createTheme(
  { primary, secondary, tertiary, neutral, neutralVariant, error }: ThemeColors,
  mode: ThemeMode,
): Theme {
  const palettes = {
    primary: createPalette(primary),
    secondary: createPalette(secondary),
    tertiary: createPalette(tertiary),
    neutral: createPalette(neutral),
    neutralVariant: createPalette(neutralVariant),
    error: createPalette(error),
  };

  if (mode === 'light') {
    const theme: Theme = {
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
    };

    return theme;
  } else {
    const theme = {
      ...palettes,
      bg: palettes.neutral['900'],
      surface: palettes.neutral['50'],
      surfaceAlt: palettes.neutral['100'],
      border: palettes.neutralVariant['400'],
      text: palettes.neutral['50'],
      textMuted: palettes.neutral['300'],
      accent: palettes.secondary['400'],
      accentHover: palettes.secondary['300'],
      accentActive: palettes.secondary['200'],
    };

    return theme;
  }
}
