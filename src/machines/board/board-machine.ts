import { getBoardsPath } from '@/api/board/get-board'
import { CreateBoardParams, createBoardAPI } from '@/api/board/create-board'
import { deleteBoardAPI } from '@/api/board/delete-board'
import { UpdateBoardParams, updateBoardAPI } from '@/api/board/update-board'
import { assign, createMachine } from 'xstate'
import { Board } from '@/types/board.type'
import { mutate } from 'swr'

const schema = {
  context: {} as {
    boards: Board[] | null
    error: any
  },

  events: {} as
    | {
        type: 'UPDATE_DATA'
        payload: Board[] | undefined
        error: any
      }
    | {
        type: 'ADD_BOARD'
        payload: CreateBoardParams
        navigateToBoard: (boardID: string) => Promise<boolean>
      }
    | {
        type: 'DELETE_BOARD'
        payload: { id: string }
        navigateToBoard: (boardID: string) => Promise<boolean>
      }
    | {
        type: 'UPDATE_BOARD'
        payload: UpdateBoardParams
      },

  services: {} as {
    addBoardActor: {
      data: Board | null | undefined
    }
    deleteBoardActor: {
      data: Board[] | null | undefined
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
          const compare = (a: Board, b: Board) => {
            if (b.updatedAt === a.updatedAt) {
              return b.createdAt - a.createdAt
            }
            return b.updatedAt - a.updatedAt
          }

          return event.payload?.sort(compare) ?? null
        },
        error: (_, event) => event.error,
      }),
    },
    services: {
      addBoardActor: async (_, event) => {
        const data = await createBoard(event.payload)
        event.navigateToBoard(data.id)
        mutate(getBoardsPath())
        return data
      },
      updateBoardActor: (context, event) => {
        return mutate(getBoardsPath(), updateBoard(context.boards, event.payload), {
          optimisticData: () => {
            if (!context.boards) {
              return null
            }
            return context.boards.map((item) => {
              if (item.id === event.payload.id) {
                return event.payload
              }
              return item
            })
          },
          rollbackOnError: true,
        })
      },
      deleteBoardActor: async (context, event) => {
        return mutate(getBoardsPath(), deleteBoard(context.boards, event.payload.id), {
          optimisticData: () => {
            if (!context.boards) {
              return null
            }

            const newBoards = context.boards.filter((item) => item.id !== event.payload.id)
            event.navigateToBoard(newBoards[0]?.id ?? '')

            return newBoards
          },
          rollbackOnError: true,
        })
      },
    },
  },
)

const createBoard = async (board: CreateBoardParams): Promise<Board> => {
  const createdBoard = await createBoardAPI(board)
  return createdBoard
}

const updateBoard = async (boards: Board[] | null, board: UpdateBoardParams) => {
  if (!boards) return null
  const updatedBoard = await updateBoardAPI(board)

  if (boards) {
    const index = boards.findIndex((item) => item.id === updatedBoard.id)
    if (index !== -1) {
      boards[index] = updatedBoard
    }
  }

  return boards
}

const deleteBoard = async (boards: Board[] | null, id: string) => {
  if (!boards) return null
  await deleteBoardAPI({ id })

  return boards.filter((item) => item.id !== id)
}
