import { assert } from "@dabsi/common/assert";
import defined from "@dabsi/common/object/defined";
import { inspect } from "@dabsi/logging/inspect";
import { DataEntityKey } from "@dabsi/typedata/entity/key";
import { getEntityMetadata } from "@dabsi/typedata/entity/typeormMetadata";
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

  protected _query(sql, params) {
    return this.connection.query(sql, params);
  }
  join(
    joinType: JoinType,
    qeb: DataQueryBuilder,
    leftSchema: string,
    rightKey: object | null,
    rightSchema = this.getRightSchema(leftSchema)
  ): string {
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

  protected async _set(leftKey: object, rightKey: object) {
    const inverse = this.relationMetadata.isOwning;

    const params: any[] = [];

    const param = value => {
      params.push(value ?? null);
      return "?";
    };

    const ownerKey = inverse ? leftKey : rightKey;
    const notOwnerKey = inverse ? rightKey : leftKey;

    let sql = `UPDATE ${this.escape(
      this.ownerRelationMetadata.entityMetadata.tableName
    )} AS X SET ${this.ownerRelationMetadata.joinColumns
      .map(
        jc =>
          `${escape(jc.databaseName)}=${param(
            notOwnerKey[jc.referencedColumn!.propertyName]
          )}`
      )
      .join(
        ", "
      )} WHERE ${this.ownerRelationMetadata.entityMetadata.primaryColumns
      .map(
        pc =>
          `X.${this.escape(pc.databaseName)}=${param(
            ownerKey[pc.propertyName]
          )}`
      )
      .join(" AND ")};`;

    await this._query(sql, params);
  }

  protected async _add(leftKey: object, rightKey: object) {
    if (!this.ownerRelationMetadata.joinTableName) {
      return this._set(leftKey, rightKey);
    }

    const inverse = this.relationMetadata.isOwning;

    const params: any[] = [];

    const param = value => {
      params.push(value ?? null);
      return "?";
    };

    const ownerKey = inverse ? leftKey : rightKey;
    const notOwnerKey = inverse ? rightKey : leftKey;

    const row: any = {};

    for (const jc of this.ownerRelationMetadata.joinColumns) {
      row[jc.databaseName] = ownerKey[jc.referencedColumn!.propertyName];
    }

    for (const jc of this.ownerRelationMetadata.inverseJoinColumns) {
      row[jc.databaseName] = notOwnerKey[jc.referencedColumn!.propertyName];
    }

    const columns = Object.keys(row);
    let sql = `INSERT INTO ${this.escape(
      this.ownerRelationMetadata.joinTableName
    )} (${columns
      .map(x => this.escape(x))
      .join(" ,")}) VALUES (${columns
      .map(name => param(row[name]))
      .join(",")}) ON CONFLICT DO NOTHING;`;

    await this.connection.query(sql, params);
  }

  protected async _unset(leftKey: object) {
    const params: any[] = [];
    const param = value => {
      params.push(value ?? null);
      return "?";
    };

    const whereByJoinColumns = this.left.isOwning ? this.invert : !this.invert;
    const whereColumns = whereByJoinColumns
      ? this.ownerRelationMetadata.joinColumns
      : (this.invert ? this.right : this.left).entityMetadata.primaryColumns;

    const sql = `UPDATE ${this.escape(
      this.ownerRelationMetadata.entityMetadata.tableName
    )} AS owner SET ${this.ownerRelationMetadata.joinColumns
      .map(jc => `${escape(jc.databaseName)}=${param(null)}`)
      .join(", ")} WHERE ${
      //
      whereColumns
        .map(
          pc =>
            `owner.${this.escape(pc.databaseName)}=${param(
              leftKey[
                whereByJoinColumns
                  ? pc.referencedColumn!.propertyName
                  : pc.propertyName
              ]
            )}`
        )
        .join(" AND ")
    };`;

    await this.connection.query(sql, params);
  }

  protected async _remove(leftKey: object, rightKey: object) {
    if (!this.ownerRelationMetadata.joinTableName) {
      return this._unset(leftKey);
    }
    const params: any[] = [];
    const param = value => {
      params.push(value ?? null);
      return "?";
    };

    if (this.invert) {
      await this.connection
        .getRepository(this.entityType)
        .createQueryBuilder()
        .relation(this.propertyName)
        .of(leftKey)
        .remove(rightKey);
    } else {
      await this.connection
        .getRepository(this.entityType)
        .createQueryBuilder()
        .relation(this.propertyName)
        .of(leftKey)
        .remove(rightKey);
    }
  }

  async update(
    action: "addOrSet" | "removeOrUnset",
    entitKey: object,
    relationKey: object
  ): Promise<"add" | "set" | "unset" | "remove"> {
    const [leftKey, rightKey] = [
      this.left.getKey(entitKey, relationKey),
      this.right.getKey(entitKey, relationKey),
    ];

    switch (action) {
      case "addOrSet":
        await this._add(leftKey, rightKey);
        if (this.isToOne) {
          return "set";
        } else {
          return "add";
        }
      case "removeOrUnset":
        await this._remove(leftKey, rightKey);
        if (this.isToOne) {
          return "unset";
        } else {
          // await qb.remove(rightKey);
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
