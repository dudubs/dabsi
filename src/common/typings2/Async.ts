import { Fn } from "./Fn";

export type Awaitable<T = any> = Promise<T> | T;
export type Awaited<T extends Awaitable> = T extends Awaitable<infer U>
  ? U
  : never;

export type ToAwaitable<T extends Fn> = (
  ...args: Parameters<T>
) => Awaitable<Awaited<ReturnType<T>>>;
