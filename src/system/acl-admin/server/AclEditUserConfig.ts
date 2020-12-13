import { Resolver } from "./../../../typedi/Resolver";
import { SystemModule } from "./../../core/SystemModule";
import { checkUniqueName } from "../../../system-old/server/acl/checkUniqueName";
import { Group } from "../../../system-old/server/acl/Group";
import { User } from "../../../system-old/server/acl/User";
import { DataSources } from "../../../typedata/DataSources";
import { RpcConfigResolver } from "../../../typerpc/RpcConfigResolver";
import { AclAdminRpc } from "../common/AclAdminRpc";
import { ResolveError } from "../../../typedi/ResolveError";

/*
UserBasicInfoConfig = RpcConf

// RpcNamespaceConfigResolver()
*/

export default RpcConfigResolver(
  AclAdminRpc.at("editUser"),
  {
    context: c => c,
    systemModule: SystemModule,
    sources: DataSources({
      users: User,
    }),
  },
  c => async ($, userKey) => {
    const user = await c.sources.users.getOrFail(userKey);
    return $({
      getNamespaceConfig(rpc) {
        return c.systemModule.resolveRpcConfig(
          rpc,
          Object.setPrototypeOf(
            User.provide(() => user),
            c.context
          )
        );
      },
    });
  }
);

//
