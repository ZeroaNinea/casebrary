// import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, Settings, Globe, Plus } from 'lucide-react';

// import i18n from '@/utils/i18n';

import './App.css';

import RippleButton from '@/entrypoints/components/ripple-button';
import IconButton from '@/entrypoints/components/icon-button';

function App() {
  // const [count, setCount] = useState(0);
  const { t } = useTranslation();

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
        <RippleButton
          mode="light"
          className="flex items-center gap-1 px-2 py-1
          bg-primary-container-filled hover:bg-primary-container-filled-hover
          rounded-md cursor-pointer
          transition-all duration-200"
          classnamesonclick={['bg-primary-container-filled-hover']}
        >
          <Plus size={16} color="var(--color-on-primary-container)" />
          <span className="text-on-primary-container text-sm">
            {t('folder')}
          </span>
        </RippleButton>
        <RippleButton
          mode="light"
          className="flex items-center gap-1 px-2 py-1
          bg-primary-container-filled hover:bg-primary-container-filled-hover
          rounded-md cursor-pointer
          transition-all duration-200"
          classnamesonclick={['bg-primary-container-filled-hover']}
        >
          <Plus size={16} color="var(--color-on-primary-container)" />
          <span className="text-on-primary-container text-sm">{t('note')}</span>
        </RippleButton>
      </div>
      <div className="mb-2"></div>
    </>
  );
}

export default App;
// i18n.changeLanguage('en')
