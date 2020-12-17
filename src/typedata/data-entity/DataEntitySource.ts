import { Connection, getConnection } from "typeorm";
import { entries } from "@dabsi/common/object/entries";
import { hasKeys } from "@dabsi/common/object/hasKeys";
import { Lazy } from "@dabsi/common/patterns/lazy";
import { Type } from "@dabsi/common/typings2/Type";
import { EntityRelation } from "@dabsi/typeorm/relations";
import { DataQueryBuilder } from "@dabsi/typedata/data-query/DataQueryBuilder";
import { DataCursor, EmptyDataCursor } from "@dabsi/typedata/DataCursor";
import { DataKey } from "@dabsi/typedata/DataKey";
import { DataRow } from "@dabsi/typedata/DataRow";
import { DataSource, GetDataSource } from "@dabsi/typedata/DataSource";
import { DataSourceRow } from "@dabsi/typedata/DataSourceRow";
import { DataInsert, DataUpdate } from "@dabsi/typedata/DataValue";
import { DataEntityCursor } from "@dabsi/typedata/data-entity/DataEntityCursor";
import { DataEntityKey } from "@dabsi/typedata/data-entity/DataEntityKey";
import { DataEntityLoader } from "@dabsi/typedata/data-entity/DataEntityLoader";
import { DataEntityQueryRunner } from "@dabsi/typedata/data-entity/DataEntityQueryRunner";

export type DataEntitySourceOptions<T> = {
  connection?: (() => Connection) | string | Connection;
};

export class DataEntitySource<T> extends DataSource<T> {
  static getConnection: undefined | (() => Connection);

  static createFactory(getConnection): GetDataSource {
    return type => this.create(type, getConnection);
  }

  static create<T>(
    entityType: Type<T>,
    connection?: (() => Connection) | string | Connection
  ): DataEntitySource<T>;

  static create(entityType, connection?) {
    return new DataEntitySource(entityType, { connection }, EmptyDataCursor);
  }

  constructor(
    public entityType: Type<T>,
    public options: DataEntitySourceOptions<any> = {},
    public cursor: DataCursor
  ) {
    super();
  }

  withCursor<U = T>(cursor: DataCursor): DataEntitySource<U> {
    return new DataEntitySource<U>(this.entityType, <any>this.options, cursor);
  }

  createQueryBuilder(): DataQueryBuilder {
    return DataEntityCursor.createQueryBuilder(this.entityCursor);
  }

  createRunner(): DataEntityQueryRunner {
    return new DataEntityQueryRunner(
      this.entityCursor.connection,
      this.createQueryBuilder().query
    );
  }

  createEntityLoader() {
    const loader = DataEntityLoader.createFromCursor(this.entityCursor, this);
    DataEntityLoader.buildCursor(loader, this.cursor);
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

  protected _createEntity(valueMap, isInsert: boolean) {
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
      if (relation.propertyName in valueMap) {
        throw new Error(`Can't override relation ${relation.propertyName}.`);
      }
      // build relation on insert.
      isInsert && buildRelation(relation, key);
    }

    for (const column of this.entityCursor.columnKeys) {
      if (column.metadata.propertyName in valueMap) {
        throw new Error(
          `Can't override field ${column.metadata.propertyName}.`
        );
      }
      if (isInsert) row[column.metadata.propertyName] = column.key;
    }

    for (const [propertyName, value] of entries(valueMap)) {
      const relation = this.entityCursor.entityInfo.propertyNameToRelation[
        propertyName
      ];
      if (relation) {
        const key = DataEntityKey.parse(relation.right.entityMetadata, value);
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

  async insertKeys<T>(
    this: DataEntitySource<T>,
    values: DataInsert<T>[]
  ): Promise<string[]> {
    const entityMetadata = this.entityCursor.repository.metadata;
    const keys: string[] = [];
    for (const value of values) {
      const { row, relationKeys } = this._createEntity(value, true);
      const entity = await this.entityCursor.repository.save(
        this.entityCursor.repository.create(<any>row)
      );
      const entityKey = DataEntityKey.pick(entityMetadata, entity);
      for (let { relation, key } of relationKeys) {
        await relation.update("addOrSet", entityKey, key);
      }
      keys.push(DataEntityKey.stringify(entityMetadata, entityKey));
    }
    return keys;
  }

  async updateKeys(keys: string[], value: DataUpdate<T>): Promise<number> {
    if (!hasKeys(value)) return 0;
    let affectedRows = 0;
    const { row, relationKeys } = this._createEntity(value, false);
    const entityMetadata = this.entityCursor.repository.metadata;
    for (const key of keys) {
      const entityKey = DataEntityKey.parse(entityMetadata, DataKey(key));
      const result = await this.entityCursor.repository.update(entityKey, row);
      for (const { relation, key } of relationKeys) {
        if (key == null) {
          await relation.update("removeOrUnset", entityKey, key);
        } else {
          await relation.update("addOrSet", entityKey, key);
        }
      }
      if (typeof result.affected == "number") {
        affectedRows += result.affected;
      } else {
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
    const entityKey = DataEntityKey.parse(
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
        <any>DataEntityKey.parse(repository.metadata, key)
      );
    }
  }

  @Lazy() get entityCursor(): DataEntityCursor {
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

    return DataEntityCursor.create(connection, this.cursor, this.entityType);
  }
}
