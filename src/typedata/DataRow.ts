import { HasKeys, Union } from "../common/typings";
import { BaseTypeKey, WithBaseType } from "./BaseType";
import { DataKey, WithDataKey } from "./DataKey";
import { DataSourceRow } from "./DataSourceRow";
import {
  DataTypeKey,
  DataUnionChildren,
  DataUnionChildrenKey,
} from "./DataUnion";
import { MapRelation, RelationKeys, RelationTypeAt } from "./Relation";

type _Children<Children> = {
  [K in keyof Children]: Record<DataKey, string> &
    Record<DataTypeKey, K> &
    DataRow<Children[K]>;
};

export type _NoChildren<T> = DataSourceRow &
  Omit<T, DataUnionChildrenKey | RelationKeys<T> | BaseTypeKey> &
  WithBaseType<T> &
  WithDataKey &
  {
    [K in RelationKeys<T>]: MapRelation<T[K], DataRow<RelationTypeAt<T, K>>>;
  };

export type DataRow<T> = T extends DataUnionChildren<infer Children>
  ? HasKeys<Children> extends true
    ? Union<_Children<Children>>
    : _NoChildren<T>
  : _NoChildren<T>;
