import { HasKeys, IsUndefined } from "@dabsi/common/typings2/boolean";
import { IsNever } from "@dabsi/common/typings2/boolean/IsNever";
import { Pluck } from "@dabsi/common/typings2/Pluck";
import { BaseType, WithBaseType } from "@dabsi/typedata/BaseType";

import { DataFieldsRow } from "@dabsi/typedata/DataFields";
import {
  DataTypeMetaKey,
  WithDataUnionMetaChildren,
  DataUnionMetaChildrenKey,
  GetDataUnionMetaChildren,
  DefaultDataUnionMetaChildren,
} from "@dabsi/typedata/DataUnion";
import { MergeDataSelection } from "@dabsi/typedata/data-selection/DataSelectionMerger";
import {
  MapRelation,
  NonRelationKeys,
  DataRelationKeys,
  DataRelationTypeAt,
} from "@dabsi/typedata/DataRelation";

type _PickRow<T, S> = S extends { pick: ReadonlyArray<infer K> }
  ? Pick<T, Extract<K | DataTypeMetaKey, NonRelationKeys<T>>>
  : T;

type _ChildrenRow<
  T,
  S,
  SChildren,
  SWithoutChildren,
  UChildren
> = HasKeys<UChildren> extends false
  ? {}
  : DefaultDataUnionMetaChildren<
      {
        [K in keyof UChildren]: _Row<
          UChildren[K], //
          MergeDataSelection<
            //
            SWithoutChildren,
            Pluck<SChildren, K>
            //
          >
        >;
      }
    >;

type _Fields<T, SFields> = HasKeys<SFields> extends false
  ? {}
  : DataFieldsRow<T, SFields>;

type _RelationsRow<T, S, SRelations> = {
  [K in DataRelationKeys<T>]: MapRelation<
    T[K],
    _Row<
      //
      DataRelationTypeAt<T, K>,
      Pluck<SRelations, K> extends true | false ? {} : Pluck<SRelations, K>
      //
    >
    //
  >;
};

type _NoChildrenRow<T> = T extends WithDataUnionMetaChildren<any>
  ? Pick<T, DataUnionMetaChildrenKey>
  : {};

type __Row<T, S> = Omit<
  _PickRow<T, S>,
  // omit all relations or metaTypes
  DataRelationKeys<T> | DataUnionMetaChildrenKey
> &
  WithBaseType<T> &
  (S extends { fields: infer SFields } ? _Fields<T, SFields> : {}) &
  (S extends { relations: infer SRelations }
    ? _RelationsRow<T, S, SRelations>
    : Pick<T, DataRelationKeys<T>>) &
  (S extends { children: infer SChildren }
    ? _ChildrenRow<
        T,
        S,
        SChildren,
        Omit<S, "children">,
        GetDataUnionMetaChildren<T>
      >
    : _NoChildrenRow<T>);

type _Row<T, S> = HasKeys<S> extends false ? T : __Row<T, S>;

export type DataSelectionRow<T, S> = _Row<T, S>;
