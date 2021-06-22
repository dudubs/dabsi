// import { RpcResolver } from "@dabsi/modules/rpc/configResolver";
// import { checkUniqueName } from "@dabsi/old-system/server/acl/checkUniqueName";
// import AclContext  from "@dabsi/system/acl/context";
// import { User } from "@dabsi/system/acl/entities/User";
// import { AclAdmin_UserBaiscInfoInput } from "@dabsi/system/acl/admin/users/common/basicInfoInput";
// import { DataRow } from "@dabsi/typedata/row";
// import { Resolver } from "@dabsi/typedi";

// export default RpcResolver(
//   AclAdmin_UserBaiscInfoInput,
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
