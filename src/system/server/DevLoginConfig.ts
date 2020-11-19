import { Connection } from "typeorm";
import { DataResolvers } from "../../typedata/DataResolvers";
import { DataRow } from "../../typedata/DataRow";
import { RpcConfigResolver } from "../../typerpc/RpcConfigResolver";
import { DevLogin, DevLoginUser } from "../common/SystemApp";
import { AclQuery } from "./acl/AclQuery";
import { User, UserFullName } from "./acl/User";
import { ADMIN_TOKEN } from "./AdminAppConfig";
import { SystemSession } from "./SystemSession";

declare global {
  interface TypeRefs {
    [DevLoginUser]: { fullName: string };
  }
}
export const DevLoginConfig = RpcConfigResolver(
  DevLogin,
  {
    session: DataRow(SystemSession),
    ...DataResolvers({
      users: User,
    }),
    connection: Connection,
  },
  c => $ =>
    $({
      inputConfig: $ =>
        $({
          source: c.users.pick({
            fullName: UserFullName,
          }),
          columns: { label: "fullName" },
        }),
      async submit(user) {
        await c.session.update({ user: user.$key });

        return {
          type: "SUCCESS",
          fullName: user.fullName,
          ...(await new AclQuery(c.connection).askFor(user.$key).askMap({
            isAdmin: { $any: [ADMIN_TOKEN, "ROOT"] },
          })),
        };
      },
    })
);
