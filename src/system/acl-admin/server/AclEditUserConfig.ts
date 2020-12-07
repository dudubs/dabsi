import { checkUniqueName } from "../../../system-old/server/acl/checkUniqueName";
import { Group } from "../../../system-old/server/acl/Group";
import { User } from "../../../system-old/server/acl/User";
import { DataSources } from "../../../typedata/DataSources";
import { RpcConfigResolver } from "../../../typerpc/RpcConfigResolver";
import { AclAdminRpc } from "../common/AclAdminRpc";

export const AclEditUserConfig = RpcConfigResolver(
  AclAdminRpc.at("editUser"),
  {
    sources: DataSources({
      users: User,
      groups: Group,
    }),
  },
  c => async ($, userKey) => {
    const user = await c.sources.users.getOrFail(userKey);
    return $({
      groups: {
        inputConfig: $ =>
          $({
            source: c.sources.groups.pick(["name"], {
              exists: { $has: { users: { $is: userKey } } },
            }),
            columns: { label: "name" },
            getTargetValue: row => Boolean(row.exists),
          }),
        submit() {},
      },
      basicInfo: {
        inputConfig: {
          loginName: {
            $check: loginName =>
              checkUniqueName(
                //
                c.sources.users,
                "loginName",
                loginName,
                user.loginName
              ),
          },
        },
        valueConfig: user,
        async submit(value) {
          await user.update(value);
        },
      },
      contactInfo: {
        valueConfig: user,
        async submit(value) {
          await user.update(value);
        },
      },
    });
  }
);
