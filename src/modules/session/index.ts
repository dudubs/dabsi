// TODO: ResourcesManager { define,clean ... }
import { DataRowTicker } from "@dabsi/modules/data/DataRowTicker";
import { DataTicker } from "@dabsi/modules/data/DataTicker";
import DbModule, { DataSourceFactory2 } from "@dabsi/modules/DbModule";
import ExpressModule, {
  ExpressRequest,
  ExpressResponse,
} from "@dabsi/modules/ExpressModule";
import ServerModule from "@dabsi/modules/ServerModule";
import { Session } from "@dabsi/modules/session/entities/Session";
import { generateSessionToken } from "@dabsi/modules/session/generateSessionToken";
import getCurrentTime from "@dabsi/modules/session/getCurrentTime";
import { ResourceManager } from "@dabsi/modules/session/ResourceManager";
import { User } from "@dabsi/system/acl/entities/User";
import { CliArgument, CliCommand } from "@dabsi/typecli";
import { Resolver } from "@dabsi/typedi";
import { Module, Plugin } from "@dabsi/typemodule";
import { ModuleRunnerContext } from "@dabsi/typemodule/ModuleRunner";
import CookieParser from "cookie-parser";

export const SESSION_TIMEOUT = 1000 * 60 * 10;

export class RequestUser extends Resolver<DataRowTicker<User>>() {}

export class RequestSession extends Resolver<DataRowTicker<Session>>() {}

@Module({
  cli: "session",
  dependencies: [DbModule],
})
export class SessionModule {
  cookieName = "session-k";

  constructor(
    readonly resourceMananger: ResourceManager,
    readonly getDataSource: DataSourceFactory2
  ) {}

  installContext(@Plugin() context: ModuleRunnerContext) {
    Resolver.Context.assign(context, [this.resourceMananger]);
  }

  @CliArgument() protected _init(dbModule: DbModule) {
    return dbModule.loadAndConnect();
  }

  @CliCommand("clean")
  async cleanAll() {
    await this.cleanTimeoutSessions();
    await this.resourceMananger.cleanUnusedResources();
  }

  async cleanTimeoutSessions() {
    log.info(`Cleaing timeout sessions.`);
    await this.getDataSource(Session)
      .filter({
        timeout: { $lessThan: getCurrentTime() - SESSION_TIMEOUT },
      })
      .delete();
  }

  installExpress(@Plugin() expressModule: ExpressModule) {
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
    @Plugin() serverModule: ServerModule,
    getDataSource: DataSourceFactory2
  ) {
    serverModule.request.finalizers.push(
      Resolver([RequestSession], session => async () => {
        await session.update({ timeout: getCurrentTime() });
      })
    );

    serverModule.request.initializers.push(
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
              dataTicker.getRowTicker(User, userKey || null)
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
