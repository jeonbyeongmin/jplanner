import type { GetServerSideProps } from 'next';

import type { BoardType } from '@/types/board.type';
import { getBoardsAPI } from '@/api/boards/get-boards';

export default function BoardPage() {
  return <div>Board</div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {} = context;

  const compare = (a: BoardType, b: BoardType) => {
    if (b.updatedAt === a.updatedAt) {
      return b.createdAt - a.createdAt;
    }
    return b.updatedAt - a.updatedAt;
  };

  const boards = await getBoardsAPI({});
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
