import {
  ExpMap,
  ExtractKeys,
  IsEmptyObject,
  Union,
} from "../../common/typings";
import { RebaseType } from "../BaseType";
import { DataUnionChildren } from "../DataUnion";
import {
  NonRelationKeys,
  RelationKeys,
  RelationToManyKeys,
  RelationToOneKeys,
  RelationTypeAt,
} from "../Relation";
import { IndexedSeq } from "../../immutable2";

/*
TODO: type hinit for
    $boolean:
    $string:
    $number:


 */

export type SymbolicCompareOperator = keyof {
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

export type NamedCompareOperator = keyof {
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

export type CompareOperator = NamedCompareOperator | SymbolicCompareOperator;

export type Parameter = string | number | boolean;

export type CompareToParameter<P> =
  | ExpMap<Record<CompareOperator, P>>
  // equal to many parameters
  | Record<"$in" | "$notIn", P[]>;

export type CompareToExp<T> = [CompareOperator, DataExp<T>];

export type Comparator<T, P extends Parameter> /* equal to parameter */ =
  | P
  | CompareToExp<T>
  | CompareToParameter<P>;

export type IfExp<Condition, Then, Else> =
  | [Condition, Then, Else]
  | {
      condition: Condition;
      then: Then;
      else?: Else;
    };

export type CaseExp<T> = (
  | { if: DataExp<T>; then: DataExp<T> }
  | [DataExp<T>, DataExp<T>]
)[];

export type DataMappedExpTypes<T> = {
  $if: IfExp<DataExp<T>, DataExp<T>, DataExp<T>>;

  $case: CaseExp<T>;

  $base: DataExp<RebaseType<T>>;

  // TODO: $is: string | number | { $key: str... }
  $is: string[] | string;

  $isNot: string[] | string;

  $and: DataExp<T>[];

  $or: DataExp<T>[];

  $parameter: Parameter;

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
// DataExp<RelationTypeAt<T, K>>;

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

export type DataMappedExp<T> = Union<
  {
    [K in keyof DataMappedExpTypes<T>]: Pick<DataMappedExpTypes<T>, K>;
  }
>;

export type CompareMap<T> = {
  [K in ExtractKeys<Required<T>, Parameter>]?: Comparator<
    T,
    Extract<T[K], Parameter>
  >;
};

export type ObjectDataExp<T> =
  | DataMappedExp<T>
  | CompareMap<T>
  | ArrayDataExp<T>;

export type ArrayDataExp<T> =
  | readonly [Parameter]

  // compare exp to parameter
  | readonly [DataExp<T>, CompareToParameter<Parameter>]

  // compare between two expressions
  | readonly [DataExp<T>, CompareOperator, DataExp<T>]

  // compare one expression to many expressions
  | readonly [DataExp<T>, "$in" | "$notIn", DataExp<T>[]];

export type StringDataExp<T> = NonRelationKeys<T>;

export type DataExp<T> =
  | undefined
  | boolean
  | number
  | null
  | StringDataExp<T>
  | ObjectDataExp<T>;

export function DataExp<T>(...exps: Array<DataExp<T>>): DataExp<T> {
  exps = IndexedSeq(exps)
    .flatMap(function* mapper(exp: any): Iterable<DataExp<T>> {
      if (exp && typeof exp == "object" && "$and" in exp) {
        yield* IndexedSeq(<any>exp.$and).flatMap(mapper);
      } else if (typeof exp !== "undefined") {
        yield exp;
      }
    })
    .toArray();
  return exps.length > 1 ? { $and: exps } : exps[0];
}
