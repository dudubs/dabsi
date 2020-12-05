import { pick } from "../../../common/object/pick";
import { checkUniqueName } from "../../../system-old/server/acl/checkUniqueName";
import { User } from "../../../system-old/server/acl/User";
import { DataSources } from "../../../typedata/DataSources";
import { RpcConfigResolver } from "../../../typerpc/RpcConfigResolver";
import { AclAdminRpc } from "../common/AclAdminRpc";

export const AclEditUserConfig = RpcConfigResolver(
  AclAdminRpc.at("editUser"),
  {
    sources: DataSources({ users: User }),
  },
  c => async ($, key) => {
    const user = await c.sources.users.getOrFail(key);
    return $({
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
        valueConfig: {},
        submit() {},
      },
    });
  }
);
