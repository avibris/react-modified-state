import { useCallback, useState } from "react";

const useModifiedState = <T>(
  initialState: T | (() => T)
): [T, (newState: ((state: T) => Partial<T>) | Partial<T>) => void] => {
  const [state, setState] = useState<T>(initialState);

  const dispatch = useCallback(
    (newState: ((state: T) => Partial<T>) | Partial<T>) => {
      setState((state) => ({
        ...state,
        ...(typeof newState === "function" ? newState(state) : newState),
      }));
    },
    [setState]
  );

  return [state, dispatch];
};

export default useModifiedState;
