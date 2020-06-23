import {Connection, ObjectType, RelationQueryBuilder, Repository, SelectQueryBuilder} from "typeorm";
import {ColumnMetadata} from "typeorm/metadata/ColumnMetadata";
import {assert} from "../../common/assert";
import {defined, definedAt} from "../../common/object/defined";
import {ArrayTypeOrObject} from "../../common/typings";
import {EntityIDHelper} from "../../data/EntityID";

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

    isOwning = this.relation.ownerRelationMetadata.target === this.entityType

    joinColumns =
        !this.isOwning ? this.relation.ownerRelationMetadata.inverseJoinColumns :
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


    // of(Group, "users"): EntityRelation<Group, User>
    // at(Group, "users"): EntityRelation<User,Group>


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
        public invert: boolean,
        public key?: string
    ) {
    }

    _rightId: object;

    isLeftOwningByColumn() {
        return this.left.isOwning && !this.ownerRelationMetadata.joinTableName;
    }

    get rightId(): undefined | object {
        if (this._rightId)
            return this._rightId;

        if (typeof this.key === "string")
            return this._rightId = new EntityIDHelper(
                this.right.entityMetadata
            ).parse(this.key).values;
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


    left = new EntityRelationSide(this, this.getLeftEntityType(), true);

    right = new EntityRelationSide(this, this.getRightEntityType(), false);

    getRelationType(): ObjectType<any> {
        assert(typeof this.relationMetadata?.type === "function");
        return this.relationMetadata.type;
    }

    innerJoin(leftQb: SelectQueryBuilder<any>) {
        return this.join("INNER", leftQb, leftQb.alias);
    }


    join(
        joinDiection: JoinDirection,
        leftQb: SelectQueryBuilder<any>,
        leftSchema: string): string {
        const {right, rightId} = this;


        const rightSchema =
            this.invert ? `${
                    leftSchema
                }_at_${
                    this.right.entityMetadata.tableName
                }__${
                    this.propertyName
                }` :
                `${leftSchema}_${this.propertyName}`;

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
                this.joinByTableLeftCondition(leftSchema, joinSchema)
            );
            join(right.entityMetadata.tableName, rightSchema,
                this.joinByTableRightCondition(rightSchema, joinSchema)
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
            switch (joinDiection) {
                case "LEFT":
                    return leftQb.leftJoin(table, alias, condition);
                case "INNER":
                    return leftQb.innerJoin(table, alias, condition);
            }
        }
    }


    joinByTableLeftCondition(leftSchema, joinSchema) {
        return this.left.joinColumns
            .map(c => `${
                leftSchema}.${this.left.tableColumn(c).databaseName
            }=${
                joinSchema}.${this.right.tableColumn(c).databaseName
            }`)
            .join(' AND ')
    }

    joinByTableRightCondition(rightSchema, joinSchema) {
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

    set(leftId: object) {
        return this.createRelationQueryBuilder()
            .of(this.invert ? this.rightId : leftId)
            .set(!this.invert ? this.rightId : leftId);
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

    getLeftEntityType(): ObjectType<T> {
        return this.invert ? this.getRelationType() : this.entityType;
    }

    getRightEntityType(): ObjectType<any> {
        return !this.invert ? this.getRelationType() : this.entityType;
    }


}

export type JoinDirection = "INNER" | "LEFT";
