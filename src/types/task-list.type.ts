import { Task } from '@/types/task.type';

export interface TaskList {
  id: string;
  title: string;
  boardId: string;
  tasks: Task[];
}
