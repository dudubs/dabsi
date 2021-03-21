// // import "./_createNewUser";
// // import "./_editUser";
// // import "./_usersTable";

// import { MuiDataTableView } from "@dabsi/browser/mui/widget/DataTable";
// import { AclAdminUsersConnection } from "@dabsi/system/acl/plugins/admin/users/common/rpc";
// import { ACL_Admin_Router } from "@dabsi/system/acl/plugins/admin/view/router";
// import { RouterView } from "@dabsi/typerouter/view";
// import { WidgetViewLoader } from "@dabsi/typerpc/widget/WidgetViewLoader";
// import React from "react";

// const router = ACL_Admin_Router.at("users");

// export namespace MuiAclAdminUsersBrowser {
//   // tablecolumns...
// }

// RouterView.define(router, {
//   index: ({ location }) => (
//     <WidgetViewLoader connection={AclAdminUsersConnection.table}>
//       {props => (
//         <MuiDataTableView
//           title={lang`Users`}
//           // TableProps={{ size: "small" }}
//           {...props}
//           onEditClick={event => {
//             location.at("edit", { id: event.row.$key }).push();
//           }}
//         />
//       )}
//     </WidgetViewLoader>
//   ),
//   children: {},
// });
