import { createElement, ReactNode, useMemo } from "react";
import { Constructor } from "../../common/typings2/Constructor";
import { ReactorContext, useReactor } from "./hooks";
import { Reactor } from "./Reactor";

export function ReactorListener<T extends object>({
  eventType,
  children,
  onEvent,
}: {
  eventType: Constructor<T>;
  children: ReactNode;
  onEvent(event: T): void;
}) {
  const parentReactor = useReactor();

  const reactor = useMemo(() => {
    return new Reactor(event => {
      if (event.constructor === eventType) {
        onEvent(event as T);
        return false;
      } else {
        parentReactor.emit(event);
      }
    });
  }, [parentReactor]);

  return createElement(ReactorContext.Provider, {
    value: reactor,
    children,
  });
}
