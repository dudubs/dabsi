import {ArrayTypeOrObject, Expression, KeysByValue, Union} from "../common/typings";


export type JSONFieldKey<T> = string & KeysByValue<T, JSONPrimitive>;


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
    [K in KeysByValue<T, JSONPrimitive>]?:
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

    $is: T;

    $isNot: T;

    $all: JSONExp<T>[];

    $any: JSONExp<T>[];

    $value: JSONPrimitive;

    $length: JSONExp<T>;

    $concat: JSONExp<T>[];

    $not: JSONExp<T>;

    $search: {
        in: JSONExp<T>,
        text: string
    }

    ///
    $at: Union<{
        [K in KeysByValue<T, object>]:

        Record<K, JSONExp<ArrayTypeOrObject<T[K]>>>
    }>;


    $from: Union<{
        [K in keyof T]:

        T[K] extends Array<infer U> ? Record<K, {
                where?: JSONExp<U>,
                take: JSONExp<U>
            }> :
            never
    }>;


    $count: KeysByValue<T, any[]> | Union<{
        [K in keyof T]:
        T[K] extends Array<infer U> ? Record<K, JSONExp<U>> :
            never
    }>;

    $has: KeysByValue<T, any[]> | Union<{
        [K in keyof T]:
        T[K] extends Array<infer U> ? Record<K, JSONExp<U>> :
            never
    }>;

}


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
    [JSONExp<T>, Expression<Record<JSONCompareOperator, JSONPrimitive>>|{ $in: JSONPrimitive[] }]
    | [JSONExp<T>, JSONCompareOperator, JSONExp<T>]
    | [JSONExp<T>, "$in", JSONExp<T>[]];

export type JSONExp<T> =
    undefined |
    boolean |
    number |
    JSONFieldKey<T> |
    JSONObjectExp<T>;


export function JSONExp<T>(...exps: Array<JSONExp<T>>): JSONExp<T> {
    exps = exps.filter(exp => !!exp);
    return exps.length > 1 ? {$all: exps} : exps[0];
}

/*
    [key, {$startsWith: ...}],
    {key: {$startsWith: ...}}
    {key: ["$startsWith", ...]
 */
