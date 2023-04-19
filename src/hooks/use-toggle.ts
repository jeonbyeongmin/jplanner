import { useBoolean } from '@/hooks/use-boolean';

type UseToggleReturn = [boolean, () => void];

export function useToggle(defaultValue = false): UseToggleReturn {
  const [current, { toggle }] = useBoolean(defaultValue);
  return [current, toggle];
}
