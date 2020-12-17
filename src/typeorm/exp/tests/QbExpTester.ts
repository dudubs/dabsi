import { Connection, ObjectType, Repository } from "typeorm";
import { Lazy } from "@dabsi/common/patterns/lazy";
import { DataTypeInfo } from "@dabsi/typedata/DataTypeInfo";
import { DataExp } from "@dabsi/typedata/data-exp/DataExp";
import { DataQueryBuilder } from "@dabsi/typedata/data-query/DataQueryBuilder";
import { DataQueryExpToSqbTranslator } from "@dabsi/typedata/data-query/DataQueryExpToSqbTranslator";
import { DataEntityExpTranslatorToDataQueryExp } from "@dabsi/typedata/data-entity/DataEntityExpTranslatorToDataQueryExp";

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

    const qebTranslator = new DataEntityExpTranslatorToDataQueryExp(
      this.getConnection(),
      this.typeInfo,
      new DataQueryBuilder(query),
      qb.alias
    );

    const sqbTranslator = new DataQueryExpToSqbTranslator(qb, qb.alias);
    const qebExp = qebTranslator.translate(exp);
    qb.andWhere(sqbTranslator.translate(qebExp));
    DataQueryExpToSqbTranslator.build(qb, query);
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
