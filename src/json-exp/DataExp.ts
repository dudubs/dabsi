import {ArrayTypeOrObject, Expression, ExtractKeys, Union} from "../common/typings";
import {IndexedSeq} from "../immutable2";


/*
TODO: type hinit for
    $boolean:
    $string:
    $number:


 */


export type SymbolicCompareOperator = keyof {
    '^=',
    '$=',
    '*=',
    '=',
    '!=',
    '<',
    '<=',
    '>',
    '>=',
};


export type NamedCompareOperator = keyof {
    $startsWith,
    $endsWith,
    $contains,
    $equals,
    $notEquals,
    $lessThan,
    $lessThanOrEqual,
    $greaterThan,
    $greaterThanOrEqual,
};

export type CompareOperator = NamedCompareOperator | SymbolicCompareOperator;

export type Parameter = string | number | boolean;

export type CompareToParameter<P> =
    Expression<Record<CompareOperator, P>>
    // equal to many parameters
    | Record<"$in" | "$notIn", P[]>

export type CompareToExp<T> = [CompareOperator, DataExp<T>];

export type Comparator<T, P extends Parameter> =
/* equal to parameter */ P
    | CompareToExp<T>
    | CompareToParameter<P> ;


export type IfOperator<Condition, Then, Else> = [Condition, Then, Else] | {
    condition: Condition,
    then: Then,
    else?: Else
};

export type DataExpOperatorsTypes<T> = {

    $if: IfOperator<DataExp<T>, DataExp<T>, DataExp<T>>;

    $case: ({ if: DataExp<T>, then: DataExp<T> } | [DataExp<T>, DataExp<T>])[];


    // TODO: $string: DataExp<T>
    // TODO: $number: DataExp<T>
    // TODO: $boolean: DataExp<T>
    // TODO: $nullable: DataExp<T>

    $is: string[] | string;

    $and: DataExp<T>[];

    $or: DataExp<T>[];

    $value: Parameter;

    $length: DataExp<T>;

    $join: [DataExp<T>[], string];

    $concat: DataExp<T>[];

    $not: DataExp<T>;

    $search: {
        // TODO: inverse: boolean,
        in: DataExp<T>,
        text: string
    }

    $isNull: DataExp<T>;

    $isNotNull: DataExp<T>;

    $ifNull: [DataExp<T>, DataExp<T>];

    ///
    $at: Union<{
        [K in ExtractKeys<Required<T>, object>]:
        Record<K, DataExp<ArrayTypeOrObject<T[K]>>>
    }>;


    $from: Union<{
        [K in keyof Required<T>]:

        T[K] extends Array<infer U> ? Record<K, {
                where?: DataExp<U>,
                take: DataExp<U>
            }> :
            never
    }>;

    $count: ExtractKeys<T, any[]> | Union<{
        [K in keyof T]:
        T[K] extends Array<infer U> ? Record<K, DataExp<U>> :
            never
    }>;

    $has: ExtractKeys<T, any[]> | Union<{
        [K in keyof T]:
        T[K] extends Array<infer U> ? Record<K, DataExp<U>> :
            never
    }>;

}

export type DataExpType<T, E extends DataExp<T>> =
    E extends keyof T ? T[E] : any;

export type OperatorDataExp<T> = Union<{
    [K in keyof DataExpOperatorsTypes<T>]:
    Pick<DataExpOperatorsTypes<T>, K>
}>;


export type CompareMap<T> = {
    [K in ExtractKeys<Required<T>, Parameter>]?:
    Comparator<T, Extract<T[K], Parameter>>;
};

export type ObjectDataExp<T> =
    OperatorDataExp<T> |
    CompareMap<T> |
    ArrayDataExp<T>;

export type ArrayDataExp<T> =
    // compare exp to parameter
    [DataExp<T>,CompareToParameter<Parameter>]
    // compare between two expressions
    | [DataExp<T>, CompareOperator, DataExp<T>]
    // compare one expression to many expressions
    | [DataExp<T>, "$in" | "$notIn", DataExp<T>[]]
    // parameter
    | [Parameter];

export type StringDataExp<T> = string & keyof Required<T>;

export type DataExp<T> =
    undefined |
    boolean |
    number |
    null |
    StringDataExp<T> |
    ObjectDataExp<T>;


export function DataExp<T>(...exps: Array<DataExp<T>>): DataExp<T> {
    exps = IndexedSeq(exps)
        .flatMap(function* mapper(exp): Iterable<DataExp<T>> {
            if (exp && (typeof exp == "object") && ('$and' in exp)) {
                yield* IndexedSeq(<any>exp.$and).flatMap(mapper)
            } else if (typeof exp !== "undefined") {
                yield exp
            }
        })
        .toArray();
    return exps.length > 1 ? {$and: exps} : exps[0];
}


