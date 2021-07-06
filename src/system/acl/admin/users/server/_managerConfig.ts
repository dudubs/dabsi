// import { RpcResolver } from "@dabsi/modules/rpc/configResolver";
// import { checkUniqueName } from "@dabsi/old-system/server/acl/checkUniqueName";
// import AclContext  from "@dabsi/system/acl/context";
// import { User } from "@dabsi/system/acl/entities/User";
// import { AclAdminUsersManager } from "@dabsi/system/acl/admin/users/common/manager";
// import { DataRow } from "@dabsi/typedata/row";
// import { DataSelection } from "@dabsi/typedata/selection/selection";
// import RpcConfigFactoryResolver from "../../../../../../modules/rpc/configFactoryResolver";

// export const AclAdminUserSelection: DataSelection<User> = {};

// export default RpcResolver(
//   AclAdminUsersManager,
//   {
//     acl: AclContext,

//     getEditConfig: RpcConfigFactoryResolver(
//       AclAdminUsersManager.at("edit").at("target"),
//       {
//         context: User.provide(),
//       }
//     ),
//   },
//   c => $ =>
//     $({
//       source: c.acl.users.select(AclAdminUserSelection),

//       editConfigFactory: ($, user) =>
//         $(c.getEditConfig(DataRow(User).provide(() => user))),

//       tableConfig: {},

//       addInputConfig: {
//         loginName: {
//           $check: loginName =>
//             checkUniqueName(c.acl.users, "loginName", loginName),
//         },
//       },

//       addSubmit(value) {
//         return c.acl.users.insert(value);
//       },
//     })
// );
