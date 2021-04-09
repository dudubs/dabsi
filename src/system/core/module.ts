import { SessionModule } from "@dabsi/modules/session/module";
import { ExpressModule2 } from "@dabsi/modules2/ExpressModule2";
import { Request2 } from "@dabsi/modules2/Request2";
import { RpcModule2 } from "@dabsi/modules2/RpcModule2";
import { ServerModule2 } from "@dabsi/modules2/ServerModule2";
import { ResolverMap } from "@dabsi/typedi";
import { Module, Plugin } from "@dabsi/typemodule";
import { ModuleRunnerContext } from "@dabsi/typemodule/ModuleRunner";
import express from "express";
import multer from "multer";
import RpcModule from "../../modules/rpc";
import { SystemRpc, SYSTEM_RPC_PATH } from "./common/rpc";

@Module({
  dependencies: [SessionModule],
})
export default class SystemModule {
  log = log.get("SYSTEM");

  request = new Request2([]);

  constructor(protected rpcModule: RpcModule) {}

  async check(context: ResolverMap) {
    this.log.trace(`Checking..`);
    this.rpcModule.check(SystemRpc, context);
  }

  installExpress(
    @Plugin() expressModule: ExpressModule2,
    context: ModuleRunnerContext,
    rpcModule: RpcModule2,
    serverModule: ServerModule2
  ) {
    expressModule.builders.push(app => {
      app.post(
        SYSTEM_RPC_PATH,
        express.json(),
        express.urlencoded({ extended: true }),
        multer().any(),
        expressModule.processRequest(context, async (req, res, context) =>
          serverModule.processRequest(context, async context => {
            const bodyWithFiles = { ...req.body };

            if (Array.isArray(req.files)) {
              for (const { fieldname, buffer } of req.files) {
                bodyWithFiles[fieldname] = buffer;
              }
            }

            const requestDatas: any[] =
              typeof bodyWithFiles.command === "string"
                ? JSON.parse(bodyWithFiles.command)
                : bodyWithFiles;

            this.log.info(() => `Got ${requestDatas.length} requests.`);

            res.json({
              responses: await rpcModule.processMultipleRequests(
                SystemRpc,
                requestDatas,
                bodyWithFiles,
                context
              ),
            });
          })
        ),
        async (req, res) => {}
      );
    });
  }
}
