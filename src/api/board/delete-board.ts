export const deleteBoardPath = (id: string) => `http://localhost:4000/board/${id}`

export const deleteBoardAPI = async (id: string) => {
  const response = await fetch(deleteBoardPath(id), {
    method: 'DELETE',
  })
  const data = await response.json()
  return data
}
