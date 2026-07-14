import type { ThemeMode } from '@/types/theme.interface';

export default function resolveThemeMode(mode: ThemeMode): 'light' | 'dark' {
  if (mode !== 'system') {
    return mode;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}
