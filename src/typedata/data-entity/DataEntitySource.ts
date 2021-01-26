import { hasKeys } from "@dabsi/common/object/hasKeys";
import Lazy from "@dabsi/common/patterns/lazy";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { Type } from "@dabsi/common/typings2/Type";
import { DataEntityCursor } from "@dabsi/typedata/data-entity/DataEntityCursor";
import { DataEntityKey } from "@dabsi/typedata/data-entity/DataEntityKey";
import { DataEntityLoader } from "@dabsi/typedata/data-entity/DataEntityLoader";
import DataEntityQueryRunner from "@dabsi/typedata/data-entity/DataEntityQueryRunner";
import getDataConnection from "@dabsi/typedata/data-entity/getDataConnection";
import getDeletePlan from "@dabsi/typedata/data-entity/getDeletePlan";
import getInsertPlan from "@dabsi/typedata/data-entity/getInsertPlan";
import getUpdatePlan from "@dabsi/typedata/data-entity/getUpdatePlan";
import { DataQueryBuilder } from "@dabsi/typedata/data-query/DataQueryBuilder";
import {
  AnyDataSelection,
  DataSelection,
} from "@dabsi/typedata/data-selection/DataSelection";
import { DataCursor, EmptyDataCursor } from "@dabsi/typedata/DataCursor";
import { DataRow } from "@dabsi/typedata/DataRow";
import { DataSource } from "@dabsi/typedata/DataSource";
import { DataInsert, DataUpdate } from "@dabsi/typedata/DataValue";
import { DataEntityRelation } from "@dabsi/typeorm/relations/DataEntityRelation";
import { Connection, EntityManager, QueryRunner } from "typeorm";
import { RelationMetadata } from "typeorm/metadata/RelationMetadata";
import {
  DataChangeReason,
  DataEntityListener,
  DataRelationChange,
} from "./DataEntityListener";

type GetConnection = () => Connection;
type GetQueryRunner = () => QueryRunner;

export class DataEntitySource<T>
  extends DataSource<T>
  implements DataEntityListener {
  static getConnection: undefined | (() => Connection);

  static createFromConnection<T>(
    entityType: Type<T>,
    connection?: GetConnection
  ): DataEntitySource<T> {
    return new DataEntitySource(
      entityType,
      () => (connection || getDataConnection)().createQueryRunner(),
      EmptyDataCursor
    );
  }

  constructor(
    public entityType: Type<T>,
    public getQueryRunner: GetQueryRunner,
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

  emitRelationChange?(change: DataRelationChange): Awaitable;

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

  hasRelationListener(relationMetadata: RelationMetadata): boolean {
    return false;
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
    const isRmoeveOrUnset = method === "removeOrUnset";

    const emit = async (
      relationKey: string,
      { invert, relationMetadata }: DataEntityRelation
    ) => {
      const oldRelationKey = isRmoeveOrUnset ? relationKey : null;
      const newRelationKey = !isRmoeveOrUnset ? relationKey : null;
      const emit = async (invert, relationMetadata) => {
        if (invert) {
          oldRelationKey &&
            (await this.emitRelationChange?.({
              relationMetadata,
              reason: DataChangeReason.UPDATE,
              oldRelationKey: entityTextKey,
              newRelationKey: null,
              entityKey: oldRelationKey,
            }));

          newRelationKey &&
            (await this.emitRelationChange?.({
              relationMetadata,
              reason: DataChangeReason.UPDATE,
              oldRelationKey: null,
              newRelationKey: entityTextKey,
              entityKey: newRelationKey,
            }));
        } else {
          await this.emitRelationChange?.({
            relationMetadata,
            reason: DataChangeReason.UPDATE,
            oldRelationKey,
            newRelationKey,
            entityKey: entityTextKey,
          });
        }
      };
      await emit(invert, relationMetadata);
      relationMetadata.inverseRelation &&
        (await emit(!invert, relationMetadata.inverseRelation));
    };

    const entityKey = DataEntityKey.parse(
      this.entityCursor.entityMetadata,
      entityTextKey
    );

    if (this.entityCursor.parent) {
      const { relation, relationKey } = this.entityCursor.parent;
      await relation.update(method, entityKey.object, relationKey.object!);
      await emit(relationKey.text, relation);
    }

    for (const { relation, key: relationKey } of this.entityCursor
      .relationKeys) {
      await relation.update(method, entityKey.object, relationKey.object);
      await emit(relationKey.text, relation);
    }
  }

  deleteKeys(textKeys: string[]): Promise<void> {
    return this.withTransaction(async () => {
      const plan = getDeletePlan(this);
      await plan.deleteMany(textKeys);
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
      relation: DataEntityRelation;
      relationKey: DataEntityKey;
    })
  | (T & {
      type: "unset";
      isRelation: false;
    })
  | (T & {
      type: "unset";
      isRelation: true;
      relation: DataEntityRelation;
    });

export type DataEntityRelationEvent = {
  type: "addOrSet" | "removeOrUnset";
  entityKey: DataEntityKey;
  relation: DataEntityRelation;
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
      relation: DataEntityRelation;
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
