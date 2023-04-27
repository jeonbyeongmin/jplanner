import { BoardActorContext } from '@/contexts/board-actor-provider';
import { useBoardID } from '@/hooks/use-board-id';

export function useBoard() {
  const boardID = useBoardID();

  const boards = BoardActorContext.useSelector((state) => state.context.boards);

  const board = BoardActorContext.useSelector((state) =>
    state.context.boards?.find((b) => b.id === boardID),
  );

  return { boardID, boards, board };
}
