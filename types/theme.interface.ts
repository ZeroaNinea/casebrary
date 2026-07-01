import { Palette } from './palette.alias';

export interface ThemeColors {
  primary: string;
  secondary: string;
  tertiary: string;
  neutral: string;
  neutralVariant: string;
  error: string;
}

export type ThemeMode = 'light' | 'dark';

export default interface Theme {
  primary: Palette;
  secondary: Palette;
  tertiary: Palette;
  neutral: Palette;
  neutralVariant: Palette;
  error: Palette;
  primaryBase: string;
  secondaryBase: string;
  tertiaryBase: string;
  neutralBase: string;
  neutralVariantBase: string;
  errorBase: string;
  bg: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  text: string;
  textMuted: string;
  accent: string;
  accentHover: string;
  accentActive: string;
  primaryTitle: string;
  primaryContainer: string;
  primaryContainerHover: string;
  primaryOnContainer: string;
  primaryContainerFilled: string;
  primaryContainerFilledHover: string;
  onPrimaryContainer: string;
}
