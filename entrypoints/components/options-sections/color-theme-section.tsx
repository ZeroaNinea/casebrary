import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ColorInput from '@/entrypoints/components/inputs/color-input';

import type { ThemeColors, ThemeMode } from '@/types/theme.interface';

export default function ColorThemeSection() {
  const { t } = useTranslation();

  const [primary, setPrimary] = useState('#0284c7');
  const [secondary, setSecondary] = useState('#06b6d4');
  const [tertiary, setTertiary] = useState('#38bdf8');
  const [neutral, setNeutral] = useState('#475569');
  const [neutralVariant, setNeutralVariant] = useState('#64748b');
  const [error, setError] = useState('#f43f5e');

  const [mode, setMode] = useState<ThemeMode>('light');

  const inputs = [
    {
      label: t('primaryLabel'),
      value: primary,
      onChange: setPrimary,
    },
    {
      label: t('secondaryLabel'),
      value: secondary,
      onChange: setSecondary,
    },
    {
      label: t('tertiaryLabel'),
      value: tertiary,
      onChange: setTertiary,
    },
    {
      label: t('neutralLabel'),
      value: neutral,
      onChange: setNeutral,
    },
    {
      label: t('neutralVariantLabel'),
      value: neutralVariant,
      onChange: setNeutralVariant,
    },
    {
      label: t('errorLabel'),
      value: error,
      onChange: setError,
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

  const colors: ThemeColors = {
    primary,
    secondary,
    tertiary,
    neutral,
    neutralVariant,
    error,
  };

  const colorMode = mode;

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary-title">
        {t('colorThemeTitle')}
      </h2>
      <div className="grid grid-cols-2 gap-4">{renderInputs()}</div>
    </div>
  );
}
