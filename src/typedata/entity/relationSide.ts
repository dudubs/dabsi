import { definedAt } from "@dabsi/common/object/definedAt";
import { DataQueryBuilder } from "@dabsi/typedata/query/builder";
import { DataEntityRelation } from "@dabsi/typedata/entity/relation";
import { ObjectType, Repository, SelectQueryBuilder } from "typeorm";
import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";
import { DataExp } from "@dabsi/typedata/exp/exp";
import { getEntityMetadata } from "@dabsi/typedata/entity/typeormMetadata";

export type ByTableOrColumn = "table" | "column";

export class DataEntityRelationSide<T> {
  constructor(
    public relation: DataEntityRelation,
    public entityType: ObjectType<T>,
    public isLeft: boolean
  ) {}

  entityMetadata = getEntityMetadata(this.relation.connection, this.entityType);

  getKey(entityKey: object, relationKey: object) {
    return (this.relation.invert ? !this.isLeft : this.isLeft)
      ? entityKey
      : relationKey;
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

  getJoinConditionExpByTable(schema, joinSchema): DataExp<any> {
    return this.relation.getJoinCondition(
      "table",
      this.joinColumns,
      schema,
      joinSchema
    );
  }

  getJoinColumn(by: ByTableOrColumn, column: ColumnMetadata) {
    switch (by) {
      case "column":
        return this.isOwning ? column : column.referencedColumn!;
      case "table":
        return !this.isLeft ? column : column.referencedColumn!;
    }
  }

  getIdConditionExp(schema: string, key: object): DataExp<any> {
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
