import { SEO } from '@/components/layout/seo'
import { Sidebar } from '@/components/layout/sidebar'
import { Flex } from '@chakra-ui/react'
import { Noto_Sans } from 'next/font/google'

interface LayoutProps {
  children: React.ReactNode
}

const notoSans = Noto_Sans({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
})

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <SEO />
      <Flex className={notoSans.className} w='full' h='full' overflow='hidden' position='relative'>
        <Flex bgColor='white' w='72' direction='column'>
          <Sidebar />
        </Flex>

        <Flex h='full' maxW='full' flex='1' direction='column'>
          <Flex
            as='main'
            w='full'
            h='full'
            flex='1'
            bgColor='gray.100'
            overflow='hidden'
            direction='column'
            position='relative'
            alignItems='stretch'
          >
            {children}
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
