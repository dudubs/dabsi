import { ExpMap } from "@dabsi/common/typings2/ExpMap";
import { ExtractKeys } from "@dabsi/common/typings2/ExtractKeys";
import { Union } from "@dabsi/common/typings2/Union";
import { RebaseType } from "@dabsi/typedata/BaseType";
import { DataOperatorExp } from "@dabsi/typedata/exp/operator";

import {
  DataRelationKeys,
  DataRelationToManyKeys,
  DataRelationToOneKeys,
  DataRelationTypeAt,
  DataNonRelationKeys,
} from "@dabsi/typedata/relation";
import { WithDataUnionMetaChildren } from "@dabsi/typedata/union";

export type DataParameterExp = string | number | boolean;
DataOperatorExp;

export type DataCompareToParameterExp<P> =
  | ExpMap<Record<DataOperatorExp.Op, P>>
  // equal to many parameters
  | Record<"$in", P[]>
  | Record<"$notIn", P[]>;

export type DataCompareToExpExp<T> = [DataOperatorExp.Op, DataExp<T>];

export type DataCompareExp<
  T,
  P extends DataParameterExp
> /* equal to parameter */ =
  | P
  | DataCompareToExpExp<T>
  | DataCompareToParameterExp<P>;

export type DataIfExp<Condition, Then, Else> =
  | [Condition, Then, Else]
  | {
      condition: Condition;
      then: Then;
      else?: Else;
    };

export type DataCaseExp<T> = (
  | { if: DataExp<T>; then: DataExp<T> }
  | [DataExp<T>, DataExp<T>]
)[];

export interface DataExpTypes<T> {
  $if: DataIfExp<DataExp<T>, DataExp<T>, DataExp<T>>;

  $case: DataCaseExp<T>;

  $base: DataExp<RebaseType<T>>;

  $is: string[] | string;

  $isNot: string[] | string;

  $and: (DataExp<T> | undefined)[];

  $or: (DataExp<T> | undefined)[];

  $param: DataParameterExp;

  $length: DataExp<T>;

  $join: readonly [readonly DataExp<T>[], string];

  $concat: DataExp<T>[];

  $not: DataExp<T>;

  $search:
    | { in: DataExp<T>; text: string }
    | { notIn: DataExp<T>; text: string };

  $isNull: DataExp<T>;

  $isNotNull: DataExp<T>;

  $ifNull: [DataExp<T>, DataExp<T>];

  // to-one relations
  $at: AtExp<T>;

  $add: DataExp<T>[];

  // to-many relations
  $count:
    | DataRelationToManyKeys<T>
    | Union<
        {
          [K in DataRelationToManyKeys<T>]: Record<K, DataRelationAtExp<T, K>>;
        }
      >;

  // to-many relations
  $has: HasExp<T>;

  $find: FindExp<T>;

  $notHas: HasExp<T>;

  $as: AsExp<T>;

  $countRefs: "all" | "any";
}
export type HasExp<T> =
  | DataRelationKeys<T>
  | Union<
      {
        [K in DataRelationKeys<T>]: Record<K, DataRelationAtExp<T, K>>;
      }
    >;

export type FindExp<T> = Union<
  {
    [K in DataRelationToManyKeys<T>]: Record<K, DataRelationAtExp<T, K>>;
  }
>;
type DataRelationAtExp<T, K extends DataRelationKeys<T>> = DataExp<
  Required<DataRelationTypeAt<T, K>>
>;

export type AtExp<T> = Union<
  {
    [K in DataRelationToOneKeys<T>]:
      | Record<K, DataRelationAtExp<T, K>>
      | [K, DataRelationAtExp<T, K>];
  }
>;

export type AsExp<T> = T extends WithDataUnionMetaChildren<infer Children> //
  ? Union<
      {
        [K in keyof Children]: Record<K, DataExp<Children[K]>>;
      }
    >
  : never;

export type DataExpType<T, E> = E extends keyof T ? T[E] : any;

export type DataUnionExp<T> = Union<
  {
    [K in keyof DataExpTypes<T>]: Pick<DataExpTypes<T>, K>;
  }
>;

export type DataCompareMapExp<T> = {
  [K in ExtractKeys<Required<T>, DataParameterExp>]?: DataCompareExp<
    T,
    Extract<Required<T>[K], DataParameterExp>
  >;
};

export type DataObjectExp<T> =
  | DataUnionExp<T>
  | DataCompareMapExp<T>
  | DataArrayExp<T>;

export type DataArrayExp<T> =
  | readonly [DataParameterExp]

  // compare exp to parameter
  | readonly [DataExp<T>, DataCompareToParameterExp<DataParameterExp>]

  // compare between two expressions
  | readonly [DataExp<T>, DataOperatorExp.Op, DataExp<T>]

  // compare one expression to many expressions
  | readonly [DataExp<T>, "$in" | "$notIn", DataExp<T>[]];

export type DataStringExp<T> = DataNonRelationKeys<T>;

export type DataExp<T> =
  | boolean
  | number
  | null
  | DataStringExp<T>
  | DataObjectExp<T>;

export function DataExp<T>(
  ...exps: Array<DataExp<T> | undefined>
): DataExp<T> | undefined {
  exps = [...flat({ $and: exps })];
  return exps.length > 1 ? { $and: exps } : exps[0];

  function* flat(exp) {
    if (Array.isArray(exp?.$and)) {
      for (let subExp of exp.$and) {
        yield* flat(subExp);
      }
      return;
    }
    if (exp !== undefined) yield exp;
  }
}
