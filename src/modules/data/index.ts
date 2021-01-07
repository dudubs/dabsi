import { touchMap } from "@dabsi/common/map/touchMap";
import { entries } from "@dabsi/common/object/entries";
import Lazy from "@dabsi/common/patterns/lazy";
import { Awaitable } from "@dabsi/common/typings2/Async";
import DataModuleSource from "@dabsi/modules/data/DataModuleSource";
import DataSourceFactoryResolver from "@dabsi/modules/data/DataSourceFactroyResolver";
import { DbModule } from "@dabsi/modules/DbModule";
import { getDataEntityInfo } from "@dabsi/typedata/data-entity/DataEntityInfo";
import {
  DataEntityEmitter,
  DataEntityEvent,
} from "@dabsi/typedata/data-entity/DataEntitySource";
import { EmptyDataCursor } from "@dabsi/typedata/DataCursor";
import { Inject, Module, Resolver } from "@dabsi/typedi";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
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
export default class DataModule {
  constructor(
    @Inject() protected dbModule: DbModule,
    @Inject() protected runner: ModuleRunner
  ) {
    Resolver.provide(
      runner.context,
      DataSourceFactoryResolver.provide(() => entityType =>
        new DataModuleSource(
          this,
          () => this.getConnection().createQueryRunner(),
          entityType,
          EmptyDataCursor
        )
      )
    );

    // SystemRequest.start();
    dbModule.afterInit(async () => {
      const connection = dbModule.getConnection();
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
    return this.dbModule.getConnection();
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

  async createQueryRunner(): Promise<
    [qr: QueryRunner, release: () => Promise<void>]
  > {
    if (this.queryRunnerPool) {
      const queryRunner = await this.queryRunnerPool.acquire();
      return [
        queryRunner,
        () => {
          return this.queryRunnerPool!.release(queryRunner);
        },
      ];
    } else {
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();
      return [queryRunner, () => queryRunner.release()];
    }
  }
}
