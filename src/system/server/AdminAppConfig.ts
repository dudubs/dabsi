import { Consumer } from "../../typedi/Consumer";
import { RpcConfig, RpcError } from "../../typerpc/Rpc";
import { AdminApp } from "../common/AdminApp";
import { PermissionData } from "./acl/Permission";
import { SystemContextResolver } from "./SystemContextResolver";

export const AdminAppConfig = Consumer(
  [SystemContextResolver],

  //
  ({ session: { user }, getDataSource }) =>
    RpcConfig(AdminApp, [
      async $ => {
        if (!user) throw new RpcError(`ACCESS_DENIED`);

        // await getDataSource(PermissionData)
        //   .filter({
        //     $and: [
        //       {
        //         $or: [
        //           {
        //             $as: { USER: { $at: { user: { $is: user.$id } } } },
        //           },
        //           {
        //             $as: {
        //               GROUP: {
        //                 $at: {
        //                   group: { $has: { users: { $is: user.$id } } },
        //                 },
        //               },
        //             },
        //           },
        //         ],
        //       },
        //       { token: { $startsWith: ":ADMIN:" } },
        //     ],
        //   })
        //   .get();
        // expectToAccess("ADMIN")
        //

        /*

        add UserPermission to user ":ADMIN:"
        // SystemPermission
        ACL.userHasAccessTo("ADMIN"

       */

        return $({});
      },
    ])
);
