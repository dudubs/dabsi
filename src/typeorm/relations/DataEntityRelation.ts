import { assert } from "@dabsi/common/assert";
import { defined } from "@dabsi/common/object/defined";
import Lazy from "@dabsi/common/patterns/lazy";
import { ArrayTypeOrObject } from "@dabsi/common/typings2/ArrayTypeOrObject";
import { inspect } from "@dabsi/logging/inspect";
import { DataEntityKey } from "@dabsi/typedata/data-entity/DataEntityKey";
import { DataExp } from "@dabsi/typedata/data-exp/DataExp";
import { DataQueryBuilder } from "@dabsi/typedata/data-query/DataQueryBuilder";
import {
  ByTableOrColumn,
  DataEntityRelationSide,
} from "@dabsi/typeorm/relations/DataEntityRelationSide";
import { Connection, ObjectType, SelectQueryBuilder } from "typeorm";
import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";

export class DataEntityRelation<T = any> {
  static of<T, K extends keyof T>(
    connection: Connection,
    entityType: ObjectType<T>,
    propertyName: string & K
  ): DataEntityRelation<T> {
    return new DataEntityRelation(connection, entityType, propertyName, false);
  }

  static at<T, K extends keyof T>(
    connection: Connection,
    entityType: ObjectType<T>,
    propertyName: string & K,
    key?: string
  ): DataEntityRelation<ArrayTypeOrObject<T[K]>> {
    return new DataEntityRelation(connection, entityType, propertyName, true);
  }

  constructor(
    public connection: Connection,
    public entityType: Function,
    public propertyName: string,

    public invert: boolean
  ) {}

  get propertyNameAtType() {
    return `${this.entityType.name}.${this.propertyName}`;
  }

  get isJoinColumn() {
    return (
      this.relationMetadata.isOneToOneOwner || this.relationMetadata.isManyToOne
    );
  }

  entityMetadata = this.connection.getMetadata(this.entityType);

  relationMetadata = defined(
    this.entityMetadata.relations.find(
      r => r.propertyName === this.propertyName
    ),
    () =>
      `No relation metadata for ${this.entityType.name}.${this.propertyName}`
  );

  ownerRelationMetadata = this.relationMetadata.isOwning
    ? this.relationMetadata
    : defined(
        this.relationMetadata.inverseRelation,
        () => `No inverse relation ${inspect(this)}.`
      );

  left = new DataEntityRelationSide(this, this.leftEntityType, true);

  right = new DataEntityRelationSide(this, this.rightEntityType, false);

  get relationType(): Function {
    assert(typeof this.relationMetadata?.type === "function");
    return this.relationMetadata.type;
  }

  getRightSchema(leftSchema: string) {
    return this.invert
      ? `${leftSchema}_at_${this.right.entityMetadata.tableName}__${this.propertyName}`
      : `${leftSchema}_${this.propertyName}`;
  }

  joinQeb(
    joinType: JoinType,
    qeb: DataQueryBuilder,
    leftSchema: string,
    rightKey: object | null
  ): string {
    const rightSchema = this.getRightSchema(leftSchema);

    if (qeb.joins[rightSchema]) return rightSchema;

    const idCondition = rightKey
      ? this.right.getIdConditionExp(qeb, rightSchema, rightKey)
      : undefined;

    if (this.ownerRelationMetadata.joinTableName) {
      const joinSchema = rightSchema + "_join";

      qeb.join(
        joinSchema,
        this.ownerRelationMetadata.joinTableName,
        joinType,
        this.left.getJoinConditionExpByTable(leftSchema, joinSchema)
      );

      qeb.join(rightSchema, this.right.entityMetadata.tableName, joinType, {
        $and: [
          this.right.getJoinConditionExpByTable(rightSchema, joinSchema),
          idCondition,
        ],
      });
    } else {
      // join by column
      qeb.join(rightSchema, this.right.entityMetadata.tableName, joinType, {
        $and: [
          this.getJoinConditionExpByColumn(leftSchema, rightSchema),
          idCondition,
        ],
      });
    }
    return rightSchema;
  }

  joinSqb(
    joinType: JoinType,
    sqb: SelectQueryBuilder<any>,
    leftSchema: string,
    rightKey: null | object
  ): string {
    const { right } = this;

    const rightSchema = this.getRightSchema(leftSchema);

    const joinAttribute = sqb.expressionMap.joinAttributes.find(
      ja => ja.alias?.name === rightSchema
    );

    if (joinAttribute) {
      return rightSchema;
    }

    const idCondition = rightKey
      ? " AND " + right.getIdCondition(sqb, rightSchema, rightKey)
      : "";

    if (this.ownerRelationMetadata.joinTableName) {
      // join by table
      const joinSchema = rightSchema + "_join";
      joinQb(
        sqb,
        joinType,
        this.ownerRelationMetadata.joinTableName,
        joinSchema,
        this.left.getJoinConditionSqlByTable(leftSchema, joinSchema)
      );
      joinQb(
        sqb,
        joinType,
        this.right.entityMetadata.tableName,
        rightSchema,
        this.right.getJoinConditionSqlByTable(rightSchema, joinSchema) +
          idCondition
      );
    } else {
      // join by column
      joinQb(
        sqb,
        joinType,
        this.right.entityMetadata.tableName,
        rightSchema,
        this.getJoinConditionSqlByColumn(leftSchema, rightSchema) + idCondition
      );
    }
    return rightSchema;
  }

  getJoinConditionExpByColumn(
    leftSchema: string,
    rightSchema: string
  ): DataExp<any> {
    return this.getJoinConditionExp(
      "column",
      this.ownerRelationMetadata.joinColumns,
      leftSchema,
      rightSchema
    );
  }

  getJoinConditionSqlByColumn(leftSchema: string, rightSchema: string) {
    return this.getJoinConditionSql(
      "column",
      this.ownerRelationMetadata.joinColumns,
      leftSchema,
      rightSchema
    );
  }

  getJoinConditionExp(
    by: ByTableOrColumn,
    joinColumns: ColumnMetadata[],
    leftSchema,
    rightSchema
  ) {
    return {
      $and: joinColumns.map(c => [
        {
          $at: { [leftSchema]: this.left.getJoinColumn(by, c).databaseName },
        },
        "=",
        {
          $at: { [rightSchema]: this.right.getJoinColumn(by, c).databaseName },
        },
      ]),
    };
  }

  protected escape(name: string) {
    return this.connection.driver.escape(name);
  }

  getJoinConditionSql(
    by: ByTableOrColumn,
    joinColumns: ColumnMetadata[],
    leftSchema,
    rightSchema
  ) {
    return joinColumns
      .toSeq()
      .map(
        c =>
          `${this.escape(leftSchema)}.${this.escape(
            this.left.getJoinColumn(by, c).databaseName
          )}=${this.escape(rightSchema)}.${
            this.right.getJoinColumn(by, c).databaseName
          }`
      )
      .join(" AND ");
  }

  isToOne =
    this.relationMetadata.isOneToOne || this.relationMetadata.isManyToOne;

  isToMany =
    this.relationMetadata.isManyToMany || this.relationMetadata.isOneToMany;

  get addOrSetAction(): "add" | "set" {
    return this.isToMany ? "add" : "set";
  }

  get removeOrUnsetAction(): "remove" | "unset" {
    return this.isToMany ? "remove" : "unset";
  }

  async update(
    action: "addOrSet" | "removeOrUnset",
    leftKey: object,
    rightKey: object
  ): Promise<"add" | "set" | "unset" | "remove"> {
    [leftKey, rightKey] = [
      this.left.getKey(leftKey, rightKey),
      this.right.getKey(leftKey, rightKey),
    ];

    const qb = this.connection
      .getRepository(this.entityType)
      .createQueryBuilder()
      .relation(this.propertyName)
      .of(leftKey);

    switch (action) {
      case "addOrSet":
        if (this.isToOne) {
          await qb.set(rightKey);
          return "set";
        } else {
          await qb.add(rightKey);
          return "add";
        }
      case "removeOrUnset":
        if (this.isToOne) {
          await qb.set(null);
          return "unset";
        } else {
          await qb.remove(rightKey);
          return "remove";
        }
    }
  }

  @Lazy() get leftEntityType(): ObjectType<T> {
    return this.invert ? this.relationType : this.entityType;
  }

  @Lazy() get rightEntityType(): ObjectType<any> {
    return !this.invert ? this.relationType : this.entityType;
  }

  [inspect.custom]() {
    return `<${this.constructor.name} ${this.entityType.name}.${this.propertyName}: ${this.relationType.name}>`;
  }

  setEntity(entity, relationKey: DataEntityKey | null) {
    const { relationMetadata, invert } = this;

    const isOwnerByColumnLeft =
      !invert &&
      (relationMetadata.isOneToOneOwner || relationMetadata.isManyToOne);

    const isOwnerByColumnRight =
      invert &&
      (relationMetadata.isOneToOneNotOwner || relationMetadata.isManyToOne);

    const isOwnerByColumn = isOwnerByColumnLeft || isOwnerByColumnRight;

    if (isOwnerByColumn) {
      (invert
        ? relationMetadata.inverseRelation!
        : relationMetadata
      ).joinColumns.forEach(column => {
        entity[column.propertyName] =
          relationKey?.object[column.referencedColumn!.propertyName!] ?? null;
      });
    }
    return isOwnerByColumn;
  }
}

export type JoinType = "INNER" | "LEFT";

function joinQb(
  qb: SelectQueryBuilder<any>,
  joinType: JoinType,
  table,
  alias,
  condition
) {
  switch (joinType) {
    case "LEFT":
      return qb.leftJoin(table, alias, condition);
    case "INNER":
      return qb.innerJoin(table, alias, condition);
    default:
      throw new Error(`Invalid join type ${joinType}.`);
  }
}
