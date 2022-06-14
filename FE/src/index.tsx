import React from 'react';

import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '@assets/style/GlobalStyle';
import { theme } from '@assets/style/theme';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
