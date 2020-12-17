import { useEffect } from "react";
import { Defined } from "@dabsi/common/typings2/Defined";
import { useReactor } from "@dabsi/react/reactor/hooks";
import { Emittable, EmittableType, ReactorEvent } from "@dabsi/react/reactor/Reactor";

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
