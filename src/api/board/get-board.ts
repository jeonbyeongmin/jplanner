import type { Board } from '@/types/board.type';
import { fetcher } from '@/utils/api-client';

export const getBoardsPath = () => 'board';

export const getBoardsAPI = async (): Promise<Board[]> => {
  return await fetcher(getBoardsPath());
};
