import { Fn } from "./Fn";

export type Call<T extends Fn> = (
  thisArg: any,
  ...args: Parameters<T>
) => ReturnType<T>;
