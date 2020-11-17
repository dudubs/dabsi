import { Union } from "./Union";

export type Payload<
  T extends Record<string, object>,
  U extends object = {}
> = Union<{ [K in keyof T]: { type: K } & T[K] & U }>;
