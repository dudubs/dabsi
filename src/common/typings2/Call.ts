import { Fn } from "@dabsi/common/typings2/Fn";

export type Call<T extends Fn> = (
  thisArg: any,
  ...args: Parameters<T>
) => ReturnType<T>;
