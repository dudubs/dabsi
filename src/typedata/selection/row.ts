import { HasKeys } from "@dabsi/common/typings2/boolean";
import { PluckDefined } from "@dabsi/common/typings2/Pluck";
import { WithBaseType } from "@dabsi/typedata/BaseType";
import { DataFieldsRow } from "@dabsi/typedata/fields";
import {
  DataNonRelationKeys,
  DataRelationKeys,
  DataRelationTypeAt,
  MapRelation,
} from "@dabsi/typedata/relation";
import { DataMergedSelection } from "@dabsi/typedata/selection/merger";
import {
  DataTypeMetaKey,
  DataUnionMetaChildrenKey,
  DefaultDataUnionMetaChildren,
  GetDataUnionMetaChildren,
  WithDataUnionMetaChildren,
} from "@dabsi/typedata/union";

type _PickRow<T, S> = S extends { pick: ReadonlyArray<infer K> }
  ? Pick<T, Extract<K | DataTypeMetaKey, DataNonRelationKeys<T>>>
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
          DataMergedSelection<
            //
            SWithoutChildren,
            PluckDefined<SChildren, K>
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
      PluckDefined<SRelations, K> extends true | false
        ? {}
        : PluckDefined<SRelations, K>
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
