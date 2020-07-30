import {keys} from "../common/object/keys";
import {Assign, IfNotNever, Pluck} from "../common/typings";
import {DataExp} from "../json-exp/DataExp";
import {DataFieldsTranslator} from "./DataFieldsTranslator";
import {DataOrder} from "./DataOrder";
import {DataUnion} from "./DataUnion";
import {IfRelationToMany, IfRelationToOne, MapRelation, NonRelationKeys, OmitRelations, RelationKeys} from "./Relation";


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


    type RelationToMany<T> = DataSelection<T, {
        skip?: number;
        take?: number;
        filter?: DataExp<T>;
        order?: DataOrder<T>[]
    }>;

    type FieldsOf<T> = Pluck<T, 'fields', {}>;
    type RelationsOf<T> = Pluck<T, 'relations', {}>;
    type UnionsOf<T> = Pluck<T, 'unions', {}>;


    // @formatter:off
    type _MergePickKeys<R, Fields, LK extends string> =
        R extends OmitKeys<any, infer RK> ?
            { omit: RK[], fields: Omit<Fields, RK> } :
        R extends OmitAll<any> ?
            { omit: "all", fields: Fields } :
        // R is PickAll
        { pick: LK[], fields: Fields };

    type _MergeOmitKeys<R, Fields, LK extends string> =
        R extends PickKeys<any,infer RK> ?
            { omit: Exclude<LK, RK>[], fields: Pick<Fields,Extract<RK, keyof Fields>> }:
        R extends OmitKeys<any, infer RK> ?
            { omit: (LK | RK)[], fields: Omit<Fields, LK|RK> } :
        R extends OmitAll<any> ?
            { omit: "all", fields: Fields } :
            // R is PickAll
        { omit: LK[], fields: Omit<Fields, LK> };

    type _MergeOmitAll<R, Fields> =
        { omit: "all", fields: Fields };

    type _MergePickAll<R, Fields> =
        R extends PickKeys<any,infer RK> ?
            { pick:RK[], fields: Fields } :
        R extends OmitKeys<any,infer RK> ?
            { omit:RK[], fields: Fields } :
        R extends OmitAll<any> ?
            { omit:"all", fields: Fields } :
        { fields: Fields };



    type __Merge<L, R, Fields> =
        L extends PickKeys<any, infer LK> ?
            _MergePickKeys<R, Fields, LK>:

        L extends OmitKeys<any, infer LK> ?
            _MergeOmitKeys<R, Fields, LK>:

        L extends OmitAll<any> ?
            _MergeOmitAll<R, Fields>:

        _MergePickAll<R,Fields>;

    type IsOmitAll<T> =
        T extends OmitAll<any> ? true : false;

    type _MergeFields<L,R> =
        IsOmitAll<L> extends true ? {} :
            IsOmitAll<R> extends true ? {} :
                OmitRelations<L>;

    type _Merge<L, R> = __Merge<L, R,_MergeFields<L,R>>;

    type Merge<L, R> = Assign<_Merge<L, R>, {
        fields: Assign<FieldsOf<_Merge<L, R>>, FieldsOf<R>>,
        relations: Assign<RelationsOf<L>,RelationsOf<R>>
        unions: Assign<UnionsOf<L>,UnionsOf<R>>
    }>;

    // @formatter:on
    type Relations<T> = {
        [K in RelationKeys<T>]?: true | false
        | IfRelationToOne<T[K], RelationToOne<T[K]>>
        | IfRelationToMany<T[K], RelationToMany<Pluck<T[K], number>>>
    };

    type UnionRelations<T> = {
        [K in RelationKeys<T>]:
        K extends keyof DataUnion.RelationsOf<T> ?
            MapRelation<T[K], DataUnion.RelationsOf<T>[K]> :
            T[K]
    };

    type Unions<Children> = IfNotNever<keyof Children, {
        [ChildKey in keyof Children]?:
        DataSelection<Children[ChildKey]>
    }>;

    type Base<T> = {

        // TODO: notNull: NonRelationKeys<T>[]
        fields?: Record<string, DataExp<T>>;

        relations?: Relations<UnionRelations<T>>;

        unions?: Unions<DataUnion.ChildrenOf<T>>

    };


    type OmitAll<T> =
        Base<T> & { omit: 'all' };

    type OmitKeys<T, K extends string> =
        Base<T> & { omit: K[] };

    type PickKeys<T, K extends string> =
        Base<T> & { pick: K[] };


}

export namespace DataSelection {


    export function merge(sl: DataSelection<any> | undefined, sr: DataSelection<any> | undefined): DataSelection<any> {
        if (!(sl && sr)) {
            return sl || sr || {};
        }


        let omit: "all" | string[] | undefined = undefined;
        let pick: string[] | undefined = undefined;
        const fields: Record<string, any> = {};

        const translatedFields: any = DataFieldsTranslator.translate(
            sl.fields,
            sr.fields
        );

        if (!isOmitAll(sr) && !isOmitAll(sl)) {
            Object.assign(fields, sl.fields);
        }

        if (hasPickKeys(sl)) {
            if (hasOmitKeys(sr)) {
                deleteKeys(fields, sr.omit);
                omit = sr.omit;
            } else if (isOmitAll(sr)) {
                omit = "all";
            } else {
                // pick keys or all
                pick = sl.pick;
            }
        } else if (hasOmitKeys(sl)) {
            if (hasPickKeys(sr)) {
                const omitKeys = new Set(sl.omit);
                deleteAll(omitKeys, sr.pick);
                omit = [...omitKeys];

                deleteKeys(fields, sl.omit);
                const pickKeys = new Set(sr.pick);
                for (const key of keys(fields)) {
                    if (!pickKeys.has(key)) {
                        delete fields[key]
                    }
                }
            } else if (hasOmitKeys(sr)) {
                const keys = new Set<string>();
                addAllAndDeleteKeys(keys, fields, sl.omit);
                addAllAndDeleteKeys(keys, fields, sr.omit);
                omit = [...keys];
            } else if (isOmitAll(sr)) {
                omit = "all";
            } else {
                // pick-all
                deleteKeys(fields, sl.omit);
                omit = sl.omit;
            }
        } else if (isOmitAll(sl)) {
            omit = "all";
        } else {
            // pick-all
            if (hasPickKeys(sr)) {
                pick = sr.pick;
            } else if (hasOmitKeys(sr)) {
                deleteKeys(fields, sr.omit);
                omit = sr.omit;
            } else if (isOmitAll(sr)) {
                omit = "all";
            }
        }


        Object.assign(fields, translatedFields);

        return {
            ...(omit ? {omit} : pick ? {pick} : {}),
            fields,
            relations: {
                ...sl.relations,
                ...sr.relations
            },
            unions: {
                ...<any>sl.unions,
                ...<any>sr.unions
            }

        }

    }

    export function isOmitAll(value): value is OmitAll<any> {
        return value?.omit === 'all'
    }

    export function hasOmitKeys(value): value is OmitKeys<any, any> {
        return Array.isArray(value?.omit)
    }

    export function hasPickKeys(value): value is PickKeys<any, any> {
        return Array.isArray(value?.pick)
    }

    export function selectKeys(
        selection: DataSelection<any>,
        keys: string[],
    ): string[] {
        if (hasPickKeys(selection)) {
            const pickKeys = new Set(selection.pick);
            return keys.filter(key => pickKeys.has(key))
        }
        if (hasOmitKeys(selection)) {
            const omitKeys = new Set(selection.omit);
            return keys.filter(key => !omitKeys.has(key));
        }
        if (isOmitAll(selection))
            return [];
        return keys;
    }


    export function selectChildKeys(
        entityKeys: string[],
        entitySelection: DataSelection<any>,
        childKeys: string[],
        childSelection: DataSelection<any>
    ): Set<string> {
        const pickKeys: Set<string> = new Set();


        if (hasPickKeys(entitySelection)) {
            if (hasPickKeys(childSelection)) {
                // pick-keys & pick
                addAll(pickKeys, entitySelection.pick);
                addAll(pickKeys, childSelection.pick);
            } else if (hasOmitKeys(childSelection)) {
                // pick-keys & omit-keys
                addAll(pickKeys, childKeys);
                deleteAll(pickKeys, childSelection.omit);
                deleteAll(pickKeys, entityKeys);
                const omitKeys = new Set(childSelection.omit);
                addAll(pickKeys, entitySelection.pick
                    .toSeq()
                    .filter(key => !omitKeys.has(key))
                );

            } else if (isOmitAll(childSelection)) {
                // pick-keys & omit-all
                addAll(pickKeys, entitySelection.pick)
            } else {
                // pick-keys & pick-all
                addAll(pickKeys, entitySelection.pick);
            }
        } else if (hasOmitKeys(entitySelection)) {
            if (hasPickKeys(childSelection)) {
                // omit-keys & pick-keys
                addAll(pickKeys, childSelection.pick);
                const omitKeys = new Set(childSelection.pick);
                deleteAll(pickKeys, entitySelection.omit.toSeq()
                    .filter(key => !omitKeys.has(key)));
            } else if (hasOmitKeys(childSelection)) {
                // omit-keys & omit-keys
                addAll(pickKeys, childKeys);
                deleteAll(pickKeys, entitySelection.omit);
                deleteAll(pickKeys, childSelection.omit);
            } else if (isOmitAll(childSelection)) {
                // omit-keys & omit-all
                addAll(pickKeys, entityKeys);
                deleteAll(pickKeys, entitySelection.omit);

            } else {
                // omit-keys & pick-all
                addAll(pickKeys, childKeys);
                deleteAll(pickKeys, entitySelection.omit);
            }
        } else if (isOmitAll(entitySelection)) {
            if (hasPickKeys(childSelection)) {
                // omit-all & pick-keys
                addAll(pickKeys, childSelection.pick);
            } else if (hasOmitKeys(childSelection)) {
                // omit-all & omit-keys
                addAll(pickKeys, childKeys);
                deleteAll(pickKeys, entityKeys);
                deleteAll(pickKeys, childSelection.omit);

            } else if (isOmitAll(childSelection)) {
                // omit-all & omit-all
            } else {
                // omit-all & pick-all
                addAll(pickKeys, childKeys);
                deleteAll(pickKeys, entityKeys);
            }
        } else {
            // pick-all
            addAll(pickKeys, childKeys);
        }

        return pickKeys;
    }

}

function addAll<T>(set: { add(value: T) }, values: Iterable<T>) {
    for (const value of values) {
        set.add(value)
    }
}

function deleteAll<T>(set: { delete(value: T) }, values: Iterable<T>) {
    for (const value of values) {
        set.delete(value)
    }
}


function deleteKeys(obj, keys: string[]) {
    keys.forEach(k => {
        delete obj[k]
    })
}


function addAllAndDeleteKeys(
    set: { add },
    obj,
    keys: Iterable<any>
) {
    for (let key of keys) {
        delete obj[key];
        set.add(key);
    }

}

