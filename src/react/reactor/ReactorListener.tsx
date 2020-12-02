import { createElement, ReactNode, useMemo } from "react";
import { Constructor } from "../../common/typings2/Constructor";
import { Defined } from "../../common/typings2/Defined";
import { ReactorContext, useReactor } from "./hooks";
import { Emittable, EmittableType, Reactor } from "./Reactor";

export function ReactorListener<T extends Emittable<any>>({
  emittable: { id: emittableId },
  children,
  onEvent,
}: {
  emittable: T;
  children: ReactNode;
  onEvent(event: Defined<EmittableType<T>>, emittable: T): void;
}) {
  const reactor = useReactor();

  return createElement(ReactorContext.Provider, {
    value: useMemo(() => {
      return new Reactor((event, emittable) => {
        if (emittable.id === emittableId) {
          onEvent(event, emittable as T);
          return false;
        } else {
          reactor.emit(emittable, event);
        }
      });
    }, [reactor]),
    children,
  });
}
