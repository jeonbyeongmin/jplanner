import type { BoardType } from '@/types/board.type';
import type { BoardsPathQuery } from '@/api/boards/paths';

import { generateBoardsPath } from '@/api/boards/paths';
import { fetcher } from '@/utils/api-client';

export type CreateBoardParams = {
  queries?: BoardsPathQuery;
};
export type CreateBoardBody = Omit<BoardType, 'id' | 'createdAt' | 'updatedAt'>;

export async function createBoardAPI(
  { queries }: CreateBoardParams,
  board: CreateBoardBody,
) {
  if (!board || !board.title) throw new Error('title is required');

  return await fetcher(generateBoardsPath({ queries }), {
    method: 'POST',
    data: board,
  });
}
