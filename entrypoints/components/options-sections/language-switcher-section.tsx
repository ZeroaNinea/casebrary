import { useTranslation } from 'react-i18next';

import i18n from '@/utils/i18n';

import RippleButton from '@/entrypoints/components/buttons/ripple-button';

import './styles/language-switcher-section.css';

import chroma from 'chroma-js';

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

  function getRippleMode(value: string) {
    return chroma.contrast(value || '', '#fff') > 4.5 ? 'light' : 'dark';
  }

  const colorBg = getComputedStyle(document.documentElement).getPropertyValue(
    '--color-bg',
  );

  function changeLanguage(code: string) {
    if (code === 'system') {
      const browserLanguage = navigator.language.split('-')[0];

      const supported = ['en', 'ru', 'hy', 'hyw', 'epo', 'uk', 'be', 'es'];

      const resolved = supported.includes(browserLanguage)
        ? browserLanguage
        : 'en';

      document.documentElement.lang = resolved;
      i18n.changeLanguage(resolved);

      localStorage.setItem('language', 'system');
    } else {
      document.documentElement.lang = code;
      i18n.changeLanguage(code);

      localStorage.setItem('language', code);
    }
  }

  return (
    <div>
      <h3 className="text-xl text-primary-title font-bold my-1">
        {t('languageSwitcherTitle')}
      </h3>
      <p className="text-text/80">{t('languageSwitcherDescription')}</p>
      <div className="relative flex flex-row flex-wrap justify-center gap-4 items-center my-6">
        {glassCards.map((glassCard) => (
          <div
            className="
              language-card
              relative
              h-40 w-48
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
                mode={getRippleMode(colorBg)}
                onClick={() => changeLanguage(language.code)}
                className="
                  relative z-10
                  px-4 py-2
                  border border-border/10
                  transition-all duration-300
                  rounded-full
                  hover:scale-105 hover:bg-surface-container/10 hover:border-border/20 active:scale-95
                  cursor-pointer
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
