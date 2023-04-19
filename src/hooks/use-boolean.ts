import { useCallback, useState } from 'react';

export function useBoolean(defaultValue = false): [
  boolean,
  {
    setTrue: () => void;
    setFalse: () => void;
    toggle: () => void;
  },
] {
  const [bool, setBool] = useState(defaultValue);

  const setTrue = useCallback(() => {
    setBool(true);
  }, []);

  const setFalse = useCallback(() => {
    setBool(false);
  }, []);

  const toggle = useCallback(() => {
    setBool((prev) => !prev);
  }, []);

  return [bool, { setTrue, setFalse, toggle }];
}
