import { mapObject } from "@dabsi/common/object/mapObject";
import { HasKeys, If } from "@dabsi/common/typings2/boolean";
import { IsNever } from "@dabsi/common/typings2/boolean/IsNever";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { BaseType } from "@dabsi/typedata/BaseType";
import {
  MapRelation,
  DataRelationKeys,
  DataRelationTypeAt,
  DataRelationTypeAt as _RelationTypeAt,
} from "@dabsi/typedata/DataRelation";

export type DataTypeMetaKey = "$type";

export const DataTypeMetaKey: DataTypeMetaKey = "$type";

export type DataUnionMetaChildrenKey = "$unionChildren";

export type WithDataUnionMetaChildren<T> = Record<DataUnionMetaChildrenKey, T>;

export type DefaultDataUnionMetaChildren<T> = IsNever<T> extends true
  ? {}
  : HasKeys<T> extends false
  ? {}
  : Record<DataUnionMetaChildrenKey, T>;

export type GetDataUnionMetaChildren<T> = T extends WithDataUnionMetaChildren<
  infer U
>
  ? HasKeys<T> extends true
    ? U
    : never
  : never;

export type DataUnionChild<T> = Constructor<T>;

export type DataUnionChildMap<T> = Record<string, DataUnionChild<T>>;

export type DataUnionRelation<T> = Constructor<T> & {
  unionType: new () => any;
};

export type DataUnionRelationMap<T> = {
  [K in DataRelationKeys<T>]?: DataUnionRelation<_RelationTypeAt<T, K>>;
};

export type DataUnionClass<
  Base,
  Children extends DataUnionChildMap<Base>,
  Relations extends DataUnionRelationMap<Base>
> = Constructor<
  DataUnion<Base, _InstanceMapType<Children>, _InstanceMapType<Relations>>
> & {
  unionChildren: Children;
  unionRelations: Relations;

  unionType: new () => Base;
};

export type DataUnion<T, Children, Relations> = BaseType<T> &
  _AssignRelations<T, Relations> &
  WithDataUnionMetaChildren<
    {
      [K in keyof Children]: BaseType<Children[K]> &
        _AssignRelations<Children[K], Relations>;
    }
  >;

type _InstanceMapType<T> = {
  [K in keyof T]: InstanceType<Extract<T[K], Constructor<any>>>;
};
type _AssignRelations<T, Relations> =
  // TODO: AssignKeys
  Omit<T, DataRelationKeys<T>> &
    {
      [K in DataRelationKeys<T>]: MapRelation<
        T[K],
        K extends keyof Relations ? Relations[K] : DataRelationTypeAt<T, K>
      >;
    };

export function DataUnion<
  T,
  R extends DataUnionRelationMap<T> = {},
  C extends DataUnionChildMap<T> = {}
>(
  type: Constructor<T>,
  union: {
    relations?: R;
    children?: C;
  }
): DataUnionClass<T, C, R>;

export function DataUnion(type, { children = {}, relations = {} }) {
  Object.defineProperty(Class, "name", {
    value: type.name,
  });

  if (DataUnion.isDataUnion(type)) {
    throw new Error("Not support yet.");
  }

  Class.unionType = type;
  Class.unionChildren = mapObject(children, (child: DataUnionChild<any>) => {
    if (DataUnion.isDataUnion(child)) {
      return DataUnion(<any>child.unionType, {
        relations: {
          ...relations,
          ...child.unionRelations,
        },
        children: child.unionChildren,
      });
    } else {
      return DataUnion(child, { relations });
    }
  });
  Class.unionRelations = relations;

  return <any>Class;

  function Class() {
    throw new Error();
  }
}

DataUnion.isDataUnion = function (obj): obj is DataUnionClass<any, any, any> {
  return "unionType" in obj;
};
