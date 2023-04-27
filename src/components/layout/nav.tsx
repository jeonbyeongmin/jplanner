import Link from 'next/link';

import { NavItem } from '@/components/layout/nav-item';
import { useBoard } from '@/hooks/use-board';
import { getBoardRoute } from '@/utils/routes';
import { Flex } from '@chakra-ui/react';

export function Nav() {
  const { boardID, boards } = useBoard();

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
        {boards?.map(({ id, title }) => (
          <Link key={id} href={getBoardRoute(id)}>
            <NavItem key={id} content={title} isCurrent={boardID === id} />
          </Link>
        ))}
      </Flex>
    </Flex>
  );
}
