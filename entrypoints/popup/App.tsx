import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, Settings, Globe, Plus } from 'lucide-react';

// import i18n from '@/utils/i18n';

import './App.css';

// import RippleButton from '@/entrypoints/components/ripple-button';
import IconButton from '@/entrypoints/components/buttons/icon-button';
import FilledButton from '@/entrypoints/components/buttons/filled-button';
import SearchField from '@/entrypoints/components/search-field';

import store from '@/utils/store';
import { fetchEntries } from '@/features/entries/entries.thunks';

function App() {
  const { t } = useTranslation();

  useEffect(() => {
    store.dispatch(fetchEntries());
    console.log(store.getState());
  }, []);

  return (
    <>
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
      <div className="flex gap-2 px-3">
        <FilledButton title="Folder">
          <Plus size={16} color="var(--color-on-primary-container)" />
          <span className="text-on-primary-container text-sm">
            {t('folder')}
          </span>
        </FilledButton>
        <FilledButton title="Note">
          <Plus size={16} color="var(--color-on-primary-container)" />
          <span className="text-on-primary-container text-sm">{t('note')}</span>
        </FilledButton>
      </div>
      <div className="px-3 py-3">
        <SearchField
          label={t('searchLabel')}
          placeholder={t('searchRecords')}
          // onChange={(value) => {
          //   // TODO: filter entries
          // }}
        />
      </div>
      <div className="mb-2"></div>
    </>
  );
}

export default App;
// i18n.changeLanguage('en')
