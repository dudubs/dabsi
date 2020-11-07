import { Connection, getConnection } from "typeorm";
import { Timeout } from "../../common/async/Timeout";
import { entries } from "../../common/object/entries";
import { hasKeys } from "../../common/object/hasKeys";
import { Lazy } from "../../common/patterns/lazy";
import { Type } from "../../common/typings";
import { EntityRelation } from "../../typeorm/relations";
import { DataQueryBuilder } from "../data-query/DataQueryBuilder";
import { DataCursor, EmptyDataCursor } from "../DataCursor";
import { DataKey } from "../DataKey";
import { DataRow } from "../DataRow";
import { DataSourceRow } from "../DataSourceRow";
import { DataValues } from "../DataValues";
import { DataSource, GetDataSource } from "../DataSource";
import { EntityDataCursor } from "./EntityDataCursor";
import { EntityDataKey } from "./EntityDataKey";
import { EntityDataQueryRunner } from "./EntityDataQueryRunner";
import { EntityDataLoader } from "./EntityDataLoader";

export type EntityDataSourceOptions<T> = {
  connection?: (() => Connection) | string | Connection;
};

export class EntityDataSource<T> extends DataSource<T> {
  static getConnection: undefined | (() => Connection);

  static createFactory(getConnection): GetDataSource {
    return type => this.create(type, getConnection);
  }

  static create<T>(
    entityType: Type<T>,
    connection?: (() => Connection) | string | Connection
  ): EntityDataSource<T>;

  static create(entityType, connection?) {
    return new EntityDataSource(entityType, { connection }, EmptyDataCursor);
  }

  constructor(
    public mainEntityType: Type<T>,
    public options: EntityDataSourceOptions<any> = {},
    public cursor: DataCursor
  ) {
    super();
  }

  withCursor<U = T>(cursor: DataCursor): EntityDataSource<U> {
    return new EntityDataSource<U>(
      this.mainEntityType,
      <any>this.options,
      cursor
    );
  }

  createQueryBuilder(): DataQueryBuilder {
    return EntityDataCursor.createQueryBuilder(this.entityCursor);
  }

  createRunner(): EntityDataQueryRunner {
    return new EntityDataQueryRunner(
      this.entityCursor.connection,
      this.createQueryBuilder().query
    );
  }

  createEntityLoader() {
    const loader = EntityDataLoader.createFromCursor(
      this.entityCursor,
      new DataSourceRow(this)
    );

    EntityDataLoader.buildCursor(loader, this.cursor);

    return loader;
  }

  getRows(): Promise<DataRow<T>[]> {
    return this.createEntityLoader().loadRows();
  }

  getCount(): Promise<number> {
    return this.createRunner().getCount();
  }

  hasRow(): Promise<boolean> {
    return this.createRunner().hasRow();
  }

  protected _createEntityValues(values, isInsert: boolean) {
    const row = {};
    const relationKeys: {
      relation: EntityRelation;
      key: object;
    }[] = [];

    // build relation to parent on on insert.
    if (isInsert) {
      const { parent } = this.entityCursor;
      parent && buildRelation(parent.relation, parent.relationKey);
    }

    // check relations in value, throw error if had relation value that
    //  override relation key.
    for (const { relation, key } of this.entityCursor.relationKeys) {
      if (relation.propertyName in values) {
        throw new Error(`Can't override relation ${relation.propertyName}.`);
      }
      // build relation on insert.
      isInsert && buildRelation(relation, key);
    }

    for (const column of this.entityCursor.columnKeys) {
      if (column.metadata.propertyName in values) {
        throw new Error(
          `Can't override field ${column.metadata.propertyName}.`
        );
      }
      if (isInsert) row[column.metadata.propertyName] = column.key;
    }

    for (const [propertyName, value] of entries(values)) {
      const relation = this.entityCursor.entityInfo.propertyNameToRelation[
        propertyName
      ];
      if (relation) {
        const key = EntityDataKey.parse(relation.right.entityMetadata, value);
        buildRelation(relation, key);
        continue;
      }
      const column = this.entityCursor.entityInfo.propertyNameToColumnMetadata[
        propertyName
      ];
      if (column) {
        row[propertyName] = value;
        continue;
      }
      throw new Error(`Invalid property ${propertyName}`);
    }

    return { row, relationKeys };

    function buildRelation(relation: EntityRelation, key: object) {
      if (isInsert && key == null)
        // dont build relation on insert when the key is null.
        return;

      if (relation.left.isOwning && relation.isJoinColumn) {
        row[relation.propertyName] = key;
        return;
      }
      relationKeys.push({ relation, key });
    }
  }

  async insertKey(values: DataValues<T>): Promise<string> {
    const entityMetadata = this.entityCursor.repository.metadata;
    const { row, relationKeys } = this._createEntityValues(values, true);
    const entity = await this.entityCursor.repository.save(
      this.entityCursor.repository.create(<any>row)
    );
    const entityKey = EntityDataKey.pick(entityMetadata, entity);
    for (let { relation, key } of relationKeys) {
      await relation.update("addOrSet", entityKey, key);
    }
    return EntityDataKey.stringify(entityMetadata, entityKey);
  }

  async updateKeys(keys: string[], values: DataValues<T>): Promise<number> {
    if (!hasKeys(values)) return 0;
    let affectedRows = 0;
    const { row, relationKeys } = this._createEntityValues(values, false);
    const entityMetadata = this.entityCursor.repository.metadata;
    for (const key of keys) {
      const entityKey = EntityDataKey.parse(entityMetadata, DataKey(key));
      const result = await this.entityCursor.repository.update(entityKey, row);
      for (const { relation, key } of relationKeys) {
        if (key == null) {
          await relation.update("removeOrUnset", entityKey, key);
        } else {
          await relation.update("addOrSet", entityKey, key);
        }
      }
      if (result.affected) {
        affectedRows++;
      }
    }
    return affectedRows;
  }

  async addKeys(keys: string[]): Promise<void> {
    for (let key of keys) {
      await this._addOrRemove(key, false);
    }
  }

  protected async _addOrRemove(key: string, toRemove: boolean) {
    const method = toRemove
      ? ("removeOrUnset" as const)
      : ("addOrSet" as const);
    const entityKey = EntityDataKey.parse(
      this.entityCursor.repository.metadata,
      key
    );

    if (this.entityCursor.parent) {
      await this.entityCursor.parent.relation.update(
        method,
        entityKey,
        this.entityCursor.parent.relationKey!
      );
    }

    for (const { relation, key } of this.entityCursor.relationKeys) {
      await relation.update(method, entityKey, key);
    }
  }

  async removeKeys(keys: string[]): Promise<void> {
    for (let key of keys) {
      await this._addOrRemove(key, true);
    }
  }

  async deleteKeys(keys: string[]): Promise<void> {
    const { repository } = this.entityCursor;
    for (let key of keys) {
      await repository.delete(
        <any>EntityDataKey.parse(repository.metadata, key)
      );
    }
  }

  @Lazy() get entityCursor(): EntityDataCursor {
    let connection: Connection;
    switch (typeof this.options.connection) {
      case "object":
        connection = this.options.connection;
        break;
      case "string":
        connection = getConnection(this.options.connection);
        break;
      case "function":
        connection = this.options.connection();
        break;
      case "undefined":
        connection = getConnection();
        break;
      default:
        throw new Error();
    }

    return EntityDataCursor.create(
      connection,
      this.cursor,
      this.mainEntityType
    );
  }
}
