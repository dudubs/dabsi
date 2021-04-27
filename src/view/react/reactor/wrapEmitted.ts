import { Defined } from "@dabsi/common/typings2/Defined";
import { Emittable, EmittableType } from "@dabsi/view/react/reactor/Reactor";
import { ReactorListener } from "@dabsi/view/react/reactor/ReactorListener";
import { ReactWrapper } from "@dabsi/view/react/ReactWrapper";
import React from "react";

const useContext = ReactWrapper.createContext(() => {
  const builders: ((listener: ReactorListener) => void)[] = [];
  const deps: any[] = [];
  ReactWrapper.push(element => {
    return React.createElement(ReactorListener, {
      listen: listener => {
        builders.forEach(builder => {
          builder(listener);
        });
      },
      children: element,
    });
  });
  return { builders, deps };
});

export function wrapEmitted<T extends Emittable<any>>(
  emittable: T,
  callback: (
    event: Defined<EmittableType<T>>
  ) => EmittableType<T> | void | undefined,
  deps: any[] = []
) {
  const context = useContext();
  context.builders.push(listener => {
    listener.bind(emittable, callback);
  });
  context.deps.push(emittable, ...deps);
}
