import { Noto_Sans } from 'next/font/google';
import { useEffect } from 'react';
import useSWR from 'swr';

import { getBoardsPath } from '@/api/boards/paths';
import { SEO } from '@/components/layout/seo';
import { Sidebar } from '@/components/layout/sidebar';
import { BoardActorContext } from '@/contexts/board-actor-provider';
import { Flex } from '@chakra-ui/react';

import type { BoardType } from '@/types/board.type';

interface Props {
  children: React.ReactNode;
}

const notoSans = Noto_Sans({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
});

export function Layout({ children }: Props) {
  const { data, error } = useSWR<BoardType[]>(getBoardsPath());
  const boardActorRef = BoardActorContext.useActorRef();

  useEffect(() => {
    boardActorRef.send({
      type: 'UPDATE_DATA',
      payload: data,
      error,
    });
  }, [boardActorRef, data, error]);

  return (
    <>
      <SEO />
      <Flex
        className={notoSans.className}
        w='full'
        h='full'
        position='relative'
        overflow='hidden'
      >
        <Flex bgColor='white' w='72' minW='72' direction='column'>
          <Sidebar />
        </Flex>

        <Flex
          h='full'
          w='full'
          flex='1'
          direction='column'
          bgColor='gray.100'
          overflowX='auto'
        >
          <Flex
            as='main'
            w='full'
            h='full'
            flex='1'
            direction='column'
            position='relative'
            alignItems='stretch'
          >
            {children}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
