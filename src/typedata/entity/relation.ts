import { assert } from "@dabsi/common/assert";
import { defined } from "@dabsi/common/object/defined";
import { inspect } from "@dabsi/logging/inspect";
import { DataEntityKey } from "@dabsi/typedata/entity/key";
import { getEntityMetadata } from "@dabsi/typedata/entity/metadata";
import {
  ByTableOrColumn,
  DataEntityRelationSide,
} from "@dabsi/typedata/entity/relationSide";
import { DataExp } from "@dabsi/typedata/exp/exp";
import { DataQueryBuilder } from "@dabsi/typedata/query/builder";
import { Connection, ObjectType } from "typeorm";
import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";

export class DataEntityRelation {
  static of<T, K extends keyof T>(
    connection: Connection,
    entityType: ObjectType<T>,
    propertyName: string & K
  ): DataEntityRelation {
    return new DataEntityRelation(connection, entityType, propertyName, false);
  }

  static at<T, K extends keyof T>(
    connection: Connection,
    entityType: ObjectType<T>,
    propertyName: string & K
  ): DataEntityRelation {
    return new DataEntityRelation(connection, entityType, propertyName, true);
  }

  constructor(
    public connection: Connection,
    public entityType: Function,
    public propertyName: string,
    public invert: boolean
  ) {}

  entityMetadata = getEntityMetadata(this.connection, this.entityType);

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

  leftEntityType = this.invert ? this.relationType : this.entityType;
  rightEntityType = !this.invert ? this.relationType : this.entityType;

  left = new DataEntityRelationSide(this, this.leftEntityType, true);
  right = new DataEntityRelationSide(this, this.rightEntityType, false);

  get isToOne(): boolean {
    return (
      this.relationMetadata.isOneToOne || this.relationMetadata.isManyToOne
    );
  }

  get isToMany(): boolean {
    return (
      this.relationMetadata.isManyToMany || this.relationMetadata.isOneToMany
    );
  }

  get relationType(): Function {
    assert(typeof this.relationMetadata?.type === "function");
    return this.relationMetadata.type;
  }

  getRightSchema(leftSchema: string) {
    return this.invert
      ? `${leftSchema}_at_${this.right.entityMetadata.tableName}__${this.propertyName}`
      : `${leftSchema}_${this.propertyName}`;
  }

  join(
    joinType: JoinType,
    qeb: DataQueryBuilder,
    leftSchema: string,
    rightKey: object | null
  ): string {
    const rightSchema = this.getRightSchema(leftSchema);

    if (qeb.joins[rightSchema]) return rightSchema;

    const rightCondition = rightKey
      ? this.right.getIdConditionExp(rightSchema, rightKey)
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
          rightCondition,
        ],
      });
    } else {
      // join by column
      qeb.join(rightSchema, this.right.entityMetadata.tableName, joinType, {
        $and: [
          this.getJoinConditionByColumn(leftSchema, rightSchema),
          rightCondition,
        ],
      });
    }
    return rightSchema;
  }

  getJoinConditionByColumn(
    leftSchema: string,
    rightSchema: string
  ): DataExp<any> {
    return this.getJoinCondition(
      "column",
      this.ownerRelationMetadata.joinColumns,
      leftSchema,
      rightSchema
    );
  }

  getJoinCondition(
    by: ByTableOrColumn,
    joinColumns: ColumnMetadata[],
    leftSchema: string,
    rightSchema: string
  ): DataExp<any> {
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

  setEntityRow(entity, relationKey: DataEntityKey | null) {
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
  [inspect.custom]() {
    return `<${this.constructor.name} ${this.entityType.name}.${this.propertyName}: ${this.relationType.name}>`;
  }
}

export type JoinType = "INNER" | "LEFT";
