import { useEffect } from 'react';

import { fetchEntries } from '@/features/entries/entries.thunks';
import i18n from '@/utils/i18n';
import { useAppDispatch, useAppSelector } from '@/utils/store';
import { useTranslation } from 'react-i18next';

import ColorThemeSection from '@/entrypoints/components/options-sections/color-theme-section';
import BackupSection from '@/entrypoints/components/options-sections/backup-section';
import createTheme from '@/utils/theme';
import applyTheme from '@/utils/theme/apply-theme';

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
  const mode = saved ? JSON.parse(saved).mode : 'light';

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
      {/* Introduction */}
      {/* Content Links */}
      {/* Language Switch */}
      <ColorThemeSection />
      <BackupSection entries={entries} />
      {/* About */}
      {/* Privacy Policy */}
    </div>
  );
}

export default App;

/*
General
──────────────────────────
Language

Appearance
──────────────────────────
Theme colors

Backup
──────────────────────────
Export
Import

About
──────────────────────────
Version
Privacy Policy
GitHub
*/
