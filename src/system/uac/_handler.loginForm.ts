import DataContext from "@dabsi/modules/data/DataContext";
import RpcResolverBuilder from "@dabsi/modules/rpc/RpcResolverBuilder";
import { RequestUser } from "@dabsi/modules/session";
import UacAuthenticator from "@dabsi/system/uac/UacAuthenticator";
import { UacRpc } from "@dabsi/system/uac/common/rpc";
import { User } from "@dabsi/system/uac/entities/User";
import { getPasswordHash } from "@dabsi/system/uac/getPasswordHash";

export default RpcResolverBuilder({
  for: UacRpc,
  with: {
    data: DataContext,
    user: RequestUser,
    authenticator: UacAuthenticator,
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
