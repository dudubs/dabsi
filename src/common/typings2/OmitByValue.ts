import { ExtractKeys } from "./ExtractKeys";

export type OmitByValue<T, V> = Omit<T, ExtractKeys<T, V>>;
