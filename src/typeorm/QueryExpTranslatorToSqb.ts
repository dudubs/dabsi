import {SelectQueryBuilder} from "typeorm/index";
import {entries} from "../common/object/entries";
import {hasKeys} from "../common/object/hasKeys";
import {DataExp, Parameter} from "../json-exp/DataExp";
import {DataExpTranslatorToSql} from "./exp/DataExpTranslatorToSql";
import {Query} from "./QueryExp";
import {QueryExpTranslator} from "./QueryExpTranslator";

let counter = 0;

@QueryExpTranslator<string>()
export class QueryExpTranslatorToSqb extends DataExpTranslatorToSql<any>
    implements QueryExpTranslator<string> {
    readonly driver;

    constructor(
        public qb: SelectQueryBuilder<any>,
        public schema: string
    ) {
        super();
    }

    get connection() {
        return this.qb.connection
    }

    translateAt(propertyKey: string, exp: DataExp<any>): string {
        return new QueryExpTranslatorToSqb(
            this.qb,
            propertyKey
        ).translate(exp);
    }

    translateParameter(value: Parameter): string {
        const id = 'p_' + (++counter);
        this.qb.setParameter(id, value);
        return ":" + id;
    }

    static build(qb: SelectQueryBuilder<any>,
                 query: Query) {

        const translator = new QueryExpTranslatorToSqb(qb, qb.alias);

        qb.expressionMap.selects.length = 0;

        if (hasKeys(query.fields)) {
            for (const [aliasName, exp] of entries(query.fields)) {
                qb.expressionMap.selects.push({
                    aliasName,
                    selection: translator.translate(exp)
                })
            }

        } else {
            qb.expressionMap.selects.push({
                selection: '*'
            })
        }

        qb.expressionMap.take = query.take;
        qb.expressionMap.skip = query.skip;

        if (query.where !== undefined) {
            qb.andWhere(translator.translate(query.where));
        }

        for (let [aliasName, join] of entries(query.joins)) {
            const condition = join.condition !== undefined ?
                translator.translate(join.condition) : '';

            switch (join.type) {
                case "INNER":
                    qb.innerJoin(join.from, aliasName, condition);
                    break;
                case "LEFT":
                    qb.leftJoin(join.from, aliasName, condition);
                    break;
                default:
                    throw new Error(`Invalid join type ${join.type}`);
            }
        }

        for (const order of (query.order || [])) {

            qb.addOrderBy(
                translator.translate(order.by),
                order.sort,
                order.nulls === "FIRST" ? "NULLS FIRST" :
                    order.nulls === "LAST" ? "NULLS LAST" : undefined
            )
        }


    }


}