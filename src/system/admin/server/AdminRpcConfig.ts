import { AclRequest } from "../../../system-old/server/acl/AclRequest";
import { Permission } from "../../../system-old/server/acl/Permission";
import { DataResolvers } from "../../../typedata/DataResolvers";
import { DataRow } from "../../../typedata/DataRow";
import { RpcError } from "../../../typerpc/Rpc";
import { RpcConfigResolver } from "../../../typerpc/RpcConfigResolver";
import { SystemSession } from "../../core/SystemSession";
import { AdminRpc } from "../common";
import { Resolver } from "./../../../typedi/Resolver";
import { SystemModule } from "./../../core/SystemModule";

export const AdminRpcConfig = RpcConfigResolver(
  AdminRpc,
  {
    systemModule: SystemModule,
    aclReq: AclRequest,
    context: c => c,
    session: DataRow(SystemSession),
    ...DataResolvers({
      permissions: Permission,
    }),
  },
  c => $ => {
    const user = c.session.user;
    if (!user) throw new RpcError(`Access denied.`);

    return $({
      getNamespaceConfig: rpc => {
        return c.systemModule.resolveRpcConfig(rpc, c.context);
      },
    });
  }
);
