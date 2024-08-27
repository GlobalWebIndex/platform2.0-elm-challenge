import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Layout } from './app/components/layout/layout.tsx';
import { App } from './app.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App>
      <Layout />
    </App>
  </StrictMode>,
);
