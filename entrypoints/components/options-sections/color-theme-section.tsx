import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import ColorInput from '@/entrypoints/components/inputs/color-input';
import RippleButton from '@/entrypoints/components/buttons/ripple-button';
import RadioGroup from '@/entrypoints/components/radio-group/radio-group';

import type { ThemeColors, ThemeMode } from '@/types/theme.interface';

import createTheme from '@/utils/theme';
import applyTheme from '@/utils/theme/apply-theme';
import resolveThemeMode from '@/utils/theme/resolve-theme-mode.helper';

import presets from './presets/presets';

export default function ColorThemeSection() {
  const { t } = useTranslation();

  const [themeColors, setThemeColors] = useState<ThemeColors>(() => {
    const saved = localStorage.getItem('theme');

    return saved
      ? JSON.parse(saved).colors
      : {
          primary: '#0284c7',
          secondary: '#06b6d4',
          tertiary: '#38bdf8',
          neutral: '#475569',
          neutralVariant: '#64748b',
          error: '#f43f5e',
        };
  });

  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('theme');

    return saved ? JSON.parse(saved).mode : 'system';
  });

  const inputs = [
    {
      label: t('primaryLabel'),
      value: themeColors.primary,
      onChange: (value: string) =>
        setThemeColors({ ...themeColors, primary: value }),
    },
    {
      label: t('secondaryLabel'),
      value: themeColors.secondary,
      onChange: (value: string) =>
        setThemeColors({ ...themeColors, secondary: value }),
    },
    {
      label: t('tertiaryLabel'),
      value: themeColors.tertiary,
      onChange: (value: string) =>
        setThemeColors({ ...themeColors, tertiary: value }),
    },
    {
      label: t('neutralLabel'),
      value: themeColors.neutral,
      onChange: (value: string) =>
        setThemeColors({ ...themeColors, neutral: value }),
    },
    {
      label: t('neutralVariantLabel'),
      value: themeColors.neutralVariant,
      onChange: (value: string) =>
        setThemeColors({ ...themeColors, neutralVariant: value }),
    },
    {
      label: t('errorLabel'),
      value: themeColors.error,
      onChange: (value: string) =>
        setThemeColors({ ...themeColors, error: value }),
    },
  ];

  function renderInputs() {
    return inputs.map((input) => (
      <ColorInput
        key={input.label}
        isOptionsPage={true}
        label={input.label}
        value={input.value}
        onChange={input.onChange}
      />
    ));
  }

  useEffect(() => {
    const theme = createTheme(themeColors, resolveThemeMode(mode));
    applyTheme(theme);
  }, [themeColors, mode]);

  useEffect(() => {
    localStorage.setItem(
      'theme',
      JSON.stringify({
        colors: themeColors,
        mode,
      }),
    );
  }, [themeColors, mode]);

  useEffect(() => {
    if (mode !== 'system') return;

    const media = window.matchMedia('(prefers-color-scheme: dark)');

    function handleChange() {
      applyTheme(createTheme(themeColors, media.matches ? 'dark' : 'light'));
    }

    media.addEventListener('change', handleChange);

    return () => {
      media.removeEventListener('change', handleChange);
    };
  }, [mode, themeColors]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary-title">
        {t('colorThemeTitle')}
      </h2>
      <div className="grid grid-cols-2 gap-4">{renderInputs()}</div>
      <div className="flex justify-center flex-wrap gap-4 my-4">
        {presets.map((preset) => (
          <RippleButton
            key={preset.name}
            mode="light"
            isState={true}
            onClick={() => setThemeColors(preset.colors)}
            style={{
              background: `
                radial-gradient(
                  circle at top left,
                  ${preset.colors.primary},
                  transparent 45%
                ),
                radial-gradient(
                  circle at top right,
                  ${preset.colors.secondary},
                  transparent 45%
                ),
                radial-gradient(
                  circle at bottom left,
                  ${preset.colors.tertiary},
                  transparent 45%
                ),
                linear-gradient(
                  135deg,
                  ${preset.colors.neutral},
                  ${preset.colors.neutralVariant}
                )
              `,
            }}
            className={`
              flex justify-center items-center
              rounded-full w-18 h-18
              cursor-pointer
              hover:opacity-80
              hover:scale-105
              active:scale-95
              transition-all duration-200
            `}
          >
            <span className="text-white font-bold opacity-100">
              {preset.name}
            </span>
          </RippleButton>
        ))}
      </div>
      <div className="my-4">
        <RadioGroup
          value={mode}
          rippleMode={resolveThemeMode(mode) === 'dark' ? 'light' : 'dark'}
          onChange={setMode}
          options={[
            {
              value: 'light',
              label: t('light'),
            },
            {
              value: 'dark',
              label: t('dark'),
            },
            {
              value: 'system',
              label: t('system'),
            },
          ]}
        />
      </div>
    </div>
  );
}
