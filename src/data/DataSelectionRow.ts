import {HasKeys, Pluck} from "../common/typings";
import {DataFieldsRow} from "./DataFields";
import {MergeDataSelection} from "./DataSelection";
import {DataTypeKey, DataUnionChildren, DataUnionChildrenKey} from "./DataUnion";
import {MapRelation, RelationKeys, RelationTypeAt} from "./Relation";

type _Pick<T, S> =
    S extends { pick: ReadonlyArray<infer K> } ?
        Pick<T, Extract<K | DataTypeKey, keyof T>> :
        T;

type _Children<T, S> =
    T extends DataUnionChildren<infer Children> ?
        DataUnionChildren<{
            [K in string & keyof Children]:
            DataSelectionRow<Children[K],//
                MergeDataSelection<//
                    Omit<S, "children">,
                    Pluck<Pluck<S, 'children', {}>, K, undefined>
                    //
                    >
                //
                >
        }> :
        {};

type _Fields<T, S> =
    S extends { fields: infer U } ? DataFieldsRow<T, U> : {};

type _Relations<T, S> = {

    [K in RelationKeys<T>]:
    MapRelation<T[K],
        DataSelectionRow<RelationTypeAt<T, K>,
            Pluck<Pluck<S, 'relations', {}>, K, undefined>
            //
            >
        //
        >

};

export type DataSelectionRow<T, S> =
    HasKeys<S> extends false ? T :

        (Omit<_Pick<T, S>, RelationKeys<T> | DataUnionChildrenKey>)

        & _Fields<T, S>
        & _Children<T, S>
        & _Relations<T, S>
    ;

