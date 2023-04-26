import { getBoardPath } from '@/api/boards/paths';
import { fetcher } from '@/utils/api-client';

export type UpdateBoardParams = {
  id: string;
};

export type UpdateBoardBody = {
  title?: string;
};

export const updateBoardAPI = async (
  params: UpdateBoardParams,
  body: UpdateBoardBody,
) => {
  return await fetcher(getBoardPath(params.id), {
    method: 'PATCH',
    data: body,
  });
};
