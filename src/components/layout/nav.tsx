import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

import { getBoardsPath } from '@/api/board/get-board';
import { NavItem } from '@/components/layout/nav-item';
import { BoardActorContext } from '@/contexts/global-state-provider';
import { Board } from '@/types/board.type';
import { getBoardRoute } from '@/utils/routes';
import { Flex } from '@chakra-ui/react';

export function Nav() {
  const router = useRouter();
  const { data, error } = useSWR<Board[]>(getBoardsPath());
  const [state, send] = BoardActorContext.useActor();

  useEffect(() => {
    send({
      type: 'UPDATE_DATA',
      payload: data,
      error,
    });
  }, [data, error, send]);

  return (
    <Flex
      as='ul'
      direction='column'
      flex={1}
      overflowY='scroll'
      marginX='-2'
      paddingLeft={2}
      paddingRight={1}
      visibility='hidden'
      _hover={{ visibility: 'visible' }}
    >
      <Flex as='li' direction='column'>
        {state.context.boards?.map(({ id, title }) => (
          <Link key={id} href={getBoardRoute(id)}>
            <NavItem key={id} content={title} isCurrent={router.query.id === id} />
          </Link>
        ))}
      </Flex>
    </Flex>
  );
}
