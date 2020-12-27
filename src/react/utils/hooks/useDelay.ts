import { useMemo } from "react";

export function useDelay(ms): (ca: () => void) => void {
  let id: any | undefined;
  return useMemo(() => {
    return callback => {
      if (id !== undefined) clearTimeout(id);
      id = setTimeout(() => {
        id = undefined;
        callback();
      }, ms);
    };
  }, []);
}
