import { Board } from '@/types/board.type'

export const updateBoardPath = (id: string) => `http://localhost:4000/board/${id}`

export const updateBoardAPI = async (board: Board) => {
  const response = await fetch(updateBoardPath(board.id), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(board),
  })
  const data = await response.json()
  return data
}
