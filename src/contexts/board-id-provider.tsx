import { useRouter } from 'next/router';
import { createContext, useMemo } from 'react';

export const BoardIDContext = createContext<string>('');

interface Props {
  children: React.ReactNode;
}

export const BoardIDProvider = ({ children }: Props) => {
  const router = useRouter();

  const queries = useMemo(() => router.query['board-id'], [router.query]);

  const boardID = useMemo(() => {
    return Array.isArray(queries) ? queries[0] : queries ?? '';
  }, [queries]);

  return (
    <BoardIDContext.Provider value={boardID}>
      {children}
    </BoardIDContext.Provider>
  );
};
