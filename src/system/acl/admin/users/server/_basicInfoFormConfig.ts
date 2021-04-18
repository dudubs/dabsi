// import { RpcConfigResolver } from "@dabsi/modules/rpc/configResolver";
// import AclContext  from "@dabsi/system/acl/context";
// import { User } from "@dabsi/system/acl/entities/User";
// import { ACL_Admin_UserBasicInfoForm } from "@dabsi/system/acl/admin/users/common/basicInfoForm";
// import { DataRow } from "@dabsi/typedata/row";
// import RpcConfigFactoryResolver from "../../../../../../modules/rpc/configFactoryResolver";

// export default RpcConfigResolver(
//   ACL_Admin_UserBasicInfoForm,
//   {
//     user: DataRow(User),
//     acl: AclContext,
//     getInputConfig: RpcConfigFactoryResolver(
//       ACL_Admin_UserBasicInfoForm.at("input")
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
