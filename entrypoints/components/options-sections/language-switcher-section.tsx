import { useTranslation } from 'react-i18next';

import i18n from '@/utils/i18n';

import RippleButton from '@/entrypoints/components/buttons/ripple-button';

export default function LanguageSwitcherSection() {
  const { t } = useTranslation();

  const glassCards = [
    {
      id: 1,
      shadow: '#4FC3F7', // Sky blue
      shadowHover: '#7DD3FC',
      languages: [
        { code: 'en', label: 'English' },
        { code: 'ru', label: 'Русский' },
      ],
    },
    {
      id: 2,
      shadow: '#8BC34A', // Green
      shadowHover: '#A5D66A',
      languages: [
        { code: 'hy', label: 'Արևելահայերեն' },
        { code: 'hyw', label: 'Արեւմտահայերէն' },
        { code: 'eo', label: 'Esperanto' },
      ],
    },
    {
      id: 3,
      shadow: '#F59E0B', // Amber
      shadowHover: '#FBBF24',
      languages: [
        { code: 'uk', label: 'Українська' },
        { code: 'be', label: 'Беларуская' },
      ],
    },
    {
      id: 4,
      shadow: '#EC4899', // Pink
      shadowHover: '#F472B6',
      languages: [{ code: 'es', label: 'Español' }],
    },
    {
      id: 5,
      shadow: '#94A3B8', // Neutral silver
      shadowHover: '#CBD5E1',
      languages: [{ code: 'system', label: t('system') }],
    },
  ];

  return (
    <div>
      <h2 className="text-2xl text-primary-title font-bold">
        {t('languageSwitcherTitle')}
      </h2>
      <div>
        {glassCards.map((glassCard) => (
          <div key={glassCard.id}>
            {glassCard.languages.map((language) => (
              <RippleButton key={language.code} onClick={() => {}}>
                {language.label}
              </RippleButton>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
