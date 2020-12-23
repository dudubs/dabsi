import { ExtractKeys } from "@dabsi/common/typings2/ExtractKeys";
import { touchMap } from "@dabsi/common/map/touchMap";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { DbModule } from "@dabsi/system/core/DbModule";
import DataSystemSource from "@dabsi/system/core/SystemDataSource";
import {
  BaseDataEntityEvent,
  DataEntityEventType,
} from "@dabsi/typedata/data-entity/DataEntitySource";
import DataSourceResolver from "@dabsi/typedata/data-entity/DataSourceResolver";
import { EmptyDataCursor } from "@dabsi/typedata/DataCursor";
import { Inject, Module } from "@dabsi/typedi";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
import { Connection, getMetadataArgsStorage } from "typeorm";

import { Resolver } from "./../../typedi/Resolver";
import { Type } from "@dabsi/common/typings2/Type";

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

  listen<K extends DataEntityEventType>(
    entityType,
    eventType: K,
    callback: (event: Extract<BaseDataEntityEvent, { type: K }>) => Awaitable
  ) {}

  getConnection(): Connection {
    return this.dbm.getConnection();
  }

  buildCountRef<T, K extends ExtractKeys<T, number>>(
    relationType: Type<T>,
    relationPropertyName: string & K
  ) {
    const dsm = this;

    dsm.buildRelation(relationType, ({ entityPropertyName, entityType }) => {
      // dsm.onInsert()
      const selection = { relations: { [entityPropertyName]: { pick: [] } } };

      dsm.listen(entityType, "insert", async event => {
        const change = event.changeMap[entityPropertyName];
        if (change?.type === "set") {
          await increment(change.key.object, 1);
        }
      });

      dsm.listen(entityType, "update.start", async event => {
        if (event.changeMap[entityPropertyName]) {
          event.select(selection);
        }
      });
      dsm.listen(entityType, "update.after", async event => {
        const change = event.changeMap[entityPropertyName];
        const before = event.entity?.[entityPropertyName];
        if (!change) return;

        switch (change.type) {
          case "set":
            if (before?.$key === change.key.text) return;
            await increment(before?.$key, -1);
            await increment(change.key, 1);
            break;
          case "unset":
            await increment(before?.$key, -1);
            break;
        }
      });
      dsm.listen(entityType, "delete.start", async event => {
        event.select(selection);
      });
      dsm.listen(entityType, "delete.after", async event => {
        const before = event.entity?.[entityPropertyName];
        await increment(before?.$key, -1);
      });
    });

    function increment(key, count: number) {
      if (key !== null)
        return dsm
          .getConnection()
          .manager.increment(relationType, key, relationPropertyName, count);
    }
  }
}
