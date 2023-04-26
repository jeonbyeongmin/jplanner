import { getBoardsPath } from '@/api/boards/paths';
import { fetcher } from '@/utils/api-client';

export type CreateBoardParams = {
  title: string;
};

export const createBoardAPI = async (board: CreateBoardParams) => {
  if (!board || !board.title) throw new Error('title is required');

  return await fetcher(getBoardsPath(), {
    method: 'POST',
    data: board,
  });
};
