import { HasKeys } from "@dabsi/common/typings2/boolean";
import { Type } from "@dabsi/common/typings2/Type";
import { Union } from "@dabsi/common/typings2/Union";
import { BaseTypeKey, WithBaseType } from "@dabsi/typedata/BaseType";
import { WithDataKey } from "@dabsi/typedata/key";
import {
  DataRelationKeys,
  DataRelationTypeAt,
  IfRelationToOne,
  MapRelation,
} from "@dabsi/typedata/relation";
import { DataSourceRow } from "@dabsi/typedata/sourceRow";
import {
  DataTypeMetaKey,
  DataUnionMetaChildrenKey,
  WithDataUnionMetaChildren,
} from "@dabsi/typedata/union";

type _Children<Children, E> = {
  [K in keyof Children]: WithDataKey &
    Record<DataTypeMetaKey, K> &
    DataRow<Children[K], E>;
};

type _NoChildren<T, E> = DataSourceRow &
  Omit<T, DataUnionMetaChildrenKey | DataRelationKeys<T> | BaseTypeKey> &
  WithBaseType<T> &
  WithDataKey &
  E &
  {
    [K in DataRelationKeys<T>]:
      | MapRelation<T[K], DataRow<DataRelationTypeAt<T, K>, E>>
      | IfRelationToOne<T[K], undefined>;
  };

export type DataRow<T, E = {}> = T extends WithDataUnionMetaChildren<
  infer Children
>
  ? HasKeys<Children> extends true
    ? Union<_Children<Children, E>>
    : _NoChildren<T, E>
  : _NoChildren<T, E>;

export function DataRow<T>(type: Type<T>): new () => DataRow<T> {
  return type as any;
}

export type DataTreeRow<T> = DataRow<
  T,
  {
    $path: string;
    $depth: number;
    $children: DataTreeRow<T>[];
    $parent?: DataTreeRow<T>;
  }
>;
