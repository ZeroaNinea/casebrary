import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, Settings, Globe, Plus } from 'lucide-react';

// import i18n from '@/utils/i18n';

import './App.css';

// import RippleButton from '@/entrypoints/components/ripple-button';
import IconButton from '@/entrypoints/components/buttons/icon-button';
import FilledButton from '@/entrypoints/components/buttons/filled-button';
import SearchField from '@/entrypoints/components/inputs/input-field';
import EntryEditorPage from '@/entrypoints/components/pages/entry-editor.page';

import EntryList from '@/entrypoints/components/entries-list';

import { useAppDispatch, useAppSelector } from '@/utils/store';
import { deleteEntry, fetchEntries } from '@/features/entries/entries.thunks';

import CurrentPage from '@/types/current-page.alias';
import Entry from '@/types/entry.interface';

function App() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState<CurrentPage>(null);
  const [parentId, setParentId] = useState<string | null>(null);
  const [updatingEntry, setUpdatingEntry] = useState<Entry | null>(null);

  useEffect(() => {
    dispatch(fetchEntries());
  }, [dispatch]);

  async function handleDeleteEntry(id: string) {
    await dispatch(deleteEntry(id)).then(() => {
      dispatch(fetchEntries());
    });
  }

  async function handleUpdateEntry(entry: Entry) {
    setUpdatingEntry(entry);
    setCurrentPage('entry-editor');

    setTimeout(() => {
      setUpdatingEntry(null);
    }, 2000);
  }

  const entries = useAppSelector((state) => state.entries.entries);

  console.log('Entries from the `App.tsx`:', entries);

  return (
    <div className="relative w-100 overflow-x-hidden">
      <div className="flex justify-between w-100 p-2">
        <div className="flex gap-2 items-center">
          <IconButton title="Menu">
            <Menu size={18} color="var(--color-primary-title)" />
          </IconButton>
          <h1 className="font-bold text-primary-title text-lg">Casebrary</h1>
        </div>
        <div className="flex gap-2 items-center">
          <IconButton title="Language">
            <Globe size={18} color="var(--color-primary-title)" />
          </IconButton>
          <IconButton title="Settings">
            <Settings size={18} color="var(--color-primary-title)" />
          </IconButton>
        </div>
      </div>
      <div className="px-3">
        <FilledButton
          title="Entry"
          isState={true}
          onClick={() => setCurrentPage('entry-editor')}
        >
          <Plus size={16} color="var(--color-on-primary-container)" />
          <span className="text-on-primary-container text-sm">
            {t('addEntry')}
          </span>
        </FilledButton>
      </div>
      <div className="px-3 py-3">
        <SearchField
          label={t('searchLabel')}
          placeholder={t('searchRecords')}
          icon="search"
          // onChange={(value) => {
          //   // TODO: filter entries
          // }}
        />
      </div>
      {/* <div style={{ marginBottom: '325px' }}></div> */}
      <EntryEditorPage
        show={currentPage === 'entry-editor'}
        parentId={parentId}
        updatingEntry={updatingEntry}
        close={() => setCurrentPage(null)}
      />
      {/* {JSON.stringify(entries)} */}
      <EntryList
        entries={entries}
        deleteEntry={handleDeleteEntry}
        updateEntry={handleUpdateEntry}
      />
    </div>
  );
}

export default App;
// i18n.changeLanguage('en')
