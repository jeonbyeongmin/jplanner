import { BoardContent } from '@/components/board-content'
import { BoardHeader } from '@/components/board-header'
import { Flex } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { resetServerContext } from 'react-beautiful-dnd'

interface BoardDetailProps {
  boardID: string
}

export default function BoardDetail({ boardID }: BoardDetailProps) {
  return (
    <Flex direction='column' align='start' h='full' w='full' flex={1} overflowX='auto'>
      <BoardHeader title={''} />
      <Flex p={5} pt={28}>
        <BoardContent />
      </Flex>
    </Flex>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // This is required to prevent the server side rendering from breaking
  resetServerContext()

  const { params } = context

  if (!params?.id) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      boardID: params?.id,
    },
  }
}
