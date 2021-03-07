import { useEffect } from "react";

export function useBodyListener<K extends keyof HTMLElementEventMap>(
  event: K,
  callback: (event: HTMLElementEventMap[K]) => void,
  deps: any[]
) {
  useEffect(() => {
    document.body.addEventListener(event, callback);
    return () => {
      document.body.removeEventListener(event, callback);
    };
  }, deps);
}
