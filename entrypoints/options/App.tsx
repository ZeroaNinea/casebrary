import { useEffect } from 'react';

import { fetchEntries } from '@/features/entries/entries.thunks';
import i18n from '@/utils/i18n';
import { useAppDispatch, useAppSelector } from '@/utils/store';
import { useTranslation } from 'react-i18next';

import SettingsPage from '@/entrypoints/components/pages/settings.page';

function App() {
  const { t } = useTranslation();

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
    <div>
      <SettingsPage entries={entries} />
    </div>
  );
}

export default App;
