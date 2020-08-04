import {Driver, SelectQueryBuilder} from "typeorm";
import {inspect} from "util";
import {defined} from "../../common/object/defined";
import {definedAt} from "../../common/object/definedAt";
import {DataTypeInfo} from "../../data/DataTypeInfo";
import {createQbArrayParameter, createQbParameter} from "../../data/eds/createQueryBuilderParameter";
import {EntityDataKey} from "../../data/eds/EntityDataKey";
import {DataExp, Parameter} from "../../json-exp/DataExp";

import {EntityRelation} from "../relations";
import {SQLDataExpTranslator} from "./SQLDataExpTranslator";

let counter = 0;

export class QbDataExpTranslator<T> extends SQLDataExpTranslator<T> {


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


    get driver(): Driver {
        return this.qb.connection.driver;
    }


    translateSubQuery(propertyName: string,
                      whereExp: DataExp<any>,
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
            }_${relation.right.entityMetadata.tableName}_${
                whereExp === undefined ? "all" :
                    ++this.counter}`;

        let subQb: SelectQueryBuilder<any>;


        if (relation.ownerRelationMetadata.joinTableName) {
            const joinSchema = rightSchema + '_join';

            subQb = this.qb.connection
                .createQueryBuilder(
                    relation.ownerRelationMetadata.joinTableName,
                    joinSchema)
                .innerJoin(relation.right.entityType, rightSchema,
                    relation.getLeftConditionByTableJoin(this.schema, joinSchema)
                    + ' AND ' +
                    relation.getRightConditionByTableJoin(rightSchema, joinSchema)
                )
        } else {
            subQb = this.qb.connection
                .getRepository(relation.right.entityType)
                .createQueryBuilder(rightSchema)
                .andWhere(relation.getConditionByJoinColumn(this.schema, rightSchema))

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

        if (whereExp) {
            subTranslator.qb.andWhere(
                subTranslator.translate(whereExp)
            )
        }
        return `(${subTranslator.qb.getQuery()})`
    }


    translateCountAt(propertyName: string, exp: DataExp<any>): string {
        return this.translateSubQuery(propertyName, exp, subQb => {
            subQb.select('COUNT(*)')
        })
    }

    translateHasAt(inverse: boolean, propertyName: string, exp: DataExp<any>): string {
        const sql = this.translateSubQuery(propertyName, exp, subQb => {
            subQb.select('COUNT(*)').take(1)
        });

        return inverse ? "0=" + sql : sql;
    }


    counter = 0;

    translateParameter(value: Parameter): string {
        const key = `v_${counter++}_${this.counter++}`
        this.rootQb.setParameter(key, value);
        return ':' + key;
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
            this.qb,
            rightSchema,
            this.rootQb
        ).translate(exp);
    }

    protected escape(value: string) {
        return this.qb.connection.driver.escape(value);
    }

    translateIs(inverse: boolean, keys: string[]): string {


        const escapedSchema = this.escape(this.schema);
        const entityMetadata =
            this.qb.connection.getMetadata(this.typeInfo.type);

        if (entityMetadata.primaryColumns.length === 1) {
            const column = entityMetadata.primaryColumns[0];
            return `${escapedSchema}.${this.escape(column.databaseName)}${inverse ? " NOT" : ""} IN (${
                createQbArrayParameter(this.rootQb, keys)
            })`
        }

        const sql = keys.toSeq()
            .map(key => EntityDataKey.parse(
                entityMetadata,
                key
            ))
            .map(key => entityMetadata.primaryColumns
                .toSeq()
                .map(column => `${escapedSchema}.${
                    this.escape(column.databaseName)
                }=${createQbParameter(this.rootQb,
                    definedAt(key,
                        definedAt(column, 'referencedColumn').propertyName)
                )}`)
                .join(' AND ')
            )
            .join(' OR ');

        return inverse ? `NOT (${sql})` : sql
    }


    translateAs(unionKey: string, exp: DataExp<any>): string {

        const childTypeInfo = defined(this.typeInfo.children?.[unionKey],
            () => `Not have union as "${unionKey}" in ${this.typeInfo.name}. ${
                inspect(this.typeInfo, {depth: 10})
            }`);


        const childMetadata = this.qb.connection.getMetadata(
            childTypeInfo.type
        );

        const typeExp = <DataExp<any>>{
            [childMetadata.discriminatorColumn!.propertyName]: {
                $in: childMetadata.childEntityMetadatas
                    .toSeq()
                    .map(child => child.discriminatorValue!)
                    .concat([childMetadata.discriminatorValue!])
                    .toArray()
            }
        };

        return new QbDataExpTranslator(childTypeInfo, this.qb, this.schema, this.rootQb,)
            .translate({
                $and: [
                    typeExp,
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
