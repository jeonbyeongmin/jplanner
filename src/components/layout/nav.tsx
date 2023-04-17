import useSWR from 'swr'
import Link from 'next/link'
import { getBoardsPath } from '@/api/board/get-board'
import { NavItem } from '@/components/layout/nav-item'
import { Board } from '@/types/board.type'
import { getBoardRoute } from '@/utils/routes'
import { Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { BoardActorContext } from '@/contexts/global-state-provider'

export function Nav() {
  const router = useRouter()
  const { data, error } = useSWR<Board[]>(getBoardsPath())
  const [state, send] = BoardActorContext.useActor()

  const isCurrent = (id: string) => {
    return router.query.id === id
  }

  useEffect(() => {
    send({
      type: 'UPDATE_DATA',
      data,
      error,
    })
  }, [data, error, send])

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
      {state.context.boards?.map(({ id, title }) => (
        <Link key={id} href={getBoardRoute(id)}>
          <NavItem key={id} content={title} isCurrent={isCurrent(id)} />
        </Link>
      ))}
    </Flex>
  )
}
