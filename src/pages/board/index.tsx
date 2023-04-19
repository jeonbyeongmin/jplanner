import { GetServerSideProps } from 'next';

import { getBoardsAPI } from '@/api/board/get-board';

import type { Board } from '@/types/board.type';

export default function BoardPage() {
  return <div>Board</div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {} = context;

  const compare = (a: Board, b: Board) => {
    if (b.updatedAt === a.updatedAt) {
      return b.createdAt - a.createdAt;
    }
    return b.updatedAt - a.updatedAt;
  };

  const boards = await getBoardsAPI();
  const sortedBoards = boards.sort(compare);

  if (boards.length > 0) {
    return {
      redirect: {
        destination: `/board/${sortedBoards[0].id}`,
        permanent: false,
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};
