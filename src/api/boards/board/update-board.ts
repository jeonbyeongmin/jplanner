import type { BoardsPathQuery } from '@/api/boards/paths';

import { generateBoardsPath } from '@/api/boards/paths';
import { fetcher } from '@/utils/api-client';

export type UpdateBoardParams = {
  boardID: string;
  queries?: BoardsPathQuery;
};

export type UpdateBoardBody = {
  title?: string;
};

export async function updateBoardAPI(
  { boardID, queries }: UpdateBoardParams,
  body: UpdateBoardBody,
) {
  return await fetcher(generateBoardsPath({ id: boardID, queries }), {
    method: 'PATCH',
    data: body,
  });
}
