import { useAsync } from "react-async-hook";
import { Awaitable } from "../common/typings2/Async";

export function useLoader<T, S>(
  callback: () => Awaitable<T>,
  deps: any[] = []
): T | undefined {
  const result = useAsync<T>(async () => await callback(), deps);

  switch (result.status) {
    case "error":
      throw result.error;
    case "success":
      return result.result;
  }
}
