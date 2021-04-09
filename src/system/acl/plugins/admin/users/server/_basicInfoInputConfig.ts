// import { RpcConfigResolver } from "@dabsi/modules/rpc/configResolver";
// import { checkUniqueName } from "@dabsi/system-old/server/acl/checkUniqueName";
// import AclContext  from "@dabsi/system/acl/context";
// import { User } from "@dabsi/system/acl/entities/User";
// import { ACL_Admin_UserBaiscInfoInput } from "@dabsi/system/acl/plugins/admin/users/common/basicInfoInput";
// import { DataRow } from "@dabsi/typedata/row";
// import { Resolver } from "@dabsi/typedi";

// export default RpcConfigResolver(
//   ACL_Admin_UserBaiscInfoInput,
//   {
//     acl: AclContext,
//     user: Resolver.try(DataRow(User)),
//   },
//   c => $ =>
//     $({
//       firstName: { maxLength: 15, minLength: 2 },
//       lastName: { maxLength: 15, minLength: 2 },
//       loginName: {
//         $check: loginName =>
//           checkUniqueName(c.acl.groups, "name", loginName, c.user?.loginName),
//         $config: { minLength: 5, maxLength: 20, required: true },
//       },
//     })
// );
