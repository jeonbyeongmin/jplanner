export type CreateBoardDTO = {
  title: string
}

export const createBoardPath = () => 'http://localhost:4000/board'

export const createBoardAPI = async (board: CreateBoardDTO) => {
  const response = await fetch(createBoardPath(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(board),
  })
  const data = await response.json()
  return data
}
