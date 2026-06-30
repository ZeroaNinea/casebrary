// import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// import reactLogo from '@/assets/react.svg';
// import wxtLogo from '/wxt.svg';

import { Menu, Settings, Globe, Plus } from 'lucide-react';

// import i18n from '@/utils/i18n';

import './App.css';

import RippleButton from '@/entrypoints/components/ripple-button';

function App() {
  // const [count, setCount] = useState(0);
  const { t } = useTranslation();

  return (
    <>
      <div className="flex justify-between w-100 p-2">
        <div className="flex gap-2 items-center">
          <RippleButton
            mode="dark"
            className="p-2 rounded-full cursor-pointer hover:bg-primary-container"
            classnamesonclick={['bg-primary-container']}
          >
            <Menu size={18} color="var(--color-primary-title)" />
          </RippleButton>
          <h1 className="font-bold text-primary-title text-lg">Casebrary</h1>
        </div>
        <div className="flex gap-2 items-center">
          <RippleButton
            mode="dark"
            className="p-2 rounded-full cursor-pointer hover:bg-primary-container"
            classnamesonclick={['bg-primary-container']}
          >
            <Globe size={18} color="var(--color-primary-title)" />
          </RippleButton>
          <RippleButton
            mode="dark"
            className="p-2 rounded-full cursor-pointer hover:bg-primary-container"
            classnamesonclick={['bg-primary-container']}
          >
            <Settings size={18} color="var(--color-primary-title)" />
          </RippleButton>
        </div>
      </div>
      <div className="flex gap-2 px-3">
        <RippleButton
          mode="light"
          className="flex items-center gap-1 px-2 py-1
          bg-primary-container-filled hover:bg-primary-container-filled-hover
          rounded-md cursor-pointer"
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
          rounded-md cursor-pointer"
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
