import { Breadcrumbs } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";
import MuiRouterLink from "@dabsi/system/admin/browser/MuiRouterLink";
import AclAdminRouter from "@dabsi/system/acl/plugins/admin/common/AclAdminRouter";

export function AclBreadcrumbs({ children }) {
  return (
    <Breadcrumbs>
      <Typography>{lang`ACL`}</Typography>
      {children}
    </Breadcrumbs>
  );
}

AclBreadcrumbs.Groups = ({ children }) => {
  return (
    <AclBreadcrumbs>
      <MuiRouterLink
        router={() => AclAdminRouter.at("groups")}
      >{lang`GROUPS`}</MuiRouterLink>
      {children}
    </AclBreadcrumbs>
  );
};

AclBreadcrumbs.Users = ({ children }) => {
  return (
    <AclBreadcrumbs>
      <MuiRouterLink
        router={() => AclAdminRouter.at("users")}
      >{lang`USERS`}</MuiRouterLink>
      {children}
    </AclBreadcrumbs>
  );
};
