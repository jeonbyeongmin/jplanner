import { useBoolean } from '@/hooks/use-boolean';

export function useToggle(defaultValue = false): [boolean, () => void] {
  const [current, { toggle }] = useBoolean(defaultValue);
  return [current, toggle];
}
