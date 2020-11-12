import express from "express";
import { realpathSync } from "fs";
import cookieParser from "cookie-parser";
import { Connection, getConnection } from "typeorm";
import { DataRow } from "../../typedata/DataRow";
import { EntityDataSource } from "../../typedata/entity-data/EntityDataSource";
import { Resolver } from "../../typedi";
import { RpcRequest } from "../../typerpc/RpcRequest";
import { SystemApp } from "../common/SystemApp";
import { getSession } from "./acl/getSession";
import { SYSTEM_BROWSER_BUNDLE } from "./cli/createBrowserWebpack";
import { SystemAppConfig } from "./SystemAppConfig";
import { SystemRequestContext } from "./SystemRequestContext";
import { SystemSession } from "./SystemSession";

export function SystemExpressApp(
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

    const connection = getConnection();

    const session = await getSession({
      cookie: req.cookies[cookieKey],
      setCookie(value) {
        res.cookie(cookieKey, value);
      },
      source: EntityDataSource.create(SystemSession, connection),
    });

    const context = {
      ...SystemRequestContext,
      ...Connection.provide(() => connection),
      ...DataRow(SystemSession).provide(() => session),
    };

    // Context()

    const rpcReq = Resolver.resolve(RpcRequest, context);
    const config = Resolver.resolve(SystemAppConfig, context);
    const command = SystemApp.createRpcCommand(config);

    const result = await rpcReq.handle(() => command(req.body));
    res.json(result);
  });
  return app;
}
