import cookieParser from "cookie-parser";
import express from "express";
import { watch } from "fs";
import reload from "reload";
import { createConnection, getConnection } from "typeorm";
import { EntityDataSource } from "../../typedata/entity-data/EntityDataSource";
import { Resolver } from "../../typedi/Resolver";
import { RpcRequest } from "../../typerpc/RpcRequest";
import { SystemApp } from "../common/SystemApp";
// import { AclRequest } from "./acl/AclRequest";
import { getSession } from "./acl/getSession";
import { SystemAppConfig } from "./SystemAppConfig";
import {
  ConnectionResolver,
  SystemSession,
  SystemSessionResolver,
} from "./SystemContextResolver";
import { SystemEntities } from "./SystemEntities";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/service", async (req, res) => {
  //
  const cookieKey = "sys-sess-token";

  const session = await getSession({
    cookie: req.cookies[cookieKey],
    setCookie(value) {
      res.cookie(cookieKey, value);
    },
    source: EntityDataSource.create(SystemSession),
  });

  const rpcReq = new RpcRequest();

  const config = Resolver.resolve(SystemAppConfig, {
    ...SystemSessionResolver.provide(() => session),
    ...ConnectionResolver.provide(() => getConnection()),
    ...RpcRequest.provide(() => rpcReq),
  });
  const command = SystemApp.createRpcCommand(config);
  const result = await rpcReq.handle(() => command(req.body));
  res.json(result);
});

reload(app).then(reload => {
  watch("bundle/browser", () => {
    reload();
  });
});

(async () => {
  console.log("starting server.");

  createConnection({
    type: "sqlite",
    database: "bundle/system.sqlite3",
    entities: SystemEntities,
    synchronize: true,
  });
  const server = app.listen(8080);

  process.on("SIGINT", () => {
    console.log("closing server.");
    server.close();
    process.exit();
  });
})();
