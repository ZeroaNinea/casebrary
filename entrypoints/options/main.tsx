import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import App from './App.tsx';

import '@/utils/i18n/';

import defaultTheme from '@/utils/theme/default-theme';
import applyTheme from '@/utils/theme/apply-theme';

import store from '@/utils/store';

applyTheme(defaultTheme);

// import '@/utils/theme/theme.css';
// import './style.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
