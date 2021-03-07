import { Union } from "./Union";

export type Payload<
  T extends Record<string, object>,
  U extends object = {},
  P extends string = "type"
> = Union<{ [K in keyof T]: Record<P, K> & T[K] & U }>;
