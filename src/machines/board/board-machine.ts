import { createBoardAPI } from '@/api/board/create-board'
import { deleteBoardAPI } from '@/api/board/delete-board'
import { getBoardsPath } from '@/api/board/get-board'
import { updateBoardAPI } from '@/api/board/update-board'
import { Board } from '@/types/board.type'
import { mutate } from 'swr'
import { assign, createMachine } from 'xstate'

const schema = {
  context: {} as {
    boards: Board[] | null
    error: any
  },

  events: {} as
    | { type: 'UPDATE_DATA'; data: Board[] | undefined; error: any }
    | { type: 'ADD_BOARD'; data: Board }
    | { type: 'DELETE_BOARD'; data: { id: string } }
    | { type: 'UPDATE_BOARD'; data: Board },

  services: {} as {
    addBoard: {
      data: Board
    }
    deleteBoard: {
      data: { id: string }
    }
    updateBoard: {
      data: Board[] | null | undefined
    }
  },
}

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
            actions: assign({
              boards: (_, event) => event.data ?? null,
              error: (_, event) => event.error,
            }),
          },
        },
      },
      waiting: {
        on: {
          ADD_BOARD: 'adding',
          DELETE_BOARD: 'deleting',
          UPDATE_BOARD: {
            target: 'updating',
          },
        },
      },
      adding: {
        invoke: {
          src: 'addBoard',
          onDone: {
            target: 'waiting',
            actions: 'refetch',
          },
          onError: 'failure',
        },
      },
      deleting: {
        invoke: {
          src: 'deleteBoard',
          onDone: {
            target: 'waiting',
          },
          onError: 'failure',
        },
      },
      updating: {
        invoke: {
          src: 'updateBoard',
          onDone: {
            target: 'waiting',
          },
          onError: 'failure',
        },
      },
      failure: {
        on: {
          UPDATE_DATA: {
            target: 'waiting',
            actions: assign({
              boards: (_, event) => event.data ?? null,
              error: (_, event) => event.error,
            }),
          },
        },
      },
    },
    on: {
      UPDATE_DATA: {
        actions: assign({
          boards: (_, event) => event.data ?? null,
          error: (_, event) => event.error,
        }),
      },
    },
  },
  {
    services: {
      addBoard: (_, event) => {
        return createBoardAPI(event.data)
      },
      deleteBoard: (_, event) => {
        return deleteBoardAPI(event.data.id)
      },
      updateBoard: (context, event) => {
        return mutate(getBoardsPath(), updateFunction(context.boards, event.data), {
          optimisticData: () => {
            if (!context.boards) return null

            return context.boards.map((item) => {
              if (item.id === event.data.id) {
                return event.data
              }
              return item
            })
          },
          rollbackOnError: true,
        })
      },
    },
  },
)

const updateFunction = async (data: Board[] | null, board: Board) => {
  if (!data) return null
  const updated = await updateBoardAPI(board)

  if (data) {
    const index = data.findIndex((item) => item.id === updated.id)
    if (index !== -1) {
      data[index] = updated
    }
  }

  return data
}
