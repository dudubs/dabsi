import { RpcConfigResolver } from "@dabsi/modules/rpc/RpcConfigResolver";
import { checkUniqueName } from "@dabsi/system-old/server/acl/checkUniqueName";
import AclDataSources from "@dabsi/system/acl/AclDataSources";
import { User } from "@dabsi/system/acl/entities/User";
import AclAdminUsersManager from "@dabsi/system/acl/plugins/admin/users/common/AclAdminUsersManager";
import { DataSelection } from "@dabsi/typedata/data-selection/DataSelection";
import { DataRow } from "@dabsi/typedata/DataRow";
import RpcConfigFactory from "../../../../../../modules/rpc/RpcConfigFactory";

export const AclAdminUserSelection: DataSelection<User> = {};

export default RpcConfigResolver(
  AclAdminUsersManager,
  {
    sources: AclDataSources,

    getEditConfig: RpcConfigFactory(
      AclAdminUsersManager.at("edit").at("target"),
      {
        context: User.provide(),
      }
    ),
  },
  c => $ =>
    $({
      source: c.sources.users.select(AclAdminUserSelection),
      editConfigFactory: ($, user) =>
        $(c.getEditConfig(DataRow(User).provide(() => user))),

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
