import { hasKeys } from "@dabsi/common/object/hasKeys";
import Lazy from "@dabsi/common/patterns/Lazy";
import { Constructor } from "@dabsi/common/typings2/Constructor";
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
import { DataTreeRow } from "@dabsi/typedata/row";
import { DataSelection } from "@dabsi/typedata/selection/selection";
import { DataSource } from "@dabsi/typedata/source";
import { DataUpdateRow } from "@dabsi/typedata/value";
import { Connection, QueryRunner } from "typeorm";

export class DataEntitySource<T> extends DataSource<T> {
  static createFromConnection<T>(
    entityType: Constructor<T>,
    connection?: () => Connection
  ): DataSource<T> {
    return <any>(
      new DataEntitySource(
        entityType,
        () => (connection || getDataContext)().createQueryRunner(),
        EMPTY_DATA_CURSOR
      )
    );
  }

  static create<T>(
    entityType: Constructor<T>,
    queryRunner: QueryRunner | (() => QueryRunner)
  ): DataSource<T> {
    return <any>(
      new DataEntitySource(
        entityType,
        typeof queryRunner === "function" ? queryRunner : () => queryRunner,
        EMPTY_DATA_CURSOR
      )
    );
  }
  constructor(
    public entityType: Constructor<T>,
    public getQueryRunner: () => QueryRunner,
    public cursor: DataCursor
  ) {
    super();
  }

  withCursor(cursor: DataCursor): DataSource<any> {
    return new DataEntitySource<any>(
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
    // TODO later: DataCursor.assert
    DataSelection.assert(this.cursor.selection);

    return new DataEntityLoader(
      this.getQueryRunner().connection,
      this.getDataQueryRunner(),
      this.entityCursor.typeInfo,
      this.cursor.selection,
      null,
      this.entityQuery,
      this.entityQuery.alias
    ).setQueryCursor(this.cursor);
  }

  protected handleFetch(source: DataSource<any>) {
    return this.entityLoader.loadManyRows(source);
  }

  count(): Promise<number> {
    return this.getDataQueryRunner().count(this.entityQuery);
  }

  has(): Promise<boolean> {
    return this.getDataQueryRunner().has(this.entityQuery);
  }

  async handleInsert(rows: any[]): Promise<string[]> {
    const keys: string[] = [];
    for (const row of rows) {
      const plan = getInsertPlan(this, row);
      const entityKey = await plan.insert();
      keys.push(entityKey.text);
    }
    return keys;
  }

  async handleUpdate<T>(
    this: DataEntitySource<T>,
    keys: string[],
    value: DataUpdateRow<T>
  ): Promise<number> {
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

  // TODO:rename to handleFetchTree
  protected handleFetchTree(
    source: DataSource<any>,
    inverse: boolean,
    relationPropertyName: string
  ): Promise<DataTreeRow<{}>[]> {
    return new DataEntityTreeLoader(
      this.entityLoader,
      relationPropertyName
    ).loadTreeRows(source, { inverse });
  }
  // getTreeLoaction()
  // getTree
}
