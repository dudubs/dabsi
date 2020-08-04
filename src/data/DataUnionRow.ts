import {HasKeys, If, Union} from "../common/typings";
import {DataKey} from "./DataItem";
import {DataTypeKey, DataUnionChildren, DataUnionChildrenKey} from "./DataUnion";
import {MapRelation, RelationKeys, RelationTypeAt} from "./Relation";

type _WithChildren<Children> = Union<{
    [K in keyof Children]:
    Record<DataKey, string> &
    Record<DataTypeKey, K> &
    DataUnionRow<Children[K]>
}>;

export type DataUnionRow<T> =
    T extends DataUnionChildren<infer Children> ?
        If<HasKeys<Children>,
            _WithChildren<Children>,
            _NoChildren<T>> :
        _NoChildren<T> ;

type _NoChildren<T> =
    Omit<T, DataUnionChildrenKey | RelationKeys<T>>
    & Record<DataKey, string>
    & {
    [K in RelationKeys<T>]:
    MapRelation<T[K],
        DataUnionRow<RelationTypeAt<T, K>>>
}
