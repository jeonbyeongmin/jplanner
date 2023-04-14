import { BoardContent } from '@/components/board-content'
import { BoardHeader } from '@/components/board-header'
import { Flex } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { resetServerContext } from 'react-beautiful-dnd'

interface BoardDetailProps {
  boardID: string
}

export default function BoardDetail({ boardID }: BoardDetailProps) {
  const title = headerTitleData.find((item) => item.id === boardID)?.title ?? ''
  return (
    <Flex direction='column' align='start' h='full' w='full' flex={1} overflowX='auto'>
      <BoardHeader title={title} />
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

const headerTitleData = [
  { id: '1', title: '계획 제목을 입력하고 Enter를 누르면 저장됩니다. 취소하려면 다른 곳을 클릭해주세요' },
  { id: '2', title: 'Plan Title2' },
  { id: '3', title: 'Plan Title3' },
  { id: '4', title: 'Plan Title4' },
  { id: '5', title: 'Plan Title5' },
  { id: '6', title: 'Plan Title6' },
  { id: '7', title: 'Plan Title7' },
  { id: '8', title: 'Plan Title8' },
  { id: '9', title: 'Plan Title9' },
  { id: '10', title: 'Plan Title10' },
  { id: '11', title: 'Plan Title11' },
  { id: '12', title: 'Plan Title12' },
  { id: '13', title: 'Plan Title13' },
  { id: '14', title: 'Plan Title14' },
  { id: '15', title: 'Plan Title15' },
  { id: '16', title: 'Plan Title16' },
  { id: '17', title: 'Plan Title17' },
  { id: '18', title: 'Plan Title18' },
  { id: '19', title: 'Plan Title19' },
  { id: '20', title: 'Plan Title20' },
  { id: '21', title: 'Plan Title21' },
  { id: '22', title: 'Plan Title22' },
  { id: '23', title: 'Plan Title23' },
  { id: '24', title: 'Plan Title24' },
  { id: '25', title: 'Plan Title25' },
  { id: '26', title: 'Plan Title26' },
  { id: '27', title: 'Plan Title27' },
]
