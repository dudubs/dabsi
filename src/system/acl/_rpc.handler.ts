import DataContext from "@dabsi/modules/data/DataContext";
import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import { RequestSession, RequestUser } from "@dabsi/modules/session";
import AclAuthenticator from "@dabsi/system/acl/AclAuthenticator";
import { AclRpc } from "@dabsi/system/acl/common/rpc";
import { User } from "@dabsi/system/acl/entities/User";
import { getPasswordHash } from "@dabsi/system/acl/getPasswordHash";

export default RpcResolver(AclRpc, $ =>
  $
    //
    .with({
      data: DataContext,
      user: RequestUser,
      authenticator: AclAuthenticator,
    })
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
    .at("logout", $ =>
      $.configure(c => $ =>
        $(async () => {
          await c.authenticator.logout();
        })
      )
    )
    .at("login", $ =>
      $.configure(c => $ =>
        $({
          async submit({ loginName, password }) {
            const user = await c.data
              .getSource(User)
              .filter({
                loginName: loginName!,
                password: getPasswordHash(password!),
              })
              .pick({ fullName: User.FullName })
              .get();
            if (!user) return { type: "failed" };
            await c.authenticator.loginAs(user);
            return {
              type: "success",
              fullName: user.fullName,
            };
          },
        })
      )
    )
);

// authenenticator.loginAs({})
