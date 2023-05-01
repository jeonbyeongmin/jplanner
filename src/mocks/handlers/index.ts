import { boards } from '@/mocks/handlers/boards.mock';
import { taskLists } from '@/mocks/handlers/taskLists.mock';

export const handlers = [...boards, ...taskLists];
