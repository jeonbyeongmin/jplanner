import { useRouter } from 'next/router';
import { createContext } from 'react';

export const BoardIDContext = createContext<string>('');

interface Props {
  children: React.ReactNode;
}

export const BoardIDProvider = ({ children }: Props) => {
  const router = useRouter();
  const queries = router.query['board-id'];
  const boardID = Array.isArray(queries) ? queries[0] : queries ?? '';

  return (
    <BoardIDContext.Provider value={boardID}>
      {children}
    </BoardIDContext.Provider>
  );
};
