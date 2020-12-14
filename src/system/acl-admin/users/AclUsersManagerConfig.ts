import { User } from "./../../../system-old/server/acl/User";
import SystemRpcConfigResolver from "../../core/SystemRpcConfigResolver";
import AclDataSources from "../AclDataSources";
import { RpcConfigResolver } from "./../../../typerpc/RpcConfigResolver";
import AclUsersManager from "./AclUsersManager";
import { checkUniqueName } from "../../../system-old/server/acl/checkUniqueName";

export default RpcConfigResolver(
  AclUsersManager,
  {
    sources: AclDataSources,
    getRpcConfig: SystemRpcConfigResolver(),
  },
  c => $ =>
    $({
      source: c.sources.users,
      editConfigFactory: ($, user) =>
        $({
          getNamespaceConfig(rpc) {
            return c.getRpcConfig(
              rpc,
              User.provide(() => user)
            );
          },
        }),

      addInputConfig: {
        loginName: {
          $check: loginName =>
            checkUniqueName(c.sources.users, "loginName", loginName),
        },
      },
      addSubmit(value) {
        return c.sources.users.insertKey(value);
      },
    })
);
