import { parents } from "../../../common/iterator/parents";
import { isConstructorOf } from "../../../common/object/isConstructorOf";
import { AclRequest } from "../../../system-old/server/acl/AclRequest";
import { Permission } from "../../../system-old/server/acl/Permission";
import { Session } from "../../../system-old/server/acl/Session";
import { DataResolvers } from "../../../typedata/DataResolvers";
import { DataRow } from "../../../typedata/DataRow";
import { Resolver } from "../../../typedi";
import { RpcError } from "../../../typerpc/Rpc";
import { RpcConfigResolver } from "../../../typerpc/RpcConfigResolver";
import { RpcNamespaceHandler } from "../../../typerpc/RpcNamespaceHandler";
import { SystemRequest } from "../../core/SystemRequest";
import { SystemSession } from "../../core/SystemSession";
import { AdminRpc } from "../common";
import { getRootTokens } from "./getRootTokens";
import { hasPermissionForUserExp } from "./hasPermissionForUserExp";

const r = Resolver();

export const AdminConfig = RpcConfigResolver(
  AdminRpc,
  {
    sysReq: SystemRequest,
    aclReq: AclRequest,
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
        return c.sysReq.getUnresolvedConfig(rpc);
      },
      // async checkNamespace(adminHandler, handler) {
      //   const tokens = [handler]
      //     .toSeq()
      //     .flatMap(h => parents(h))
      //     .takeUntil(p => p === adminHandler)
      //     .reverse()
      //     .filter(
      //       (h): h is RpcNamespaceHandler =>
      //         isConstructor(h, RpcNamespaceHandler) && !!h.nsInfo?.key
      //     )
      //     .map(p => p.nsInfo!.key);
      //   const rootTokens = [...getRootTokens(["admin"].toSeq().concat(tokens))];
      //   if (
      //     !(await c.permissions
      //       .filter(hasPermissionForUserExp(user.$key, rootTokens))
      //       .hasRow())
      //   ) {
      //     throw new RpcError(
      //       `Access denied: ${rootTokens[rootTokens.length - 1]}`
      //     );
      //   }
      // },
    });
  }
);
