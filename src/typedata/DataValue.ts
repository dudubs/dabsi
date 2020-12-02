import { MetaType, WithMetaType } from "../common/MetaType";
import { If, IsUndefined } from "../common/typings2/boolean";
import { Is } from "../common/typings2/boolean/Is";
import { Expect } from "../common/typings2/Expect";
import { ExtractKeys } from "../common/typings2/ExtractKeys";
import { Fn } from "../common/typings2/Fn";
import { Nullable } from "../common/typings2/Nullable";
import { OmitKeys } from "../common/typings2/OmitKeys";
import {
  PartialUndefinedKeys,
  PartialKeys,
} from "../common/typings2/PartialUndefinedKeys";
import { PickByValue } from "../common/typings2/PickByValue";
import { Pluck } from "../common/typings2/Pluck";
import { RequiredKeys } from "../common/typings2/RequiredKeys";
import { Union } from "../common/typings2/Union";
import { GetBaseType } from "./BaseType";
import { Exp } from "./data-exp/ExpTranslator";
import {
  DataRelation,
  DataRelationKeys,
  DataRelationToManyKeys,
  DataRelationToOneKeys,
} from "./DataRelation";

//
/*
TODO:
  - for number column:
    on update: {$inc: number}
 */

type NotRelationKeys<T> = Exclude<keyof T, DataRelationKeys<T>>;

type _Base<T> = {
  [K in DataRelationToOneKeys<T>]?: string | number | null;
} &
  {
    [K in NotRelationKeys<T>]?: T[K] | null;
  };

export type DataUpdate<T> = _Base<GetBaseType<T>>;
// TODO: relations can me also {$key}
export type DataInsert<T> = _Base<GetBaseType<T>>;
