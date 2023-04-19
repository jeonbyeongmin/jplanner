import { useBoolean } from '@/hooks/use-boolean'
import { act, renderHook } from '@testing-library/react'

describe('useBoolean', () => {
  describe('초기값 테스트', () => {
    it('`defaultValue`가 `true`일 때, `true`를 반환한다.', () => {
      const { result } = renderHook(() => useBoolean(true))
      const [bool] = result.current

      expect(bool).toBe(true)
    })

    it('`defaultValue`가 `false`일 때, `false`를 반환한다.', () => {
      const { result } = renderHook(() => useBoolean(false))
      const [bool] = result.current

      expect(bool).toBe(false)
    })

    it('`defaultValue`가 `undefined`일 때, `false`를 반환한다.', () => {
      const { result } = renderHook(() => useBoolean())
      const [bool] = result.current

      expect(bool).toBe(false)
    })
  })

  describe('반환 값 테스트', () => {
    it('`bool`의 타입은 boolean이다.', () => {
      const { result } = renderHook(() => useBoolean())
      const [bool] = result.current

      expect(typeof bool).toBe('boolean')
    })
    it('`setTrue`의 타입은 function이다', () => {
      const { result } = renderHook(() => useBoolean())
      const [, { setTrue }] = result.current

      expect(typeof setTrue).toBe('function')
    })

    it('`setFalse`의 타입은 function이다', () => {
      const { result } = renderHook(() => useBoolean())
      const [, { setFalse }] = result.current

      expect(typeof setFalse).toBe('function')
    })

    it('`toggle`의 타입은 function이다', () => {
      const { result } = renderHook(() => useBoolean())
      const [, { toggle }] = result.current

      expect(typeof toggle).toBe('function')
    })
  })

  it('`setTrue`를 호출하면 `true`를 반환한다.', () => {
    const { result } = renderHook(() => useBoolean(false))
    const [, { setTrue }] = result.current

    act(setTrue)

    const [bool] = result.current

    expect(bool).toBe(true)
  })

  it('`setFalse`를 호출하면 `false`를 반환한다.', () => {
    const { result } = renderHook(() => useBoolean(true))
    const [, { setFalse }] = result.current

    act(setFalse)

    const [bool] = result.current

    expect(bool).toBe(false)
  })

  it('`toggle`를 호출하면 반대 값을 반환한다.', () => {
    const { result } = renderHook(() => useBoolean(true))
    const [, { toggle }] = result.current

    {
      act(toggle)

      const [bool] = result.current

      expect(bool).toBe(false)
    }

    {
      act(toggle)

      const [bool] = result.current

      expect(bool).toBe(true)
    }
  })
})
