import { getBoardsPath } from '@/api/board/get-board'
import { CreateBoardDTO, createBoardAPI } from '@/api/board/create-board'
import { deleteBoardAPI } from '@/api/board/delete-board'
import { UpdateBoardDTO, updateBoardAPI } from '@/api/board/update-board'
import { assign, createMachine } from 'xstate'
import { Board } from '@/types/board.type'
import { mutate } from 'swr'

const schema = {
  context: {} as {
    boards: Board[] | null
    error: any
  },

  events: {} as
    | { type: 'UPDATE_DATA'; data: Board[] | undefined; error: any }
    | { type: 'ADD_BOARD'; data: CreateBoardDTO; navigateToBoard: (boardID: string) => Promise<boolean> }
    | { type: 'DELETE_BOARD'; data: { id: string } }
    | { type: 'UPDATE_BOARD'; data: UpdateBoardDTO },

  services: {} as {
    addBoardActor: {
      data: Board | null | undefined
    }
    deleteBoardActor: {
      data: { id: string }
    }
    updateBoardActor: {
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
      deleting: {
        invoke: {
          src: 'deleteBoardActor',
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
      failure: {
        entry: assign({
          error: (_, event) => event.data,
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
        boards: (_, event) => event.data?.sort((a, b) => b.createdAt - a.createdAt) ?? null,
        error: (_, event) => event.error,
      }),
    },
    services: {
      addBoardActor: async (_, event) => {
        const data = await createBoard(event.data)
        mutate(getBoardsPath())
        event.navigateToBoard(data.id)
        return data
      },
      deleteBoardActor: (_, event) => {
        return deleteBoardAPI(event.data.id)
      },
      updateBoardActor: (context, event) => {
        return mutate(getBoardsPath(), updateBoard(context.boards, event.data), {
          optimisticData: () => {
            if (!context.boards) {
              return null
            }
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

const createBoard = async (board: CreateBoardDTO): Promise<Board> => {
  const createdBoard = await createBoardAPI(board)
  return createdBoard
}

const updateBoard = async (data: Board[] | null, board: UpdateBoardDTO) => {
  if (!data) return null
  const updatedBoard = await updateBoardAPI(board)

  if (data) {
    const index = data.findIndex((item) => item.id === updatedBoard.id)
    if (index !== -1) {
      data[index] = updatedBoard
    }
  }

  return data
}
