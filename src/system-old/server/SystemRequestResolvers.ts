import { Connection } from "typeorm";
import { DataRow } from "@dabsi/typedata/DataRow";
import { Resolver } from "@dabsi/typedi";
import { Consumer } from "@dabsi/typedi/Consumer";
import { RpcError } from "@dabsi/typerpc/Rpc";
import { RpcRequest } from "@dabsi/typerpc/RpcRequest";
import { AclRequest } from "@dabsi/system-old/server/acl/AclRequest";
import { SystemResolvers } from "@dabsi/system-old/server/SystemResolvers";
import { SystemSession } from "@dabsi/system/core/SystemSession";

export const SystemRpcRequestResolvers = {
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
        c => {
          const aclReq = new AclRequest(c.connection, c.session.user?.$key);
          c.rpcReq.push(async next => {
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
