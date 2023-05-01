import type { TaskListsPathQuery } from '@/api/task-lists/path';

import { generateTaskListsPath } from '@/api/task-lists/path';
import { fetcher } from '@/utils/api-client';

export type GetTaskListsParams = {
  queries?: TaskListsPathQuery;
};

export const getTaskListsAPI = async ({ queries }: GetTaskListsParams) => {
  return await fetcher(generateTaskListsPath({ queries }));
};
