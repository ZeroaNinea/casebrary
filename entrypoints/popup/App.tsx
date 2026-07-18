import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Settings, Globe, Plus } from 'lucide-react';

import browser from 'webextension-polyfill';

import './App.css';

import IconButton from '@/entrypoints/components/buttons/icon-button';
import FilledButton from '@/entrypoints/components/buttons/filled-button';
import SearchField from '@/entrypoints/components/inputs/input-field';
import EntryEditorPage from '@/entrypoints/components/pages/entry-editor.page';
import EntryReadingPage from '@/entrypoints/components/pages/entry-reading.page';
import LanguageDropdown from '@/entrypoints/components/language-dropdown';
import LogoComponent from '@/entrypoints/components/logo';

import EntryList from '@/entrypoints/components/entries-list';

import { useAppDispatch, useAppSelector } from '@/utils/store';
import { deleteEntry, fetchEntries } from '@/features/entries/entries.thunks';

import CurrentPage from '@/types/current-page.alias';
import Entry from '@/types/entry.interface';

import i18n from '@/utils/i18n';
import supportedLocales from '@/utils/i18n/supported-locales';
import createTheme from '@/utils/theme';
import applyTheme from '@/utils/theme/apply-theme';

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
      const saved = localStorage.getItem('language');

      if (saved && supportedLocales.includes(saved)) {
        document.documentElement.lang = saved;
        i18n.changeLanguage(saved);
      } else {
        const browserLanguage = navigator.language.split('-')[0];

        const language = supportedLocales.includes(browserLanguage)
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

  const [currentPage, setCurrentPage] = useState<CurrentPage>(null);
  const [parentId, setParentId] = useState<string | null>(null);
  const [updatingEntry, setUpdatingEntry] = useState<Entry | null>(null);
  const [readingEntry, setReadingEntry] = useState<Entry | null>(null);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] =
    useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchEntries());
  }, [dispatch]);

  async function handleDeleteEntry(id: string) {
    await dispatch(deleteEntry(id)).then(() => {
      dispatch(fetchEntries());
    });
  }

  async function handleUpdateEntry(entry: Entry) {
    setParentId(entry.parentId);
    setUpdatingEntry(entry);
    setCurrentPage('entry-editor');
  }

  const entries = useAppSelector((state) => state.entries.entries);
  const [query, setQuery] = useState('');

  const filteredEntries = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return entries;

    return entries.filter((entry) => {
      if (entry.title.toLowerCase().includes(q)) return true;

      return entry.properties.some((property) => {
        if (property.name.toLowerCase().includes(q)) return true;

        if (property.value == null) return false;

        return String(property.value).toLowerCase().includes(q);
      });
    });
  }, [entries, query]);

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-linear-to-br from-(--color-bg) via-(--color-primary-background) to-(--color-secondary-background) shadow-2xl">
      {/* Premium sky-blue and cyan glowing background blobs */}
      <div
        className="absolute -top-10 -left-10 w-48 h-48 rounded-full pointer-events-none z-0 animate-blob-1"
        style={{
          backgroundColor: 'var(--color-primary-200)',
          opacity: 0.18,
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute bottom-5 -right-10 w-52 h-52 rounded-full pointer-events-none z-0 animate-blob-2"
        style={{
          backgroundColor: 'var(--color-secondary-200)',
          opacity: 0.18,
          filter: 'blur(60px)',
        }}
      />

      {/* Sticky header */}
      <div className="flex justify-between items-center w-full px-4.5 py-3.5 border-b border-border/10 backdrop-blur-md bg-white/10 z-10 shrink-0">
        <div className="flex gap-2.5 items-center">
          <LogoComponent
            width={50}
            height={50}
            backgroundColor="color-mix(in lch, var(--color-logo-neutral) 5%, transparent)"
            primaryColor="var(--color-logo-primary)"
            secondaryColor="var(--color-logo-secondary)"
            tertiaryColor="var(--color-logo-tertiary)"
            neutralColor="var(--color-logo-neutral)"
            neutralVariantColor="var(--color-logo-neutral-variant)"
            errorColor="var(--color-logo-error)"
          />
          <h1 className="font-extrabold text-base tracking-wide bg-linear-to-r from-(--color-primary-700) to-(--color-secondary-600) bg-clip-text text-transparent">
            Casebrary
          </h1>
        </div>
        <div className="flex gap-2 items-center">
          <div className="relative">
            <IconButton
              title="Language"
              isState={true}
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            >
              <Globe size={18} color="var(--color-primary-title)" />
            </IconButton>
            <LanguageDropdown
              isDropdownOpen={isLanguageDropdownOpen}
              setIsDropdownOpen={setIsLanguageDropdownOpen}
            />
          </div>
          <IconButton
            title="Settings"
            isState={true}
            onClick={() => {
              browser.runtime.openOptionsPage();
            }}
          >
            <Settings size={18} color="var(--color-primary-title)" />
          </IconButton>
        </div>
      </div>
      {/* Main scrollable content */}
      <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden z-1">
        <div className="px-4.5 pt-4 pb-2">
          <FilledButton
            title="Entry"
            mode={resolveThemeMode(mode)}
            isState={true}
            className="w-full"
            onClick={() => {
              setCurrentPage('entry-editor');
              setParentId(null);
              setUpdatingEntry(null);
              setParentId(null);
            }}
          >
            <Plus size={16} color="var(--color-on-primary-container)" />
            <span className="text-on-primary-container text-sm font-semibold">
              {t('addEntry')}
            </span>
          </FilledButton>
        </div>
        <div className="px-4.5 pb-2">
          <SearchField
            label={t('searchLabel')}
            placeholder={t('searchRecords')}
            icon="search"
            value={query}
            onChange={setQuery}
          />
        </div>
        {/* {JSON.stringify(filteredEntries)}) */}
        <EntryList
          entries={entries}
          matchesSearch={filteredEntries}
          deleteEntry={handleDeleteEntry}
          updateEntry={handleUpdateEntry}
          readEntry={(entry: Entry) => {
            setReadingEntry(entry);
            setCurrentPage('entry-reader');
          }}
          search={query}
          onAddChild={(parentId: string) => {
            setParentId(parentId);
            setCurrentPage('entry-editor');
          }}
        />
      </div>
      {/* Entry editor — full-cover overlay, sibling to main content */}
      <EntryEditorPage
        show={currentPage === 'entry-editor'}
        parentId={parentId}
        updatingEntry={updatingEntry}
        close={() => setCurrentPage(null)}
        clearUpdatingEntry={() => {
          setUpdatingEntry(null);
        }}
        clearParentId={() => setParentId(null)}
      />
      <EntryReadingPage
        show={currentPage === 'entry-reader'}
        readingEntry={readingEntry}
        handleClose={() => {
          setCurrentPage(null);
          setReadingEntry(null);
        }}
      />
    </div>
  );
}

export default App;
