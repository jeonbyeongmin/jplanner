export type UpdateBoardParams = {
  id: string;
  title?: string;
};

export const updateBoardPath = (id: string) => `http://localhost:4000/board/${id}`;

export const updateBoardAPI = async (board: UpdateBoardParams) => {
  const response = await fetch(updateBoardPath(board.id), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(board),
  });
  const data = await response.json();
  return data;
};
