import { ExpMap, ExtractKeys, Union } from "../../common/typings";
import { GetBaseType } from "../BaseType";
import { DataUnionChildren } from "../DataUnion";
import {
  NonRelationKeys,
  RelationKeys,
  RelationToManyKeys,
  RelationToOneKeys,
  RelationTypeAt,
} from "../Relation";

export type DataSymbolicCompareOperator = keyof {
  "^=";
  "$=";
  "*=";
  "=";
  "!=";
  "<";
  "<=";
  ">";
  ">=";
};

export type DataNamedCompareOperator = keyof {
  $startsWith;
  $endsWith;
  $contains;
  $notStartsWith;
  $notEndsWith;
  $notContains;
  $equals;
  $notEquals;
  $lessThan;
  $lessThanOrEqual;
  $greaterThan;
  $greaterThanOrEqual;
};

export type DataCompareOperator =
  | DataNamedCompareOperator
  | DataSymbolicCompareOperator;

export type DataParameterExp = string | number | boolean;

export type DataCompareToParameterExp<P> =
  | ExpMap<Record<DataCompareOperator, P>>
  // equal to many parameters
  | Record<"$in", P[]>
  | Record<"$notIn", P[]>;

export type DataCompareToExpExp<T> = [DataCompareOperator, DataExp<T>];

export type DataComparatorExp<
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

export type DataExpTypes<T> = {
  $if: DataIfExp<DataExp<T>, DataExp<T>, DataExp<T>>;

  $case: DataCaseExp<T>;

  $base: DataExp<GetBaseType<T>>;

  // TODO: $is: string | number | { $key: str... }
  $is: string[] | string;

  $isNot: string[] | string;

  $and: DataExp<T>[];

  $or: DataExp<T>[];

  $parameter: DataParameterExp;

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

  // to-many relations
  $count:
    | RelationToManyKeys<T>
    | Union<
        {
          [K in RelationToManyKeys<T>]: Record<K, RelationAtExp<T, K>>;
        }
      >;

  // to-many relations
  $has: HasExp<T>;

  $notHas: HasExp<T>;

  $as: AsExp<T>;
};
export type HasExp<T> =
  | RelationToManyKeys<T>
  | Union<
      {
        [K in RelationKeys<T>]: Record<K, RelationAtExp<T, K>>;
      }
    >;

type RelationAtExp<T, K extends RelationKeys<T>> = DataExp<
  Required<RelationTypeAt<T, K>>
>;

export type AtExp<T> = Union<
  {
    [K in RelationToOneKeys<T>]: Record<K, RelationAtExp<T, K>>;
  }
>;

export type AsExp<T> = T extends DataUnionChildren<infer Children> //
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

export type DataCompareExp<T> = {
  [K in ExtractKeys<Required<T>, DataParameterExp>]?: DataComparatorExp<
    T,
    Extract<Required<T>[K], DataParameterExp>
  >;
};

export type DataObjectExp<T> =
  | DataUnionExp<T>
  | DataCompareExp<T>
  | DataArrayExp<T>;

export type DataArrayExp<T> =
  | readonly [DataParameterExp]

  // compare exp to parameter
  | readonly [DataExp<T>, DataCompareToParameterExp<DataParameterExp>]

  // compare between two expressions
  | readonly [DataExp<T>, DataCompareOperator, DataExp<T>]

  // compare one expression to many expressions
  | readonly [DataExp<T>, "$in" | "$notIn", DataExp<T>[]];

export type DataStringExp<T> = NonRelationKeys<T>;

export type DataExp<T> =
  | undefined
  | boolean
  | number
  | null
  | DataStringExp<T>
  | DataObjectExp<T>;

export function DataExp<T>(...exps: Array<DataExp<T>>): DataExp<T> {
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
