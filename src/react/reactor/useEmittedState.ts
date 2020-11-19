import { useEffect, useState } from "react";
import { ReactorEvent, useReactor } from "./Reactor";

export function useEmittedState<T>(
  actionType: ReactorEvent<T>,
  callback?: (action: T) => void
): T | undefined {
  const reactor = useReactor();
  const [state, setState] = useState(() => reactor.getLast(actionType));
  useEffect(() => {
    return reactor.listen(actionType, event => {
      if (event != state) {
        setState(event);
        callback?.(event);
      }
    });
  }, [reactor]);

  return state;
}
