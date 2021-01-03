import { entries } from "@dabsi/common/object/entries";
import { hasKeys } from "@dabsi/common/object/hasKeys";
import Lazy from "@dabsi/common/patterns/lazy";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { Type } from "@dabsi/common/typings2/Type";
import { DataEntityCursor } from "@dabsi/typedata/data-entity/DataEntityCursor";
import { DataEntityKey } from "@dabsi/typedata/data-entity/DataEntityKey";
import { DataEntityLoader } from "@dabsi/typedata/data-entity/DataEntityLoader";
import DataEntityQueryRunner from "@dabsi/typedata/data-entity/DataEntityQueryRunner";
import { DataQueryBuilder } from "@dabsi/typedata/data-query/DataQueryBuilder";
import {
  AnyDataSelection,
  DataSelection,
} from "@dabsi/typedata/data-selection/DataSelection";
import { DataCursor, EmptyDataCursor } from "@dabsi/typedata/DataCursor";
import { DataKey } from "@dabsi/typedata/DataKey";
import { DataRow } from "@dabsi/typedata/DataRow";
import { DataSource } from "@dabsi/typedata/DataSource";
import { DataInsert, DataUpdate } from "@dabsi/typedata/DataValue";
import { EntityRelation } from "@dabsi/typeorm/relations/EntityRelation";
import { Connection, EntityManager, getConnection, QueryRunner } from "typeorm";

type GetConnection = () => Connection;
type GetQueryRunner = () => QueryRunner;

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
    changeMap: DataEntityChangeMap
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
          type: "set",
          isRelation: false,
          propertyName,
          value: key,
        });
      }
    }

    for (let [propertyName, value] of entries(valueMap)) {
      if (isInsert && value == null) continue;
      const relation = this.entityCursor.entityInfo.propertyNameToRelation[
        propertyName
      ];
      if (value === undefined) {
        // skip on property if is undefined - no if is null.
        continue;
      }
      if (relation) {
        // TODO: by data-source.
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
        emit?.({
          type: isInsert ? "set" : value == null ? "unset" : "set",
          propertyName,
          isRelation: false,
          value,
        });
        continue;
      }
      throw new Error(`Invalid property ${propertyName}`);
    }

    return { row, relationKeys };

    function emit(change: DataEntityChange) {
      changeMap[change.propertyName] = change;
    }
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
          isRelation: true,
          relation,
          relationKey: key,
        });
      } else {
        emit?.({
          type: "unset",
          isRelation: true,
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

  @Lazy() get entityEmitter(): DataEntityEmitter | undefined {
    return this.getEntityEmitter?.(this.entityCursor.typeInfo.type);
  }
  protected getEntityEmitter?(
    entityType: Function
  ): DataEntityEmitter | undefined;

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
    valueMap: DataInsert<T>[]
  ): Promise<string[]> {
    return this.withTransaction(async () => {
      const entityMetadata = this.entityCursor.entityMetadata;
      const entityType = this.entityCursor.typeInfo.type;
      const keys: string[] = [];
      for (const value of valueMap) {
        const changeMap: Record<string, DataEntityInsertChange> = {};
        const { row, relationKeys } = this._createEntityRow(
          value,
          true,
          changeMap
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

        await this.entityEmitter?.({
          manager: this.entityCursor.entityManager,
          type: "insert",
          entityKey,
          entityType,
          changeMap,
        });
      }
      return keys;
    });
  }

  updateKeys(keys: string[], value: DataUpdate<T>): Promise<number> {
    return this.withTransaction(async () => {
      if (!hasKeys(value)) return 0;
      let affectedRows = 0;

      const {
        entityCursor: {
          typeInfo: { type: entityType },
          entityMetadata,
        },
      } = this;

      const changeMap: DataEntityChangeMap = {};

      const { row, relationKeys } = await this._createEntityRow(
        value,
        false,
        changeMap
      );

      const { loader, getEntityMap } = createEventLoader(this);

      await this.entityEmitter?.({
        manager: this.entityCursor.entityManager,
        type: "beforeUpdateAll",
        entityType,
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

        await this.entityEmitter?.({
          manager: this.entityCursor.entityManager,
          type: "beforeUpdateOne",
          entity,
          entityKey,
          entityType,
          changeMap,
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
            await relation.update(
              "unset",
              entityKey.object,
              relationKey.object
            );
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
        await this.entityEmitter?.({
          manager: this.entityCursor.entityManager,
          type: "afterUpdateOne",
          changeMap,
          entityKey,
          entity,
        });
      }
      await this.entityEmitter?.({
        manager: this.entityCursor.entityManager,
        type: "afterUpdateAll",
        changeMap,
        entityMap,
      });
      return affectedRows;
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

      const action = await relation.update(
        method,
        entityKey.object,
        relationKey.object!
      );
      await this.getEntityEmitter?.(relation.entityType)?.({
        manager: this.entityCursor.entityManager,
        type: "relation",
        method,
        action,
        relation,
        entityKey: relationKey,
        relationKey: entityKey,
      });
    }

    for (const { relation, key: relationKey } of this.entityCursor
      .relationKeys) {
      const action = await relation.update(
        method,
        entityKey.object,
        relationKey.object
      );

      await this.getEntityEmitter?.(relation.entityType)?.({
        manager: this.entityCursor.entityManager,
        type: "relation",
        method,
        action,
        relation,

        entityKey,
        relationKey,
      });
    }
  }

  deleteKeys(textKeys: string[]): Promise<void> {
    return this.withTransaction(async () => {
      const { loader, getEntityMap } = createEventLoader(this);

      await this.entityEmitter?.({
        manager: this.entityCursor.entityManager,
        type: "beforeDeleteAll",
        ...loader,
      });

      const entityMap = await getEntityMap();
      for (const entityTextKey of textKeys) {
        const entityKey = DataEntityKey.parse(
          this.entityCursor.entityMetadata,
          entityTextKey
        );
        await this.entityEmitter?.({
          manager: this.entityCursor.entityManager,
          type: "beforeDeleteOne",
          entity: entityMap[entityTextKey],
          entityKey,
        });
        await this.entityCursor.entityManager.delete(
          this.entityCursor.typeInfo.type,
          entityKey.object
        );
        await this.entityEmitter?.({
          manager: this.entityCursor.entityManager,
          type: "afterDeleteOne",
          entity: entityMap[entityTextKey],
          entityKey,
        });
      }
      await this.entityEmitter?.({
        manager: this.entityCursor.entityManager,
        type: "afterDeleteAll",
        entityMap,
      });
    });
  }

  @Lazy() get entityCursor(): DataEntityCursor {
    return DataEntityCursor.create(
      this.getQueryRunner(),
      this.cursor,
      this.entityType
    );
  }
}

export type DataEntityChange<
  T = {
    propertyName: string;
  }
> =
  | (T & {
      type: "set";
      isRelation: false;
      value: any;
    })
  | (T & {
      type: "set";
      isRelation: true;
      relation: EntityRelation;
      relationKey: DataEntityKey;
    })
  | (T & {
      type: "unset";
      isRelation: false;
    })
  | (T & {
      type: "unset";
      isRelation: true;
      relation: EntityRelation;
    });

export type DataEntityRelationEvent = {
  type: "addOrSet" | "removeOrUnset";
  entityKey: DataEntityKey;
  relation: EntityRelation;
  relationKey: DataEntityKey;
  action: "add" | "set" | "remove" | "unset";
};
export type DataEntityInsertChange = Extract<DataEntityChange, { type: "set" }>;
export type DataEntityEvent<
  WithEntityManager = {
    manager: EntityManager;
  },
  WithEntityType = {
    entityType: Function;
  },
  WithLoader = {
    select(selection: AnyDataSelection): void;
  },
  WithEntity = {
    entity: object | undefined;
  },
  WithEntityKey = {
    entityKey: DataEntityKey;
  },
  WithChangeMap = { changeMap: DataEntityChangeMap },
  WithEntityMap = { entityMap: Record<string, object | undefined> },
  UpdateEvents =
    | (WithEntityManager &
        WithEntityType &
        WithChangeMap &
        WithLoader & {
          type: "beforeUpdateAll";
        })
    | (WithEntityManager &
        WithEntityType &
        WithChangeMap &
        WithEntityKey &
        WithEntity & {
          type: "beforeUpdateOne";
          row: object;
        })
    | (WithEntityManager &
        WithChangeMap & //
        WithEntityKey &
        WithEntity & {
          //
          type: "afterUpdateOne";
        })
    | (WithEntityManager &
        WithChangeMap &
        WithEntityMap & {
          type: "afterUpdateAll";
        }),
  DeleteEvents =
    | (WithEntityManager & (WithLoader & { type: "beforeDeleteAll" }))
    | (WithEntityManager &
        WithEntity &
        WithEntityKey & { type: "beforeDeleteOne" })
    | (WithEntityManager &
        WithEntity &
        WithEntityKey & { type: "afterDeleteOne" })
    | (WithEntityManager & WithEntityMap & { type: "afterDeleteAll" }),
  RelationEvents = WithEntityManager &
    WithEntityKey & {
      type: "relation";
      method: "addOrSet" | "removeOrUnset";
      action: "add" | "set" | "unset" | "remove";
      relation: EntityRelation;
      relationKey: DataEntityKey;
    }
> =
  | (WithEntityManager &
      WithEntityType &
      WithEntityKey & {
        type: "insert";
        changeMap: Record<
          string,
          | undefined
          | Extract<
              DataEntityChange,
              {
                type: "set";
              }
            >
        >;
      })
  | UpdateEvents
  | DeleteEvents
  | RelationEvents;

export type DataEntityPropertyEvent = DataEntityChange & {
  entityType: Function;
  entityKey: DataEntityKey;
};
export type DataEntityChangeMap = Record<string, DataEntityChange | undefined>;

function createEventLoader(source: DataSource<any>) {
  let selection: AnyDataSelection | undefined = undefined;
  return {
    loader: {
      select({ pick = [], fields = {}, ...otherSelection }: AnyDataSelection) {
        selection = DataSelection.merge(selection, {
          pick: [...(selection?.pick || []), ...pick],
          fields: { ...selection?.fields, ...fields },
          ...otherSelection,
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

export type DataEntityEmitter = (event: DataEntityEvent) => Awaitable;
