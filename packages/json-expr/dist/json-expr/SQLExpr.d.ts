import { SelectQueryBuilder } from "typeorm";
import { JSONValueExpr, JSONExpr, JSONOperator } from "./JSONExpr";
import { JSONComplexExpr, JSONExprTranslator } from "./JSONExprTranslator";
export declare class SQLExprTranslator<T> extends JSONExprTranslator<T, string> {
    qb: SelectQueryBuilder<T>;
    schema: string;
    constructor(qb: SelectQueryBuilder<T>, schema: string);
    translateLogical(all: boolean, exps: JSONExpr<T>[]): string;
    translateCompare(op: JSONOperator, left: JSONExpr<T>, right: JSONExpr<T>): string;
    translateCount<K extends keyof T>(key: K, where: JSONExpr<T[K]>, limit: number): string;
    translateValue(value: JSONValueExpr): string;
    translateComplex(c: JSONComplexExpr<T>): string;
    translateConcat(exps: JSONExpr<T>[]): string;
}
