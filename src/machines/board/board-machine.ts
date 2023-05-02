import type { CreateBoardBody } from '@/api/boards/create-board';
import type { DeleteBoardParams } from '@/api/boards/board/delete-board';
import type {
  UpdateBoardParams,
  UpdateBoardBody,
} from '@/api/boards/board/update-board';
import type { BoardType } from '@/types/board.type';
import type { ErrorType } from '@/types/error.type';

import { mutate } from 'swr';
import { assign, createMachine } from 'xstate';

import { deleteBoardAPI } from '@/api/boards/board/delete-board';
import { updateBoardAPI } from '@/api/boards/board/update-board';
import { createBoardAPI } from '@/api/boards/create-board';
import { generateBoardsPath } from '@/api/boards/paths';

const schema = {
  context: {} as {
    boards: BoardType[] | null;
    error: ErrorType;
  },

  events: {} as
    | {
        type: 'UPDATE_DATA';
        payload: BoardType[] | undefined;
        error: ErrorType;
      }
    | {
        type: 'ADD_BOARD';
        payload: CreateBoardBody;
        navigateToBoard: (boardID: string) => Promise<boolean>;
      }
    | {
        type: 'DELETE_BOARD';
        payload: DeleteBoardParams;
        navigateToBoard: (boardID: string) => Promise<boolean>;
      }
    | {
        type: 'UPDATE_BOARD';
        payload: UpdateBoardParams & UpdateBoardBody;
      },

  services: {} as {
    addBoardActor: {
      data: BoardType | null | undefined;
    };
    deleteBoardActor: {
      data: BoardType[] | null | undefined;
    };
    updateBoardActor: {
      data: BoardType[] | null | undefined;
    };
  },
};

export const boardMachine = createMachine(
  {
    schema,
    tsTypes: {} as import('./board-machine.typegen').Typegen0,
    predictableActionArguments: true,
    id: 'board',
    context: {
      boards: null,
      error: null,
    },
    initial: 'idle',
    states: {
      idle: {
        on: {
          UPDATE_DATA: {
            target: 'waiting',
            actions: 'updateData',
          },
        },
      },
      waiting: {
        on: {
          ADD_BOARD: 'adding',
          DELETE_BOARD: 'deleting',
          UPDATE_BOARD: 'updating',
        },
      },
      adding: {
        invoke: {
          src: 'addBoardActor',
          onDone: 'waiting',
          onError: 'failure',
        },
      },
      updating: {
        invoke: {
          src: 'updateBoardActor',
          onDone: 'waiting',
          onError: 'failure',
        },
      },
      deleting: {
        invoke: {
          src: 'deleteBoardActor',
          onDone: 'waiting',
          onError: 'failure',
        },
      },
      failure: {
        entry: assign({
          error: (_, event) => event.payload,
        }),
        on: {
          UPDATE_DATA: {
            target: 'waiting',
            actions: 'updateData',
          },
        },
      },
    },
    on: {
      UPDATE_DATA: {
        actions: 'updateData',
      },
    },
  },
  {
    actions: {
      updateData: assign({
        boards: (_, event) => {
          const compare = (a: BoardType, b: BoardType) => {
            return b.updatedAt === a.updatedAt
              ? b.createdAt - a.createdAt
              : b.updatedAt - a.updatedAt;
          };

          return event.payload?.sort(compare) ?? null;
        },
        error: (_, event) => event.error,
      }),
    },

    services: {
      addBoardActor: async (_, event) => {
        const data = await createBoard(event.payload);
        event.navigateToBoard(data.id);
        mutate(generateBoardsPath());

        return data;
      },
      updateBoardActor: async (context, event) => {
        return mutate(
          generateBoardsPath(),
          updateBoard(context.boards, event.payload),
          {
            optimisticData: () => {
              if (!context.boards) {
                return null;
              }

              return context.boards.map((item) => {
                return item.id === event.payload.boardID
                  ? {
                      title: event.payload.title,
                      id: event.payload.boardID,
                    }
                  : item;
              });
            },
            rollbackOnError: true,
          },
        );
      },
      deleteBoardActor: async (context, event) => {
        return mutate(
          generateBoardsPath(),
          deleteBoard(context.boards, event.payload.boardID),
          {
            optimisticData: () => {
              if (!context.boards) {
                return null;
              }

              const newBoards = context.boards.filter(
                (item) => item.id !== event.payload.boardID,
              );
              event.navigateToBoard(newBoards[0]?.id ?? '');

              return newBoards;
            },
            rollbackOnError: true,
          },
        );
      },
    },
  },
);

const createBoard = async (board: CreateBoardBody): Promise<BoardType> => {
  const data = await createBoardAPI({}, board);

  return data;
};

const updateBoard = async (
  boards: BoardType[] | null,
  board: UpdateBoardParams & UpdateBoardBody,
) => {
  if (!boards) {
    return null;
  }

  const { boardID, title } = board;
  const data = await updateBoardAPI({ boardID }, { title });

  if (boards) {
    const index = boards.findIndex((item) => item.id === data.id);
    if (index !== -1) {
      boards[index] = data;
    }
  }

  return boards;
};

const deleteBoard = async (boards: BoardType[] | null, boardID: string) => {
  if (!boards) {
    return null;
  }

  await deleteBoardAPI({ boardID });

  return boards.filter((item) => item.id !== boardID);
};
