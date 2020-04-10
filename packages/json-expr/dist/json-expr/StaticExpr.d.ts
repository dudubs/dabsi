import { JSONOperator, JSONExpr } from "./JSONExpr";
import { JSONComplexExpr, JSONExprTranslator } from "./JSONExprTranslator";
export declare type StaticExpr<T> = (value: T) => any;
export declare const StaticOperators: Record<JSONOperator, any>;
export declare class StaticExprTranslator<T> extends JSONExprTranslator<T, StaticExpr<T>> {
    translateLogical(all: boolean, exps: JSONExpr<T>[]): StaticExpr<T>;
    translateComplex(c: JSONComplexExpr<T>): StaticExpr<T>;
    translateCount<K extends keyof T>(key: K, where: JSONExpr<T[K]>, limit: number): StaticExpr<T>;
    translateCompare(op: JSONOperator, left: JSONExpr<T>, right: JSONExpr<T>): StaticExpr<T>;
}
export declare function StaticExpr<T>(value: T, expr: JSONExpr<T>): any;
