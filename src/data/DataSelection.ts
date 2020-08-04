import {mergeObject} from "../common/object/mergeObject";
import {omit} from "../common/object/omit";
import {Assign, HasKeys, If, IsNull, Pluck} from "../common/typings";
import {DataExp} from "../json-exp/DataExp";
import {DataOrder} from "./DataOrder";
import {DataUnionChildren, DataUnionChildrenKey} from "./DataUnion";
import {IfRelationToMany, IfRelationToOne, NonRelationKeys, RelationKeys, RelationTypeAt} from "./Relation";



type _MergeRelation<L, R> =
    L extends (null | undefined | boolean) ? R :
        R extends (null | undefined | boolean) ? L :
            _MergeObject<L, R> ;

type _PickOf<T> = Pluck<T, 'pick', undefined>;

type _RelationsOf<T> = Pluck<T, 'relations', {}>;

type _ChildrenOf<T> = Pluck<T, 'children', {}>;

type _MergeRelations<L, R> = Assign<_RelationsOf<L>, {
    [K in keyof _RelationsOf<R>]:
    _MergeRelation<//
        Pluck<_RelationsOf<L>, K, undefined>,
        _RelationsOf<R>[K]>
}>


type MergeChildren<L, R> = Assign<_ChildrenOf<L>, {
    [K in keyof _ChildrenOf<R>]:
    MergeDataSelection<//
        Pluck<_ChildrenOf<L>, K, undefined>, // L ChildOf K
        _ChildrenOf<R>[K]>
}>;


export type _MergePicks<L, R> =
    L extends ReadonlyArray<infer LK> ?
        R extends ReadonlyArray<infer RK> ?
            ReadonlyArray<LK | RK> :
            ReadonlyArray<LK> :
        R extends ReadonlyArray<infer RK> ? ReadonlyArray<RK> : undefined;


type _MergeObject<L, R> = Assign<Assign<L, R>, {
    pick: _MergePicks<_PickOf<L>, _PickOf<R>>,
    fields: Assign<Pluck<L, 'fields'>, Pluck<R, 'fields'>>,
    relations: _MergeRelations<L, R>,
    children: MergeChildren<L, R>
}>;

export type MergeDataSelection<L, R> =
    If<IsNull<L>, R,
        If<IsNull<R>, L,
            _MergeObject<L, R>>>;

type _PossibleKeysToPick<T> =
    Exclude<NonRelationKeys<T>,
        DataUnionChildrenKey>;


type _RelationToOne<T> = DataSelection<T> & {
    notNull?: true | false
};


type _RelationToMany<T> = DataSelection<T> & {
    skip?: number;
    take?: number;
    filter?: DataExp<T>;
    order?: DataOrder<T>[]
};

export type DataSelection<T> =
    {

        // rename to get
        pick?: readonly _PossibleKeysToPick<T>[];

        fields?: Record<string, DataExp<T>>;

        relations?: {
            [K in RelationKeys<T>]?: true | false
            | IfRelationToOne<T[K], _RelationToOne<RelationTypeAt<T, K>>>
            | IfRelationToMany<T[K], _RelationToMany<RelationTypeAt<T, K>>>
        };

        children?: T extends DataUnionChildren<infer Children> ?
            If<HasKeys<Children>, {
                [K in keyof Children]?: DataSelection<Children[K]>
            }, undefined>
            : undefined;

    };

export type AnyDataSelection = {
    pick?: string[]

    fields?: Record<string, any>;

    relations?: Record<string, boolean | AnyDataSelection>

    children?: Record<string, Omit<AnyDataSelection, "children">>
};
///

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
