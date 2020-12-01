import { useEffect } from "react";
import { useReactor } from "./hooks";
import { Emittable, EmittableType, ReactorEvent } from "./Reactor";

export function useEmittedWithoutState<T extends Emittable<any>>(
  emittable: T,
  callback?: (event: EmittableType<T>, emittable: T) => void,
  deps: any[] = []
): void {
  const reactor = useReactor();
  useEffect(() => {
    return reactor.listen(emittable, event => {
      console.log({ event });
      callback?.(event, emittable);
    });
  }, [reactor, ...deps]);
}
