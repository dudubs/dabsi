import { GetBaseType } from "@dabsi/typedata/BaseType";
import {
  DataRelationKeys,
  DataRelationToOneKeys,
  DataRelationType,
} from "@dabsi/typedata/DataRelation";

//
/*
TODO:
  - for number column:
    
  {$insert: {

      xxx

  }}

  User.insertKey({

      groups: [
        {$key}, "", {}
      ]

  })


 */

type NotRelationKeys<T> = Exclude<keyof T, DataRelationKeys<T>>;

type _Base<T> = {
  [K in DataRelationToOneKeys<T>]?:
    | string
    | number
    | null
    | undefined
    | { $key: string };
} &
  {
    [K in NotRelationKeys<T>]?: T[K] | null | undefined;
  };

export type DataUpdate<T> = _Base<GetBaseType<T>>;
// TODO: relations can me also {$key}
export type DataInsert<T> = _Base<GetBaseType<T>>;
