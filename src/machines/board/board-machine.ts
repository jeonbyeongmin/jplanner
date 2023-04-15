import { deleteBoardAPI } from '@/api/board/delete-board'
import { Board } from '@/types/board.type'
import { assign, createMachine } from 'xstate'

const schema = {
  context: {} as { boards: Board[] | null; error: any },
  events: {} as
    | { type: 'UPDATE_DATA'; data: Board[]; error: any }
    | { type: 'ADD_BOARD'; data: Board }
    | { type: 'DELETE_BOARD'; data: { id: string } }
    | { type: 'UPDATE_BOARD'; data: Board },
  services: {} as {
    deleteBoard: {
      data: { id: string }
    }
  },
}

export const boardMachine = createMachine(
  {
    tsTypes: {} as import('./board-machine.typegen').Typegen0,
    schema,
    id: 'boards',
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
              boards: (_, event) => event.data,
              error: (_, event) => event.error,
            }),
          },
        },
      },
      waiting: {
        on: {
          // ADD_BOARD: 'adding',
          DELETE_BOARD: 'deleting',
          // UPDATE_BOARD: 'updating',
        },
      },
      // adding: {
      // invoke: {
      //   src: createBoardAPI,
      //   onDone: {
      //     target: 'waiting',
      //     actions: 'addBoard',
      //   },
      //   onError: 'failure',
      // },
      // },
      deleting: {
        invoke: {
          src: 'deleteBoard',
          onDone: {
            target: 'waiting',
          },
          onError: 'failure',
        },
      },
      // updating: {},
      failure: {
        on: {
          UPDATE_DATA: {
            target: 'waiting',
            actions: assign({
              boards: (_, event) => event.data,
              error: (_, event) => event.error,
            }),
          },
        },
      },
    },
    on: {
      UPDATE_DATA: {
        actions: assign({
          boards: (_, event) => event.data,
        }),
      },
    },
  },
  {
    services: {
      deleteBoard: (context, event) => {
        return deleteBoardAPI(event.data.id)
      },
    },
  },
)
