import {Connection} from "typeorm/index";
import {inspect} from "util";
import {defined} from "../../common/object/defined";
import {DataExpMapper} from "../../data/DataSource/DataExpMapper";
import {DataTypeInfo} from "../../data/DataTypeInfo";
import {EntityDataKey} from "../../data/eds/EntityDataKey";
import {DataExp, NamedCompareOperator, Parameter, StringDataExp} from "../../json-exp/DataExp";
import {DataExpTranslator} from "../../json-exp/DataExpTranslator";
import {EntityRelation} from "../relations";
import {Query, QueryExp} from "../QueryExp";
import {QueryExpBuilder} from "../QueryExpBuilder";


function Mapper(target, propertyName, desc) {
    desc.value = function () {
        const mapper = new DataExpMapper();
        return mapper[propertyName].apply(mapper, arguments);
    }
}


export class SbDataExpTranslator<T> extends DataExpTranslator<T, QueryExp> {
    False: DataExp<any>;
    Null: DataExp<any>;
    True: DataExp<any>;

    constructor(
        public typeInfo: DataTypeInfo,
        public qb: QueryExpBuilder,
        public schema: string
    ) {
        super();
    }


    translateAs(childKey: string, exp: DataExp<any>): QueryExp {
        const childTypeInfo = defined(this.typeInfo.children?.[childKey],
            () => `Not child key "${childKey}" in ${this.typeInfo.name}. ${
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
        return new SbDataExpTranslator(
            childTypeInfo,
            this.qb,
            this.schema,
        ).translate({$and: [typeExp, exp]})
    }

    translateAt(propertyName: string, exp: DataExp<any>): QueryExp {
        const relation = new EntityRelation(this.qb.connection,
            this.typeInfo.type, propertyName, false);
        if (!relation.isToOne)
            throw new Error(`$at support in relation to-one only.`)
        const rightSchema = relation.joinSb("LEFT", this.qb, this.schema)
        return new SbDataExpTranslator(
            this.typeInfo.relations?.[propertyName] ||
            DataTypeInfo.get(relation.right.entityType),
            this.qb,
            rightSchema
        ).translate(exp);
    }

    counter = 0;

    getSubSelect(propertyName: string,
                 whereExp: DataExp<any>): Query {

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


        let subSelect: Query;

        if (relation.ownerRelationMetadata.joinTableName) {
            const joinSchema = rightSchema + '_join';

            subSelect = {
                from: relation.ownerRelationMetadata.joinTableName,
                joins: {
                    [joinSchema]: {
                        type: "INNER",
                        from: relation.right.entityMetadata.tableName,
                        condition: {
                            $and: [
                                relation.getLeftConditionByTableJoinSb(this.schema, joinSchema),
                                relation.getRightConditionByTableJoinSb(rightSchema, joinSchema),
                            ]
                        }
                    }
                }
            }
        } else {
            subSelect = {
                from: relation.right.entityMetadata.tableName,
                where: relation.getConditionByJoinColumnSb(this.schema, rightSchema)
            }
        }

        const subTranslator = new SbDataExpTranslator(
            this.typeInfo.relations?.[propertyName] ||
            DataTypeInfo.get(relation.right.entityType),
            new QueryExpBuilder(this.qb.connection, subSelect,
                this.schema + "_" + subSelect.from
                + (++this.counter)),
            rightSchema
        )

        if (whereExp !== undefined) {
            subSelect.where = subTranslator.translate(whereExp)
        }
        return subSelect
    }


    translateCountAt(propertyName: string,
                     whereExp: DataExp<any>): QueryExp {
        return {$count: this.getSubSelect(propertyName, whereExp)}
    }

    translateHasAt(inverse: boolean, propertyName: string, exp: DataExp<any>): QueryExp {
        return {$has: this.getSubSelect(propertyName, exp)}
    }

    translateIs(inverse: boolean, keys: string[]): QueryExp {
        const entityMetadata =
            this.qb.connection.getMetadata(this.typeInfo.type);
        if (entityMetadata.primaryColumns.length === 1) {
            const column = entityMetadata.primaryColumns[0];
            return this.translateIn(inverse, column.databaseName, keys);
        }
        const exp = this.translateOr(keys
            .toSeq()
            .map(key => {
                return EntityDataKey.parse(entityMetadata, key)
            })
            .map(key => {
                return this.translateAnd(entityMetadata.primaryColumns
                    .toSeq()
                    .map(column => [
                        column.databaseName,
                        "=",
                        [key[column.referencedColumn!.propertyName]]
                    ])
                    .toArray()
                )
            })
            .toArray()
        );
        return inverse ? {$not: exp} : exp;
    }


    @Mapper
    translateFieldExp(key: StringDataExp<T>): QueryExp {
        throw new Error()
    }

    @Mapper
    translateParameter(value: Parameter): QueryExp {
        throw new Error()
    }


    @Mapper
    translateAnd(exps: DataExp<any>[]): QueryExp {
        throw new Error()
    }

    @Mapper
    translateCompare(op: NamedCompareOperator, left: DataExp<any>, right: DataExp<any>): QueryExp {
        throw new Error()
    }

    @Mapper
    translateConcat(exps: DataExp<any>[]): QueryExp {
        throw new Error()
    }

    @Mapper
    translateIf(condition: DataExp<any>, then: DataExp<any>, _else: DataExp<any>): QueryExp {
        throw new Error()
    }

    @Mapper
    translateIfNull(exp: DataExp<any>, alt_value: DataExp<any>): QueryExp {
        throw new Error()
    }

    @Mapper
    translateIn(inverse: boolean, where: DataExp<any>, values: DataExp<any>[]): QueryExp {
        throw new Error()
    }

    @Mapper
    translateIsNull(inverse: boolean, exp: DataExp<any>): QueryExp {
        throw new Error()
    }

    @Mapper
    translateLength(exp: DataExp<any>): QueryExp {
        throw new Error()
    }

    @Mapper
    translateNot(exp: DataExp<any>): QueryExp {
        throw new Error()
    }

    @Mapper
    translateOr(exps: DataExp<any>[]): QueryExp {
        throw new Error()
    }


}
