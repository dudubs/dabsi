import {SelectQueryBuilder} from "typeorm";
import {DataExp} from "../../json-exp/DataExp";
import {QbDataExpTranslator} from "./QbDataExpTranslator";

export function translateQbDataExp<T>(
    qb: SelectQueryBuilder<T>,
    exp: DataExp<T>,
    schema: string = qb.alias
) {
    return new QbDataExpTranslator(qb, schema ?? schema, qb).translate(exp)
}
