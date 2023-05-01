import type { TaskListType } from '@/types/task-list.type';
import type { TaskListsPathQuery } from '@/api/task-lists/path';

import { generateTaskListsPath } from '@/api/task-lists/path';
import { fetcher } from '@/utils/api-client';

export type CreateTaskListParams = {
  queries?: TaskListsPathQuery;
};
export type CreateTaskListBody = Omit<TaskListType, 'id' | 'order' | 'tasks'>;

export const createTaskListAPI = async (
  { queries }: CreateTaskListParams,
  taskList: CreateTaskListBody,
) => {
  return await fetcher(generateTaskListsPath({ queries }), {
    method: 'POST',
    data: taskList,
  });
};
