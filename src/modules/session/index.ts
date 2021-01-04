import { Cli } from "@dabsi/modules/Cli";
import { Inject, Module, Resolver } from "@dabsi/typedi";
import { getSession } from "../../system-old/server/acl/getSession";
import DataSourceResolver from "../data/DataSourceResolver";
import RequestModule from "../RequestModule";
import { ServerModule } from "../ServerModule";
import RequestSession from "./RequestSession";

export const SessionCookieResolver = Resolver<{
  get(): string;
  set(value: string): void;
}>();

const RequestContext = Resolver.object({
  sessions: DataSourceResolver(RequestSession),
  cookie: SessionCookieResolver,
});

@Module()
export default class SessionModule {
  // TODO: cli session clean|show ...

  constructor(
    @Inject() cli: Cli,
    @Inject() requestModule: RequestModule,
    @Inject() serverModule: ServerModule
  ) {
    cli.command("session", cli => cli.command("clean", cli => cli));

    requestModule //
      .require(RequestContext)
      .beforeRequest(async context => {
        const { sessions, cookie } = Resolver.resolve(RequestContext, context);
        const session = await getSession({
          source: sessions,
          cookie: cookie.get(),
          setCookie(value: string) {
            cookie.set(value);
          },
        });
      });
  }
}
