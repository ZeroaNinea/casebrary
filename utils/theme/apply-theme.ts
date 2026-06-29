import Theme from '@/types/theme.interface';

function toKebabCase(text: string) {
  return text.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
}

export default function applyTheme(theme: Theme) {
  const root = document.documentElement;

  for (const [key, value] of Object.entries(theme)) {
    if (typeof value === 'string') {
      root.style.setProperty(`--${toKebabCase(key)}`, value);
    }
  }

  for (const [paletteName, palette] of Object.entries(theme)) {
    if (typeof palette !== 'object') continue;

    for (const [shade, color] of Object.entries(palette)) {
      root.style.setProperty(`--${paletteName}-${shade}`, color as string);
    }
  }
}
