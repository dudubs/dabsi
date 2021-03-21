// import { RpcConfigResolver } from "@dabsi/modules/rpc/configResolver";
// import { AclContext } from "@dabsi/system/acl/context";
// import { User } from "@dabsi/system/acl/entities/User";
// import { ACL_Admin_UserGroupsForm } from "@dabsi/system/acl/plugins/admin/users/common/groupsForm";
// import { DataRow } from "@dabsi/typedata/row";

// export default RpcConfigResolver(
//   ACL_Admin_UserGroupsForm,
//   {
//     acl: AclContext,
//     user: DataRow(User),
//   },
//   c => $ => {
//     return $({
//       inputConfig: $ =>
//         $({
//           source: c.acl.groups.pick(["name"], {
//             isChecked: {
//               $has: { users: { $is: c.user.$key } },
//             },
//           }),
//           getRowLabel: row => row.name,
//           getRowValue: row => row.isChecked,
//         }),
//       async submit(value) {
//         await c.user.at("groups").updateRelations(value);
//       },
//     });
//   }
// );
