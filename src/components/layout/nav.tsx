import useSWR from 'swr'
import Link from 'next/link'

import { getBoardsPath } from '@/api/board/get-board'
import { NavItem } from '@/components/layout/nav-item'
import { Board } from '@/types/board.type'
import { getBoardRoute } from '@/utils/routes'
import { Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export function Nav() {
  const router = useRouter()
  const { data } = useSWR<Board[]>(getBoardsPath())

  // TODO: store current planID in context
  const isCurrent = (id: string) => {
    return router.query.id === id
  }

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
      {data?.map(({ id, title }) => (
        <Link key={id} href={getBoardRoute(id)}>
          <NavItem key={id} content={title} isCurrent={isCurrent(id)} />
        </Link>
      ))}
    </Flex>
  )
}
