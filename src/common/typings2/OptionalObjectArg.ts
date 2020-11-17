import { IsNever } from "./boolean/IsNever";
import { NeverKeys } from "./NeverKeys";
import { Union } from "./Union";

export type OptionalObjectArg<T> = IsNever<Union<T>> extends true
  ? []
  : [Omit<T, NeverKeys<T>>];
