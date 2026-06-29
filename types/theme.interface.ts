import { Palette } from './palette.alias';

export default interface Theme {
  primary: Palette;
  secondary: Palette;
  tertiary: Palette;
  neutral: Palette;
  neutralVariant: Palette;
  error: Palette;
  bg: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  text: string;
  textMuted: string;
  accent: string;
  accentHover: string;
  accentActive: string;
  hover: string;
  active: string;
  focus: string;
}
