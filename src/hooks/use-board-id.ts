import { useContext } from 'react';

import { BoardIDContext } from '@/contexts/board-id-provider';

export function useBoardID() {
  const boardID = useContext(BoardIDContext);
  return boardID;
}
