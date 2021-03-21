import ExpressModule from "@dabsi/modules/express";
import RpcModule from "@dabsi/modules/rpc";
import RpcRequest from "@dabsi/modules/rpc/RpcRequest";
import { SystemRpc, SYSTEM_RPC_PATH } from "@dabsi/system/core/common/rpc";
import { Module } from "@dabsi/typedi";
import BodyParser from "body-parser";
import multer from "multer";
import SystemModule from "..";
import { Cli } from "../../../modules/Cli";

@Module({})
export default class SystemForExpressModule {
  constructor(
    rpcModule: RpcModule,
    expressModule: ExpressModule,
    systemModule: SystemModule,
    cli: Cli
  ) {
    cli.command("check", cli =>
      cli.onRun(() => {
        systemModule.check(expressModule.context);
      })
    );
    expressModule.beforeBuildRoutes(app => {
      app.post(
        SYSTEM_RPC_PATH,
        BodyParser.json(),
        BodyParser.urlencoded({ extended: true }),
        multer().any(),
        expressModule.processRequest(
          async ({ files, body: originalBody }, res, context) => {
            const body = {};

            if (Array.isArray(files)) {
              for (const file of files) {
                body[file.fieldname] = file.buffer;
              }
            }

            const requestDatas =
              typeof originalBody.command === "string"
                ? JSON.parse(originalBody.command)
                : originalBody;

            rpcModule.log.info(() => `got ${requestDatas.length} requests.`);
            res.json({
              responses: await Promise.all(
                requestDatas.map(async ({ path, payload }, index) => {
                  const request = new RpcRequest(path, payload, body);
                  rpcModule.log.info(() => `handle ${JSON.stringify(path)}`);
                  return rpcModule.processRequest(
                    SystemRpc,
                    request,
                    Object.create(context)
                  );
                })
              ),
            });
            // cleanup...
          }
        )
      );
    });
  }
}
