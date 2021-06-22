import { Payload } from "@dabsi/common/typings2/Payload";

import React, { useEffect } from "react";

export type Loader = { load(promise: Promise<any>): void };

let counter = 0;

export function useLoader<T>(
  callback: () => Promise<T>,
  deps: any[] = [],
  onLoad?: (value: T) => void
): [T | null, (value: T) => void] {
  const [state, setState] = React.useState<{ result: T } | { error } | null>(
    null
  );

  const setValue = value => setState({ result: value });
  useEffect(() => {
    callback()
      .then(result => {
        setState({ result });
        onLoad?.(result);
      })
      .catch(error => {
        setState({ error });
      });
  }, deps);

  if (state) {
    if ("error" in state) return state.error;
    return [state.result, setValue];
  }
  return [null, setValue];
}
