import { And } from "./And";
import { Is } from "@dabsi/common/typings2/boolean/Is";

export type IsSome<T, U> = And<Is<T, U>, Is<U, T>>;
export type HasOnlyKey<K extends PropertyKey, T> = IsSome<K, keyof T>;
