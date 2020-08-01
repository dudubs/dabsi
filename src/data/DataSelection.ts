import {mergeObject} from "../common/object/mergeObject";
import {omit} from "../common/object/omit";
import {Assign, IfNotNever, Pluck} from "../common/typings";
import {DataExp} from "../json-exp/DataExp";
import {DataOrder} from "./DataOrder";
import {DataSelectionRow} from "./DataSelectionRow";
import {DataUnion} from "./DataUnion";
import {IfRelationToMany, IfRelationToOne, MapRelation, NonRelationKeys, RelationKeys} from "./Relation";


export type DataSelection<T, P = {}> =
    _DataSelection<NonNullable<T>, P>;

type _DataSelection<T, P = {}> =
    P & DataSelection.Base<T>;

export declare namespace DataSelection {

    import FieldsOf = DataSelectionRow.FieldsOf;
    type RelationToOne<T> = DataSelection<T, {
        notNull?: true | false
    }>;


    type RelationToMany<T> = DataSelection<T, {
        skip?: number;
        take?: number;
        filter?: DataExp<T>;
        order?: DataOrder<T>[]
    }>;

    type Relation<T> = boolean | RelationToOne<T> | RelationToMany<T>;


    type IsNull<T> = T extends (undefined | null) ? true : false;

    type MergePicks<L, R> =
        IsNull<L> extends true ? R :
            IsNull<R> extends true ? L :
                Array<Pluck<L, number> | Pluck<R, number>>;
    // {};

    type PickOf<T> = Pluck<T, 'pick', undefined>;

    type RelationsOf<T> = Pluck<T, 'relations', {}>;

    type ChildrenOf<T> = Pluck<T, 'children', {}>;

    type MergeRelation<L, R> =
        L extends (null | undefined | boolean) ? R :
            R extends (null | undefined | boolean) ? L :
                MergeObject<L, R> ;

    type MergeRelations<L, R> = Assign<RelationsOf<L>, {
        [K in keyof RelationsOf<R>]:
        MergeRelation<//
            Pluck<RelationsOf<L>, K, undefined>,
            RelationsOf<R>[K]>
    }>


    type MergeChildren<L, R> = Assign<ChildrenOf<L>, {
        [K in keyof ChildrenOf<R>]:
        Merge<//
            Pluck<ChildrenOf<L>, K, undefined>, // L ChildOf K
            ChildrenOf<R>[K]>
    }>;

    type MergeObject<L, R> = Assign<Assign<L, R>, {
        pick: MergePicks<PickOf<L>, PickOf<R>>,
        fields: Assign<FieldsOf<L>, FieldsOf<R>>,
        relations: MergeRelations<L, R>,
        children: MergeChildren<L, R>
    }>;

    type Merge<L, R> =
        IsNull<L> extends true ? R :
            IsNull<R> extends true ? L :
                MergeObject<L, R>;

    type Relations<T> = {
        [K in RelationKeys<T>]?: true | false
        | IfRelationToOne<T[K], RelationToOne<T[K]>>
        | IfRelationToMany<T[K], RelationToMany<Pluck<T[K], number>>>
    };

    type ChildrenRelations<T> = {
        [K in RelationKeys<T>]:
        MapRelation<T[K], DataUnion.RelationTypeAt<T, K>>
    };

    type Children<Children> = IfNotNever<keyof Children, {
        [ChildKey in keyof Children]?:
        DataSelection<Children[ChildKey]>
    }>;

    type Base<T> = {

        pick?: NonRelationKeys<T>[];

        fields?: Record<string, DataExp<T>>;

        relations?: Relations<ChildrenRelations<T>>;

        children?: Children<DataUnion.ChildrenOf<T>>

    };


}

export type AnyDataSelection = {
    pick?: string[]

    fields?: Record<string, any>;

    relations?: Record<string, boolean | AnyDataSelection>

    children?: Record<string, Omit<AnyDataSelection, "children">>
};

export declare namespace AnyDataSelection {
    export type ToOne = AnyDataSelection & {
        notNull?: string[]
    };

    export type ToMany = AnyDataSelection & {
        skip?: number;
        take?: number;
        filter?: DataExp<any>;
        order?: DataOrder<any>[]
    };
    export type ToOneOrMany =
        ToOne | ToMany;

}


export namespace DataSelection {

    export function atChild(selection: AnyDataSelection, childKey: string):
        AnyDataSelection {
        const childSelection: AnyDataSelection =
            <any>selection.children?.[childKey];
        if (!childSelection) {
            return omit(selection, "children");
        }

        return merge(omit(selection, "children"),
            childSelection);

    }


    export function merge(a: AnyDataSelection | undefined,
                          b: AnyDataSelection | undefined): AnyDataSelection {

        if (!(a && b)) {
            return a || b || {};
        }

        const pick: string[] | undefined =
            (a.pick || b.pick) ? [...a.pick || [], ...b.pick || []] : undefined;

        const relations = mergeObject(a.relations, b.relations, (a, b) => {
            if (typeof a !== "object")
                return b;
            if (typeof b !== "object")
                return b;
            return merge(a, b);
        });

        const children = mergeObject(a.children, b.children, merge);
        const fields = mergeObject(a.fields, b.fields, (a, b) => b);

        return {
            ...a,
            ...b,
            ...(pick && {pick: [...new Set(pick)]}),
            ...(fields && {fields}),
            ...(relations && {relations}),
            ...(children && {children})
        }

    }


}
