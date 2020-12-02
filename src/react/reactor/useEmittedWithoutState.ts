import { useEffect } from "react";
import { Defined } from "../../common/typings2/Defined";
import { useReactor } from "./hooks";
import { Emittable, EmittableType, ReactorEvent } from "./Reactor";

export function useEmittedWithoutState<T extends Emittable<any>>(
  emittable: T,
  callback?: (event: Defined<EmittableType<T>>, emittable: T) => void,
  deps: any[] = []
): void {
  const reactor = useReactor();
  useEffect(() => {
    return reactor.listen(emittable, event => {
      if (event !== undefined) callback?.(event, emittable);
    });
  }, [reactor, ...deps]);
}
