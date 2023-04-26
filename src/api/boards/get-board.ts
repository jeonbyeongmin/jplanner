import { getBoardsPath } from '@/api/boards/paths';
import { fetcher } from '@/utils/api-client';

export const getBoardsAPI = async () => {
  return await fetcher(getBoardsPath());
};
