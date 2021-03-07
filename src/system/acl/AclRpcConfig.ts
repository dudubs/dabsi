import { RpcConfigResolver } from "@dabsi/modules/rpc/configResolver";
import RequestSession from "@dabsi/modules/session/RequestSession";
import { AclRpc } from "@dabsi/system/acl/common/rpc";
import { AclContext } from "@dabsi/system/acl/context";
import { User } from "@dabsi/system/acl/entities/User";
import { DataRow } from "@dabsi/typedata/row";
import { getPasswordHash } from "./getPasswordHash";

export default RpcConfigResolver(
  AclRpc,
  {
    session: DataRow(RequestSession),
    acl: AclContext,
  },
  c => async $ => {
    return $({
      async logout() {
        if (c.session.user) {
          await c.session.update({ user: null });
        }
      },
      login: {
        async submit({ loginName, password }) {
          const user = await c.acl.users
            .filter({
              loginName,
              password: getPasswordHash(password),
            })
            .pick({ fullName: User.FullName })
            .get();
          if (!user) return { type: "fail" };
          await c.session.update({ user: user.$key });
          return { type: "success", fullName: user.fullName };
        },
      },
      async getLoginInfo() {
        if (!c.session.user) return { type: "fail" };
        const { fullName } = await c.session.user
          .getSource(true)
          .pick({ fullName: { $base: User.FullName } })
          .getOrFail();
        return { type: "success", fullName };
      },
    });
  }
);
