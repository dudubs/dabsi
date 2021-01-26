import { HasKeys } from "@dabsi/common/typings2/boolean";
import { Type } from "@dabsi/common/typings2/Type";
import { Union } from "@dabsi/common/typings2/Union";
import { BaseTypeKey, WithBaseType } from "@dabsi/typedata/BaseType";
import { DataKey, WithDataKey } from "@dabsi/typedata/key";
import { DataSourceRow } from "@dabsi/typedata/sourceRow";
import {
  DataTypeMetaKey,
  WithDataUnionMetaChildren,
  DataUnionMetaChildrenKey,
} from "@dabsi/typedata/union";
import {
  IfRelationToOne,
  MapRelation,
  DataRelationKeys,
  DataRelationTypeAt,
} from "@dabsi/typedata/relation";

type _Children<Children> = {
  [K in keyof Children]: Record<DataKey, string> &
    Record<DataTypeMetaKey, K> &
    DataRow<Children[K]>;
};

export type _NoChildren<T> = DataSourceRow &
  Omit<T, DataUnionMetaChildrenKey | DataRelationKeys<T> | BaseTypeKey> &
  WithBaseType<T> &
  WithDataKey &
  {
    [K in DataRelationKeys<T>]:
      | MapRelation<T[K], DataRow<DataRelationTypeAt<T, K>>>
      | IfRelationToOne<T[K], undefined>;
  };

export type DataRow<T> = T extends WithDataUnionMetaChildren<infer Children>
  ? HasKeys<Children> extends true
    ? Union<_Children<Children>>
    : _NoChildren<T>
  : _NoChildren<T>;

export function DataRow<T>(type: Type<T>): new () => DataRow<T> {
  return type as any;
}
