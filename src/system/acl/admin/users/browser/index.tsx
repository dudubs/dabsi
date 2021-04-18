// // import "./_createNewUser";
// // import "./_editUser";
// // import "./_usersTable";

// import { MuiDataTableView } from "@dabsi/browser/mui/widget/DataTable";
// import { AclAdminUsersConnection } from "@dabsi/system/acl/admin/users/common/rpc";
// import { ACL_AdminRouter } from "@dabsi/system/acl/admin/view/router";
// import { RouterView } from "@dabsi/typerouter/view";
// import { WidgetViewLoader } from "@dabsi/typerpc/widget/WidgetViewLoader";
// import React from "react";

// const router = ACL_AdminRouter.at("users");

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
//           onEditRow={event => {
//             location.at("edit", { id: event.row.$key }).push();
//           }}
//         />
//       )}
//     </WidgetViewLoader>
//   ),
//   children: {},
// });
