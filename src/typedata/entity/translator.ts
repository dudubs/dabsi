import { mapArrayToObject } from "@dabsi/common/array/mapArrayToObject";
import defined from "@dabsi/common/object/defined";
import { touchObject } from "@dabsi/common/object/touchObject";
import Lazy from "@dabsi/common/patterns/Lazy";
import { inspect } from "@dabsi/logging/inspect";
import { DataEntityKey } from "@dabsi/typedata/entity/key";
import {
  getEntityMetadata,
  getRelationMetadatasTo,
} from "@dabsi/typedata/entity/typeormMetadata";
import { DataExp, DataParameterExp } from "@dabsi/typedata/exp/exp";
import { DataExpMapper } from "@dabsi/typedata/exp/mapper";
import { DataOperatorExp } from "@dabsi/typedata/exp/operator";
import { DataTranslator } from "@dabsi/typedata/exp/translator";
import { DataQueryBuilder } from "@dabsi/typedata/query/builder";
import { DataQuery, DataQueryExp } from "@dabsi/typedata/query/exp";
import { DataTypeInfo } from "@dabsi/typedata/typeInfo";
import { DataEntityRelation } from "@dabsi/typeorm/relations";
import { Connection, EntityMetadata } from "typeorm";

const mapper = Object.seal(new DataExpMapper());

function UseDataExpMapper(target: DataTranslator<any>, propertyName, desc) {
  desc.value = function () {
    return mapper[propertyName].apply(mapper, arguments);
  };
}

// translateEntityExpToQueryExp()
// translateEntityToQueryExp()

export class DataEntityTranslator extends DataTranslator<DataQueryExp> {
  False: DataExp<any> = false;

  Null: DataExp<any> = null;

  True: DataExp<any> = true;

  constructor(
    public connection: Connection,
    public typeInfo: DataTypeInfo,
    public qb: DataQueryBuilder,
    public schema: string
  ) {
    super();
  }

  get entityMetadata(): EntityMetadata {
    return getEntityMetadata(this.connection, this.typeInfo.type);
  }

  translateAs(childKey: string, exp: DataExp<any>): DataQueryExp {
    const childTypeInfo = defined(
      this.typeInfo.children?.[childKey],
      () =>
        `Not child key "${childKey}" in ${this.typeInfo.name}. ${inspect(
          this.typeInfo,
          { depth: 10 }
        )}`
    );

    const childMetadata = getEntityMetadata(
      this.connection,
      childTypeInfo.type
    );

    const childExp = <DataExp<any>>{
      [childMetadata.discriminatorColumn!.propertyName]: {
        $in: childMetadata.childEntityMetadatas
          .toSeq()
          .map(child => child!.discriminatorValue!)
          .concat([childMetadata.discriminatorValue!])
          .toArray(),
      },
    };

    const childTranslator = new DataEntityTranslator(
      this.connection,
      childTypeInfo,
      this.qb,
      this.schema
    );

    return childTranslator.translate({ $and: [childExp, exp] });
  }

  translateAt(propertyName: string, exp: DataExp<any>): DataQueryExp {
    const relation = new DataEntityRelation(
      this.connection,
      this.typeInfo.type,
      propertyName,
      false
    );
    if (!relation.isToOne)
      throw new Error(`$at support in relation *-to-one only.`);
    const rightSchema = relation.join("LEFT", this.qb, this.schema, null);
    return {
      $at: {
        [rightSchema]: new DataEntityTranslator(
          this.connection,
          this.typeInfo.relations?.[propertyName] ||
            DataTypeInfo.get(relation.right.entityType),
          this.qb,
          rightSchema
        ).translate(exp),
      },
    };
  }

  counter = 0;

  translateRelation(relationName: string, whereExp: DataExp<any>) {
    const relation = new DataEntityRelation(
      this.connection,
      this.typeInfo.type,
      relationName,
      false
    );

    const rightSchema = `${relation.left.entityMetadata.tableName}_${
      relation.propertyName
    }_${relation.right.entityMetadata.tableName}_${
      whereExp === undefined ? "all" : ++this.counter
    }`;

    let query: DataQuery;

    if (relation.ownerRelationMetadata.joinTableName) {
      const joinSchema = rightSchema + "_join";

      query = {
        alias: joinSchema,
        from: relation.ownerRelationMetadata.joinTableName,
        joins: {
          [rightSchema]: {
            type: "INNER",
            from: relation.right.entityMetadata.tableName,
            condition: {
              $and: [
                relation.left.getJoinConditionExpByTable(
                  this.schema,
                  joinSchema
                ),
                relation.right.getJoinConditionExpByTable(
                  rightSchema,
                  joinSchema
                ),
              ],
            },
          },
        },
      };
    } else {
      query = {
        alias: rightSchema,
        from: relation.right.entityMetadata.tableName,
        where: relation.getJoinConditionByColumn(this.schema, rightSchema),
      };
    }
    const subTypeInfo =
      this.typeInfo.relations?.[relationName] ||
      DataTypeInfo.get(relation.right.entityType);

    const subTranslator = new DataEntityTranslator(
      this.connection,
      subTypeInfo,
      new DataQueryBuilder(query),
      rightSchema
    );

    if (whereExp !== undefined) {
      query.where = DataExp(query.where, {
        $at: { [rightSchema]: translate(whereExp) },
      });
    }

    function translate(exp) {
      return subTranslator.translate(exp);
    }
    return { relation, query, translate };
  }

  translateCount(relationName: string, whereExp: DataExp<any>): DataQueryExp {
    return {
      $countQuery: this.translateRelation(relationName, whereExp).query,
    };
  }

  translateFind(relationName, exp): DataQueryExp {
    const { query, relation, translate } = this.translateRelation(
      relationName,
      exp
    );

    if (relation.right.entityMetadata.primaryColumns.length > 1)
      throw new Error(`Not supported yet.`);
    query.take = 1;
    query.fields = {
      foundKey: translate(
        relation.right.entityMetadata.primaryColumns[0].propertyName
      ),
    };

    return { $query: query };
  }

  translateHas(
    inverse: boolean,
    propertyName: string,
    condition: DataExp<any>
  ): DataQueryExp {
    // optimizing *-to-one & owner & without condition.
    if (condition === undefined || condition == true) {
      const rm = defined(
        this.entityMetadata.relations.find(
          rm => rm.propertyName === propertyName
        ),
        () => `No relation at ${this.typeInfo.type.name}.${propertyName}`
      );
      if (rm.isOwning && !rm.joinTableName) {
        return {
          [inverse ? "$or" : "$and"]: rm.joinColumns.map(jc => ({
            [inverse ? "$isNull" : "$isNotNull"]: {
              $at: { [this.schema]: jc.databaseName },
            },
          })),
        };
      }
    }

    // TODO: if is *-to-one & owner so check by column
    return {
      [inverse ? "$notHasQuery" : "$queryHas"]: this.translateRelation(
        propertyName,
        condition
      ).query,
    };
  }

  translateIs(inverse: boolean, keys: string[]): DataQueryExp {
    keys = [...new Set(keys)];

    if (!keys.length) {
      return this.translate(false);
    }
    const entityMetadata = getEntityMetadata(
      this.connection,
      this.typeInfo.type
    );
    if (entityMetadata.primaryColumns.length === 1) {
      const column = entityMetadata.primaryColumns[0];
      return [column.databaseName, { [inverse ? "$notIn" : "$in"]: keys }];
    }
    const exp = this.translateOr(
      keys.map(textKey => {
        const key = DataEntityKey.parseObject(entityMetadata, textKey);
        return {
          $and: entityMetadata.primaryColumns.map(column => [
            column.databaseName,
            "=",
            [key[column.propertyName]],
          ]),
        };
      })
    );
    return inverse ? { $not: exp } : exp;
  }

  translateField(field: string): DataQueryExp {
    return { $at: { [this.schema]: field } };
  }

  @UseDataExpMapper
  translateParameter(value: DataParameterExp): DataQueryExp {
    throw new Error();
  }

  protected get metaFields(): Record<string, DataQueryExp> {
    if (!this.qb.joins.metaFields) {
      this.qb.joins.metaFields = {
        type: "INNER",
        from: this.qb.query.from,
        fields: {
          ROWID: { $at: { metaFields: "ROWID" } },
        },
        condition: [
          { $at: { metaFields: "ROWID" } },
          "=",
          { $at: { [this.schema]: "ROWID" } },
        ],
      };
    }
    return this.qb.joins.metaFields.fields!;
  }

  translateCountRefs(type: "all" | "any"): DataExp<any> {
    const countAll = type === "all";
    let changeToCountAll = false;
    if (type === "all" && !this.metaFields.countRefs?.["$add"]) {
      changeToCountAll = true;
    }
    if (changeToCountAll || !this.metaFields.countRefs) {
      const counts = getRelationMetadatasTo(this.connection, this.typeInfo.type)
        .toSeq()
        .map(rm => {
          const [tableName, joinColumns] = rm.joinTableName
            ? [rm.joinTableName, rm.inverseJoinColumns]
            : [rm.entityMetadata.tableName, rm.joinColumns];
          return {
            $countQuery: {
              from: tableName,
              alias: "rel",
              where: {
                $and: joinColumns.map(jc => [
                  { $at: { rel: jc.databaseName } },
                  "=",
                  {
                    $at: { metaFields: jc.referencedColumn!.databaseName },
                  },
                ]),
              },
            },
          };
        })
        .toArray();

      this.metaFields.countRefs = !counts.length
        ? 0
        : {
            [countAll ? "$add" : "$or"]: counts,
          };
    }
    return { $at: { metaFields: "countRefs" } };
  }

  touchMetaField(
    id: string,
    callback: (id: string) => DataQueryExp
  ): DataQueryExp {
    if (!(id in this.metaFields)) {
      this.metaFields[id] = callback(id);
    }
    return { $at: { metaFields: id } };
  }

  // @Lazy() get schameQuery(): Omit<DataQuery, "alias"> {
  //   if (this.qb.query.alias === this.schema) {
  //     return this.qb.query;
  //   }
  //   const join = this.qb.joins[this.schema];
  //   if (join) {
  //     return join;
  //   }
  //   throw new Error("No table for schema");
  // }

  @UseDataExpMapper
  translateBase(exp: DataExp<any>): DataQueryExp {
    throw new Error();
  }

  @UseDataExpMapper
  translateAnd(exps: DataExp<any>[]): DataQueryExp {
    throw new Error();
  }

  @UseDataExpMapper
  translateCompare(
    op: DataOperatorExp.Base,
    inverse: boolean,
    left: DataExp<any>,
    right: DataExp<any>
  ): DataQueryExp {
    throw new Error();
  }

  @UseDataExpMapper
  translateConcat(exps: DataExp<any>[]): DataQueryExp {
    throw new Error();
  }

  @UseDataExpMapper
  translateIf(
    condition: DataExp<any>,
    then: DataExp<any>,
    _else: DataExp<any>
  ): DataQueryExp {
    throw new Error();
  }

  @UseDataExpMapper
  translateAdd(exps): any {
    throw new Error();
  }

  @UseDataExpMapper
  translateIfNull(exp: DataExp<any>, alt_value: DataExp<any>): DataQueryExp {
    throw new Error();
  }

  @UseDataExpMapper
  translateIn(
    inverse: boolean,
    where: DataExp<any>,
    values: DataExp<any>[]
  ): DataQueryExp {
    throw new Error();
  }

  @UseDataExpMapper
  translateIsNull(inverse: boolean, exp: DataExp<any>): DataQueryExp {
    throw new Error();
  }

  @UseDataExpMapper
  translateLength(exp: DataExp<any>): DataQueryExp {
    throw new Error();
  }

  @UseDataExpMapper
  translateNot(exp: DataExp<any>): DataQueryExp {
    throw new Error();
  }

  @UseDataExpMapper
  translateOr(exps: DataExp<any>[]): DataQueryExp {
    throw new Error();
  }
}
