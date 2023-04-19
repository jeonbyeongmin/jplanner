import '@/styles/globals.css';

import { SWRConfig } from 'swr';

import { Layout } from '@/components/layout';
import { GlobalStateProvider } from '@/contexts/global-state-provider';
import { theme } from '@/styles/chakra.config';
import { logOnBrowser } from '@/utils/logger';
import { ChakraProvider } from '@chakra-ui/react';

import type { AppProps } from 'next/app';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalStateProvider>
      <SWRConfig
        value={{
          revalidateIfStale: false,
          revalidateOnFocus: false,

          revalidateOnReconnect: false,
          fetcher: (resource, init) => {
            logOnBrowser(`fetching ${resource}`);
            return fetch(resource, init).then((res) => res.json());
          },
        }}
      >
        <ChakraProvider resetCSS theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </SWRConfig>
    </GlobalStateProvider>
  );
}
