import type { Task } from '@/types/task.type';

export interface TaskListType {
  id: string;
  title: string;
  boardId: string;
  tasks: Task[];
}
