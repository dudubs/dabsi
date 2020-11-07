import { GetBaseType } from "./BaseType";
import { RelationKeys, RelationToOneKeys } from "./Relation";

// TODO: RelationToManyKeys

export type _DataValues<T> = {
  [K in RelationToOneKeys<T>]?: string | number | null;
} &
  {
    [K in Exclude<keyof T, RelationKeys<T>>]?: T[K] | null;
  };

export type DataValues<T> = _DataValues<GetBaseType<T>>;
