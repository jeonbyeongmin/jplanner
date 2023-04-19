export type DeleteBoardParams = {
  id: string;
};

export const deleteBoardPath = (id: string) => `http://localhost:4000/board/${id}`;

export const deleteBoardAPI = async ({ id }: DeleteBoardParams) => {
  const response = await fetch(deleteBoardPath(id), {
    method: 'DELETE',
  });

  const data = await response.json();
  return data;
};
