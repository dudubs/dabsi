import {Assign, HasKeys, IsNever, Pluck} from "../common/typings";


type _MergeRelation<L, R> =
    L extends boolean? R :
        R extends boolean ? L :
            _MergeObject<L, R> ;


type _MergeRelations<L, R> =
    HasKeys<L> extends false ? R :
        HasKeys<R> extends false ? L :
            Assign<L, {
                [K in keyof R]:
                _MergeRelation<//
                    Pluck<L, K, undefined>,
                    R[K]>
            }>;


type _MergeChildren<L, R> =
    HasKeys<L> extends false ? R :
        HasKeys<R> extends false ? L :
            Assign<L, {
                [RK in keyof R]:
                _Merge<//
                    Pluck<L, RK, undefined>, // L ChildOf K
                    R[RK]
                    ///
                    >
            }>;

export type _MergePicks<L, R> =
    L extends ReadonlyArray<infer LK> ?
        R extends ReadonlyArray<infer RK> ?
            ReadonlyArray<LK | RK> :
            ReadonlyArray<LK> :
        R extends ReadonlyArray<infer RK> ? ReadonlyArray<RK> : undefined;

type _MergeFields<L, R> =
    HasKeys<L> extends false ? R :
        HasKeys<R> extends false ? L :
            Assign<L, R>;

type __MergeObject<L, R> = Assign<Assign<L, R>, {
    pick: _MergePicks<//
        Pluck<L, 'pick', undefined>,
        Pluck<R, 'pick', undefined>>,
    fields: _MergeFields<//
        Pluck<L, 'fields'>,
        Pluck<R, 'fields'>>,
    relations: _MergeRelations<//
        Pluck<L, 'relations'>,
        Pluck<R, 'relations'>>,
    children: _MergeChildren<//
        Pluck<L, 'children'>,
        Pluck<R, 'children'>>
}>;
type _MergeObject<L, R> = __MergeObject<L, R>;

type _Merge<L, R> =
    HasKeys<L> extends false ? R :
        HasKeys<R> extends false ? L :
            _MergeObject<L, R>;

export type MergeDataSelection<L, R> = _Merge<L, R>;

