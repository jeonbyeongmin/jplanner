import '@/styles/globals.css'
import { Layout } from '@/components/layout'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { GlobalStateProvider } from '@/contexts/global-state-provider'
import { logOnBrowser } from '@/utils/logger'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalStateProvider>
      <SWRConfig
        value={{
          revalidateIfStale: false,
          revalidateOnFocus: false,

          revalidateOnReconnect: false,
          fetcher: (resource, init) => {
            logOnBrowser(`fetching ${resource}`)
            return fetch(resource, init).then((res) => res.json())
          },
        }}
      >
        <ChakraProvider resetCSS>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </SWRConfig>
    </GlobalStateProvider>
  )
}
