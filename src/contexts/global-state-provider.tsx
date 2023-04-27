import { BoardActorProvider } from '@/contexts/board-actor-provider';
import { BoardIDProvider } from '@/contexts/board-id-provider';

interface Props {
  children: React.ReactNode;
}

export const GlobalStateProvider = ({ children }: Props) => {
  return (
    <BoardIDProvider>
      <BoardActorProvider>{children}</BoardActorProvider>
    </BoardIDProvider>
  );
};
