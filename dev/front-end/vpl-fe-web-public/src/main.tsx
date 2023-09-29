
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from './app';
import './index.css';
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <SnackbarProvider>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </SnackbarProvider>
  </React.StrictMode>
);
