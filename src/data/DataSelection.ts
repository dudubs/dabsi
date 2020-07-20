import {Pluck} from "../common/typings";
import {DataExp} from "../json-exp/DataExp";
import {DataFieldsRow} from "./DataFields";
import {DataFieldsTranslator} from "./DataFieldsTranslator";
import {DataItem} from "./DataItem";
import {DataOrder} from "./DataOrder";
import {DataUnion} from "./DataUnion";
import {IfRelationToMany, IfRelationToOne, NonRelationKeys, OmitRelations, RelationKeys} from "./Relation";


export type DataSelection<T, P = {}> =
    _DataSelection<NonNullable<T>, P>;

export type _DataSelection<T, P = {}> =
    (DataSelection.Base<T> & P)
    | (DataSelection.OmitAll<T> & P)
    | (DataSelection.OmitKeys<T, NonRelationKeys<T>> & P)
    | (DataSelection.PickKeys<T, NonRelationKeys<T>> & P)

export declare namespace DataSelection {

    type RelationToOne<T> = DataSelection<T, {
        notNull?: true | false
    }>;

    type RelationToOneRow<T, S> =
        (Pluck<S, "notNull"> extends true ? never : null)
        |
        Row<T, S>;


    type RelationToMany<T> = DataSelection<T, {
        skip?: number;
        take?: number;
        filter?: DataExp<T>;
        order?: DataOrder<T>[]
    }>;

    type RelationToManyRow<T, S> =
        S extends true ? OmitRelations<T> :
            S extends DataSelection<T> ?
                Row<T, S> :
                OmitRelations<T>;


    type Relations<T> = {
        [K in RelationKeys<T>]?: true | false
        | IfRelationToOne<T[K], RelationToOne<T[K]>>
        | IfRelationToMany<T[K], RelationToMany<Pluck<T[K], number>>>
    };

    type Unions<T> =
        T extends DataUnion<infer Base,
                infer TypeKey,
                infer Children,
                infer Relations> ?
            {
                [K in keyof Children]?: DataSelection<(
                InstanceType<Children[K]>
                )>
            }
            : never
        ;

    type Base<T> =
        _Base<DataUnion.RowWithRelationsOf<DataUnion.MetaTypeOf<T>, T>>;

    type _Base<T> = {

        // TODO: notNull: NonRelationKeys<T>[]
        fields?: Record<string, DataExp<T>>;

        relations?: DataSelection.Relations<T>;

        unions?: Unions<DataUnion.MetaTypeOf<T>>;

        $debugType?: T;
        $debugMetaType?: DataUnion.MetaTypeOf<T>


    };


    type OmitAll<T> =
        Base<T> & { omit: 'all' };

    type OmitKeys<T, K extends PropertyKey> =
        Base<T> & { omit: K[] };

    type PickKeys<T, K extends PropertyKey> =
        Base<T> & { pick: K[] };

    type RelationRow<T, S> =
        IfRelationToMany<T, RelationToManyRow<Pluck<T, number>, S>[]>
        | IfRelationToOne<T, RelationToOneRow<T, S>>;

    type RelationsRow<T, S> = {
        [K in keyof S]:
        RelationRow<Pluck<T, K>, S[K]>
    };

    type UnionsRow<T, S> = DataUnion.MetaType<DataUnion<any, any, any, any>>;


    type BaseRow<T, S> = {}
        & (S extends { fields: infer U } ? DataFieldsRow<T, U> : {})
        & (S extends { relations: infer U } ? RelationsRow<T, U> : {})
        & (S extends { unions: infer U } ? UnionsRow<T, U> : {})

        ;
    // If<S, { relations }, RelationsRow<T, Pluck<S, 'relations'>>, {}>;

    // @formatter:off
     type Row<T, S> = DataItem<

         S extends OmitAll<T> ?
            BaseRow<T, S> :

        S extends OmitKeys<T, infer K> ?
            Omit<Omit<T, K>, keyof S> & BaseRow<T, S> :

        S extends PickKeys<T, infer K> ?
            Omit<Pick<T, Extract<K, keyof T>>, keyof S> & BaseRow<T, S> :

        OmitRelations<T> & BaseRow<T, S>
    >
    // @formatter:on

}

export namespace DataSelection {


    export function merge(s1: DataSelection<any>, s2: DataSelection<any>) {


        const relations = {
            ...s1.relations,
            ...s2.relations
        };

        const translatedFields = DataFieldsTranslator.translate(
            s1.fields,
            s2.fields
        );

        if (isPickKeys(s2)) {
            const fields = {...s1.fields, ...translatedFields};
            return {
                pick: s2.pick.filter(k => !(k in fields)),
                fields,
                relations
            }
        }

        if (isOmitKeys(s2)) {
            const fields = {...s1.fields, ...translatedFields};
            for (const key in s2.omit) {
                delete fields[key];
            }
            return {
                omit: s2.omit.filter(k => !(k in fields)),
                fields,
                relations
            }
        }

        if (isOmitAll(s2)) {
            return {
                omit: 'all',
                fields: translatedFields,
                relations
            }
        }

        return {
            fields: {...s1.fields, ...translatedFields},
            relations
        }

    }

    function isOmitAll(value): value is OmitAll<any> {
        return value?.omit === 'all'
    }

    function isOmitKeys(value): value is OmitKeys<any, any> {
        return Array.isArray(value?.omit)
    }

    function isPickKeys(value): value is PickKeys<any, any> {
        return Array.isArray(value?.pick)
    }
}
