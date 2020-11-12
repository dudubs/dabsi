import { GetBaseType } from "./BaseType";
import { RelationKeys, RelationToOneKeys } from "./Relation";

//
/*
TODO:
  - for number column:
    on update: {$add: number}
 */

type _Base<T> = {
  [K in RelationToOneKeys<T>]?: string | number | null;
} &
  {
    [K in Exclude<keyof T, RelationKeys<T>>]?: T[K] | null;
  };

export type DataUpdate<T> = _Base<GetBaseType<T>>;
// TODO: relations can me also {$key}
export type DataInsert<T> = _Base<GetBaseType<T>>;
