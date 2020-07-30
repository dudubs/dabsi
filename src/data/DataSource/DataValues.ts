import {RelationKeys} from "../Relation";

export type DataValues<T> = Partial<Omit<T, RelationKeys<T>>> ;
// & Partial<Record<RelationKeys<any>, string | number>>;
