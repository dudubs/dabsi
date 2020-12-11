import { Breadcrumbs } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Lang } from "../../../lang/Lang";
import MuiRouterLink from "../../admin/browser/MuiRouterLink";
import AclAdminRouter from "../common/AclAdminRouter";

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
