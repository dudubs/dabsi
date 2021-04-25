import { defined } from "@dabsi/common/object/defined";
import { hasKeys } from "@dabsi/common/object/hasKeys";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { Type } from "@dabsi/common/typings2/Type";
import { DataRowTicker } from "@dabsi/modules/data/rowTicker";
import { DataTicker } from "@dabsi/modules/data/DataTicker";
import { Session } from "@dabsi/modules/session/entities/Session";
import getCurrentTime from "@dabsi/modules/session/getCurrentTime";
import getResourceTypes from "@dabsi/modules/session/getResourceTypes";
import { BaseResource } from "@dabsi/modules/session/resource";
import { DataSourceFactory2 } from "@dabsi/modules2/DataSourceFactory2";
import { DbConnectionRef, DbModule2 } from "@dabsi/modules2/DbModule2";
import {
  ExpressModule2,
  ExpressRequest,
  ExpressResponse,
} from "@dabsi/modules2/ExpressModule2";
import { ServerRequestBuilder } from "@dabsi/modules2/ServerModule2";
import { generateSessionToken } from "@dabsi/modules/session/generateSessionToken";
import { User } from "@dabsi/system/acl/entities/User";
import { CliCommand } from "@dabsi/typecli";
import { getEntityMetadata } from "@dabsi/typedata/entity/typeormMetadata";
import { DataRow } from "@dabsi/typedata/row";
import { DataSelectionRow } from "@dabsi/typedata/selection/row";
import { DataSelection } from "@dabsi/typedata/selection/selection";
import { DataUnion } from "@dabsi/typedata/union";
import { Resolver } from "@dabsi/typedi";
import { Module, Plugin } from "@dabsi/typemodule";
import CookieParser from "cookie-parser";
import { Connection } from "typeorm";

export const SESSION_TIMEOUT = 1000 * 60 * 10;

export class RequestUser extends Resolver<DataRowTicker<User>>() {}

export class RequestSession extends Resolver<DataRowTicker<Session>>() {}

class CleanContext extends Resolver({
  getDataSource: DataSourceFactory2,
  getConnection: DbConnectionRef,
}) {}

@Module({
  cli: "session",
  dependencies: [DbModule2],
})
export class SessionModule {
  cookieName = "session-k";

  protected _resourceTypeOptionsMap = new Map<
    Function,
    {
      selection?: any;
      handle: (resource) => Awaitable;
    }
  >();

  constructor() {}

  @CliCommand("clean")
  async cleanAll(context: CleanContext) {
    await this.cleanTimeoutSessions(context);
    await this.cleanUnusedResources(context);
  }

  defineResourceType<T extends BaseResource, S extends DataSelection<T> = {}>(
    type: Type<T>,
    options: {
      selection?: S;
      handle: (resource: DataRow<DataSelectionRow<T, S>>) => Awaitable;
    }
  ) {
    this._resourceTypeOptionsMap.set(type, options);
  }

  getResourceHandler(
    connection: Connection,
    resourceType: Function
  ): null | {
    selection: any;
    type: Function;
    handle(resource): Awaitable;
  } {
    const entityMetadata = getEntityMetadata(connection, resourceType);

    if (!entityMetadata.childEntityMetadatas.length) {
      const options = this._resourceTypeOptionsMap.get(resourceType);
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
      const options = this._resourceTypeOptionsMap.get(
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

  async cleanTimeoutSessions({ getDataSource }: CleanContext) {
    log.info(`Cleaing timeout sessions.`);
    await getDataSource(Session)
      .filter({
        timeout: { $lessThan: getCurrentTime() - SESSION_TIMEOUT },
      })
      .delete();
  }

  async cleanUnusedResources({ getConnection, getDataSource }: CleanContext) {
    for (const resourceType of getResourceTypes(getConnection())) {
      log.info(() => `Cleaning unsed resources of ${resourceType.name}.`);
      const handler = this.getResourceHandler(getConnection(), resourceType);

      if (!handler) {
        await getDataSource(resourceType as typeof BaseResource)
          // TODO: use $not
          .filter({
            $and: [{ $notHas: "session" }, [{ $countRefs: "any" }, "=", 0]],
          })
          .delete();
        continue;
      }

      for await (const resource of getDataSource(handler.type as any)
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

  installExpress(@Plugin() expressModule: ExpressModule2) {
    expressModule.useRequest(() => CookieParser());

    Resolver.Context.assign(
      expressModule.request.context,
      Resolver(SessionCookie, [ExpressRequest, ExpressResponse], (req, res) => {
        return {
          get: () => req.cookies[this.cookieName],
          define: value => {
            res.cookie(this.cookieName, value);
          },
        };
      })
    );
  }

  installRequest(
    @Plugin() request: ServerRequestBuilder,
    getDataSource: DataSourceFactory2
  ) {
    request.finalizers.push(
      Resolver([], () => async () => {
        //
      })
    );

    request.initializers.push(
      Resolver(
        [SessionCookie, DataTicker, c => c],
        (cookie, dataTicker, context) => async () => {
          // TODO

          const [sessionKey, userKey] = await getSession();

          Resolver.Context.assign(
            context,
            Resolver(RequestSession, () =>
              dataTicker.getRowTicker(Session, sessionKey)
            ),
            Resolver(RequestUser, () =>
              dataTicker.getRowTicker(User, defined(userKey, `No user Key`))
            )
          );

          async function getSession(): Promise<
            [sessionKey: string, userKey?: string]
          > {
            const { key, token } = getCookie() || {};
            if (typeof key === "string" && typeof token === "string") {
              const session = await getDataSource(Session)
                .filter({
                  $and: [{ $is: key }, { token }],
                })
                .select({ relations: { user: { pick: [] } } })
                .get();
              if (session) return [key, session.user?.$key];
            }
            {
              const token = generateSessionToken();
              const key = await getDataSource(Session).insertKey({
                token,
                timeout: getCurrentTime(),
              });
              defineCookie(key, token);
              return [key];
            }
          }

          function getCookie() {
            const data = cookie.get();
            if (!data) return;
            try {
              const [key, token] = JSON.parse(data);
              return { key, token };
            } catch (error) {}
          }

          function defineCookie(key: string, token: string) {
            cookie.define(JSON.stringify([key, token]));
          }
        }
      )
    );
  }
}

export class SessionCookie {
  get!: () => string;

  define!: (value: string) => void;
}
