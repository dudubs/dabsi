import { RequiredKeys } from "./RequiredKeys";

export type RequiredOnly<T> = Pick<T, RequiredKeys<T>>;
