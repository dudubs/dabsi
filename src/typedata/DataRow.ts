import { HasKeys } from "../common/typings2/boolean";
import { Type } from "../common/typings2/Type";
import { Union } from "../common/typings2/Union";
import { BaseTypeKey, WithBaseType } from "./BaseType";
import { DataKey, WithDataKey } from "./DataKey";
import { DataSourceRow } from "./DataSourceRow";
import {
  DataTypeKey,
  DataUnionChildren,
  DataUnionChildrenKey,
} from "./DataUnion";
import {
  IfRelationToOne,
  MapRelation,
  DataRelationKeys,
  DataRelationTypeAt,
} from "./DataRelation";

type _Children<Children> = {
  [K in keyof Children]: Record<DataKey, string> &
    Record<DataTypeKey, K> &
    DataRow<Children[K]>;
};

export type _NoChildren<T> = DataSourceRow &
  Omit<T, DataUnionChildrenKey | DataRelationKeys<T> | BaseTypeKey> &
  WithBaseType<T> &
  WithDataKey &
  {
    [K in DataRelationKeys<T>]:
      | MapRelation<T[K], DataRow<DataRelationTypeAt<T, K>>>
      | IfRelationToOne<T[K], undefined>;
  };

export type DataRow<T> = T extends DataUnionChildren<infer Children>
  ? HasKeys<Children> extends true
    ? Union<_Children<Children>>
    : _NoChildren<T>
  : _NoChildren<T>;

export function DataRow<T>(type: Type<T>): new () => DataRow<T> {
  return type as any;
}
