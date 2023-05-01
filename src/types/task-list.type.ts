import type { TaskType } from '@/types/task.type';

export interface TaskListType {
  id: string;
  title: string;
  boardID: string;
  tasks: TaskType[];
  order: number;
}
