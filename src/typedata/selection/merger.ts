import { AssignKeys } from "@dabsi/common/typings2/AssignKeys";
import { HasKeys } from "@dabsi/common/typings2/boolean";
import { Merge } from "@dabsi/common/typings2/Merge";
import { PluckDefined } from "@dabsi/common/typings2/Pluck";

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
      PluckDefined<L, K, undefined>,
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
      PluckDefined<L, RK, undefined>, // L ChildOf K
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
      PluckDefined<L, "pick", undefined>,
      PluckDefined<R, "pick", undefined>
    >;
    fields: AssignKeys<
      //
      PluckDefined<L, "fields">,
      PluckDefined<R, "fields">
    >;
    relations: _MergeRelations<
      //
      PluckDefined<L, "relations">,
      PluckDefined<R, "relations">
    >;
    children: _MergeChildren<
      //
      PluckDefined<L, "children">,
      PluckDefined<R, "children">
    >;
  }
>;

type _Merge<L, R> = HasKeys<L> extends false
  ? R
  : HasKeys<R> extends false
  ? L
  : _MergeObject<L, R>;

export type DataMergedSelection<L, R> = _Merge<L, R>;
