import {inspect} from "util";
import {defined} from "../../common/object/defined";
import {DataExpMapper} from "../../data/DataSource/DataExpMapper";
import {DataTypeInfo} from "../../data/DataTypeInfo";
import {EntityDataKey} from "../../data/eds/EntityDataKey";
import {DataExp, NamedCompareOperator, Parameter, StringDataExp} from "../../data/DataExp";
import {DataExpTranslator} from "../../data/DataExpTranslator";
import {Query, QueryExp} from "../QueryExp";
import {QueryExpBuilder} from "../QueryExpBuilder";
import {EntityRelation} from "../relations";


function Mapper(target, propertyName, desc) {
    desc.value = function () {
        const mapper = new DataExpMapper();
        return mapper[propertyName].apply(mapper, arguments);
    }
}


export class DataExpTranslatorToQeb<T> extends DataExpTranslator<T, QueryExp> {
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

        const childMetadata = this.qb.connection.getMetadata(childTypeInfo.type);

        const childExp = <DataExp<any>>{
            [childMetadata.discriminatorColumn!.propertyName]: {
                $in: childMetadata.childEntityMetadatas
                    .toSeq()
                    .map(child => child.discriminatorValue!)
                    .concat([childMetadata.discriminatorValue!])
                    .toArray()
            }
        };

        const childTranslator = new DataExpTranslatorToQeb(
            childTypeInfo,
            this.qb,
            this.schema,
        );

        return childTranslator.translate({$and: [childExp, exp]})
    }

    translateAt(propertyName: string, exp: DataExp<any>): QueryExp {
        const relation = new EntityRelation(this.qb.connection,
            this.typeInfo.type, propertyName, false);
        if (!relation.isToOne)
            throw new Error(`$at support in relation to-one only.`)
        const rightSchema = relation.joinQeb("LEFT", this.qb, this.schema,null)
        return {
            $at: {
                [rightSchema]:
                    new DataExpTranslatorToQeb(
                        this.typeInfo.relations?.[propertyName] ||
                        DataTypeInfo.get(relation.right.entityType),
                        this.qb,
                        rightSchema
                    ).translate(exp)
            }
        };
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
                as: joinSchema,
                from: relation.ownerRelationMetadata.joinTableName,
                joins: {
                    [rightSchema]: {
                        type: "INNER",
                        from: relation.right.entityMetadata.tableName,
                        condition: {
                            $and: [
                                relation.left.getJoinConditionExpByTable(this.schema, joinSchema),
                                relation.right.getJoinConditionExpByTable(rightSchema, joinSchema),
                            ]
                        }
                    },
                }
            }
        } else {
            subSelect = {
                as: rightSchema,
                from: relation.right.entityMetadata.tableName,
                where: relation.getJoinConditionExpByColumn(this.schema, rightSchema)
            }
        }


        if (whereExp !== undefined) {
            const subTypeInfo = this.typeInfo.relations?.[propertyName] ||
                DataTypeInfo.get(relation.right.entityType);

            const subTranslator = new DataExpTranslatorToQeb(
                subTypeInfo,
                new QueryExpBuilder(this.qb.connection, subSelect),
                rightSchema
            );

            subSelect.where = {
                $at: {[rightSchema]: subTranslator.translate(whereExp)}
            }
        }
        return subSelect
    }


    translateCount(propertyName: string,
                   whereExp: DataExp<any>): QueryExp {
        return {$queryCount: this.getSubSelect(propertyName, whereExp)}
    }

    translateHas(inverse: boolean, propertyName: string, exp: DataExp<any>): QueryExp {
        return {[inverse ? "$queryNotHas" : "$queryHas"]: this.getSubSelect(propertyName, exp)}
    }

    translateIs(inverse: boolean, keys: string[]): QueryExp {
        const entityMetadata =
            this.qb.connection.getMetadata(this.typeInfo.type);
        if (entityMetadata.primaryColumns.length === 1) {
            const column = entityMetadata.primaryColumns[0];
            return [column.databaseName, {[inverse ? "$notIn" : "$in"]: keys}];
        }
        const exp = {
            $or: this.translateOr(keys.map(textKey => {
                    const key = EntityDataKey.parse(entityMetadata, textKey);
                    return {
                        $and: entityMetadata.primaryColumns.map(column => [
                            column.databaseName,
                            "=",
                            [key[column.referencedColumn!.propertyName]]
                        ])
                    }
                })
            )
        }
        return inverse ? {$not: exp} : exp;
    }


    @Mapper
    translateField(propertyName: StringDataExp<T>): QueryExp {
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
