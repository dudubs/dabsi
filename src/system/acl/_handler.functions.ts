import DataContext from "@dabsi/modules/data/DataContext";
import { DataRowTicker } from "@dabsi/modules/data/DataRowTicker";
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
      at: "getCurrentUser",
      configure: c => $ =>
        $(async () => {
          if (!c.user.$key) {
            return null;
          }
          const {
            loginName,
            fullName,
          } = await (c.user as DataRowTicker<User>).pick(["loginName"], {
            fullName: User.FullName,
            //
          });
          return { loginName, fullName, displayName: fullName || loginName };
        }),
    });

    $({
      at: "logout",
      configure: c => $ =>
        $(async () => {
          await c.authenticator.logout();
        }),
    });
  },
});
