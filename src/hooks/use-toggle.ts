import { toggleMachine } from '@/machines/utils/toggle-machine'
import { useMachine } from '@xstate/react'
import { useCallback, useMemo } from 'react'

export function useToggle(): [boolean, () => void] {
  const [current, send] = useMachine(toggleMachine)

  const active = useMemo(() => {
    return current.matches('active')
  }, [current])

  const handleToggle = useCallback(() => {
    send('TOGGLE')
  }, [send])

  return [active, handleToggle]
}
