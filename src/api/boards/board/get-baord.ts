import type { BoardsPathQuery } from '@/api/boards/paths';

import { generateBoardsPath } from '@/api/boards/paths';
import { fetcher } from '@/utils/api-client';

type GetBoardParams = {
  boardID: string;
  queries?: BoardsPathQuery;
};

export async function getBoardAPI({ boardID, queries }: GetBoardParams) {
  return await fetcher(generateBoardsPath({ id: boardID, queries }));
}
