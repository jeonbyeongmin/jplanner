import { getTaskListsPath } from '@/api/task-lists/path';
import { fetcher } from '@/utils/api-client';

export type GetTaskListsParams = {
  boardID: string;
};

export const getTaskListsAPI = async ({ boardID }: GetTaskListsParams) => {
  return await fetcher(getTaskListsPath(boardID));
};
