import {Connection, ObjectType, RelationQueryBuilder, Repository, SelectQueryBuilder} from "typeorm";
import {ColumnMetadata} from "typeorm/metadata/ColumnMetadata";
import {assert} from "../../common/assert";
import {defined} from "../../common/object/defined";
import {definedAt} from "../../common/object/definedAt";
import {Lazy} from "../../common/patterns/lazy";
import {ArrayTypeOrObject} from "../../common/typings";
import {EntityDataKey} from "../../data/eds/EntityDataKey";

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
        return this.relation.ownerRelationMetadata.target === this.entityType
    }

    joinColumns =
        !this.isOwning ?
            this.relation.ownerRelationMetadata.inverseJoinColumns :
            this.relation.ownerRelationMetadata.joinColumns;

    column(column: ColumnMetadata) {
        return this.isOwning ? column : definedAt(column, "referencedColumn");
    }

    tableColumn(column: ColumnMetadata) {
        return !this.isLeft ? column : definedAt(column, "referencedColumn");
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

}

export class EntityRelation<T = any> {


    static of<T, K extends keyof T>(
        connection: Connection,
        entityType: ObjectType<T>,
        propertyName: string & K,
        key?: string,
    ): EntityRelation<T> {
        return new EntityRelation(connection, entityType, propertyName, false, key);
    }


    static at<T, K extends keyof T>(
        connection: Connection,
        entityType: ObjectType<T>,
        propertyName: string & K,
        key?: string,
    ): EntityRelation<ArrayTypeOrObject<T[K]>> {
        return new EntityRelation(connection, entityType, propertyName, true, key);
    }


    constructor(
        public connection: Connection,
        public entityType: ObjectType<any>,// TODO: Function|string
        public propertyName: string,
        public invert: boolean,// TODO: better name
        public key?: string
    ) {
    }

    _rightId: object;


    isLeftOwningWithoutJoinTable() {
        return this.left.isOwning && !this.ownerRelationMetadata.joinTableName;
    }

    get rightId(): undefined | object {
        if (this._rightId)
            return this._rightId;

        if (typeof this.key === "string")
            return this._rightId = EntityDataKey.parse(
                this.right.entityMetadata,
                this.key
            );
    }

    setRightId(rightId: object) {
        this._rightId = rightId;
        return this;
    }

    entityMetadata = this.connection.getMetadata(this.entityType);

    relationMetadata = defined(this.entityMetadata
        .relations.find(r => r.propertyName === this.propertyName), () =>
        `No relation metadata for ${this.entityType.name}.${this.propertyName}`);

    ownerRelationMetadata = this.relationMetadata.isOwning ?
        this.relationMetadata : definedAt(this.relationMetadata, "inverseRelation");


    left = new EntityRelationSide(this, this.leftEntityType, true);

    right = new EntityRelationSide(this, this.rightEntityType, false);

    getRelationType(): ObjectType<any> {
        assert(typeof this.relationMetadata?.type === "function");
        return this.relationMetadata.type;
    }

    innerJoin(leftQb: SelectQueryBuilder<any>) {
        return this.join("INNER", leftQb, leftQb.alias);
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

    join(
        direction: JoinDirection,
        leftQb: SelectQueryBuilder<any>,
        leftSchema: string,
        rightId = this.rightId): string {
        const {right} = this;

        const rightSchema = this.getRightSchema(leftSchema);

        const joinAttribute = leftQb.expressionMap.joinAttributes.find(
            ja => ja.alias?.name === rightSchema
        );

        if (joinAttribute) {
            return rightSchema;
        }

        const idCondition =
            rightId ? ' AND ' + right.getIdCondition(leftQb, rightSchema, rightId) : "";

        if (this.ownerRelationMetadata.joinTableName) {
            // join by table

            const joinSchema = rightSchema + '_join';

            join(this.ownerRelationMetadata.joinTableName,
                joinSchema,
                this.getJoinToTableCondition(leftSchema, joinSchema)
            );
            join(right.entityMetadata.tableName, rightSchema,
                this.getJoinFromTableCondition(rightSchema, joinSchema)
                + idCondition
            )
        } else {
            // join by column
            join(right.entityType, rightSchema,
                this.columnCondition(leftSchema, rightSchema)
                + idCondition
            )
        }
        return rightSchema;

        function join(table, alias, condition) {
            switch (direction) {
                case "LEFT":
                    return leftQb.leftJoin(table, alias, condition);
                case "INNER":
                    return leftQb.innerJoin(table, alias, condition);
            }
        }
    }


    getJoinToTableCondition(leftSchema, joinSchema): string {
        // TODO: escaping
        return this.left.joinColumns
            .map(c => `${
                leftSchema}.${this.left.tableColumn(c).databaseName
            }=${
                joinSchema}.${this.right.tableColumn(c).databaseName
            }`)
            .join(' AND ')
    }

    getJoinFromTableCondition(rightSchema, joinSchema) {
        // TODO: escaping
        return this.right.joinColumns
            .map(c => `${
                this.connection.driver.escape(rightSchema)
            }.${this.left.tableColumn(c).databaseName
            }=${
                this.connection.driver.escape(joinSchema)
            }.${this.right.tableColumn(c).databaseName
            }`)
            .join(' AND ')
    }

    columnCondition(leftSchema: string, rightSchema: string) {
        return this.ownerRelationMetadata.joinColumns
            .map(c => `${
                this.connection.driver.escape(leftSchema)
            }.${this.left.column(c).databaseName
            }=${
                this.connection.driver.escape(rightSchema)
            }.${this.right.column(c).databaseName
            }`)
            .join(' AND ')
    }


    isToOne =
        this.relationMetadata.isOneToOne ||
        this.relationMetadata.isManyToOne;

    isToMany =
        this.relationMetadata.isManyToMany ||
        this.relationMetadata.isOneToMany;

    createRelationQueryBuilder(): RelationQueryBuilder<any> {
        return this.connection
            .getRepository(this.entityType)
            .createQueryBuilder()
            .relation(this.propertyName);
    }

    add(leftId: object) {
        // TODO: ignore from error if exists
        return this.createRelationQueryBuilder()
            .of(this.invert ? this.rightId : leftId)
            .add(!this.invert ? this.rightId : leftId);
    }

    remove(leftId: object) {
        return this.createRelationQueryBuilder()
            .of(this.invert ? this.rightId : leftId)
            .remove(!this.invert ? this.rightId : leftId);
    }

    async set(leftId: object) {
        // console.log({leftId},this.invert,this.rightId,this.propertyName,
        //
        //     );
        await this.createRelationQueryBuilder()
            .of(this.invert ? this.rightId : leftId)
            .set(!this.invert ? this.rightId : leftId)
            .catch(error => {
                console.log(error);
                throw error
            });
    }

    unset(leftId: object) {
        return this.createRelationQueryBuilder()
            .of(this.invert ? this.rightId : leftId)
            .set(null);
    }

    addOrSet(leftId: object) {
        return this.isToOne ?
            this.set(leftId) :
            this.add(leftId);
    }

    removeOrUnset(leftId: object) {
        return this.isToOne ? this.unset(leftId) : this.remove(leftId);
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

    get isManyToManyTree() {
        return this.isTree && (this.relationMetadata.isManyToMany)
    }


}

export type JoinDirection = "INNER" | "LEFT";
