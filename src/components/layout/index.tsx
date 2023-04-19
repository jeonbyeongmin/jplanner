import { Noto_Sans } from 'next/font/google';

import { SEO } from '@/components/layout/seo';
import { Sidebar } from '@/components/layout/sidebar';
import { Flex } from '@chakra-ui/react';

interface LayoutProps {
  children: React.ReactNode;
}

const notoSans = Noto_Sans({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
});

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <SEO />
      <Flex className={notoSans.className} w='full' h='full' position='relative' overflow='hidden'>
        <Flex bgColor='white' w='72' minW='72' direction='column'>
          <Sidebar />
        </Flex>

        <Flex h='full' w='full' flex='1' direction='column' bgColor='gray.100' overflowX='auto'>
          <Flex as='main' w='full' h='full' flex='1' direction='column' position='relative' alignItems='stretch'>
            {children}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
