import {HasKeys, IsNever, Pluck} from "../common/typings";
import {DataFieldsRow} from "./DataFields";
import {
    DataTypeKey,
    DataUnionChildren,
    DataUnionChildrenKey,
    DataUnionChildrenOf,
    DataUnionWithChildren
} from "./DataUnion";
import {MergeDataSelection} from "./MergeDataSelection";
import {MapRelation, RelationKeys, RelationTypeAt} from "./Relation";


type _Pick<T, S> =
    S extends { pick: ReadonlyArray<infer K> } ?
        Pick<T, Extract<K | DataTypeKey, keyof T>> :
        T;

type _Children<T, S, SChildren, SWithoutChildren, UChildren> =
    HasKeys<UChildren> extends false ? {} :
        DataUnionWithChildren<{
            [K in keyof UChildren]:
            _Row<UChildren[K],//
                MergeDataSelection<//
                    SWithoutChildren,
                    Pluck<SChildren, K>
                    //
                    >>
        }>;

type _Fields<T, SFields> =
    HasKeys<SFields> extends false ? {} :
        DataFieldsRow<T, SFields>;

type _Relations<T, S, SRelations> =
    IsNever<SRelations> extends true ? { [K in RelationKeys<T>]: T[K] } :
        {
            [K in RelationKeys<T>]:
            MapRelation<T[K],
                _Row<//
                    RelationTypeAt<T, K>,
                    Pluck<SRelations, K>
                    //
                    >
                //
                >

        };

export type __Row<T, S> =
    (Omit<_Pick<T, S>, RelationKeys<T> | DataUnionChildrenKey>)

    & (S extends { fields: infer SFields } ?
    _Fields<T, SFields> : {})

    & (S extends { relations: infer SRelations } ?
    _Relations<T, S, SRelations> : {})

    & (S extends { children: infer SChildren } ?
    _Children<T, S, SChildren, Omit<S, 'children'>, DataUnionChildrenOf<T>>
    : T extends DataUnionChildren<any> ? Pick<T, DataUnionChildrenKey> : {})
    ;

export type _Row<T, S> =
    HasKeys<S> extends false ? T :
        __Row<T, S>;


export type DataSelectionRow<T, S> =
    _Row<T, S>;
