import type { TaskListsPathQuery } from '@/api/task-lists/path';

import { generateTaskListsPath } from '@/api/task-lists/path';
import { fetcher } from '@/utils/api-client';

export type DeleteTaskListParams = {
  taskListID: string;
  queries?: TaskListsPathQuery;
};

export const deleteTaskListAPI = async ({
  taskListID,
  queries,
}: DeleteTaskListParams) => {
  return await fetcher(generateTaskListsPath({ id: taskListID, queries }), {
    method: 'DELETE',
  });
};
