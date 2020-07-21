import {SelectQueryBuilder} from "typeorm";
import {EntityMetadata} from "typeorm/metadata/EntityMetadata";
import {defined} from "../../common/object/defined";
import {definedAt} from "../../common/object/definedAt";
import {AnyDataUnion, DataUnion} from "../../data/DataUnion";
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
    $greaterThanOrEqual: '=>',

    $startsWith: ' LIKE ',
    $endsWith: ' LIKE ',
    $contains: ' LIKE ',

    $notStartsWith: ' NOT LIKE ',
    $notEndsWith: ' NOT LIKE ',
    $notContains: ' NOT LIKE '
};

export class QbDataExpTranslator<T> extends DataExpTranslator<T, string> {


    constructor(public qb: SelectQueryBuilder<T>,
                public schema: string,
                public rootQb: SelectQueryBuilder<T>,
                public unionInfo: AnyDataUnion | undefined) {
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
                right = this.translateConcat([right, "'%'"]);
                break;

            case "$endsWith":
                right = this.translateConcat(["'%'", right]);
                break;

            case "$contains":
                right = this.translateConcat(["'%'", right, "'%'"]);
                break;
        }
        return `${left}${defined(SQLOperators[op], () =>
            `Can't translate "${op}".`)}${right}`;
    }


    get schemaMetadata(): EntityMetadata {
        return defined(this.qb.expressionMap.aliases
            .find(alias => alias.name === this.schema), () =>
            `No schemaMetadata ${this.schema}`)
            .metadata;
    }


    translateSubQuery(propertyName: string,
                      where: DataExp<any>,
                      callback: (subQb: SelectQueryBuilder<any>,
                                 subTranslator: QbDataExpTranslator<any>) => void
    ): string {


        const relation = new EntityRelation(this.qb.connection,
            <Function>this.schemaMetadata.target,
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
            new QbDataExpTranslator<any>(subQb, rightSchema,
                this.rootQb,
                this.unionInfo?.unionRelations[propertyName]
            )

        callback(subTranslator.qb, subTranslator);

        if (where) {
            subTranslator.qb.andWhere(
                subTranslator.translate(where)
            )
        }
        return `(${subTranslator.qb.getQuery()})`
    }


    translateCountExp(propertyName: string, subExp: DataExp<any>): string {
        return this.translateSubQuery(propertyName, subExp, subQb => {
            subQb.select('COUNT(*)')
        })
    }

    translateHasExp(propertyName: string, subExp: DataExp<any>): string {
        return this.translateSubQuery(propertyName, subExp, subQb => {
            subQb.select('COUNT(*)').take(1)
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


    translateAt(propertyName: string, exp: DataExp<any>): string {


        const relation = new EntityRelation(this.qb.connection,
            <Function>this.schemaMetadata.target, propertyName, false);

        if (!relation.isToOne)
            throw new Error(`$at support in relation to-one only.`)

        const rightSchema = relation.join("LEFT", this.qb, this.schema);

        return new QbDataExpTranslator(this.qb, rightSchema, this.rootQb,
            this.unionInfo?.unionRelations?.[propertyName]
        ).translate(exp);
    }

    translateIs(inverse: boolean, keys: string[]): string {

        const {schemaMetadata, qb: {connection: {driver}}} = this;
        const escapedSchema = driver.escape(this.schema);
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
        const childSchema = this.schema + '_As_' + unionKey;
        const childType = defined(this.unionInfo?.unionChildren[unionKey],
            () => `Not have union as "${unionKey}".`);

        if (!this.qb.expressionMap.joinAttributes.find(j => j.alias.name === childSchema)) {

            const childMetadata = this.qb.connection.getMetadata(
                'unionType' in childType ? childType.unionType : childType
            );

            const escapedColumnDatabaseName = this.driver.escape(
                childMetadata.discriminatorColumn!.databaseName);

            this.qb.leftJoin(childMetadata.target, childSchema,
                childMetadata.primaryColumns
                    .toSeq()
                    .map(column => `${this.schema}.${column.databaseName}=${childSchema}.${column.databaseName}`)
                    .concat([
                        `${childSchema}.${escapedColumnDatabaseName} IN (${
                            createQbArrayParameter(this.rootQb,
                                childMetadata.childEntityMetadatas
                                    .toSeq()
                                    .concat([childMetadata])
                                    .map(child => child.discriminatorValue)
                                    .toArray()
                            )
                        })`
                    ])
                    .join(' AND ')
            );

        }

        return new QbDataExpTranslator(
            this.qb, childSchema, this.rootQb,
            'unionType' in childType ? childType : undefined
        ).translate(exp)
    }


    static translate<T = any>(this: typeof QbDataExpTranslator,
                              qb: SelectQueryBuilder<T>,
                              exp: DataExp<T>,
                              unionInfo?: AnyDataUnion,
                              schema: string = qb.alias): string {
        return new this(qb, schema, qb, unionInfo).translate(exp);
    }
}


