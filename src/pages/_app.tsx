import '@/styles/globals.css'
import { Layout } from '@/components/layout'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
      }}
    >
      <ChakraProvider resetCSS>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </SWRConfig>
  )
}
