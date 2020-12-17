import { MetaType, WithMetaType } from "@dabsi/common/MetaType";
import { If, IsUndefined } from "@dabsi/common/typings2/boolean";
import { Is } from "@dabsi/common/typings2/boolean/Is";
import { Expect } from "@dabsi/common/typings2/Expect";
import { ExtractKeys } from "@dabsi/common/typings2/ExtractKeys";
import { Fn } from "@dabsi/common/typings2/Fn";
import { Nullable } from "@dabsi/common/typings2/Nullable";
import { OmitKeys } from "@dabsi/common/typings2/OmitKeys";
import {
  PartialUndefinedKeys,
  PartialKeys,
} from "@dabsi/common/typings2/PartialUndefinedKeys";
import { PickByValue } from "@dabsi/common/typings2/PickByValue";
import { Pluck } from "@dabsi/common/typings2/Pluck";
import { RequiredKeys } from "@dabsi/common/typings2/RequiredKeys";
import { Union } from "@dabsi/common/typings2/Union";
import { GetBaseType } from "@dabsi/typedata/BaseType";
import { Exp } from "@dabsi/typedata/data-exp/ExpTranslator";
import {
  DataRelation,
  DataRelationKeys,
  DataRelationToManyKeys,
  DataRelationToOneKeys,
} from "@dabsi/typedata/DataRelation";

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
