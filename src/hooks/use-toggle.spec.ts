import { useToggle } from '@/hooks/use-toggle';
import { act, renderHook } from '@testing-library/react';

describe('useToggle', () => {
  describe('초기 값 테스트', () => {
    it('`defaultValue`가 `true`일 때, `true`를 반환한다.', () => {
      const { result } = renderHook(() => useToggle(true));
      const [bool] = result.current;

      expect(bool).toBe(true);
    });

    it('`defaultValue`가 `false`일 때, `false`를 반환한다.', () => {
      const { result } = renderHook(() => useToggle(false));
      const [bool] = result.current;

      expect(bool).toBe(false);
    });

    it('`defaultValue`가 `undefined`일 때, `false`를 반환한다.', () => {
      const { result } = renderHook(() => useToggle());
      const [bool] = result.current;

      expect(bool).toBe(false);
    });
  });

  describe('반환 값 테스트', () => {
    it('`bool`의 타입은 boolean이다.', () => {
      const { result } = renderHook(() => useToggle());
      const [bool] = result.current;

      expect(typeof bool).toBe('boolean');
    });
    it('`toggle`의 타입은 function이다', () => {
      const { result } = renderHook(() => useToggle());
      const [, toggle] = result.current;

      expect(typeof toggle).toBe('function');
    });
  });

  it('`toggle`를 호출하면 `true` -> `false`, `false` -> `true`가 된다.', () => {
    const { result } = renderHook(() => useToggle(false));
    const [, toggle] = result.current;

    {
      act(toggle);

      const [bool] = result.current;

      expect(bool).toBe(true);
    }

    {
      act(toggle);

      const [bool] = result.current;

      expect(bool).toBe(false);
    }
  });
});
