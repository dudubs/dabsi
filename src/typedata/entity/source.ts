import { hasKeys } from "@dabsi/common/object/hasKeys";
import Lazy from "@dabsi/common/patterns/lazy";
import { Type } from "@dabsi/common/typings2/Type";
import { DataEntityCursor } from "@dabsi/typedata/entity/cursor";
import { DataEntityKey } from "@dabsi/typedata/entity/key";
import { DataEntityLoader } from "@dabsi/typedata/entity/loader";
import DataQueryRunner from "@dabsi/typedata/query/runner";
import getDataContext from "@dabsi/typedata/entity/connection";
import getDeletePlan from "@dabsi/typedata/entity/getDeletePlan";
import getInsertPlan from "@dabsi/typedata/entity/getInsertPlan";
import getUpdatePlan from "@dabsi/typedata/entity/getUpdatePlan";
import { DataCursor, EmptyDataCursor } from "@dabsi/typedata/cursor";
import { DataRow } from "@dabsi/typedata/row";
import { DataSource } from "@dabsi/typedata/source";
import { DataInsert, DataUpdate } from "@dabsi/typedata/value";
import { Connection, QueryRunner } from "typeorm";
import { RelationMetadata } from "typeorm/metadata/RelationMetadata";

export class DataEntitySource<T> extends DataSource<T> {
  static createFromConnection<T>(
    entityType: Type<T>,
    connection?: () => Connection
  ): DataEntitySource<T> {
    return new DataEntitySource(
      entityType,
      () => (connection || getDataContext)().createQueryRunner(),
      EmptyDataCursor
    );
  }

  static fromQueryRunner<T>(
    entityType: Type<T>,
    queryRunner: QueryRunner
  ): DataEntitySource<T> {
    return new DataEntitySource(entityType, () => queryRunner, EmptyDataCursor);
  }
  constructor(
    public entityType: Type<T>,
    public getQueryRunner: () => QueryRunner,
    public cursor: DataCursor
  ) {
    super();
  }

  withCursor<U = T>(cursor: DataCursor): DataEntitySource<U> {
    return new DataEntitySource<U>(
      this.entityType,
      this.getQueryRunner,
      cursor
    );
  }

  @Lazy() get entityCursor(): DataEntityCursor {
    return DataEntityCursor.create(
      this.getQueryRunner(),
      this.cursor,
      this.entityType
    );
  }

  getDataQueryRunner(): DataQueryRunner {
    return new DataQueryRunner(
      DataEntityCursor.buildQuery(this.entityCursor),
      this.entityCursor.queryRunner
    );
  }

  @Lazy() get entityLoader(): DataEntityLoader {
    const loader = DataEntityLoader.createFromCursor(this.entityCursor, this);
    DataEntityLoader.buildCursor(loader, this.cursor);
    return loader;
  }

  getRows(): Promise<DataRow<T>[]> {
    return this.entityLoader.loadRows();
  }

  getCountRows(): Promise<number> {
    return this.getDataQueryRunner().getCountRows();
  }

  hasRows(): Promise<boolean> {
    return this.getDataQueryRunner().hasRows();
  }
  createEntitySource(entityType): DataSource<any> {
    return new DataEntitySource(
      entityType,
      this.getQueryRunner,
      EmptyDataCursor
    );
  }

  async withTransaction<T = void>(callback: () => Promise<T>): Promise<T> {
    const {
      entityCursor: { queryRunner },
    } = this;
    if (queryRunner.isTransactionActive) {
      return await callback();
    }
    let result;
    await queryRunner.startTransaction();
    try {
      result = await callback();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
    await queryRunner.commitTransaction();
    return result;
  }

  async insertKeys<T>(
    this: DataEntitySource<T>,
    values: DataInsert<T>[]
  ): Promise<string[]> {
    return this.withTransaction(async () => {
      const keys: string[] = [];
      for (const value of values) {
        const plan = getInsertPlan(this, value);
        const entityKey = await plan.insert();
        keys.push(entityKey.text);
      }
      return keys;
    });
  }

  updateKeys(keys: string[], value: DataUpdate<T>): Promise<number> {
    return this.withTransaction(async () => {
      if (!hasKeys(value)) return 0;

      const plan = getUpdatePlan(this, value);
      await plan.updateMany(keys);

      return 0;
    });
  }

  protected updateRelationKeys(
    keysToAdd: string[],
    keysToRemove: string[]
  ): Promise<void> {
    return this.withTransaction(async () => {
      for (let key of keysToAdd) {
        await this._updateRelationKeys(key, "addOrSet");
      }
      for (let key of keysToRemove) {
        await this._updateRelationKeys(key, "removeOrUnset");
      }
    });
  }

  protected async _updateRelationKeys(
    entityTextKey: string,
    method: "removeOrUnset" | "addOrSet"
  ) {
    const entityKey = DataEntityKey.parse(
      this.entityCursor.entityMetadata,
      entityTextKey
    );

    if (this.entityCursor.parent) {
      const { relation, relationKey } = this.entityCursor.parent;
      await relation.update(method, entityKey.object, relationKey.object!);
    }

    for (const { relation, key: relationKey } of this.entityCursor
      .relationKeys) {
      await relation.update(method, entityKey.object, relationKey.object);
    }
  }

  deleteKeys(textKeys: string[]): Promise<void> {
    return this.withTransaction(async () => {
      const plan = getDeletePlan(this);
      await plan.deleteMany(textKeys);
    });
  }
}
