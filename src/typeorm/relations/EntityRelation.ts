import {Connection, ObjectType, RelationQueryBuilder, Repository, SelectQueryBuilder} from "typeorm";
import {ColumnMetadata} from "typeorm/metadata/ColumnMetadata";
import {assert} from "../../common/assert";
import {defined} from "../../common/object/defined";
import {definedAt} from "../../common/object/definedAt";
import {Lazy} from "../../common/patterns/lazy";
import {ArrayTypeOrObject, Type} from "../../common/typings";
import {EntityDataKey} from "../../data/eds/EntityDataKey";
import {DataExp} from "../../json-exp/DataExp";
import {QueryExpBuilder} from "../QueryExpBuilder";

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


    getIdConditionSb(qb: QueryExpBuilder, schema: string,
                     id = definedAt(this.relation, 'rightId')) {

        return {
            $and: this.entityMetadata.primaryColumns.map(c => {
                return {
                    $at: {
                        [schema]: [
                            c.databaseName,
                            '=',
                            id[c.propertyName]
                        ]
                    }
                }
            })
        };
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
        this.relationMetadata :
        definedAt(this.relationMetadata, "inverseRelation");


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


    joinSb(
        joinType: JoinType,
        sb: QueryExpBuilder,
        leftSchema: string,
        rightId = this.rightId): string {

        const rightSchema = this.getRightSchema(leftSchema);

        if (sb.joins[rightSchema])
            return rightSchema;

        const idCondition =
            rightId ? ' AND ' + this.right.getIdConditionSb(sb, rightSchema, rightId) : "";

        if (this.ownerRelationMetadata.joinTableName) {
            const joinSchema = rightSchema + '_join';
            sb.join(joinSchema, this.ownerRelationMetadata.joinTableName, joinType,
                this.getLeftConditionByTableJoinSb(leftSchema, joinSchema)
            );
            sb.join(rightSchema, this.right.entityMetadata.tableName, joinType, {
                $and: [
                    this.getRightConditionByTableJoinSb(
                        rightSchema,
                        joinSchema),
                    idCondition]
            })
        } else {
            // join by column
            sb.join(rightSchema, this.right.entityMetadata.tableName, joinType, {
                $and: [
                    this.getConditionByJoinColumn(
                        leftSchema,
                        rightSchema),
                    idCondition
                ]
            })
        }
        return rightSchema;

    }


    join(
        joinType: JoinType,
        qb: SelectQueryBuilder<any>,
        leftSchema: string,
        rightId = this.rightId): string {
        const {right} = this;

        const rightSchema = this.getRightSchema(leftSchema);

        const joinAttribute = qb.expressionMap.joinAttributes.find(
            ja => ja.alias?.name === rightSchema
        );

        if (joinAttribute) {
            return rightSchema;
        }

        const idCondition =
            rightId ? ' AND ' + right.getIdCondition(qb, rightSchema, rightId) : "";

        // const joinSchema = this.getJoinSchema(qb,
        //     joinType,leftSchema,rightSchema);

        if (this.ownerRelationMetadata.joinTableName) {
            // join by table

            const joinSchema = rightSchema + '_join';

            joinQb(qb, joinType, this.ownerRelationMetadata.joinTableName, joinSchema,
                this.getLeftConditionByTableJoin(leftSchema, joinSchema)
            );

            joinQb(qb, joinType, this.right.entityMetadata.tableName, rightSchema,
                this.getRightConditionByTableJoin(rightSchema, joinSchema)
                + idCondition
            );


        } else {
            // join by column
            joinQb(qb, joinType, right.entityType, rightSchema,
                this.getConditionByJoinColumn(leftSchema, rightSchema)
                + idCondition
            )
        }
        return rightSchema;


    }


    getLeftConditionByTableJoinSb(leftSchema, joinSchema): DataExp<any> {

        return this.getConditionSb(
            this.left.joinColumns,
            (s, c) => s.tableColumn(c),
            leftSchema, joinSchema
        )
    }


    getRightConditionByTableJoinSb(rightSchema, joinSchema): DataExp<any> {
        return this.getConditionSb(
            this.right.joinColumns,
            (s, c) => s.tableColumn(c),
            rightSchema, joinSchema
        )
    }

    getConditionByJoinColumnSb(leftSchema: string, rightSchema: string): DataExp<any> {
        return this.getConditionSb(
            this.ownerRelationMetadata.joinColumns,
            (s, c) => s.column(c),
            leftSchema, rightSchema
        )
    }

    getLeftConditionByTableJoin(leftSchema, joinSchema): string {

        return this.getCondition(
            this.left.joinColumns,
            (s, c) => s.tableColumn(c),
            leftSchema, joinSchema
        )
    }


    getRightConditionByTableJoin(rightSchema, joinSchema) {
        return this.getCondition(
            this.right.joinColumns,
            (s, c) => s.tableColumn(c),
            rightSchema, joinSchema
        )
    }

    getConditionByJoinColumn(leftSchema: string, rightSchema: string) {
        return this.getCondition(
            this.ownerRelationMetadata.joinColumns,
            (s, c) => s.column(c),
            leftSchema, rightSchema
        )
    }

    getConditionSb(
        joinColumns: ColumnMetadata[],
        getColumn: (side: EntityRelationSide<any>,
                    column: ColumnMetadata) => ColumnMetadata,
        leftSchema,
        rightSchema) {
        return {
            $and: joinColumns.map(c => [
                {$at: {[leftSchema]: getColumn(this.left, c).databaseName}},
                '=',
                {$at: {[rightSchema]: getColumn(this.left, c).databaseName}}
            ])
        }
    }

    getCondition(
        joinColumns: ColumnMetadata[],
        getColumn: (side: EntityRelationSide<any>,
                    column: ColumnMetadata) => ColumnMetadata,
        leftSchema,
        rightSchema) {
        return joinColumns.map(c => `${
            this.connection.driver.escape(leftSchema)
        }.${
            this.connection.driver.escape(
                getColumn(this.left, c).databaseName
            )
        }=${
            this.connection.driver.escape(rightSchema)
        }.${
            getColumn(this.right, c).databaseName
        }`).join(' AND ')
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

export type JoinType = "INNER" | "LEFT";

function isSubClass(b: Type<any>, a: Type<any>) {
    return (a === b) || (b.prototype instanceof a)
}

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
