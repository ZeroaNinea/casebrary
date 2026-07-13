import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, Settings, Globe, Plus } from 'lucide-react';

import './App.css';

import IconButton from '@/entrypoints/components/buttons/icon-button';
import FilledButton from '@/entrypoints/components/buttons/filled-button';
import SearchField from '@/entrypoints/components/inputs/input-field';
import EntryEditorPage from '@/entrypoints/components/pages/entry-editor.page';
import LanguageDropdown from '@/entrypoints/components/language-dropdown';

import EntryList from '@/entrypoints/components/entries-list';

import { useAppDispatch, useAppSelector } from '@/utils/store';
import { deleteEntry, fetchEntries } from '@/features/entries/entries.thunks';

import CurrentPage from '@/types/current-page.alias';
import Entry from '@/types/entry.interface';

import i18n from '@/utils/i18n';

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

  const [currentPage, setCurrentPage] = useState<CurrentPage>(null);
  const [parentId, setParentId] = useState<string | null>(null);
  const [updatingEntry, setUpdatingEntry] = useState<Entry | null>(null);
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
          <IconButton title="Menu">
            <Menu size={18} color="var(--color-primary-title)" />
          </IconButton>
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
          <IconButton title="Settings">
            <Settings size={18} color="var(--color-primary-title)" />
          </IconButton>
        </div>
      </div>
      {/* Main scrollable content */}
      <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden z-1">
        <div className="px-4.5 pt-4 pb-2">
          <FilledButton
            title="Entry"
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
          />
        </div>
        {/* {JSON.stringify(entries)} */}
        <EntryList
          entries={entries}
          deleteEntry={handleDeleteEntry}
          updateEntry={handleUpdateEntry}
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
    </div>
  );
}

export default App;
