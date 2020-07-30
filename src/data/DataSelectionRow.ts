import {Assign, PartialKeys, Pluck} from "../common/typings";
import {DataFieldsRow} from "./DataFields";
import {DataSelection} from "./DataSelection";
import {MapRelation, RelationKeys, RelationTypeAt} from "./Relation";

export type DataSelectionRow<T, S> =

    S extends DataSelection.OmitAll<T> ?
        DataSelectionRow.Base<T, S> :

        S extends DataSelection.OmitKeys<T, infer K> ?
            DataSelectionRow.Base<T, S> :

            S extends DataSelection.PickKeys<T, infer K> ?
                DataSelectionRow.Base<T, S> :

                DataSelectionRow.Base<T, S>;

export declare namespace DataSelectionRow {

    type FieldsOf<T> = Pluck<T, 'fields', {}>;
    type RelationsOf<T> = Pluck<T, 'relations', {}>;



    type Base<T, S extends DataSelection.Base<T>> =
        Omit<T, RelationKeys<T>>
        & (S extends { fields: infer U } ? DataFieldsRow<T, U> : {})
        & PartialKeys<{
        [K in RelationKeys<T>]: MapRelation<T[K], RelationTypeAt<T, K>>
    },
        Exclude<keyof T, keyof RelationsOf<S>>>;


}
