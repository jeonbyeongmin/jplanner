import { fetcher } from '@/utils/api-client';

export type UpdateBoardParams = {
  id: string;
  title?: string;
};

export const updateBoardPath = (id: string) => `board/${id}`;

export const updateBoardAPI = async (board: UpdateBoardParams) => {
  return await fetcher(updateBoardPath(board.id), {
    method: 'PATCH',
    data: board,
  });
};
