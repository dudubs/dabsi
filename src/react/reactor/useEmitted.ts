import { useEffect } from "react";
import { ReactorEvent, useReactor } from "./Reactor";

export function useEmitted<T>(
  actionType: ReactorEvent<T>,
  callback?: (action: T) => void,
  deps: any[] = []
): void {
  const reactor = useReactor();
  useEffect(() => {
    return reactor.listen(actionType, event => {
      callback?.(event);
    });
  }, [reactor, ...deps]);
}
