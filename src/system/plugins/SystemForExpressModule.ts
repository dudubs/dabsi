import ExpressModule from "@dabsi/modules/express";
import RpcModule from "@dabsi/modules/rpc";
import RpcRequest from "@dabsi/modules/rpc/RpcRequest";
import { SystemRpc, SystemRpcPath } from "@dabsi/system/common/SystemRpc";
import { Inject, Module, Resolver } from "@dabsi/typedi";
import BodyParser from "body-parser";
import multer from "multer";
import RequestModule from "../../modules/RequestModule";

@Module({})
export default class RpcForExpressModule {
  constructor(
    @Inject() rpcModule: RpcModule,
    @Inject() expressModule: ExpressModule,
    @Inject() requestModule: RequestModule
  ) {
    expressModule.beforeBuildRoutes(app => {
      app.post(
        SystemRpcPath,
        BodyParser.json(),
        BodyParser.urlencoded({ extended: true }),
        multer().any(),
        async (req, res) => {
          const { path, payload } =
            typeof req.body.command === "string"
              ? JSON.parse(req.body.command)
              : req.body;

          const rpcReq = new RpcRequest(path, payload, req.body);

          const result = await requestModule.processRequest(context => {
            Resolver.provide(
              context,
              RpcRequest.provide(() => rpcReq)
            );
            return rpcModule.processRequest(SystemRpc, rpcReq, context);
          });

          res.json({ result });
        }
      );
    });
  }
}
