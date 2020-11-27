import CookieParser from "cookie-parser";
import { ExpressModule } from "../../modules/ExpressModule";
import { getSession } from "../../system-old/server/acl/getSession";
import { Session } from "../../system-old/server/acl/Session";
import { DataEntitySource } from "../../typedata/data-entity/DataEntitySource";
import { DataSelectionRow } from "../../typedata/data-selection/DataSelectionRow";
import { DataRow } from "../../typedata/DataRow";
import { Inject, Module } from "../../typedi";
import { DbModule, DbModuleProvider } from "./DbModule";

export type SessionRow = DataRow<DataSelectionRow<Session, { pick: [] }>>;

declare global {
  namespace Express {
    interface Request {
      getSession: () => Promise<SessionRow>;
    }
  }
}

@Module({
  dependencies: [DbModule],
  providers: [
    DbModuleProvider({
      entities: [Session],
    }),
  ],
})
export class SessionModule {
  cookieName: string = "session-c";

  constructor(
    @Inject() expressModule: ExpressModule,
    @Inject() dbModule: DbModule
  ) {
    expressModule.push({
      preRoutes: async app => {
        const sessions = DataEntitySource.create(
          Session,
          dbModule.getConnection
        ).pick([]);
        const cookieParser = CookieParser();
        app.use((req, res, next) => {
          let session;
          req.getSession = async () => {
            if (session) return session;
            await new Promise(next => cookieParser(req, res, next));
            return (session = await getSession({
              setCookie: (value: string) => {
                res.cookie(this.cookieName, value);
              },
              cookie: req.cookies[this.cookieName],
              source: sessions,
            }));
          };
          next();
        });
      },
    });
  }
}
