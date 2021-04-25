import { SessionModule } from "@dabsi/modules/session/module";
import { ExpressModule2 } from "@dabsi/modules2/ExpressModule2";
import { RequestBuilder } from "@dabsi/modules2/RequestBuilder";
import { RpcModule2 } from "@dabsi/modules/rpc";
import { ServerModule2 } from "@dabsi/modules2/ServerModule2";
import { ResolverMap } from "@dabsi/typedi";
import { Module, Plugin } from "@dabsi/typemodule";
import { ModuleRunnerContext } from "@dabsi/typemodule/ModuleRunner";
import express from "express";
import multer from "multer";
import { SystemRpc, SYSTEM_RPC_PATH } from "./common/rpc";

@Module({
  dependencies: [SessionModule],
})
export class SystemModule {
  log = log.get("SYSTEM");

  request = new RequestBuilder();

  constructor(protected rpcModule: RpcModule2) {}

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
        expressModule.processRequest(context, async (req, res, context) => {
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
      );
    });
  }
}
