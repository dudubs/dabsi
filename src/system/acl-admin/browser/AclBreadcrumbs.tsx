import { Breadcrumbs } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Lang } from "@dabsi/lang/Lang";
import MuiRouterLink from "@dabsi/system/admin/browser/MuiRouterLink";
import AclAdminRouter from "@dabsi/system/acl-admin/AclAdminRouter";

export function AclBreadcrumbs({ children }) {
  return (
    <Breadcrumbs>
      <Typography>{Lang`ACL`}</Typography>
      {children}
    </Breadcrumbs>
  );
}

AclBreadcrumbs.Groups = ({ children }) => {
  return (
    <AclBreadcrumbs>
      <MuiRouterLink
        router={() => AclAdminRouter.at("groups")}
      >{Lang`GROUPS`}</MuiRouterLink>
      {children}
    </AclBreadcrumbs>
  );
};

AclBreadcrumbs.Users = ({ children }) => {
  return (
    <AclBreadcrumbs>
      <MuiRouterLink
        router={() => AclAdminRouter.at("users")}
      >{Lang`USERS`}</MuiRouterLink>
      {children}
    </AclBreadcrumbs>
  );
};
