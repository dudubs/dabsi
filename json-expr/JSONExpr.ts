import {KeysByValue, Pluck, Union} from "../common/typings";

export type JSONStringExpr<T> = keyof T;


export type JSONOperator = keyof {
    startsWith,
    endsWith,
    contains,
    equals,
    notEquals,
    lessThan,
    lessThanOrEqual,
    greaterThan,
    greaterThanOrEqual,
};

export type JSONValueExpr = string | number | boolean;

export interface JSONExprTypes<T> {

    all: JSONExpr<T>[];

    any: JSONExpr<T>[];

    value: JSONValueExpr;

    is: T;

    field: JSONStringExpr<T>;

    concat: JSONExpr<T>[];

    not: JSONExpr<T>;

    boolean: boolean;

    at: Union<{
        [K in keyof T]:
        T[K] extends Array<infer U> ?
            Record<K, JSONExpr<U>> :
            T[K] extends object ? Record<K, JSONExpr<T[K]>> :
                never
    }>;

    find: Union<{
        [K in KeysByValue<T, any[]>]: {
            of: K,
            where?: JSONExpr<Pluck<T[K], number>>,
            take?: JSONExpr<Pluck<T[K], number>>
        }
    }>;


    count: KeysByValue<T, any[]> | Union<{
        [K in keyof T]:
        T[K] extends Array<infer U> ? {
                of: K,
                where?: JSONExpr<U>,
                limit?: number
            } :
            never
    }>;

    search: {
        in: JSONExpr<T>,
        text: string
    }
}


export type JSONObjectExpr<T> = Union<{
    [K in keyof JSONExprTypes<T>]:
    Pick<JSONExprTypes<T>, K>
}>;


export type JSONArrayExpr<T> = [JSONExpr<T>, JSONOperator, JSONExpr<T>];

export type JSONExpr<T> =
    undefined |
    JSONStringExpr<T> |
    JSONObjectExpr<T> |
    JSONArrayExpr<T>;


export function JSONExpr<T>(...exps: Array<JSONExpr<T>>): JSONExpr<T> {
    exps = exps.filter(exp => !!exp);
    return exps.length > 1 ? {all: exps} : exps[0];
}
