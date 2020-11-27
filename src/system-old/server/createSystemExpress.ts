import cookieParser from "cookie-parser";
import express from "express";
import { realpathSync } from "fs";
import { DataResolvers } from "../../typedata/DataResolvers";
import { DataRow } from "../../typedata/DataRow";
import { Resolver } from "../../typedi";
import { RpcRequest } from "../../typerpc/RpcRequest";
import { SystemApp } from "../common/SystemApp";
import { getSession } from "./acl/getSession";
import { SYSTEM_BROWSER_BUNDLE } from "./cli/createBrowserWebpack";
import { SystemCommand } from "./cli/SystemCommand";
import { SystemAppConfig } from "./SystemAppConfig";
import { SystemRequestResolvers } from "./SystemRequestResolvers";
import { SystemSession } from "../../system/core/SystemSession";

const resolvers = DataResolvers({ sessions: SystemSession });

export function createSysteexpressModule(
  { scripts = "" } = {},
  callback?: (app: Express.Application) => void
) {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());

  app.use("/bundle", express.static(realpathSync(SYSTEM_BROWSER_BUNDLE)));

  callback?.(app);

  app.get("/*", (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.send(
      `<!DOCTYPE html><html><head>${scripts}${
        script("vendor") //
      }${
        script("register") //
      }${
        script("index") //
      }${
        script("runtime") //
      }</head><body><div id="system"></div></body></html>`
    );

    function script(name) {
      return `<script src="/bundle/${name}.js"></script>`;
    }
  });

  app.post("/service", async (req, res) => {
    //
    const cookieKey = "sys-sess-token";

    const session = await SystemCommand(resolvers, c =>
      getSession({
        cookie: req.cookies[cookieKey],
        setCookie(value) {
          res.cookie(cookieKey, value);
        },
        source: c.sessions,
      })
    );

    const context = {
      ...SystemRequestResolvers,
      ...DataRow(SystemSession).provide(() => session),
    };

    const rpcReq = Resolver.resolve(RpcRequest, context);
    const config = Resolver.resolve(SystemAppConfig, context);
    const command = SystemApp.createRpcCommand(config);
    const result = await rpcReq.handle(() => command(req.body));
    res.json(result);
  });
  return app;
}
