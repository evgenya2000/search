import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from '@/app/styles/GlobalStyle';
import { theme } from '@/app/styles/theme';
import { I18nProvider } from '@/shared/lib';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: { retry: false, refetchOnWindowFocus: false },
      mutations: { retry: false },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <BrowserRouter basename="/search">{children}</BrowserRouter>
        </ThemeProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}
