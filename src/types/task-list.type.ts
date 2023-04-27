import type { TaskType } from '@/types/task.type';

export interface TaskListType {
  id: string;
  title: string;
  boardId: string;
  tasks: TaskType[];
}
