import { mergeObject } from "@dabsi/common/object/mergeObject";
import { omit } from "@dabsi/common/object/omit";
import { HasKeys, If } from "@dabsi/common/typings2/boolean";
import { DataExp } from "@dabsi/typedata/exp/exp";
import { DataOrder } from "@dabsi/typedata/order";
import {
  DataNonRelationKeys,
  DataRelationKeys,
  DataRelationTypeAt,
  IfRelationToMany,
  IfRelationToOne,
} from "@dabsi/typedata/relation";
import {
  DataUnionMetaChildrenKey,
  WithDataUnionMetaChildren,
} from "@dabsi/typedata/union";

export type DataPickableKeys<T> = Exclude<
  DataNonRelationKeys<T>,
  DataUnionMetaChildrenKey
>;

type _RelationToOne<T> = DataSelection<T> & {
  notNull?: true | false;
};

type _RelationToMany<T> = DataSelection<T> & {
  skip?: number;
  take?: number;
  filter?: DataExp<T>;
  order?: DataOrder<T>[];
};

export namespace DataSelection {
  export type Children<T> = T extends WithDataUnionMetaChildren<infer Children>
    ? If<
        HasKeys<Children>,
        {
          [K in keyof Children]?: DataSelection<Children[K]>;
        },
        undefined
      >
    : undefined;
  export type Relations<T> = {
    [K in DataRelationKeys<T>]?:
      | true
      | false
      | IfRelationToOne<T[K], _RelationToOne<DataRelationTypeAt<T, K>>>
      | IfRelationToMany<T[K], _RelationToMany<DataRelationTypeAt<T, K>>>;
  };
}

export type DataSelection<T> = {
  // rename to get
  pick?: readonly DataPickableKeys<T>[];

  fields?: Record<string, DataExp<T>>;

  relations?: DataSelection.Relations<T>;

  children?: DataSelection.Children<T>;
};

export type AnyDataSelection = {
  pick?: string[];

  fields?: Record<string, DataExp<any>>;

  relations?: Record<string, boolean | AnyDataSelection>;

  children?: Record<string, Omit<AnyDataSelection, "children">>;
};
///

export declare namespace AnyDataSelection {
  export type ToOne = AnyDataSelection & {
    notNull?: string[];
  };
  export type ToMany = AnyDataSelection & {
    skip?: number;
    take?: number;
    filter?: DataExp<any>;
    order?: DataOrder<any>[];
  };
  export type ToOneOrMany = ToOne | ToMany;
}

export namespace DataSelection {
  export function atChild(
    selection: AnyDataSelection,
    childKey: string
  ): AnyDataSelection {
    const childSelection: AnyDataSelection = <any>(
      selection.children?.[childKey]
    );
    if (!childSelection) {
      return omit(selection, "children");
    }

    return merge(omit(selection, "children"), childSelection);
  }

  export function merge(
    a: AnyDataSelection | undefined,
    b: AnyDataSelection | undefined
  ): AnyDataSelection {
    if (!(a && b)) {
      return a || b || {};
    }

    const pick: string[] | undefined =
      a.pick || b.pick ? [...(a.pick || []), ...(b.pick || [])] : undefined;

    const relations = mergeObject(a.relations, b.relations, (a, b) => {
      if (typeof a !== "object") return b;
      if (typeof b !== "object") return b;
      return merge(a, b);
    });

    const children = mergeObject(a.children, b.children, merge);

    const fields = mergeObject(a.fields, b.fields, (a, b) => b);

    return {
      ...a,
      ...b,
      ...(pick && { pick: [...new Set(pick)] }),
      ...(fields && { fields }),
      ...(relations && { relations }),
      ...(children && { children }),
    };
  }

  export function select<T>(
    target: DataSelection<T>,
    source: DataSelection<T>
  ) {
    Object.assign(
      target,
      DataSelection.merge(
        target as AnyDataSelection,
        source as AnyDataSelection
      )
    );
  }
}
