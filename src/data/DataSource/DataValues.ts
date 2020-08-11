import {RelationKeys, RelationToOneKeys} from "../Relation";

// TODO: RelationToManyKeys


export type DataValues<T> = Partial<Omit<T, RelationKeys<T>>> & {
    [K in RelationToOneKeys<T>]?: string | number
};

