import { touchMap } from "@dabsi/common/map/touchMap";
import { touchSet } from "@dabsi/common/map/touchSet";
import { entries } from "@dabsi/common/object/entries";
import Lazy from "@dabsi/common/patterns/lazy";
import { Awaitable } from "@dabsi/common/typings2/Async";
import DataModuleSource from "@dabsi/modules/data/DataModuleSource";
import DataSourceFactoryResolver from "@dabsi/modules/data/DataSourceFactroyResolver";
import { DbModule } from "@dabsi/modules/DbModule";
import { DataResolver } from "@dabsi/system/storage/DataResolver";
import { getDataEntityInfo } from "@dabsi/typedata/data-entity/DataEntityInfo";
import { DataRelationChange } from "@dabsi/typedata/data-entity/DataEntityListener";
import {
  DataEntityEmitter,
  DataEntityEvent,
} from "@dabsi/typedata/data-entity/DataEntitySource";
import { EmptyDataCursor } from "@dabsi/typedata/DataCursor";
import { Inject, Module, Resolver } from "@dabsi/typedi";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
import { DataEntityRelation } from "@dabsi/typeorm/relations";
import SqlliteQueryRunnerPool from "@dabsi/typeorm/SqlliteQueryRunnerPool";
import { Connection, QueryRunner } from "typeorm";
import { RelationMetadata } from "typeorm/metadata/RelationMetadata";

type OnRelationCallback = (relationMetadata: RelationMetadata) => Awaitable;

export type DataRelationEvent = {
  change: DataRelationChange;
  queryRunner: QueryRunner;
};
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
      const cache = new Set();
      const connection = dbModule.getConnection();

      for (const entityMetadata of connection.entityMetadatas) {
        if (typeof entityMetadata.target !== "function") continue;
        for (const relationMetadata of entityMetadata.relations) {
          if (typeof relationMetadata.type !== "function") continue;
          if (!touchSet(cache, relationMetadata)) continue;
          const relationType = relationMetadata.type;

          const relation = new DataEntityRelation(
            connection,
            relationMetadata.target as Function,
            relationMetadata.propertyName,
            false
          );

          for (const callback of this._buildRelationCallbacksMap.get(
            relationType
          ) || []) {
            await callback(relationMetadata);
          }
        }
      }
    });
  }

  relationListenerMap = new Map<
    RelationMetadata,
    Set<(event: DataRelationEvent) => Awaitable>
  >();

  onRelationChange(
    relationMetadata: RelationMetadata,
    callback: (event: DataRelationEvent) => Awaitable
  ) {
    const callbacks = touchMap(
      this.relationListenerMap,
      relationMetadata,
      () => new Set()
    );
    callbacks.add(callback);
    return () => {
      callbacks.delete(callback);
    };
  }

  protected _buildRelationCallbacksMap = new Map<
    Function /* RelationType */,
    OnRelationCallback[]
  >();

  protected relationBuildersMap = new Map<
    Function /* RelationType */,
    (relationMetadata: RelationMetadata) => void
  >();

  buildRelationsTo(relationType: Function, callback: OnRelationCallback) {
    // down to children.
    // getEntityChildren
    touchMap(this._buildRelationCallbacksMap, relationType, () => []).push(
      callback
    );
  }

  // listenToRelationChanges
  // listenToColumn
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
  ) {}

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
