import { Connection } from "typeorm";
import { inspect } from "util";
import { defined } from "../../common/object/defined";
import { DataExpMapper } from "../data-exp/DataExpMapper";
import { DataTypeInfo } from "../DataTypeInfo";
import { EntityDataKey } from "./EntityDataKey";
import {
  DataExp,
  DataExpTypes,
  DataNamedCompareOperator,
  DataParameterExp,
  DataStringExp,
} from "../data-exp/DataExp";
import { DataExpTranslator } from "../data-exp/DataExpTranslator";
import { DataQuery, DataQueryExp } from "../data-query/DataQueryExp";
import { DataQueryBuilder } from "../data-query/DataQueryBuilder";
import { EntityRelation } from "../../typeorm/relations";

const mapper = Object.seal(new DataExpMapper());

function Mapper(target, propertyName, desc) {
  desc.value = function () {
    return mapper[propertyName].apply(mapper, arguments);
  };
}

export class EntityDataExpToQebTranslator<T> extends DataExpTranslator<
  T,
  DataQueryExp
> {
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
          .map(child => child.discriminatorValue!)
          .concat([childMetadata.discriminatorValue!])
          .toArray(),
      },
    };

    const childTranslator = new EntityDataExpToQebTranslator(
      this.connection,
      childTypeInfo,
      this.qb,
      this.schema
    );

    return childTranslator.translate({ $and: [childExp, exp] });
  }

  translateAt(propertyName: string, exp: DataExp<any>): DataQueryExp {
    const relation = new EntityRelation(
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
        [rightSchema]: new EntityDataExpToQebTranslator(
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

  getSubSelect(propertyName: string, whereExp: DataExp<any>): DataQuery {
    const relation = new EntityRelation(
      this.connection,
      this.typeInfo.type,
      propertyName,
      false
    );

    if (!relation.isToMany)
      throw new Error(`SubQuery allowed only to *-to-many relation.`);

    const rightSchema = `${relation.left.entityMetadata.tableName}_${
      relation.propertyName
    }_${relation.right.entityMetadata.tableName}_${
      whereExp === undefined ? "all" : ++this.counter
    }`;

    let subSelect: DataQuery;

    if (relation.ownerRelationMetadata.joinTableName) {
      const joinSchema = rightSchema + "_join";

      subSelect = {
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
      subSelect = {
        alias: rightSchema,
        from: relation.right.entityMetadata.tableName,
        where: relation.getJoinConditionExpByColumn(this.schema, rightSchema),
      };
    }

    if (whereExp !== undefined) {
      const subTypeInfo =
        this.typeInfo.relations?.[propertyName] ||
        DataTypeInfo.get(relation.right.entityType);

      const subTranslator = new EntityDataExpToQebTranslator(
        this.connection,
        subTypeInfo,
        new DataQueryBuilder(subSelect),
        rightSchema
      );

      subSelect.where = {
        $at: { [rightSchema]: subTranslator.translate(whereExp) },
      };
    }
    return subSelect;
  }

  translateCount(propertyName: string, whereExp: DataExp<any>): DataQueryExp {
    return { $queryCount: this.getSubSelect(propertyName, whereExp) };
  }

  translateHas(
    inverse: boolean,
    propertyName: string,
    exp: DataExp<any>
  ): DataQueryExp {
    return {
      [inverse ? "$queryNotHas" : "$queryHas"]: this.getSubSelect(
        propertyName,
        exp
      ),
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
          const key = EntityDataKey.parse(entityMetadata, textKey);
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

  translateField(propertyName: DataStringExp<T>): DataQueryExp {
    return { $at: { [this.schema]: propertyName } };
  }

  @Mapper
  translateParameter(value: DataParameterExp): DataQueryExp {
    throw new Error();
  }

  @Mapper
  translateBase(exp: DataExp<T>): DataQueryExp {
    throw new Error();
  }

  @Mapper
  translateAnd(exps: DataExp<any>[]): DataQueryExp {
    throw new Error();
  }

  @Mapper
  translateCompare(
    op: DataNamedCompareOperator,
    left: DataExp<any>,
    right: DataExp<any>
  ): DataQueryExp {
    throw new Error();
  }

  @Mapper
  translateConcat(exps: DataExp<any>[]): DataQueryExp {
    throw new Error();
  }

  @Mapper
  translateIf(
    condition: DataExp<any>,
    then: DataExp<any>,
    _else: DataExp<any>
  ): DataQueryExp {
    throw new Error();
  }

  @Mapper
  translateIfNull(exp: DataExp<any>, alt_value: DataExp<any>): DataQueryExp {
    throw new Error();
  }

  @Mapper
  translateIn(
    inverse: boolean,
    where: DataExp<any>,
    values: DataExp<any>[]
  ): DataQueryExp {
    throw new Error();
  }

  @Mapper
  translateIsNull(inverse: boolean, exp: DataExp<any>): DataQueryExp {
    throw new Error();
  }

  @Mapper
  translateLength(exp: DataExp<any>): DataQueryExp {
    throw new Error();
  }

  @Mapper
  translateNot(exp: DataExp<any>): DataQueryExp {
    throw new Error();
  }

  @Mapper
  translateOr(exps: DataExp<any>[]): DataQueryExp {
    throw new Error();
  }
}
