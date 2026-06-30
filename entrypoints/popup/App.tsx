import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// import reactLogo from '@/assets/react.svg';
// import wxtLogo from '/wxt.svg';

import { Menu, Settings, Globe, Plus } from 'lucide-react';

import i18n from '@/utils/i18n';

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
      <div className="flex px-3">
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
      </div>
      <div className="mb-2"></div>
      {/* <div className="bg-primary-500">
        <a href="https://wxt.dev" target="_blank">
          <img src={wxtLogo} className="logo" alt="WXT logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>WXT + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the WXT and React logos to learn more
      </p>
      <p>{t('helloWorld')}</p>
      <RippleButton
        mode="light"
        onClick={() => i18n.changeLanguage('ru')}
        classnamesonclick={[
          'bg-blue-500/70',
          'text-white',
          'outline-blue-500/70',
        ]}
        className="text-sm hover:bg-blue-500/70 hover:text-blue-100 text-blue-800 transition-all duration-300 p-3 md:rounded-full w-full md:w-auto text-left md:pl-3 sm:pl-6 cursor-pointer md:outline outline-blue-800 hover:outline-blue-800 -outline-offset-2"
      >
        RU
      </RippleButton>

      <button onClick={() => i18n.changeLanguage('en')}>EN</button> */}
    </>
  );
}

export default App;
