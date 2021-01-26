import { is } from "immutable4";
import { ObjectType, Repository, SelectQueryBuilder } from "typeorm";
import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";
import { RelationMetadata } from "typeorm/metadata/RelationMetadata";
import { definedAt } from "@dabsi/common/object/definedAt";
import { DataQueryBuilder } from "@dabsi/typedata/data-query/DataQueryBuilder";
import { DataEntityRelation } from "@dabsi/typeorm/relations/DataEntityRelation";
import { isSubClass } from "@dabsi/typeorm/relations/isSubClass";

export type ByTableOrColumn = "table" | "column";

export class DataEntityRelationSide<T> {
  constructor(
    public relation: DataEntityRelation,
    public entityType: ObjectType<T>,
    public isLeft: boolean
  ) {}

  entityMetadata = this.relation.connection.getMetadata(this.entityType);

  getKey(leftKey: object, rightKey: object) {
    return (this.relation.invert ? !this.isLeft : this.isLeft)
      ? leftKey
      : rightKey;
  }

  get repository(): Repository<T> {
    return this.relation.connection.getRepository(this.entityType);
  }

  get isOwning() {
    if (!this.isLeft) return !this.relation.left.isOwning;

    const {
      relation: {
        relationMetadata: { isOwning },
        invert,
      },
    } = this;

    return invert ? !isOwning : isOwning;
  }

  joinColumns: ColumnMetadata[] = this.isOwning
    ? this.relation.ownerRelationMetadata.joinColumns
    : this.relation.ownerRelationMetadata.inverseJoinColumns;

  getJoinConditionExpByTable(schema, joinSchema) {
    return this.relation.getJoinConditionExp(
      "table",
      this.joinColumns,
      schema,
      joinSchema
    );
  }

  getJoinConditionSqlByTable(schema, joinSchema) {
    return this.relation.getJoinConditionSql(
      "table",
      this.joinColumns,
      schema,
      joinSchema
    );
  }

  getJoinColumn(by: ByTableOrColumn, column: ColumnMetadata) {
    switch (by) {
      case "column":
        return this.isOwning ? column : definedAt(column, "referencedColumn");
      case "table":
        return !this.isLeft ? column : definedAt(column, "referencedColumn");
      default:
        throw new Error(`Invalid by ${by}`);
    }
  }

  getIdCondition(
    qb: SelectQueryBuilder<any>,
    schema: string,
    objectKey: object
  ): string {
    let sql = "";
    for (let column of this.entityMetadata.primaryColumns) {
      const parameterName = schema + "_" + column.propertyName;
      sql += `${sql ? " AND " : ""}${schema}.${
        column.databaseName
      }=:${parameterName}`;
      qb.setParameter(parameterName, objectKey[column.propertyName]);
    }
    return sql;
  }

  getIdConditionExp(qb: DataQueryBuilder, schema: string, key: object) {
    return {
      $and: this.entityMetadata.primaryColumns.map(c => {
        return {
          $at: {
            [schema]: [c.databaseName, "=", [key[c.propertyName]]],
          },
        };
      }),
    };
  }
}
