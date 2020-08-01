import {SelectQueryBuilder} from "typeorm";
import {inspect} from "util";
import {defined} from "../../common/object/defined";
import {definedAt} from "../../common/object/definedAt";
import {DataTypeInfo} from "../../data/DataTypeInfo";
import {createQbArrayParameter, createQbParameter} from "../../data/eds/createQueryBuilderParameter";
import {EntityDataKey} from "../../data/eds/EntityDataKey";
import {CompareOperator, DataExp, NamedCompareOperator, Parameter, StringDataExp} from "../../json-exp/DataExp";
import {DataExpTranslator} from "../../json-exp/DataExpTranslator";
import {EntityRelation} from "../relations";

let counter = 0;

const SQLOperators: Record<NamedCompareOperator, string> = {
    $equals: '=',
    $notEquals: '!=',
    $lessThan: '<',
    $lessThanOrEqual: '<=',
    $greaterThan: '>',
    $greaterThanOrEqual: '>=',

    $startsWith: ' LIKE ',
    $endsWith: ' LIKE ',
    $contains: ' LIKE ',

    $notStartsWith: ' NOT LIKE ',
    $notEndsWith: ' NOT LIKE ',
    $notContains: ' NOT LIKE '
};

export class QbDataExpTranslator<T> extends DataExpTranslator<T, string> {


    constructor(
        public typeInfo: DataTypeInfo,
        public qb: SelectQueryBuilder<T>,
        public schema: string,
        public rootQb: SelectQueryBuilder<T>
    ) {
        super();

    }

    True = '1';

    False = '1';

    Null = 'NULL';


    protected get driver() {
        return this.qb.connection.driver;
    }

    translateIsNull(inverse: boolean, exp: string): string {
        return `${exp} IS${inverse ? " NOT" : ""} NULL`;
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
            case "$notStartsWith":
                right = this.translateConcat([right, "'%'"]);
                break;

            case "$endsWith":
            case "$notEndsWith":
                right = this.translateConcat(["'%'", right]);
                break;

            case "$contains":
            case "$notContains":
                right = this.translateConcat(["'%'", right, "'%'"]);
                break;
        }
        return `${left}${defined(SQLOperators[op], () =>
            `Can't translate "${op}".`)}${right}`;
    }


    // get schemaMetadata(): EntityMetadata {
    //     return defined(this.qb.expressionMap.aliases
    //         .find(alias => alias.name === this.schema), () =>
    //         `No schemaMetadata ${this.schema}`)
    //         .metadata;
    // }
    //

    translateSubQuery(propertyName: string,
                      where: DataExp<any>,
                      callback: (subQb: SelectQueryBuilder<any>,
                                 subTranslator: QbDataExpTranslator<any>) => void
    ): string {


        const relation = new EntityRelation(this.qb.connection,
            this.typeInfo.type,
            propertyName, false);

        if (!relation.isToMany)
            throw new Error(`SubQuery allowed only to *-to-many relation.`)

        const rightSchema =
            `${relation.left.entityMetadata.tableName}_${
                relation.propertyName
            }_${relation.right.entityMetadata.tableName}_${++this.counter}`;

        let subQb: SelectQueryBuilder<any>;


        if (relation.ownerRelationMetadata.joinTableName) {
            const joinSchema = rightSchema + '_join';

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
                .getRepository(relation.right.entityType)
                .createQueryBuilder(rightSchema)
                .andWhere(relation.columnCondition(this.schema, rightSchema))

        }

        const subTranslator =
            new QbDataExpTranslator<any>(
                this.typeInfo.relations?.[propertyName] ||
                DataTypeInfo.get(relation.right.entityType),
                subQb,
                rightSchema,
                this.rootQb
            )

        callback(subTranslator.qb, subTranslator);

        if (where) {
            subTranslator.qb.andWhere(
                subTranslator.translate(where)
            )
        }
        return `(${subTranslator.qb.getQuery()})`
    }


    translateCount(propertyName: string, subExp: DataExp<any>): string {
        return this.translateSubQuery(propertyName, subExp, subQb => {
            subQb.select('COUNT(*)')
        })
    }

    translateHas(inverse: boolean, propertyName: string, exp: DataExp<any>): string {
        const sql = this.translateSubQuery(propertyName, exp, subQb => {
            subQb.select('COUNT(*)').take(1)
        });

        return inverse ? "0=" + sql : sql;
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


    translateAt(propertyName: string, exp: DataExp<any>): string {

        const relation = new EntityRelation(this.qb.connection,
            this.typeInfo.type, propertyName, false);

        if (!relation.isToOne)
            throw new Error(`$at support in relation to-one only.`)

        const rightSchema = relation.join("LEFT", this.qb, this.schema);

        return new QbDataExpTranslator(
            this.typeInfo.relations?.[propertyName] ||
            DataTypeInfo.get(relation.right.entityType),
            this.qb, rightSchema, this.rootQb
        ).translate(exp);
    }

    translateIs(inverse: boolean, keys: string[]): string {

        const {qb: {connection: {driver}}} = this;
        const escapedSchema = driver.escape(this.schema);
        const schemaMetadata = this.qb.connection.getMetadata(this.typeInfo.type);

        if (schemaMetadata.primaryColumns.length === 1) {
            const column = schemaMetadata.primaryColumns[0];
            return `${escapedSchema}.${driver.escape(column.databaseName)}${inverse ? " NOT" : ""} IN (${
                createQbArrayParameter(this.rootQb, keys)
            })`
        }

        const sql = keys.toSeq()
            .map(key => EntityDataKey.parse(
                schemaMetadata,
                key
            ))
            .map(key => schemaMetadata.primaryColumns
                .toSeq()
                .map(column => `${escapedSchema}.${
                    driver.escape(column.databaseName)
                }=${createQbParameter(this.rootQb,
                    definedAt(key,
                        definedAt(column, 'referencedColumn').propertyName)
                )}`)
                .join(' AND ')
            )
            .join(' OR ');

        return inverse ? `NOT (${sql})` : sql
    }

    translateIf(condition: string, expIfTrue: string, expIfFalse: string): string {
        switch (this.driver.options.type) {
            case "sqlite":
                return `(CASE WHEN ${condition} THEN ${expIfTrue} ELSE ${expIfFalse} END)`

            default:
                return `IF(${condition},${expIfTrue},${expIfFalse})`
        }
    }

    translateConcat(exps: string[]): string {
        switch (this.driver.options.type) {
            case "sqlite":
                return `(${exps.join("||")})`;
            default:
                return `CONCAT(${exps.join(",")})`
        }
    }

    translateIn(inverse: boolean, where: string, values: string[]): string {
        return `${where}${inverse ? " NOT" : ""} IN (${
            values.join(",")
        })`
    }

    translateIfNull(exp: string, alt_value: string): string {
        return `IFNULL(${exp},${alt_value})`
    }

    translateAs(unionKey: string, exp: DataExp<any>): string {

        // TODO: Do not use Join?

        const childTypeInfo = defined(this.typeInfo.children?.[unionKey],
            () => `Not have union as "${unionKey}" in ${this.typeInfo.name}. ${
            inspect(this.typeInfo,{depth:10})
            }`);


        const childMetadata = this.qb.connection.getMetadata(
            childTypeInfo.type
        );


        return new QbDataExpTranslator(childTypeInfo, this.qb, this.schema, this.rootQb,).translate({
            $and: [
                <DataExp<T>>{
                    [childMetadata.discriminatorColumn!.propertyName]: {
                        $in: childMetadata.childEntityMetadatas
                            .toSeq()
                            .map(child => child.discriminatorValue!)
                            .concat([childMetadata.discriminatorValue!])
                            .toArray()
                    }
                },
                exp
            ]
        })

    }


    static translate<T = any>(this: typeof QbDataExpTranslator,
                              qb: SelectQueryBuilder<T>,
                              exp: DataExp<T>,
                              schema: string = qb.alias): string {
        return new this(
            DataTypeInfo.get(
                <Function>qb.expressionMap.aliases.find(alias => alias.name === qb.alias)!
                    .metadata.target
            ),
            qb,
            schema,
            qb,
        ).translate(exp);
    }
}


