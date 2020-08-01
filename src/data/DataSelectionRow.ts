import {Assign, Pluck} from "../common/typings";
import {DataFieldsRow} from "./DataFields";
import {DataSelection} from "./DataSelection";
import {DataUnion} from "./DataUnion";
import {MetaType} from "./MetaType";
import {MapRelation, RelationKeys, RelationTypeAt} from "./Relation";

export type DataSelectionRow<T, S> =
    MetaType.Extend<DataSelectionRow.Base<T, S>,
        MetaType.Of<T> extends DataUnion<//
                infer Base,
                infer Children,
                infer Relations> ?
            DataSelectionRow.MetaBase<//
                T,
                S,
                Base,
                Children,
                Relations> :
            {}>;


/*

    if T is

 */

export declare namespace DataSelectionRow {

    type FieldsOf<T> = Pluck<T, 'fields', {}>;
    type RelationsOf<T> = Pluck<T, 'relations', {}>;
    type ChildrenOf<T> = Pluck<T, 'children', {}>;
    type RelationOf<T, K extends string> = Pluck<RelationsOf<T>, K, {}>;
    type ChildOf<T, K extends string> = Pluck<ChildrenOf<T>, K, {}>;


    type Flat<S> =
        Assign<S, {
            children: {
                [K in keyof ChildrenOf<S>]:
                DataSelection.Merge<S, ChildrenOf<S>[K]>
            }
        }>
    // selection of union
    // selection of entity

    type MetaBase<T, S, B, Children, Relations> =
        DataUnion<Base<B, S>, {
            [K in string & keyof Children]:
            DataSelectionRow<Children[K],//
                // DataSelection.Merge...
                // ChildOf<S, K>>
                DataSelection.Merge<//
                    Omit<S, 'children'>,
                    ChildOf<S, K>>
                //
                >
        }, {
            [K in string & keyof Relations]:
            DataSelectionRow<Relations[K],//
                RelationOf<S, K>>
        }>;

    type BaseRelations<T, S> = {
        [K in RelationKeys<T>]?:
        MapRelation<T[K], (
            K extends keyof RelationsOf<S> ?
                Base<RelationTypeAt<T, K>, RelationsOf<S>[K]> :
                RelationTypeAt<T, K>
            )>
    };

    type NonPickKeys<T, S> = (S extends { pick: (infer K)[] } ?
        Exclude<keyof T, K> : never);


    type Base<T, S> =
        Omit<T, RelationKeys<T> | NonPickKeys<T, S>>
        & (S extends { fields: infer U } ? DataFieldsRow<T, U> : {})
        & BaseRelations<T, S>;


}
