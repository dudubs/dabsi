import { hasKeys } from "@dabsi/common/object/hasKeys";
import { omit } from "@dabsi/common/object/omit";
import Lazy from "@dabsi/common/patterns/Lazy";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { BasedType, RebaseType } from "@dabsi/typedata/BaseType";
import { DataCursor, EMPTY_DATA_CURSOR } from "@dabsi/typedata/cursor";
import getDataContext from "@dabsi/typedata/entity/connection";
import { DataEntityCursor } from "@dabsi/typedata/entity/cursor";
import getDeletePlan from "@dabsi/typedata/entity/getDeletePlan";
import getInsertPlan from "@dabsi/typedata/entity/getInsertPlan";
import getUpdatePlan from "@dabsi/typedata/entity/getUpdatePlan";
import { DataEntityKey } from "@dabsi/typedata/entity/key";
import { DataEntityLoader } from "@dabsi/typedata/entity/loader";
import { DataEntityTreeLoader } from "@dabsi/typedata/entity/treeLoader";
import { DataQueryRunner } from "@dabsi/typedata/query/runner";
import { DataRow, DataTreeRow } from "@dabsi/typedata/row";
import { DataSource } from "@dabsi/typedata/source";
import { DataInsertRow, DataUpdateRow } from "@dabsi/typedata/value";
import { Connection, QueryRunner } from "typeorm";

export class DataEntitySource<T> extends DataSource<T> {
  static createFromConnection<T>(
    entityType: Constructor<T>,
    connection?: () => Connection
  ): DataEntitySource<T> {
    return new DataEntitySource(
      entityType,
      () => (connection || getDataContext)().createQueryRunner(),
      EMPTY_DATA_CURSOR
    );
  }

  static fromQueryRunner<T>(
    entityType: Constructor<T>,
    queryRunner: QueryRunner
  ): DataEntitySource<T> {
    return new DataEntitySource(
      entityType,
      () => queryRunner,
      EMPTY_DATA_CURSOR
    );
  }
  constructor(
    public entityType: Constructor<T>,
    public getQueryRunner: () => QueryRunner,
    public cursor: DataCursor
  ) {
    super();
  }

  withCursor<U = T>(cursor: DataCursor): DataEntitySource<U> {
    return new DataEntitySource<U>(
      <any>this.entityType,
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

  @Lazy() get entityQuery() {
    return DataEntityCursor.buildQuery(this.entityCursor);
  }

  getDataQueryRunner(): DataQueryRunner {
    return new DataQueryRunner(this.entityCursor.queryRunner);
  }

  @Lazy() get entityLoader(): DataEntityLoader {
    return new DataEntityLoader(
      this.getQueryRunner().connection,
      this.getDataQueryRunner(),
      this.entityCursor.typeInfo,
      this.cursor.selection,
      this,
      this.entityQuery,
      this.entityQuery.alias
    ).loadCursor(this.cursor);
  }

  getRows(): Promise<DataRow<T>[]> {
    return this.entityLoader.loadManyRows();
  }

  getCountRows(): Promise<number> {
    return this.getDataQueryRunner().getCountRows(this.entityQuery);
  }

  hasRows(): Promise<boolean> {
    return this.getDataQueryRunner().hasRows(this.entityQuery);
  }

  createEntitySource(entityType): DataSource<any> {
    return new DataEntitySource(
      entityType,
      this.getQueryRunner,
      EMPTY_DATA_CURSOR
    );
  }

  async insertKeys<T>(
    this: DataEntitySource<T>,
    values: DataInsertRow<T>[]
  ): Promise<string[]> {
    const keys: string[] = [];
    for (const value of values) {
      const plan = getInsertPlan(this, value);
      const entityKey = await plan.insert();
      keys.push(entityKey.text);
    }
    return keys;
  }

  async handleUpdate(keys: string[], value: DataUpdateRow<T>): Promise<number> {
    if (!hasKeys(value)) return 0;
    const plan = getUpdatePlan(this, value);
    await plan.updateMany(keys);
    return 0;
  }

  protected async handleUpdateRelations(
    keysToAdd: string[],
    keysToRemove: string[]
  ): Promise<void> {
    const update = async (
      entityTextKey: string,
      method: "removeOrUnset" | "addOrSet"
    ) => {
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
    };

    for (let key of keysToAdd) {
      await update(key, "addOrSet");
    }
    for (let key of keysToRemove) {
      await update(key, "removeOrUnset");
    }
  }

  async handleDelete(textKeys: string[]): Promise<void> {
    const plan = getDeletePlan(this);
    await plan.deleteMany(textKeys);
  }

  protected handleGetTree(
    inverse: boolean,
    relationPropertyName: string
  ): Promise<DataTreeRow<T>[]> {
    return new DataEntityTreeLoader(
      this.entityLoader,
      relationPropertyName
    ).loadTreeRows({ inverse });
  }
  // getTreeLoaction()
  // getTree
}
