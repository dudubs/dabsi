import { ExtractKeys } from "@dabsi/common/typings2/ExtractKeys";

export type OmitByValue<T, V> = Omit<T, ExtractKeys<T, V>>;
