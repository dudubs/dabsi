import { Connection } from "typeorm";
import { DataRow } from "../../typedata/DataRow";
import { Resolver } from "../../typedi";
import { _consume } from "../../typedi/internal/_consume";
import { _touch } from "../../typedi/internal/_touch";
import { RpcError } from "../../typerpc/Rpc";
import { RpcRequest } from "../../typerpc/RpcRequest";
import { AclRequest } from "./acl/AclRequest";
import { SystemSession } from "./SystemSession";

export const SystemRequestContext = {
  ...Resolver.provide(
    RpcRequest,
    Resolver.touch(() => new RpcRequest())
  ),
  ...Resolver.provide(
    AclRequest,
    Resolver.touch(
      Resolver.consume(
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
