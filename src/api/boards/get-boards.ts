import type { BoardsPathQuery } from '@/api/boards/paths';

import { generateBoardsPath } from '@/api/boards/paths';
import { fetcher } from '@/utils/api-client';

type GetBoardsParams = {
  queries?: BoardsPathQuery;
};

export async function getBoardsAPI({ queries }: GetBoardsParams) {
  return await fetcher(generateBoardsPath({ queries }));
}
