// import { AclAdminRouter } from "@dabsi/system/acl/admin/view/router";
// import MuiRouterLink from "@dabsi/system/admin/browser/MuiRouterLink";
// import { Breadcrumbs, Divider } from "@material-ui/core";
// import Typography from "@material-ui/core/Typography";
// import React from "react";
// import styled from "styled-components";

// const StyledDivider = styled(Divider)`
//   margin-top: ${p => p.theme.spacing(1)}px !important;
//   margin-bottom: ${p => p.theme.spacing(2)}px !important;
// `;
// // AclAdmin_Browser_Breadcrumbs
// export function AclAdmin_Browser_Breadcrumbs({
//   children = null as React.ReactNode,
// }) {
//   return (
//     <>
//       <Breadcrumbs>
//         <Typography>{lang`ACL`}</Typography>
//         {children}
//       </Breadcrumbs>
//       <StyledDivider />
//     </>
//   );
// }

// AclAdmin_Browser_Breadcrumbs.Groups = ({
//   children = null as React.ReactNode,
// }) => (
//   <AclAdmin_Browser_Breadcrumbs>
//     <MuiRouterLink
//       to={() => AclAdminRouter.at("groups")}
//     >{lang`GROUPS`}</MuiRouterLink>
//     {children}
//   </AclAdmin_Browser_Breadcrumbs>
// );

// AclAdmin_Browser_Breadcrumbs.Users = ({
//   children = null as React.ReactNode,
// }) => (
//   <AclAdmin_Browser_Breadcrumbs>
//     <MuiRouterLink
//       to={() => AclAdminRouter.at("users")}
//     >{lang`USERS`}</MuiRouterLink>
//     {children}
//   </AclAdmin_Browser_Breadcrumbs>
// );

// // AclAdminRouter
