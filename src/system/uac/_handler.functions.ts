import DataContext from "@dabsi/modules/data/DataContext";
import { DataRowTicker } from "@dabsi/modules/data/DataRowTicker";
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
