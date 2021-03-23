import { Payload } from "@dabsi/common/typings2/Payload";
import { Emittable } from "@dabsi/view/react/reactor/Reactor";
import { useEmitter } from "@dabsi/view/react/reactor/useEmitter";
import React, { useEffect } from "react";

export type Loader = { load(promise: Promise<any>): void };

let counter = 0;

export const LoaderEvent = Emittable<
  Payload<
    {
      start: {};
      end: {};
    },
    { id: number }
  >
>();

export function useLoader<T>(
  callback: () => Promise<T>,
  deps: any[] = [],
  onLoad?: (value: T) => void
): T | null {
  const emit = useEmitter();

  const [state, setState] = React.useState<{ result: T } | { error } | null>(
    null
  );

  useEffect(() => {
    const id = ++counter;

    emit(LoaderEvent, { type: "start", id });

    callback()
      .then(result => {
        emit(LoaderEvent, { type: "end", id });

        setState({ result });
        onLoad?.(result);
      })
      .catch(error => {
        setState({ error });
      });
  }, deps);

  if (state) {
    if ("error" in state) return state.error;
    return state.result;
  }
  return null;
}
