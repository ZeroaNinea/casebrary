import { useEffect } from 'react';
import { Coins } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import chroma from 'chroma-js';

import { fetchEntries } from '@/features/entries/entries.thunks';
import i18n from '@/utils/i18n';
import { useAppDispatch, useAppSelector } from '@/utils/store';

import ColorThemeSection from '@/entrypoints/components/options-sections/color-theme-section';
import BackupSection from '@/entrypoints/components/options-sections/backup-section';
import LanguageSwitcherSection from '@/entrypoints/components/options-sections/language-switcher-section';

import createTheme from '@/utils/theme';
import applyTheme from '@/utils/theme/apply-theme';

import RippleButton from '@/entrypoints/components/buttons/ripple-button';
import RainbowButton from '@/entrypoints/components/buttons/rainbow-button';
// import '@/entrypoints/components/buttons/rainbow-button/rainbow-content.css';

import resolveThemeMode from '@/utils/theme/resolve-theme-mode.helper';

function App() {
  const { t } = useTranslation();

  const saved = localStorage.getItem('theme');
  const themeColors = saved
    ? JSON.parse(saved).colors
    : {
        primary: '#0284c7',
        secondary: '#06b6d4',
        tertiary: '#38bdf8',
        neutral: '#475569',
        neutralVariant: '#64748b',
        error: '#f43f5e',
      };
  const mode = saved ? JSON.parse(saved).mode : 'system';

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

  useEffect(() => {
    async function initializeLanguage() {
      const supported = ['en', 'ru'];

      const saved = localStorage.getItem('language');

      if (saved && supported.includes(saved)) {
        document.documentElement.lang = saved;
        i18n.changeLanguage(saved);
      } else {
        const browserLanguage = navigator.language.split('-')[0];

        const language = supported.includes(browserLanguage)
          ? browserLanguage
          : 'en';

        document.documentElement.lang = language;
        i18n.changeLanguage(language);
        localStorage.setItem('language', language);
      }
    }

    initializeLanguage();
  }, []);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEntries());
  }, [dispatch]);

  const entries = useAppSelector((state) => state.entries.entries);

  function getRippleMode(value: string) {
    return chroma.contrast(value || '', '#fff') > 4.5 ? 'light' : 'dark';
  }

  const colorBg = getComputedStyle(document.documentElement).getPropertyValue(
    '--color-bg',
  );

  return (
    <div
      className={`
        absolute inset-0 z-50 overflow-y-auto
        bg-linear-to-br from-(--color-bg) via-(--color-primary-background) to-(--color-secondary-background)
        p-10
        transition-transform duration-300 ease-out
      `}
    >
      <h1 className="text-3xl font-bold text-primary-title">
        {t('optionsTitle')}
      </h1>
      <p className="text-text/80 my-1">{t('welcomeToCasebrary')}</p>
      <p className="text-text/80 my-1">{t('welcomeMessage')}</p>
      <p className="text-text/80 my-1">{t('optionsDescription')}</p>
      <h2 className="text-2xl font-bold text-primary-title my-1">
        {t('generalTitle')}
      </h2>
      <p className="text-text/80">{t('generalDescription')}</p>
      <LanguageSwitcherSection />
      <ColorThemeSection />
      <BackupSection entries={entries} />
      <h2 className="text-2xl font-bold text-primary-title my-1">
        {t('privacyPolicyTitle')}
      </h2>
      <p className="text-text/80">{t('privacyPolicyDescription')}</p>
      <p className="text-text/80 my-2">
        <b className="font-bold">{t('version')}:</b>{' '}
        <span className="text-sm bg-primary-container text-text px-2 py-1 rounded-full">
          v1.0.0
        </span>
      </p>
      <div className="flex gap-5 px-8 my-4">
        <RippleButton
          className="
          flex items-center gap-2
          px-5 py-1
          text-white/70 text-[16px]
          bg-surface-container-filled hover:bg-surface-container-filled-hover
          rounded-xl cursor-pointer font-semibold text-sm
          border border-border/80
          shadow-sm hover:shadow-md hover:shadow-black/5
          hover:scale-[1.02] active:scale-[0.97] hover:-translate-y-0.5 active:translate-y-0
          transition-all duration-200 ease-out
        "
          onClick={() =>
            setTimeout(
              () =>
                window.open(
                  'https://github.com/ZeroaNinea/casebrary',
                  '_blank',
                ),
              200,
            )
          }
        >
          <img src="./github.svg" alt="GitHub" width={20} />
          <span className="font-bold">GitHub</span>
        </RippleButton>
        <RainbowButton
          className="flex items-center gap-2"
          onClick={() => {}}
          mode={getRippleMode(
            getComputedStyle(document.documentElement).getPropertyValue(
              '--color-bg',
            ),
          )}
        >
          <Coins size={20} color="#e8a81e" />
          {t('donate')}
        </RainbowButton>
      </div>
    </div>
  );
}

export default App;
