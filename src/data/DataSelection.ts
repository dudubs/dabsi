import {ArrayType, ExtractKeys, Pluck} from "../common/typings";
import {DataExp, DataExpType} from "../json-exp/DataExp";
import {DataOrder} from "./DataOrder";
import {IfRelationToMany, IfRelationToOne, NonRelationKeys, OmitRelations, RelationKeys} from "./Relation";


export type DataSelection<T, P = {}> =
    (DataSelection.Base<T> & P)
    | (DataSelection.OmitAll<T> & P)
    | (DataSelection.OmitKeys<T, NonRelationKeys<T>> & P)
    | (DataSelection.PickKeys<T, NonRelationKeys<T>> & P)

export declare namespace DataSelection {
    export type RelationToOne<T> = DataSelection<T, {
        notNull?: true | false
    }>;

    export type RelationToOneRow<T, S> =
        (Pluck<S, "notNull"> extends true ? never : null)
        |
        Row<T, S>;


    export type RelationToMany<T> = DataSelection<T, {
        skip?: number;
        take?: number;
        filter?: DataExp<T>;
        order?: DataOrder<T>[]
    }>;

    export type RelationToManyRow<T, S> =
        S extends true ? OmitRelations<T> :
            S extends DataSelection<T> ?
                Row<T, S> :
                OmitRelations<T>;


    type Base<T> = {

        // TODO: notNull: NonRelationKeys<T>[]
        fields?: Record<string, DataExp<T>>;

        relations?: {
            [K in RelationKeys<T>]?: true | false
            | IfRelationToOne<T[K], RelationToOne<T[K]>>
            | IfRelationToMany<T[K], RelationToMany<Pluck<T[K], number>>>
        }
    };


    type OmitAll<T> =
        Base<T> & { omit: 'all' };

    type OmitKeys<T, K extends PropertyKey> =
        Base<T> & { omit: K[] };

    type PickKeys<T, K extends PropertyKey> =
        Base<T> & { pick: K[] };

    export type RelationRow<T, S> =
        IfRelationToMany<T, RelationToManyRow<Pluck<T, number>, S>[]>
        | IfRelationToOne<T, RelationToOneRow<T, S>>;

    export type BaseRow<T, S> = {
        [K in keyof Pluck<S, 'fields'>]:
        DataExpType<T, Pluck<S, 'fields'>[K]>
    } & {
        [K in keyof Pluck<S, 'relations'>]:
        RelationRow<Pluck<T, K>, Pluck<S, 'relations'>[K]>
    };


    // @formatter:off
    export type Row<T, S> =

        S extends OmitAll<T> ?
            BaseRow<T, S> :

        S extends OmitKeys<T, infer K> ?
            Omit<Omit<T, K>, keyof S> & BaseRow<T, S> :

        S extends PickKeys<T, infer K> ?
            Omit<Pick<T, Extract<K, keyof T>>, keyof S> & BaseRow<T, S> :

        OmitRelations<T> & BaseRow<T, S>;
    // @formatter:on
}


export type DataSelectionOld<T> = {

    // omit | pick
    exclude?: NonRelationKeys<T>[] | "all"

    fields?: Record<string, DataExp<T>>

    relations?: {
        [K in RelationKeys<T>]?:
        true | DataRelationSelectionOld<T[K]>
    }

    loaders?: {
        [K in ExtractKeys<T, any[]>]?: true |
        DataLoaderSelection<ArrayType<T[K]>>
    }

    //
};

export type DataLoaderSelection<T> = {
    filter?: DataExp<T>
    skip?: number
    take?: number,
    order?: DataOrder<T>[]
    select?: DataSelectionOld<T>
}

export type DataLoaderSelectionRowOld<T, Selection> =
    Selection extends true ? OmitRelations<T> :
        Selection extends DataLoaderSelection<T> ?
            DataSelectionRowOld<T, Extract<Selection['select'], DataSelectionOld<T>>>
            : never;
export type DataRelationSelectionRowOld<T, Selection> =
    Selection extends DataRelationSelectionOld<T> ?
        (
            (Selection extends { nullable: true } ? undefined : never) |
            DataSelectionRowOld<T, Selection>
            ) :
        Selection extends true ? T : never;
export type DataRelationSelectionOld<T> = DataSelectionOld<T> & {
    notNull?: boolean
};


type DataSelectionExcludeKeysOld<T, Selection extends DataSelectionOld<T>> =
    Extract<Pluck<Pluck<Selection, 'exclude'>, number>, keyof T>;

export type DataSelectionRowOld<T, Selection extends DataSelectionOld<T>> =
//
    (Selection['exclude'] extends "all" ? never :
        Omit<OmitRelations<T>, DataSelectionExcludeKeysOld<T, Selection>>)
    //
    & {
    [K in keyof Selection['fields']]:
    DataExpType<T, Selection['fields'][K]>
}
    //
    & {
    [K in RelationKeys<T> & keyof Selection['relations']]:
    DataRelationSelectionRowOld<T[K], Selection['relations'][K]>
} & {
    [K in ExtractKeys<T, any[]> & keyof Selection['loaders']]:
    DataLoaderSelectionRowOld<Pluck<T[K], number>, Selection['loaders'][K]>
};
