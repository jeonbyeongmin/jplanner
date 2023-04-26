import { getBoardPath } from '@/api/boards/paths';
import { fetcher } from '@/utils/api-client';

export type DeleteBoardParams = {
  id: string;
};

export const deleteBoardAPI = async ({ id }: DeleteBoardParams) => {
  return await fetcher(getBoardPath(id), {
    method: 'DELETE',
  });
};
