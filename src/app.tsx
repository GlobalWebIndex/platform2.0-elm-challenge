import { FC, PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import ModalProvider from 'mui-modal-provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const VITE_LOCAL_ENV = import.meta.env.VITE_LOCAL_ENV;
const isLocalEnv: boolean = VITE_LOCAL_ENV === 'true';

const queryClient = new QueryClient();

export const App: FC<PropsWithChildren> = ({ children }) => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>{children}</ModalProvider>

        {isLocalEnv ? <ReactQueryDevtools initialIsOpen={false} /> : null}
      </QueryClientProvider>
    </BrowserRouter>
  );
};
