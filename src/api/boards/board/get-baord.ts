import { generateBoardsPath } from '@/api/boards/paths';
import { fetcher } from '@/utils/api-client';

export type GetBoardParams = {
  boardID: string;
};

export async function getBoardAPI({ boardID }: GetBoardParams) {
  return await fetcher(generateBoardsPath({ id: boardID }));
}
