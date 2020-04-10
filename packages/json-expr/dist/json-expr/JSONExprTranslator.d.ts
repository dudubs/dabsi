import { Union } from "../common/typings";
import { JSONExpr, JSONExprTypes, JSONOperator } from "./JSONExpr";
export declare type JSONComplexExpr<T> = Union<{
    [K in keyof JSONExprTypes<T>]: {
        type: K;
        value: JSONExprTypes<T>[K];
    };
}>;
export declare abstract class JSONExprTranslator<T, U> {
    abstract translateCompare(op: JSONOperator, left: JSONExpr<T>, right: JSONExpr<T>): U;
    abstract translateCount<K extends keyof T>(key: K, where: JSONExpr<T[K]>, limit: number): U;
    abstract translateLogical(all: boolean, exps: JSONExpr<T>[]): U;
    translateComplex(c: JSONComplexExpr<T>): U;
    translate(expr: JSONExpr<T>): U;
}
