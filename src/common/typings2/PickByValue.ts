import { ExtractKeys } from "@dabsi/common/typings2/ExtractKeys";

export type PickByValue<T, V> = Pick<T, ExtractKeys<T, V>>;
