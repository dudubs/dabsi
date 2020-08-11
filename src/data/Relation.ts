import {Pluck, Union} from "../common/typings";

export const Relation = Symbol();

export type Relation<T = {}> = T & { [Relation]?: true };


type RelationType<T> =
    IfRelationToOne<T, T>
    | IfRelationToMany<T, Pluck<T, number>>

export type RelationTypeAt<T, K extends RelationKeys<T>> =
    RelationType<Required<T>[K]>;

export type MapRelation<T, U> =
    IfRelationToOne<T, Relation<U>> |
    IfRelationToMany<T, Relation<U>[]>;

export type MapRelations<T, U> = Omit<T, RelationKeys<T>> & {
    [K in RelationKeys<T>]: MapRelation<T[K], (
        K extends keyof U ? U[K] : T[K]
        )>
};

export type IfRelationToOne<T, U> =
    Required<NonNullable<T>> extends Required<Relation> ? U : never;

export type IfRelationToMany<T, U> =
    NonNullable<T> extends Array<infer I> ? IfRelationToOne<I, U> : never;

export type RelationKeys<T> = Union<{
    [K in string & keyof Required<T>]:
    IfRelationToMany<T[K], K>
    | IfRelationToOne<T[K], K>
}>;


export type RelationToManyKeys<T> = Union<{
    [K in string & keyof Required<T>]:
    IfRelationToMany<Required<T>[K], K>
}>;
export type RelationToOneKeys<T> = Union<{
    [K in string & keyof Required<T>]:
    IfRelationToOne<Required<T>[K], K>
}>;

export type NonRelationKeys<T> =
    string & Exclude<keyof Required<T>, RelationKeys<T>>;

export type OmitRelations<T> = Omit<T, RelationKeys<T>>;

export type PickRelations<T> = Pick<T, RelationKeys<T>>;


