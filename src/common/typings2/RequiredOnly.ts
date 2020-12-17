import { RequiredKeys } from "@dabsi/common/typings2/RequiredKeys";

export type RequiredOnly<T> = Pick<T, RequiredKeys<T>>;
