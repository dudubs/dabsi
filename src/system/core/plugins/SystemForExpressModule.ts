import ExpressModule from "@dabsi/modules/express";
import RpcModule from "@dabsi/modules/rpc";
import RpcRequest from "@dabsi/modules/rpc/RpcRequest";
import { SystemRpc, SystemRpcPath } from "@dabsi/system/core/common/SystemRpc";
import { Inject, Module, Resolver } from "@dabsi/typedi";
import BodyParser from "body-parser";
import multer from "multer";
import SystemModule from "..";
import { Cli } from "../../../modules/Cli";
import RequestModule from "../../../modules/RequestModule";

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
        SystemRpcPath,
        BodyParser.json(),
        BodyParser.urlencoded({ extended: true }),
        multer().any(),
        expressModule.processRequest(async (req, res, context) => {
          const { path, payload } =
            typeof req.body.command === "string"
              ? JSON.parse(req.body.command)
              : req.body;

          if (Array.isArray(req.files)) {
            for (const file of req.files) {
              req.body[file.fieldname] = file.buffer;
            }
          }
          const rpcReq = new RpcRequest(path, payload, req.body);

          const result = await rpcModule.processRequest(
            SystemRpc,
            rpcReq,
            context
          );

          res.json({ result });
        })
      );
    });
  }
}
