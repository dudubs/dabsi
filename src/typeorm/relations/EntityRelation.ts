import {Connection, ObjectType, SelectQueryBuilder} from "typeorm";
import {ColumnMetadata} from "typeorm/metadata/ColumnMetadata";
import {assert} from "../../common/assert";
import {defined} from "../../common/object/defined";
import {definedAt} from "../../common/object/definedAt";
import {Lazy} from "../../common/patterns/lazy";
import {ArrayTypeOrObject} from "../../common/typings";
import {DataExp} from "../../data/DataExp";
import {QueryExpBuilder} from "../QueryExpBuilder";
import {ByTableOrColumn, EntityRelationSide} from "./EntityRelationSide";

export class EntityRelation<T = any> {


    static of<T, K extends keyof T>(
        connection: Connection,
        entityType: ObjectType<T>,
        propertyName: string & K,
    ): EntityRelation<T> {
        return new EntityRelation(connection, entityType, propertyName, false);
    }


    static at<T, K extends keyof T>(
        connection: Connection,
        entityType: ObjectType<T>,
        propertyName: string & K,
        key?: string,
    ): EntityRelation<ArrayTypeOrObject<T[K]>> {
        return new EntityRelation(connection, entityType, propertyName, true);
    }


    constructor(
        public connection: Connection,
        public entityType: ObjectType<any>,// TODO: Function|string
        public propertyName: string,
        public invert: boolean,// TODO: better name
    ) {
    }


    isJoinColumn() {
        return !this.ownerRelationMetadata.joinTableName;
    }

    entityMetadata = this.connection.getMetadata(this.entityType);

    relationMetadata = defined(this.entityMetadata
        .relations.find(r => r.propertyName === this.propertyName), () =>
        `No relation metadata for ${this.entityType.name}.${this.propertyName}`);

    ownerRelationMetadata = this.relationMetadata.isOwning ?
        this.relationMetadata :
        definedAt(this.relationMetadata, "inverseRelation");


    left = new EntityRelationSide(this, this.leftEntityType, true);

    right = new EntityRelationSide(this, this.rightEntityType, false);

    getRelationType(): ObjectType<any> {
        assert(typeof this.relationMetadata?.type === "function");
        return this.relationMetadata.type;
    }


    getRightSchema(leftSchema: string) {
        return this.invert ? `${
                leftSchema
            }_at_${
                this.right.entityMetadata.tableName
            }__${
                this.propertyName
            }` :
            `${leftSchema}_${this.propertyName}`;
    }


    joinQeb(
        joinType: JoinType,
        qeb: QueryExpBuilder,
        leftSchema: string,
        rightKey: object | null): string {

        const rightSchema = this.getRightSchema(leftSchema);

        if (qeb.joins[rightSchema])
            return rightSchema;

        const idCondition =
            rightKey ? this.right.getIdConditionExp(qeb, rightSchema, rightKey) : undefined;


        if (this.ownerRelationMetadata.joinTableName) {
            const joinSchema = rightSchema + '_join';

            qeb.join(joinSchema, this.ownerRelationMetadata.joinTableName, joinType,
                this.left.getJoinConditionExpByTable(leftSchema, joinSchema)
            );

            qeb.join(rightSchema, this.right.entityMetadata.tableName, joinType, {
                $and: [
                    this.right.getJoinConditionExpByTable(rightSchema, joinSchema),
                    idCondition
                ]
            })
        } else {
            // join by column
            qeb.join(rightSchema, this.right.entityMetadata.tableName, joinType, {
                $and: [
                    this.getJoinConditionExpByColumn(leftSchema, rightSchema),
                    idCondition
                ]
            })
        }
        return rightSchema;

    }


    joinSqb(joinType: JoinType,
            sqb: SelectQueryBuilder<any>,
            leftSchema: string,
            rightKey: null | object): string {
        const {right} = this;

        const rightSchema = this.getRightSchema(leftSchema);

        const joinAttribute = sqb.expressionMap.joinAttributes.find(
            ja => ja.alias?.name === rightSchema
        );

        if (joinAttribute) {
            return rightSchema;
        }

        const idCondition =
            rightKey ? ' AND ' + right.getIdCondition(sqb, rightSchema, rightKey) : "";

        if (this.ownerRelationMetadata.joinTableName) {
            // join by table
            const joinSchema = rightSchema + '_join';
            joinQb(sqb, joinType, this.ownerRelationMetadata.joinTableName, joinSchema,
                this.left.getJoinConditionSqlByTable(leftSchema, joinSchema)
            );
            joinQb(sqb, joinType, this.right.entityMetadata.tableName, rightSchema,
                this.right.getJoinConditionSqlByTable(rightSchema, joinSchema)
                + idCondition
            );
        } else {
            // join by column
            joinQb(sqb, joinType, this.right.entityMetadata.tableName, rightSchema,
                this.getJoinConditionSqlByColumn(leftSchema, rightSchema)
                + idCondition
            )
        }
        return rightSchema;


    }

    getJoinConditionExpByColumn(leftSchema: string, rightSchema: string): DataExp<any> {
        return this.getJoinConditionExp('column',
            this.ownerRelationMetadata.joinColumns,
            leftSchema, rightSchema
        )
    }

    getJoinConditionSqlByColumn(leftSchema: string, rightSchema: string) {
        return this.getJoinConditionSql('column',
            this.ownerRelationMetadata.joinColumns,
            leftSchema, rightSchema
        )
    }


    getJoinConditionExp(
        by: ByTableOrColumn,
        joinColumns: ColumnMetadata[],
        leftSchema,
        rightSchema) {
        return {
            $and: joinColumns.map(c => [
                {
                    $at: {[leftSchema]: this.left.getJoinColumn(by, c).databaseName}
                },
                '=',
                {
                    $at: {[rightSchema]: this.right.getJoinColumn(by, c).databaseName}
                }
            ])
        }
    }

    protected escape(name: string) {
        return this.connection.driver.escape(name)
    }


    getJoinConditionSql(
        by: ByTableOrColumn,
        joinColumns: ColumnMetadata[],
        leftSchema,
        rightSchema) {
        return joinColumns.toSeq().map(c => `${
            this.escape(leftSchema)
        }.${
            this.escape(
                this.left.getJoinColumn(by, c).databaseName
            )
        }=${
            this.escape(rightSchema)
        }.${
            this.right.getJoinColumn(by, c).databaseName
        }`).join(' AND ')
    }


    isToOne =
        this.relationMetadata.isOneToOne ||
        this.relationMetadata.isManyToOne;

    isToMany =
        this.relationMetadata.isManyToMany ||
        this.relationMetadata.isOneToMany;


    update(
        action: 'addOrSet' | 'removeOrUnset',
        leftKey: object,
        rightKey: object
    ): Promise<void> {


        [leftKey, rightKey] = [
            this.left.getKey(leftKey, rightKey),
            this.right.getKey(leftKey, rightKey)
        ];

        const qb = this.connection
            .getRepository(this.entityType)
            .createQueryBuilder()
            .relation(this.propertyName)
            .of(leftKey);


        switch (action) {
            case "addOrSet":
                return this.isToOne ? qb.set(rightKey) : qb.add(rightKey);
            case "removeOrUnset":
                return this.isToOne ? qb.set(null) : qb.remove(rightKey);
        }

        throw new Error(`Invalid action ${action}.`)
    }

    @Lazy() get leftEntityType(): ObjectType<T> {
        return this.invert ? this.getRelationType() : this.entityType;
    }

    @Lazy() get rightEntityType(): ObjectType<any> {
        return !this.invert ? this.getRelationType() : this.entityType;
    }

    get isTree() {
        return this.leftEntityType === this.rightEntityType
    }

    inspect() {
        return `Relation ${
            this.entityType.name
        }.${this.propertyName}`
    }

}

export type JoinType = "INNER" | "LEFT";

function joinQb(qb: SelectQueryBuilder<any>, joinType: JoinType, table, alias, condition) {
    switch (joinType) {
        case "LEFT":
            return qb.leftJoin(table, alias, condition);
        case "INNER":
            return qb.innerJoin(table, alias, condition);
        default:
            throw new Error(`Invalid join type ${joinType}.`)
    }
}

