import { BoardContent } from '@/components/board-content'
import { BoardHeader } from '@/components/board-header'
import { Flex } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { resetServerContext } from 'react-beautiful-dnd'

interface PlannerDetailProps {
  plannerID: string
}

export default function PlannerDetail({ plannerID }: PlannerDetailProps) {
  return (
    <Flex direction='column' align='start' h='full' w='full' flex={1} overflowX='auto'>
      <BoardHeader />
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

  return {
    props: {
      plannerID: params?.id,
    },
  }
}
