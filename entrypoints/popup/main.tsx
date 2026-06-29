import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import '@/utils/i18n/';

import defaultTheme from '@/utils/theme/default-theme';
import applyTheme from '@/utils/theme/apply-theme';

applyTheme(defaultTheme);

// import '@/utils/theme/theme.css';
import './style.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
