import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import { RequestSession, RequestUser } from "@dabsi/modules/session";
import { DataSourceFactory2 } from "@dabsi/modules2/DataSourceFactory2";
import { AclRpc } from "@dabsi/system/acl/common/rpc";
import { User } from "@dabsi/system/acl/entities/User";
import { getPasswordHash } from "@dabsi/system/acl/getPasswordHash";
import { Resolver } from "@dabsi/typedi";

export default RpcResolver(AclRpc, {
  getCurrentUser: Resolver([RequestUser], user => $ =>
    $(async () => {
      if (!user.$key) {
        return null;
      }
      const { loginName, fullName } = await user.fetch(["loginName"], {
        fields: { fullName: User.FullName },
      });
      return { loginName, fullName };
    })
  ),

  login: Resolver(
    [DataSourceFactory2, RequestSession],
    (getDataSource, session) => $ =>
      $({
        async submit({ loginName, password }) {
          const user = await getDataSource(User)
            .filter({
              loginName,
              password: getPasswordHash(password),
            })
            .pick({ fullName: User.FullName })
            .get();
          if (!user) return { type: "failed" };

          await session.update({ user });
          return {
            type: "success",
            fullName: user.fullName,
          };
        },
      })
  ),
});
