import {SelectQueryBuilder} from "typeorm";
import {EntityMetadata} from "typeorm/metadata/EntityMetadata";
import {assert} from "../../common/assert";
import {defined} from "../../common/object/defined";
import {EntityDataKey} from "../../data/eds/EntityDataKey";
import {CompareOperator, DataExp, StringDataExp, NamedCompareOperator, Parameter} from "../../json-exp/DataExp";
import {DataExpTranslator} from "../../json-exp/DataExpTranslator";
import {EntityRelation} from "../relations";

let counter = 0;

const SQLOperators: Record<NamedCompareOperator, string> = {
    $equals: '=',
    $notEquals: '!=',
    $lessThan: '<',
    $lessThanOrEqual: '<=',
    $greaterThan: '>',
    $greaterThanOrEqual: '=>',
    $startsWith: ' LIKE ',
    $endsWith: ' LIKE ',
    $contains: ' LIKE '
};

export class QbDataExpTranslator<T> extends DataExpTranslator<T, string> {


    constructor(public qb: SelectQueryBuilder<T>,
                public schema: string,
                protected _rootQb: SelectQueryBuilder<T>) {
        super();

    }

    True = '1';

    False = '1';

    Null = 'NULL';

    get rootQb(): SelectQueryBuilder<any> {
        return this._rootQb ?? this.qb;
    }

    translateIsNull(exp: string): string {
        return `${exp} IS NULL`;
    }

    translateIsNotNull(exp: string): string {
        return `${exp} IS NOT NULL`;
    }

    translateAnd(exps: string[]): string {
        exps =
            // optimization
            exps.filter(exp => exp !== this.True)
        if (1 >= exps.length)
            return exps[0] ?? this.True;
        return `(${exps.join(' AND ')})`
    }

    translateOr(exps: string[]): string {
        // optimization
        for (const exp of exps) {
            if (exp === this.True) {
                return exp;
            }
        }
        if (1 >= exps.length)
            return exps[0] ?? this.True;
        return `(${exps.join(' OR ')})`
    }

    translateCompare(op: CompareOperator, left: string, right: string): string {
        switch (op) {
            case "$startsWith":
                right = this.translateConcat([right, "'%'"]);
                break;

            case "$endsWith":
                right = this.translateConcat(["'%'", right]);
                break;

            case "$contains":
                right = this.translateConcat(["'%'", right, "'%'"]);
                break;
        }
        return `${left}${SQLOperators[op]}${right}`;
    }


    get schemaMetadata(): EntityMetadata {
        return defined(this.qb.expressionMap.aliases
            .find(alias => alias.name === this.schema), () =>
            `No schemaMetadata ${this.schema}`)
            .metadata;
    }


    getToManyTranslator(propertyName: string): QbDataExpTranslator<any> {

        const debug = false;

        const leftRelationMetadata = defined(
            this.schemaMetadata.relations.find(r => r.propertyName === propertyName), () =>
                `No relation by key for ${propertyName}`);

        assert(typeof leftRelationMetadata.target === "function");

        const relation = new EntityRelation(this.qb.connection,
            leftRelationMetadata.target,
            propertyName, false);

        const rightSchema = debug ? "_right" :
            `${relation.left.entityMetadata.tableName}_${
                relation.propertyName
            }_${relation.right.entityMetadata.tableName}_${++this.counter}`;

        let subQb: SelectQueryBuilder<any>;


        if (relation.ownerRelationMetadata.joinTableName) {
            const joinSchema = debug ? "_join" : rightSchema + '_join';

            subQb = this.qb.connection
                .createQueryBuilder(
                    relation.ownerRelationMetadata.joinTableName,
                    joinSchema)
                .innerJoin(relation.right.entityType, rightSchema,
                    relation.getJoinToTableCondition(this.schema, joinSchema)
                    + ' AND ' +
                    relation.getJoinFromTableCondition(rightSchema, joinSchema)
                )
        } else {
            subQb = this.qb.connection
                .getRepository(leftRelationMetadata.type)
                .createQueryBuilder(rightSchema)
                .andWhere(relation.columnCondition(this.schema, rightSchema))

        }

        return new QbDataExpTranslator<any>(subQb, rightSchema, this.rootQb)
    }


    translateQueryBuilder(key: string,
                          where: DataExp<any>,
                          callback: (qb: SelectQueryBuilder<any>,
                                     translator: QbDataExpTranslator<any>) => void
    ): string {
        const subTranslator = this.getToManyTranslator(key);
        callback(subTranslator.qb, subTranslator);
        if (where) {
            subTranslator.qb.andWhere(subTranslator.translate(where))
        }

        return `(${subTranslator.qb.getQuery()})`
    }


    translateFromExp(key: string, take: DataExp<any>, where: DataExp<any>): string {
        return this.translateQueryBuilder(
            key, where,
            (qb, translator) => {
                qb.select(translator.translate(take));
            }
        )
    }

    translateCountExp(key: string, where: DataExp<any>, maxCount: number): string {
        return this.translateQueryBuilder(key, where, qb => {
            qb.select('COUNT(*)')
            if (maxCount) {
                qb.limit(maxCount)
            }
        })
    }

    counter = 0;

    translateFieldExp(key: StringDataExp<T>): string {
        return `${this.schema}.${key}`
    }

    translateValue(value: Parameter): string {
        const key = `v_${counter++}_${this.counter++}`
        this.rootQb.setParameter(key, value);
        return ':' + key;
    }


    translateLength(exp: string): string {
        return `LENGTH(${exp})`
    }

    translateNot(exp: string): string {
        return `NOT ${exp}`
    }


    translateAt(key: string, exp: DataExp<any>): string {
        assert(typeof this.schemaMetadata.target === "function");
        const relation = new EntityRelation(this.qb.connection,
            this.schemaMetadata.target, key, false);
        const rightSchema = relation.join("LEFT", this.qb, this.schema);
        return new QbDataExpTranslator(this.qb, rightSchema, this.rootQb).translate(exp);
    }

    translateIs(key: string): string {

        return this.translate(
            <any>EntityDataKey.parse(
                this.schemaMetadata,
                key
            )
        )
    }

    translateIf(condition: string, expIfTrue: string, expIfFalse: string): string {
        switch (this.qb.connection.driver.options.type) {
            case "sqlite":
                return `(CASE WHEN ${condition} THEN ${expIfTrue} ELSE ${expIfFalse} END)`

            default:
                return `IF(${condition},${expIfTrue},${expIfFalse})`
        }
    }

    translateConcat(exps: string[]): string {
        switch (this.qb.connection.driver.options.type) {
            case "sqlite":
                return `(${exps.join("||")})`;
            default:
                return `CONCAT(${exps.join(",")})`
        }
    }

    translateIn(where: string, values: string[]): string {
        return `${where} IN (${
            values.join(",")
        })`
    }

    translateNotIn(where: string, values: string[]): string {
        return `${where} NOT IN (${
            values.join(",")
        })`
    }

    translateIfNull(exp: string, alt_value: string): string {
        return `IFNULL(${exp},${alt_value})`
    }

}


