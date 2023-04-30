import { getBoardPath } from '@/api/boards/paths';
import { fetcher } from '@/utils/api-client';

export type DeleteBoardParams = {
  boardID: string;
};

export async function deleteBoardAPI({ boardID }: DeleteBoardParams) {
  return await fetcher(getBoardPath(boardID), {
    method: 'DELETE',
  });
}
