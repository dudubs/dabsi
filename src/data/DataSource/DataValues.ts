import {RelationKeys, RelationToOneKeys} from "../Relation";

// TODO: RelationToManyKeys


export type DataValues<T> = {
    [K in RelationToOneKeys<T>]?: string | number
} & {
    [K in Exclude<keyof T, RelationKeys<T>>]?:
    T[K] | null
};



