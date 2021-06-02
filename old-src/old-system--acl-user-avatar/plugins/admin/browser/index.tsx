// import { canvasToBlob } from "@dabsi/browser/ImageUtils";
// import MuiAvatarInput from "@dabsi/system/acl-user-avatar/browser/MuiAvatarInput";
// import AclEditUserAvatarRpc from "@dabsi/system/acl-user-avatar/common/AclEditUserAvatarRpc";
// import AclEditUserAvatar from "@dabsi/system/acl-user-avatar/plugins/admin/common/ACL_Admin_UserRpcAvatarRpc";
// import AclAdminViewOptions from "@dabsi/system/acl/admin/browser/AclAdminViewOptions";
// import { ACL_Admin_UserBaiscInfoInput } from "@dabsi/system/acl/admin/users/common/basicInfoInput";
// import { ACL_Admin_UserRpc } from "@dabsi/system/acl/admin/users/common/userRpc";
// import processRpcWithFormData from "@dabsi/system/core/browser/processRpcWithFormData";
// import Grid from "@material-ui/core/Grid";
// import React, { useState } from "react";

// const childKey = ACL_Admin_UserRpc.getChildKey(AclEditUserAvatar)!;

// AclAdminViewOptions.editUser.excludeChildKeys.push(
//   ACL_Admin_UserRpc.getDefinedChildKey(AclEditUserAvatar)
// );

// AclAdminViewOptions.editUser.childWrapperMap[
//   ACL_Admin_UserRpc.getDefinedChildKey(ACL_Admin_UserBaiscInfoInput)
// ] = children => <View>{children}</View>;

// function View({ children }) {
//   const props = WidgetNamespaceView.useViewProps(AclEditUserAvatarRpc);

//   const [url, setUrl] = useState(() => props.element.currentUrl);

//   return (
//     <>
//       <Grid
//         container
//         spacing={3}
//         direction="row-reverse"
//         alignContent="center"
//         alignItems="center"
//         justify="center"
//       >
//         <Grid sm={12} md={6} item>
//           <MuiAvatarInput
//             url={url}
//             onChange={async canvas => {
//               const blob = await canvasToBlob(canvas);
//               const result = await processRpcWithFormData(
//                 df => {
//                   df.append("avatar", blob);
//                 },
//                 () => props.connection.controller.update({ field: "avatar" })
//               );
//               setUrl(result.url);
//             }}
//           />
//         </Grid>
//         <Grid sm={12} md={6} item>
//           {children}
//         </Grid>
//       </Grid>
//     </>
//   );
// }
