import { AwaitedReturnValue } from "@dabsi/common/typings2/Async";
import { Fn } from "@dabsi/common/typings2/Fn";
import Debounce from "./Debounce";

export default function withDebounce<T extends Fn>(
  ms: number,
  callback: T
): (...args: Parameters<T>) => Promise<AwaitedReturnValue<T> | undefined> {
  const debounce = new Debounce(ms);
  return async function (this: any) {
    if (await debounce.wait()) {
      return callback.call(this, arguments);
    }
  };
}
