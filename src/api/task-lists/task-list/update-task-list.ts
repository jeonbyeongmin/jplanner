import type { TaskListsPathQuery } from '@/api/task-lists/path';

import { generateTaskListsPath } from '@/api/task-lists/path';
import { fetcher } from '@/utils/api-client';

export type UpdateTaskListParams = {
  taskListID: string;
  queries?: TaskListsPathQuery;
};

export type UpdateTaskListBody = {
  title?: string;
  order?: number;
};

export const updateTaskListAPI = async (
  { taskListID, queries }: UpdateTaskListParams,
  body: UpdateTaskListBody,
) => {
  return await fetcher(generateTaskListsPath({ id: taskListID, queries }), {
    method: 'PATCH',
    data: body,
  });
};
