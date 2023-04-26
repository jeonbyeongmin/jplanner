import type { GetServerSideProps } from 'next';
import { resetServerContext } from 'react-beautiful-dnd';

import { BoardContent } from '@/components/board-content';
import { BoardHeader } from '@/components/board-header';
import { BoardActorContext } from '@/contexts/global-state-provider';
import { Flex } from '@chakra-ui/react';

interface Props {
  boardID: string;
}

export default function BoardDetail({ boardID }: Props) {
  const boards = BoardActorContext.useSelector((state) => state.context.boards);
  const title = boards?.find((board) => board.id === boardID)?.title ?? '';

  return (
    <Flex
      direction='column'
      align='start'
      h='full'
      w='full'
      flex={1}
      overflowX='auto'
    >
      <BoardHeader title={title} boardID={boardID} />
      <Flex p={5} pt={28}>
        <BoardContent />
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // This is required to prevent the server side rendering from breaking
  resetServerContext();

  const { params } = context;

  if (!params?.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      boardID: params?.id,
    },
  };
};
