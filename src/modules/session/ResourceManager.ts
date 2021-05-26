import { hasKeys } from "@dabsi/common/object/hasKeys";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import findResourceTypes from "@dabsi/modules/session/findResourceTypes";
import { BaseResource } from "@dabsi/modules/session/BaseResource";
import { DataSourceFactory2 } from "@dabsi/modules/DbModule";
import { DbConnectionRef } from "@dabsi/modules/DbModule";
import { getEntityMetadata } from "@dabsi/typedata/entity/typeormMetadata";
import { DataRow } from "@dabsi/typedata/row";
import { DataSelectionRow } from "@dabsi/typedata/selection/row";
import { DataSelection } from "@dabsi/typedata/selection/selection";
import { DataUnion } from "@dabsi/typedata/union";
import { Injectable } from "@dabsi/typedi";

type ResourceType = Constructor<BaseResource>;

type ResourceHandler = {
  type: Function;
  selection: any;
  handle(resource: any): Awaitable;
};

@Injectable()
export class ResourceManager {
  constructor(
    protected getDataSource: DataSourceFactory2,
    protected getConnection: DbConnectionRef
  ) {}

  protected _definedResources = new Map<
    ResourceType,
    {
      selection?: any;
      handle(resource: any): Awaitable;
    }
  >();

  define<T extends BaseResource, S extends DataSelection<T>>(
    type: Constructor<T>,
    options: {
      selection?: S;
      handle: (resource: DataRow<DataSelectionRow<T, S>>) => Awaitable;
    }
  ) {
    this._definedResources.set(type, options);
  }

  getHandler(type: ResourceType): undefined | ResourceHandler {
    const entityMetadata = getEntityMetadata(this.getConnection(), type);

    if (!entityMetadata.childEntityMetadatas.length) {
      const options = this._definedResources.get(type);
      if (!options) return;
      return {
        type,
        selection: options.selection,
        handle: resource => options.handle(resource),
      };
    }

    const children = {};
    const childSelectionMap = {};
    const childHandlerMap = {};

    for (const childEntityMetadata of [entityMetadata]
      .toSeq()
      .concat(entityMetadata.childEntityMetadatas)) {
      const options = this._definedResources.get(
        childEntityMetadata.target as ResourceType
      );

      const childKey = childEntityMetadata.discriminatorValue!;

      if (options?.handle) {
        childHandlerMap[childKey] = options?.handle;
      }

      children[childKey] = childEntityMetadata.target;

      if (options?.selection) {
        childSelectionMap[childKey] = options.selection;
      }
    }

    if (!hasKeys(childHandlerMap)) return;

    return {
      type: DataUnion(type as any, { children: children }),
      selection: { children: childSelectionMap },
      handle: resource => {
        return childHandlerMap?.[resource.$type]?.(resource);
      },
    };
  }

  async cleanUnusedResources() {
    for (const type of findResourceTypes(this.getConnection())) {
      log.info(() => `Cleaning unsed resources of ${type.name}.`);
      const handler = this.getHandler(type as ResourceType);

      if (!handler) {
        await this.getDataSource(type as typeof BaseResource)
          // TODO: use $not
          .filter({
            $and: [{ $notHas: "session" }, [{ $countRefs: "any" }, "=", 0]],
          })
          .delete();
        continue;
      }

      for await (const resource of this.getDataSource(handler.type as any)
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
