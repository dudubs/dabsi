// import { RpcResolver } from "@dabsi/modules/rpc/configResolver";
// import { User } from "@dabsi/system/uac/entities/User";
// import { UacAdminUserContactInfoForm } from "@dabsi/system/uac/admin/users/common/contactInfoForm";
// import { DataRow } from "@dabsi/typedata/row";
// import RpcConfigFactoryResolver from "../../../../../../modules/rpc/configFactoryResolver";

// export default RpcResolver(
//   UacAdminUserContactInfoForm,
//   {
//     user: DataRow(User),
//     getInputConfig: RpcConfigFactoryResolver(
//       UacAdminUserContactInfoForm.at("input")
//     ),
//   },
//   c => $ =>
//     $({
//       valueConfig: c.user,
//       inputConfig: c.getInputConfig(),
//       async submit(value) {
//         await c.user.update(value);
//       },
//     })
// );
