import { RpcConfigResolver } from "@dabsi/modules/rpc/RpcConfigResolver";
import RequestSession from "@dabsi/modules/session/RequestSession";
import { AclRpc } from "@dabsi/system/acl/common/AclRpc";
import { User } from "@dabsi/system/acl/entities/User";
import { DataRow } from "@dabsi/typedata/row";
import AclDataSources from "./AclDataSources";
import { getPasswordHash } from "./getPasswordHash";

export default RpcConfigResolver(
  AclRpc,
  {
    session: DataRow(RequestSession),
    sources: AclDataSources,
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
          const user = await c.sources.users
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
