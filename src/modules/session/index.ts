import { hasKeys } from "@dabsi/common/object/hasKeys";
import { Once } from "@dabsi/common/patterns/Once";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { Type } from "@dabsi/common/typings2/Type";
import { Cli } from "@dabsi/modules/Cli";
import DataModule from "@dabsi/modules/data";
import { DataContext } from "@dabsi/modules/data/context";
import { DbModule } from "@dabsi/modules/DbModule";
import { Session } from "@dabsi/modules/session/entities/Session";
import getCurrentTime from "@dabsi/modules/session/getCurrentTime";
import getResourceTypes from "@dabsi/modules/session/getResourceTypes";
import { Resource } from "@dabsi/modules/session/resource";
import { getEntityMetadata } from "@dabsi/typedata/entity/metadata";
import { DataRow } from "@dabsi/typedata/row";
import { DataSelectionRow } from "@dabsi/typedata/selection/row";
import { DataSelection } from "@dabsi/typedata/selection/selection";
import { DataUnion } from "@dabsi/typedata/union";
import { Module } from "@dabsi/typedi";

export const SESSION_TIMEOUT = 1000 * 60 * 10;

@Module({
  dependencies: [DataModule],
})
export default class SessionModule {
  constructor(
    protected data: DataContext,
    cli: Cli,
    protected dbModule: DbModule
  ) {
    cli.command("session", cli =>
      cli.command("clean", cli =>
        cli.onRun(async () => {
          await dbModule.init();
          await this.cleanAll();
        })
      )
    );
  }

  async cleanAll() {
    await this.cleanTimeoutSessions();
    await this.cleanUnusedResources();
  }
  @Once() async init() {
    await this.dbModule.init();
    await this.dbModule.queryRunner!.startTransaction();
  }

  defineResourceType<T extends Resource, S extends DataSelection<T> = {}>(
    type: Type<T>,
    options: {
      selection?: S;
      handle: (resource: DataRow<DataSelectionRow<T, S>>) => Awaitable;
    }
  ) {
    this.resourceOptionsMap.set(type, options);
  }

  protected resourceOptionsMap = new Map<
    Function,
    {
      selection?: any;
      handle: (resource) => Awaitable;
    }
  >();

  getResourceHandler(
    resourceType: Function
  ): null | {
    selection: any;
    type: Function;
    handle(resource): Awaitable;
  } {
    const entityMetadata = getEntityMetadata(
      this.dbModule.getConnection(),
      resourceType
    );

    if (!entityMetadata.childEntityMetadatas.length) {
      const options = this.resourceOptionsMap.get(resourceType);
      if (!options) return null;
      return {
        type: resourceType,
        selection: options.selection,
        handle: resource => options.handle(resource),
      };
    }

    const unionChildren = {};
    const unionChildrenSelection = {};
    const childHandlerMap = {};

    for (const childEntityMetadata of [entityMetadata]
      .toSeq()
      .concat(entityMetadata.childEntityMetadatas)) {
      const options = this.resourceOptionsMap.get(
        childEntityMetadata.target as Function
      );

      const childKey = childEntityMetadata.discriminatorValue!;

      if (options?.handle) {
        childHandlerMap[childKey] = options?.handle;
      }

      unionChildren[childKey] = childEntityMetadata.target;

      if (options?.selection) {
        unionChildrenSelection[childKey] = options.selection;
      }
    }

    if (!hasKeys(childHandlerMap)) return null;

    return {
      type: DataUnion(resourceType as any, { children: unionChildren }),
      selection: { children: unionChildrenSelection },
      handle: resource => {
        return childHandlerMap?.[resource.$type]?.(resource);
      },
    };
  }

  async cleanTimeoutSessions() {
    log.info(`Cleaing timeout sessions.`);
    await this.data
      .getSource(Session)
      .filter({
        timeout: { $lessThan: getCurrentTime() - SESSION_TIMEOUT },
      })
      .delete();
  }
  async cleanUnusedResources() {
    for (const resourceType of getResourceTypes(
      this.dbModule.getConnection()
    )) {
      log.info(() => `Cleaning unsed resources of ${resourceType.name}.`);
      const handler = this.getResourceHandler(resourceType);

      if (!handler) {
        await this.data
          .getSource(resourceType as typeof Resource)
          // TODO: use $not
          .filter({
            $and: [{ $notHas: "session" }, [{ $countRefs: "any" }, "=", 0]],
          })
          .delete();
        continue;
      }

      for await (const resource of this.data
        .getSource(handler.type)
        .select(handler.selection)
        .filter({
          $and: [
            { $notHas: "session" },
            { $not: "wasErrorOnDelete" },
            [{ $countRefs: "any" }, "=", 0],
          ],
        })
        .find()) {
        try {
          await handler.handle(resource);
        } catch (error) {
          log.error(`Resource handler error: ${error}`);
          await resource.update({ wasErrorOnDelete: true });
          continue;
        }
        await resource.delete();
        //
      }
    }
  }
}
