import { Connection, ObjectType, Repository } from "typeorm";
import Lazy from "@dabsi/common/patterns/lazy";
import { DataTypeInfo } from "@dabsi/typedata/typeInfo";
import { DataExp } from "@dabsi/typedata/exp/exp";
import { DataQueryBuilder } from "@dabsi/typedata/query/builder";
import { DataQueryTranslatorToSqb } from "@dabsi/typedata/query/sqbTranslator";
import { DataEntityTranslator } from "@dabsi/typedata/entity/translator";

export class QbExpTester<T> {
  constructor(
    public getConnection: () => Connection,
    public type: ObjectType<T>
  ) {}

  typeInfo = DataTypeInfo.get(this.type);

  @Lazy() get repository(): Repository<T> {
    return this.getConnection().getRepository(this.typeInfo.type);
  }

  getOneRowWhereExp(exp) {
    const qb = this.repository.createQueryBuilder();

    const query = {
      from: qb.expressionMap.mainAlias!.metadata.tableName,
      alias: qb.alias,
    };

    const qebTranslator = new DataEntityTranslator(
      this.getConnection(),
      this.typeInfo,
      new DataQueryBuilder(query),
      qb.alias
    );

    const sqbTranslator = new DataQueryTranslatorToSqb(qb, qb.alias);
    const qebExp = qebTranslator.translate(exp);
    qb.andWhere(sqbTranslator.translate(qebExp));
    DataQueryTranslatorToSqb.build(qb, query);
    qb.select("1");
    return qb.getRawOne();
  }

  testExp(exp, callback, onError?) {
    return it(JSON.stringify(exp), async () => {
      try {
        callback(await this.getOneRowWhereExp(exp));
      } catch (err) {
        if (onError) {
          await onError(err);
        } else {
          throw err;
        }
      }
    });
  }

  expectToNotExists(exp: DataExp<T>) {
    this.testExp(exp, row => {
      if (row) {
        fail(`expected to not exists`);
      }
    });
  }

  expectToExists(exp: DataExp<T>) {
    this.testExp(exp, row => {
      if (!row) {
        fail(`expected to exists`);
      }
    });
  }

  expectToError(exp: DataExp<T>) {
    this.testExp(
      exp,
      () => {
        fail(`expected to error.`);
      },
      () => {
        ///
      }
    );
  }
}

/*

    DogType = "dog";

 */
