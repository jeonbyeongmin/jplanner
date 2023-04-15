export const getBoardsPath = () => 'http://localhost:4000/board'

export const getBoardsAPI = async () => {
  const response = await fetch(getBoardsPath())
  const data = await response.json()
  return data
}
