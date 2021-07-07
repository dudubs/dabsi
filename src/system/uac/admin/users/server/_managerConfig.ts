// import { RpcResolver } from "@dabsi/modules/rpc/configResolver";
// import { checkUniqueName } from "@dabsi/old-system/server/uac/checkUniqueName";
// import UacContext  from "@dabsi/system/uac/context";
// import { User } from "@dabsi/system/uac/entities/User";
// import { UacAdminUsersManager } from "@dabsi/system/uac/admin/users/common/manager";
// import { DataRow } from "@dabsi/typedata/row";
// import { DataSelection } from "@dabsi/typedata/selection/selection";
// import RpcConfigFactoryResolver from "../../../../../../modules/rpc/configFactoryResolver";

// export const UacAdminUserSelection: DataSelection<User> = {};

// export default RpcResolver(
//   UacAdminUsersManager,
//   {
//     acl: UacContext,

//     getEditConfig: RpcConfigFactoryResolver(
//       UacAdminUsersManager.at("edit").at("target"),
//       {
//         context: User.provide(),
//       }
//     ),
//   },
//   c => $ =>
//     $({
//       source: c.acl.users.select(UacAdminUserSelection),

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
