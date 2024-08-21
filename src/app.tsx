import { FC, PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ModalProvider from 'mui-modal-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const App: FC<PropsWithChildren> = ({ children }) => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>{children}</ModalProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};
