// import { RpcResolver } from "@dabsi/modules/rpc/configResolver";
// import UacContext  from "@dabsi/system/uac/context";
// import { User } from "@dabsi/system/uac/entities/User";
// import { UacAdmin_UserBasicInfoForm } from "@dabsi/system/uac/admin/users/common/basicInfoForm";
// import { DataRow } from "@dabsi/typedata/row";
// import RpcConfigFactoryResolver from "../../../../../../modules/rpc/configFactoryResolver";

// export default RpcResolver(
//   UacAdmin_UserBasicInfoForm,
//   {
//     user: DataRow(User),
//     acl: UacContext,
//     getInputConfig: RpcConfigFactoryResolver(
//       UacAdmin_UserBasicInfoForm.at("input")
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
