import type { TaskListsPathQuery } from '@/api/task-lists/path';

import { generateTaskListsPath } from '@/api/task-lists/path';
import { fetcher } from '@/utils/api-client';

export type GetTaskListParams = {
  taskListID: string;
  queries?: TaskListsPathQuery;
};

export const getTaskListAPI = async ({
  taskListID,
  queries,
}: GetTaskListParams) => {
  return await fetcher(generateTaskListsPath({ id: taskListID, queries }));
};
