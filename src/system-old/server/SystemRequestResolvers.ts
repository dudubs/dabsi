import { Connection } from "typeorm";
import { DataRow } from "../../typedata/DataRow";
import { Resolver } from "../../typedi";
import { Consumer } from "../../typedi/Consumer";
import { RpcError } from "../../typerpc/Rpc";
import { RpcRequest } from "../../typerpc/RpcRequest";
import { AclRequest } from "./acl/AclRequest";
import { SystemResolvers } from "./SystemResolvers";
import { SystemSession } from "../../system/core/SystemSession";

export const SystemRequestResolvers = {
  ...SystemResolvers,
  ...RpcRequest.provide(Resolver.touch(() => new RpcRequest())),
  ...AclRequest.provide(
    Resolver.touch(
      Consumer(
        {
          connection: Connection,
          session: DataRow(SystemSession),
          rpcReq: RpcRequest,
        },
        (c) => {
          const aclReq = new AclRequest(c.connection, c.session.user?.$key);
          c.rpcReq.push(async (next) => {
            if (!(await aclReq.ask())) {
              throw new RpcError(`Access denied.`);
            }
            await next();
          });
          return aclReq;
        }
      )
    )
  ),
};

// Resolver.consume
// provide()
