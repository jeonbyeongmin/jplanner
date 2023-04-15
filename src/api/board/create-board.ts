import { Board } from '@/types/board.type'

export const createBoardPath = () => 'http://localhost:4000/board'

export const createBoardAPI = async (board: Board) => {
  const response = await fetch(createBoardPath(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(board),
  })
  const data = await response.json()
  return data as Board
}
