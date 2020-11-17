export type Awaitable<T = any> = Promise<T> | T;
export type Awaited<T extends Awaitable> = T extends Awaitable<infer U>
  ? U
  : never;
