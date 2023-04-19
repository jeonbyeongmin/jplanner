import { useCallback, useState } from 'react'

type UseBooleanReturn = [
  boolean,
  {
    setTrue: () => void
    setFalse: () => void
    toggle: () => void
  },
]

export function useBoolean(defaultValue = false): UseBooleanReturn {
  const [bool, setBool] = useState(defaultValue)

  const setTrue = useCallback(() => {
    setBool(true)
  }, [])

  const setFalse = useCallback(() => {
    setBool(false)
  }, [])

  const toggle = useCallback(() => {
    setBool((prev) => !prev)
  }, [])

  return [bool, { setTrue, setFalse, toggle }]
}
