import { DataContext } from "@dabsi/modules/DbModule";
import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import { RequestSession, RequestUser } from "@dabsi/modules/session";
import { AclRpc } from "@dabsi/system/acl/common/rpc";
import { User } from "@dabsi/system/acl/entities/User";
import { getPasswordHash } from "@dabsi/system/acl/getPasswordHash";

export default RpcResolver(AclRpc, $ =>
  $
    //
    .with({ ...DataContext, user: RequestUser, session: RequestSession })
    .at("getCurrentUser", $ =>
      $.configure(c => $ =>
        $(async () => {
          if (!c.user.$key) {
            return null;
          }
          const { loginName, fullName } = await c.user.fetch(["loginName"], {
            fields: { fullName: User.FullName },
          });
          return { loginName, fullName };
        })
      )
    )
    .at("login", $ =>
      $.configure(c => $ =>
        $({
          async submit({ loginName, password }) {
            const user = await c
              .getSource(User)
              .filter({
                loginName,
                password: getPasswordHash(password),
              })
              .pick({ fullName: User.FullName })
              .get();
            if (!user) return { type: "failed" };
            await c.session.update({ user });
            return {
              type: "success",
              fullName: user.fullName,
            };
          },
        })
      )
    )
);
