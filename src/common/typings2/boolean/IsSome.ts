import { And } from "@dabsi/common/typings2/boolean/And";
import { Is } from "@dabsi/common/typings2/boolean/Is";

export type IsSome<T, U> = And<Is<T, U>, Is<U, T>>;
