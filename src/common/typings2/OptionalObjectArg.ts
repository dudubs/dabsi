import { IsNever } from "./boolean/IsNever";
import { NeverKeys } from "@dabsi/common/typings2/NeverKeys";
import { Union } from "@dabsi/common/typings2/Union";

export type OptionalObjectArg<T> = IsNever<Union<T>> extends true
  ? []
  : [Omit<T, NeverKeys<T>>];
