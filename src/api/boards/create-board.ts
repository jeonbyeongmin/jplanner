import type { BoardType } from '@/types/board.type';
import type { EmptyParamsType } from '@/types/api.type';

import { generateBoardsPath } from '@/api/boards/paths';
import { fetcher } from '@/utils/api-client';

export type CreateBoardParams = EmptyParamsType;
export type CreateBoardBody = Omit<BoardType, 'id' | 'createdAt' | 'updatedAt'>;

export async function createBoardAPI(
  {}: CreateBoardParams,
  board: CreateBoardBody,
) {
  if (!board || !board.title) throw new Error('title is required');

  return await fetcher(generateBoardsPath(), {
    method: 'POST',
    data: board,
  });
}
