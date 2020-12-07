import { getPasswordHash } from "../../../system-old/server/acl/getPasswordHash";
import { User, UserFullName } from "../../../system-old/server/acl/User";
import { DataRow } from "../../../typedata/DataRow";
import { DataSources } from "../../../typedata/DataSources";
import { RpcConfigResolver } from "../../../typerpc/RpcConfigResolver";
import { SystemSession } from "../../core/SystemSession";
import { AclModule } from "../AclModule";
import { AclRpc } from "../common";

export const AclRpcConfig = RpcConfigResolver(
  AclRpc,
  {
    session: DataRow(SystemSession),
    sources: DataSources({ users: User }),
  },
  c => $ => {
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
            .pick({ fullName: UserFullName })
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
          .pick({ fullName: { $base: UserFullName } })
          .getOrFail();
        return { type: "success", fullName };
      },
    });
  }
);
