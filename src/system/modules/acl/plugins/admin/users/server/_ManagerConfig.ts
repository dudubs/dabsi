import OldSystemRpcConfigXResolver from "@dabsi/modules/rpc/OldSystemRpcConfigXResolver";
import { RpcConfigResolver } from "@dabsi/modules/rpc/RpcConfigResolver";
import { checkUniqueName } from "@dabsi/system-old/server/acl/checkUniqueName";
import AclDataSources from "@dabsi/system/modules/acl/AclDataSources";
import { User } from "@dabsi/system/modules/acl/entities/User";
import AclUsersManager from "@dabsi/system/modules/acl/plugins/admin/users/common/AclUsersManager";
import RpcConfigFactory from "../../../../../../../modules/rpc/RpcConfigFactory";

export default RpcConfigResolver(
  AclUsersManager,
  {
    sources: AclDataSources,

    getEditConfig: RpcConfigFactory(AclUsersManager.at("edit").at("target"), {
      context: User.provide(),
    }),
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
