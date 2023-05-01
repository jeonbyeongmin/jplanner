import type { GetServerSideProps } from 'next';
import type { TaskListType } from '@/types/task-list.type';

import { resetServerContext } from 'react-beautiful-dnd';
import useSWR from 'swr';

import { generateTaskListsPath } from '@/api/task-lists/path';
import { BoardContent } from '@/components/board-content';
import { BoardHeader } from '@/components/board-header';
import { useBoard } from '@/hooks/use-board';
import { Flex } from '@chakra-ui/react';

export default function BoardDetail() {
  const { boardID, board } = useBoard();
  const { data } = useSWR<TaskListType[]>(
    boardID && generateTaskListsPath({ queries: { boardID } }),
  );

  return (
    <Flex
      direction='column'
      align='start'
      h='full'
      w='full'
      flex={1}
      overflowX='auto'
    >
      <BoardHeader title={board?.title ?? ''} boardID={boardID} />
      <Flex p={5} pt={28}>
        <BoardContent taskLists={data ?? []} />
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // This is required to prevent the server side rendering from breaking
  resetServerContext();

  const { params } = context;

  if (!params) {
    return {
      notFound: true,
    };
  }

  if (!params['board-id']) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
};
