import {
  AssignKeys,
  HasKeys,
  Merge,
  PluckRequired,
} from "../../common/typings";

type _MergeRelation<L, R> = L extends boolean
  ? R
  : R extends boolean
  ? L
  : _MergeObject<L, R>;

type _MergeRelations<L, R> = Merge<
  L,
  R,
  {
    [K in keyof R]: _MergeRelation<
      //
      PluckRequired<L, K, undefined>,
      R[K]
    >;
  }
>;

type _MergeChildren<L, R> = Merge<
  L,
  R,
  {
    [RK in keyof R]: _Merge<
      //
      PluckRequired<L, RK, undefined>, // L ChildOf K
      R[RK]
      ///
    >;
  }
>;

type _MergePicks<L, R> = L extends ReadonlyArray<infer LK>
  ? R extends ReadonlyArray<infer RK>
    ? ReadonlyArray<LK | RK>
    : ReadonlyArray<LK>
  : R extends ReadonlyArray<infer RK>
  ? ReadonlyArray<RK>
  : undefined;

type _MergeObject<L, R> = Merge<
  L,
  R,
  {
    pick: _MergePicks<
      //
      PluckRequired<L, "pick", undefined>,
      PluckRequired<R, "pick", undefined>
    >;
    fields: AssignKeys<
      //
      PluckRequired<L, "fields">,
      PluckRequired<R, "fields">
    >;
    relations: _MergeRelations<
      //
      PluckRequired<L, "relations">,
      PluckRequired<R, "relations">
    >;
    children: _MergeChildren<
      //
      PluckRequired<L, "children">,
      PluckRequired<R, "children">
    >;
  }
>;

type _Merge<L, R> = HasKeys<L> extends false
  ? R
  : HasKeys<R> extends false
  ? L
  : _MergeObject<L, R>;

export type MergeDataSelection<L, R> = _Merge<L, R>;
