import { checkUniqueName } from "@dabsi/system-old/server/acl/checkUniqueName";
import AclEditUser from "@dabsi/system/acl/plugins/admin/users/common/AclEditUser";
import AclUsersManager from "@dabsi/system/acl/plugins/admin/users/common/AclUsersManager";
import AclDataSources from "@dabsi/system/acl/AclDataSources";
import { User } from "@dabsi/system/acl/entities/User";
import SystemRpcConfigResolver from "@dabsi/system/rpc/SystemRpcConfigResolver";
import { RpcConfigResolver } from "@dabsi/typerpc/RpcConfigResolver";

export default RpcConfigResolver(
  AclUsersManager,
  {
    sources: AclDataSources,

    getEditConfig: SystemRpcConfigResolver(
      AclUsersManager.at("edit").at("target"),
      {
        ...User.provide(),
      }
    ),
  },
  c => $ =>
    $({
      source: c.sources.users,
      editConfigFactory: ($, user) =>
        $(c.getEditConfig(User.provide(() => user))),

      tableConfig: {},

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
