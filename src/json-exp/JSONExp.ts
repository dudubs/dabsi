import {Seq} from "immutable";
import {ArrayTypeOrObject, Expression, ExtractKeys, Union} from "../common/typings";


export type JSONFieldKey<T> = string & keyof Required<T>;


export type JSONSymbolicOperator = keyof {
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

export const JSONSymbolicToNamedOperator: Record<JSONSymbolicOperator, JSONNamedOperator> = {
    '^=': '$startsWith',
    '$=': '$endsWith',
    '*=': '$contains',
    '=': '$equals',
    '!=': '$notEquals',
    '<': '$lessThan',
    '<=': '$lessThanOrEqual',
    '>': '$greaterThan',
    '>=': '$greaterThanOrEqual',
};

export type JSONNamedOperator = keyof {
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


export type JSONCompareOperator = JSONNamedOperator | JSONSymbolicOperator;

export type JSONPrimitive = string | number | boolean;


export type JSONFieldsExp<T> = {
    [K in ExtractKeys<T, JSONPrimitive>]?:
    JSONFieldExp<T, Extract<T[K], JSONPrimitive>>;
};


export type JSONCompareToValue<V> =
    Expression<Record<JSONCompareOperator, V>>;

export type JSONCompareToExp<T> = [JSONCompareOperator, JSONExp<T>];

export type JSONFieldExp<T, V extends JSONPrimitive> =
    V |

    JSONCompareToExp<T> |
    JSONCompareToValue<V> ;


export interface JSONExpTypes<T> {

    $if: [JSONExp<T>, JSONExp<T>, JSONExp<T>?] | {
        condition: JSONExp<T>,
        then: JSONExp<T>,
        else?: JSONExp<T>
    };

    $case: ({ if: JSONExp<T>, then: JSONExp<T> } | [JSONExp<T>, JSONExp<T>])[];


    $is: string[] | string;

    $and: JSONExp<T>[];

    $or: JSONExp<T>[];

    $value: JSONPrimitive;

    $length: JSONExp<T>;

    $join: [JSONExp<T>[], string];

    $concat: JSONExp<T>[];

    $not: JSONExp<T>;

    $search: {
        // TODO: inverse: boolean,
        in: JSONExp<T>,
        text: string
    }

    $isNull: JSONExp<T>;

    $isNotNull: JSONExp<T>;

    $ifNull: [JSONExp<T>, JSONExp<T>];

    ///
    $at: Union<{
        [K in ExtractKeys<Required<T>, object>]:
        Record<K, JSONExp<ArrayTypeOrObject<T[K]>>>
    }>;


    $from: Union<{
        [K in keyof Required<T>]:

        T[K] extends Array<infer U> ? Record<K, {
                where?: JSONExp<U>,
                take: JSONExp<U>
            }> :
            never
    }>;

    $count: ExtractKeys<T, any[]> | Union<{
        [K in keyof T]:
        T[K] extends Array<infer U> ? Record<K, JSONExp<U>> :
            never
    }>;

    $has: ExtractKeys<T, any[]> | Union<{
        [K in keyof T]:
        T[K] extends Array<infer U> ? Record<K, JSONExp<U>> :
            never
    }>;

}

export type JSONExpType<T, E extends JSONExp<T>> = E extends keyof T ? T[E] : any;

export type JSONLiteralExp<T> =
    Union<{
        [K in keyof JSONExpTypes<T>]:
        Pick<JSONExpTypes<T>, K>
    }>;

export type JSONObjectExp<T> =
    JSONLiteralExp<T> |
    JSONFieldsExp<T> |
    JSONArrayExp<T>;

export type JSONArrayExp<T> =
    [JSONExp<T>, Expression<Record<JSONCompareOperator, JSONPrimitive>> | { $in: JSONPrimitive[] }]
    | [JSONExp<T>, JSONCompareOperator, JSONExp<T>]
    | [JSONExp<T>, "$in", JSONExp<T>[]]
    | [string];

export type JSONExp<T> =
    undefined |
    boolean |
    number |
    null |
    JSONFieldKey<T> |
    JSONObjectExp<T>;


export function JSONExp<T>(...exps: Array<JSONExp<T>>): JSONExp<T> {
    exps = Seq.Indexed(exps).flatMap(function callback(exp): Iterable<JSONExp<T>> {
        if (!exp)
            return [];
        if (typeof exp === "object") {
            if ("$and" in exp) {
                return Seq.Indexed(exp.$and).flatMap(callback);
            }
        }
        return [exp];
    }).toArray()
    return exps.length > 1 ? {$and: exps} : exps[0];
}

/*
    [key, {$startsWith: ...}],
    {key: {$startsWith: ...}}
    {key: ["$startsWith", ...]
 */

