import { GetBaseType } from "./BaseType";
import {
  DataRelationKeys,
  DataRelationToOneKeys,
  DataRelationType,
} from "@dabsi/typedata/relation";

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

export type DataValue<T> = {
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

export type DataUpdate<T> = DataValue<GetBaseType<T>>;
// TODO: relations can me also {$key}
export type DataInsert<T> = DataValue<GetBaseType<T>>;
