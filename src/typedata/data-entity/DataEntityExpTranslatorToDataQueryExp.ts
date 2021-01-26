import { inspect } from "@dabsi/logging/inspect";
import { defined } from "@dabsi/common/object/defined";
import { DataEntityKey } from "@dabsi/typedata/data-entity/DataEntityKey";
import {
  DataNamedOperatorExp,
  DataExp,
  DataParameterExp,
} from "@dabsi/typedata/data-exp/DataExp";
import { DataExpMapper } from "@dabsi/typedata/data-exp/DataExpMapper";
import { DataExpTranslator } from "@dabsi/typedata/data-exp/DataExpTranslator";
import { DataQueryBuilder } from "@dabsi/typedata/data-query/DataQueryBuilder";
import {
  DataQuery,
  DataQueryExp,
} from "@dabsi/typedata/data-query/DataQueryExp";
import { DataTypeInfo } from "@dabsi/typedata/DataTypeInfo";
import { DataEntityRelation } from "@dabsi/typeorm/relations";
import { Connection } from "typeorm";
import { DataCompareOperatorExp } from "@dabsi/typedata/data-exp/DataCompareOperatorExp";

const mapper = Object.seal(new DataExpMapper());

function UseDataExpMapper(target: DataExpTranslator<any>, propertyName, desc) {
  desc.value = function () {
    return mapper[propertyName].apply(mapper, arguments);
  };
}

export class DataEntityExpTranslatorToDataQueryExp extends DataExpTranslator<DataQueryExp> {
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

  translateAs(childKey: string, exp: DataExp<any>): DataQueryExp {
    const childTypeInfo = defined(
      this.typeInfo.children?.[childKey],
      () =>
        `Not child key "${childKey}" in ${this.typeInfo.name}. ${inspect(
          this.typeInfo,
          { depth: 10 }
        )}`
    );

    const childMetadata = this.connection.getMetadata(childTypeInfo.type);

    const childExp = <DataExp<any>>{
      [childMetadata.discriminatorColumn!.propertyName]: {
        $in: childMetadata.childEntityMetadatas
          .toSeq()
          .map(child => child!.discriminatorValue!)
          .concat([childMetadata.discriminatorValue!])
          .toArray(),
      },
    };

    const childTranslator = new DataEntityExpTranslatorToDataQueryExp(
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
      throw new Error(`$at support in relation to-one only.`);
    const rightSchema = relation.joinQeb("LEFT", this.qb, this.schema, null);
    return {
      $at: {
        [rightSchema]: new DataEntityExpTranslatorToDataQueryExp(
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

    if (!relation.isToMany)
      throw new TypeError(`$find can translate only for *-to-many relation.`);

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
        where: relation.getJoinConditionExpByColumn(this.schema, rightSchema),
      };
    }
    const subTypeInfo =
      this.typeInfo.relations?.[relationName] ||
      DataTypeInfo.get(relation.right.entityType);

    const subTranslator = new DataEntityExpTranslatorToDataQueryExp(
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
      $queryCount: this.translateRelation(relationName, whereExp).query,
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
    exp: DataExp<any>
  ): DataQueryExp {
    return {
      [inverse ? "$queryNotHas" : "$queryHas"]: this.translateRelation(
        propertyName,
        exp
      ).query,
    };
  }

  translateIs(inverse: boolean, keys: string[]): DataQueryExp {
    keys = [...new Set(keys)];

    if (!keys.length) {
      return this.translate(false);
    }
    const entityMetadata = this.connection.getMetadata(this.typeInfo.type);
    if (entityMetadata.primaryColumns.length === 1) {
      const column = entityMetadata.primaryColumns[0];
      return [column.databaseName, { [inverse ? "$notIn" : "$in"]: keys }];
    }
    const exp = {
      $or: this.translateOr(
        keys.map(textKey => {
          const key = DataEntityKey.parseObject(entityMetadata, textKey);
          return {
            $and: entityMetadata.primaryColumns.map(column => [
              column.databaseName,
              "=",
              [key[column.referencedColumn!.propertyName]],
            ]),
          };
        })
      ),
    };
    return inverse ? { $not: exp } : exp;
  }

  translateField(propertyName: string): DataQueryExp {
    return { $at: { [this.schema]: propertyName } };
  }

  @UseDataExpMapper
  translateParameter(value: DataParameterExp): DataQueryExp {
    throw new Error();
  }

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
    op: DataCompareOperatorExp.Base,
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
