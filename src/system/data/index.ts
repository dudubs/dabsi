import { touchMap } from "@dabsi/common/map/touchMap";
import { entries } from "@dabsi/common/object/entries";
import { Lazy } from "@dabsi/common/patterns/lazy";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { DbModule } from "@dabsi/modules/DbModule";
import { SystemModule } from "@dabsi/system/core";
import {
  default as DataSystemSource,
  default as SystemDataSource,
} from "@dabsi/system/data/DataSystemSource";
import { getDataEntityInfo } from "@dabsi/typedata/data-entity/DataEntityInfo";
import {
  DataEntityEmitter,
  DataEntityEvent,
} from "@dabsi/typedata/data-entity/DataEntitySource";
import DataSourceResolver from "@dabsi/typedata/data-entity/DataSourceResolver";
import { EmptyDataCursor } from "@dabsi/typedata/DataCursor";
import { Inject, Module } from "@dabsi/typedi";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
import { Resolver } from "@dabsi/typedi";
import { EntityRelation } from "@dabsi/typeorm/relations";
import SqlliteQueryRunnerPool from "@dabsi/typeorm/SqlliteQueryRunnerPool";
import { Connection, QueryRunner } from "typeorm";

type OnRelationCallback = (event: {
  relationType: Function;
  entityType: Function;
  entityPropertyName: string;
  relation: EntityRelation;
  connection: Connection;
}) => Awaitable;

@Module()
export default class DataSystemModule {
  constructor(
    @Inject() protected dbm: DbModule,
    @Inject() protected runner: ModuleRunner,
    @Inject() systemModule: SystemModule
  ) {
    Resolver.provide(
      runner.context,
      DataSourceResolver.provide(() => entityType =>
        new DataSystemSource(
          this,
          () => this.getConnection().createQueryRunner(),
          entityType,
          EmptyDataCursor
        )
      )
    );

    // have to be plugin
    systemModule.use([
      "create query runner per request",
      () => async (req, res, next) => {
        await this.withQueryRunner(async queryRunner => {
          Resolver.provide(
            req.systemContext,
            DataSourceResolver.provide(() => entityType =>
              new SystemDataSource(
                this,
                () => queryRunner,
                entityType,
                EmptyDataCursor
              )
            )
          );
          next();
        });
      },
    ]);
    // SystemRequest.start();
    dbm.afterInit(async () => {
      const connection = dbm.getConnection();
      for (const entityMetadata of connection.entityMetadatas) {
        if (typeof entityMetadata.target !== "function") continue;
        for (const relationMetadata of entityMetadata.relations) {
          if (typeof relationMetadata.type !== "function") continue;

          const relationType = relationMetadata.type;
          const relation = new EntityRelation(
            connection,
            entityMetadata.target as Function,
            relationMetadata.propertyName,
            false
          );
          getDataEntityInfo;
          for (const callback of this._buildRelationCallbacksMap.get(
            relationType
          ) || []) {
            await callback({
              entityType: entityMetadata.target,
              relation,
              relationType,
              entityPropertyName: relationMetadata.propertyName,
              connection,
            });
          }
        }
      }
    });
  }

  protected _buildRelationCallbacksMap = new Map<
    Function /* RelationType */,
    OnRelationCallback[]
  >();

  buildRelation(relationType: Function, callback: OnRelationCallback) {
    // down to children.
    // getEntityChildren
    touchMap(this._buildRelationCallbacksMap, relationType, () => []).push(
      callback
    );
  }
  // rela

  listen(
    entityType,
    callbackMap: {
      [K in DataEntityEvent["type"]]?: (
        event: Extract<
          DataEntityEvent,
          {
            type: K;
          }
        >
      ) => Awaitable;
    } & {
      "*"?: (event: DataEntityEvent) => Awaitable;
    }
  ) {
    const eventTypeListenerMap = touchMap(
      this._entityTypeListenerMap,
      entityType,
      () => new Map()
    );

    for (const [eventType, callback] of entries(callbackMap)) {
      if (typeof callback !== "function")
        throw new TypeError(`expected to function`);
      touchMap(eventTypeListenerMap, eventType as any, () => []).push(callback);
    }
  }

  protected _entityTypeListenerMap = new Map<
    /*EntityType*/ Function,
    Map<
      DataEntityEvent["type"] | "*", //
      DataEntityEmitter[]
    >
  >();

  getEntityEmitter(entityType: Function): DataEntityEmitter | undefined {
    const eventTypeListenerMap = this._entityTypeListenerMap.get(entityType);
    if (eventTypeListenerMap) {
      return async event => {
        for (const callbacks of [
          eventTypeListenerMap.get(event.type),
          eventTypeListenerMap.get("*"),
        ]) {
          for (const callback of callbacks || []) {
            await callback(event);
          }
        }
      };
    }
  }
  getConnection(): Connection {
    return this.dbm.getConnection();
  }

  protected get connection() {
    return this.getConnection();
  }

  @Lazy() get queryRunnerPool() {
    if (this.connection.options.type === "sqlite") {
      if (this.connection.options.database === ":memory:") return;
      return new SqlliteQueryRunnerPool(this.connection);
    }
  }

  async withQueryRunner<T = void>(
    callback: (queryRunner: QueryRunner) => Promise<T>
  ): Promise<T> {
    if (this.queryRunnerPool) {
      const queryRunner = await this.queryRunnerPool.acquire();
      try {
        return callback(queryRunner);
      } finally {
        await this.queryRunnerPool.release(queryRunner);
      }
    } else {
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();
      try {
        return callback(queryRunner);
      } finally {
        await queryRunner.release();
      }
    }
  }
}
