import { ReactorContext, useReactor } from "@dabsi/view/react/reactor/hooks";
import {
  Emittable,
  EmittableType,
  Reactor,
} from "@dabsi/view/react/reactor/Reactor";
import React, { createElement } from "react";

export type ReactorListener = {
  bind<T extends Emittable<any>>(
    emittable: T,
    callback: (
      event: EmittableType<T>,
      emittable: T
    ) => void | EmittableType<T> | undefined
  ): ReactorListener;
};

type ReactorListenerProps<T extends Emittable<any>> = {
  listen:
    | [emittable: T, callback: (event: EmittableType<T>) => void]
    | {
        (listener: ReactorListener): void;
      };

  deps?: any[];

  children: React.ReactNode;
};
export function ReactorListener<T extends Emittable<any>>({
  listen,
  deps = [],
  children,
}: ReactorListenerProps<T>): React.ReactElement {
  const parent = useReactor();

  const child = React.useMemo(() => {
    const map = new Map<
      Emittable<any>,
      (event: any, emiitable: Emittable<any>) => any
    >();

    const listener: ReactorListener = {
      bind: (emittable, callback) => {
        const before = map.get(emittable);
        if (before) {
          const after = callback;
          callback = (event, emittable): any => {
            return before(event, emittable) || after(event, emittable);
          };
        }
        map.set(emittable, callback);
        return listener;
      },
    };

    if (typeof listen === "function") {
      listen(listener);
    } else {
      const [emittable, callback] = listen;
      listener.bind(emittable, callback);
    }

    return new Reactor((event, emittable) => {
      const callback = map.get(emittable);
      if (!callback) {
        parent.emit(emittable, event);
      } else {
        event = callback(event, emittable);
        if (event !== undefined) {
          parent.emit(event, emittable);
        }
      }
    });
  }, [parent, typeof listen, ...deps]);

  return createElement(ReactorContext.Provider, {
    value: child,
    children,
  });
}
