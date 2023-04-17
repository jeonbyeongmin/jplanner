import { createActorContext } from '@xstate/react'
import { boardMachine } from '@/machines/board/board-machine'

export const BoardActorContext = createActorContext(boardMachine, { devTools: true })

interface GlobalStateProviderProps {
  children: React.ReactNode
}

export const GlobalStateProvider = ({ children }: GlobalStateProviderProps) => {
  return <BoardActorContext.Provider>{children}</BoardActorContext.Provider>
}
