import { createPathGenerator } from '@/utils/path';

export type BoardsPathQuery = {
  // Add query params here
};

const BOARD_RESOURCE_NAME = 'boards';

export const generateBoardsPath =
  createPathGenerator<BoardsPathQuery>(BOARD_RESOURCE_NAME);
