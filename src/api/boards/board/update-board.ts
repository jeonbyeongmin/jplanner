import { getBoardPath } from '@/api/boards/paths';
import { fetcher } from '@/utils/api-client';

export type UpdateBoardParams = {
  boardID: string;
};

export type UpdateBoardBody = {
  title?: string;
};

export async function updateBoardAPI(
  params: UpdateBoardParams,
  body: UpdateBoardBody,
) {
  const { boardID } = params;

  return await fetcher(getBoardPath(boardID), {
    method: 'PATCH',
    data: body,
  });
}
