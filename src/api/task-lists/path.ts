export const getTaskListsPath = (boardID: string) =>
  `taskLists?boardId=${boardID}`;

export const getTaskListPath = (id: string) => `taskLists/${id}`;
