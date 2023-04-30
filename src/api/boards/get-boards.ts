import type { EmptyParamsType } from '@/types/api.type';

import { getBoardsPath } from '@/api/boards/paths';
import { fetcher } from '@/utils/api-client';

export type GetBoardsParams = EmptyParamsType;

export async function getBoardsAPI({}: GetBoardsParams) {
  return await fetcher(getBoardsPath());
}
