import { mergeObject } from "../common/object/mergeObject";
import { omit } from "../common/object/omit";
import { HasKeys, If } from "../common/typings";
import { DataExp } from "./DataExp";
import { DataFieldsTranslator } from "./DataFieldsTranslator";
import { DataOrder } from "./DataOrder";
import { DataUnionChildren, DataUnionChildrenKey } from "./DataUnion";
import {
  IfRelationToMany,
  IfRelationToOne,
  NonRelationKeys,
  RelationKeys,
  RelationTypeAt,
} from "./Relation";

export type DataPickableKeys<T> = Exclude<
  NonRelationKeys<T>,
  DataUnionChildrenKey
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

export type DataSelection<T> = {
  // rename to get
  pick?: readonly DataPickableKeys<T>[];

  fields?: Record<string, DataExp<T>>;

  relations?: {
    [K in RelationKeys<T>]?:
      | true
      | false
      | IfRelationToOne<T[K], _RelationToOne<RelationTypeAt<T, K>>>
      | IfRelationToMany<T[K], _RelationToMany<RelationTypeAt<T, K>>>;
  };

  children?: T extends DataUnionChildren<infer Children>
    ? If<
        HasKeys<Children>,
        {
          [K in keyof Children]?: DataSelection<Children[K]>;
        },
        undefined
      >
    : undefined;
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

    const translator = new DataFieldsTranslator(a.fields || {});

    const fields = mergeObject(a.fields, b.fields, (a, b) => b);

    // const fields = mergeObject(a.fields, b.fields, (a, b) => translator.translate(b));

    return {
      ...a,
      ...b,
      ...(pick && { pick: [...new Set(pick)] }),
      ...(fields && { fields }),
      ...(relations && { relations }),
      ...(children && { children }),
    };
  }
}
