import { MuiForm } from "@dabsi/browser/mui/form";
import { MuiFormView } from "@dabsi/browser/mui/form/view";
import { MuiSection, MuiSectionList } from "@dabsi/browser/mui/section";
import { MuiDataTableView } from "@dabsi/browser/mui/widget/DataTable";
import { ACL_Admin_Browser_Breadcrumbs } from "@dabsi/system/acl/admin/browser/breadcrumbs";
import { ACL_Admin_Connection } from "@dabsi/system/acl/admin/common/rpc";
import { ACL_AdminRouter } from "@dabsi/system/acl/admin/view/router";
import { SystemView } from "@dabsi/system/core/view/SystemView";
import { RouterView } from "@dabsi/typerouter/view";
import { DataTableView } from "@dabsi/typerpc/data-table/view";
import { WidgetViewLoader } from "@dabsi/typerpc/widget/view/loader";
import { Typography } from "@material-ui/core";
import React from "react";

RouterView.define(ACL_AdminRouter, {
  children: {
    users: () => (
      <WidgetViewLoader connection={ACL_Admin_Connection.users.table}>
        {props => <SystemView {...props} />}
      </WidgetViewLoader>
    ),
  },
});
