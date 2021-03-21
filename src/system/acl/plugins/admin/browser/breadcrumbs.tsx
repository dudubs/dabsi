import { ACL_Admin_Router } from "@dabsi/system/acl/plugins/admin/view/router";
import MuiRouterLink from "@dabsi/system/admin/browser/MuiRouterLink";
import { Breadcrumbs } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";

// ACL_Admin_Browser_Breadcrumbs
export function ACL_Admin_Browser_Breadcrumbs({ children }) {
  return (
    <Breadcrumbs>
      <Typography>{lang`ACL`}</Typography>
      {children}
    </Breadcrumbs>
  );
}

ACL_Admin_Browser_Breadcrumbs.Groups = ({ children }) => {
  return (
    <ACL_Admin_Browser_Breadcrumbs>
      <MuiRouterLink
        to={() => ACL_Admin_Router.at("groups")}
      >{lang`GROUPS`}</MuiRouterLink>
      {children}
    </ACL_Admin_Browser_Breadcrumbs>
  );
};

ACL_Admin_Browser_Breadcrumbs.Users = ({ children }) => {
  return (
    <ACL_Admin_Browser_Breadcrumbs>
      <MuiRouterLink
        to={() => ACL_Admin_Router.at("users")}
      >{lang`USERS`}</MuiRouterLink>
      {children}
    </ACL_Admin_Browser_Breadcrumbs>
  );
};

// ACL_Admin_Router
