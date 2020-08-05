import {ObjectType, Repository, SelectQueryBuilder} from "typeorm";
import {ColumnMetadata} from "typeorm/metadata/ColumnMetadata";
import {definedAt} from "../../common/object/definedAt";
import {QueryExpBuilder} from "../QueryExpBuilder";
import {EntityRelation} from "./EntityRelation";
import {isSubClass} from "./isSubClass";

export type ByTableOrColumn = 'table' | 'column';

export class EntityRelationSide<T> {
    constructor(
        public relation: EntityRelation,
        public entityType: ObjectType<T>,
        public isLeft: boolean,
    ) {
    }

    entityMetadata = this.relation.connection.getMetadata(this.entityType);

    get repository(): Repository<T> {
        return this.relation.connection.getRepository(this.entityType)
    }

    get isOwning() {
        if (!this.isLeft)
            return !this.relation.left.isOwning;


        if (this.relation.isTree) {

            if (this.relation.relationMetadata.isManyToMany)
                return this.relation.relationMetadata.isOwning ?
                    !this.relation.invert : this.relation.invert;


            throw new Error(`Not supported relation (${
                this.relation.relationMetadata.relationType
            })`)
        }

        return isSubClass(this.entityType,
            <Function>this.relation.ownerRelationMetadata.target)
    }

    joinColumns = this.isOwning ?
        this.relation.ownerRelationMetadata.joinColumns :
        this.relation.ownerRelationMetadata.inverseJoinColumns;

    getJoinConditionExpByTable(schema, joinSchema) {
        return this.relation.getJoinConditionExp('table',
            this.joinColumns,
            schema, joinSchema
        )
    }

    getJoinConditionSqlByTable(schema, joinSchema) {
        return this.relation.getJoinConditionSql('table',
            this.joinColumns,
            schema,
            joinSchema
        )
    }

    getJoinColumn(by: ByTableOrColumn, column: ColumnMetadata) {
        switch (by) {
            case "column":
                return this.isOwning ? column : definedAt(column, "referencedColumn");
            case "table":
                return !this.isLeft ? column : definedAt(column, "referencedColumn");
            default:
                throw new Error(`Invalid by ${by}`)
        }
    }

    getIdCondition(qb: SelectQueryBuilder<any>, schema: string,
                   id = definedAt(this.relation, 'rightId')): string {
        let sql = '';
        for (let column of this.entityMetadata.primaryColumns) {
            const parameterName = schema + '_' + column.propertyName;
            sql += `${sql ? ' AND ' : ""
            }${schema}.${column.databaseName}=:${parameterName}`;
            qb.setParameter(parameterName, id[column.propertyName]);
        }
        return sql;
    }


    getIdConditionExp(qb: QueryExpBuilder, schema: string,
                      id = definedAt(this.relation, 'rightId')) {

        return {
            $and: this.entityMetadata.primaryColumns.map(c => {
                return {
                    $at: {
                        [schema]: [
                            c.databaseName,
                            '=',
                            [id[c.propertyName]]
                        ]
                    }
                }
            })
        };
    }


}
