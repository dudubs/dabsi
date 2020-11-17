import { Union } from "../common/typings2/Union";

export declare const DataRelationSymbol: unique symbol;

export type DataRelation<T = {}> = T & { [DataRelationSymbol]?: true };

export type DataRelationType<T> =
  | IfRelationToOne<T, T extends DataRelation<infer U> ? U : never>
  | IfRelationToMany<T, T extends DataRelation<infer U>[] ? U : never>;

export type DataRelationTypeAt<
  T,
  K extends DataRelationKeys<T>
> = DataRelationType<Required<T>[K]>;

export type MapRelation<T, U> =
  | IfRelationToOne<T, DataRelation<U>>
  | IfRelationToMany<T, DataRelation<U>[]>;

export type IfRelationToOne<T, U> = Required<NonNullable<T>> extends Required<
  DataRelation
>
  ? U
  : never;

export type IfRelationToMany<T, U> = NonNullable<T> extends Array<infer I>
  ? IfRelationToOne<I, U>
  : never;

export type DataRelationKeys<T> = Union<
  {
    [K in string & keyof Required<T>]:
      | IfRelationToMany<T[K], K>
      | IfRelationToOne<T[K], K>;
  }
>;

export type DataRelationToManyKeys<T> = Union<
  {
    [K in string & keyof Required<T>]: IfRelationToMany<Required<T>[K], K>;
  }
>;
export type DataRelationToOneKeys<T> = Union<
  {
    [K in string & keyof Required<T>]: IfRelationToOne<Required<T>[K], K>;
  }
>;

export type NonRelationKeys<T> = string &
  Exclude<keyof Required<T>, DataRelationKeys<T>>;
