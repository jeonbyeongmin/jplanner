import type { BoardsPathQuery } from '@/api/boards/paths';

import { generateBoardsPath } from '@/api/boards/paths';
import { fetcher } from '@/utils/api-client';

export type DeleteBoardParams = {
  boardID: string;
  queries?: BoardsPathQuery;
};

export async function deleteBoardAPI({ boardID, queries }: DeleteBoardParams) {
  return await fetcher(generateBoardsPath({ id: boardID, queries }), {
    method: 'DELETE',
  });
}
