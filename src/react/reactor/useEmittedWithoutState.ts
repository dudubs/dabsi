import { useEffect } from "react";
import { useReactor } from "./hooks";
import { ReactorEvent } from "./Reactor";

export function useEmittedWithoutState<T>(
  actionType: ReactorEvent<T>,
  callback?: (action: T) => void,
  deps: any[] = []
): void {
  const reactor = useReactor();
  useEffect(() => {
    return reactor.listen(actionType, event => {
      console.log({ event });
      callback?.(event);
    });
  }, [reactor, ...deps]);
}
