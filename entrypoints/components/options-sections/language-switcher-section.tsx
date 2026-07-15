import { useTranslation } from 'react-i18next';

import i18n from '@/utils/i18n';

import RippleButton from '@/entrypoints/components/buttons/ripple-button';

import './styles/language-switcher-section.css';

export default function LanguageSwitcherSection() {
  const { t } = useTranslation();

  const glassCards = [
    {
      id: 1,
      shadow: '#4FC3F7', // Sky blue
      shadowHover: '#7DD3FC',
      delay: `${-Math.random() * 40}s`,
      languages: [
        { code: 'en', label: 'English' },
        { code: 'ru', label: 'Русский' },
      ],
    },
    {
      id: 2,
      shadow: '#8BC34A', // Green
      shadowHover: '#A5D66A',
      delay: `${-Math.random() * 40}s`,
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
      delay: `${-Math.random() * 40}s`,
      languages: [
        { code: 'uk', label: 'Українська' },
        { code: 'be', label: 'Беларуская' },
      ],
    },
    {
      id: 4,
      shadow: '#EC4899', // Pink
      shadowHover: '#F472B6',
      delay: `${-Math.random() * 40}s`,
      languages: [{ code: 'es', label: 'Español' }],
    },
    {
      id: 5,
      shadow: '#94A3B8', // Neutral silver
      shadowHover: '#CBD5E1',
      delay: `${-Math.random() * 40}s`,
      languages: [{ code: 'system', label: t('system') }],
    },
  ];

  return (
    <div>
      <h2 className="text-2xl text-primary-title font-bold">
        {t('languageSwitcherTitle')}
      </h2>
      <div className="relative flex flex-row flex-wrap justify-center gap-4 items-center my-6">
        {glassCards.map((glassCard) => (
          <div
            className="
              language-card
              relative
              h-38 w-48
              rounded-3xl
              overflow-hidden
              border border-border/10
              transition-all duration-300
              flex flex-col justify-center items-center gap-2
              hover:scale-105 hover:bg-surface-container/10 hover:border-border/20
            "
          >
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="language-glow"
                style={
                  {
                    animationDelay: glassCard.delay,
                    '--glow-color': glassCard.shadow,
                    '--glow-hover': glassCard.shadowHover,
                  } as React.CSSProperties
                }
              />
            </div>

            {glassCard.languages.map((language) => (
              <RippleButton
                key={language.code}
                className="
                  relative z-10

                  px-4 py-2

                  rounded-full

                  backdrop-blur-xl
                  bg-white/10

                  border border-white/15

                  hover:bg-white/20
                  active:scale-95

                  transition-all duration-300
                "
              >
                {language.label}
              </RippleButton>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
