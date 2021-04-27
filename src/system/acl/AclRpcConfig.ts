import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import { RequestSession } from "@dabsi/modules/session";
import { AclRpc } from "@dabsi/system/acl/old-common/rpc";
import AclContext from "@dabsi/system/acl/context";
import { User } from "@dabsi/system/acl/entities/User";
import { getPasswordHash } from "./getPasswordHash";

export default RpcResolver(
  AclRpc,
  {
    session: RequestSession,
    acl: AclContext,
  },
  c => async $ => {
    return $({
      async logout() {
        await c.session.update({ user: null });
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
        const { user } = await c.session.fetch({
          relations: { user: { pick: ["firstName", "lastName"] } },
        });

        if (!user) return { type: "fail" };

        return {
          type: "success",
          fullName: `${user.firstName} ${user.lastName}`,
        };
      },
    });
  }
);
