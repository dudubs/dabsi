import { ExtractKeys } from "./ExtractKeys";

export type PickByValue<T, V> = Pick<T, ExtractKeys<T, V>>;
