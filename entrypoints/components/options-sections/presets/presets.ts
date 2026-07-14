import { ThemeColors } from '@/types/theme.interface';

const presets: {
  name: string;
  colors: ThemeColors;
}[] = [
  {
    name: 'Ocean',
    colors: {
      primary: '#0284c7',
      secondary: '#06b6d4',
      tertiary: '#38bdf8',
      neutral: '#475569',
      neutralVariant: '#64748b',
      error: '#f43f5e',
    },
  },
  {
    name: 'Forest',
    colors: {
      primary: '#2e7d32',
      secondary: '#43a047',
      tertiary: '#81c784',
      neutral: '#556b5d',
      neutralVariant: '#70877b',
      error: '#d32f2f',
    },
  },
  {
    name: 'Sunset',
    colors: {
      primary: '#ef6c00',
      secondary: '#fb8c00',
      tertiary: '#ffb74d',
      neutral: '#6d4c41',
      neutralVariant: '#8d6e63',
      error: '#c62828',
    },
  },
  {
    name: 'Lavender',
    colors: {
      primary: '#7e57c2',
      secondary: '#9575cd',
      tertiary: '#b39ddb',
      neutral: '#5f5a73',
      neutralVariant: '#7d7890',
      error: '#e53935',
    },
  },
  {
    name: 'Cherry',
    colors: {
      primary: '#c2185b',
      secondary: '#e91e63',
      tertiary: '#f48fb1',
      neutral: '#5f4b56',
      neutralVariant: '#7b6570',
      error: '#b71c1c',
    },
  },
  {
    name: 'Terminal',
    colors: {
      primary: '#00c853',
      secondary: '#64dd17',
      tertiary: '#b2ff59',
      neutral: '#37474f',
      neutralVariant: '#546e7a',
      error: '#ff5252',
    },
  },
];

export default presets;
export type Preset = (typeof presets)[number];
