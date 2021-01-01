import ExpressModule from "@dabsi/modules/express";
import RpcModule from "@dabsi/system/rpc";
import RpcRequest from "@dabsi/system/rpc/RpcRequest";
import { SystemRpcPath } from "@dabsi/system/rpc/SystemRpc";
import { Inject, Module, Resolver } from "@dabsi/typedi";
import BodyParser from "body-parser";
import multer from "multer";

@Module({})
export default class RpcForExpressModule {
  constructor(
    @Inject() rpcModule: RpcModule,
    @Inject() expressModule: ExpressModule
  ) {
    expressModule.beforeBuildRoutes(app => {
      app.post(
        SystemRpcPath,
        BodyParser.json(),
        BodyParser.urlencoded({ extended: true }),
        multer().any(),
        async (req, res) => {
          const context = Resolver.createContext(
            req.requestContext,
            RpcRequest.provide(() => rpcReq)
          );

          const { path, payload } =
            typeof req.body.command === "string"
              ? JSON.parse(req.body.command)
              : req.body;

          const rpcReq = new RpcRequest(path, payload, req.body);

          res.json({
            result: await rpcModule.processRequest(rpcReq, context),
          });
        }
      );
    });
  }
}
