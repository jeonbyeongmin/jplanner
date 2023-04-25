import { fetcher } from '@/utils/api-client';

export type DeleteBoardParams = {
  id: string;
};

export const deleteBoardPath = (id: string) => `board/${id}`;

export const deleteBoardAPI = async ({ id }: DeleteBoardParams) => {
  return await fetcher(deleteBoardPath(id), {
    method: 'DELETE',
  });
};
