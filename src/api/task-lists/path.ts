import { createPathGenerator } from '@/utils/path';

export type TaskListsPathQuery = {
  boardID?: string;
};

const TASK_LISTS_RESOURCE_NAME = 'taskLists';

export const generateTaskListsPath = createPathGenerator<TaskListsPathQuery>(
  TASK_LISTS_RESOURCE_NAME,
);
