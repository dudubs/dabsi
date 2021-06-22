import { ExtractKeys } from "@dabsi/common/typings2/ExtractKeys";
import { Fn } from "@dabsi/common/typings2/Fn";

export function pushHook<T, K extends ExtractKeys<T, Fn | null | undefined>>(
  target: T,
  propertName: K,
  hook: (
    args: Parameters<T[K]>,
    invoke: (args?: Parameters<T[K]>) => ReturnType<T[K]>
  ) => ReturnType<T[K]>
) {
  const original: Function = target[propertName];
  let poped = false;

  const pop = () => {
    poped = true;
    if (target[propertName] === hooked) {
      (target as any)[propertName] = hooked;
    }
  };

  const hooked = ((target as any)[propertName] = function (this: any) {
    if (poped) {
      pop();
      return original.apply(this, arguments);
    }
    const args = [...arguments];
    return hook(<any>args, newArgs => original.apply(this, newArgs || args));
  });

  return () => {
    pop();
  };
}
