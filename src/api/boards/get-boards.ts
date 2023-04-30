import { generateBoardsPath } from '@/api/boards/paths';
import { fetcher } from '@/utils/api-client';

import type { EmptyParamsType } from '@/types/api.type';

export type GetBoardsParams = EmptyParamsType;

export async function getBoardsAPI({}: GetBoardsParams) {
  return await fetcher(generateBoardsPath());
}
