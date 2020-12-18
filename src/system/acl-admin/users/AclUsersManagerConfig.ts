import { checkUniqueName } from "@dabsi/system-old/server/acl/checkUniqueName";
import { User } from "@dabsi/system-old/server/acl/User";
import AclEditUser from "@dabsi/system/acl-admin/users/AclEditUser";
import AclUsersManager from "@dabsi/system/acl-admin/users/AclUsersManager";
import AclDataSources from "@dabsi/system/acl/AclDataSources";
import SystemRpcConfigResolver from "@dabsi/system/core/SystemRpcConfigResolver";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { RpcConfigResolver } from "@dabsi/typerpc/RpcConfigResolver";

export default RpcConfigResolver(
  AclUsersManager,
  {
    sources: AclDataSources,

    getEditConfig: SystemRpcConfigResolver(AclEditUser, {
      ...User.provide(),
    }),
  },
  c => $ =>
    $({
      source: c.sources.users,
      editConfigFactory: ($, user) =>
        $(c.getEditConfig(User.provide(() => user))),

      tableConfig: undefined,

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
