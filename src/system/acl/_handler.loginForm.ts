import DataContext from "@dabsi/modules/data/DataContext";
import RpcResolverBuilder from "@dabsi/modules/rpc/RpcResolverBuilder";
import { RequestUser } from "@dabsi/modules/session";
import AclAuthenticator from "@dabsi/system/acl/AclAuthenticator";
import { AclRpc } from "@dabsi/system/acl/common/rpc";
import { User } from "@dabsi/system/acl/entities/User";
import { getPasswordHash } from "@dabsi/system/acl/getPasswordHash";

export default RpcResolverBuilder({
  for: AclRpc,
  with: {
    data: DataContext,
    user: RequestUser,
    authenticator: AclAuthenticator,
  },
  let: $ => {
    $({
      at: "loginForm",
      configure: c => $ =>
        $({
          async submit({ loginName, password }) {
            const user = await c.data
              .getSource(User)
              .filter({
                loginName,
                password: getPasswordHash(password!),
              })
              .pick({ fullName: User.FullName })
              .fetch();
            if (!user) return { type: "failed" };
            await c.authenticator.loginAs(user);
            return {
              type: "success",
              user: {
                loginName,
                fullName: user.fullName,
                displayName: user.fullName || loginName!,
              },
            };
          },
        }),
    });
  },
});
