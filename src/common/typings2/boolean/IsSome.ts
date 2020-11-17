import { And } from "./And";
import { Is } from "./Is";

export type IsSome<T, U> = And<Is<T, U>, Is<U, T>>;
