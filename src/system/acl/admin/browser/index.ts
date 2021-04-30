// // import "@dabsi/system/acl/admin/groups/browser";
// // import "@dabsi/system/acl/admin/users/browser";
// import { ACL_AdminRouter } from "@dabsi/system/acl/admin/view/router";
// import { MuiAdminMenu } from "@dabsi/system/admin/browser/menu";
// import "./groups";
// import "./users";

// const connections = [ACL_Admin_Connection];

// MuiAdminMenu.register({
//   acl: {
//     router: ACL_AdminRouter,
//     children: {
//       aclUsers: {
//         connections,
//         title: lang`USERS`,
//         icon: require("@material-ui/icons/People"),
//         // mainRouter
//         router: ACL_AdminRouter.at("users"),
//         subRouters: [ACL_AdminRouter.at("createNewUser")],
//       },
//       aclGroups: {
//         connections,
//         title: lang`GROUPS`,
//         icon: require("@material-ui/icons/GroupWork"),
//         router: ACL_AdminRouter.at("groups"),
//         subRouters: [ACL_AdminRouter.at("createNewGroup")],
//       },
//     },
//   },
// });
