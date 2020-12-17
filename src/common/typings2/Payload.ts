import { Union } from "@dabsi/common/typings2/Union";

export type Payload<
  T extends Record<string, object>,
  U extends object = {}
> = Union<{ [K in keyof T]: { type: K } & T[K] & U }>;
