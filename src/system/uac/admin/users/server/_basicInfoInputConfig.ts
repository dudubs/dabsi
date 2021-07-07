// import { RpcResolver } from "@dabsi/modules/rpc/configResolver";
// import { checkUniqueName } from "@dabsi/old-system/server/uac/checkUniqueName";
// import UacContext  from "@dabsi/system/uac/context";
// import { User } from "@dabsi/system/uac/entities/User";
// import { UacAdmin_UserBaiscInfoInput } from "@dabsi/system/uac/admin/users/common/basicInfoInput";
// import { DataRow } from "@dabsi/typedata/row";
// import { Resolver } from "@dabsi/typedi";

// export default RpcResolver(
//   UacAdmin_UserBaiscInfoInput,
//   {
//     acl: UacContext,
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
