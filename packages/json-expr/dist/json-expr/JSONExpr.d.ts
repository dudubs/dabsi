import { KeysByValue, Pluck, Union } from "../common/typings";
export declare type JSONStringExpr<T> = keyof T;
export declare type JSONOperator = keyof {
    startsWith: any;
    endsWith: any;
    contains: any;
    equals: any;
    notEquals: any;
    lessThan: any;
    lessThanOrEqual: any;
    greaterThan: any;
    greaterThanOrEqual: any;
};
export declare type JSONValueExpr = string | number | boolean;
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
        [K in keyof T]: T[K] extends Array<infer U> ? Record<K, JSONExpr<U>> : T[K] extends object ? Record<K, JSONExpr<T[K]>> : never;
    }>;
    find: Union<{
        [K in KeysByValue<T, any[]>]: {
            of: K;
            where?: JSONExpr<Pluck<T[K], number>>;
            take?: JSONExpr<Pluck<T[K], number>>;
        };
    }>;
    count: KeysByValue<T, any[]> | Union<{
        [K in keyof T]: T[K] extends Array<infer U> ? {
            of: K;
            where?: JSONExpr<U>;
            limit?: number;
        } : never;
    }>;
    search: {
        in: JSONExpr<T>;
        text: string;
    };
}
export declare type JSONObjectExpr<T> = Union<{
    [K in keyof JSONExprTypes<T>]: Pick<JSONExprTypes<T>, K>;
}>;
export declare type JSONArrayExpr<T> = [JSONExpr<T>, JSONOperator, JSONExpr<T>];
export declare type JSONExpr<T> = undefined | JSONStringExpr<T> | JSONObjectExpr<T> | JSONArrayExpr<T>;
export declare function JSONExpr<T>(...exps: Array<JSONExpr<T>>): JSONExpr<T>;
