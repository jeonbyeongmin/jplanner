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
    <Flex direction='column' align='start'>
      <BoardHeader />
      <Flex p={5}>
        <BoardContent />
      </Flex>
    </Flex>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context
  resetServerContext()

  return {
    props: {
      plannerID: params?.id,
    },
  }
}
