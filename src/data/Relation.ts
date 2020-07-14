import {Union} from "../common/typings";

export const Relation = Symbol();

export type Relation<T = {}> = T & { [Relation]?: true };


export type IfRelationToOne<T, U> =
    Required<T> extends Required<Relation> ? U : never;

export type IfRelationToMany<T, U> =
    T extends Array<infer I> ? IfRelationToOne<I, U> : never;

export type RelationKeys<T> = Union<{
    [K in string & keyof Required<T>]:
    IfRelationToMany<T[K], K> | IfRelationToOne<T[K], K>
}>;

export type NonRelationKeys<T> =
    Exclude<keyof Required<T>, RelationKeys<T>>;


export type OmitRelations<T> = Omit<T, RelationKeys<T>>;

export type PickRelations<T> = Pick<T, RelationKeys<T>>;


