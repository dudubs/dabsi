import { touchMap } from "@dabsi/common/map/touchMap";
import { touchObject } from "@dabsi/common/object/touchObject";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { DbModule } from "@dabsi/system/core/DbModule";
import DataSystemSource from "@dabsi/system/core/SystemDataSource";
import {
  DataEntityEvent,
  DataEntityEventType,
} from "@dabsi/typedata/data-entity/DataEntitySource";
import DataSourceResolver from "@dabsi/typedata/data-entity/DataSourceResolver";
import { EmptyDataCursor } from "@dabsi/typedata/DataCursor";
import { Inject, Module } from "@dabsi/typedi";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
import { Connection } from "typeorm";
import { Resolver } from "./../../typedi/Resolver";

type OnRelationCallback = (event: {
  relationType: Function;
  entityType: Function;
  entityPropertyName: string;
}) => Awaitable;

@Module()
export default class DataSystemModule {
  constructor(
    @Inject() protected dbm: DbModule,
    @Inject() protected runner: ModuleRunner
  ) {
    Resolver.provide(
      runner.context,
      DataSourceResolver.provide(() => entityType =>
        new DataSystemSource(this, entityType, EmptyDataCursor)
      )
    );

    dbm.install({
      afterInit: async () => {
        const connection = dbm.getConnection();
        for (const entityMetadata of connection.entityMetadatas) {
          if (typeof entityMetadata.target !== "function") continue;
          for (const relationMetadata of entityMetadata.relations) {
            if (typeof relationMetadata.type !== "function") continue;

            const relationType = relationMetadata.type;

            for (const callback of this._buildRelationCallbacksMap.get(
              relationType
            ) || []) {
              await callback({
                entityType: entityMetadata.target,
                relationType,
                entityPropertyName: relationMetadata.propertyName,
              });
            }
          }
        }
      },
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

  protected _entityListenersMap = new Map<
    Function,
    {
      [EventType in DataEntityEventType]?:
        | {
            (event: DataEntityEvent): Awaitable;
          }[]
        | undefined;
    }
  >();

  listenToEntity<K extends DataEntityEventType>(
    entityType: Function,
    eventType: K | "*",
    callback: (event: Extract<DataEntityEvent, { type: K }>) => Awaitable
  ) {
    const eventTypeListenersMap = touchMap(
      this._entityListenersMap,
      entityType,
      () => ({})
    );
    touchObject(eventTypeListenersMap, eventType, () => [])!.push(callback);
  }

  getEntityEmitter(entityType) {
    const eventTypeListenersMap = this._entityListenersMap.get(entityType);
    if (eventTypeListenersMap) {
      return async (event: DataEntityEvent) => {
        for (const eventType of [event.type, "*"]) {
          for (const callback of eventTypeListenersMap[eventType] || []) {
            await callback(event);
          }
        }
      };
    }
  }

  getConnection(): Connection {
    return this.dbm.getConnection();
  }
}
