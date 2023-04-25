import { fetcher } from '@/utils/api-client';

export type CreateBoardParams = {
  title: string;
};

export const createBoardPath = () => 'board';

export const createBoardAPI = async (board: CreateBoardParams) => {
  return await fetcher(createBoardPath(), {
    method: 'POST',
    data: board,
  });
};
