import { CssBaseline } from '@mui/material';
import AppRouter from 'app-router';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <CssBaseline />
    <RecoilRoot>
      <AppRouter />
    </RecoilRoot>
  </React.StrictMode>
);
