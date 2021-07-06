import {
  DataRelationKeys,
  DataRelationToOneKeys,
} from "@dabsi/typedata/relation";
import { RebaseType } from "./BaseType";

//
/*
TODO:
  - for number column:
    
  {$insert: {

      xxx

  }}

  User.insert({

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

export type DataUpdateRow<T> = DataValue<RebaseType<T>>;
// TODO: relations can me also {$key}
export type DataInsertRow<T> = DataValue<RebaseType<T>>;
export type DataCommitRow<T> = DataValue<RebaseType<T>>;
