import { entries } from "@dabsi/common/object/entries";
import { hasKeys } from "@dabsi/common/object/hasKeys";
import { Lazy } from "@dabsi/common/patterns/lazy";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { Type } from "@dabsi/common/typings2/Type";
import { DataEntityCursor } from "@dabsi/typedata/data-entity/DataEntityCursor";
import { DataEntityKey } from "@dabsi/typedata/data-entity/DataEntityKey";
import { DataEntityLoader } from "@dabsi/typedata/data-entity/DataEntityLoader";
import DataEntityQueryRunner from "@dabsi/typedata/data-entity/DataEntityQueryRunner";
import { DataQueryBuilder } from "@dabsi/typedata/data-query/DataQueryBuilder";
import { DataCursor, EmptyDataCursor } from "@dabsi/typedata/DataCursor";
import { DataKey } from "@dabsi/typedata/DataKey";
import { DataRow } from "@dabsi/typedata/DataRow";
import { DataSource, GetDataSource } from "@dabsi/typedata/DataSource";
import { DataInsert, DataUpdate } from "@dabsi/typedata/DataValue";
import { EntityRelation } from "@dabsi/typeorm/relations/EntityRelation";
import { Connection, EntityManager, getConnection, QueryRunner } from "typeorm";
import {
  AnyDataSelection,
  DataSelection,
} from "./../data-selection/DataSelection";

type GetConnection = () => Connection;
type GetQueryRunner = () => QueryRunner;

/*
 getEntityManager();

 starttransaction()

*/

export class DataEntitySource<T> extends DataSource<T> {
  static getConnection: undefined | (() => Connection);

  static createFromConnection<T>(
    entityType: Type<T>,
    connection?: GetConnection
  ): DataEntitySource<T> {
    return new DataEntitySource(
      entityType,
      () => (connection || getConnection)().createQueryRunner(),
      EmptyDataCursor
    );
  }

  constructor(
    public entityType: Type<T>,
    protected getQueryRunner: GetQueryRunner,
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

  createQueryBuilder(): DataQueryBuilder {
    return DataEntityCursor.createQueryBuilder(this.entityCursor);
  }

  createRunner(): DataEntityQueryRunner {
    return new DataEntityQueryRunner(
      this.createQueryBuilder().query,
      this.entityCursor.queryRunner
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

  protected _createEntityRow(
    valueMap: Record<string, any>,
    isInsert: boolean,
    emit?: (event: RowChange) => void
  ) {
    const row = {};
    const relationKeys: {
      relation: EntityRelation;
      key: DataEntityKey;
    }[] = [];

    // on insert it's take build  relation to parent-cursor
    if (isInsert) {
      const { parent } = this.entityCursor;
      parent && buildRelation(parent.relation, parent.relationKey);
    }

    // checking if cursor-relations-keys is override by cursor
    for (const { relation, key: relationKey } of this.entityCursor
      .relationKeys) {
      if (relation.propertyName in valueMap) {
        throw new Error(`Can't override relation ${relation.propertyName}.`);
      }
      // build relation on insert.
      isInsert && buildRelation(relation, relationKey);
    }

    for (const {
      metadata: { propertyName },
      key,
    } of this.entityCursor.columnKeys) {
      if (propertyName in valueMap) {
        throw new Error(`Can't override field ${propertyName}.`);
      }
      if (isInsert) {
        row[propertyName] = key;
        emit?.({
          type: "value",
          propertyName,
          value: key,
        });
      }
    }

    for (let [propertyName, value] of entries(valueMap)) {
      const relation = this.entityCursor.entityInfo.propertyNameToRelation[
        propertyName
      ];
      if (value === undefined) {
        // skip on property if is undefined - no if is null.
        continue;
      }
      if (relation) {
        if (value && typeof value === "object") {
          if (typeof value.$key === "string") {
            value = value.$key;
          }
        }

        const key = DataEntityKey.parse(relation.right.entityMetadata, value);
        buildRelation(relation, key);
        continue;
      }
      const column = this.entityCursor.entityInfo.propertyNameToColumnMetadata[
        propertyName
      ];
      if (column) {
        row[propertyName] = value;
        emit?.({ type: "value", propertyName, value });
        continue;
      }
      throw new Error(`Invalid property ${propertyName}`);
    }

    return { row, relationKeys };

    function buildRelation(
      relation: EntityRelation,

      key: DataEntityKey
      // key: DataEntityKey
    ) {
      if (isInsert) {
        if (!key.object) {
          // dont build relation on insert when the key is null.
          return;
        }
      }
      if (key.object) {
        emit?.({
          type: "set",
          propertyName: relation.propertyName,
          relation,
          key,
        });
      } else {
        emit?.({
          type: "unset",
          propertyName: relation.propertyName,
          relation,
        });
      }
      if (relation.left.isOwning && relation.isJoinColumn) {
        row[relation.propertyName] = key.object;
        return;
      }
      relationKeys.push({ relation, key });
    }
  }

  async insertKeys<T>(
    this: DataEntitySource<T>,
    values: DataInsert<T>[]
  ): Promise<string[]> {
    const entityMetadata = this.entityCursor.entityMetadata;
    const keys: string[] = [];

    for (const value of values) {
      const changeMap: RowChangeMap = {};
      const { row, relationKeys } = this._createEntityRow(
        value,
        true,
        change => {
          changeMap[change.propertyName] = change;
        }
      );
      const entity = await this.entityCursor.entityManager.save(
        this.entityCursor.entityManager.create(
          this.entityCursor.typeInfo.type,
          <any>row
        )
      );
      const entityObjectKey = DataEntityKey.pick(entityMetadata, entity);
      const entityKey: DataEntityKey = {
        object: entityObjectKey,
        text: DataEntityKey.stringify(entityMetadata, entityObjectKey),
      };

      for (const { relation, key } of relationKeys) {
        await relation.update("set", entityObjectKey, key.object);
      }

      keys.push(entityKey.text);

      await this.emit?.({
        type: "insert",
        entityKey,
        changeMap,
      });
    }
    return keys;
  }

  async updateKeys(keys: string[], value: DataUpdate<T>): Promise<number> {
    if (!hasKeys(value)) return 0;
    let affectedRows = 0;
    const entityMetadata = this.entityCursor.entityMetadata;
    const changeMap: RowChangeMap = {};

    const { row, relationKeys } = await this._createEntityRow(
      value,
      false,
      change => {
        changeMap[change.propertyName] = change;
      }
    );
    let source: DataSource<any> | null = null;

    const { loader, getEntityMap } = createEventLoader(this);
    await this.emit?.({
      type: "beforeUpdateAll",
      changeMap,
      ...loader,
    });

    const entityMap = await getEntityMap();
    for (const entityTextKey of keys) {
      const entity = entityMap[entityTextKey] || {};
      const entityKey = DataEntityKey.parse(
        entityMetadata,
        DataKey(entityTextKey)
      );

      await this.emit?.({
        type: "beforeUpdateOne",
        changeMap,
        entity,
        entityKey,
        row,
      });

      // beforeUpdateOne

      const result = await this.entityCursor.entityManager.update(
        this.entityCursor.typeInfo.type,
        entityKey.object,
        row
      );
      for (const { relation, key: relationKey } of relationKeys) {
        if (relationKey.object == null) {
          await relation.update("unset", entityKey.object, relationKey.object);
        } else {
          await relation.update("set", entityKey.object, relationKey.object);
        }
      }

      if (typeof result.affected == "number") {
        affectedRows += result.affected;
      } else {
        affectedRows++;
      }
      // afterUpdateOne
      await this.emit?.({
        type: "afterUpdateOne",
        changeMap,
        entityKey,
        entity,
      });
    }
    await this.emit?.({
      type: "afterUpdateAll",
      changeMap,
      entityMap,
    });
    return affectedRows;
  }

  protected getEmitter?(): undefined | ((event: DataEntityEvent) => Awaitable);
  @Lazy() protected get emit():
    | undefined
    | ((event: DataEntityEvent) => Awaitable) {
    return this.getEmitter?.();
  }

  protected async updateRelationKeys(
    keysToAdd: string[],
    keysToRemove: string[]
  ): Promise<void> {
    for (let key of keysToAdd) {
      await this._updateRelationKeys(key, "addOrSet");
    }
    for (let key of keysToRemove) {
      await this._updateRelationKeys(key, "removeOrUnset");
    }
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
      await this.entityCursor.parent.relation.update(
        method,
        entityKey.object,
        this.entityCursor.parent.relationKey.object!
      );
    }

    for (const { relation, key } of this.entityCursor.relationKeys) {
      const action = await relation.update(
        method,
        entityKey.object,
        key.object
      );

      await this.emit?.({
        type: "relation",
        entityKey,
        relation,
        action: {
          type: action,
          key,
        },
      });
    }
  }

  async deleteKeys(keys: string[]): Promise<void> {
    const { loader, getEntityMap } = createEventLoader(this);

    await this.emit?.({
      type: "beforeDeleteAll",
      ...loader,
    });

    const entityMap = await getEntityMap();

    for (const entityTextKey of keys) {
      const entityKey = DataEntityKey.parse(
        this.entityCursor.entityMetadata,
        entityTextKey
      );
      await this.emit?.({
        type: "beforeDeleteOne",
        entity: entityMap[entityTextKey],
        entityKey,
      });
      await this.entityCursor.entityManager.delete(
        this.entityCursor.typeInfo.type,
        entityKey.object
      );
      await this.emit?.({
        type: "afterDeleteOne",
        entity: entityMap[entityTextKey],
        entityKey,
      });
    }

    await this.emit?.({
      type: "afterDeleteAll",
      entityMap,
    });

    // delete.init delete.clean beforeDeleteOne afterDeleteOne
  }

  @Lazy() get entityCursor(): DataEntityCursor {
    return DataEntityCursor.create(
      this.getQueryRunner(),
      this.cursor,
      this.entityType
    );
  }
}

type RowChange<T = { propertyName: string }> =
  | (T & {
      type: "value";
      value: any;
    })
  | (T & {
      type: "set";
      relation: EntityRelation;
      key: DataEntityKey;
    })
  | (T & { type: "unset"; relation: EntityRelation });

type RowChangeMap = Record<string, RowChange | undefined>;

function createEventLoader(source: DataSource<any>) {
  let selection: AnyDataSelection | undefined = undefined;
  return {
    loader: {
      select({ pick = [], fields = {} }: AnyDataSelection) {
        selection = DataSelection.merge(selection, {
          pick: [...(selection?.pick || []), ...pick],
          fields: { ...selection?.fields, ...fields },
        });
      },
    },
    async getEntityMap() {
      if (selection) {
        return source
          .withCursor({
            ...source.cursor,
            selection,
          })
          .getRowMap();
      }
      return {};
    },
  };
}

export type DataEntityEventType = DataEntityEvent["type"];
export type DataEntityEvent<
  T = {},
  WithEntity = {
    entity: Record<string, any> | undefined;
  },
  WithEntityKey = {
    entityKey: DataEntityKey;
  },
  WithChangeMap = { changeMap: RowChangeMap },
  WithLoader = {
    select(selection: AnyDataSelection): void;
  },
  WithEntityMap = { entityMap: Record<string, any> },
  UpdateEvents =
    | (T &
        WithLoader &
        WithChangeMap & {
          type: "beforeUpdateAll";
        })
    | (T &
        WithEntity &
        WithEntityKey &
        WithChangeMap & {
          type: "beforeUpdateOne";
          row: Record<string, any>;
        })
    | (WithChangeMap &
        WithEntityMap & {
          type: "afterUpdateAll";
        })
    | (T &
        WithEntity &
        WithEntityKey &
        WithChangeMap & {
          type: "afterUpdateOne";
        }),
  DeleteEvents =
    | (T &
        WithLoader & {
          type: "beforeDeleteAll";
        })
    | (T &
        WithEntityMap & {
          type: "afterDeleteAll";
        })
    | (T &
        WithEntity &
        WithEntityKey & {
          type: "beforeDeleteOne";
        })
    | (T &
        WithEntity &
        WithEntityKey & {
          type: "afterDeleteOne";
        })
> =
  | (T &
      WithEntityKey &
      WithChangeMap & {
        type: "insert";
      })
  | UpdateEvents
  | DeleteEvents
  | (T &
      WithEntityKey & {
        type: "relation";
        relation: EntityRelation;
        action:
          | {
              type: "add" | "remove" | "set";
              key: DataEntityKey;
            }
          | { type: "unset" };
      });
