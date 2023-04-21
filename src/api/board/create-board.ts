export type CreateBoardParams = {
  title: string;
};

export const createBoardPath = () => 'http://127.0.0.1:4000/board';

export const createBoardAPI = async (board: CreateBoardParams) => {
  const response = await fetch(createBoardPath(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(board),
  });
  const data = await response.json();
  return data;
};
